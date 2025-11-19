import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreateMachinePayload, MachineValidationErrors, IMachines, IMachineState, UpdateMachinePayload, IMachineToStitchMap } from "../pages/machinesSetup/machine.interface";
import { createMachine, deleteMachine, fetchAllMachines, fetchPagedMachines, showMachine, updateMachine } from "../api/machinesSetupAPI";

const initialState: IMachineState = {
    machine: {
        type: "",
        code: "",
        name: "",
        category: "",
        brand: "",
        model: "",
        wastage: 0,
        cone: "",
        remarks: "",
        id: 0,
    },
    stitchTypes: [
        { id: 1, name: "Lockstitch (301)" },
        { id: 2, name: "Chainstitch (401)" },
        { id: 3, name: "Overlock (504)" },
        { id: 4, name: "Coverstitch (406)" },
        { id: 5, name: "Zigzag (304)" },
        { id: 6, name: "Flatlock (605)" },
        { id: 7, name: "Bar Tack (304 Modified)" },
        { id: 8, name: "Blind Stitch (103)" },
        { id: 9, name: "Buttonhole (304/401)" },
        { id: 10, name: "Button Sew (101/304)" },
        { id: 11, name: "Safety Stitch (516)" },
        { id: 12, name: "Feed-Off-The-Arm (602)" },
        { id: 13, name: "Double Needle Lockstitch (401)" },
        { id: 14, name: "Saddle Stitch (301)" },
        { id: 15, name: "Hand Stitch Decorative" }
    ],
    machines: [
        {
            type: "Sewing",
            code: "MCH-0001",
            name: "Lockstitch Sewing Machine",
            category: "Stitching",
            brand: "Juki",
            model: "DDL-8700",
            wastage: 0,
            cone: "",
            remarks: "Basic single-needle; for most operations",
            id: 1
        },
        {
            type: "Sewing",
            code: "MCH-0002",
            name: "Overlock (3-Thread)",
            category: "Stitching",
            brand: "Brother",
            model: "M343D",
            wastage: 0,
            cone: "",
            remarks: "Edge finishing on light knits",
            id: 2
        },
        {
            type: "Sewing",
            code: "MCH-0003",
            name: "Overlock (5-Thread)",
            category: "Stitching",
            brand: "Pegasus",
            model: "EXT5204",
            wastage: 0,
            cone: "",
            remarks: "Safety stitch for woven garments",
            id: 3
        },
        {
            type: "Sewing",
            code: "MCH-0004",
            name: "Flatlock",
            category: "Stitching",
            brand: "Siruba",
            model: "F007K",
            wastage: 0,
            cone: "",
            remarks: "Cover seam for activewear",
            id: 4
        },
        {
            type: "Sewing",
            code: "MCH-0005",
            name: "Buttonhole",
            category: "Attachment",
            brand: "Juki",
            model: "LBH-780",
            wastage: 0,
            cone: "",
            remarks: "Auto buttonhole for shirts",
            id: 5
        },
        {
            type: "Sewing",
            code: "MCH-0006",
            name: "Button Attach",
            category: "Attachment",
            brand: "Brother",
            model: "BAS-326H",
            wastage: 0,
            cone: "",
            remarks: "Lockstitch button sew",
            id: 6
        },
        {
            type: "Sewing",
            code: "MCH-0007",
            name: "Bar Tacking",
            category: "Reinforcement",
            brand: "Juki",
            model: "LK-1900",
            wastage: 0,
            cone: "",
            remarks: "Reinforcement at stress points",
            id: 7
        },
        {
            type: "Sewing",
            code: "MCH-0008",
            name: "Feed-Off-The-Arm",
            category: "Stitching",
            brand: "Kansai Special",
            model: "UX-1503",
            wastage: 0,
            cone: "",
            remarks: "Flat seam for jeans inseam",
            id: 8
        },
        {
            type: "Sewing",
            code: "MCH-0009",
            name: "Zigzag",
            category: "Stitching",
            brand: "Typical",
            model: "GC6178",
            wastage: 0,
            cone: "",
            remarks: "Elastic attachment operations",
            id: 9
        },
        {
            type: "Sewing",
            code: "MCH-0010",
            name: "Pattern Sewer",
            category: "Programmable",
            brand: "Brother",
            model: "KE-430F",
            wastage: 0,
            cone: "",
            remarks: "Label & patch attach",
            id: 10
        },
        {
            type: "Cutting",
            code: "MCH-0011",
            name: "Straight Knife Cutter",
            category: "Cutting",
            brand: "Eastman",
            model: "629X",
            wastage: 0,
            cone: "",
            remarks: "High lay cutting",
            id: 11
        },
        {
            type: "Cutting",
            code: "MCH-0012",
            name: "Band Knife Cutter",
            category: "Cutting",
            brand: "Oshima",
            model: "OBK-900",
            wastage: 0,
            cone: "",
            remarks: "Curved/precision parts",
            id: 12
        },
        {
            type: "Cutting",
            code: "MCH-0013",
            name: "Round Knife Cutter",
            category: "Cutting",
            brand: "KM",
            model: "RS-100",
            wastage: 0,
            cone: "",
            remarks: "Sample/small lays",
            id: 13
        },
    ],
    filteredMachine: [],
    paginationObject: createInitialPaginationObject<IMachines>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated machinesSetups
export const getPagedMachines = createAsyncThunk<
    PaginationObject<IMachines>,
    FetchParams,
    { rejectValue: string }
>("machines/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedMachines(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all currencies (non-paginated)
export const getAllMachines = createAsyncThunk<
    IMachines[],
    void,
    { rejectValue: string }
>("machines/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllMachines();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all machinesSetups")
        );
    }
});

// Fetch one currency by ID
export const getMachine = createAsyncThunk<
    IMachines,
    number,
    { rejectValue: string }
>("machines/show", async (id, thunkAPI) => {
    try {
        return await showMachine(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new machine
export const addMachine = createAsyncThunk<
    { message: string },
    CreateMachinePayload,
    { rejectValue: string }
>("machines/add", async (payload, thunkAPI) => {
    try {
        return await createMachine(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create machinesSetup")
        );
    }
});

// Update currency
export const editMachine = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateMachinePayload },
    { rejectValue: string }
>("machines/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateMachine(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update machinesSetup")
        );
    }
});

// Delete currency
export const removeMachine = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("machines/delete", async (id, thunkAPI) => {
    try {
        return await deleteMachine(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const machinesSetupSlice = createSlice({
    name: "machines",
    initialState,
    reducers: {
        updateMachineField<K extends keyof IMachines>(
            state: IMachineState,
            action: PayloadAction<{ key: K; value: IMachines[K] }>
        ) {
            const { key, value } = action.payload;
            state.machine[key] = value;
        },
        setMachineValidationErrors(
            state,
            action: PayloadAction<MachineValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearMachineValidationErrors(state) {
            state.validationErrors = null;
        },
        clearMachineMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                machinesSetup: state.machines,
            };
        },
        clearMachineState() {
            return { ...initialState };
        },
        setMachineToStitchMap: (
            state,
            action: PayloadAction<IMachineToStitchMap>
        ) => {
            state.machineStitches = action.payload;
        },

        clearMachineToStitchMap(state) {
            state.machineStitches = undefined;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedMachines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedMachines.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.machines = data;
                state.loading = false;
            })
            .addCase(getPagedMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllMachines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMachines.fulfilled, (state, action) => {
                state.machines = action.payload;
                state.loading = false;
            })
            .addCase(getAllMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getMachine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMachine.fulfilled, (state, action) => {
                state.machine = action.payload;
                state.loading = false;
            })
            .addCase(getMachine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addMachine.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addMachine.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addMachine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create machinesSetup";
            })

            .addCase(editMachine.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editMachine.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editMachine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removeMachine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeMachine.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeMachine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default machinesSetupSlice.reducer;

export const {
    updateMachineField,
    setMachineValidationErrors,
    clearMachineValidationErrors,
    clearMachineMessages,
    clearMachineState,
    setMachineToStitchMap,
    clearMachineToStitchMap,
} = machinesSetupSlice.actions;
