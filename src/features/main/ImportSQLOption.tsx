import React, { useState, useRef } from 'react';
import Modal from "../../components/Modal";
import { IconUpload } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { setCodeText } from '../../store/codeTextSlice';

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

    const acceptInput = () => {

        if (!sqlFileContent) return;
        //todo : Add a check to see if the file is a valid sql file
        dispatch(setCodeText(sqlFileContent));
        setSqlFileContent(null);
        setIsModalOpen(false);
    }

    const cancelInput = () => {
        // Reset the content and close the modal
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
                            <p>Imported SQL Content:</p>
                            <pre>{sqlFileContent}</pre>
                        </div>
                    ) : (
                        <button title="Open File Explorer" className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md mt-4 text-white" onClick={() => fileInput.current?.click()}>
                            Open File Explorer
                        </button>
                    )}
                </div>
                {sqlFileContent && (
                    <div className="flex flex-row justify-between gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                        <button title="Cancel Input" className="bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md text-white" onClick={cancelInput}>
                            Cancel Input
                        </button>

                        <button title="Accept Input" className="flex gap-1 bg-indigo-900 hover:bg-indigo-800 p-2 rounded-md text-white" onClick={acceptInput}>
                            <IconUpload stroke='white' size={20} strokeWidth={2} className='my-auto' />
                            Accept Input
                        </button>
                    </div>
                )}
            </Modal>

            <button title="Import SQL File" className={`bg-dark hover:bg-zinc-800 p-2 text-white ${extraClasses}`} onClick={() => setIsModalOpen(true)}>
                <IconUpload stroke='white' size={20} strokeWidth={2} />
            </button>

            <input type="file" accept=".sql" ref={fileInput} style={{ display: 'none' }} onChange={handleFileRead} />
        </>
    )
}

export default ImportSqlOption;
