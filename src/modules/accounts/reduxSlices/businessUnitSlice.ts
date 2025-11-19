// src/features/businessUnit/buyerSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { checkIfBusinessUnitStore, getAllBusinessUnit, saveBusinessUnitData, } from "../../../app/idb/accounts/businessUnitOperations";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { IBusinessUnit, IBusinessUnitState } from "../pages/businessUnitSetup/businessUnit.interface";

const initialState: IBusinessUnitState = {
    businessUnits: [],
    businessUnit: {
        baName: "",
        baNo: 0,
        id: 0,
    },
    filteredBusinessUnit: [],
    paginationObject: createInitialPaginationObject<IBusinessUnit>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedBusinessUnits = createAsyncThunk(
    "businessUnit/fetchPaginatedBusinessUnits",
    async (
        { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `/line-list?page=${page}&perPage=${perPage}`
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;

            // Safely access error.response?.data?.message
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllBusinessUnits = createAsyncThunk(
    "businessUnit/fetchAllBusinessUnits",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfBusinessUnitStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/accounts/getBusinessUnit`);
                await saveBusinessUnitData(response.data);
                return response.data;
            } else {
                const data = await getAllBusinessUnit();
                return data;
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


export const fetchBusinessUnit = createAsyncThunk(
    "businessUnit/fetchBusinessUnit",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/business-unit-show/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const createBusinessUnit = createAsyncThunk(
    "businessUnit/createBusinessUnit",
    async (formState: Omit<IBusinessUnit, "id">, { rejectWithValue }) => {
        try {
            const { baName, baNo } = formState;

            const data = {
                baName: baName,
                baNo: baNo,
            };

            const response = await axiosInstance.post("/business-unit-save", data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for updating a session
export const updateBusinessUnit = createAsyncThunk(
    "businessUnit/updateBusinessUnit",
    async (formState: IBusinessUnit, { rejectWithValue }) => {
        try {
            const { baName, baNo } = formState;

            const data = {
                baName: baName,
                baNo: baNo,
            };

            const response = await axiosInstance.put(`/business-unit-update/${data.baNo}`, data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for deleting a session
export const deleteBusinessUnit = createAsyncThunk(
    "businessUnit/deleteBusinessUnit",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/business-unit-delete/${id}`);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

const businessUnitSlice = createSlice({
    name: "businessUnit",
    initialState,
    reducers: {
        resetForm(state) {
            Object.assign(state, initialState);
        },
        resetMessage(state) {
            state.message = "";
        },
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedBusinessUnits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedBusinessUnits.fulfilled,
                (state, action: PayloadAction<PaginationObject<IBusinessUnit>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedBusinessUnits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllBusinessUnits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllBusinessUnits.fulfilled,
                (state, action: PayloadAction<IBusinessUnit[]>) => {
                    state.businessUnits = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllBusinessUnits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchBusinessUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessUnit.fulfilled, (state, action: PayloadAction<IBusinessUnit>) => {
                state.businessUnit = action.payload;
                state.loading = false;
            })
            .addCase(fetchBusinessUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createBusinessUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createBusinessUnit.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createBusinessUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateBusinessUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateBusinessUnit.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateBusinessUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteBusinessUnit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteBusinessUnit.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteBusinessUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetBusinessUnitForm,
    resetMessage,
    resetError,
} = businessUnitSlice.actions;

export default businessUnitSlice.reducer;
