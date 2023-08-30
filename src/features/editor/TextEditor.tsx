
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCodeText } from '../../store/codeTextSlice';
import { RootState } from '../../store/store';
import SideBar from './components/SideBar';

const TextEditor = () => {

    const codeText = useSelector((state: RootState) => state.codeText.codeText);
    const theme = useSelector((state: RootState) => state.textEditor.theme);
    const language = useSelector((state: RootState) => state.textEditor.language);
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