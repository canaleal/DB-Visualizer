
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCodeText } from '../../store/codeTextSlice';
import SideBar from './components/SideBar';

const TextEditor = () => {

    //? Maybe add more languages in the future
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeText = useSelector((state: any) => state.codeText.codeText);

    //! Somewhat overkill to have a slice for this, but it's good practice
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useSelector((state: any) => state.textEditor.theme);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const language = useSelector((state: any) => state.textEditor.language);
    
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