import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createMaterialInfo, deleteMaterialInfo, fetchAllMaterialInfo, fetchPagedMaterialInfo, fetchStockByStoreAndMaterial, showMaterialInfo, updateMaterialInfo } from "../api/materialInfo.API";
import { IMaterialGroupLedger } from '../pages/materialGroupSetup/materialgroup.interface';
import { CreateMaterialInfoPayload, IMaterial, IMaterialInfoState, MaterialInfoValidationErrors, MaterialStock, StockFilters, UpdateMaterialInfoPayload } from "../pages/materialInfo/materialinfo.interface";

const initialState: IMaterialInfoState = {
    material: {
        brands: [],
        models: [],
        origins: [],
        materialStock: [],
        materialStockCount: 0,
        filterMaterialStock: [],
        // Basic
        id: 0,
        actions: "",
        materialGroupId: 0,
        materialSubGroupId: 0,

        // materialInfoType: "",
        materialInfo: "",
        materialSubGroup: "",
        materialCode: "",
        materialDescription: "",
        materialDisplayName: "",
        uom: "",
        yarnType: "",
        yarnCount: "",
        yarnComposition: "",
        yarnQuality: "",
        blendType: "",
        remarks: "",
        category: "",
        isDyedYarn: false,
        dyedColor: "",
        isActive: false,
        suppressHitOnStock: false,
        isRoundCalculation: false,

        // Measurement
        purchaseUom: "",
        useUom: "",
        standardPrice: "",
        inventoryPrice: "",
        hsCode: "",
        serviceLabel: "",
        safetyStock: "",
        grossWeight: "",
        netWeight: "",
        areaOfUses: "",
        productionCategory: "",
        volume: "",
        length: "",
        width: "",
        height: "",
        totalStock: 0,
        isExpirable: false,
        isNonSortable: false,
        isCapitalAssets: false,
        sectionIds: [],
        storeIds: [],

        // other
        consumptionQty: 0,
        decimalPlace: 0,
        leadTime: "",
        material: "",
        rate: "",
        reorderPoint: "",
        companyId: 0,
        companies: [],

        // section
        AOP: false,
        Admin: false,
        Cutting: false,
        dyeing: false,
        dyeingBatch: false,
        embrioidery: false,
        finishing: false,
        gitFinishingPacked: false,
        gitPackedShipped: false,
        gitSewingFinishing: false,
        gmtProcess: false,
        knitting: false,
        leftOverStore: false,
        mis: false,
        packing: false,
        printEmb: false,
        printing: false,
        production: false,
        sample: false,
        sewing: false,
        smock: false,
        washing: false,
        yarnDyed: false,

    },
    materialgroupLedger: {
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
    storeContents: {
        id: 0,
        storeCode: "",
        storeName: "",
        storePrefix: "",
        address: "",
        contactPersonName: "",
        contactPersonNumber: "",
        factoryId: 0,
        storeGroupId: 0,
        remarks: "",
        isActive: false,
        actions: "",
        factoryName: "",
        storeGroupName: ""
    },
    materials: [],
    filteredMaterials: [],
    paginationObject: createInitialPaginationObject<IMaterial>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};


interface GetStockPayload {
    storeId: number;
    itemId: number;
    companyID: number;
}

export const getStockByStoreAndMaterial = createAsyncThunk<
    IMaterial,
    GetStockPayload,
    { rejectValue: string }
>(
    "material-info/getStockByStoreAndMaterial",
    async (payload, thunkAPI) => {
        try {
            const { storeId, itemId, companyID } = payload;
            return await fetchStockByStoreAndMaterial(storeId, itemId, companyID);
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch stock")
            );
        }
    }
);

// ==== Helper ====

function filterMaterialStock(
    material: IMaterial,
    filters: StockFilters
): MaterialStock[] {

    return material.materialStock.filter(
        (stock) =>
            (filters.brandId === 0 || stock.brandId === filters.brandId) &&
            (filters.originId === 0 || stock.originId === filters.originId) &&
            (filters.model === "-" || stock.model === filters.model)
    );
}

// Fetch paginated
export const getPagedMaterialInfos = createAsyncThunk<
    PaginationObject<IMaterial>,
    FetchParams,
    { rejectValue: string }
>("material-info/paged", async (params, thunkAPI) => {
    try {
        return await fetchPagedMaterialInfo(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch materials")
        );
    }
});


// Fetch all material groups (non-paginated)
export const getAllMaterialInfos = createAsyncThunk<
    IMaterial[],
    void,
    { rejectValue: string }
>("material-groups/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllMaterialInfo();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all material groups")
        );
    }
});

// Fetch one material group by ID
export const getMaterialInfo = createAsyncThunk<
    IMaterial,
    number,
    { rejectValue: string }
>("material-groups/show", async (id, thunkAPI) => {
    try {
        return await showMaterialInfo(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material")
        );
    }
});

// Create new material group
export const addMaterialInfo = createAsyncThunk<
    { message: string },
    CreateMaterialInfoPayload,
    { rejectValue: string }
>("material-groups/add", async (payload, thunkAPI) => {
    try {
        return await createMaterialInfo(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create material group")
        );
    }
});

// Update material
export const editMaterialInfo = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateMaterialInfoPayload },
    { rejectValue: string }
>("material-groups/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateMaterialInfo(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update material group")
        );
    }
});

// Delete materialgroup
export const removeMaterialInfo = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("material-groups/delete", async (id, thunkAPI) => {
    try {
        return await deleteMaterialInfo(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete material group")
        );
    }
});

// Slice
const materialInfoSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {
        // In materialInfo.Slice.ts
        updateMaterialInfoField: (state, action: PayloadAction<{ key: keyof IMaterial; value: any }>) => {
            const { key, value } = action.payload;
            if (key === "sectionIds" || key === "storeIds") {
                // value will be a number ID
                const arr = state.material[key] as number[];
                if (arr.includes(value)) {
                    state.material[key] = arr.filter(id => id !== value);
                } else {
                    state.material[key] = [...arr, value];
                }
            } else {
                (state.material[key] as any) = value;
            }
        },


        updateMaterialInfoLedgerField<K extends keyof IMaterialGroupLedger>(
            state: IMaterialInfoState,
            action: PayloadAction<{
                key: K;
                value: IMaterialGroupLedger[K];
                displayValue: string | undefined;
            }>
        ) {
            const { key, value, displayValue } = action.payload;

            if (key === "inventoryStockAccountId") {
                state.materialgroupLedger["inventoryStockAccount"] = displayValue || "";
            }
            if (key === "itemExpenseAccountId") {
                state.materialgroupLedger["itemExpenseAccount"] = displayValue || "";
            }
            if (key === "itemConvertAccountId") {
                state.materialgroupLedger["itemConvertAccount"] = displayValue || "";
            }
            if (key === "depreciationAccountId") {
                state.materialgroupLedger["depreciationAccount"] = displayValue || "";
            }
            if (key === "isFixedAsset") {
                state.materialgroupLedger["isCurrentAsset"] = !Boolean(value);
            }
            if (key === "isCurrentAsset") {
                state.materialgroupLedger["isFixedAsset"] = !Boolean(value);
                state.materialgroupLedger["depreciationPercentage"] = 0;
                state.materialgroupLedger["deprefield_2"] = 0;
            }
            if (key === "isYearlyDepreciation") {
                state.materialgroupLedger["isMonthlyDepreciation"] = !Boolean(value)
            }
            if (key === "isMonthlyDepreciation") {
                state.materialgroupLedger["isYearlyDepreciation"] = !Boolean(value)
            }
            if (key === "deprefield_1") {
                state.materialgroupLedger["deprefield_1_display"] = displayValue || "";

            }
            state.materialgroupLedger[key] = value;
        },
        setMaterialInfoValidationErrors(
            state,
            action: PayloadAction<MaterialInfoValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearMaterialInfoValidationErrors(state) {
            state.validationErrors = null;
        },
        clearMaterialInfoMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                BasicMaterial: state.material,
            };
        },
        // adding a depreciation row in table
        addDepreciationRow(
            state,
            action: PayloadAction<{ ledgerId: string; ledger: string; percentage: number }>
        ) {
            state.materialgroupLedger.depreciationRows.push(action.payload);
        },
        // removing a depreciation row from the table
        removeDepreciationRow(
            state,
            action: PayloadAction<string> // ledgerId
        ) {
            state.materialgroupLedger.depreciationRows =
                state.materialgroupLedger.depreciationRows.filter(row => row.ledgerId !== action.payload);
        },
        // clear all rows at once
        clearDepreciationRows: (state) => {
            state.materialgroupLedger.depreciationRows = [];
        },
        clearMaterialInfoState() {
            return { ...initialState };
        },
        setFilters(state, action: PayloadAction<StockFilters>) {

            if (state.material) {
                // Apply filtering logic
                const { filterBy, brandId, model, originId } = action.payload;
                const filtered = filterMaterialStock(state.material, { brandId: brandId||0, model: model||"-", originId: originId||0, filterBy });
                state.material.materialStockCount = filtered.length;
                state.material.filterMaterialStock = filtered;

                console.log("Filtered Stock:", filtered);
                
                if (filtered.length === 0) {
                    state.material.totalStock = 0;
                    return;
                }
                // Optionally: update brand/origin/model lists based on filtered stock
                // if (filterBy !== "brandId") {
                    state.material.brands = [
                        ...new Map(
                            filtered.map((s) => [s.brandId, { id: s.brandId, name: s.brandName }])
                        ).values(),
                    ];
                // }

                // if (filterBy !== "originId") {
                    state.material.origins = [
                        ...new Map(
                            filtered.map((s) => [s.originId, { id: s.originId, name: s.originName }])
                        ).values(),
                    ];
                // }

                // if (filterBy !== "model") {
                    state.material.models = [
                        ...new Map(
                            filtered.map((s) => [s.model, { id: s.model, name: s.model }])
                        ).values(),
                    ];
                // }



                if (filtered.length === 1) {
                    state.material.totalStock = filtered[0].stockQty;
                } else {
                    state.material.totalStock = 0;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedMaterialInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(getPagedMaterialInfos.fulfilled, (state, action) => {
            //     const { data, ...pagination } = action.payload;
            //     state.paginationObject = { ...pagination, data: [] };
            //     state.materials = data;
            //     state.loading = false;
            // })

            .addCase(getPagedMaterialInfos.fulfilled, (state, action) => {
                const { data, totalItems, currentPage, perPage, totalPages } = action.payload;

                state.paginationObject = {
                    currentPage,
                    perPage,
                    totalItems,
                    totalPages,
                    data: [],               // keep data separate in state.materials
                    firstPageUrl: "",       // default empty
                    from: (currentPage - 1) * perPage + 1,
                    lastPage: totalPages,
                    lastPageUrl: "",
                    links: [],
                    nextPageUrl: currentPage < totalPages ? `${currentPage + 1}` : null,
                    path: "",
                    previousPageUrl: currentPage > 1 ? `${currentPage - 1}` : null,
                    to: (currentPage - 1) * perPage + data.length,
                    total: totalItems,
                    search: state.paginationObject?.search ?? ""
                };

                // append or replace in state.materials for infinite scroll
                if (currentPage === 1) {
                    state.materials = data;
                } else {
                    state.materials = [...state.materials, ...data];
                }

                state.loading = false;
            })

            .addCase(getPagedMaterialInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllMaterialInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMaterialInfos.fulfilled, (state, action) => {
                state.materials = action.payload;
                state.loading = false;
            })
            .addCase(getAllMaterialInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getMaterialInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMaterialInfo.fulfilled, (state, action) => {
                state.material = action.payload;
                state.loading = false;
            })
            .addCase(getMaterialInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addMaterialInfo.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addMaterialInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addMaterialInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editMaterialInfo.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editMaterialInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editMaterialInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeMaterialInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeMaterialInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeMaterialInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getStockByStoreAndMaterial.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStockByStoreAndMaterial.fulfilled, (state, action) => {
                state.loading = false;
                state.material = action.payload;
            })
            .addCase(getStockByStoreAndMaterial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch stock";
            });



    },
});

export default materialInfoSlice.reducer;

export const {
    updateMaterialInfoField,
    updateMaterialInfoLedgerField,
    setMaterialInfoValidationErrors,
    clearMaterialInfoValidationErrors,
    clearMaterialInfoMessages,
    clearMaterialInfoState,
    addDepreciationRow,
    removeDepreciationRow,
    clearDepreciationRows,
    setFilters
} = materialInfoSlice.actions;
