import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { formatDate } from "@/utils/dateUtil";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createGatePass, deleteGatePass, fetchPagedGatePass, fetchPagedGatePassApproval, fetchPagedGatePassOut, fetchPagedGatePassReturnReceive, showGatePass, showGatePassApproval, showGatePassReturnReceive, updateGatePass } from '../api/gatePassAPI';
import { CreateGatePassPayload, GatePassValidationErrors, IGatePass, IGatePassApproval, IGatePassDetail, IGatePassMaster, IGatePassOut, IGatePassReturnReceive, IGatePassReturnReceiveItem, IGatePassState, UpdateGatePassPayload } from "../pages/gatePass/gatePass.interface";

const initialState: IGatePassState = {
    gatePass: {
        master: {
            id: 0,
            refNo: "",
            passDate: formatDate(new Date().toLocaleString(), "db_format"),
            itemType: "",
            gatePassType: "",
            isApproved: "",
            isSample: 0,
            remarks: "",
            garmentsType: "",
            senderEmpName: "",
            senderPhoneNo: "",
            carriedBy: "",
            supplierName: "",
            supplierAddress: "",
            supplierId: 0,
            receiverName: "",
            receiverDesignation: "",
            receiverDepartment: "",
            receiverPhoneNo: "",
            factoryId: 0,
            username: "",
            approveUserName: "",
            approveDate: "",
            editAction: "",
            reportAction: "",
            isChecked: false
        },
        details: []
    },
    gatePassList: [],
    filteredGatePass: [],
    paginationObject: createInitialPaginationObject<IGatePass>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
    gatePassTypes: [],
    gatePassReturnReceive: {
        id: 0,
        refNo: "",
        gatePassType: "",
        receiveContactPerson: "",
        garmentsType: "",
        carriedBy: "",
        organizationType: "",
        supplierName: "",
        supplierAddress: "",
        supplierId: 0,
        receiverName: "",
        receiverDesignation: "",
        receiverDepartment: "",
        receiverPhoneNo: "",
        isSample: "",
        proposedBy: "",
        factoryId: 0,
        createdCompany: "",
        passDate: "",
        masterId: 0,
        poId: 0,
        sampleType: "",
        issueName: "",
        buyerId: 0,
        styleId: 0,
        colorId: 0,
        sizeId: 0,
        qty: 0,
        uomId: 0,
        noOfPkt: 0,
        materialId: 0,
        poNo: 0,
        buyerName: "",
        styleNo: "",
        colorName: "",
        sizeName: "",
        itemName: "",
        shortName: "",
        username: "",
        approveUserName: "",
        approveDate: "",
        senderEmpName: "",
        senderPhoneNo: "",
        uomName: "",
        gatePassDtlId: "",
        allRcvQty: "",
        receiveDate: "",
        gateEntryNo: "",
        returnCarriedBy: "",
        receiveBy: "",
        items: [],
        effectDate: "",
        effectDateText: "",
        date: "",
        itemType: "",
        gmtType: "",
        isApproved: "",
        senderName: "",
        senderPhone: "",
        carriedName: "",
        carriedDepartment: "",
        carriedDesignation: "",
        carriedPhone: "",
        supplier: "",
        receiver: "",
        receiverAddress: ""
    },
    gatePassReturnReceiveList: [
    ],
    gatePassReturnReceiveItem: {
        itemType: "",
        gpQty: 0,
        receiveQty: 0,
        allReceive: "",
        uom: "",
        receiveRemarks: "",
        buyer: "",
        style: "",
        color: "",
        size: "",
        remarks: "",
        noOfPackets: 0,
        id: 0
    },
    gatePassReturnReceiveItemList: [],
    gatePassApprovalDetails: {
        id: 0,
        gatePassNo: 0,
        proposedBy: "",
        companyName: "",
        gatePassType: "",
        orgSupplierName: "",
        type: "",
        createdDate: "",
        status: 0,
        authorizedDate: ""
    },
    gatePassApprovalList: [
        {
            id: 1,
            gatePassNo: 1001,
            proposedBy: "Abdur Rahman",
            companyName: "ABC Industries Ltd.",
            gatePassType: "Material Out",
            orgSupplierName: "Tech Supplies BD",
            type: "Regular",
            createdDate: "2025-11-01",
            status: 2,
            authorizedDate: ""
        },
        {
            id: 2,
            gatePassNo: 1002,
            proposedBy: "Tahsin Hasan",
            companyName: "Delta Electronics",
            gatePassType: "Material In",
            orgSupplierName: "Global Traders",
            type: "Returnable",
            createdDate: "2025-11-03",
            status: 1,
            authorizedDate: "2025-11-04"
        },
        {
            id: 3,
            gatePassNo: 1003,
            proposedBy: "Farhana Akter",
            companyName: "Proxima Textiles",
            gatePassType: "Visitor",
            orgSupplierName: "N/A",
            type: "Temporary",
            createdDate: "2025-11-05",
            status: 0,
            authorizedDate: "2025-11-06"
        },
        {
            id: 4,
            gatePassNo: 1004,
            proposedBy: "Sabbir Ahmed",
            companyName: "Innovate Steel Ltd.",
            gatePassType: "Material Out",
            orgSupplierName: "Super Engineering Works",
            type: "Regular",
            createdDate: "2025-11-07",
            status: 1,
            authorizedDate: "2025-11-08"
        },
        {
            id: 5,
            gatePassNo: 1005,
            proposedBy: "Mehzabin Chowdhury",
            companyName: "Nova Agro Ltd.",
            gatePassType: "Material In",
            orgSupplierName: "AgroMach Traders",
            type: "Returnable",
            createdDate: "2025-11-09",
            status: 2,
            authorizedDate: ""
        }
    ],
    gatePassOutDetails: {
        id: 0,
        gatePassNo: "",
        passDate: "",
        status: 0
    },
    gatePassOutList: [
        {
            id: 1,
            gatePassNo: "GP25110010614",
            passDate: "12-Nov-2025",
            status: 0
        },
        {
            id: 2,
            gatePassNo: "GP25110010613",
            passDate: "13-Nov-2025",
            status: 1
        },
        {
            id: 3,
            gatePassNo: "GP25110010619",
            passDate: "14-Nov-2025",
            status: 0
        }
    ]
};


export const getPagedGatePassReturnReceive = createAsyncThunk<
    PaginationObject<IGatePassReturnReceive>,
    FetchParams,
    { rejectValue: string }
>("gatepass-return-receive/paged", async (params, thunkAPI) => {
    try {
        return await fetchPagedGatePassReturnReceive(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatepasses return receive")
        );
    }
});



// Fetch paginated gatePass
export const getPagedGatePass = createAsyncThunk<
    PaginationObject<IGatePassMaster>,
    FetchParams,
    { rejectValue: string }
>("gatepass/paged", async (params, thunkAPI) => {
    try {
        return await fetchPagedGatePass(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatepasses")
        );
    }
});

// Fetch paginated gatePassOut
export const getPagedGatePassOut = createAsyncThunk<
    PaginationObject<IGatePassOut>,
    FetchParams,
    { rejectValue: string }
>("gatepass/paged", async (params, thunkAPI) => {
    try {
        return await fetchPagedGatePassOut(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Gate Pass Out")
        );
    }
});



// Fetch one gatePass by ID
export const getGatePass = createAsyncThunk<
    IGatePass,
    number,
    { rejectValue: string }
>("gate-pass/show", async (id, thunkAPI) => {
    try {
        return await showGatePass(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatePass")
        );
    }
});

// Fetch one gatePassReturnReceive by ID
export const getGatePassReturnReceive = createAsyncThunk<
    IGatePassReturnReceive,
    number,
    { rejectValue: string }
>("gate-pass-return-receive/show", async (id, thunkAPI) => {
    try {
        return await showGatePassReturnReceive(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatePass")
        );
    }
});

// Fetch one gatePass by ID
export const getGatePassApproval = createAsyncThunk<
    IGatePass,
    number,
    { rejectValue: string }
>("gatepass-approval/show", async (id, thunkAPI) => {
    try {
        return await showGatePassApproval(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatePass")
        );
    }
});



// Fetch paginated gatePassApproval
export const getPagedGatePassApproval = createAsyncThunk<
    PaginationObject<IGatePassApproval>,
    FetchParams,
    { rejectValue: string }
>("gatepass-approval/paged", async (params, thunkAPI) => {
    try {
        return await fetchPagedGatePassApproval(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatepass approvals")
        );
    }
});

// Create new gatePass
export const addGatePass = createAsyncThunk<
    { message: string },
    CreateGatePassPayload,
    { rejectValue: string }
>("gate-pass/add", async (payload, thunkAPI) => {
    try {
        return await createGatePass(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create gatePass")
        );
    }
});

// Update gatePass
export const editGatePass = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateGatePassPayload },
    { rejectValue: string }
>("gate-pass/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateGatePass(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update gatePass")
        );
    }
});

// Delete gatePass
export const removeGatePass = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("gate-pass/delete", async (id, thunkAPI) => {
    try {
        return await deleteGatePass(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete gatePass")
        );
    }
});

// Slice
const gatePassSlice = createSlice({
    name: "gatepass",
    initialState,
    reducers: {
        // Add a new detail
        addProgramDetail(state: IGatePassState, action: PayloadAction<IGatePassDetail>) {
            if (!state.gatePass) {
                // Initialize gatePass if null
                state.gatePass = { master: {} as IGatePassMaster, details: [] };
            }
            state.gatePass.details.push(action.payload);
        },

        // Delete a detail by id
        deleteProgramDetail(state: IGatePassState, action: PayloadAction<number>) {
            if (state.gatePass) {
                state.gatePass.details = state.gatePass.details.filter(d => d.id !== action.payload);
            }
        },
        // Update a field in a detail by id
        // updateGatePassDetailField<K extends keyof IGatePassDetail>(
        //     state: IGatePassState,
        //     action: PayloadAction<{ id: number; key: K; value: IGatePassDetail[K] }>
        // ) {
        //     if (!state.gatePass) return;

        //     const index = state.gatePass.details.findIndex(d => d.id === action.payload.id);
        //     if (index !== -1) {
        //         state.gatePass.details[index][action.payload.key] = action.payload.value;
        //     }
        // },
          updateGatePassDetailField<K1 extends keyof IGatePassDetail, K2 extends keyof IGatePassDetail>(
            state: IGatePassState,
            action: PayloadAction<{ index: number, key1: K1; value1: IGatePassDetail[K1]; key2?: K2; value2?: IGatePassDetail[K2] }>
        ) {
            debugger
            if (state.gatePass && state.gatePass.details) {
                const { index, key1, value1, key2, value2 } = action.payload;
                state.gatePass.details[index][key1] = value1;
                
                if (key2 && value2) {
                    state.gatePass.details[index][key2] = value2;
                }
            }
        },

        // updateGatePassField<K extends keyof IGatePassMaster>(
        //     state: IGatePassState,
        //     action: PayloadAction<{ key: K; value: IGatePassMaster[K] }>
        // ) {
        //     if (state.gatePass && state.gatePass.master) {
        //         const { key, value } = action.payload;
        //         state.gatePass.master[key] = value;
        //     }
        // },

        updateGatePassField<K1 extends keyof IGatePassMaster, K2 extends keyof IGatePassMaster>(
            state: IGatePassState,
            action: PayloadAction<{ key1: K1; value1: IGatePassMaster[K1]; key2?: K2; value2?: IGatePassMaster[K2] }>
        ) {
            debugger
            if (state.gatePass && state.gatePass.master) {
                const { key1, value1, key2, value2 } = action.payload;
                state.gatePass.master[key1] = value1;
                if (key2 && value2) {
                    state.gatePass.master[key2] = value2;
                }
            }
        },
        clearGatePassValidationError: (
            state,
            action: PayloadAction<keyof IGatePassMaster>
        ) => {
            if (state.validationErrors) {
                delete state.validationErrors[action.payload];
            }
        },

        updateGatePassApprovalField<K extends keyof IGatePass>(
            state: IGatePassState,
            action: PayloadAction<{ key: K; value: IGatePass[K] }>
        ) {
            const { key, value } = action.payload;
            (state as any)[key] = value;
        },

        updateGatePassReturnReceiveField<K extends keyof IGatePassReturnReceive>(
            state: IGatePassState,
            action: PayloadAction<{ key: K; value: IGatePassReturnReceive[K] }>
        ) {
            const { key, value } = action.payload;
            state.gatePassReturnReceive[key] = value;
        },

        updateGatePassReturnReceiveItemField<K extends keyof IGatePassReturnReceiveItem>(
            state: IGatePassState,
            action: PayloadAction<{ key: K; value: IGatePassReturnReceiveItem[K] }>
        ) {
            const { key, value } = action.payload;
            state.gatePassReturnReceiveItem[key] = value;
        },

        updateProgramDetailsField<K extends keyof IGatePassDetail>(
            state: IGatePassState,
            action: PayloadAction<{ index: number; key: K; value: IGatePassDetail[K] }>
        ) {
            if (!state.gatePass) return;

            const detail = state.gatePass.details[action.payload.index];
            if (detail) {
                detail[action.payload.key] = action.payload.value;
            }
        },
        updateGatePassOutField<K extends keyof IGatePassOut>(
            state: IGatePassState,
            action: PayloadAction<{ key: K; value: IGatePassOut[K] }>
        ) {
            const { key, value } = action.payload;
            state.gatePassOutDetails[key] = value;
        },
        setGatePassValidationErrors(
            state,
            action: PayloadAction<GatePassValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },

        clearGatePassValidationErrors(state) {
            state.validationErrors = null;
        },

        clearGatePassMessages(state) {
            state.message = null;
        },

        clearGatePassState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedGatePass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getPagedGatePass.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.gatePassList = data;
                state.loading = false;
            })
            .addCase(getPagedGatePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getPagedGatePassApproval.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedGatePassApproval.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.gatePassApprovalList = data;
                state.loading = false;
            })
            .addCase(getPagedGatePassApproval.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGatePassReturnReceive.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGatePassReturnReceive.fulfilled, (state, action) => {
                state.gatePassReturnReceive = action.payload;
                state.loading = false;
            })
            .addCase(getGatePassReturnReceive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getPagedGatePassReturnReceive.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedGatePassReturnReceive.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.gatePassReturnReceiveList = data;
                state.loading = false;
            })
            .addCase(getPagedGatePassReturnReceive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGatePass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGatePass.fulfilled, (state, action) => {
                state.gatePass = action.payload;
                state.loading = false;
            })
            .addCase(getGatePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addGatePass.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addGatePass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addGatePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create gatePass";
            })
            .addCase(editGatePass.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editGatePass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editGatePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeGatePass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeGatePass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeGatePass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default gatePassSlice.reducer;

export const {
    clearGatePassValidationError,
    addProgramDetail,
    updateGatePassDetailField,
    deleteProgramDetail,
    updateGatePassField,
    updateGatePassReturnReceiveField,
    updateGatePassReturnReceiveItemField,
    updateGatePassApprovalField,
    updateProgramDetailsField,
    updateGatePassOutField,
    setGatePassValidationErrors,
    clearGatePassValidationErrors,
    clearGatePassMessages,
    clearGatePassState,
} = gatePassSlice.actions;
