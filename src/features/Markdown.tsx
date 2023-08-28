import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
const Markdown = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeText = useSelector((state: any) => state.codeText.codeText);
    
    return (
        <ReactMarkdown>{codeText}</ReactMarkdown>
    )
}

export default Markdown