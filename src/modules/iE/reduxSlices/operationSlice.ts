import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { CreateOperationPayload, IOperation, IOperationState, OperationValidationErrors, UpdateOperationPayload } from "../pages/operationSetup/operation.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createOperation, deleteOperation, fetchAllOperations, fetchPagedOperations, showOperation, updateOperation } from "../api/operationAPI";

const initialState: IOperationState = {
    operation: {
        section: "",
        productType: "",
        itemType: "",
        operationName: "",
        operationLocalName: "",
        grade: "",
        smv: "",
        machine: "",
        operationType: "",
        operationSection: "",
        pressureFoot: "",
        guideFolder: "",
        attachment: "",
        remarks: "",
        isCritical: false,
        isActive: false,
        id: 0,
    },
    operations: [],
    filteredOperation: [],
    paginationObject: createInitialPaginationObject<IOperation>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated operations
export const getPagedOperations = createAsyncThunk<
    PaginationObject<IOperation>,
    FetchParams,
    { rejectValue: string }
>("operations/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedOperations(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch operation types")
        );
    }
});

// Fetch all currencies (non-paginated)
export const getAllOperations = createAsyncThunk<
    IOperation[],
    void,
    { rejectValue: string }
>("operations/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllOperations();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all operations")
        );
    }
});


// Fetch one currency by ID
export const getOperation = createAsyncThunk<
    IOperation,
    number,
    { rejectValue: string }
>("operations/show", async (id, thunkAPI) => {
    try {
        return await showOperation(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new currency
export const addOperation = createAsyncThunk<
    { message: string },
    CreateOperationPayload,
    { rejectValue: string }
>("operations/add", async (payload, thunkAPI) => {
    try {
        return await createOperation(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create operation")
        );
    }
});

// Update currency
export const editOperation = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateOperationPayload },
    { rejectValue: string }
>("operations/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateOperation(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update operation")
        );
    }
});

// Delete currency
export const removeOperation = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("operations/delete", async (id, thunkAPI) => {
    try {
        return await deleteOperation(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const operationSlice = createSlice({
    name: "operations",
    initialState,
    reducers: {
        updateOperationField<K extends keyof IOperation>(
            state: IOperationState,
            action: PayloadAction<{ key: K; value: IOperation[K] }>
        ) {
            const { key, value } = action.payload;
            state.operation[key] = value;
        },
        setOperationValidationErrors(
            state,
            action: PayloadAction<OperationValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearOperationValidationErrors(state) {
            state.validationErrors = null;
        },
        clearOperationMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                operation: state.operation,
            };
        },
        clearOperationState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedOperations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedOperations.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.operations = data;
                state.loading = false;
            })
            .addCase(getPagedOperations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllOperations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOperations.fulfilled, (state, action) => {
                state.operations = action.payload;
                state.loading = false;
            })
            .addCase(getAllOperations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getOperation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOperation.fulfilled, (state, action) => {
                state.operation = action.payload;
                state.loading = false;
            })
            .addCase(getOperation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addOperation.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addOperation.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addOperation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create operation";
            })
            .addCase(editOperation.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editOperation.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editOperation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removeOperation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeOperation.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeOperation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default operationSlice.reducer;

export const {
    updateOperationField,
    setOperationValidationErrors,
    clearOperationValidationErrors,
    clearOperationMessages,
    clearOperationState,
} = operationSlice.actions;
