import { approvePORelease, fetchPagedUnreleasedPO, fetchUnreleasedPO, showPoRelease } from "@/modules/inventory/api/store.API";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPoRelease, IPoReleaseDetails, IPoReleaseState } from "../pages/poRelease/poRelease.interface";

// Initial State

const initialState: IPoReleaseState = {
    info: {
        id: 0,
        purchaseOrderNo: "",
        poDate: "",
        poDateString: "",
        proposeBy: "",
        prefix: "",
        orderType: "",
        approvedName: "",
        departmentName: "",
        supplierName: "",
        isReleased: 0,
        isApproved: 0,
        actions: "",
        details: [],
        myReleaseStatus: 0,

    },
    detailsList: [],
    detailsInfo: {
        id: 0,
        itemId: 0,
        itemName: "",
        brandId: 0,
        brandName: "",
        originId: 0,
        originName: "",
        modelName: "",
        approvedQty: 0,
        approxRate: 0,
        uomName: "",
        approvedUnitPrice: 0,
        uomPrice: 0
    },
    poList: [],
    error: null,
    loading: false,
    message: null,
    paginationObject: createInitialPaginationObject<IPoReleaseState>(),
    status: "idle",
    validationErrors: null
}


// Fetch paginated
export const getPagedUnreleasedPO = createAsyncThunk<
    PaginationObject<IPoRelease>,
    FetchParams,
    { rejectValue: string }
>("inventorySaleSlice/getPagedUnreleasedPO", async (params, thunkAPI) => {
    try {
        return await fetchPagedUnreleasedPO(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Sales")
        );
    }
});


export const getUnreleasedPO = createAsyncThunk<IPoRelease[], void, { rejectValue: string }>(
    "poRelease/getUnreleasedPO",
    async (_, thunkAPI) => {
        try {
            return await fetchUnreleasedPO();
        } catch (err) {
            return thunkAPI.rejectWithValue(handleThunkError(err, "Failed to fetch PO list"));
        }
    }
);

// Approve PO Release
export const approvePoRelease = createAsyncThunk<
    { message: string },
    IPoReleaseDetails[],
    { rejectValue: string }
>("poRelease/approvePoRelease", async (data, thunkAPI) => {
    try {
        return await approvePORelease(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, "Failed to approve PO"));
    }
});


export const getPoReleaseDetails = createAsyncThunk<
    IPoReleaseDetails[],
    number,
    { rejectValue: string }
>("poRelease/getPoReleaseDetails", async (id, thunkAPI) => {
    try {
        return await showPoRelease(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err, "Failed to fetch PO details"));
    }
});


const poReleaseSlice = createSlice({
    name: "poRelease",
    initialState,
    reducers: {
        clearPoReleaseMessages(state) {
            state.message = null;
            state.error = null;
        },
        updatePoDetailField(
            state,
            action: PayloadAction<{ index: number; key: "approvedQty" | "approvedUnitPrice"; value: number }>
        ) {
            const { index, key, value } = action.payload;
            if (state.detailsList && state.detailsList[index]) {
                state.detailsList[index][key] = value;
                if (key === "approvedQty") {
                    state.detailsList[index]["approvedTotalPrice"] = (state.detailsList[index].approvedUnitPrice || 0) * value
                } else {
                    state.detailsList[index]["approvedTotalPrice"] = (state.detailsList[index].approvedQty || 0) * value
                }

            }
        },
        clearPoReleaseDetails(state) {
            state.detailsInfo = null;
        },
        clearPoReleaseState() {
            return { ...initialState };
        },
        setPoReleaseValidationErrors(state, action: PayloadAction<any>) {
            state.validationErrors = action.payload;
        },
        removePoReleaseDetails(state, action: PayloadAction<number>) {
            if (state.detailsInfo) {
                state.info.details = state.info.details.filter((_, i) => i !== action.payload);
            }
        }

    },
    extraReducers: (builder) => {
        // list
        builder.addCase(getPagedUnreleasedPO.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPagedUnreleasedPO.fulfilled, (state, action) => {
            state.paginationObject = action.payload;
            state.poList = action.payload.data;
            state.loading = false;
            state.status = "succeeded";
        });
        builder.addCase(getPagedUnreleasedPO.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Failed to fetch paged list";
            state.status = "failed";
        });

        builder.addCase(getUnreleasedPO.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUnreleasedPO.fulfilled, (state, action) => {
            state.poList = action.payload;
            state.loading = false;
        });
        builder.addCase(getUnreleasedPO.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Failed to fetch list";
        });

        // details
        builder.addCase(getPoReleaseDetails.pending, (state) => {
            state.loading = true;
            state.detailsList = [];
        });
        // builder.addCase(getPoReleaseDetails.fulfilled, (state, action) => {
        //     state.detailsList = action.payload;
        //     state.loading = false;
        // });

        builder.addCase(getPoReleaseDetails.fulfilled, (state, action) => {
            const details = action.payload.map((item) => {
                const approvedQty = item.workOrderQty ?? 0;        
                const approvedUnitPrice = item.uomPrice ?? 0;

                return {
                    ...item,
                    approvedQty,
                    approvedUnitPrice,
                    approvedTotalPrice: approvedQty * approvedUnitPrice
                };
            });

            state.detailsList = details;
            state.loading = false;
        });

        builder.addCase(getPoReleaseDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Failed to fetch details";
        });

        // approve
        builder.addCase(approvePoRelease.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(approvePoRelease.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;

            // mark item approved in list if present
            // if (state.detailsInfo) state.detailsInfo.status = "Approved";

        });
        builder.addCase(approvePoRelease.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Approval failed";
        });
    },
});

export const {
    clearPoReleaseMessages,
    clearPoReleaseDetails,
    clearPoReleaseState,
    setPoReleaseValidationErrors,
    updatePoDetailField,
    removePoReleaseDetails

} = poReleaseSlice.actions;

export default poReleaseSlice.reducer;