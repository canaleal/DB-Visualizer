import { configureStore } from '@reduxjs/toolkit';
import textEditorReducer from '../features/editor/textEditorSlice';
import codeTextReducer from './codeTextSlice';

export const store = configureStore({
    reducer: {
        codeText: codeTextReducer,
        textEditor: textEditorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>