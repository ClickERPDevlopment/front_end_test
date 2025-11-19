import { createInitialPaginationObject } from "@/types/global";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { IPurchaseOrder, IPurchaseOrderState } from "../pages/purchaseOrderEntry/purchaseOrderEntry.interface";
import { FetchAllPurchaseOrder } from "../api/purchaseOrder.API";

export const GetAllPurchaseOrder = createAsyncThunk<
    IPurchaseOrder[],
    void,
    { rejectValue: string }
>("purchaseOrder/GetAllPurchaseOrder", async (_, thunkAPI) => {
    try {
        const data = await FetchAllPurchaseOrder();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all purchase orders")
        );
    }
});

const initialState: IPurchaseOrderState = {
    purchaseOrder: {
        id: 0,
        factoryId: 0,
        pono: "",
        buyerId: 0,
        merchandiserId: undefined,
        dealMerchandiserId: undefined,
        followMerchandiserId: undefined,
        agentId: undefined,
        orderType: undefined,
        extraCutPercent: undefined,
        cuttingPaymentPercent: undefined,
        sewingPaymentPercent: undefined,
        finishingPaymentPercent: undefined,
        packPaymentPercent: undefined,
        totalPoQty: undefined,
        totalProductionQty: undefined,
        totalShipQty: undefined,
        poReceiveDate: undefined,
        poConfirmDate: undefined,
        isActive: "Y",
        isSubContact: undefined,
        seasonId: undefined,
        brandId: undefined,
        sectionNo: undefined,
        kimballNo: undefined,
        sapPoNo: undefined,
        advanceReceive: undefined,
        wagesAmount: undefined,
        wagesAmount2: undefined,
        wagesAmount3: undefined,
        wagesDescription: undefined,
        wagesDescription2: undefined,
        wagesDescription3: undefined,
        piNo: undefined,
        piDate: undefined,
        piExpiryDate: undefined,
        lcBankId: undefined,
        beniBankId: undefined,
        shipTermId: undefined,
        applicantId: undefined,
        paymentTermId: undefined,
        shipMode: undefined,
        lcNo: undefined,
        etdDate: undefined,
        poLId: undefined,
        poDId: undefined,
        consigneeId: undefined,
        notifyId: undefined,
        currencyId: undefined,
        currencyRate: undefined,
        exportLicence: undefined,
        gsp: undefined,
        remarks: undefined,
        revisedNo: undefined,
        isPlan: undefined,
        additionalBookingId: undefined,
        sampleProgramId: undefined,
        createBy: undefined,
        createDate: undefined,
        updateBy: undefined,
        updateDate: undefined,
        isMultiPoCombine: undefined,
        combinedJobNoId: undefined,
        actionGuidId: undefined,
    },
    purchaseOrders: [],
    filteredBuyers: [],
    paginationObject: createInitialPaginationObject<IPurchaseOrder>(),
    loading: false,
    error: null,
    status: "idle",
    message: null,
};

const purchaseOrderSlice = createSlice({
    name: "purchaseOrder",
    initialState,
    reducers: {
        clearPurchaseOrderState: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllPurchaseOrder.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(GetAllPurchaseOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.purchaseOrders = action.payload;
            })
            .addCase(GetAllPurchaseOrder.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload || "Failed to fetch purchase orders";
            });
    },
});

export default purchaseOrderSlice.reducer;
export const { clearPurchaseOrderState } = purchaseOrderSlice.actions;
