import { configureStore } from '@reduxjs/toolkit';
import textEditorReducer from '../features/editor/reducers/textEditorSlice';
import codeTextReducer from './codeTextSlice';

export const store = configureStore({
    reducer: {
        codeText: codeTextReducer,
        textEditor: textEditorReducer,
    },
});
