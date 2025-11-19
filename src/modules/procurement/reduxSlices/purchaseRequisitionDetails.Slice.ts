import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreatePurchaseRequisitionDetailsPayload, IPurchaseRequisitionDetails, IPurchaseRequisitionDetailsState, PurchaseRequisitionDetailsValidationErrors, UpdatePurchaseRequisitionDetailsPayload, } from "../pages/purchaseRequisitionDetails/purchaseRequisitionDetails.interface";
import { createPurchaseRequisitionDetails, deletePurchaseRequisitionDetails, fetchAllPurchaseRequisitionDetails, fetchPagedPurchaseRequisitionDetails, showPurchaseRequisitionDetails, updatePurchaseRequisitionDetails, } from "../api/purchaseRequisitionDetails.API";

const initialState: IPurchaseRequisitionDetailsState = {
    purchaseRequisitionDetails: {
        id: 0,
        reqNo: "",
        proposedDate: "",
        proposedBy: "",
        requisitionType: "",
        fieldOfUse: "",
        approve: false,
        deny: false,
        slNo: "",
        assignedPerson: "",
        actions: "",
        subGroup: "",
        itemName: "",
        brandName: "",
        model: "",
        country: "",
        unitPrice: 0,
        requiredQuantity: 0,
        approveQuantity: 0,
        stockQuantity: 0,
        remarks: "",
        so: "",
        currency: "",
        approximateRate: "",
        unit: "",
        supplier: "",
        userRemarks: "",
    },
    purchaseRequisitonDetailsList: [
        {
            id: 1,
            reqNo: "",
            proposedDate: "",
            proposedBy: "",
            requisitionType: "",
            fieldOfUse: "",
            approve: false,
            deny: false,
            slNo: "1",
            assignedPerson: "Tahsin",
            actions: "",
            subGroup: "STATIONARY ITEM",
            itemName: "Ball Pen Color: Black",
            brandName: "",
            model: "",
            country: "",
            unitPrice: 0,
            requiredQuantity: 0,
            approveQuantity: 0,
            stockQuantity: 0,
            remarks: "",
            so: "",
            currency: "",
            approximateRate: "",
            unit: "PCS",
            supplier: "",
            userRemarks: "",
        },
        {
            id: 2,
            reqNo: "",
            proposedDate: "",
            proposedBy: "",
            requisitionType: "",
            fieldOfUse: "",
            approve: false,
            deny: false,
            slNo: "1",
            assignedPerson: "Tahsin",
            actions: "",
            subGroup: "STATIONARY ITEM",
            itemName: "Ball Pen Color: Black",
            brandName: "",
            model: "",
            country: "",
            unitPrice: 0,
            requiredQuantity: 0,
            approveQuantity: 0,
            stockQuantity: 0,
            remarks: "",
            so: "",
            currency: "",
            approximateRate: "",
            unit: "PCS",
            supplier: "",
            userRemarks: "",
        },
        {
            id: 3,
            reqNo: "",
            proposedDate: "",
            proposedBy: "",
            requisitionType: "",
            fieldOfUse: "",
            approve: false,
            deny: false,
            slNo: "1",
            assignedPerson: "Tahsin",
            actions: "",
            subGroup: "STATIONARY ITEM",
            itemName: "Ball Pen Color: Black",
            brandName: "",
            model: "",
            country: "",
            unitPrice: 0,
            requiredQuantity: 0,
            approveQuantity: 0,
            stockQuantity: 0,
            remarks: "",
            so: "",
            currency: "",
            approximateRate: "",
            unit: "PCS",
            supplier: "",
            userRemarks: "",
        },
    ],
    filteredPurchaseRequisitionDetails: [],
    paginationObject: createInitialPaginationObject<IPurchaseRequisitionDetails>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated purchaseRequisitionDetails
export const getPagedPurchaseRequisitionDetails = createAsyncThunk<
    PaginationObject<IPurchaseRequisitionDetails>,
    FetchParams,
    { rejectValue: string }
>("purchase-requisition-details/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedPurchaseRequisitionDetails(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatepasses")
        );
    }
});

// Fetch all purchaseRequisitionDetails (non-paginated)
export const getAllPurchaseRequisitionDetails = createAsyncThunk<
    IPurchaseRequisitionDetails[],
    void,
    { rejectValue: string }
>("purchase-requisition-details/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllPurchaseRequisitionDetails();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all gatepasses")
        );
    }
});

// Fetch one purchaseRequisitionDetails by ID
export const getPurchaseRequisitionDetails = createAsyncThunk<
    IPurchaseRequisitionDetails,
    number,
    { rejectValue: string }
>("purchase-requisition-details/show", async (id, thunkAPI) => {
    try {
        return await showPurchaseRequisitionDetails(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch purchaseRequisitionDetails")
        );
    }
});

// Create new purchaseRequisitionDetails
export const addPurchaseRequisitionDetails = createAsyncThunk<
    { message: string },
    CreatePurchaseRequisitionDetailsPayload,
    { rejectValue: string }
>("purchase-requisition-details/add", async (payload, thunkAPI) => {
    try {
        return await createPurchaseRequisitionDetails(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create purchaseRequisitionDetails")
        );
    }
});

// Update purchaseRequisitionDetails
export const editPurchaseRequisitionDetails = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdatePurchaseRequisitionDetailsPayload },
    { rejectValue: string }
>("purchase-requisition-details/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updatePurchaseRequisitionDetails(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update purchaseRequisitionDetails")
        );
    }
});

// Delete purchaseRequisitionDetails
export const removePurchaseRequisitionDetails = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("purchase-requisition-details/delete", async (id, thunkAPI) => {
    try {
        return await deletePurchaseRequisitionDetails(id);
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
        updatePurchaseRequisitionDetailsField<K extends keyof IPurchaseRequisitionDetails>(
            state: IPurchaseRequisitionDetailsState,
            action: PayloadAction<{ key: K; value: IPurchaseRequisitionDetails[K] }>
        ) {
            const { key, value } = action.payload;
            // state.purchaseRequisitonDetailsList
            state.purchaseRequisitionDetails[key] = value;
        },
        setPurchaseRequisitionDetailsValidationErrors(
            state,
            action: PayloadAction<PurchaseRequisitionDetailsValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        updatePurchaseRequisitionDetailsRow(
            state,
            action: PayloadAction<{
                index: number;
                key: keyof IPurchaseRequisitionDetails;
                value: string;
            }>
        ) {
            const { index, key, value } = action.payload;
            const row = state.purchaseRequisitonDetailsList[index];

            if (row) {
                (row[key] as string) = value;
            }
        },
        clearPurchaseRequisitionDetailsValidationErrors(state) {
            state.validationErrors = null;
        },
        clearPurchaseRequisitionDetailsMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                purchaseRequisitionDetails: state.purchaseRequisitionDetails,
            };
        },
        clearPurchaseRequisitionDetailsState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedPurchaseRequisitionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedPurchaseRequisitionDetails.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.purchaseRequisitonDetailsList = data;
                state.loading = false;
            })
            .addCase(getPagedPurchaseRequisitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllPurchaseRequisitionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPurchaseRequisitionDetails.fulfilled, (state, action) => {
                state.purchaseRequisitonDetailsList = action.payload;
                state.loading = false;
            })
            .addCase(getAllPurchaseRequisitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getPurchaseRequisitionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurchaseRequisitionDetails.fulfilled, (state, action) => {
                state.purchaseRequisitionDetails = action.payload;
                state.loading = false;
            })
            .addCase(getPurchaseRequisitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addPurchaseRequisitionDetails.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addPurchaseRequisitionDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addPurchaseRequisitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create purchaseRequisitionDetails";
            })
            .addCase(editPurchaseRequisitionDetails.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editPurchaseRequisitionDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editPurchaseRequisitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removePurchaseRequisitionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePurchaseRequisitionDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removePurchaseRequisitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default purchaseRequisitionDetailsSlice.reducer;

export const {
    updatePurchaseRequisitionDetailsField,
    updatePurchaseRequisitionDetailsRow,
    setPurchaseRequisitionDetailsValidationErrors,
    clearPurchaseRequisitionDetailsValidationErrors,
    clearPurchaseRequisitionDetailsMessages,
    clearPurchaseRequisitionDetailsState,
} = purchaseRequisitionDetailsSlice.actions;
