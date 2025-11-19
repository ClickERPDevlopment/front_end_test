import axiosInstance from "@/api/axiosInstance";
import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCurrency, deleteCurrency, fetchPagedCurrencies, showCurrency, updateCurrency } from "../api/currency.API";
import { CreateCurrencyPayload, CurrencyValidationErrors, ICurrency, ICurrencyState, UpdateCurrencyPayload, } from "../pages/currencySetup/currency.interface";

const initialState: ICurrencyState = {
    currency: {
        Id: 0,        
        Currencyname: "",
        Currencycode: "",
        Symbol: "",
        Isdefault: false,
        Rate: 0,

    },
    currencies: [],
    paginationObject: createInitialPaginationObject<ICurrency>(),
    loading: false,
    error: null,
    filteredCurrencies: [],
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated currencies
export const getPagedCurrencies = createAsyncThunk<
    PaginationObject<ICurrency>,
    FetchParams,
    { rejectValue: string }
>("currencies/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedCurrencies(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all currencies (non-paginated)
export const getAllCurrencies = createAsyncThunk<ICurrency[], void, { rejectValue: string }>(
    "inventorySaleSlice/getInventorySales", async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('/Currency');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("")
        }
    }
)

// Fetch one currency by ID
export const getCurrency = createAsyncThunk<
    ICurrency,
    number,
    { rejectValue: string }
>("currencies/show", async (id, thunkAPI) => {
    try {
        return await showCurrency(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new currency
export const addCurrency = createAsyncThunk<
    { message: string },
    CreateCurrencyPayload,
    { rejectValue: string }
>("currencies/add", async (payload, thunkAPI) => {
    try {
        return await createCurrency(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create currency")
        );
    }
});

// Update currency
export const editCurrency = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateCurrencyPayload },
    { rejectValue: string }
>("currencies/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateCurrency(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update currency")
        );
    }
});

// Delete currency
export const removeCurrency = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("currencies/delete", async (id, thunkAPI) => {
    try {
        return await deleteCurrency(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const currencySlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        updateCurrencyField<K extends keyof ICurrency>(
            state: ICurrencyState,
            action: PayloadAction<{ key: K; value: ICurrency[K] }>
        ) {
            const { key, value } = action.payload;
            state.currency[key] = value;
        },
        setCurrencyValidationErrors(
            state,
            action: PayloadAction<CurrencyValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearCurrencyValidationErrors(state) {
            state.validationErrors = null;
        },
        clearCurrencyMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                currency: state.currency,
            };
        },
        clearCurrencyState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedCurrencies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedCurrencies.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.currencies = data;
                state.loading = false;
            })
            .addCase(getPagedCurrencies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllCurrencies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCurrencies.fulfilled, (state, action) => {
                state.currencies = action.payload;
                state.loading = false;
            })
            .addCase(getAllCurrencies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getCurrency.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrency.fulfilled, (state, action) => {
                state.currency = action.payload;
                state.loading = false;
            })
            .addCase(getCurrency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addCurrency.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addCurrency.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addCurrency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editCurrency.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editCurrency.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editCurrency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeCurrency.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCurrency.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeCurrency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default currencySlice.reducer;

export const {
    updateCurrencyField,
    setCurrencyValidationErrors,
    clearCurrencyValidationErrors,
    clearCurrencyMessages,
    clearCurrencyState,
} = currencySlice.actions;