import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITableTheme, IEnumTheme } from './types';

interface IDiagramStyleState {
    tableTheme: ITableTheme;
    enumTheme: IEnumTheme;
}

const initTableTheme: ITableTheme = {
    headerBackgroundColor: '#18181b',
    headerTextColor: '#ffffff',
    bodyBackgroundColor: '#3f3f46',
    bodyBackgroundHoverColor: '#52525b',
    bodyTextColor: '#ffffff',
};
const tableThemeFromLocalStorage = localStorage.getItem("tableTheme") !== null ? JSON.parse(localStorage.getItem("tableTheme")!) : initTableTheme;

const initEnumTheme: IEnumTheme = {
    headerBackgroundColor: '#3730a3',
    headerTextColor: '#ffffff',
    bodyBackgroundColor: '#3f3f46',
    bodyBackgroundHoverColor: '#52525b',
    bodyTextColor: '#ffffff',
}
const enumThemeFromLocalStorage = localStorage.getItem("enumTheme") !== null ? JSON.parse(localStorage.getItem("enumTheme")!) : initEnumTheme;

const saveThemesToLocalStorage = (tableTheme: ITableTheme, enumTheme:IEnumTheme) => {
    localStorage.setItem("tableTheme", JSON.stringify(tableTheme))
    localStorage.setItem("enumTheme", JSON.stringify(enumTheme))
}

const initialState: IDiagramStyleState = {
    tableTheme : tableThemeFromLocalStorage,
    enumTheme: enumThemeFromLocalStorage
};

export const diagramStyleSlice = createSlice({
    name: 'diagramStyle',
    initialState,
    reducers: {
        setTableTheme: (state, action: PayloadAction<ITableTheme>) => {
            state.tableTheme = action.payload;
            saveThemesToLocalStorage(action.payload, state.enumTheme);
        },
        setEnumTheme: (state, action: PayloadAction<IEnumTheme>) => {
            state.enumTheme = action.payload;
            saveThemesToLocalStorage(state.tableTheme, action.payload);
        },
        resetTableTheme: (state) => {
            state.tableTheme = initTableTheme;
            saveThemesToLocalStorage(initTableTheme, state.enumTheme);
        },
        resetEnumTheme: (state) => {
            state.enumTheme = initEnumTheme;
            saveThemesToLocalStorage(state.tableTheme, initEnumTheme);
        },
        resetAllThemes: (state) => {
            state.tableTheme = initTableTheme;
            state.enumTheme = initEnumTheme;
            saveThemesToLocalStorage(initTableTheme, initEnumTheme);
        }
    }
});

export const { setTableTheme, setEnumTheme, resetTableTheme, resetEnumTheme, resetAllThemes } = diagramStyleSlice.actions;
export default diagramStyleSlice.reducer;