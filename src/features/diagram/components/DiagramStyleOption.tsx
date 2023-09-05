import React, { useState } from 'react';
import { ColorInput } from '@mantine/core';
import { Panel } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { resetAllThemes, setEnumTheme, setTableTheme } from '../diagramStyleSlice';
import { IconAdjustmentsAlt, IconTrash } from '@tabler/icons-react';
import { IEnumTheme, ITableTheme } from '../types';

const DiagramStyleOption = () => {
    const tableTheme = useSelector((state: RootState) => state.diagramStyle.tableTheme);
    const enumTheme = useSelector((state: RootState) => state.diagramStyle.enumTheme);
    const dispatch = useDispatch();
    const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);

    const handleThemeChange = (themeType: string, theme: ITableTheme | IEnumTheme, option: string, color: string) => {
        const newTheme = { ...theme };
        newTheme[option as keyof ITableTheme | keyof IEnumTheme] = color;
        dispatch(themeType === 'table' ? setTableTheme(newTheme) : setEnumTheme(newTheme));
    };

    const renderColorInput = (label: string, theme: ITableTheme | IEnumTheme, option: string, themeType: string) => (
        <ColorInput
            placeholder="Pick color"
            label={label}
            defaultValue={theme[option as keyof ITableTheme | keyof IEnumTheme]}
            disallowInput
            withPicker={true}
            onChange={(color) => handleThemeChange(themeType, theme, option, color)}
        />
    );

    const handleReset = () => {
        dispatch(resetAllThemes());
        setIsStyleMenuOpen(false);
    }

    return (
        <Panel position="top-left" className='flex flex-row gap-2'>
            <button className="bg-indigo-900 hover:bg-indigo-800 p-2 text-white rounded-md h-fit" onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}>
                <IconAdjustmentsAlt stroke='white' size={20} strokeWidth={2} />
            </button>
            {isStyleMenuOpen && (
                <div className='bg-white flex flex-col border-2 rounded-md'>
                    <div className='flex flex-col gap-2 p-4'>
                        {['Table', 'Enum'].map((type, i) => {
                            const theme = type === 'Table' ? tableTheme : enumTheme;
                            const themeType = type.toLowerCase();
                            return (
                                <div key={i}>
                                    <p className='font-bold'>{`${type} Style`}</p>
                                    <div className='flex flex-row gap-2'>
                                        {renderColorInput(`${type} Header`, theme, 'headerBackgroundColor', themeType)}
                                        {renderColorInput(`${type} Header Text`, theme, 'headerTextColor', themeType)}
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        {renderColorInput(`${type} Body`, theme, 'bodyBackgroundColor', themeType)}
                                        {renderColorInput(`${type} Body Text`, theme, 'bodyTextColor', themeType)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-row justify-between gap-2 mt-2 bg-gray-100 px-4 py-4 rounded-b-md">
                        <button title="Reset Text Editor" className={`flex gap-1 p-2 bg-zinc-900 hover:bg-zinc-800 text-white  rounded-md  `} onClick={() => { handleReset(); }}>
                            <IconTrash stroke='black' size={20} strokeWidth={2} className='my-auto' />
                            Reset all Styles
                        </button>
                    </div>
                </div>

            )}
        </Panel>
    );
};

export default DiagramStyleOption;
