import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    codeText: 'Test Test',
};

export const codeTextSlice = createSlice({
    name: 'codeText',
    initialState,
    reducers: {
        setCodeText: (state, action: PayloadAction<string>) => {
            state.codeText = action.payload;
        }
    }
});

export const { setCodeText } = codeTextSlice.actions;
export default codeTextSlice.reducer;