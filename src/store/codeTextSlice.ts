import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EXAMPLE_SQL } from './init';


const codeTextFromLocalStorage = localStorage.getItem("codeText") !== null ? JSON.parse(localStorage.getItem("codeText")!) : EXAMPLE_SQL;

const saveCodeTextToLocalStorage = (codeText: string) => {
    localStorage.setItem("codeText", JSON.stringify(codeText))
}

interface ICodeTextState {
    codeText: string;
}

const initialState : ICodeTextState = {
    codeText: codeTextFromLocalStorage,
};

export const codeTextSlice = createSlice({
    name: 'codeText',
    initialState,
    reducers: {

        setCodeText: (state, action: PayloadAction<string>) => {
            state.codeText = action.payload;
            saveCodeTextToLocalStorage(action.payload);
        },
        resetCodeText: (state) => {
            state.codeText = EXAMPLE_SQL;
            saveCodeTextToLocalStorage(EXAMPLE_SQL);
        }
    }
});

export const { setCodeText} = codeTextSlice.actions;
export default codeTextSlice.reducer;