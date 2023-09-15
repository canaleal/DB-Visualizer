import { configureStore } from '@reduxjs/toolkit';
import textEditorReducer from '../features/editor/textEditorSlice';
import scriptReducer from './scriptSlice';
import diagramStyleReducer from '../features/diagram/diagramStyleSlice';

export const store = configureStore({
    reducer: {
        script: scriptReducer,
        textEditor: textEditorReducer,
        diagramStyle: diagramStyleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>