
import { IconSettings, IconCode } from '@tabler/icons-react';
import Modal from "../../components/Modal";
import { useState } from "react";
interface ISettingsOptionProps {
    extraClasses?: string;
}
const SettingsOption = ({ extraClasses }: ISettingsOptionProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col  text-black p-4">
                    <p className="font-bold text-2xl">DB Visualizer</p>
                    <div className="flex flex-col mt-4">
                        <p >Web-based database visualization tool transforms SQL queries into dynamic, interactive graphs composed of nodes and edges. The platform aims to make database exploration and management more intuitive by rendering relationships and structures visually, all directly in your web browser. </p>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                    <a href='https://github.com/canaleal/React-Redux-MarkdownSystem' target='_blank' rel="noreferrer" className={`flex gap-1 bg-indigo-900 hover:bg-indigo-800 p-2  rounded-md text-white`} >
                        <IconCode stroke='white' size={20} strokeWidth={2} className='my-auto' />
                        Github
                    </a>
                </div>
            </Modal>
            <button title="Settings Option" className={`bg-dark hover:bg-zinc-800 p-2 text-white ${extraClasses}`} onClick={() => setIsModalOpen(true)}>
                <IconSettings stroke='white' size={20} strokeWidth={2} />
            </button>
        </>
    )
}
export default SettingsOption