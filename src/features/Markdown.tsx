import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import remarkGfm from 'remark-gfm';

const Markdown = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeText = useSelector((state: any) => state.codeText.codeText);
    
    return (
        <ReactMarkdown children={codeText}  remarkPlugins={[remarkGfm]} />
    )
}

export default Markdown