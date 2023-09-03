import { Handle, Position } from 'reactflow';
import IconKey from '../../../components/icons/iconKey';
import { IDataType } from '../types';

interface ITableNodeProps {
    data: IDataType
    isConnectable: boolean;
}

export const TableNode = ({ data, isConnectable }: ITableNodeProps) => {

    const createEnumTable = () => {
        if (!data.enumValues) return null;
        return (
            <>

                <Handle
                    type="target"
                    position={Position.Top}
                    onConnect={(params: unknown) => console.log('handle onConnect', params)}
                    style={{ background: '#555' }}

                />
                <div className={`w-full bg-indigo-800 text-white px-2 py-2`}>
                    <p className='text-xs'>{"<<enumeration>>"}</p>
                    <p className='font-bold text-xs'>{data.label}</p>
                </div>
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
            </>

        )
    }

    const createTable = () => {
        if (!data.tableColumns) return null;
        return (
            <div className='relative'>

                <Handle

                    type="target"
                    position={Position.Top}
                    onConnect={(params: unknown) => console.log('handle onConnect', params)}
                    style={{ background: '#555' }}

                />

                <div className={`w-full bg-zinc-900 text-white px-2 py-2`}>
                    <p className='font-bold text-xs'>{data.label}</p>
                </div>
                <table className='w-full'>
                    <thead></thead>
                    <tbody>
                        {data.tableColumns.map((column, index) => {
                            return (
                                <tr key={index} className='bg-zinc-700 hover:bg-zinc-600' >
                                    <td className={`text-xs px-2 py-2 text-zinc-200 flex flex-row gap-1 ${index === 0 ? "font-bold" : ""}`}>{column.name} {(column.type.includes("PRIMARY") || column.type.includes("REFERENCES") ) && <IconKey fillColor='black' size={10} className='my-auto' />}</td>
                                    <td className={`text-xs px-2 py-2 text-zinc-400 text-right ${index === 0 ? "font-bold" : ""}`}>{column.type}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

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

    return (
        <div className='min-w-[15rem] bg-white  overflow-hidden shadow-lg'>


            <div className='h-fit overflow-hidden rounded-md'>
                {data.componentType === 'enum' ? createEnumTable() : createTable()}
            </div>


        </div>
    )

}
export default TableNode;