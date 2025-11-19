// src/features/voucherType/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfVoucherTypeStore, getAllVoucherType, saveVoucherTypeData, } from "../../../app/idb/accounts/voucherTypeOperations";
import { VoucherType, VoucherTypeState } from "../pages/voucherType/voucherType.interface";

const initialState: VoucherTypeState = {
    voucherTypes: [],
    filteredVoucherType: [],
    voucherType: {
        alias: "",
        companyNo: 0,
        descr: "",
        nature: 0,
        typeName: "",
        vDefault: 1,
        vType: "",
        vtypeNo: 0
    },
    paginationObject: createInitialPaginationObject<VoucherType>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedVoucherTypes = createAsyncThunk(
    "voucherType/fetchPaginatedVoucherTypes",
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

export const fetchAllVoucherTypes = createAsyncThunk(
    "voucherType/fetchAllVoucherTypes",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfVoucherTypeStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveVoucherTypeData(response.data);
                return response.data;
            } else {
                const data = await getAllVoucherType();
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

export const fetchAllVoucherTypesJson = createAsyncThunk(
    "voucherType/fetchAllVoucherTypesJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfVoucherTypeStore();
            if (!hasData) {
                const res = await fetch("/data/voucher_type_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: VoucherType[] = await res.json(); // ✅ parse JSON properly
                await saveVoucherTypeData(response);
                return response;
            } else {
                const data = await getAllVoucherType();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchVoucherType = createAsyncThunk(
    "voucherType/fetchVoucherType",
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

export const createVoucherType = createAsyncThunk(
    "voucherType/createVoucherType",
    async (formState: Omit<VoucherType, "id">, { rejectWithValue }) => {
        try {
            const { alias, companyNo, descr, nature, typeName, vDefault, vType, vtypeNo } = formState;

            const data = {
                alias: alias,
                companyNo: companyNo,
                descr: descr,
                nature: nature,
                typeName: typeName,
                vDefault: vDefault,
                vType: vType,
                vtypeNo: vtypeNo,
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
export const updateVoucherType = createAsyncThunk(
    "voucherType/updateVoucherType",
    async (formState: VoucherType, { rejectWithValue }) => {
        try {
            const { alias, companyNo, descr, nature, typeName, vDefault, vType, vtypeNo, } = formState;

            const data = {
                alias: alias,
                companyNo: companyNo,
                descr: descr,
                nature: nature,
                typeName: typeName,
                vDefault: vDefault,
                vType: vType,
                vtypeNo: vtypeNo,
            };

            const response = await axiosInstance.put(`/line-update/${data.vtypeNo}`, data);
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
export const deleteVoucherType = createAsyncThunk(
    "voucherType/deleteVoucherType",
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
    name: "voucherType",
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
            .addCase(fetchPaginatedVoucherTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedVoucherTypes.fulfilled,
                (state, action: PayloadAction<PaginationObject<VoucherType>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedVoucherTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllVoucherTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllVoucherTypes.fulfilled,
                (state, action: PayloadAction<VoucherType[]>) => {
                    state.voucherTypes = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllVoucherTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllVoucherTypesJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllVoucherTypesJson.fulfilled,
                (state, action: PayloadAction<VoucherType[]>) => {
                    state.voucherTypes = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllVoucherTypesJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchVoucherType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVoucherType.fulfilled, (state, action: PayloadAction<VoucherType>) => {
                state.voucherType = action.payload;
                state.loading = false;
            })
            .addCase(fetchVoucherType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createVoucherType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createVoucherType.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createVoucherType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateVoucherType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateVoucherType.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateVoucherType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteVoucherType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteVoucherType.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteVoucherType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetVoucherTypeForm,
    resetMessage,
    resetError,
} = colorSlice.actions;

export default colorSlice.reducer;
