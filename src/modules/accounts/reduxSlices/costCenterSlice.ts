// src/features/color/buyerSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { ICostCenter, ICostCenterState } from "../pages/costCenter/costCenter.interface";

const initialState: ICostCenterState = {
    costCenters: [],
    filteredCostCenter: [],
    costCenter: {
        costNo: 0,
        costName: "",
        id: 0,
    },
    paginationObject: createInitialPaginationObject<ICostCenter>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedCostCenters = createAsyncThunk(
    "costCenter/fetchPaginatedCostCenters",
    async (
        { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `/cost-center-list?page=${page}&perPage=${perPage}`
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

// export const fetchAllCostCenters = createAsyncThunk(
//     "costCenter/fetchAllCostCenters",
//     async (_, { rejectWithValue }) => {
//         try {
//             const { hasData } = await checkIfCostCenterStore();
//             if (!hasData) {
//                 const response = await axiosInstance.get(`/cost-center-list-all`);
//                 await saveCostCenterData(response.data);
//                 return response.data;
//             } else {
//                 const data = await getAllCostCenter();
//                 return data;
//             }
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );


export const getCostCenter = createAsyncThunk<ICostCenter[], void, { rejectValue: string }>(
    "costCenter/getCostCenter", async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('/accounts/getCostCenter');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("")
        }
    }
)



export const fetchCostCenter = createAsyncThunk(
    "costCenter/fetchCostCenter",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/cost-center-show/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const createCostCenter = createAsyncThunk(
    "costCenter/createCostCenter",
    async (formState: Omit<ICostCenter, "id">, { rejectWithValue }) => {
        try {
            const { costName, costNo } =
                formState;

            const data = {
                costName: costName,
                costNo: costNo,
            };

            const response = await axiosInstance.post("/cost-center-save", data);
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
export const updateCostCenter = createAsyncThunk(
    "costCenter/updateCostCenter",
    async (formState: ICostCenter, { rejectWithValue }) => {
        try {
            const { costName, costNo, id } =
                formState;

            const data = {
                costName: costName,
                costNo: costNo,
                id: id,
            };

            const response = await axiosInstance.put(
                `/cost-center-update/${data.costNo}`,
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
export const deleteCostCenter = createAsyncThunk(
    "costCenter/deleteCostCenter",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/cost-center-delete/${id}`);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

const costCenterSlice = createSlice({
    name: "costCenter",
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
            .addCase(fetchPaginatedCostCenters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedCostCenters.fulfilled,
                (state, action: PayloadAction<PaginationObject<ICostCenter>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedCostCenters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getCostCenter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getCostCenter.fulfilled,
                (state, action: PayloadAction<ICostCenter[]>) => {
                    state.costCenters = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getCostCenter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCostCenter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCostCenter.fulfilled,
                (state, action: PayloadAction<ICostCenter>) => {
                    state.costCenter = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchCostCenter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetCostCenterForm,
    resetMessage,
    resetError,
} = costCenterSlice.actions;

export default costCenterSlice.reducer;
