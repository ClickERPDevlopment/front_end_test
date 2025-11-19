import axiosInstance from "@/api/axiosInstance";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { formatDate } from "@/utils/dateUtil";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmbMaterialReceiveDetailsType, EmbMaterialReceiveMasterTypeState, EmbMaterialReceiveMasterType } from "../pages/PrintEmbMaterialReceive/printEmbMaterialReceive.interface";
import { createPrintEmbMaterialReceive, fetchPagedPrintEmbMaterialReceive, showPrintEmbMaterialReceive, updatePrintEmbMaterialReceive } from "@/modules/inventory/api/store.API";

const initialState: EmbMaterialReceiveMasterTypeState = {
    masterInfo: {} as EmbMaterialReceiveMasterType,
    detailsInfo: {} as EmbMaterialReceiveDetailsType,
    materialReceiveLst: [],
    paginationObject: createInitialPaginationObject<EmbMaterialReceiveMasterType>(),
    loading: false,
    validationErrors: null,
    error: null,
    status: 'idle',
    message: null,

}

// Fetch paginated
export const getPagedPrintEmbMaterialReceive = createAsyncThunk<
    EmbMaterialReceiveMasterType[],
    FetchParams,
    { rejectValue: string }
>(
    "printEmbSlice/getPagedPrintEmbMaterialReceive",
    async (params, thunkAPI) => {
        try {
            return await fetchPagedPrintEmbMaterialReceive(params);
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch Sales")
            );
        }
    }
);


export const addPrintEmbMaterialReceive = createAsyncThunk<
    { message: string },
    EmbMaterialReceiveMasterType,
    { rejectValue: string }
>("printEmbSlice/save", async (payload, thunkAPI) => {
    try {
        const { ID } = payload
        if (ID && ID > 0) {
            return await updatePrintEmbMaterialReceive(payload);
        }
        return await createPrintEmbMaterialReceive(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create uom")
        );
    }
});

export const getSinglePrintEmbMaterialReceive = createAsyncThunk<
    EmbMaterialReceiveMasterType,
    number,
    { rejectValue: string }
>("printEmbSlice/show", async (id, thunkAPI) => {
    try {
        return await showPrintEmbMaterialReceive(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

const printEmbSlice = createSlice({
    name: "printEmbroidery",
    initialState,
    reducers: {
        updatePrintEmbReceiveField<K extends keyof EmbMaterialReceiveMasterType>(
            state: EmbMaterialReceiveMasterTypeState,
            action: PayloadAction<{ key: K; value: EmbMaterialReceiveMasterType[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;
            state.masterInfo[key] = value

            // if (key === "saleDate") {
            //     state.saleInfo["saleDateString"] = formatDate(String(value) || new Date().toLocaleString(), "db_format");
            // }

            // if (key === "customerId") {
            //     state.saleInfo["customerName"] = displayVal || ""
            // }
            // if (key === "costCenterId") {
            //     state.saleInfo["costCenterName"] = displayVal || ""
            // }
            // if (key === "businessUnitId") {
            //     state.saleInfo["businessUnitName"] = displayVal || ""
            // }
            // if (key === "currencyId") {
            //     state.saleInfo["currencyName"] = displayVal || ""
            // }

        },
        updateSaleDetailsField<K extends keyof EmbMaterialReceiveMasterType>(
            state: EmbMaterialReceiveMasterTypeState,
            action: PayloadAction<{ key: K; value: EmbMaterialReceiveMasterType[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;
            // state.detailsInfo[key] = value

            // if (key === "storeId") {
            //     console.log('update store name ', displayVal)
            //     state.detailsInfo["storeName"] = displayVal || ""
            // }
            // if (key === "itemId") {
            //     state.detailsInfo["itemName"] = displayVal || ""
            // }
            // if (key === "brandId") {
            //     state.detailsInfo["brandName"] = displayVal || ""
            // }
            // if (key === "originId") {
            //     state.detailsInfo["originName"] = displayVal || ""
            // }

        },
        addSaleDetailsToSaleInfo(state: EmbMaterialReceiveMasterTypeState) {

            const { BUYER } = state.detailsInfo;
            if (!BUYER || !BUYER) return;

            // if (state.saleInfo.editingDetailIndex !== undefined) {
            //     // Update existing row
            //     state.saleInfo.details[state.saleInfo.editingDetailIndex] = { ...state.detailsInfo };
            //     state.saleInfo.editingDetailIndex = undefined; // reset after editing
            // } else {
            //     // Add new row
            //     const isDuplicate = state.saleInfo.details.some(
            //         d => d.storeId === storeId && d.itemId === itemId
            //     );
            //     if (isDuplicate) {
            //         state.error = "This material for the selected store is already added.";
            //         return;
            //     }
            //     state.saleInfo.details.push({ ...state.detailsInfo });
            // }

            // state.saleInfo.totalAmount = state.saleInfo.details.reduce(
            //     (sum, i) => sum + (i.qty * i.unitPrice),
            //     0
            // );
            // Clear any previous errors
            state.error = null;
        },
        clearInventorySaleMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
            };
        },
        removeSaleDetail: (state, action: PayloadAction<number>) => {
            // state.saleInfo.details = state.saleInfo.details.filter((_, i) => i !== action.payload);
            // const totalSum = state.saleInfo.details.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
            // state.saleInfo.totalAmount = totalSum;
        },
        updateSaleDetailAtIndex: (state, action: PayloadAction<{ index: number; detail: EmbMaterialReceiveDetailsType }>) => {
            const { index, detail } = action.payload;
            // if (state.saleInfo.details[index]) {
            //     state.saleInfo.details[index] = detail;
            // }
        },
        clearSaleDetails(state) {
            // state.saleInfo.details = [];
            // state.saleInfo.editingDetailIndex = undefined;
        },

        clearInventorySaleState() {
            return { ...initialState };
        },
        // setInventorySaleValidationErrors(
        //     state,
        //     action: PayloadAction<InventorySaleValidationErrors | null>
        // ) {
        //     state.validationErrors = action.payload;
        // },

    },
    extraReducers: (builder) => {
        builder.addCase(getPagedPrintEmbMaterialReceive.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getPagedPrintEmbMaterialReceive.fulfilled, (state, action) => {
            state.paginationObject = action.payload as any;
            state.materialReceiveLst = action.payload as any;
            console.log(action.payload)
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getPagedPrintEmbMaterialReceive.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // builder.addCase(getInventorySales.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // builder.addCase(getInventorySales.fulfilled, (state, action) => {
        //     state.sales = action.payload
        //     state.loading = false;
        // })
        // builder.addCase(getInventorySales.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload as string;
        // })


        builder.addCase(addPrintEmbMaterialReceive.pending, (state) => {
            state.loading = true;
            state.message = null;
            state.validationErrors = null;
        })
        builder.addCase(addPrintEmbMaterialReceive.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(addPrintEmbMaterialReceive.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to save";
        })


        builder.addCase(getSinglePrintEmbMaterialReceive.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getSinglePrintEmbMaterialReceive.fulfilled, (state, action) => {
            state.masterInfo = { ...action.payload };
            state.loading = false;
        })
        builder.addCase(getSinglePrintEmbMaterialReceive.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })



            ;
    },
});

export default printEmbSlice.reducer;

export const {
    clearInventorySaleMessages,
    clearInventorySaleState,

} = printEmbSlice.actions;