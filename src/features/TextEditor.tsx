
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';

import { setCodeText } from '../store/codeTextSlice';

const TextEditor = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeText = useSelector((state: any) => state.codeText.codeText);
    const dispatch = useDispatch();
    return (
        <Editor
            height="100%"
            theme="vs-dark"
            language="sql"
            value={codeText}
            onChange={(value) => dispatch(setCodeText(value!))}
            options={{
                wordWrap: 'on',
                minimap: { enabled: true },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
            }}
        />
    )

}

export default TextEditor;