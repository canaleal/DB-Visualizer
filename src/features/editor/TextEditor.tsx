
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCodeText } from '../../store/codeTextSlice';
import { useState } from 'react';

const TextEditor = () => {

    //? Maybe add more languages in the future
    const [theme] = useState('vs-dark');
    const [language] = useState('sql');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeText = useSelector((state: any) => state.codeText.codeText);
    const dispatch = useDispatch();
    return (
        <Editor
            height="100%"
            theme={theme}
            language={language}
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