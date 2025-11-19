import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { CreateOperationTypePayload, IOperationType, IOperationTypeState, OperationTypeValidationErrors, UpdateOperationTypePayload } from "../pages/operationTypeSetup/operationTypeSetup.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createOperationType, deleteOperationType, fetchAllOperationTypes, fetchPagedOperationTypes, showOperationType, updateOperationType } from "../api/operationtypeAPI";



const initialState: IOperationTypeState = {
    operationType: {
        type: "",
        remarks: "",
        id: 0,
    },
    operationTypes: [],
    filteredOperationType: [],
    paginationObject: createInitialPaginationObject<IOperationType>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated operationTypes
export const getPagedOperationTypes = createAsyncThunk<
    PaginationObject<IOperationType>,
    FetchParams,
    { rejectValue: string }
>("operationTypes/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedOperationTypes(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch operation types")
        );
    }
});

// Fetch all currencies (non-paginated)
export const getAllOperationTypes = createAsyncThunk<
    IOperationType[],
    void,
    { rejectValue: string }
>("operationTypes/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllOperationTypes();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all operationTypes")
        );
    }
});


// Fetch one currency by ID
export const getOperationType = createAsyncThunk<
    IOperationType,
    number,
    { rejectValue: string }
>("operationTypes/show", async (id, thunkAPI) => {
    try {
        return await showOperationType(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new currency
export const addOperationType = createAsyncThunk<
    { message: string },
    CreateOperationTypePayload,
    { rejectValue: string }
>("operationTypes/add", async (payload, thunkAPI) => {
    try {
        return await createOperationType(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create operationType")
        );
    }
});

// Update currency
export const editOperationType = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateOperationTypePayload },
    { rejectValue: string }
>("operationTypes/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateOperationType(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update operationType")
        );
    }
});

// Delete currency
export const removeOperationType = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("operationTypes/delete", async (id, thunkAPI) => {
    try {
        return await deleteOperationType(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const operationTypeSlice = createSlice({
    name: "operationTypes",
    initialState,
    reducers: {
        updateOperationTypeField<K extends keyof IOperationType>(
            state: IOperationTypeState,
            action: PayloadAction<{ key: K; value: IOperationType[K] }>
        ) {
            const { key, value } = action.payload;
            state.operationType[key] = value;
        },
        setOperationTypeValidationErrors(
            state,
            action: PayloadAction<OperationTypeValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearOperationTypeValidationErrors(state) {
            state.validationErrors = null;
        },
        clearOperationTypeMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                operationType: state.operationType,
            };
        },
        clearOperationTypeState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedOperationTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedOperationTypes.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.operationTypes = data;
                state.loading = false;
            })
            .addCase(getPagedOperationTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllOperationTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOperationTypes.fulfilled, (state, action) => {
                state.operationTypes = action.payload;
                state.loading = false;
            })
            .addCase(getAllOperationTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getOperationType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOperationType.fulfilled, (state, action) => {
                state.operationType = action.payload;
                state.loading = false;
            })
            .addCase(getOperationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addOperationType.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addOperationType.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addOperationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create operationType";
            })
            .addCase(editOperationType.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editOperationType.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editOperationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeOperationType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeOperationType.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeOperationType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default operationTypeSlice.reducer;

export const {
    updateOperationTypeField,
    setOperationTypeValidationErrors,
    clearOperationTypeValidationErrors,
    clearOperationTypeMessages,
    clearOperationTypeState,
} = operationTypeSlice.actions;
