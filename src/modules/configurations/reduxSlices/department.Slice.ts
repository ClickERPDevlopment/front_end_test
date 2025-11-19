import { createInitialPaginationObject } from "@/types/global";
import { IStyle, IStyleState } from "@/modules/garmentsProduction/types/style.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import axiosInstance from "@/api/axiosInstance";
import { IDepartment, IDepartmentState } from "../pages/departmentSetup/departmentSetup.interface";

export const GetAllUserGroupSetupDepartment = createAsyncThunk<
    IDepartment[],
    void,
    { rejectValue: string }
>(
    "department/GetAllUserGroupSetupDepartment",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/UserGroupSetup/SearchDepartmentInfo');
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch all departments")
            );
        }
    }
);

const initialState: IDepartmentState = {
    department: {
        DepartmentId: 0,
        DepartmentName: "",
        UnitId: 0,
        ShortName: "",
        Remarks: "",
        ShowPriority: "",
        BangDeptName: "",
        IsActive: "",
        CreatedBy: "",
        CreatedDate: "",
        UpdatedBy: "",
        UpdatedDate: "",
        IsDefault: ""
    },
    departments: [],
    filteredDepartments: [],
    paginationObject: createInitialPaginationObject<IDepartment>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

const departmentSlice = createSlice({
    name: "style",
    initialState,
    reducers: {
        clearStyleState: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllUserGroupSetupDepartment.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(GetAllUserGroupSetupDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.departments = action.payload;
            })
            .addCase(GetAllUserGroupSetupDepartment.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload || "Failed to fetch styles";
            });
    },
});

export default departmentSlice.reducer;
export const { clearStyleState } = departmentSlice.actions;
