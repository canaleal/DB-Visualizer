

import { MarkerType } from 'reactflow';
const extractForeignKeys = (stmt: string, tableName: string) => {
    const foreignKeys = [];

    // Match FOREIGN KEY constraints
    const regex1 = /FOREIGN\s+KEY\s+\((\w+)\)\s+REFERENCES\s+(\w+)\s*\((\w+)\)/ig;
    let match;
    while ((match = regex1.exec(stmt)) !== null) {
        foreignKeys.push({
            column: match[1],
            sourceTable: tableName,
            referencedTable: match[2],
            referencedColumnName: match[3],
        });
    }

    // Match inline REFERENCES constraints
    const regex2 = /(\w+)\s+[\w\s]+REFERENCES\s+(\w+)\s*\((\w+)\)/ig;
    while ((match = regex2.exec(stmt)) !== null) {
        foreignKeys.push({
            column: match[1],
            sourceTable: tableName,
            referencedTable: match[2],
            referencedColumnName: match[3],
        });
    }

    return foreignKeys;
};

// Helper function to extract enum references within a CREATE TABLE statement
// Helper function to extract enum references within a CREATE TABLE statement
const extractEnumReferences = (stmt: string, knownEnums: string[], tableName: string) => {
    const references = [];
    const columnRegex = /\s*(\w+)\s+(\w+)\s*(,|\)|DEFAULT|NOT NULL|CHECK)?/ig;

    let columnMatch;
    while ((columnMatch = columnRegex.exec(stmt)) !== null) {
        const columnName = columnMatch[1];
        const columnType = columnMatch[2];
        if (knownEnums.includes(columnType)) {
            references.push({ column: columnName, referencedEnum: columnType, referencedTable: tableName });
        }
    }
    return references;
};

// Helper function to extract enum information from a SQL statement

const extractEnumInfo = (stmt: string) => {
    const enumNameMatch = stmt.match(/CREATE\s+TYPE\s+(\w+)\s+AS\s+ENUM/i);
    const enumName = enumNameMatch ? enumNameMatch[1] : null;
    return { enumName };
};

// Helper function to extract table information from a SQL statement
const extractTableInfo = (stmt: string) => {
    const tableNameMatch = stmt.match(/CREATE\s+TABLE\s+(\w+)/i);
    const tableName = tableNameMatch ? tableNameMatch[1] : null;
    return { tableName };
};



export const parseSQLToNodesAndEdges = (sql: string) => {
    const statements = sql.split(';').map(stmt => stmt.trim()).filter(Boolean);
    const nodes = [];
    const edges = [];



    const tables = [];
    const enums = [];
    const foreignKeys = [];
    const enumReferences = [];

    // Get all table and enum names
    statements.forEach(stmt => {
        const { tableName } = extractTableInfo(stmt);
        if (tableName) {
            tables.push(tableName);
        }

        const { enumName } = extractEnumInfo(stmt);
        if (enumName) {
            enums.push(enumName);
        }

        foreignKeys.push(...extractForeignKeys(stmt, tableName as string));
        enumReferences.push(...extractEnumReferences(stmt, enums, tableName as string));
    });


    const angleStepTables = 2 * Math.PI / tables.length;
    const angleStepEnums = 2 * Math.PI / enums.length;
    const radiusTables = 200;
    const radiusEnums = 100;

    // Create nodes for tables and enums
    for (let i = 0; i < tables.length; i++) {
        const tableName = tables[i];
        const id = `table-${tableName}`;
        const x = radiusTables * Math.cos(i * angleStepTables);
        const y = radiusTables * Math.sin(i * angleStepTables);
        nodes.push({ id, data: { label: tableName }, type: "tableNode", position: { x, y } });
    }

    for (let i = 0; i < enums.length; i++) {
        const enumName = enums[i];
        const id = `enum-${enumName}`;

        const x = radiusEnums * Math.cos(i * angleStepEnums);
        const y = radiusEnums * Math.sin(i * angleStepEnums);
        nodes.push({ id, data: { label: `<<${enumName}>>`, isEnum: true }, type: "tableNode", position: { x, y }, targetPosition: 'left'});

    }

    console.log('nodes', nodes);

    // Create edges for foreign keys
    for (let i = 0, len = foreignKeys.length; i < len; i++) {
        const { column, sourceTable, referencedTable, referencedColumnName} = foreignKeys[i];
        const id = `edge-${sourceTable}-${referencedTable}-${column}`;
        const source = 'table-' + sourceTable;
        const target = 'table-' + referencedTable;

        const edge = { id, source, target, data: { label: `${column} -> ${referencedColumnName}` } };
        if (source  === target) {
            edge.type = 'selfconnecting';
        }
        edges.push(edge);

    }

    // Create edges for enum references
    for (let i = 0, len = enumReferences.length; i < len; i++) {
        const { column, referencedEnum, referencedTable } = enumReferences[i];
        const id = `edge-${referencedTable}-${referencedEnum}-${column}`;
        const source = 'table-' + referencedTable;
        const target = 'enum-' + referencedEnum;
        edges.push({ id, source, target, data: { label: `${column} -> ${referencedEnum}` }, animated: true });

    }


    console.log(foreignKeys)
    console.log('edges', edges);



    return { nodes, edges };
};
