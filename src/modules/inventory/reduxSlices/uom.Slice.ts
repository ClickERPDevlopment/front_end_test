import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { CreateUomPayload, IUom, IUomState, UomValidationErrors, UpdateUomPayload } from "../pages/uomSetup/uom.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { checkIfUomStore, saveUomData } from "@/app/idb/store/uomOperations";
import { createUom, deleteUom, fetchAllUoms, fetchPagedUoms, showUom, updateUom } from "../api/uom.API";
import { getAllProductionUom } from "@/app/idb/production/uomOperations";

const initialState: IUomState = {
    uom: {
        uomType: "",
        uomName: "",
        uomShortname: "",
        uomConvertRate: 0,
        id: 0,
    },
    uoms: [
        {
            id: 1,
            uomType: "Length",
            uomName: "Meter",
            uomShortname: "m",
            uomConvertRate: 1,
            actions: "edit"
        },
        {
            id: 2,
            uomType: "Length",
            uomName: "Centimeter",
            uomShortname: "cm",
            uomConvertRate: 0.01,
            actions: "edit"
        },
        {
            id: 3,
            uomType: "Weight",
            uomName: "Kilogram",
            uomShortname: "kg",
            uomConvertRate: 1,
            actions: "edit"
        },
        {
            id: 4,
            uomType: "Weight",
            uomName: "Gram",
            uomShortname: "g",
            uomConvertRate: 0.001,
            actions: "edit"
        },
        {
            id: 5,
            uomType: "Quantity",
            uomName: "Piece",
            uomShortname: "pcs",
            uomConvertRate: 1,
            actions: "edit"
        },
        {
            id: 6,
            uomType: "Time",
            uomName: "Hour",
            uomShortname: "hr",
            uomConvertRate: 1,
            actions: "edit"
        }
    ],
    filteredUom: [],
    paginationObject: createInitialPaginationObject<IUom>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated uoms
export const getPagedUoms = createAsyncThunk<
    PaginationObject<IUom>,
    FetchParams,
    { rejectValue: string }
>("uoms/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedUoms(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all (non-paginated)
export const getAllUoms = createAsyncThunk<
    IUom[],
    void,
    { rejectValue: string }
>("uoms/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllUoms();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all uoms")
        );
    }
});

export const getAllUomsFromJson = createAsyncThunk<
    IUom[],
    void,
    { rejectValue: string }
>("uoms/getAllFromJson", async (_, thunkAPI) => {
    try {
        const { hasData } = await checkIfUomStore();
        if (!hasData) {
            const res = await fetch("/data/uom_list.json");
            if (!res.ok) throw new Error("Failed to load uom_list.json");

            const response: IUom[] = await res.json(); // parse JSON properly
            await saveUomData(response);
        }
        const data = await getAllProductionUom();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all uoms")
        );
    }
});

// Fetch one by ID
export const getUom = createAsyncThunk<
    IUom,
    number,
    { rejectValue: string }
>("uoms/show", async (id, thunkAPI) => {
    try {
        return await showUom(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new 
export const addUom = createAsyncThunk<
    { message: string },
    CreateUomPayload,
    { rejectValue: string }
>("uoms/add", async (payload, thunkAPI) => {
    try {
        return await createUom(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create uom")
        );
    }
});

// Update 
export const editUom = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateUomPayload },
    { rejectValue: string }
>("uoms/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateUom(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update uom")
        );
    }
});

// Delete 
export const removeUom = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("uoms/delete", async (id, thunkAPI) => {
    try {
        return await deleteUom(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const uomSlice = createSlice({
    name: "uoms",
    initialState,
    reducers: {
        updateUomField<K extends keyof IUom>(
            state: IUomState,
            action: PayloadAction<{ key: K; value: IUom[K] }>
        ) {
            const { key, value } = action.payload;
            state.uom[key] = value;
        },
        setUomValidationErrors(
            state,
            action: PayloadAction<UomValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearUomValidationErrors(state) {
            state.validationErrors = null;
        },
        clearUomMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                uom: state.uom,
            };
        },
        clearUomState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedUoms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedUoms.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.uoms = data;
                state.loading = false;
            })
            .addCase(getPagedUoms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllUoms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUoms.fulfilled, (state, action) => {
                state.uoms = action.payload;
                state.loading = false;
            })
            .addCase(getAllUoms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllUomsFromJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUomsFromJson.fulfilled, (state, action) => {
                state.uoms = action.payload;
                state.loading = false;
            })
            .addCase(getAllUomsFromJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getUom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUom.fulfilled, (state, action) => {
                state.uom = action.payload;
                state.loading = false;
            })
            .addCase(getUom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addUom.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addUom.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addUom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create uom";
            })

            .addCase(editUom.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editUom.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editUom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removeUom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeUom.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeUom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default uomSlice.reducer;

export const {
    updateUomField,
    setUomValidationErrors,
    clearUomValidationErrors,
    clearUomMessages,
    clearUomState,
} = uomSlice.actions;
