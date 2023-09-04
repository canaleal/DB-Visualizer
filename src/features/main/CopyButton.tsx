import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../store/store";
import { toUrlSafeB64 } from "../../helpers/urlGenerators";
import IconShare from "../../components/icons/iconShare";

interface ICopyButtonProps {
    extraClasses?: string;
}

const CopyButton = ({extraClasses} : ICopyButtonProps) => {

    const codeText = useSelector((state: RootState) => state.codeText.codeText);

    const createCopyLink = async () => {
        const params = new URLSearchParams({ code: toUrlSafeB64(codeText) });
        const toCopy = `${location.origin}?${params.toString()}`;
        await navigator.clipboard.writeText(toCopy);
    };

    return (
        <button title="Share Link" className={`bg-indigo-900 hover:bg-indigo-800 p-2 text-white ${extraClasses}`} onClick={createCopyLink}>
            <IconShare fillColor='white' size={20} />
        </button>
    )
}

export default CopyButton