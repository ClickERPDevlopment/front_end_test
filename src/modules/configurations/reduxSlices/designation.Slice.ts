import { createInitialPaginationObject } from "@/types/global";
import { IStyle, IStyleState } from "@/modules/garmentsProduction/types/style.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import axiosInstance from "@/api/axiosInstance";
import { IDepartment, IDepartmentState } from "../pages/departmentSetup/departmentSetup.interface";
import { IDesignation, IDesignationState } from "../pages/designationSetup/designationSetup.interface";

export const GetAllDesignation = createAsyncThunk<
    IDesignation[],
    void,
    { rejectValue: string }
>(
    "department/Designation",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/Designation');
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch all departments")
            );
        }
    }
);

const initialState: IDesignationState = {
    designation: {
        DesignationId: 0,
        DesignationName: "",
        UnitId: 0,
        Grade: "",
        Remarks: "",
        DesignationGroupId: 0,
        PositionPriority: "",
        HolidayAllow: 0,
        ApprAttdBonus: 0,
        BangDesignationName: "",
        BangGrade: "",
    },
    designations: [],
    filteredDesignations: [],
    paginationObject: createInitialPaginationObject<IDesignation>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

const designationSlice = createSlice({
    name: "style",
    initialState,
    reducers: {
        clearStyleState: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllDesignation.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(GetAllDesignation.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.designations = action.payload;
            })
            .addCase(GetAllDesignation.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload || "Failed to fetch styles";
            });
    },
});

export default designationSlice.reducer;
export const { clearStyleState } = designationSlice.actions;
