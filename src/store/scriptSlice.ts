import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EXAMPLE_SCRIPT, EXAMPLE_SCRIPT_1_1 } from './init';
import { IScript } from '../types';

// Define IScript interface

const scriptsFromLocalStorage = localStorage.getItem("codeText") !== null ? JSON.parse(localStorage.getItem("codeText")!) : [EXAMPLE_SCRIPT, EXAMPLE_SCRIPT_1_1];

const saveScriptsToLocalStorage = (scripts: IScript[]) => {
    localStorage.setItem("codeText", JSON.stringify(scripts))
}

interface IScriptState {
    scripts: IScript[];
    selectedScript: IScript;
}

const initialState: IScriptState = {
    scripts: scriptsFromLocalStorage, // initially empty, will be populated from GraphQL
    selectedScript: EXAMPLE_SCRIPT,
};

export const scriptSlice = createSlice({
    name: 'script',
    initialState,
    reducers: {
        setScripts: (state, action: PayloadAction<IScript[]>) => {
            state.scripts = action.payload;
            // Save to localStorage or perform other operations here if needed
            saveScriptsToLocalStorage(action.payload);
        },
        addScript: (state, action: PayloadAction<IScript>) => {
            state.scripts.push(action.payload);
            // Update localStorage or perform other operations here if needed

        },
        setSelectedScript: (state, action: PayloadAction<IScript>) => {
            state.selectedScript = action.payload;

            // Update localStorage or perform other operations here if needed
            const scripts = state.scripts.map((script) => {
                if (script.id === action.payload.id) {
                    return action.payload;
                }
                return script;
            });
            saveScriptsToLocalStorage(scripts);
        },
        resetSelectedScript: (state) => {
            state.selectedScript = EXAMPLE_SCRIPT;
        },
        // More actions can be added as needed
    },
});

export const { setScripts, addScript, setSelectedScript, resetSelectedScript } = scriptSlice.actions;
export default scriptSlice.reducer;