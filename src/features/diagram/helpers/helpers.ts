import { IEdge, IEnumReference, IForeignReference, INode, ISQLTableData, RelationType } from "../types";


const extractForeignKeys = (
    stmt: string,
    tableName: string,
    allTableStatements: string[]
  ): IForeignReference[] => {
    const foreignKeyRegex = [
      /FOREIGN\s+KEY\s+\((\w+)\)\s+REFERENCES\s+(\w+)\s*\((\w+)\)/ig,
      /(\w+)\s+[\w\s]+REFERENCES\s+(\w+)\s*\((\w+)\)/ig,
    ];
  
    const uniqueConstraintRegex = /UNIQUE\s*\((\w+)\)/ig;
  
    const foreignKeys: IForeignReference[] = [];
    const uniqueColumns: string[] = [];
  
    let match;
  
    // Search for UNIQUE constraints
    while ((match = uniqueConstraintRegex.exec(stmt)) !== null) {
      uniqueColumns.push(match[1]);
    }
  
    for (const regex of foreignKeyRegex) {
      while ((match = regex.exec(stmt)) !== null) {
        let relationship: RelationType = '1-m';  // default relationship
        if (uniqueColumns.includes(match[1])) {
          relationship = '1-1';
        } else {
          // Check for back-reference in the other tables to confirm if it is M:1 or M:M
          for (const otherTableStmt of allTableStatements) {
            if (otherTableStmt.includes(`REFERENCES ${tableName}(${match[1]})`)) {
              relationship = 'm-m';  // Identified as many-to-many
              break;
            }
          }
        }
  
        foreignKeys.push({
          sourceColumn: match[1],
          sourceTable: tableName,
          targetTable: match[2],
          targetColumnName: match[3],
          relationType: relationship,
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


const extractTableInfo = (stmt: string): { tableName: string | null, tableColumns: ISQLTableData[] } => {
    const tableNameMatch = stmt.match(/CREATE\s+TABLE\s+(\w+)/i);
    const tableName = tableNameMatch ? tableNameMatch[1] : null;

    const tableColumns: ISQLTableData[] = [];

    const columnsPartMatch = stmt.match(/CREATE\s+TABLE\s+\w+\s*\(([\s\S]+)\)/i); // Adjusted to capture all characters
    const columnsPart = columnsPartMatch ? columnsPartMatch[1] : null;

    if (columnsPart) {
        const columnLines: string[] = [];
        let parenCount = 0;
        let lastSplit = 0;

        for (let i = 0; i < columnsPart.length; i++) {
            const char = columnsPart[i];
            if (char === '(') {
                parenCount++;
            } else if (char === ')') {
                parenCount--;
            } else if (char === ',' && parenCount === 0) {
                columnLines.push(columnsPart.substring(lastSplit, i).trim());
                lastSplit = i + 1;
            }
        }

        // Capture any remaining column data after the last comma
        columnLines.push(columnsPart.substring(lastSplit).trim());

        for (const line of columnLines) {
            const columnMatch = line.trim().match(/(\w+)\s+([^,]+)(?:,|\s+(.*))?/i);

            if (columnMatch) {
                const columnName = columnMatch[1];
                const columnType = columnMatch[2].trim();
                const constraints = columnMatch[3] ? columnMatch[3].trim().split(/\s+/) : [];

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



function createTableNode(tableName: string, tableData:ISQLTableData[]): INode{
    const id = `node-${tableName}`
    return {
        id,
        data: { tableColumns: tableData, label: tableName, componentType: 'table' },
        type: 'tableNode',
        position: { x: 0, y: 0 },
    };
}

function createEnumNode(enumName: string, enumData: string[]): INode {
    const id = `node-${enumName}`
    return {
        id,
        data: { enumValues: enumData, label: enumName, componentType: 'enum' },
        type: 'tableNode',
        position: { x: 0, y: 0 },
    };
}

interface IEnumEdgeData {
    sourceTable: string,
    sourceColumn: string,
    targetEnum: string,
}

const createEnumEdge = ({sourceTable, sourceColumn, targetEnum}: IEnumEdgeData): IEdge => {
    const id = `edge-${sourceTable}-${targetEnum}`;
    const source = `node-${sourceTable}`;
    const target = `node-${targetEnum}`;
    const label = `${sourceColumn} -> ${targetEnum}`;
    return { id, source, target, label, data: { label: label }, animated: true, type: 'smoothstep' };
}


interface ITableEdgeData {
    sourceTable: string,
    sourceColumn: string,
    targetTable: string,
    targetColumn: string,
    relationType: RelationType,
}

const createTableEdge = ({sourceTable, sourceColumn, targetTable, targetColumn, relationType}: ITableEdgeData): IEdge => {
    const id = `edge-${sourceTable}-${sourceColumn}-${targetTable}-${targetColumn}`;
    const source = `node-${sourceTable}`;
    const target = `node-${targetTable}`;
    const label = `${sourceColumn} -> ${targetColumn}`;
    return { id, source, target, label, data: { label: label, relationType: relationType }, animated: false, type: 'relation' };

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
            nodes.push(createTableNode(tableName, tableColumns));
        }

        const { enumName, enumValues } = extractEnumInfo(stmt);
        if (enumName) {
            enumNames.push(enumName);
            nodes.push(createEnumNode(enumName, enumValues));
        }

        foreignReferences.push(...extractForeignKeys(stmt, tableName as string, statements));
        enumReferences.push(...extractEnumReferences(stmt, enumNames, tableName as string)); //! Assuming that enums are defined before they are used
    }

    for (let i = 0, len = foreignReferences.length; i < len; i++) {
        const { sourceColumn, sourceTable, targetTable, targetColumnName, relationType } = foreignReferences[i];
        const edge: IEdge = createTableEdge({sourceTable, sourceColumn, targetTable, targetColumn: targetColumnName, relationType: relationType})
        edges.push(edge);

    }

    for (let i = 0, len = enumReferences.length; i < len; i++) {
        const { sourceColumn, sourceTable, targetEnum } = enumReferences[i];
        const edge: IEdge = createEnumEdge({sourceTable, sourceColumn, targetEnum})
        edges.push(edge);
    }


    return { nodes, edges };
};
