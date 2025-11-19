// src/features/accountingPeriod/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfAccountingPeriodStore, getAllAccountingPeriod, saveAccountingPeriodData } from "../../../app/idb/accounts/accountingPeriodOperations";
import { AccountingPeriod, AccountingPeriodState } from "../pages/periodSetup/accountingPeriod.interface";

const initialState: AccountingPeriodState = {
    accountingPeriods: [],
    filteredAccountingPeriod: [],
    accountingPeriod: {
        closeFlag: 1,
        companyNo: 0,
        endPeriodDate: "",
        periodNo: 0,
        startPeriodDate: ""
    },
    paginationObject: createInitialPaginationObject<AccountingPeriod>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedAccountingPeriods = createAsyncThunk(
    "accountingPeriod/fetchPaginatedAccountingPeriods",
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

export const fetchAllAccountingPeriods = createAsyncThunk(
    "accountingPeriod/fetchAllAccountingPeriods",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfAccountingPeriodStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveAccountingPeriodData(response.data);
                return response.data;
            } else {
                const data = await getAllAccountingPeriod();
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

export const fetchAllAccountingPeriodsJson = createAsyncThunk(
    "accountingPeriod/fetchAllAccountingPeriodsJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfAccountingPeriodStore();
            if (!hasData) {
                const res = await fetch("/data/color_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: AccountingPeriod[] = await res.json(); // ✅ parse JSON properly
                await saveAccountingPeriodData(response);
                return response;
            } else {
                const data = await getAllAccountingPeriod();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchAccountingPeriod = createAsyncThunk(
    "accountingPeriod/fetchAccountingPeriod",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/line-show/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const createAccountingPeriod = createAsyncThunk(
    "accountingPeriod/createAccountingPeriod",
    async (formState: Omit<AccountingPeriod, "id">, { rejectWithValue }) => {
        try {
            const { closeFlag, companyNo, endPeriodDate, periodNo, startPeriodDate } = formState;

            const data = {
                closeFlag: closeFlag,
                companyNo: companyNo,
                endPeriodDate: endPeriodDate,
                periodNo: periodNo,
                startPeriodDate: startPeriodDate,
            };

            const response = await axiosInstance.post("/line-save", data);
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
export const updateAccountingPeriod = createAsyncThunk(
    "accountingPeriod/updateAccountingPeriod",
    async (formState: AccountingPeriod, { rejectWithValue }) => {
        try {
            const { closeFlag, companyNo, endPeriodDate, periodNo, startPeriodDate } = formState;

            const data = {
                closeFlag: closeFlag,
                companyNo: companyNo,
                endPeriodDate: endPeriodDate,
                periodNo: periodNo,
                startPeriodDate: startPeriodDate,
            };

            const response = await axiosInstance.put(`/line-update/${data.periodNo}`, data);
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
export const deleteAccountingPeriod = createAsyncThunk(
    "accountingPeriod/deleteAccountingPeriod",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/line-delete/${id}`);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

const colorSlice = createSlice({
    name: "accountingPeriod",
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
            .addCase(fetchPaginatedAccountingPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedAccountingPeriods.fulfilled,
                (state, action: PayloadAction<PaginationObject<AccountingPeriod>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedAccountingPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllAccountingPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllAccountingPeriods.fulfilled,
                (state, action: PayloadAction<AccountingPeriod[]>) => {
                    state.accountingPeriods = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllAccountingPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllAccountingPeriodsJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllAccountingPeriodsJson.fulfilled,
                (state, action: PayloadAction<AccountingPeriod[]>) => {
                    state.accountingPeriods = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllAccountingPeriodsJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAccountingPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccountingPeriod.fulfilled, (state, action: PayloadAction<AccountingPeriod>) => {
                state.accountingPeriod = action.payload;
                state.loading = false;
            })
            .addCase(fetchAccountingPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createAccountingPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createAccountingPeriod.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createAccountingPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateAccountingPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateAccountingPeriod.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateAccountingPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteAccountingPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteAccountingPeriod.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteAccountingPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetAccountingPeriodForm,
    resetMessage,
    resetError,
} = colorSlice.actions;

export default colorSlice.reducer;
