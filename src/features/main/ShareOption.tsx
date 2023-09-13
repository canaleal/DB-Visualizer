import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../store/store";
import { toUrlSafeB64 } from "../../helpers/urlGenerators";
import { IconShare } from '@tabler/icons-react';
import Modal from "../../components/Modal";
import { useState } from "react";

interface IShareOptionProps {
    extraClasses?: string;
}

const ShareOption = ({ extraClasses }: IShareOptionProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const codeText = useSelector((state: RootState) => state.codeText.codeText);

    const createCopyLink = async () => {
        const params = new URLSearchParams({ code: toUrlSafeB64(codeText) });
        const toCopy = `${location.origin}?${params.toString()}`;
        await navigator.clipboard.writeText(toCopy);

        setIsModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col  text-black p-4">
                    <p className="font-bold text-2xl">Create Sharable Link</p>
                    <div className="flex flex-col mt-4">
                        <p >Generate a link to share the diagram with others. </p>
                        <p className="text-red-600">Links do not expire and cannot be deleted!</p>
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                    <button title="Reset Text Editor" className={`bg-zinc-900 hover:bg-zinc-800 p-2 rounded-md text-white `} onClick={() => setIsModalOpen(false)}>
                        Do not create a Link
                    </button>

                    <button title="Reset Text Editor" className={`flex gap-1 bg-indigo-900 hover:bg-indigo-800 p-2  rounded-md text-white`} onClick={() => { createCopyLink(); }}>
                        <IconShare stroke='white' size={20} strokeWidth={2} className='my-auto' />
                        Create Link
                    </button>
                </div>

            </Modal>

            <button title="Share Link" className={`bg-dark hover:bg-zinc-800 p-2 text-white ${extraClasses}`} onClick={() => setIsModalOpen(true)}>
                <IconShare stroke='white' size={20} strokeWidth={2} />
            </button>
        </>
    )
}

export default ShareOption