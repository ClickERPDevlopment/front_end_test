import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { CreateSizePayload, ISize, ISizeState, SizeValidationErrors, UpdateSizePayload } from "../pages/sizeSetup/sizeSetup.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createSize, deleteSize, fetchAllSizes, fetchPagedSizes, showSize, updateSize, } from "../api/size.API";

const initialState: ISizeState = {
    size: {
        id: 0,
        buyerId: 0,
        buyerName: "",
        displayName: "",
        sortingBy: "",
        isInSeam: false,
        sizeName: "",
        sortingNo: 0,
        actions: false,
    },
    sizes: [
        {
            id: 569,
            buyerId: 36,
            buyerName: "ALCOTT",
            sizeName: "36",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 528,
            buyerId: 36,
            buyerName: "ALCOTT",
            sizeName: "M",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 696,
            buyerId: 36,
            buyerName: "ALCOTT",
            sizeName: "XL",
            sortingNo: 5,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 695,
            buyerId: 36,
            buyerName: "ALCOTT",
            sizeName: "L",
            sortingNo: 4,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 694,
            buyerId: 36,
            buyerName: "ALCOTT",
            sizeName: "S",
            sortingNo: 3,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 816,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "56",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 817,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "58/60",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 815,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "54",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 814,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "52",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 813,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "50",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 818,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "62/64",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 819,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "ALL SIZE",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        },
        {
            id: 812,
            buyerId: 57,
            buyerName: "AVENA",
            sizeName: "48",
            sortingNo: 0,
            displayName: "",
            sortingBy: "",
            isInSeam: false
        }
    ],
    filteredSizes: [],
    paginationObject: createInitialPaginationObject<ISize>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated
export const getPagedSizes = createAsyncThunk<
    PaginationObject<ISize>,
    FetchParams,
    { rejectValue: string }
>("material-groups/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedSizes(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch materials")
        );
    }
});

// Fetch all material groups (non-paginated)
export const getAllSizes = createAsyncThunk<
    ISize[],
    void,
    { rejectValue: string }
>("material-groups/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllSizes();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all material groups")
        );
    }
});

// Fetch one material group by ID
export const getSize = createAsyncThunk<
    ISize,
    number,
    { rejectValue: string }
>("material-groups/show", async (id, thunkAPI) => {
    try {
        return await showSize(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material")
        );
    }
});

// Create new material group
export const addSize = createAsyncThunk<
    { message: string },
    CreateSizePayload,
    { rejectValue: string }
>("material-groups/add", async (payload, thunkAPI) => {
    try {
        return await createSize(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create material group")
        );
    }
});

// Update material
export const editSize = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateSizePayload },
    { rejectValue: string }
>("material-groups/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateSize(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update material group")
        );
    }
});

// Delete size
export const removeSize = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("material-groups/delete", async (id, thunkAPI) => {
    try {
        return await deleteSize(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete material group")
        );
    }
});

// Slice
const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {
        updateSizeField<K extends keyof ISize>(
            state: ISizeState,
            action: PayloadAction<{ key: K; value: ISize[K] }>
        ) {
            const { key, value } = action.payload;
            state.size[key] = value;
        },
        setSizeValidationErrors(
            state,
            action: PayloadAction<SizeValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearSizeValidationErrors(state) {
            state.validationErrors = null;
        },
        clearSizeMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.size,
            };
        },
        clearSizeState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedSizes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedSizes.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.sizes = data;
                state.loading = false;
            })
            .addCase(getPagedSizes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllSizes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSizes.fulfilled, (state, action) => {
                state.sizes = action.payload;
                state.loading = false;
            })
            .addCase(getAllSizes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getSize.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSize.fulfilled, (state, action) => {
                state.size = action.payload;
                state.loading = false;
            })
            .addCase(getSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addSize.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addSize.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editSize.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editSize.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeSize.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeSize.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default sizeSlice.reducer;

export const {
    updateSizeField,
    setSizeValidationErrors,
    clearSizeValidationErrors,
    clearSizeMessages,
    clearSizeState,
} = sizeSlice.actions;