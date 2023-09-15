import { useState } from 'react';
import Modal from "../../components/Modal";
import { IconDownload } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IExportSqlOptionProps {
    extraClasses?: string;
}

const ExportSqlOption = ({ extraClasses }: IExportSqlOptionProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState("db_visualizer_export");
    const [fileType] = useState("sql"); // ["sql", "json"]
    const selectedScript = useSelector((state: RootState) => state.script.selectedScript);

    const handleExport = () => {
        if(!selectedScript) return;
        const blob = new Blob([selectedScript.text], { type: "text/plain;charset=utf-8" });
        const href = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = href;
        link.download = `${fileName}.${fileType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsModalOpen(false);
    }

    return (
        <>
            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col text-black p-4">
                    <p className="font-bold text-2xl">Export SQL File</p>
                    <div className="flex flex-col mt-4">
                        <p className='font-bold'>File Name</p>
                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="border rounded-md p-2"
                            placeholder="File name"
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                    <button title="Cancel Export" className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md text-white" onClick={() => setIsModalOpen(false)}>
                        Cancel Export
                    </button>

                    <button title="Accept Export" className="flex gap-1 bg-indigo-900 hover:bg-indigo-800 p-2 rounded-md text-white" onClick={handleExport}>
                        <IconDownload stroke='white' size={20} strokeWidth={2} className='my-auto' />
                        Export
                    </button>
                </div>
            </Modal>

            <button title="Export SQL File" className={`bg-dark hover:bg-zinc-800 p-2 text-white ${extraClasses}`} onClick={() => setIsModalOpen(true)}>
                <IconDownload stroke='white' size={20} strokeWidth={2} />
            </button>
        </>
    );
};

export default ExportSqlOption;
