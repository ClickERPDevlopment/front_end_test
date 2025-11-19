import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreatePurchaseRequisitionHistoryPayload, IPurchaseRequisitionHistory, IPurchaseRequisitionHistoryState, PurchaseRequisitionHistoryValidationErrors, UpdatePurchaseRequisitionHistoryPayload, } from "../pages/purchaseRequisitionHistory/purchaseRequisitionHistory.interface";
import { createPurchaseRequisitionHistory, deletePurchaseRequisitionHistory, fetchAllPurchaseRequisitionHistory, fetchPagedPurchaseRequisitionHistory, showPurchaseRequisitionHistory, updatePurchaseRequisitionHistory, } from "../api/purchaseRequisitionHistory.API";

const initialState: IPurchaseRequisitionHistoryState = {
    purchaseRequisitionHistory: {
        id: 0,
        brand: "",
        origin: "",
        model: "",
        stock: "",
        fromDate: "",
        toDate: "",
        purchaseDate: "",
        poNo: "",
        purchaseQuantity: "",
        supplier: "",
        unitPrice: "",
    },
    purchaseRequisitonHistoryList: [
        {
            id: 1,
            brand: "dummy",
            origin: "",
            model: "",
            stock: "",
            fromDate: "",
            toDate: "",
            purchaseDate: "",
            poNo: "",
            purchaseQuantity: "",
            supplier: "",
            unitPrice: "",
        },
        {
            id: 2,
            brand: "dummy",
            origin: "",
            model: "",
            stock: "",
            fromDate: "",
            toDate: "",
            purchaseDate: "",
            poNo: "",
            purchaseQuantity: "",
            supplier: "",
            unitPrice: "",
        },
    ],
    filteredPurchaseRequisitionHistory: [],
    paginationObject: createInitialPaginationObject<IPurchaseRequisitionHistory>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated purchaseRequisitionDetails
export const getPagedPurchaseRequisitionHistory = createAsyncThunk<
    PaginationObject<IPurchaseRequisitionHistory>,
    FetchParams,
    { rejectValue: string }
>("purchase-requisition-history/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedPurchaseRequisitionHistory(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Purchase Requisition History")
        );
    }
});

// Fetch all purchaseRequisitionDetails (non-paginated)
export const getAllPurchaseRequisitionHistory = createAsyncThunk<
    IPurchaseRequisitionHistory[],
    void,
    { rejectValue: string }
>("purchase-requisition-history/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllPurchaseRequisitionHistory();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all Purchase Requisition History")
        );
    }
});

// Fetch one purchaseRequisitionDetails by ID
export const getPurchaseRequisitionHistory = createAsyncThunk<
    IPurchaseRequisitionHistory,
    number,
    { rejectValue: string }
>("purchase-requisition-history/show", async (id, thunkAPI) => {
    try {
        return await showPurchaseRequisitionHistory(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Purchase Requisition History")
        );
    }
});

// Create new purchaseRequisitionDetails
export const addPurchaseRequisitionHistory = createAsyncThunk<
    { message: string },
    CreatePurchaseRequisitionHistoryPayload,
    { rejectValue: string }
>("purchase-requisition-history/add", async (payload, thunkAPI) => {
    try {
        return await createPurchaseRequisitionHistory(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create Purchase Requisition History")
        );
    }
});

// Update purchaseRequisitionDetails
export const editPurchaseRequisitionHistory = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdatePurchaseRequisitionHistoryPayload },
    { rejectValue: string }
>("purchase-requisition-history/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updatePurchaseRequisitionHistory(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update purchaseRequisitionDetails")
        );
    }
});

// Delete 
export const removePurchaseRequisitionHistory = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("purchase-requisiton-history/delete", async (id, thunkAPI) => {
    try {
        return await deletePurchaseRequisitionHistory(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete purchaseRequisitionDetails")
        );
    }
});

// Slice
const purchaseRequisitionDetailsSlice = createSlice({
    name: "purchaserequisition",
    initialState,
    reducers: {
        updatePurchaseRequisitionHistoryField<K extends keyof IPurchaseRequisitionHistory>(
            state: IPurchaseRequisitionHistoryState,
            action: PayloadAction<{ key: K; value: IPurchaseRequisitionHistory[K] }>
        ) {
            const { key, value } = action.payload;
            state.purchaseRequisitionHistory[key] = value;
        },
        updatePurchaseRequisitionHistoryRow(
            state,
            action: PayloadAction<{
                id: number;
                key: keyof IPurchaseRequisitionHistory;
                value: string;
            }>
        ) {
            const { id, key, value } = action.payload;

            const row = state.purchaseRequisitonHistoryList.find(
                (r: IPurchaseRequisitionHistory) => r.id === id
            );

            if (row) {
                (row[key] as string) = value;
            }
        },
        setPurchaseRequisitionHistoryValidationErrors(
            state,
            action: PayloadAction<PurchaseRequisitionHistoryValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        // updatePurchaseRequisitionHistoryRow(
        //     state,
        //     action: PayloadAction<{ id: number; key: keyof IPurchaseRequisitionHistory; value: string }>
        // ) {
        //     const { id, key, value } = action.payload;
        //     const row = state.purchaseRequisitons.find(r => r.id === id);
        //     if (row) {
        //         (row[key] as string) = value;
        //     }
        // },

        clearPurchaseRequisitionHistoryValidationErrors(state) {
            state.validationErrors = null;
        },
        clearPurchaseRequisitionHistoryMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                purchaseRequisitionDetails: state.purchaseRequisitionHistory,
            };
        },
        clearPurchaseRequisitionHistoryState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedPurchaseRequisitionHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedPurchaseRequisitionHistory.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.purchaseRequisitonHistoryList = data;
                state.loading = false;
            })
            .addCase(getPagedPurchaseRequisitionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllPurchaseRequisitionHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPurchaseRequisitionHistory.fulfilled, (state, action) => {
                state.purchaseRequisitonHistoryList = action.payload;
                state.loading = false;
            })
            .addCase(getAllPurchaseRequisitionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getPurchaseRequisitionHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurchaseRequisitionHistory.fulfilled, (state, action) => {
                state.purchaseRequisitionHistory = action.payload;
                state.loading = false;
            })
            .addCase(getPurchaseRequisitionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addPurchaseRequisitionHistory.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addPurchaseRequisitionHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addPurchaseRequisitionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create purchaseRequisitionDetails";
            })

            .addCase(editPurchaseRequisitionHistory.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editPurchaseRequisitionHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editPurchaseRequisitionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removePurchaseRequisitionHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePurchaseRequisitionHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removePurchaseRequisitionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default purchaseRequisitionDetailsSlice.reducer;

export const {
    updatePurchaseRequisitionHistoryField,
    updatePurchaseRequisitionHistoryRow,
    setPurchaseRequisitionHistoryValidationErrors,
    clearPurchaseRequisitionHistoryValidationErrors,
    clearPurchaseRequisitionHistoryMessages,
    clearPurchaseRequisitionHistoryState,
} = purchaseRequisitionDetailsSlice.actions;
