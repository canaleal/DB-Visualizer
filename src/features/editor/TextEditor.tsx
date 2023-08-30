
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCodeText } from '../../store/codeTextSlice';
import SideBar from './components/SideBar';

const TextEditor = () => {

    //? Maybe add more languages in the future
    const [theme] = useState('light');
    const [language] = useState('sql');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeText = useSelector((state: any) => state.codeText.codeText);
    const dispatch = useDispatch();
    return (
        <div className='flex flex-row h-full w-full relative'>

            <SideBar />

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
        </div>


    )

}

export default TextEditor;