


import { configureStore } from '@reduxjs/toolkit';
import codeTextReducer from './codeTextSlice';

export const store = configureStore({
    reducer: {
        codeText: codeTextReducer,
    },
});
