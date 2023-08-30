export interface IForeignReference {
    sourceColumn: string,
    sourceTable: string,
    targetTable: string,
    targetColumnName: string,
}

export interface IEnumReference {
    sourceColumn: string,
    targetEnum: string,
    sourceTable: string
}

export type SQLType = 'table' | 'enum';

export interface ITableData {
    name: string, 
    type: string, 
    constraints: string[]
}

export interface IDataType {
    label: string,
    componentType: SQLType,
    enumValues?: string[],
    tableColumns?: ITableData[],
}

export interface INode {
    id: string,
    data: IDataType,
    type: string,
    position: { x: number, y: number },
}

export interface IEdge {
    id: string,
    source: string,
    target: string,
    data: unknown,
    animated?: boolean,
    type?: string,
}