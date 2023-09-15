

import { useDispatch } from "react-redux/es/exports";
import { resetSelectedScript } from '../../store/scriptSlice';

import { IconTrash } from '@tabler/icons-react';
import Modal from "../../components/Modal";
import { useState } from "react";
interface IResetOptionProps {
    extraClasses?: string;
}

const ResetOption = ({ extraClasses }: IResetOptionProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const handleReset = () => {
        dispatch(resetSelectedScript());
        setIsModalOpen(false);
    }
    return (
        <>
            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>

                <div className="flex flex-col  text-black p-4">
                    <p className="font-bold text-2xl">Reset Editor</p>
                    <div className="flex flex-col mt-4">
                        <p >Reset the SQL text editor and clear the diagram.</p>
                        <p className="text-red-600">All progress will be lost!</p>
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                    <button title="Reset Text Editor" className={`bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md text-white `} onClick={() => setIsModalOpen(false)}>
                        Do not Reset
                    </button>

                    <button title="Reset Text Editor" className={`flex gap-1 bg-indigo-900 hover:bg-indigo-800 p-2  rounded-md text-white `} onClick={() => { handleReset(); }}>
                        <IconTrash stroke='white' size={20} strokeWidth={2} className='my-auto' />
                        Reset the Editor
                    </button>
                </div>
            </Modal>

            <button title="Reset Text Editor" className={`bg-dark hover:bg-zinc-800 p-2 text-white ${extraClasses}`} onClick={() => setIsModalOpen(true)}>
                <IconTrash stroke='white' size={20} strokeWidth={2} />
            </button>
        </>

    )
}

export default ResetOption