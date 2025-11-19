import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreatePurchaseRequisitionPayload, IPurchaseRequisition, IPurchaseRequisitionState, PurchaseRequisitionValidationErrors, UpdatePurchaseRequisitionPayload, } from "../pages/purchaseRequisition/purchaseRequisition.interface";
import { createPurchaseRequisition, deletePurchaseRequisition, fetchAllPurchaseRequisition, fetchPagedPurchaseRequisition, showPurchaseRequisition, updatePurchaseRequisition, } from "../api/purchaseRequisitionAPI";

const initialState: IPurchaseRequisitionState = {
    purchaseRequisition: {
        prNo: "",
        id: 0,
        factory: "",
        proposedBy: "",
        requisitionType: "",
        actions: "",
    },
    purchaseRequisitons: [
        {
            id: 1,
            prNo: "GEN_01357",
            factory: "ICCL",
            proposedBy: "MD. PEKUL HOSSAIN",
            requisitionType: "Purchase Requisition",
            actions: ""
        },
        {
            id: 2,
            prNo: "GEN_01358",
            factory: "ICCL",
            proposedBy: "ABDULLAH KHAN",
            requisitionType: "Purchase Requisition",
            actions: ""
        }
    ],
    filteredPurchaseRequisition: [],
    paginationObject: createInitialPaginationObject<IPurchaseRequisition>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated purchaseRequisition
export const getPagedPurchaseRequisition = createAsyncThunk<
    PaginationObject<IPurchaseRequisition>,
    FetchParams,
    { rejectValue: string }
>("purchase-requisition/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedPurchaseRequisition(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatepasses")
        );
    }
});

// Fetch all purchaseRequisition (non-paginated)
export const getAllPurchaseRequisition = createAsyncThunk<
    IPurchaseRequisition[],
    void,
    { rejectValue: string }
>("purchase-requisition/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllPurchaseRequisition();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all gatepasses")
        );
    }
});

// Fetch one purchaseRequisition by ID
export const getPurchaseRequisition = createAsyncThunk<
    IPurchaseRequisition,
    number,
    { rejectValue: string }
>("purchase-requisitions/show", async (id, thunkAPI) => {
    try {
        return await showPurchaseRequisition(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch purchaseRequisition")
        );
    }
});

// Create new purchaseRequisition
export const addPurchaseRequisition = createAsyncThunk<
    { message: string },
    CreatePurchaseRequisitionPayload,
    { rejectValue: string }
>("purchase-requisition/add", async (payload, thunkAPI) => {
    try {
        return await createPurchaseRequisition(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create purchaseRequisition")
        );
    }
});

// Update purchaseRequisition
export const editPurchaseRequisition = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdatePurchaseRequisitionPayload },
    { rejectValue: string }
>("purchase-requisition/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updatePurchaseRequisition(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update purchaseRequisition")
        );
    }
});

// Delete purchaseRequisition
export const removePurchaseRequisition = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("purchase-requisition/delete", async (id, thunkAPI) => {
    try {
        return await deletePurchaseRequisition(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete purchaseRequisition")
        );
    }
});

// Slice
const purchaseRequisitionSlice = createSlice({
    name: "purchaserequisition",
    initialState,
    reducers: {
        updatePurchaseRequisitionField<K extends keyof IPurchaseRequisition>(
            state: IPurchaseRequisitionState,
            action: PayloadAction<{ key: K; value: IPurchaseRequisition[K] }>
        ) {
            const { key, value } = action.payload;
            state.purchaseRequisition[key] = value;
        },
        setPurchaseRequisitionValidationErrors(
            state,
            action: PayloadAction<PurchaseRequisitionValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        updatePurchaseRequisitionRow(
            state,
            action: PayloadAction<{ id: number; key: keyof IPurchaseRequisition; value: string }>
        ) {
            const { id, key, value } = action.payload;
            const row = state.purchaseRequisitons.find(r => r.id === id);
            if (row) {
                (row[key] as string) = value;
            }
        },

        clearPurchaseRequisitionValidationErrors(state) {
            state.validationErrors = null;
        },
        clearPurchaseRequisitionMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                purchaseRequisition: state.purchaseRequisition,
            };
        },
        clearPurchaseRequisitionState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedPurchaseRequisition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedPurchaseRequisition.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.purchaseRequisitons = data;
                state.loading = false;
            })
            .addCase(getPagedPurchaseRequisition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllPurchaseRequisition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPurchaseRequisition.fulfilled, (state, action) => {
                state.purchaseRequisitons = action.payload;
                state.loading = false;
            })
            .addCase(getAllPurchaseRequisition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getPurchaseRequisition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurchaseRequisition.fulfilled, (state, action) => {
                state.purchaseRequisition = action.payload;
                state.loading = false;
            })
            .addCase(getPurchaseRequisition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addPurchaseRequisition.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addPurchaseRequisition.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addPurchaseRequisition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create purchaseRequisition";
            })
            .addCase(editPurchaseRequisition.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editPurchaseRequisition.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editPurchaseRequisition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removePurchaseRequisition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePurchaseRequisition.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removePurchaseRequisition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default purchaseRequisitionSlice.reducer;

export const {
    updatePurchaseRequisitionField,
    setPurchaseRequisitionValidationErrors,
    clearPurchaseRequisitionValidationErrors,
    clearPurchaseRequisitionMessages,
    clearPurchaseRequisitionState,
} = purchaseRequisitionSlice.actions;
