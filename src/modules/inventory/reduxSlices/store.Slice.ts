import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createStore, deleteStore, fetchAllStore, fetchPagedStore, showStore, updateStore } from "../api/store.API.js";
import { CreateStorePayload, IStore, IStoreState, StoreValidationErrors, UpdateStorePayload } from "../pages/store/store.interface.js";


const initialState: IStoreState = {
    store: {
        id: 0,
        storeCode: "",
        address: "",
        contactPersonName: "",
        contactPersonNumber: "",
        factoryId: 0,
        storeName: "",
        storePrefix: "",
        remarks: "",
        isActive: false,
        actions: "",
        storeGroupId: 0,
        factoryName: "",
        storeGroupName: ""
    },
    stores: [],
    filteredStore: [],
    paginationObject: createInitialPaginationObject<IStore>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated
export const getPagedStores = createAsyncThunk<
    PaginationObject<IStore>,
    FetchParams,
    { rejectValue: string }
>("store/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedStore(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch materials")
        );
    }
});

// Fetch all stores (non-paginated)
export const getAllStores = createAsyncThunk<
    IStore[],
    number,
    { rejectValue: string }
>("store/getAll", async (factoryId, thunkAPI) => {
    try {
        return await fetchAllStore(factoryId);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all stores")
        );
    }
});

// Fetch one by ID
export const getStore = createAsyncThunk<
    IStore,
    number,
    { rejectValue: string }
>("store/show", async (id, thunkAPI) => {
    try {
        return await showStore(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material")
        );
    }
});

// Create 
export const addStore = createAsyncThunk<
    { message: string },
    CreateStorePayload,
    { rejectValue: string }
>("store/add", async (payload, thunkAPI) => {
    try {
        return await createStore(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create material group")
        );
    }
});

// Update 
export const editStore = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateStorePayload },
    { rejectValue: string }
>("store/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateStore(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update material group")
        );
    }
});

// Delete materialgroup
export const removeStore = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("store/delete", async (id, thunkAPI) => {
    try {
        return await deleteStore(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete material group")
        );
    }
});

// Slice
const materialStoreSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
        updateStoreField<K extends keyof IStore>(
            state: IStoreState,
            action: PayloadAction<{ key: K; value: IStore[K] }>
        ) {
            const { key, value } = action.payload;
            state.store[key] = value;
        },
        setStoreValidationErrors(
            state,
            action: PayloadAction<StoreValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearStoreValidationErrors(state) {
            state.validationErrors = null;
        },
        clearStoreMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.stores,
            };
        },
        clearStoreState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedStores.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedStores.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.stores = data;
                state.loading = false;
            })
            .addCase(getPagedStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllStores.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStores.fulfilled, (state, action) => {
                state.stores = action.payload;
                state.loading = false;
            })
            .addCase(getAllStores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getStore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStore.fulfilled, (state, action) => {
                state.store = action.payload;
                state.loading = false;
            })
            .addCase(getStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addStore.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addStore.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create store";
            })
            .addCase(editStore.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editStore.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeStore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeStore.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default materialStoreSlice.reducer;

export const {
    updateStoreField,
    setStoreValidationErrors,
    clearStoreValidationErrors,
    clearStoreMessages,
    clearStoreState,
} = materialStoreSlice.actions;
