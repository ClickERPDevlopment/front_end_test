import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { CreateColorPayload, IColor, IColorState, ColorValidationErrors, UpdateColorPayload } from "../pages/colorSetup/colorSetup.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createColor, deleteColor, fetchAllColors, fetchPagedColors, showColor, updateColor, } from "../api/color.API";

const initialState: IColorState = {
    color: {
        id: 0,
        buyerId: 0,
        buyerName: "",
        colorDisplayName: "",
        colorName: "",
        colorType: "",
        colorDescription: "",
        actions: false,
    },
    colors: [
        {
            id: 619,
            buyerId: 36,
            buyerName: "ALCOTT",
            colorType: "S",
            colorName: "11-0701 TPG",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 718,
            buyerId: 36,
            buyerName: "ALCOTT",
            colorType: "S",
            colorName: "NAVY (19-3922PK STD)",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 717,
            buyerId: 36,
            buyerName: "ALCOTT",
            colorType: "S",
            colorName: "WHITE (11-0102TSX)",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 773,
            buyerId: 36,
            buyerName: "ALCOTT",
            colorType: "S",
            colorName: "ANY COLOR",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 548,
            buyerId: 36,
            buyerName: "ALCOTT",
            colorType: "S",
            colorName: "BLACK",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 642,
            buyerId: 36,
            buyerName: "ALCOTT",
            colorType: "S",
            colorName: "WHITE",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 2554,
            buyerId: 57,
            buyerName: "AVENA",
            colorType: "S",
            colorName: "Marine ( 23-7011-0)",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 2553,
            buyerId: 57,
            buyerName: "AVENA",
            colorType: "S",
            colorName: "White ( 23-7010-3)",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 2552,
            buyerId: 57,
            buyerName: "AVENA",
            colorType: "S",
            colorName: "50",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 2551,
            buyerId: 57,
            buyerName: "AVENA",
            colorType: "S",
            colorName: "48",
            colorDisplayName: "",
            colorDescription: ""
        },
        {
            id: 2550,
            buyerId: 57,
            buyerName: "AVENA",
            colorType: "S",
            colorName: "Rot",
            colorDisplayName: "",
            colorDescription: ""
        }
    ],
    filteredColors: [],
    paginationObject: createInitialPaginationObject<IColor>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated
export const getPagedColors = createAsyncThunk<
    PaginationObject<IColor>,
    FetchParams,
    { rejectValue: string }
>("color/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedColors(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch colors")
        );
    }
});

// Fetch all color groups (non-paginated)
export const getAllColors = createAsyncThunk<
    IColor[],
    void,
    { rejectValue: string }
>("color/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllColors();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all color groups")
        );
    }
});

// Fetch one color group by ID
export const getColor = createAsyncThunk<
    IColor,
    number,
    { rejectValue: string }
>("color/show", async (id, thunkAPI) => {
    try {
        return await showColor(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch color")
        );
    }
});

// Create new color group
export const addColor = createAsyncThunk<
    { message: string },
    CreateColorPayload,
    { rejectValue: string }
>("color/add", async (payload, thunkAPI) => {
    try {
        return await createColor(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create color group")
        );
    }
});

// Update color
export const editColor = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateColorPayload },
    { rejectValue: string }
>("color/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateColor(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update color group")
        );
    }
});

// Delete color
export const removeColor = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("color/delete", async (id, thunkAPI) => {
    try {
        return await deleteColor(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete color group")
        );
    }
});

// Slice
const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {
        updateColorField<K extends keyof IColor>(
            state: IColorState,
            action: PayloadAction<{ key: K; value: IColor[K] }>
        ) {
            const { key, value } = action.payload;
            state.color[key] = value;
        },
        setColorValidationErrors(
            state,
            action: PayloadAction<ColorValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearColorValidationErrors(state) {
            state.validationErrors = null;
        },
        clearColorMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.color,
            };
        },
        clearColorState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedColors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedColors.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.colors = data;
                state.loading = false;
            })
            .addCase(getPagedColors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllColors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllColors.fulfilled, (state, action) => {
                state.colors = action.payload;
                state.loading = false;
            })
            .addCase(getAllColors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getColor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getColor.fulfilled, (state, action) => {
                state.color = action.payload;
                state.loading = false;
            })
            .addCase(getColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addColor.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addColor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editColor.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editColor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeColor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeColor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default colorSlice.reducer;

export const {
    updateColorField,
    setColorValidationErrors,
    clearColorValidationErrors,
    clearColorMessages,
    clearColorState,
} = colorSlice.actions;