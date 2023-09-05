import { Handle, Position } from 'reactflow';
import { IconKey } from '@tabler/icons-react';
import { IDataType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface ITableNodeProps {
    data: IDataType
    isConnectable: boolean;
}

export const TableNode = ({ data, isConnectable }: ITableNodeProps) => {

    const tableTheme = useSelector((state: RootState) => state.diagramStyle.tableTheme);
    const enumTheme = useSelector((state: RootState) => state.diagramStyle.enumTheme);

    const createEnumTable = () => {
        if (!data.enumValues) return null;
        return (
            <div className='relative'>
                <Handle
                    type="target"
                    position={Position.Top}
                    onConnect={(params: unknown) => console.log('handle onConnect', params)}
                    style={{ background: '#555' }}

                />
                <div className={`w-full  px-2 py-2`} style={{background: enumTheme.headerBackgroundColor, color: enumTheme.headerTextColor}}>
                    <p className='text-xs'>{"<<enumeration>>"}</p>
                    <p className='font-bold text-xs'>{data.label}</p>
                </div>
                <table className='w-full'>
                    <thead></thead>
                    <tbody>
                        {data.enumValues.map((value, index) => {
                            return (
                                <tr key={index} style={{background: enumTheme.bodyBackgroundColor, color: enumTheme.bodyTextColor}}>
                                    <td className='text-xs px-2 py-2'>{value}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

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
                <div className={`w-full px-2 py-2`}  style={{background: tableTheme.headerBackgroundColor, color: tableTheme.headerTextColor}}>
                    <p className='font-bold text-xs'>{data.label}</p>
                </div>
                <table className='w-full'>
                    <thead></thead>
                    <tbody>
                        {data.tableColumns.map((column, index) => {
                            return (
                                <tr key={index} style={{background: tableTheme.bodyBackgroundColor, color: tableTheme.bodyTextColor}} >
                                    <td className={`text-xs px-2 py-2 flex flex-row gap-1 ${index === 0 ? "font-bold" : ""}`}>{column.name} {column.type.includes("PRIMARY") && <IconKey size={10} className='my-auto' />}</td>
                                    <td className={`text-xs px-2 py-2 text-right ${index === 0 ? "font-bold" : ""}`}>{column.type}</td>
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
        <div className='min-w-[15rem] bg-white  overflow-hidden shadow-lg rounded-md'>
            {data.componentType === 'enum' ? createEnumTable() : createTable()}
        </div>
    )

}
export default TableNode;