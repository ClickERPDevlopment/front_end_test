// src/features/size/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfSizeStore, getAllSize, saveSizeData, } from "../../../app/idb/production/sizeOperations";
import { ISize, ISizeState } from "../types/size.interface";

const initialState: ISizeState = {
    sizes: [],
    filteredSize: [],
    size: {
        buyerId: 0,
        displayName: "",
        sizeName: "",
        sortingNo: 0,
        id: 0,
        buyerName: ""
    },
    paginationObject: createInitialPaginationObject<ISize>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedSizes = createAsyncThunk(
    "size/fetchPaginatedSizes",
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

export const fetchAllSizes = createAsyncThunk(
    "size/fetchAllSizes",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfSizeStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveSizeData(response.data);
                return response.data;
            } else {
                const data = await getAllSize();
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

export const fetchAllSizesJson = createAsyncThunk(
    "size/fetchAllSizesJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfSizeStore();

            if (!hasData) {
                // Load from public static JSON instead of API
                const res = await fetch("/data/size_list.json");
                if (!res.ok)
                    throw new Error("Failed to load sizes.json");

                const data: ISize[] = await res.json();
                await saveSizeData(data);
                return data;
            }

            const cachedData = await getAllSize();
            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchSize = createAsyncThunk(
    "size/fetchSize",
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

export const createSize = createAsyncThunk(
    "size/createSize",
    async (formState: Omit<ISize, "id">, { rejectWithValue }) => {
        try {
            const { buyerId, displayName, sizeName, sortingNo } = formState;

            const data = {
                buyerId: buyerId,
                displayName: displayName,
                sizeName: sizeName,
                sortingNo: sortingNo,
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
export const updateSize = createAsyncThunk(
    "size/updateSize",
    async (formState: ISize, { rejectWithValue }) => {
        try {
            const { buyerId, displayName, sizeName, sortingNo, id } = formState;

            const data = {
                id: id,
                buyerId: buyerId,
                displayName: displayName,
                sizeName: sizeName,
                sortingNo: sortingNo,
            };

            const response = await axiosInstance.put(`/line-update/${data.id}`, data);
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
export const deleteSize = createAsyncThunk(
    "size/deleteSize",
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

const productionSizeSlice = createSlice({
    name: "color",
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
            .addCase(fetchPaginatedSizes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedSizes.fulfilled,
                (state, action: PayloadAction<PaginationObject<ISize>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedSizes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllSizes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllSizes.fulfilled,
                (state, action: PayloadAction<ISize[]>) => {
                    state.sizes = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllSizes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllSizesJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllSizesJson.fulfilled,
                (state, action: PayloadAction<ISize[]>) => {
                    state.sizes = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllSizesJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSize.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSize.fulfilled, (state, action: PayloadAction<ISize>) => {
                state.size = action.payload;
                state.loading = false;
            })
            .addCase(fetchSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createSize.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSize.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateSize.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSize.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteSize.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSize.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetSizeForm,
    resetMessage,
    resetError,
} = productionSizeSlice.actions;

export default productionSizeSlice.reducer;
