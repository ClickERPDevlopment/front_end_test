import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { CreateMaterialGroupPayload, IMaterialGroup, IMaterialGroupLedger, IMaterialGroupState, MaterialGroupValidationErrors, UpdateMaterialGroupPayload } from "../pages/materialGroupSetup/materialgroup.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createMaterialGroup, deleteMaterialGroup, fetchAllMaterialGroups, fetchPagedMaterialGroups, showMaterialGroup, updateMaterialGroup, } from "../api/materialgroupAPI";

const initialState: IMaterialGroupState = {
    materialGroup: {
        id: 0,
        type: "",
        code: "",
        name: "",
        remarks: "",
        category: "",
        uom: "",
        uomId: 0,
    },
    materialGroupLedger: {
        id: 0,
        company: "",
        isCurrentAsset: true,
        isFixedAsset: false,
        inventoryStockAccountId: 0,
        inventoryStockAccount: "",
        itemExpenseAccount: "",
        itemExpenseAccountId: 0,
        itemConvertAccount: "",
        itemConvertAccountId: 0,
        depreciationAccount: "",
        depreciationAccountId: 0,
        isYearlyDepreciation: false,
        isMonthlyDepreciation: false,
        depreciationPercentage: 0,
        deprefield_1: "",
        deprefield_1_display: "",
        deprefield_2: 0,
        depreciationRows: []
    },
    materialGroups: [
        {
            id: 1,
            type: "RawMaterial",
            code: "RM-001",
            name: "Aluminum Sheet",
            remarks: "Lightweight and durable",
            category: "Construction",
            uom: "Kg",
            uomId: 1,
        },
        {
            id: 2,
            type: "FinishedGood",
            code: "FG-002",
            name: "Office Desk",
            remarks: "Wooden with metal legs",
            category: "Furniture",
            uom: "Piece",
            uomId: 2,
        },
        {
            id: 3,
            type: "SparePart",
            code: "SP-003",
            name: "Hydraulic Pump",
            remarks: "For industrial use",
            category: "Mechanical",
            uom: "Unit",
            uomId: 3,
        },
        {
            id: 4,
            type: "Chemical",
            code: "CH-004",
            name: "Acetone",
            remarks: "Flammable liquid",
            category: "Industrial",
            uom: "Liter",
            uomId: 4,
        },
        {
            id: 5,
            type: "Consumable",
            code: "CS-005",
            name: "A4 Paper Pack",
            remarks: "500 sheets per pack",
            category: "Office",
            uom: "Pack",
            uomId: 5,
        }
    ],
    filteredMaterialGroups: [],
    paginationObject: createInitialPaginationObject<IMaterialGroup>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated
export const getPagedMaterialGroups = createAsyncThunk<
    PaginationObject<IMaterialGroup>,
    FetchParams,
    { rejectValue: string }
>("material-groups/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedMaterialGroups(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch materials")
        );
    }
});

// Fetch all material groups (non-paginated)
export const getAllMaterialGroups = createAsyncThunk<
    IMaterialGroup[],
    void,
    { rejectValue: string }
>("material-groups/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllMaterialGroups();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all material groups")
        );
    }
});

// Fetch one material group by ID
export const getMaterialGroup = createAsyncThunk<
    IMaterialGroup,
    number,
    { rejectValue: string }
>("material-groups/show", async (id, thunkAPI) => {
    try {
        return await showMaterialGroup(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material")
        );
    }
});

// Create new material group
export const addMaterialGroup = createAsyncThunk<
    { message: string },
    CreateMaterialGroupPayload,
    { rejectValue: string }
>("material-groups/add", async (payload, thunkAPI) => {
    try {
        return await createMaterialGroup(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create material group")
        );
    }
});

// Update material
export const editMaterialGroup = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateMaterialGroupPayload },
    { rejectValue: string }
>("material-groups/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateMaterialGroup(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update material group")
        );
    }
});

// Delete materialgroup
export const removeMaterialGroup = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("material-groups/delete", async (id, thunkAPI) => {
    try {
        return await deleteMaterialGroup(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete material group")
        );
    }
});

// Slice
const materialgroupSlice = createSlice({
    name: "materialGroups",
    initialState,
    reducers: {
        updateMaterialGroupField<K extends keyof IMaterialGroup>(
            state: IMaterialGroupState,
            action: PayloadAction<{ key: K; value: IMaterialGroup[K] }>
        ) {
            const { key, value } = action.payload;
            state.materialGroup[key] = value;
        },
        updateMaterialGroupLedgerField<K extends keyof IMaterialGroupLedger>(
            state: IMaterialGroupState,
            action: PayloadAction<{
                key: K;
                value: IMaterialGroupLedger[K];
                displayValue: string | undefined;
            }>
        ) {
            const { key, value, displayValue } = action.payload;

            if (key === "inventoryStockAccountId") {
                state.materialGroupLedger["inventoryStockAccount"] = displayValue || "";
            }
            if (key === "itemExpenseAccountId") {
                state.materialGroupLedger["itemExpenseAccount"] = displayValue || "";
            }
            if (key === "itemConvertAccountId") {
                state.materialGroupLedger["itemConvertAccount"] = displayValue || "";
            }
            if (key === "depreciationAccountId") {
                state.materialGroupLedger["depreciationAccount"] = displayValue || "";
            }
            if (key === "isFixedAsset") {
                state.materialGroupLedger["isCurrentAsset"] = !Boolean(value);
            }
            if (key === "isCurrentAsset") {
                state.materialGroupLedger["isFixedAsset"] = !Boolean(value);
                state.materialGroupLedger["depreciationPercentage"] = 0;
                state.materialGroupLedger["deprefield_2"] = 0;
            }
            if (key === "isYearlyDepreciation") {
                state.materialGroupLedger["isMonthlyDepreciation"] = !Boolean(value)
            }
            if (key === "isMonthlyDepreciation") {
                state.materialGroupLedger["isYearlyDepreciation"] = !Boolean(value)
            }
            if (key === "deprefield_1") {
                state.materialGroupLedger["deprefield_1_display"] = displayValue || "";

            }
            state.materialGroupLedger[key] = value;
        },
        setMaterialGroupValidationErrors(
            state,
            action: PayloadAction<MaterialGroupValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearMaterialGroupValidationErrors(state) {
            state.validationErrors = null;
        },
        clearMaterialGroupMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.materialGroup,
            };
        },
        // adding a depreciation row in table
        addDepreciationRow(
            state,
            action: PayloadAction<{ ledgerId: string; ledger: string; percentage: number }>
        ) {
            state.materialGroupLedger.depreciationRows.push(action.payload);
        },
        // removing a depreciation row from the table
        removeDepreciationRow(
            state,
            action: PayloadAction<string> // ledgerId
        ) {
            state.materialGroupLedger.depreciationRows =
                state.materialGroupLedger.depreciationRows.filter(row => row.ledgerId !== action.payload);
        },
        // clear all rows at once
        clearDepreciationRows: (state) => {
            state.materialGroupLedger.depreciationRows = [];
        },
        clearMaterialGroupState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedMaterialGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedMaterialGroups.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.materialGroups = data;
                state.loading = false;
            })
            .addCase(getPagedMaterialGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllMaterialGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMaterialGroups.fulfilled, (state, action) => {
                state.materialGroups = action.payload;
                state.loading = false;
            })
            .addCase(getAllMaterialGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getMaterialGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMaterialGroup.fulfilled, (state, action) => {
                state.materialGroup = action.payload;
                state.loading = false;
            })
            .addCase(getMaterialGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addMaterialGroup.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addMaterialGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addMaterialGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editMaterialGroup.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editMaterialGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editMaterialGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeMaterialGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeMaterialGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeMaterialGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default materialgroupSlice.reducer;

export const {
    updateMaterialGroupField,
    updateMaterialGroupLedgerField,
    setMaterialGroupValidationErrors,
    clearMaterialGroupValidationErrors,
    clearMaterialGroupMessages,
    clearMaterialGroupState,
    addDepreciationRow,
    removeDepreciationRow,
    clearDepreciationRows,
} = materialgroupSlice.actions;
