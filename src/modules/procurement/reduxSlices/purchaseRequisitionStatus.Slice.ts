import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreatePurchaseRequisitionStatusPayload, IPurchaseRequisitionStatus, IPurchaseRequisitionStatusState, PurchaseRequisitionStatusValidationErrors, UpdatePurchaseRequisitionStatusPayload, } from "../pages/purchaseRequisitionStatus/purchaseRequisitionStatus.interface";
import { createPurchaseRequisitionStatus, deletePurchaseRequisitionStatus, fetchAllPurchaseRequisitionStatus, fetchPagedPurchaseRequisitionStatus, showPurchaseRequisitionStatus, updatePurchaseRequisitionStatus, } from "../api/purchaseRequisitionStatus.API";

const initialState: IPurchaseRequisitionStatusState = {
    purchaseRequisitionStatus: {
        id: 0,
        dateRange1: "",
        dateRange2: "",
        reqNo: "",
        status: "",
        approveDate: "",
        materialName: "",
        approveQuantity: "",
        approxRate: "",
        unit: "",
        assignedTo: "",
        approvePrice: "",
        currency: "",
        supplier: "",
        brandName: "",
        country: "",
        model: "",
    },
    purchaseRequisitonStatusList: [
        {
            id: 1,
            reqNo: "1",
            status: "Dummy",
            approveDate: "Dummy",
            actions: "Dummy",
            materialName: "Dummy",
            approveQuantity: "Dummy",
            approxRate: "Dummy",
            unit: "Dummy",
            assignedTo: "Dummy",
            approvePrice: "Dummy",
            currency: "Dummy",
            supplier: "Dummy",
            brandName: "Dummy",
            country: "Dummy",
            dateRange1: "Dummy",
            dateRange2: "Dummy",
            model: "Dummy"
        },
        {
            id: 2,
            reqNo: "1",
            status: "Dummy",
            approveDate: "Dummy",
            actions: "Dummy",
            materialName: "Dummy",
            approveQuantity: "Dummy",
            approxRate: "Dummy",
            unit: "Dummy",
            assignedTo: "Dummy",
            approvePrice: "Dummy",
            currency: "Dummy",
            supplier: "Dummy",
            brandName: "Dummy",
            country: "Dummy",
            dateRange1: "Dummy",
            dateRange2: "Dummy",
            model: "Dummy"
        },
        {
            id: 3,
            reqNo: "1",
            status: "Dummy",
            approveDate: "Dummy",
            actions: "Dummy",
            materialName: "Dummy",
            approveQuantity: "Dummy",
            approxRate: "Dummy",
            unit: "Dummy",
            assignedTo: "Dummy",
            approvePrice: "Dummy",
            currency: "Dummy",
            supplier: "Dummy",
            brandName: "Dummy",
            country: "Dummy",
            dateRange1: "Dummy",
            dateRange2: "Dummy",
            model: "Dummy"
        },
        {
            id: 4,
            reqNo: "1",
            status: "Dummy",
            approveDate: "Dummy",
            actions: "Dummy",
            materialName: "Dummy",
            approveQuantity: "Dummy",
            approxRate: "Dummy",
            unit: "Dummy",
            assignedTo: "Dummy",
            approvePrice: "Dummy",
            currency: "Dummy",
            supplier: "Dummy",
            brandName: "Dummy",
            country: "Dummy",
            dateRange1: "Dummy",
            dateRange2: "Dummy",
            model: "Dummy"
        },
        {
            id: 5,
            reqNo: "1",
            status: "Dummy",
            approveDate: "Dummy",
            actions: "Dummy",
            materialName: "Dummy",
            approveQuantity: "Dummy",
            approxRate: "Dummy",
            unit: "Dummy",
            assignedTo: "Dummy",
            approvePrice: "Dummy",
            currency: "Dummy",
            supplier: "Dummy",
            brandName: "Dummy",
            country: "Dummy",
            dateRange1: "Dummy",
            dateRange2: "Dummy",
            model: "Dummy"
        }
    ],
    filteredPurchaseRequisitionStatus: [],
    paginationObject: createInitialPaginationObject<IPurchaseRequisitionStatus>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated purchaseRequisitionStatus
export const getPagedPurchaseRequisitionStatus = createAsyncThunk<
    PaginationObject<IPurchaseRequisitionStatus>,
    FetchParams,
    { rejectValue: string }
>("purchase-requisition-status/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedPurchaseRequisitionStatus(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Purchase Requisition Status")
        );
    }
});

// Fetch all purchaseRequisitionStatus (non-paginated)
export const getAllPurchaseRequisitionStatus = createAsyncThunk<
    IPurchaseRequisitionStatus[],
    void,
    { rejectValue: string }
>("purchase-requisition-status/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllPurchaseRequisitionStatus();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all Purchase Requisition Status")
        );
    }
});

// Fetch one purchaseRequisitionStatus by ID
export const getPurchaseRequisitionStatus = createAsyncThunk<
    IPurchaseRequisitionStatus,
    number,
    { rejectValue: string }
>("purchase-requisition-status/show", async (id, thunkAPI) => {
    try {
        return await showPurchaseRequisitionStatus(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Purchase Requisition Status")
        );
    }
});

// Create new purchaseRequisitionStatus
export const addPurchaseRequisitionStatus = createAsyncThunk<
    { message: string },
    CreatePurchaseRequisitionStatusPayload,
    { rejectValue: string }
>("purchase-requisition-status/add", async (payload, thunkAPI) => {
    try {
        return await createPurchaseRequisitionStatus(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create Purchase Requisition Status")
        );
    }
});

// Update purchaseRequisitionStatus
export const editPurchaseRequisitionStatus = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdatePurchaseRequisitionStatusPayload },
    { rejectValue: string }
>("purchase-requisition-status/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updatePurchaseRequisitionStatus(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update Purchase Requisition Status")
        );
    }
});

// Delete purchaseRequisitionStatus
export const removePurchaseRequisitionStatus = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("purchase-requisition-status/delete", async (id, thunkAPI) => {
    try {
        return await deletePurchaseRequisitionStatus(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete Purchase Requisition Status")
        );
    }
});

// Slice
const purchaseRequisitionStatusSlice = createSlice({
    name: "purchaserequisition",
    initialState,
    reducers: {
        updatePurchaseRequisitionStatusField<K extends keyof IPurchaseRequisitionStatus>(
            state: IPurchaseRequisitionStatusState,
            action: PayloadAction<{ key: K; value: IPurchaseRequisitionStatus[K] }>
        ) {
            const { key, value } = action.payload;
            state.purchaseRequisitionStatus[key] = value;
        },
        setPurchaseRequisitionStatusValidationErrors(
            state,
            action: PayloadAction<PurchaseRequisitionStatusValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        // updatePurchaseRequisitionStatusRow(
        //     state,
        //     action: PayloadAction<{ id: number; key: keyof IPurchaseRequisitionStatus; value: string }>
        // ) {
        //     const { id, key, value } = action.payload;
        //     const row = state.purchaseRequisitons.find(r => r.id === id);
        //     if (row) {
        //         (row[key] as string) = value;
        //     }
        // },

        clearPurchaseRequisitionStatusValidationErrors(state) {
            state.validationErrors = null;
        },
        clearPurchaseRequisitionStatusMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                purchaseRequisitionStatus: state.purchaseRequisitionStatus,
            };
        },
        clearPurchaseRequisitionStatusState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedPurchaseRequisitionStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedPurchaseRequisitionStatus.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.purchaseRequisitonStatusList = data;
                state.loading = false;
            })
            .addCase(getPagedPurchaseRequisitionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllPurchaseRequisitionStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPurchaseRequisitionStatus.fulfilled, (state, action) => {
                state.purchaseRequisitonStatusList = action.payload;
                state.loading = false;
            })
            .addCase(getAllPurchaseRequisitionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getPurchaseRequisitionStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurchaseRequisitionStatus.fulfilled, (state, action) => {
                state.purchaseRequisitionStatus = action.payload;
                state.loading = false;
            })
            .addCase(getPurchaseRequisitionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addPurchaseRequisitionStatus.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addPurchaseRequisitionStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addPurchaseRequisitionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create purchaseRequisitionStatus";
            })

            .addCase(editPurchaseRequisitionStatus.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editPurchaseRequisitionStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editPurchaseRequisitionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removePurchaseRequisitionStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePurchaseRequisitionStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removePurchaseRequisitionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default purchaseRequisitionStatusSlice.reducer;

export const {
    updatePurchaseRequisitionStatusField,
    setPurchaseRequisitionStatusValidationErrors,
    clearPurchaseRequisitionStatusValidationErrors,
    clearPurchaseRequisitionStatusMessages,
    clearPurchaseRequisitionStatusState,
} = purchaseRequisitionStatusSlice.actions;
