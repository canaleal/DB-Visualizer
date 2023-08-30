import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//! Somewhat overkill to have a slice for this, but it's good practice

const initialState = {
    theme: 'light',
    language: 'sql',
};

export const textEditorSlice = createSlice({
    name: 'codeText',
    initialState,
    reducers: {
        setTheme : (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setLanguage : (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }

    }
});

export const { setTheme, setLanguage } = textEditorSlice.actions;
export default textEditorSlice.reducer;