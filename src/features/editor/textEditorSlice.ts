import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType, ThemeType } from './types';

interface ITextEditorState {
    theme: ThemeType;
    language: LanguageType;
}

const initialState: ITextEditorState = {
    theme: 'light',
    language: 'sql',
};

export const textEditorSlice = createSlice({
    name: 'codeText',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<LanguageType>) => {
            state.language = action.payload;
        }
    }
});

export const { setTheme, setLanguage } = textEditorSlice.actions;
export default textEditorSlice.reducer;