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
                            <tr key={index} className='bg-zinc-700 hover:bg-zinc-600 '>
                                <td className='text-xs px-2 py-2 text-zinc-200'>{value}</td>
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
                            <tr key={index} className='bg-zinc-700 hover:bg-zinc-600' >
                                <td className='text-xs px-2 py-2 text-zinc-200'>{column.name}</td>
                                <td className='text-xs px-2 py-2 text-zinc-400 text-right'>{column.type}</td>
                              
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div className='min-w-[15rem] bg-white  overflow-hidden shadow-lg'>
            <Handle
                type="target"
                position={Position.Top}
                onConnect={(params: unknown) => console.log('handle onConnect', params)}
                style={{ background: '#555' }}

            />
            <div>
                <div className={`w-full ${data.componentType === 'enum' ? "bg-blue-800 text-white" : "bg-zinc-900 text-white"}  px-2 py-2`}>
                    {data.componentType === 'enum' && <p className='text-xs'>{"<<enumeration>>"}</p>}
                    <p className='font-bold text-xs'>{data.label}</p>
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