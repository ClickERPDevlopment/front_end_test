import { createInitialPaginationObject } from "@/types/global";
import { IStyle, IStyleState } from "@/modules/garmentsProduction/types/style.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import axiosInstance from "@/api/axiosInstance";
import { IDepartment, IDepartmentState } from "../pages/departmentSetup/departmentSetup.interface";
import { IDesignation, IDesignationState } from "../pages/designationSetup/designationSetup.interface";
import { ISecUser, ISecUserState } from "../pages/secUser/secUser.interface";

export const GetAllSecUserWithModifiedName = createAsyncThunk<
    ISecUser[],
    void,
    { rejectValue: string }
>(
    "secUser/GetAllSecUserWithModifiedName",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/User/AllSecUserWithModifiedName');
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch all departments")
            );
        }
    }
);

const initialState: ISecUserState = {
    user: {
        ID: 0,
        NAME: "",
        USERNAME: "",
        DESIGNATION: "",
        EMP_CODE: "",
        MOBILENO: "",
    },
    users: [],
    filteredUsers: [],
    paginationObject: createInitialPaginationObject<ISecUser>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

const secUserSlice = createSlice({
    name: "secUser",
    initialState,
    reducers: {
        clearStyleState: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllSecUserWithModifiedName.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(GetAllSecUserWithModifiedName.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(GetAllSecUserWithModifiedName.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload || "Failed to fetch styles";
            });
    },
});

export default secUserSlice.reducer;
export const { clearStyleState } = secUserSlice.actions;
