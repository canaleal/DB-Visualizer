export interface IForeignReference {
    sourceColumn: string,
    sourceTable: string,
    targetTable: string,
    targetColumnName: string,
    relationType: RelationType,
}

export interface IEnumReference {
    sourceColumn: string,
    targetEnum: string,
    sourceTable: string
}

export interface ISQLTableData {
    name: string, 
    type: string, 
    constraints: string[]
}

export type SQLType = 'table' | 'enum' | 'column';
export interface IDataType {
    label: string,
    componentType: SQLType,
    enumValues?: string[],
    tableColumns?: ISQLTableData[],
    sourceColumn?: string,
    sourceTable?: string,
    targetColumn?: string,
    targetTable?: string,
}

export interface INode {
    id: string,
    data: IDataType,
    type: string,
    position: { x: number, y: number },
}

//* Used for creating edges between nodes and finding the correct edge type
export type RelationType = "1-1" | "1-m" | "m-m" ;
export interface RelationEdgeData {
    relationType: RelationType;
  }
  
export interface IEdge {
    id: string,
    source: string,
    target: string,
    data: unknown,
    animated: boolean,
    type: string,
    label: string,
}

