// src/features/chartOfAccount/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfChartOfAccountStore, getAllChartOfAccount, getCashCOA, getLedgerWithoutCashBankCOA, saveChartOfAccountData, } from "../../../app/idb/accounts/chartOfAccountOperations";
import { IChartOfAccount, IChartOfAccountState, } from "../pages/chartOfAccounts/chartOfAccount.interface";

const initialState: IChartOfAccountState = {
    chartOfAccounts: [],
    filteredCreditSideCoa: [],
    filteredDebitSideCoa: [],
    filteredChartOfAccount: [],
    chartOfAccount: {
        accCode: "",
        accName: "",
        accNo: 0,
        accPath: "",
        isAll: "1",
        isBank: "1",
        isCash: "1",
        lvl: 0,
        natureNo: 0,
        parentAccNo: 0,
        tranFlag: 1,
    },
    paginationObject: createInitialPaginationObject<IChartOfAccount>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedChartOfAccounts = createAsyncThunk(
    "chartOfAccount/fetchPaginatedChartOfAccounts",
    async (
        { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `ChartOfAccount/paged?PageNumber=${page}&PageSize=${perPage}`
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

export const fetchAllChartOfAccounts = createAsyncThunk(
    "chartOfAccount/fetchAllChartOfAccounts",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfChartOfAccountStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveChartOfAccountData(response.data);
                return response.data;
            } else {
                const data = await getAllChartOfAccount();
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

export const fetchCOAForVoucherEntery = createAsyncThunk(
    "chartOfAccount/fetchCOAForVoucherEntery",
    async ({ nature }: { nature: number }, { rejectWithValue }) => {
        try {
            let debitSide, creditSide;
            if (nature === 4) {
                debitSide = await getCashCOA();
                creditSide = await getLedgerWithoutCashBankCOA();
            }
            return {
                debitSide: debitSide,
                creditSide: creditSide,
            };
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllChartOfAccountsJson = createAsyncThunk(
    "chartOfAccount/fetchAllChartOfAccountsJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfChartOfAccountStore();

            if (!hasData) {
                const res = await fetch("/data/chart_of_account_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: IChartOfAccount[] = await res.json(); // ✅ parse JSON properly
                await saveChartOfAccountData(response);
                return response;
            } else {
                const data = await getAllChartOfAccount();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchChartOfAccount = createAsyncThunk(
    "chartOfAccount/fetchChartOfAccount",
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

export const createChartOfAccount = createAsyncThunk(
    "chartOfAccount/createChartOfAccount",
    async (formState: Omit<IChartOfAccount, "id">, { rejectWithValue }) => {
        try {
            const {
                accCode,
                accName,
                accNo,
                accPath,
                isAll,
                isBank,
                isCash,
                lvl,
                natureNo,
                parentAccNo,
                tranFlag,
            } = formState;

            const data = {
                accCode: accCode,
                accName: accName,
                accNo: accNo,
                accPath: accPath,
                isAll: isAll,
                isBank: isBank,
                isCash: isCash,
                lvl: lvl,
                natureNo: natureNo,
                parentAccNo: parentAccNo,
                tranFlag: tranFlag,
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
export const updateChartOfAccount = createAsyncThunk(
    "chartOfAccount/updateChartOfAccount",
    async (formState: IChartOfAccount, { rejectWithValue }) => {
        try {
            const {
                accCode,
                accName,
                accNo,
                accPath,
                isAll,
                isBank,
                isCash,
                lvl,
                natureNo,
                parentAccNo,
                tranFlag,
            } = formState;

            const data = {
                accCode: accCode,
                accName: accName,
                accNo: accNo,
                accPath: accPath,
                isAll: isAll,
                isBank: isBank,
                isCash: isCash,
                lvl: lvl,
                natureNo: natureNo,
                parentAccNo: parentAccNo,
                tranFlag: tranFlag,
            };

            const response = await axiosInstance.put(
                `/line-update/${data.accNo}`,
                data
            );
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
export const deleteChartOfAccount = createAsyncThunk(
    "chartOfAccount/deleteChartOfAccount",
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
    name: "chartOfAccount",
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
            .addCase(fetchPaginatedChartOfAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedChartOfAccounts.fulfilled,
                (state, action: PayloadAction<PaginationObject<IChartOfAccount>>) => {
                    const { data, ...paginationWithoutData } = action.payload;
                    state.paginationObject = {
                        ...paginationWithoutData,
                        data: [],
                    };
                    state.chartOfAccounts = data;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedChartOfAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllChartOfAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllChartOfAccounts.fulfilled,
                (state, action: PayloadAction<IChartOfAccount[]>) => {
                    state.chartOfAccounts = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllChartOfAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchCOAForVoucherEntery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCOAForVoucherEntery.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        debitSide: IChartOfAccount[] | undefined;
                        creditSide: IChartOfAccount[] | undefined;
                    }>
                ) => {
                    state.filteredDebitSideCoa = action.payload.debitSide || [];
                    state.filteredCreditSideCoa = action.payload.creditSide || [];
                    state.loading = false;
                }
            )
            .addCase(fetchCOAForVoucherEntery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllChartOfAccountsJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllChartOfAccountsJson.fulfilled,
                (state, action: PayloadAction<IChartOfAccount[]>) => {
                    state.chartOfAccounts = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllChartOfAccountsJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchChartOfAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchChartOfAccount.fulfilled,
                (state, action: PayloadAction<IChartOfAccount>) => {
                    state.chartOfAccount = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchChartOfAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createChartOfAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createChartOfAccount.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createChartOfAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateChartOfAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateChartOfAccount.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateChartOfAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteChartOfAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteChartOfAccount.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteChartOfAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetChartOfAccountForm,
    resetMessage,
    resetError,
} = colorSlice.actions;

export default colorSlice.reducer;
