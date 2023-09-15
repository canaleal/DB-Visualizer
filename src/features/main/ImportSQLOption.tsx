import React, { useState, useRef } from 'react';
import Modal from "../../components/Modal";
import { IconUpload } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { setSelectedScript } from '../../store/scriptSlice';
import { IScript } from '../../types';

interface IImportSqlOptionProps {
    extraClasses?: string;
}

const ImportSqlOption = ({ extraClasses }: IImportSqlOptionProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sqlFileContent, setSqlFileContent] = useState<string | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const handleFileRead = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setSqlFileContent(e.target?.result as string);
            reader.readAsText(file);
        }
    }

    const acceptImport = () => {

        if (!sqlFileContent) return;
        //todo : Add a check to see if the file is a valid sql file
        //Create new script object
        const script : IScript = {
            id: Math.random().toString(36).substr(2, 9),
            title: "Imported SQL File",
            text: sqlFileContent,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
        dispatch(setSelectedScript(script));
        setSqlFileContent(null);
        setIsModalOpen(false);
    }

    const cancelImport = () => {
        setSqlFileContent(null);
        setIsModalOpen(false);
    }

    return (
        <>
            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col text-black p-4">
                    <p className="font-bold text-2xl">Import SQL File</p>

                    {sqlFileContent ? (
                        <div className="flex flex-col mt-4 h-64 overflow-auto">
                            <pre>{sqlFileContent}</pre>
                        </div>
                    ) : (
                        <div className="flex flex-col mt-4 h-fit overflow-auto">
                            <p>Import any SQL file into the editor.</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-row justify-between gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                    <button title="Cancel Import" className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md text-white" onClick={cancelImport}>
                        Cancel Import
                    </button>
                    {sqlFileContent ? (
                        <button title="Accept Import" className="flex gap-1 bg-indigo-900 hover:bg-indigo-800 p-2 rounded-md text-white" onClick={acceptImport}>
                            <IconUpload stroke='white' size={20} strokeWidth={2} className='my-auto' />
                            Accept Import
                        </button>
                    ) : (
                        <button title="Open File Explorer" className=" bg-indigo-900 hover:bg-indigo-800 p-2 rounded-md  text-white" onClick={() => fileInput.current?.click()}>
                            Open File Explorer
                        </button>
                    )}
                </div>
            </Modal>

            <button title="Import SQL File" className={`bg-dark hover:bg-zinc-800 p-2 text-white ${extraClasses}`} onClick={() => setIsModalOpen(true)}>
                <IconUpload stroke='white' size={20} strokeWidth={2} />
            </button>

            <input type="file" accept=".sql" ref={fileInput} style={{ display: 'none' }} onChange={handleFileRead} />
        </>
    )
}

export default ImportSqlOption;
