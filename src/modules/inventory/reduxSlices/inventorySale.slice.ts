import axiosInstance from "@/api/axiosInstance";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { formatDate } from "@/utils/dateUtil";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { approveInventorySale, createInventorySale, fetchPagedInventorySales, showInventorySale, unApproveInventorySale, updateInventorySale } from "../api/store.API";
import { IInventorySale, IInventorySaleDetails, IInventorySaleState, InventorySaleValidationErrors } from "../pages/inventorySale/inventorySale.interface";

const initialState: IInventorySaleState = {
    saleInfo: {
        id: 0,
        factoryID: 0,
        totalAmount: 0,
        customerName: "",
        saleDateString: formatDate(new Date().toLocaleString(), "db_format"),
        saleDate: formatDate(new Date().toLocaleString(), "db_format"),
        saleNo: "",
        customerId: 0,
        costCenterId: 0,
        businessUnitId: 0,
        currencyId: 0,
        costCenterName: "",
        businessUnitName: "",
        currencyName: "",
        details: [],
        editingDetailIndex: undefined,
        isApproved: 0
    },
    detailsInfo: {
        approvedQty: 0, id: 0, itemId: 0, qty: 0, storeId: 0, itemName: "",
        storeName: "", brandId: 0, brandName: "", model: "", originId: 0, originName: "", uom: "", unitPrice: 0
    },
    sales: [],
    error: null,
    filteredStore: [],
    loading: false,
    message: null,
    paginationObject: createInitialPaginationObject<IInventorySale>(),
    status: "idle",
    validationErrors: null
}

// Fetch paginated
export const getPagedInventorySales = createAsyncThunk<
    PaginationObject<IInventorySale>,
    FetchParams,
    { rejectValue: string }
>("inventorySaleSlice/getPagedInventorySales", async (params, thunkAPI) => {
    try {
        return await fetchPagedInventorySales(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Sales")
        );
    }
});

export const getInventorySales = createAsyncThunk<IInventorySale[], void, { rejectValue: string }>(
    "inventorySaleSlice/getInventorySales", async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('/inventory-sale/list');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("")
        }
    }
)

export const addInventorySale = createAsyncThunk<
    { message: string },
    IInventorySale,
    { rejectValue: string }
>("inventorySaleSlice/save", async (payload, thunkAPI) => {
    try {
        const { id } = payload
        if (id && id > 0) {
            return await updateInventorySale(payload);
        }
        return await createInventorySale(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create uom")
        );
    }
});

export const approvalPostInventorySale = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("inventorySaleSlice/approve", async (id, thunkAPI) => {
    try {
        return await approveInventorySale(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

export const unApprovalPostInventorySale = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("inventorySaleSlice/unapprove", async (id, thunkAPI) => {
    try {
        return await unApproveInventorySale(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});


export const getInventorySale = createAsyncThunk<
    IInventorySale,
    number,
    { rejectValue: string }
>("inventorySaleSlice/show", async (id, thunkAPI) => {
    try {
        return await showInventorySale(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

const inventorySaleSlice = createSlice({
    name: "inventorySaleSlice",
    initialState,
    reducers: {
        updateInventorySaleField<K extends keyof IInventorySale>(
            state: IInventorySaleState,
            action: PayloadAction<{ key: K; value: IInventorySale[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;
            state.saleInfo[key] = value

            if (key === "saleDate") {
                state.saleInfo["saleDateString"] = formatDate(String(value) || new Date().toLocaleString(), "db_format");
            }

            if (key === "customerId") {
                state.saleInfo["customerName"] = displayVal || ""
            }
            if (key === "costCenterId") {
                state.saleInfo["costCenterName"] = displayVal || ""
            }
            if (key === "businessUnitId") {
                state.saleInfo["businessUnitName"] = displayVal || ""
            }
            if (key === "currencyId") {
                state.saleInfo["currencyName"] = displayVal || ""
            }

        },
        updateSaleField(state: IInventorySaleState, action: PayloadAction<{item: IInventorySaleDetails}>) {
            const { item } = action.payload
            state.detailsInfo = item;
        },
        updateSaleDetailsField<K extends keyof IInventorySaleDetails>(
            state: IInventorySaleState,
            action: PayloadAction<{ key: K; value: IInventorySaleDetails[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;
            state.detailsInfo[key] = value
            if (key === "storeId") {
                console.log('update store name ', displayVal)
                state.detailsInfo["storeName"] = displayVal || ""
            }
            if (key === "itemId") {
                state.detailsInfo["itemName"] = displayVal || ""
            }
            if (key === "brandId") {
                state.detailsInfo["brandName"] = displayVal || ""
            }
            if (key === "originId") {
                state.detailsInfo["originName"] = displayVal || ""
            }

        },
        addSaleDetailsToSaleInfo(state: IInventorySaleState) {

            const { storeId, itemId } = state.detailsInfo;
            if (!storeId || !itemId) return;

            if (state.saleInfo.editingDetailIndex !== undefined) {
                // Update existing row
                state.saleInfo.details[state.saleInfo.editingDetailIndex] = { ...state.detailsInfo };
                state.saleInfo.editingDetailIndex = undefined; // reset after editing
            } else {
                // Add new row
                const isDuplicate = state.saleInfo.details.some(
                    d => d.storeId === storeId && d.itemId === itemId
                );
                if (isDuplicate) {
                    state.error = "This material for the selected store is already added.";
                    return;
                }
                state.saleInfo.details.push({ ...state.detailsInfo });
            }

            state.saleInfo.totalAmount = state.saleInfo.details.reduce(
                (sum, i) => sum + (i.qty * i.unitPrice),
                0
            );

            // Clear the details form fields
            // state.detailsInfo = {
            //     approvedQty: 0,
            //     id: 0,
            //     itemId: 0,
            //     qty: 0,
            //     // storeId: 0,
            //     itemName: "",
            //     // storeName: "",
            //     brandId: 0,
            //     brandName: "",
            //     model: "",
            //     originId: 0,
            //     originName: '',
            //     uom: '',
            //     unitPrice: 0
            // };


            // Clear any previous errors
            state.error = null;
        },
        clearInventorySaleMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                saleInfo: state.saleInfo,
            };
        },
        removeSaleDetail: (state, action: PayloadAction<number>) => {
            state.saleInfo.details = state.saleInfo.details.filter((_, i) => i !== action.payload);
            const totalSum = state.saleInfo.details.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
            state.saleInfo.totalAmount = totalSum;
        },
        updateSaleDetailAtIndex: (state, action: PayloadAction<{ index: number; detail: IInventorySaleDetails }>) => {
            const { index, detail } = action.payload;
            if (state.saleInfo.details[index]) {
                state.saleInfo.details[index] = detail;
            }
        },
        clearSaleDetails(state) {
            state.saleInfo.details = [];
            state.saleInfo.editingDetailIndex = undefined;
        },

        clearInventorySaleState() {
            return { ...initialState };
        },
        setInventorySaleValidationErrors(
            state,
            action: PayloadAction<InventorySaleValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getPagedInventorySales.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getPagedInventorySales.fulfilled, (state, action) => {
            state.paginationObject = action.payload;
            state.sales = action.payload.data;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getPagedInventorySales.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(getInventorySales.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getInventorySales.fulfilled, (state, action) => {
            state.sales = action.payload
            state.loading = false;
        })
        builder.addCase(getInventorySales.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })


        builder.addCase(addInventorySale.pending, (state) => {
            state.loading = true;
            state.message = null;
            state.validationErrors = null;
        })
        builder.addCase(addInventorySale.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(addInventorySale.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to save";
        })


        builder.addCase(getInventorySale.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getInventorySale.fulfilled, (state, action) => {
            state.saleInfo = { ...action.payload, saleDateString: formatDate(action.payload.saleDate || new Date().toLocaleString(), "db_format") };
            state.loading = false;
        })
        builder.addCase(getInventorySale.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(approvalPostInventorySale.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(approvalPostInventorySale.fulfilled, (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        })
        builder.addCase(approvalPostInventorySale.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(unApprovalPostInventorySale.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(unApprovalPostInventorySale.fulfilled, (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        })
        builder.addCase(unApprovalPostInventorySale.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

            ;
    },
});

export default inventorySaleSlice.reducer;

export const {
    updateInventorySaleField,
    updateSaleDetailsField,
    updateSaleField,
    addSaleDetailsToSaleInfo,
    clearInventorySaleMessages,
    clearInventorySaleState,
    removeSaleDetail,
    updateSaleDetailAtIndex,
    clearSaleDetails,
    setInventorySaleValidationErrors
} = inventorySaleSlice.actions;