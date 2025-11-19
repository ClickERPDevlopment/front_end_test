import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { CreateCountryPayload, ICountry, ICountryState, CountryValidationErrors, UpdateCountryPayload } from "../pages/country/country.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createCountry, deleteCountry, fetchAllCountries, fetchPagedCountries, showCountry, updateCountry, } from "../api/country.API";

const initialState: ICountryState = {
    country: {
        id: 0,
        countryName: "",
        countryCode: "",
    },
    countries: [
        {
            id: 1,
            "countryName": "Afghanistan",
            "countryCode": "AF"
        },
        {
            id: 2,
            "countryName": "Albania",
            "countryCode": "AL"
        },
        {
            id: 3,
            "countryName": "Algeria",
            "countryCode": "DZ"
        },
        {
            id: 4,
            "countryName": "American Samoa",
            "countryCode": "AS"
        },
        {
            id: 5,
            "countryName": "Andorra",
            "countryCode": "AD"
        },
        {
            id: 6,
            "countryName": "Angola",
            "countryCode": "AO"
        },
        {
            id: 7,
            "countryName": "Anguilla",
            "countryCode": "AI"
        },
        {
            id: 8,
            "countryName": "Antarctica",
            "countryCode": "AQ"
        },
    ],
    filteredcountrys: [],
    paginationObject: createInitialPaginationObject<ICountry>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated
export const getPagedCountries = createAsyncThunk<
    PaginationObject<ICountry>,
    FetchParams,
    { rejectValue: string }
>("country/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedCountries(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch countrys")
        );
    }
});

// Fetch all country groups (non-paginated)
export const getAllCountries = createAsyncThunk<
    ICountry[],
    void,
    { rejectValue: string }
>("country/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllCountries();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all country groups")
        );
    }
});

// Fetch one country group by ID
export const getCountry = createAsyncThunk<
    ICountry,
    number,
    { rejectValue: string }
>("country/show", async (id, thunkAPI) => {
    try {
        return await showCountry(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch country")
        );
    }
});

// Create new country group
export const addCountry = createAsyncThunk<
    { message: string },
    CreateCountryPayload,
    { rejectValue: string }
>("country/add", async (payload, thunkAPI) => {
    try {
        return await createCountry(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create country group")
        );
    }
});

// Update country
export const editCountry = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateCountryPayload },
    { rejectValue: string }
>("country/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateCountry(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update country group")
        );
    }
});

// Delete country
export const removeCountry = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("country/delete", async (id, thunkAPI) => {
    try {
        return await deleteCountry(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete country group")
        );
    }
});

// Slice
const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        updateCountryField<K extends keyof ICountry>(
            state: ICountryState,
            action: PayloadAction<{ key: K; value: ICountry[K] }>
        ) {
            const { key, value } = action.payload;
            state.country[key] = value;
        },
        setCountryValidationErrors(
            state,
            action: PayloadAction<CountryValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearCountryValidationErrors(state) {
            state.validationErrors = null;
        },
        clearCountryMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
            };
        },
        clearCountryState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedCountries.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.countries = data;
                state.loading = false;
            })
            .addCase(getPagedCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCountries.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.loading = false;
            })
            .addCase(getAllCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getCountry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.country = action.payload;
                state.loading = false;
            })
            .addCase(getCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addCountry.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addCountry.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editCountry.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editCountry.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeCountry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCountry.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default countrySlice.reducer;

export const {
    updateCountryField,
    setCountryValidationErrors,
    clearCountryValidationErrors,
    clearCountryMessages,
    clearCountryState,
} = countrySlice.actions;
