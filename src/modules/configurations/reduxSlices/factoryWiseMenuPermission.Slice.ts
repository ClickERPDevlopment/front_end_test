import { createInitialPaginationObject, FetchParams, PaginationObject, } from "@/types/global";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { deleteFactoryWiseMenuPermission, fetchAllFactoryWiseMenuPermissions, fetchFactoryWiseMenuPermissionSummary, fetchPagedFactoryWiseMenuPermissions, showFactoryWiseMenuPermission, updateFactoryWiseMenuPermission, } from "../api/factoryWiseMenuPermission.API";
import { CreateFactoryWiseMenuPermissionPayload, IFactoryWiseMenuPermission, IFactoryWiseMenuPermissionState, FactoryWiseMenuPermissionValidationErrors, UpdateFactoryWiseMenuPermissionPayload } from "../pages/factoryWiseMenuPermission/factoryWiseMenuPermission.interface";
import { MenuItem } from "../types/menu.interface";
import axiosInstance from "@/api/axiosInstance";
import { map } from 'zod';

const initialState: IFactoryWiseMenuPermissionState = {
    factoryWiseMenuPermission: {
        id: 0,
        companyId: 0,
        companyName: "",
        companyUnitType: "",
        moduleId: 0,
        moduleName: "",
        parentMenuId: 0,
        parentMenuName: "",
        menuId: 0,
        menuName: "",
        createdBy: "",
        updatedBy: "",
        noOfModule: 0,
        noOfMenu: 0
    },
    factoryWiseMenuPermissions: [

    ],
    moduleMenusFromFlat: [],
    paginationObject: createInitialPaginationObject<IFactoryWiseMenuPermission>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};


export type saveDto = {
    ID: number,
    COMPANY_ID: number,
    COMPANY_TYPE_ID: number,
    MODULE_ID: number,
    MAIN_MENU_ID: number,
    MENU_ID: number,
    IS_ACTIVE_STATUS: boolean
}

// fetchCompanyById thunk
export const getCompanyById = createAsyncThunk<
    { companyName: string; unitType: string },
    number,
    { rejectValue: string }
>(
    "factory-wise-menu-permission/company",
    async (companyId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/Company/${companyId}`);
            const data = response.data;

            return {
                companyName: data?.name || "",
                unitType: data?.unitType || "",
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch company details")
            );
        }
    }
);


export const saveFactoryWiseMenuPermission = createAsyncThunk(
    "factoryWiseMenuPermission/saveFactoryWiseMenuPermission",
    async (
        { companyId, combinedData }: { companyId: number; combinedData: any },
        { rejectWithValue }
    ) => {
        try {

            const data = combinedData.map((ele: any) => ({
                ID: 0,
                COMPANY_ID: ele.companyId,
                COMPANY_TYPE_ID: 0,
                MODULE_ID: ele.moduleId,
                MAIN_MENU_ID: ele.menuId,
                MENU_ID: ele.menuId,
                IS_ACTIVE_STATUS: ele.isActive
            }))



            console.log('saved data', data);
            const response = await axiosInstance.post(
                `/${companyId}/FactoryWiseMenuPermission`,
                data
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);




// export const getFactoryWiseMenuPermissionSummary = createAsyncThunk<
//     IFactoryWiseMenuPermission[],
//     number, // companyId
//     { rejectValue: string }
// >("factory-wise-menu-permission/summary", async (companyId, thunkAPI) => {
//     try {
//         return await fetchFactoryWiseMenuPermissionSummary(companyId);
//     } catch (err) {
//         return thunkAPI.rejectWithValue(
//             handleThunkError(err, "Failed to fetch summary data")
//         );
//     }
// });


export const getFactoryWiseMenuPermissionSummary = createAsyncThunk<
    { factoryWiseMenuPermissions: IFactoryWiseMenuPermission[]; companyId: number },
    number, // companyId
    { rejectValue: string }
>(
    "factory-wise-menu-permission/summary",
    async (companyId, thunkAPI) => {
        try {
            const response = await fetchFactoryWiseMenuPermissionSummary(companyId);

            // Map API response to IFactoryWiseMenuPermission
            const mappedData: IFactoryWiseMenuPermission[] = response.map((item: any, index: number) => ({
                id: index + 1,
                companyId: item.COMPANY_ID,
                companyName: item.FACTORY_NAME,
                companyUnitType: "",
                moduleId: 0,
                moduleName: "",
                parentMenuId: 0,
                parentMenuName: "",
                menuId: 0,
                menuName: "",
                createdBy: item.CREATED_BY ?? "",
                updatedBy: item.UPDATE_BY ?? "",
                noOfModule: item.NO_OF_MODULE,
                noOfMenu: item.NO_OF_MENU,
                isFactoryChecked: false,
                isModuleChecked: false,
                actions: ""
            }));

            return { factoryWiseMenuPermissions: mappedData, companyId };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch summary data")
            );
        }
    }
);






// Fetch paginated
export const getPagedFactoryWiseMenuPermissions = createAsyncThunk<
    PaginationObject<IFactoryWiseMenuPermission>,
    FetchParams,
    { rejectValue: string }
>("factory-wise-menu-permission/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedFactoryWiseMenuPermissions(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch materials")
        );
    }
});

// Fetch all material groups (non-paginated)
export const getAllFactoryWiseMenuPermissions = createAsyncThunk<
    IFactoryWiseMenuPermission[],
    void,
    { rejectValue: string }
>("factory-wise-menu-permission/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllFactoryWiseMenuPermissions();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all material groups")
        );
    }
});

// Fetch one material group by ID
export const getFactoryWiseMenuPermission = createAsyncThunk<
    IFactoryWiseMenuPermission,
    number,
    { rejectValue: string }
>("factory-wise-menu-permission/show", async (id, thunkAPI) => {
    try {
        return await showFactoryWiseMenuPermission(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch material")
        );
    }
});


// Update material
export const editFactoryWiseMenuPermission = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateFactoryWiseMenuPermissionPayload },
    { rejectValue: string }
>("factory-wise-menu-permission/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateFactoryWiseMenuPermission(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update material group")
        );
    }
});

// Delete materialgroup
export const removeFactoryWiseMenuPermission = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("factory-wise-menu-permission/delete", async (id, thunkAPI) => {
    try {
        return await deleteFactoryWiseMenuPermission(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete material group")
        );
    }
});



// Slice
const factoryWiseMenuPermissionSlice = createSlice({
    name: "factoryWiseMenuPermissions",
    initialState,
    reducers: {
        addFactoryRow(state, action: PayloadAction<IFactoryWiseMenuPermission>) {
            state.factoryWiseMenuPermissions.push(action.payload);
        },
        toggleFactoryChecked(state, action: PayloadAction<number>) {
            const row = state.factoryWiseMenuPermissions.find(r => r.id === action.payload);
            if (row) {
                row.isFactoryChecked = !row.isFactoryChecked; // toggle the boolean
            }
        },
        setModuleMenusFromFlat(state, action: PayloadAction<IFactoryWiseMenuPermission[]>) {
            state.moduleMenusFromFlat = action.payload.map(item => ({
                ...item,
                isModuleChecked: item.isModuleChecked ?? false,
                companyId: 0,
                companyName: '',
                companyUnitType: '',
            }));
        },
        setFactoryWiseMenuPermissionValidationErrors(
            state,
            action: PayloadAction<FactoryWiseMenuPermissionValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearFactoryWiseMenuPermissionValidationErrors(state) {
            state.validationErrors = null;
        },
        clearFactoryWiseMenuPermissionMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
            };
        },
        clearFactoryWiseMenuPermissionState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedFactoryWiseMenuPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedFactoryWiseMenuPermissions.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.factoryWiseMenuPermissions = data;
                state.loading = false;
            })
            .addCase(getPagedFactoryWiseMenuPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllFactoryWiseMenuPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFactoryWiseMenuPermissions.fulfilled, (state, action) => {
                state.factoryWiseMenuPermissions = action.payload;
                state.loading = false;
            })
            .addCase(getAllFactoryWiseMenuPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getFactoryWiseMenuPermission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFactoryWiseMenuPermission.fulfilled, (state, action) => {
                state.factoryWiseMenuPermission = action.payload;
                state.loading = false;
            })
            .addCase(getFactoryWiseMenuPermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(saveFactoryWiseMenuPermission.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveFactoryWiseMenuPermission.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Data saved successfully:", action.payload);
            })
            .addCase(saveFactoryWiseMenuPermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editFactoryWiseMenuPermission.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editFactoryWiseMenuPermission.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editFactoryWiseMenuPermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeFactoryWiseMenuPermission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFactoryWiseMenuPermission.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeFactoryWiseMenuPermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getFactoryWiseMenuPermissionSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(getFactoryWiseMenuPermissionSummary.fulfilled, (state, action) => {
            //     state.factoryWiseMenuPermissions = action.payload;
            //     state.loading = false;
            // })
            .addCase(getFactoryWiseMenuPermissionSummary.fulfilled, (state, action) => {
                state.factoryWiseMenuPermissions = action.payload.factoryWiseMenuPermissions;
                state.loading = false;
            })

            .addCase(getFactoryWiseMenuPermissionSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getCompanyById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompanyById.fulfilled, (state, action) => {
                state.loading = false;
                state.factoryWiseMenuPermission.companyName = action.payload.companyName;
                state.factoryWiseMenuPermission.companyUnitType = action.payload.unitType;
            })
            .addCase(getCompanyById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default factoryWiseMenuPermissionSlice.reducer;

export const {
    addFactoryRow,
    toggleFactoryChecked,
    setModuleMenusFromFlat,
    setFactoryWiseMenuPermissionValidationErrors,
    clearFactoryWiseMenuPermissionValidationErrors,
    clearFactoryWiseMenuPermissionMessages,
    clearFactoryWiseMenuPermissionState,
} = factoryWiseMenuPermissionSlice.actions;