import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import machinesSetupSlice from '../../iE/reduxSlices/machine.Slice';
import { CreatePlanningCalendarPayload, ICalendarDay, IPlanningCalendar, IPlanningCalendarState, PlanningCalendarValidationErrors, UpdatePlanningCalendarPayload, } from "../pages/planningCalendar/planningCalendar.interface";
import { createPlanningCalendar, deletePlanningCalendar, fetchAllPlanningCalendar, fetchPagedPlanningCalendar, showPlanningCalendar, updatePlanningCalendar, } from "../api/planningCalendar.API";

const initialState: IPlanningCalendarState = {
    planningCalendar: {
        id: 0,
        factory: "",
        section: "",
        boardId: 0,
        fromDate: "",
        toDate: "",
        actions: "",
        year: 0,
        month: 0,
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        weekData: [],
        isSelected: false,
    },
    selectedIndex: -1,
    boards: [
        {
            id: 1,
            name: "SEWING BOARD"
        },
        {
            id: 2,
            name: "MACHINE BOARD"
        },
    ],
    planningCalendarList: [
        {
            id: 1,
            factory: "",
            section: "",
            boardId: 0,
            fromDate: "",
            toDate: "",
            actions: "",
            year: 2025,
            month: 1,
            sunday: 5,
            monday: 6,
            tuesday: 7,
            wednesday: 8,
            thursday: 9,
            friday: 10,
            saturday: 11,
            weekData: [
                { date: "2025-01-05", efficiency: 50, manpower: 12, workingHour: 10 },
                { date: "2025-01-06", efficiency: 55, manpower: 14, workingHour: 10 },
                { date: "2025-01-07", efficiency: 60, manpower: 15, workingHour: 9 },
                { date: "2025-01-08", efficiency: 48, manpower: 13, workingHour: 10 },
                { date: "2025-01-09", efficiency: 62, manpower: 16, workingHour: 10 },
                { date: "2025-01-10", efficiency: 58, manpower: 15, workingHour: 9 },
                { date: "2025-01-11", efficiency: 65, manpower: 17, workingHour: 10 },
            ],
            isSelected: false,
        },
        {
            id: 2,
            factory: "",
            section: "",
            boardId: 0,
            fromDate: "",
            toDate: "",
            actions: "",
            year: 2025,
            month: 1,
            sunday: 12,
            monday: 13,
            tuesday: 14,
            wednesday: 15,
            thursday: 16,
            friday: 17,
            saturday: 18,
            weekData: [
                { date: "2025-01-12", efficiency: 52, manpower: 14, workingHour: 10 },
                { date: "2025-01-13", efficiency: 57, manpower: 15, workingHour: 9 },
                { date: "2025-01-14", efficiency: 61, manpower: 16, workingHour: 10 },
                { date: "2025-01-15", efficiency: 59, manpower: 15, workingHour: 10 },
                { date: "2025-01-16", efficiency: 64, manpower: 17, workingHour: 10 },
                { date: "2025-01-17", efficiency: 60, manpower: 16, workingHour: 9 },
                { date: "2025-01-18", efficiency: 67, manpower: 18, workingHour: 10 },
            ],
            isSelected: false,
        },
        {
            id: 3,
            factory: "",
            section: "",
            boardId: 0,
            fromDate: "",
            toDate: "",
            actions: "",
            year: 2025,
            month: 1,
            sunday: 19,
            monday: 20,
            tuesday: 21,
            wednesday: 22,
            thursday: 23,
            friday: 24,
            saturday: 25,
            weekData: [
                { date: "2025-01-19", efficiency: 63, manpower: 17, workingHour: 10 },
                { date: "2025-01-20", efficiency: 66, manpower: 18, workingHour: 9 },
                { date: "2025-01-21", efficiency: 62, manpower: 16, workingHour: 10 },
                { date: "2025-01-22", efficiency: 68, manpower: 19, workingHour: 10 },
                { date: "2025-01-23", efficiency: 65, manpower: 18, workingHour: 10 },
                { date: "2025-01-24", efficiency: 70, manpower: 20, workingHour: 9 },
                { date: "2025-01-25", efficiency: 72, manpower: 21, workingHour: 10 },

            ],
            isSelected: false,
        },
        {
            id: 4,
            factory: "",
            section: "",
            boardId: 0,
            fromDate: "",
            toDate: "",
            actions: "",
            year: 2025,
            month: 1,
            sunday: 26,
            monday: 27,
            tuesday: 28,
            wednesday: 29,
            thursday: 30,
            friday: 31,
            saturday: 1,
            weekData: [
                { date: "2025-01-26", efficiency: 68, manpower: 19, workingHour: 10 },
                { date: "2025-01-27", efficiency: 71, manpower: 20, workingHour: 9 },
                { date: "2025-01-28", efficiency: 67, manpower: 18, workingHour: 10 },
                { date: "2025-01-29", efficiency: 73, manpower: 21, workingHour: 10 },
                { date: "2025-01-30", efficiency: 70, manpower: 20, workingHour: 10 },
                { date: "2025-01-31", efficiency: 75, manpower: 22, workingHour: 9 },
                { date: "2025-02-01", efficiency: 77, manpower: 23, workingHour: 10 },
            ],
            isSelected: false,
        },
    ],
    filteredPlanningCalendar: [],
    paginationObject: createInitialPaginationObject<IPlanningCalendar>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated planningCalendar
export const getPagedPlanningCalendar = createAsyncThunk<
    PaginationObject<IPlanningCalendar>,
    FetchParams,
    { rejectValue: string }
>("purchase-requisition/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedPlanningCalendar(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch planning calendar")
        );
    }
});

// Fetch all planningCalendar (non-paginated)
export const getAllPlanningCalendar = createAsyncThunk<
    IPlanningCalendar[],
    void,
    { rejectValue: string }
>("purchase-requisition/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllPlanningCalendar();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all planning calendar")
        );
    }
});

// Fetch one planningCalendar by ID
export const getPlanningCalendar = createAsyncThunk<
    IPlanningCalendar,
    number,
    { rejectValue: string }
>("purchase-requisition/show", async (id, thunkAPI) => {
    try {
        return await showPlanningCalendar(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch planningCalendar")
        );
    }
});

// Create new planningCalendar
export const addPlanningCalendar = createAsyncThunk<
    { message: string },
    CreatePlanningCalendarPayload,
    { rejectValue: string }
>("planning-calendar/add", async (payload, thunkAPI) => {
    try {
        return await createPlanningCalendar(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create planningCalendar")
        );
    }
});

// Update planningCalendar
export const editPlanningCalendar = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdatePlanningCalendarPayload },
    { rejectValue: string }
>("planning-calendar/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updatePlanningCalendar(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update planningCalendar")
        );
    }
});

// Delete planningCalendar
export const removePlanningCalendar = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("planning-calendar/delete", async (id, thunkAPI) => {
    try {
        return await deletePlanningCalendar(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete Planning Calendar")
        );
    }
});

// Slice
const planningCalendarSlice = createSlice({
    name: "purchaserequisition",
    initialState,
    reducers: {
        updatePlanningCalendarField<K extends keyof IPlanningCalendar>(
            state: IPlanningCalendarState,
            action: PayloadAction<{ key: K; value: IPlanningCalendar[K] }>
        ) {
            const { key, value } = action.payload;
            // state.purchaseRequisitonDetailsList
            state.planningCalendar[key] = value;
        },
        updatePlanningCalendarList<K extends keyof IPlanningCalendar>(
            state: IPlanningCalendarState,
            action: PayloadAction<{ key: K; value: boolean, index: number }>
        ) {

            // Destructures the values from the action payload.
            const { index, key, value } = action.payload;
            const list = [...state.filteredPlanningCalendar];

            // If the current item’s index matches the index from the payload → set isSelected: true.
            const updatedList = list.map((item, indx) => {
                if (indx === index) {
                    return { ...item, isSelected: true }
                }
                return { ...item, isSelected: false };
            })
            state.filteredPlanningCalendar = [...updatedList];
            state.selectedIndex = index;

        },
        updateCalendarDayInfo<K extends keyof ICalendarDay>(
            state: IPlanningCalendarState,
            action: PayloadAction<{ key: K; value: number, index: number }>
        ) {
            const { index, key, value } = action.payload;
            const weekData = state.filteredPlanningCalendar[state.selectedIndex].weekData;

            state.filteredPlanningCalendar[state.selectedIndex].weekData = [...weekData.map((data, idx) => {
                if (idx === index) {
                    return { ...data, [key]: value }
                }
                return data;
            })]

        },
        setPlanningCalendarValidationErrors(
            state,
            action: PayloadAction<PlanningCalendarValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        setPlanningCalendarList(
            state,
            action: PayloadAction<IPlanningCalendar[]>
        ) {
            state.planningCalendarList = action.payload;
        },
        filterPlanningCalendarByDate(
            state,
            action: PayloadAction<{ from: string; to: string }>
        ) {
            const { from, to } = action.payload;
            const fromDate = new Date(from);
            const toDate = new Date(to);

            state.filteredPlanningCalendar = state.planningCalendarList.filter(item => {
                const itemDate = new Date(item.year, new Date(`${item.month} 1, ${item.year}`).getMonth());
                return itemDate >= fromDate && itemDate <= toDate;
            });
        },
        clearFilter(state) {
            state.filteredPlanningCalendar = state.planningCalendarList;
        },
        updatePlanningCalendarRow(
            state,
            action: PayloadAction<{
                index: number;
                key: keyof IPlanningCalendar;
                value: string;
            }>
        ) {
            const { index, key, value } = action.payload;
            const row = state.planningCalendarList[index];

            if (row) {
                (row[key] as string) = value;
            }
        },
        clearPlanningCalendarValidationErrors(state) {
            state.validationErrors = null;
        },
        clearPlanningCalendarMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                planningCalendar: state.planningCalendar,
            };
        },
        clearPlanningCalendarState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedPlanningCalendar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedPlanningCalendar.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.planningCalendarList = data;
                state.loading = false;
            })
            .addCase(getPagedPlanningCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllPlanningCalendar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPlanningCalendar.fulfilled, (state, action) => {
                state.planningCalendarList = action.payload;
                state.loading = false;
            })
            .addCase(getAllPlanningCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getPlanningCalendar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPlanningCalendar.fulfilled, (state, action) => {
                state.planningCalendar = action.payload;
                state.loading = false;
            })
            .addCase(getPlanningCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addPlanningCalendar.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addPlanningCalendar.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addPlanningCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create planningCalendar";
            })
            .addCase(editPlanningCalendar.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editPlanningCalendar.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editPlanningCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removePlanningCalendar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePlanningCalendar.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removePlanningCalendar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default planningCalendarSlice.reducer;

export const {
    updatePlanningCalendarField,
    updatePlanningCalendarRow,
    setPlanningCalendarValidationErrors,
    updatePlanningCalendarList,
    setPlanningCalendarList,
    filterPlanningCalendarByDate,
    updateCalendarDayInfo,
    clearFilter,
    clearPlanningCalendarValidationErrors,
    clearPlanningCalendarMessages,
    clearPlanningCalendarState,
} = planningCalendarSlice.actions;
