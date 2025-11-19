import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreatePlanningWorkingTeamPayload, IPlanningWorkingTeam, IPlanningWorkingTeamState, PlanningWorkingTeamValidationErrors, UpdatePlanningWorkingTeamPayload, } from "../pages/planningWorkingTeam/planningWorkingTeam.interface";
import { createPlanningWorkingTeam, deletePlanningWorkingTeam, fetchAllPlanningWorkingTeam, fetchPagedPlanningWorkingTeam, showPlanningWorkingTeam, updatePlanningWorkingTeam, } from "../api/planningWorkingTeam.API";

const initialState: IPlanningWorkingTeamState = {
    planningWorkingTeam: {
        id: 0,
        userCode: "",
        teamName: "",
        name: "",
        designation: "",
        department: "",
        email: "",
        role: "",
        status: "",
        del: "",
        actions: "",
        isActive: false,
    },
    planningWorkingTeamList: [
        {
            id: 0,
            userCode: "dummy-CODE-1",
            teamName: "Team - 1",
            name: "dummy",
            designation: "",
            department: "",
            email: "",
            role: "",
            status: "",
            del: "",
            actions: "",
            isActive: false,
        },
        {
            id: 1,
            userCode: "dummy-CODE-2",
            teamName: "Team - 2",
            name: "dummy",
            designation: "",
            department: "",
            email: "",
            role: "",
            status: "",
            del: "",
            actions: "",
            isActive: false,
        },
    ],
    filteredPlanningWorkingTeam: [],
    paginationObject: createInitialPaginationObject<IPlanningWorkingTeam>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated planningWorkingTeam
export const getPagedPlanningWorkingTeam = createAsyncThunk<
    PaginationObject<IPlanningWorkingTeam>,
    FetchParams,
    { rejectValue: string }
>("planning-team/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedPlanningWorkingTeam(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch gatepasses")
        );
    }
});

// Fetch all planningWorkingTeam (non-paginated)
export const getAllPlanningWorkingTeam = createAsyncThunk<
    IPlanningWorkingTeam[],
    void,
    { rejectValue: string }
>("planning-team/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllPlanningWorkingTeam();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all gatepasses")
        );
    }
});

// Fetch one planningWorkingTeam by ID
export const getPlanningWorkingTeam = createAsyncThunk<
    IPlanningWorkingTeam,
    number,
    { rejectValue: string }
>("purchase-requisition/show", async (id, thunkAPI) => {
    try {
        return await showPlanningWorkingTeam(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch planningWorkingTeam")
        );
    }
});

// Create new planningWorkingTeam
export const addPlanningWorkingTeam = createAsyncThunk<
    { message: string },
    CreatePlanningWorkingTeamPayload,
    { rejectValue: string }
>("planning-working-team/add", async (payload, thunkAPI) => {
    try {
        return await createPlanningWorkingTeam(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create planningWorkingTeam")
        );
    }
});

// Update planningWorkingTeam
export const editPlanningWorkingTeam = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdatePlanningWorkingTeamPayload },
    { rejectValue: string }
>("planning-working-team/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updatePlanningWorkingTeam(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update planningWorkingTeam")
        );
    }
});

// Delete planningWorkingTeam
export const removePlanningWorkingTeam = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("planning-working-team/delete", async (id, thunkAPI) => {
    try {
        return await deletePlanningWorkingTeam(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete planningWorkingTeam")
        );
    }
});

// Slice
const planningWorkingTeamSlice = createSlice({
    name: "purchaserequisition",
    initialState,
    reducers: {
        updatePlanningWorkingTeamField<K extends keyof IPlanningWorkingTeam>(
            state: IPlanningWorkingTeamState,
            action: PayloadAction<{ key: K; value: IPlanningWorkingTeam[K] }>
        ) {
            const { key, value } = action.payload;
            // state.purchaseRequisitonDetailsList
            state.planningWorkingTeam[key] = value;
        },
        setPlanningWorkingTeamValidationErrors(
            state,
            action: PayloadAction<PlanningWorkingTeamValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        updatePlanningWorkingTeamRow(
            state,
            action: PayloadAction<{
                index: number;
                key: keyof IPlanningWorkingTeam;
                value: string;
            }>
        ) {
            const { index, key, value } = action.payload;
            const row = state.planningWorkingTeamList[index];

            if (row) {
                (row[key] as string) = value;
            }
        },
        clearPlanningWorkingTeamValidationErrors(state) {
            state.validationErrors = null;
        },
        clearPlanningWorkingTeamMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                planningWorkingTeam: state.planningWorkingTeam,
            };
        },
        clearPlanningWorkingTeamState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedPlanningWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedPlanningWorkingTeam.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.planningWorkingTeamList = data;
                state.loading = false;
            })
            .addCase(getPagedPlanningWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllPlanningWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPlanningWorkingTeam.fulfilled, (state, action) => {
                state.planningWorkingTeamList = action.payload;
                state.loading = false;
            })
            .addCase(getAllPlanningWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getPlanningWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPlanningWorkingTeam.fulfilled, (state, action) => {
                state.planningWorkingTeam = action.payload;
                state.loading = false;
            })
            .addCase(getPlanningWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addPlanningWorkingTeam.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addPlanningWorkingTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addPlanningWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create planningWorkingTeam";
            })

            .addCase(editPlanningWorkingTeam.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editPlanningWorkingTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editPlanningWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removePlanningWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePlanningWorkingTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removePlanningWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default planningWorkingTeamSlice.reducer;

export const {
    updatePlanningWorkingTeamField,
    updatePlanningWorkingTeamRow,
    setPlanningWorkingTeamValidationErrors,
    clearPlanningWorkingTeamValidationErrors,
    clearPlanningWorkingTeamMessages,
    clearPlanningWorkingTeamState,
} = planningWorkingTeamSlice.actions;
