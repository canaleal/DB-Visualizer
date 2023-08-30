import { IEdge, IEnumReference, IForeignReference, INode, ITableData, SQLType } from "../types";

const extractForeignKeys = (stmt: string, tableName: string) => {
    const foreignKeyRegex = [
        /FOREIGN\s+KEY\s+\((\w+)\)\s+REFERENCES\s+(\w+)\s*\((\w+)\)/ig,
        /(\w+)\s+[\w\s]+REFERENCES\s+(\w+)\s*\((\w+)\)/ig
    ];
    const foreignKeys = [];
    for (const regex of foreignKeyRegex) {
        let match;
        while ((match = regex.exec(stmt)) !== null) {
            foreignKeys.push({
                sourceColumn: match[1],
                sourceTable: tableName,
                targetTable: match[2],
                targetColumnName: match[3],
            });
        }
    }
    return foreignKeys;
};

const extractEnumReferences = (stmt: string, knownEnums: string[], tableName: string) => {
    const references = [];
    const columnRegex = /\s*(\w+)\s+(\w+)\s*(,|\)|DEFAULT|NOT NULL|CHECK)?/ig;

    let columnMatch;
    while ((columnMatch = columnRegex.exec(stmt)) !== null) {
        const columnName = columnMatch[1];
        const columnType = columnMatch[2];
        if (knownEnums.includes(columnType)) {
            references.push({ sourceColumn: columnName, targetEnum: columnType, sourceTable: tableName });
        }
    }
    return references;
};

const extractEnumInfo = (stmt: string) => {
    const enumNameMatch = stmt.match(/CREATE\s+TYPE\s+(\w+)\s+AS\s+ENUM/i);
    const enumName = enumNameMatch ? enumNameMatch[1] : null;

    const enumValuesMatch = stmt.match(/ENUM\s*\(([^)]+)\)/i);
    let enumValues: string[] = [];
    if (enumValuesMatch && enumValuesMatch[1]) {
        enumValues = enumValuesMatch[1].split(',').map(value => value.trim().replace(/['"]/g, ''));
    }
    return { enumName, enumValues };
};

const extractTableInfo = (stmt: string) => {
    const tableNameMatch = stmt.match(/CREATE\s+TABLE\s+(\w+)/i);
    const tableName = tableNameMatch ? tableNameMatch[1] : null;

    // Initialize an array to hold column information
    const tableColumns: ITableData[] = [];

    // Extract the part of the statement that should contain column definitions
    const columnsPartMatch = stmt.match(/CREATE\s+TABLE\s+\w+\s*\(([^)]+)\)/i);
    const columnsPart = columnsPartMatch ? columnsPartMatch[1] : null;

    if (columnsPart) {
        // Split the columnsPart string into lines based on commas, 
        // assuming each column definition is separated by a comma
        const columnLines = columnsPart.split(/,\s*(?![^()]*\))/); // Take care not to split nested parentheses

        // Loop through each column definition line
        for (const line of columnLines) {
            const columnMatch = line.trim().match(/(\w+)\s+([\w\s]+)(?:\s+(.*))?/i); // This regex assumes that column names and types are alphanumeric

            if (columnMatch) {
                const columnName = columnMatch[1];
                const columnType = columnMatch[2].trim(); // Remove any extra spaces
                const constraints = columnMatch[3] ? columnMatch[3].split(/\s+/) : []; // Split any remaining text into constraints

                tableColumns.push({
                    name: columnName,
                    type: columnType,
                    constraints,
                });
            }
        }
    }

    return { tableName, tableColumns };
};

//! combine enum data and table data into one object
function createNode(name: string, componentType: SQLType = 'table', nodeType: string = 'tableNode', enumData?: string[] , tableData?: ITableData[]): INode {
    const id = `${componentType}-${name}`
    return {
        id,
        data: { enumValues: enumData, tableColumns: tableData, label: name, componentType, },
        type: nodeType,
        position: { x: 0, y: 0 },
    };
}


//! TODO: Add support for column row to column row edges
function createEdge(sourceElement: string, sourceType: SQLType, targetElement: string, targetType: SQLType, sourceColumn: string, label: string, isAnimated = false, type = 'smoothstep'): IEdge {
    const id = `edge-${sourceElement}-${targetElement}-${sourceColumn}`;
    const source = `${sourceType}-${sourceElement}`;
    const target = `${targetType}-${targetElement}`;
    type = source === target ? 'selfconnecting' : 'smoothstep';
    return { id, source, target, data: { label: label }, animated: isAnimated, type: type };
}


export const parseSQLToNodesAndEdges = (sql: string) => {
    const statements = sql.split(';').map(stmt => stmt.trim()).filter(Boolean);
    const nodes = [];
    const edges = [];


    const enumNames: string[] = [];
    const foreignReferences: IForeignReference[] = [];
    const enumReferences: IEnumReference[] = [];

    // Get all table and enum names
    for (let i = 0, len = statements.length; i < len; i++) {
        const stmt = statements[i];
        const { tableName, tableColumns } = extractTableInfo(stmt);
        if (tableName) {
            nodes.push(createNode(tableName, 'table', 'tableNode', undefined, tableColumns ));
        }

        const { enumName, enumValues } = extractEnumInfo(stmt);
        if (enumName) {
            enumNames.push(enumName);
            nodes.push(createNode(enumName, 'enum', 'tableNode', enumValues));
        }

        foreignReferences.push(...extractForeignKeys(stmt, tableName as string));
        enumReferences.push(...extractEnumReferences(stmt, enumNames, tableName as string)); //! Assuming that enums are defined before they are used
    }

    for (let i = 0, len = foreignReferences.length; i < len; i++) {
        const { sourceColumn, sourceTable, targetTable, targetColumnName } = foreignReferences[i];
        const edge: IEdge = createEdge(sourceTable, 'table', targetTable, 'table', targetColumnName, `${sourceColumn} -> ${targetColumnName}`, false);
        edges.push(edge);

    }

    for (let i = 0, len = enumReferences.length; i < len; i++) {
        const { sourceColumn, sourceTable, targetEnum } = enumReferences[i];
        const edge: IEdge = createEdge(sourceTable, 'table', targetEnum, 'enum', sourceColumn, `${sourceColumn} -> ${targetEnum}`, true);
        edges.push(edge);
    }

    return { nodes, edges };
};
