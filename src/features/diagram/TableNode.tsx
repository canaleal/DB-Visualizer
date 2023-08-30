import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const TableNode = ({ data, isConnectable }) => {

    return (
        <div className='min-w-[10rem] bg-white border-2 hover:border-black rounded-lg'>
            <Handle
                type="target"
                position={Position.Top}
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ background: '#555' }}

            />
            <div>
                <div className={`w-full text-center ${data.isEnum ?  "bg-blue-600 text-white" : "bg-gray-200 text-black" } rounded-t-lg px-2 py-1`}>
                    <p>{data.label}</p>
                </div>

                <div className='h-12'>

                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />


        </div>
    )

}
export default TableNode;