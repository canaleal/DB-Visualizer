import { Handle, Position } from 'reactflow';
import { IDataType } from '../types';

interface ITableNodeProps {
    data: IDataType
    isConnectable: boolean;
}

export const TableNode = ({ data, isConnectable }: ITableNodeProps) => {

    const createEnumTable = () => {
        if (!data.enumValues) return null;
        return (
            <table className='w-full'>
                <thead></thead>
                <tbody>
                    {data.enumValues.map((value, index) => {
                        return (
                            <tr key={index} className='bg-white hover:bg-slate-200'>
                                <td className='text-xs px-2 py-1'>{value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    const createTable = () => {
        if (!data.tableColumns) return null;
        return (
            <table className='w-full'>
                <thead></thead>
                <tbody>
                    {data.tableColumns.map((column, index) => {
                        return (
                            <tr key={index} className='bg-white hover:bg-slate-200'>
                                <td className='text-xs px-2 py-1'>{column.name}</td>
                                <td className='text-xs px-2 py-1'>{column.type}</td>
                                <td className='text-xs px-2 py-1'>{column.constraints}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div className='min-w-[10rem] bg-white border-2 hover:border-black '>
            <Handle
                type="target"
                position={Position.Top}
                onConnect={(params: unknown) => console.log('handle onConnect', params)}
                style={{ background: '#555' }}

            />
            <div>
                <div className={`w-full text-center ${data.componentType === 'enum' ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}  px-2 py-1`}>
                    {data.componentType === 'enum' && <p className='text-xs'>{"<<enumeration>>"}</p>}
                    <p>{data.label}</p>
                </div>

                <div className='h-fit overflow-hidden'>
                    { data.componentType === 'enum' ? createEnumTable() : createTable() }
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                onConnect={(params: unknown) => console.log('handle onConnect', params)}
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
        </div>
    )

}
export default TableNode;