import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { CreateBuyerPayload, IBuyer, IBuyerState, BuyerValidationErrors, UpdateBuyerPayload } from "../pages/buyerSetup/buyerSetup.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createBuyer, deleteBuyer, fetchAllBuyers, FetchAllConfigBuyer, fetchPagedBuyers, showBuyer, updateBuyer, } from "../api/buyer.API";
import { string } from "zod";

const initialState: IBuyerState = {
    buyer: {
        countryId: 0,
        countryName: "",
        displayName: "",
        mainBuyerId: 0,
        buyerName: "",
        buyerCode: "",
        address: "",
        buyingCommission: 0,
        contactNo: "",
        email: "",
        symbolicName: "",
        isActive: false,
        isNoStartFromZero: false,
        actions: false,
        id: 0,
    },
    buyers: [
        // {
        //     id: 60,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "PEPCO",
        //     displayName: "PEPCO",
        //     buyerCode: "72",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 61,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "SLAZENGER",
        //     displayName: "SLAZENGER",
        //     buyerCode: "71",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 78,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "WILLIAMS",
        //     displayName: "WILLIAMS",
        //     buyerCode: "79",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 79,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "FASHION TEXT",
        //     displayName: "FASHION TEXT",
        //     buyerCode: "80",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 80,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "PRIMATEX",
        //     displayName: "PRIMATEX",
        //     buyerCode: "81",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 81,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "DREUSS WORLD",
        //     displayName: "DREUSS WORLD",
        //     buyerCode: "82",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 82,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "RIZQ SOURCING",
        //     displayName: "RIZQ SOURCING",
        //     buyerCode: "83",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 86,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "SIPLEC",
        //     displayName: "SIPLEC",
        //     buyerCode: "87",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 92,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "ORIGINAL MARINES [Team A]",
        //     displayName: "ORIGINAL MARINES [Team A]",
        //     buyerCode: "89",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 93,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "MARSHAL ARTIST",
        //     displayName: "MARSHAL ARTIST",
        //     buyerCode: "90",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 99,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "ENCUENTRO",
        //     displayName: "ENCUENTRO",
        //     buyerCode: "93",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // },
        // {
        //     id: 100,
        //     countryId: 0,
        //     countryName: "",
        //     mainBuyerId: 0,
        //     buyerName: "SVANTEX",
        //     displayName: "SVANTEX",
        //     buyerCode: "94",
        //     email: "",
        //     buyingCommission: 0,
        //     contactNo: "",
        //     symbolicName: "",
        //     address: ""
        // }
    ],

    filteredBuyers: [],
    paginationObject: createInitialPaginationObject<IBuyer>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};



// Fetch paginated
export const getPagedBuyers = createAsyncThunk<
    PaginationObject<IBuyer>,
    FetchParams,
    { rejectValue: string }
>("buyers/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedBuyers(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch buyers")
        );
    }
});

// Fetch all buyers (non-paginated)
export const getAllBuyers = createAsyncThunk<
    IBuyer[],
    void,
    { rejectValue: string }
>("buyers/all", async (_, thunkAPI) => {
    try {
        return await fetchAllBuyers();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all buyers")
        );
    }
});

// Fetch one material group by ID
export const getBuyer = createAsyncThunk<
    IBuyer,
    number,
    { rejectValue: string }
>("buyers/show", async (id, thunkAPI) => {
    try {
        return await showBuyer(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch buyers")
        );
    }
});

// Create new material group
export const addBuyer = createAsyncThunk<
    { message: string },
    CreateBuyerPayload,
    { rejectValue: string }
>("buyers/add", async (payload, thunkAPI) => {
    try {
        return await createBuyer(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create buyers")
        );
    }
});

// Update material
export const editBuyer = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateBuyerPayload },
    { rejectValue: string }
>("buyers/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateBuyer(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update buyers")
        );
    }
});

// Delete buyer
export const removeBuyer = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("buyers/delete", async (id, thunkAPI) => {
    try {
        return await deleteBuyer(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete buyers")
        );
    }
});


// Fetch all config buyer
export const GetAllConfigBuyer = createAsyncThunk<
    IBuyer[],
    void,
    { rejectValue: string }
>("material-groups/getAll", async (_, thunkAPI) => {
    try {
        return await FetchAllConfigBuyer();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all material groups")
        );
    }
});


// Slice
const buyerSlice = createSlice({
    name: "buyer",
    initialState,
    reducers: {
        updateBuyerField<K extends keyof IBuyer>(
            state: IBuyerState,
            action: PayloadAction<{ key: K; value: IBuyer[K] }>
        ) {
            const { key, value } = action.payload;
            state.buyer[key] = value;
        },
        setBuyerValidationErrors(
            state,
            action: PayloadAction<BuyerValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearBuyerValidationErrors(state) {
            state.validationErrors = null;
        },
        clearBuyerMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.buyer,
            };
        },
        clearBuyerState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedBuyers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedBuyers.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.buyers = data;
                state.loading = false;
            })
            .addCase(getPagedBuyers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllBuyers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBuyers.fulfilled, (state, action) => {
                state.buyers = action.payload;
                state.loading = false;
            })
            .addCase(getAllBuyers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getBuyer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBuyer.fulfilled, (state, action) => {
                state.buyer = action.payload;
                state.loading = false;
            })
            .addCase(getBuyer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(GetAllConfigBuyer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllConfigBuyer.fulfilled, (state, action) => {
                state.buyers = action.payload;
                state.loading = false;
            })
            .addCase(GetAllConfigBuyer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(addBuyer.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addBuyer.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addBuyer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editBuyer.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editBuyer.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editBuyer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeBuyer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeBuyer.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeBuyer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});






export default buyerSlice.reducer;

export const {
    updateBuyerField,
    setBuyerValidationErrors,
    clearBuyerValidationErrors,
    clearBuyerMessages,
    clearBuyerState,
} = buyerSlice.actions;