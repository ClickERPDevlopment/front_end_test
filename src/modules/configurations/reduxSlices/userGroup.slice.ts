import axiosInstance from "@/api/axiosInstance";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { formatDate } from "@/utils/dateUtil";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserGroupSetupDetail, IUserGroupSetupMaster, IUserGroupSetupState } from "../pages/userGroupSetup/userGroupSetup.interface";

const initialState: IUserGroupSetupState = {
    masterInfo: {
        Id: 0,
        GroupName: "",
        CreateBy: "",
        CreateDate: undefined,
        UpdateBy: "",
        UpdateDate: undefined,
        Details: []
    },
    detailsInfo: {
        Id: 0,
        MasterId: 0,
        UserId: 0,
        UserName: "",
        Designation: "",
        EmpCode: "",
        DepartmentName: ""
    },
    userGroupList: [],
    userList: [],
    paginationObject: createInitialPaginationObject(),
    loading: false,
    error: null,
    status: "idle",
    message: null
};


export const getUserGroupsetupUserList = createAsyncThunk<
    IUserGroupSetupDetail[],
    void,
    { rejectValue: string }>(
        "userGroupSlice/getUserList", async (_, thunkAPI) => {
            try {
                const res = await axiosInstance.get('/UserGroupSetup/userList');
                return res.data;
            } catch (err) {
                return thunkAPI.rejectWithValue("Failed to fetch user list");
            }
        }
    )


export const getUserGroupList = createAsyncThunk<
    IUserGroupSetupMaster[],
    void,
    { rejectValue: string }>(
        "userGroupSlice/getUserGroupList", async (_, thunkAPI) => {
            try {
                const res = await axiosInstance.get('/UserGroupSetup');
                return res.data;
            } catch (err) {
                return thunkAPI.rejectWithValue("Failed to fetch user group list");
            }
        }
    )

export const getSingleUserGroup = createAsyncThunk<
    IUserGroupSetupMaster,
    number,
    { rejectValue: string }
>(
    "userGroupSlice/getSingleUserGroup",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/UserGroupSetup/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch user group");
        }
    }
)

export const getUserGroupUserInfo = createAsyncThunk<
    IUserGroupSetupDetail[],
    { userId?: number; department?: string; designation?: string },
    { rejectValue: string }
>(
    "userGroupSlice/getUserGroupUserInfo",
    async ({ userId, department, designation }, thunkAPI) => {
        try {

            const query = new URLSearchParams();

            if (userId) query.append("userId", userId.toString());
            if (department) query.append("department", department);
            if (designation) query.append("designation", designation);

            const res = await axiosInstance.get(`/UserGroupSetup/SearchUserInfo?${query.toString()}`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch user info");
        }
    }
)

export const getUserGroupSingleUserInfo = createAsyncThunk<
    IUserGroupSetupDetail[],
    { userId?: number; department?: string; designation?: string },
    { rejectValue: string }
>(
    "userGroupSlice/getUserGroupSingleUserInfo",
    async ({ userId, department, designation }, thunkAPI) => {
        try {

            const query = new URLSearchParams();

            if (userId) query.append("userId", userId.toString());
            if (department) query.append("department", department);
            if (designation) query.append("designation", designation);

            const res = await axiosInstance.get(`/UserGroupSetup/SearchUserInfo?${query.toString()}`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch user info");
        }
    }
)

export const createUserGroupSetup = createAsyncThunk<
    { message: string },
    IUserGroupSetupMaster,
    { rejectValue: string }
>(
    "userGroupSlice/create",
    async (payload, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/UserGroupSetup", payload);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to create user group setup")
            );
        }
    }
);

export const updateUserGroupSetup = createAsyncThunk<
    { message: string },
    IUserGroupSetupMaster,
    { rejectValue: string }
>(
    "userGroupSlice/update",
    async (payload, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/UserGroupSetup/${payload.Id}`, payload);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to update user group setup")
            );
        }
    }
);


export const deleteUserGroupSetup = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>(
    "userGroupSlice/delete",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/UserGroupSetup/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to delete user group setup")
            );
        }
    }
);


const userGroupSlice = createSlice({
    name: "userGroupSlice",
    initialState,
    reducers: {

        updateUserGroupField<K extends keyof IUserGroupSetupMaster>(
            state: IUserGroupSetupState,
            action: PayloadAction<{ key: K; value: IUserGroupSetupMaster[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;
            state.masterInfo[key] = value;

            if (key === "GroupName" && displayVal) {
                state.masterInfo.GroupName = displayVal;
            }
        },

        removeUserGroupDetailRow(state: IUserGroupSetupState, action: PayloadAction<number>) {
            if (!state.masterInfo.Details) return;
            state.masterInfo.Details = state.masterInfo.Details.filter((_, i) => i !== action.payload);
        },


        clearUserGroupDetails(state) {
            state.masterInfo.Details = [];
            // state.saleInfo.editingDetailIndex = undefined;
        },

        clearUserGroupState() {
            return { ...initialState };
        },

        // setInventorySaleValidationErrors(
        //     state,
        //     action: PayloadAction<InventorySaleValidationErrors | null>
        // ) {
        //     state.validationErrors = action.payload;
        // },
    },

    extraReducers: (builder) => {
        //get list
        builder.addCase(getUserGroupsetupUserList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserGroupsetupUserList.fulfilled, (state, action) => {
            state.userList = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserGroupsetupUserList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })


        //get list
        builder.addCase(getUserGroupList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserGroupList.fulfilled, (state, action) => {
            state.userGroupList = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserGroupList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //get single user group
        builder.addCase(getSingleUserGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getSingleUserGroup.fulfilled, (state, action) => {
            state.masterInfo = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getSingleUserGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //get user info
        builder.addCase(getUserGroupUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(getUserGroupUserInfo.fulfilled, (state, action) => {
            state.masterInfo.Details = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserGroupUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //add single user
        builder.addCase(getUserGroupSingleUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(getUserGroupSingleUserInfo.fulfilled, (state, action) => {
            const user = action.payload[0];

            if (!state.masterInfo.Details) {
                state.masterInfo.Details = [];
            }

            const exists = state.masterInfo.Details.some(
                (d) => d.UserId === user.UserId
            );

            if (!exists) {
                state.masterInfo.Details.push(user);
            }

            state.loading = false;
            state.status = "succeeded";
        });


        builder.addCase(getUserGroupSingleUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default userGroupSlice.reducer;

export const {
    updateUserGroupField,
    removeUserGroupDetailRow,
    clearUserGroupState,
} = userGroupSlice.actions;