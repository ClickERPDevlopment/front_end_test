import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createStoreGroup, deleteStoreGroup, fetchAllStoreGroup, fetchPagedStoreGroup, showStoreGroup, updateStoreGroup } from "../api/storeGroup.API";
import { CreateStoreGroupPayload, IStoreGroup, IStoreGroupState, StoreGroupValidationErrors, UpdateStoreGroupPayload } from "../pages/storeGroup/storeGroup.interface"


const initialState: IStoreGroupState = {
    storeGroup: {
        id: 0,
        storeGroup: "",
        factoryId: "",
        factoryName: ""
    },
    storeGroups: [
        {
            id: 1,
            storeGroup: "GROUP - X",
            factoryId: "",
            factoryName: ""
        },
        {
            id: 2,
            storeGroup: "GROUP - Y",
            factoryId: "",
            factoryName: ""
        },
        {
            id: 3,
            storeGroup: "GROUP - Z",
            factoryId: "",
            factoryName: ""
        },
        {
            id: 4,
            storeGroup: "GROUP - XX",
            factoryId: "",
            factoryName: ""
        },
        {
            id: 5,
            storeGroup: "GROUP - YY",
            factoryId: "",
            factoryName: ""
        },
    ],
    filteredStoreGroup: [],
    paginationObject: createInitialPaginationObject<IStoreGroup>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated
export const getPagedStoreGroups = createAsyncThunk<
    PaginationObject<IStoreGroup>,
    FetchParams,
    { rejectValue: string }
>("material-groups/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedStoreGroup(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch store groups")
        );
    }
});

// Fetch all (non-paginated)
export const getAllStoreGroups = createAsyncThunk<
    IStoreGroup[],
    void,
    { rejectValue: string }
>("material-groups/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllStoreGroup();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all store groups")
        );
    }
});

// Fetch one by ID
export const getStoreGroup = createAsyncThunk<
    IStoreGroup,
    number,
    { rejectValue: string }
>("material-groups/show", async (id, thunkAPI) => {
    try {
        return await showStoreGroup(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch store groups")
        );
    }
});

// Create
export const addStoreGroup = createAsyncThunk<
    { message: string },
    CreateStoreGroupPayload,
    { rejectValue: string }
>("material-groups/add", async (payload, thunkAPI) => {
    try {
        return await createStoreGroup(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create store groups")
        );
    }
});

// Update
export const editStoreGroup = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateStoreGroupPayload },
    { rejectValue: string }
>("material-groups/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateStoreGroup(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update store groups")
        );
    }
});


export const removeStoreGroup = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("material-groups/delete", async (id, thunkAPI) => {
    try {
        return await deleteStoreGroup(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete store groups")
        );
    }
});

// Slice
const storeGroupSlice = createSlice({
    name: "storeGroup",
    initialState,
    reducers: {
        updateStoreGroupField<K extends keyof IStoreGroup>(
            state: IStoreGroupState,
            action: PayloadAction<{ key: K; value: IStoreGroup[K] }>
        ) {
        },
        setStoreGroupValidationErrors(
            state,
            action: PayloadAction<StoreGroupValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearStoreGroupValidationErrors(state) {
            state.validationErrors = null;
        },
        clearStoreGroupMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.storeGroup,
            };
        },
        clearStoreGroupState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedStoreGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedStoreGroups.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.storeGroups = data;
                state.loading = false;
            })
            .addCase(getPagedStoreGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllStoreGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStoreGroups.fulfilled, (state, action) => {
                state.storeGroups = action.payload;
                state.loading = false;
            })
            .addCase(getAllStoreGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getStoreGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoreGroup.fulfilled, (state, action) => {
                state.storeGroup = action.payload;
                state.loading = false;
            })
            .addCase(getStoreGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addStoreGroup.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addStoreGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addStoreGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create store groups";
            })
            .addCase(editStoreGroup.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editStoreGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editStoreGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeStoreGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeStoreGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeStoreGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default storeGroupSlice.reducer;

export const {
    updateStoreGroupField,
    setStoreGroupValidationErrors,
    clearStoreGroupValidationErrors,
    clearStoreGroupMessages,
    clearStoreGroupState,
} = storeGroupSlice.actions;
