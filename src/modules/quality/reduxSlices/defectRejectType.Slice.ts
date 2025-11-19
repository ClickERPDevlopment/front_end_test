import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreateDefectRejectTypePayload, DefectRejectTypeValidationErrors, IDefectRejectType, IDefectRejectTypeState, UpdateDefectRejectTypePayload, } from "../pages/defectRejectType/defectRejectType.interface";
import { createDefectRejectType, deleteDefectRejectType, fetchAllDefectRejectTypes, fetchPagedDefectRejectTypes, showDefectRejectType, updateDefectRejectType } from "../api/defectRejectTypeAPI";

const initialState: IDefectRejectTypeState = {
    defectReject: {
        isDefect: false,
        isReject: false,
        type: "",
        code: "",
        name: "",
        sortBy: "",
        penaltyPoints: 0,
        remarks: "",
        id: 0,
    },
    defectRejects: [
    ],
    paginationObject: createInitialPaginationObject<IDefectRejectType>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated 
export const getPagedDefectRejectTypes = createAsyncThunk<
    PaginationObject<IDefectRejectType>,
    FetchParams,
    { rejectValue: string }
>("defect-rejects/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedDefectRejectTypes(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all currencies (non-paginated)
export const getAllDefectRejectTypes = createAsyncThunk<
    IDefectRejectType[],
    void,
    { rejectValue: string }
>("defect-rejects/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllDefectRejectTypes();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all Defect/Rejects")
        );
    }
});

// Fetch one currency by ID
export const getDefectRejectType = createAsyncThunk<
    IDefectRejectType,
    number,
    { rejectValue: string }
>("defect-rejects/show", async (id, thunkAPI) => {
    try {
        return await showDefectRejectType(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Defect/Rejects")
        );
    }
});

// Create new currency
export const addDefectRejectType = createAsyncThunk<
    { message: string },
    CreateDefectRejectTypePayload,
    { rejectValue: string }
>("defect-rejects/add", async (payload, thunkAPI) => {
    try {
        return await createDefectRejectType(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create Defect/Reject")
        );
    }
});

// Update currency
export const editDefectRejectType = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateDefectRejectTypePayload },
    { rejectValue: string }
>("defect-rejects/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateDefectRejectType(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update Defect/Reject")
        );
    }
});

// Delete currency
export const removeDefectRejectType = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("defect-rejects/delete", async (id, thunkAPI) => {
    try {
        return await deleteDefectRejectType(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete DefectReject")
        );
    }
});

// Slice
const defectRejectSlice = createSlice({
    name: "defectRejects",
    initialState,
    reducers: {
        updateDefectRejectTypeField<K extends keyof IDefectRejectType>(
            state: IDefectRejectTypeState,
            action: PayloadAction<{ key: K; value: IDefectRejectType[K] }>
        ) {
            const { key, value } = action.payload;
            state.defectReject[key] = value;
        },
        setDefectRejectTypeValidationErrors(
            state,
            action: PayloadAction<DefectRejectTypeValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearDefectRejectTypeValidationErrors(state) {
            state.validationErrors = null;
        },
        clearDefectRejectTypeMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                defectReject: state.defectReject,
            };
        },
        clearDefectRejectTypeState() {
            return { ...initialState };
        },
        setMachineToStitchMap: (
            state,
            action: PayloadAction<IDefectRejectType>
        ) => {
            state.defectReject = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedDefectRejectTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedDefectRejectTypes.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.defectRejects = data;
                state.loading = false;
            })
            .addCase(getPagedDefectRejectTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllDefectRejectTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDefectRejectTypes.fulfilled, (state, action) => {
                state.defectRejects = action.payload;
                state.loading = false;
            })
            .addCase(getAllDefectRejectTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getDefectRejectType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDefectRejectType.fulfilled, (state, action) => {
                state.defectReject = action.payload;
                state.loading = false;
            })
            .addCase(getDefectRejectType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addDefectRejectType.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addDefectRejectType.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addDefectRejectType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create DefectReject";
            })

            .addCase(editDefectRejectType.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editDefectRejectType.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editDefectRejectType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeDefectRejectType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeDefectRejectType.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeDefectRejectType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default defectRejectSlice.reducer;

export const {
    updateDefectRejectTypeField,
    setDefectRejectTypeValidationErrors,
    clearDefectRejectTypeValidationErrors,
    clearDefectRejectTypeMessages,
    clearDefectRejectTypeState,
    setMachineToStitchMap,
} = defectRejectSlice.actions;
