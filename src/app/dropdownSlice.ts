/* eslint-disable @typescript-eslint/no-explicit-any */
// store/dropdownSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DropdownOption {
    [key: string]: any;
}

interface DropdownState {
    [key: string]: {
        data: DropdownOption[];
        labelKey?: string;
        valueKey?: string;
        hasMoreData?: boolean;
        isLoading?: boolean;
        searchCriteria?: string;
        append?: boolean;
    };
}

const initialState: DropdownState = {};

const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        setDropdownData: (
            state,
            action: PayloadAction<{
                name: string;
                data: DropdownOption[];
                labelKey?: string;
                valueKey?: string;
                hasMoreData?: boolean;
                isLoading?: boolean;
                searchCriteria?: string;
                append?: boolean;   // optional: append vs overwrite
            }>
        ) => {
            const {
                name,
                data,
                labelKey,
                valueKey,
                hasMoreData,
                isLoading,
                searchCriteria,
                append = false,
            } = action.payload;

            const prev = state[name] || { data: [] };

            state[name] = {
                ...prev,                         // keep old values
                data,  // append or replace
                ...(labelKey !== undefined ? { labelKey } : {}),
                ...(valueKey !== undefined ? { valueKey } : {}),
                ...(hasMoreData !== undefined ? { hasMoreData } : {}),
                ...(isLoading !== undefined ? { isLoading } : {}),
                ...(searchCriteria !== undefined ? { searchCriteria } : {}),
            };
        },

        resetDropdownData: (state, action: PayloadAction<{ name: string }>) => {
            const { name } = action.payload;
            delete state[name]; // or state[name] = { data: [] };
        },

    },

});

export const { setDropdownData, resetDropdownData } = dropdownSlice.actions;
export default dropdownSlice.reducer;
