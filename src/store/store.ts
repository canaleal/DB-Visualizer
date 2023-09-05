import { configureStore } from '@reduxjs/toolkit';
import textEditorReducer from '../features/editor/textEditorSlice';
import codeTextReducer from './codeTextSlice';
import diagramStyleReducer from '../features/diagram/diagramStyleSlice';

export const store = configureStore({
    reducer: {
        codeText: codeTextReducer,
        textEditor: textEditorReducer,
        diagramStyle: diagramStyleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>