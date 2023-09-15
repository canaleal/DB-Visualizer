
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedScript } from '../../store/scriptSlice';
import { RootState } from '../../store/store';
import monokai from './themes/monokai.json';

const TextEditor = () => {

    const scripts = useSelector((state: RootState) => state.script.scripts);
    const selectedScript = useSelector((state: RootState) => state.script.selectedScript);
    const theme = useSelector((state: RootState) => state.textEditor.theme);
    const language = useSelector((state: RootState) => state.textEditor.language);
    const dispatch = useDispatch();

    console.log(scripts);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleEditorWillMount(monaco: any) {
        monaco.editor.defineTheme('monokai', monokai);
        monaco.editor.setTheme('monokai');
    }

    function handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {

        const selectedScript = scripts.find((script) => script.id === event.target.value);
        if (selectedScript) {
            dispatch(setSelectedScript(selectedScript));
        }
    }

    return (

        <>

            <div className="flex flex-col w-full bg-zinc-800">
                <select className="bg-zinc-800 w-full text-white px-4 py-2 " onChange={handleSelectionChange}>
                    {
                        scripts.map((script) => (
                            <option key={script.id} value={script.id}>{script.title}</option>
                        ))
                    }
                </select>

                <div className='py-0.5 bg-indigo-900'></div>
            </div>

            <Editor
                height="100%"
                theme={theme}
                language={language}
                value={selectedScript.text}
                onChange={(value) => dispatch(setSelectedScript({ ...selectedScript, text: value || '' }))}
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
                beforeMount={handleEditorWillMount}

            />
        </>


    )
}

export default TextEditor;