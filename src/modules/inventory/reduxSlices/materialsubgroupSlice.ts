import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { createMaterialSubGroup, deleteMaterialSubGroup, fetchAllMaterialSubGroups, fetchPagedMaterialSubGroups, showMaterialSubGroup, updateMaterialSubGroup, } from "../api/materialsubgroupAPI";
import { CreateMaterialSubGroupPayload, IMaterialSubGroup, IMaterialSubGroupLedger, IMaterialSubGroupState, MaterialSubGroupValidationErrors, UpdateMaterialSubGroupPayload } from "../pages/materialSubGroupSetup/materialsubgroup.interface"

const initialState: IMaterialSubGroupState = {
    materialSubGroup: {
        id: 0,
        type: "",
        code: "",
        companyId: 0,
        materialGroupId: 0,
        name: "",
        remarks: "",
        category: "",
        uom: "",
        sectionId: 0
    },
    materialSubGroupLedger: {
        id: 0,
        companyId: 0,
        companyName: "",
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
    materialSubGroups: [
        {
            id: 1,
            type: "RawMaterial",
            code: "RM-001",
            companyId: 101,
            materialGroupId: 1,
            name: "Steel Rod",
            remarks: "High quality, imported",
            category: "Construction",
            uom: "Kg",
            sectionId: 12
        },
        {
            id: 2,
            type: "FinishedGood",
            code: "FG-002",
            companyId: 102,
            materialGroupId: 2,
            name: "Plastic Chair",
            remarks: "Stackable design",
            category: "Furniture",
            uom: "Piece",
            sectionId: 8
        },
        {
            id: 3,
            type: "SparePart",
            code: "SP-003",
            companyId: 103,
            materialGroupId: 3,
            name: "Gear Wheel",
            remarks: "For heavy machinery",
            category: "Mechanical",
            uom: "Unit",
            sectionId: 15
        },
        {
            id: 4,
            type: "Chemical",
            code: "CH-004",
            companyId: 104,
            materialGroupId: 4,
            name: "Sulfuric Acid",
            remarks: "Handle with care",
            category: "Industrial",
            uom: "Liter",
            sectionId: 20
        },
        {
            id: 5,
            type: "Consumable",
            code: "CS-005",
            companyId: 105,
            materialGroupId: 5,
            name: "Printer Ink",
            remarks: "Black cartridge",
            category: "Office",
            uom: "Bottle",
            sectionId: 5
        }
    ],
    filteredMaterialSubGroups: [],
    paginationObject: createInitialPaginationObject<IMaterialSubGroup>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated 
export const getPagedMaterialSubGroups = createAsyncThunk<
    PaginationObject<IMaterialSubGroup>,
    FetchParams,
    { rejectValue: string }
>("material-subgroup/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedMaterialSubGroups(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material subgroup")
        );
    }
});

// Fetch all (non-paginated)
export const getAllMaterialSubGroups = createAsyncThunk<
    IMaterialSubGroup[],
    void,
    { rejectValue: string }
>("material-subgroup/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllMaterialSubGroups();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all material subgroup")
        );
    }
});

// Fetch one by ID
export const getMaterialSubGroup = createAsyncThunk<
    IMaterialSubGroup,
    number,
    { rejectValue: string }
>("material-subgroup/show", async (id, thunkAPI) => {
    try {
        return await showMaterialSubGroup(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material subgroup")
        );
    }
});

// Create new
export const addMaterialSubGroup = createAsyncThunk<
    { message: string },
    CreateMaterialSubGroupPayload,
    { rejectValue: string }
>("material-subgroup/add", async (payload, thunkAPI) => {
    try {
        return await createMaterialSubGroup(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create material subgroup")
        );
    }
});

// Update 
export const editMaterialSubGroup = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateMaterialSubGroupPayload },
    { rejectValue: string }
>("material-subgroup/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateMaterialSubGroup(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update material subgroup")
        );
    }
});

// Delete 
export const removeMaterialSubGroup = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("material-subgroup/delete", async (id, thunkAPI) => {
    try {
        return await deleteMaterialSubGroup(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete material subgroup")
        );
    }
});

// Slice
const MaterialSubGroupSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {
        updateMaterialSubGroupField<K extends keyof IMaterialSubGroup>(
            state: IMaterialSubGroupState,
            action: PayloadAction<{ key: K; value: IMaterialSubGroup[K] }>
        ) {
            const { key, value } = action.payload;
            state.materialSubGroup[key] = value;
        },
        updateMaterialSubGroupLedgerField<K extends keyof IMaterialSubGroupLedger>(
            state: IMaterialSubGroupState,
            action: PayloadAction<{
                key: K;
                value: IMaterialSubGroupLedger[K];
                displayValue: string | undefined;
            }>
        ) {
            const { key, value, displayValue } = action.payload;

            if (key === "inventoryStockAccountId") {
                state.materialSubGroupLedger["inventoryStockAccount"] = displayValue || "";
            }
            if (key === "itemExpenseAccountId") {
                state.materialSubGroupLedger["itemExpenseAccount"] = displayValue || "";
            }
            if (key === "itemConvertAccountId") {
                state.materialSubGroupLedger["itemConvertAccount"] = displayValue || "";
            }
            if (key === "depreciationAccountId") {
                state.materialSubGroupLedger["depreciationAccount"] = displayValue || "";
            }
            if (key === "isFixedAsset") {
                state.materialSubGroupLedger["isCurrentAsset"] = !Boolean(value);
            }
            if (key === "isCurrentAsset") {
                state.materialSubGroupLedger["isFixedAsset"] = !Boolean(value);
                state.materialSubGroupLedger["depreciationPercentage"] = 0;
                state.materialSubGroupLedger["deprefield_2"] = 0;
            }
            if (key === "isYearlyDepreciation") {
                state.materialSubGroupLedger["isMonthlyDepreciation"] = !Boolean(value)
            }
            if (key === "isMonthlyDepreciation") {
                state.materialSubGroupLedger["isYearlyDepreciation"] = !Boolean(value)
            }
            if (key === "deprefield_1") {
                state.materialSubGroupLedger["deprefield_1_display"] = displayValue || "";

            }
            state.materialSubGroupLedger[key] = value;
        },
        setMaterialSubGroupValidationErrors(
            state,
            action: PayloadAction<MaterialSubGroupValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearMaterialSubGroupValidationErrors(state) {
            state.validationErrors = null;
        },
        clearMaterialSubGroupMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.materialSubGroup,
            };
        },
        // adding a depreciation row in table
        addDepreciationRow(
            state,
            action: PayloadAction<{ ledgerId: string; ledger: string; percentage: number }>
        ) {
            state.materialSubGroupLedger.depreciationRows.push(action.payload);
        },
        // removing a depreciation row from the table
        removeDepreciationRow(
            state,
            action: PayloadAction<string> // ledgerId
        ) {
            state.materialSubGroupLedger.depreciationRows =
                state.materialSubGroupLedger.depreciationRows.filter(row => row.ledgerId !== action.payload);
        },
        // clear all rows at once
        clearDepreciationRows: (state) => {
            state.materialSubGroupLedger.depreciationRows = [];
        },
        clearMaterialSubGroupState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedMaterialSubGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedMaterialSubGroups.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.materialSubGroups = data;
                state.loading = false;
            })
            .addCase(getPagedMaterialSubGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllMaterialSubGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMaterialSubGroups.fulfilled, (state, action) => {
                state.materialSubGroups = action.payload;
                state.loading = false;
            })
            .addCase(getAllMaterialSubGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getMaterialSubGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMaterialSubGroup.fulfilled, (state, action) => {
                state.materialSubGroup = action.payload;
                state.loading = false;
            })
            .addCase(getMaterialSubGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addMaterialSubGroup.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addMaterialSubGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addMaterialSubGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editMaterialSubGroup.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editMaterialSubGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editMaterialSubGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeMaterialSubGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeMaterialSubGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeMaterialSubGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default MaterialSubGroupSlice.reducer;

export const {
    updateMaterialSubGroupField,
    updateMaterialSubGroupLedgerField,
    setMaterialSubGroupValidationErrors,
    clearMaterialSubGroupValidationErrors,
    clearMaterialSubGroupMessages,
    clearMaterialSubGroupState,
    addDepreciationRow,
    removeDepreciationRow,
    clearDepreciationRows,
} = MaterialSubGroupSlice.actions;
