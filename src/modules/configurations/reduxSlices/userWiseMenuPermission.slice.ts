import axiosInstance from "@/api/axiosInstance";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { formatDate } from "@/utils/dateUtil";
import { handleThunkError } from "@/utils/handleThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserGroupSetupDetail, IUserGroupSetupMaster, IUserGroupSetupState } from "../pages/userGroupSetup/userGroupSetup.interface";
import { ICreateUserWiseMenuPermissionPayload, IUserWiseMenuPermission, IUserWiseMenuPermissionList, IUserWiseMenuPermissionMenuItems, IUserWiseMenuPermissionMenusList, IUserWiseMenuPermissionModuleItems, IUserWiseMenuPermissionState, IUserWiseMenuPermissionUsersList } from "../pages/userWiseMenuPermission/userWiseMenuPermission.interface";
import { data } from "react-router-dom";
import { buildQueryParams } from "@/utils/url";

const initialState: IUserWiseMenuPermissionState = {
    list: [],
    usersLIst: [],
    menusList: [],
    menuPermission: [],
    moduleItems: [],
    menuItems: [],
    paginationObject: createInitialPaginationObject<IUserWiseMenuPermissionList>(),
    loading: false,
    error: null,
    status: "idle",
    message: null
};


// Fetch paged user-wise menu permission using API (with default data fallback)
export const getPagedUserWiseMenuPermission = createAsyncThunk<
    PaginationObject<IUserWiseMenuPermissionList>,
    FetchParams,
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getPagedUserWiseMenuPermission",
    async (params, thunkAPI) => {
        try {
            // Build query string from params
            // const queryString = buildQueryParams({
            //     currentPage: params.page,
            //     perPage: params.perPage,
            //     ...params.searchCriteria,
            //     orderBy: params.orderBy,
            // });

            const queryString = buildQueryParams({
                pageNumber: params.page,
                pageSize: params.perPage,
                userId: 0,
                ...params.searchCriteria,
                orderBy: params.orderBy,
            });

            // --- Uncomment this section when API is ready ---
            const res = await axiosInstance.get<PaginationObject<IUserWiseMenuPermissionList>>(
                `/0/UserToMenuPermission/summary?${queryString}`
            );
            return res.data;

            // --- Default/Dummy data for development ---
            // const dummyData: IUserWiseMenuPermissionList[] = [
            //     {
            //         Id: 1,
            //         UserId: 101,
            //         EmpCode: "EMP001",
            //         UserName: "John Doe",
            //         Designation: "Manager",
            //         NoOfModules: 3,
            //         NoOfMenus: 12,
            //         CreateBy: "Admin",
            //         CreateDate: new Date().toISOString(),
            //         UpdateBy: "Admin",
            //         UpdateDate: new Date().toISOString(),
            //     },
            //     {
            //         Id: 2,
            //         UserId: 102,
            //         EmpCode: "EMP002",
            //         UserName: "Jane Smith",
            //         Designation: "Developer",
            //         NoOfModules: 2,
            //         NoOfMenus: 8,
            //         CreateBy: "Admin",
            //         CreateDate: new Date().toISOString(),
            //         UpdateBy: "Admin",
            //         UpdateDate: new Date().toISOString(),
            //     },
            //     {
            //         Id: 3,
            //         UserId: 103,
            //         EmpCode: "EMP003",
            //         UserName: "Alice Johnson",
            //         Designation: "Tester",
            //         NoOfModules: 1,
            //         NoOfMenus: 5,
            //         CreateBy: "Admin",
            //         CreateDate: new Date().toISOString(),
            //         UpdateBy: "Admin",
            //         UpdateDate: new Date().toISOString(),
            //     },
            // ];

            // const currentPage = params.page || 1;
            // const perPage = params.perPage || 10;
            // const totalItems = dummyData.length;
            // const totalPages = Math.ceil(totalItems / perPage);
            // const pagedData = dummyData.slice((currentPage - 1) * perPage, currentPage * perPage);

            // const links = Array.from({ length: totalPages }, (_, i) => ({
            //     url: `/?page=${i + 1}`,
            //     label: `${i + 1}`,
            //     active: i + 1 === currentPage,
            // }));

            // return {
            //     currentPage,
            //     perPage,
            //     totalItems,
            //     total: totalItems,
            //     totalPages,
            //     data: pagedData,
            //     firstPageUrl: "/?page=1",
            //     lastPage: totalPages,
            //     lastPageUrl: `/?page=${totalPages}`,
            //     links,
            //     nextPageUrl: currentPage < totalPages ? `/?page=${currentPage + 1}` : null,
            //     previousPageUrl: currentPage > 1 ? `/?page=${currentPage - 1}` : null,
            //     from: (currentPage - 1) * perPage + 1,
            //     to: (currentPage - 1) * perPage + pagedData.length,
            //     path: "/",
            //     search: "",
            // };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to fetch user-wise menu permissions")
            );
        }
    }
);



export const getUserWiseMenuPermissionList = createAsyncThunk<
    IUserWiseMenuPermissionList[],
    { userId?: number },
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getUserWiseMenuPermissionList",
    async ({ userId = 0 }, thunkAPI) => {
        try {
            const dummyData: IUserWiseMenuPermissionList[] = [
                {
                    Id: 1,
                    UserId: 101,
                    EmpCode: "EMP001",
                    UserName: "John Doe",
                    Designation: "Manager",
                    NoOfModules: 3,
                    NoOfMenus: 12,
                    CreateBy: "Admin",
                    CreateDate: new Date().toISOString(),
                    UpdateBy: "Admin",
                    UpdateDate: new Date().toISOString(),
                },
                {
                    Id: 2,
                    UserId: 102,
                    EmpCode: "EMP002",
                    UserName: "Jane Smith",
                    Designation: "Developer",
                    NoOfModules: 2,
                    NoOfMenus: 8,
                    CreateBy: "Admin",
                    CreateDate: new Date().toISOString(),
                    UpdateBy: "Admin",
                    UpdateDate: new Date().toISOString(),
                },
            ];

            const filteredData = userId !== 0
                ? dummyData.filter(d => d.UserId === userId)
                : dummyData;

            return filteredData;

            // When API is ready, you can use:
            // const res = await axiosInstance.get('/getUserWiseMenuPermissionList', { params: { userId } });
            // return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch menu permission list");
        }
    }
);


export const getUserWiseMenuPermissionUsersList = createAsyncThunk<
    IUserWiseMenuPermissionUsersList[],
    { userId?: number; userGroupId?: number },
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getUserWiseMenuPermissionUsersList",
    async ({ userId = 0, userGroupId = 0 }, thunkAPI) => {
        try {
            const res = await axiosInstance.get('/0/UserToMenuPermission/user-details', {
                params: { userId, groupId: userGroupId }
            });

            // Map the response to add default IsChecked: true
            const dataWithDefaultCheck: IUserWiseMenuPermissionUsersList[] = res.data.map((item: IUserWiseMenuPermissionUsersList) => ({
                ...item,
                IsChecked: true
            }));

            return dataWithDefaultCheck;

        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch user menu permission list");
        }
    }
);



export const getSavedUserWiseMenuPermissionUsersList = createAsyncThunk<
    IUserWiseMenuPermissionUsersList[],
    { userId?: number; userGroupId?: number },
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getSavedUserWiseMenuPermissionUsersList",
    async ({ userId = 0, userGroupId = 0 }, thunkAPI) => {
        try {
            // Dummy data for users list
            const dummyUsers: IUserWiseMenuPermissionUsersList[] = [
                {
                    Id: 1,
                    UserId: 101,
                    UserName: "John Doe",
                    Designation: "Manager",
                    CompanyName: "ABC Ltd",
                    IsChecked: true,
                },
                {
                    Id: 2,
                    UserId: 102,
                    UserName: "Jane Smith",
                    Designation: "Developer",
                    CompanyName: "XYZ Corp",
                    IsChecked: true,
                },
                {
                    Id: 3,
                    UserId: 103,
                    UserName: "Alice Johnson",
                    Designation: "Designer",
                    CompanyName: "ABC Ltd",
                    IsChecked: true,
                },
            ];

            // Filter by userId if provided
            let filteredData = userId !== 0
                ? dummyUsers.filter(u => u.UserId === userId)
                : dummyUsers;

            // Example filter by userGroupId if needed (for now just placeholder)
            // You can extend your dummy data to include userGroupId to filter properly
            if (userGroupId !== 0) {
                filteredData = filteredData.filter(u => u.Id % 2 === 0); // dummy filter logic
            }

            return filteredData;

            // When API is ready, you can replace with actual API call:
            // const res = await axiosInstance.get('/getUserWiseMenuPermissionUsersList', { params: { userId, userGroupId } });
            // return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch user menu permission list");
        }
    }
);


// Fetch user-wise menu permission menus list
export const getUserWiseMenuPermissionMenusList = createAsyncThunk<
    IUserWiseMenuPermissionMenusList[],
    { menuId?: number; moduleId?: number, defaultCheck: boolean },
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getUserWiseMenuPermissionMenusList",
    async ({ menuId = 0, moduleId = 0, defaultCheck = true }, thunkAPI) => {
        try {
            const res = await axiosInstance.get('/0/Menu', { params: { menuId, moduleId } });

            // Transform API response to match IUserWiseMenuPermissionMenusList
            const data: IUserWiseMenuPermissionMenusList[] = res.data.map((item: any) => ({
                Id: item.ID ?? 0,
                MenuId: item.ID ?? 0,
                ModuleId: item.MODUELID ?? 0,
                ModuleName: item.MODULENAME ?? item.MODULE_NAME ?? "",
                MainMenu: item.MAINMENU ?? "",
                MenuName: item.MENUNAME ?? "",
                IsAccess: defaultCheck,
                IsInsert: defaultCheck,
                IsUpdate: defaultCheck,
                IsDelete: defaultCheck,
            }));

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch menu permission list");
        }
    }
);



export const getSavedUserWiseMenuPermissionMenusList = createAsyncThunk<
    IUserWiseMenuPermissionMenusList[],
    { id?: number; userId?: number, menuId: number, moduleId: number },
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getSavedUserWiseMenuPermissionMenusList",
    async ({ id = 0, userId = 0, menuId = 0, moduleId = 0 }, thunkAPI) => {
        try {

            const res = await axiosInstance.get('/0/UserToMenuPermission', { params: { id: 0, userId: userId, menuId: menuId, moduleId: moduleId } });
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch menu permission list");
        }
    }
);

export const getUserWiseMenuPermissionMenusListByUser = createAsyncThunk<
    IUserWiseMenuPermissionMenusList[],
    { userId?: number },
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/getUserWiseMenuPermissionMenusListByUser",
    async ({ userId = 0 }, thunkAPI) => {
        try {
            // If userId is 0, return empty array (no data)
            if (userId === 0) {
                return [];
            }

            // Dummy data for menus list
            const dummyMenus: IUserWiseMenuPermissionMenusList[] = [
                {
                    Id: 1,
                    MenuId: 201,
                    ModuleId: 301,
                    ModuleName: "Sales",
                    MainMenu: "Dashboard",
                    MenuName: "Sales Overview",
                    IsAccess: true,
                    IsInsert: false,
                    IsUpdate: true,
                    IsDelete: false,
                },
                {
                    Id: 2,
                    MenuId: 202,
                    ModuleId: 301,
                    ModuleName: "Sales",
                    MainMenu: "Reports",
                    MenuName: "Monthly Sales",
                    IsAccess: true,
                    IsInsert: true,
                    IsUpdate: false,
                    IsDelete: false,
                },
                {
                    Id: 3,
                    MenuId: 203,
                    ModuleId: 302,
                    ModuleName: "Inventory",
                    MainMenu: "Dashboard",
                    MenuName: "Stock Overview",
                    IsAccess: true,
                    IsInsert: true,
                    IsUpdate: true,
                    IsDelete: false,
                },
            ];

            return dummyMenus;

            // When API is ready, replace with actual API call:
            // const res = await axiosInstance.get('/getUserWiseMenuPermissionMenusList', { params: { userId } });
            // return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch menu permission list");
        }
    }
);


export const createUserWiseMenuPermission = createAsyncThunk<
    { message: string },
    ICreateUserWiseMenuPermissionPayload,
    { rejectValue: string }
>(
    "userWiseMenuPermissionSlice/create",
    async (payload, thunkAPI) => {
        try {
            const { users, menus } = payload;

            console.log("rrrrrr", payload)

            const permissions: IUserWiseMenuPermission[] = [];

            users.forEach(user => {
                if (user.IsChecked) {
                    menus.forEach(menu => {
                        permissions.push({
                            Id: 0,
                            UserId: user.UserId,
                            MenuId: menu.MenuId,
                            ModuleId: menu.ModuleId,
                            ModuleName: menu.ModuleName,
                            MainMenu: menu.MainMenu,
                            MenuName: menu.MenuName,
                            IsAccess: menu.IsAccess,
                            IsInsert: menu.IsInsert,
                            IsUpdate: menu.IsUpdate,
                            IsDelete: menu.IsDelete,
                        });
                    });
                }
            });

            const res = await axiosInstance.post("/0/UserToMenuPermission", permissions);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                handleThunkError(err, "Failed to create user-wise menu permission")
            );
        }
    }
);


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


export const getUserWiseMenuPermissionModuleItems = createAsyncThunk<
    IUserWiseMenuPermissionModuleItems[],
    void,
    { rejectValue: string }>(
        "userGroupSlice/getUserWiseMenuPermissionModuleList", async (_, thunkAPI) => {
            try {
                const res = await axiosInstance.get('/0/Module');
                return res.data;
            } catch (err) {
                return thunkAPI.rejectWithValue("Failed to fetch module list");
            }
        }
    )


export const getUserWiseMenuPermissionMenuItems = createAsyncThunk<
    IUserWiseMenuPermissionMenuItems[],
    void,
    { rejectValue: string }>(
        "userGroupSlice/getUserWiseMenuPermissionMenuList", async (_, thunkAPI) => {
            try {
                const res = await axiosInstance.get('/0/Menu');
                return res.data;
            } catch (err) {
                return thunkAPI.rejectWithValue("Failed to fetch menu list");
            }
        }
    )




const userWiseMenuPermissionSlice = createSlice({
    name: "userGroupSlice",
    initialState,
    reducers: {

        // clearUserGroupDetails(state) {
        //     state.masterInfo.Details = [];
        //     state.saleInfo.editingDetailIndex = undefined;
        // },

        clearUserWiseMenuPermissionState() {
            return { ...initialState };
        },

        removeMenuFromList: (
            state: IUserWiseMenuPermissionState,
            action: PayloadAction<{ moduleId: number; menuId: number }>
        ) => {
            const { moduleId, menuId } = action.payload;
            if (!state.menusList) return;

            state.menusList = state.menusList.filter(
                menu => !(menu.ModuleId === moduleId && menu.MenuId === menuId)
            );
        },

        checkAllPermission: (
            state,
            action: PayloadAction<{ field: keyof IUserWiseMenuPermissionMenusList; value: boolean }>
        ) => {
            const { field, value } = action.payload;
            state.menusList = state.menusList.map((menu) => ({
                ...menu,
                [field]: value,
            }));
        },

        handleUserCheckBox: (
            state: IUserWiseMenuPermissionState,
            action: PayloadAction<{ index: number; checked: boolean }>
        ) => {
            const { index, checked } = action.payload;
            if (!state.usersLIst || !state.usersLIst[index]) return;

            state.usersLIst[index].IsChecked = checked;
        },


        handleMenuPermissionChange: (
            state,
            action: PayloadAction<{ index: number; field: keyof IUserWiseMenuPermissionMenusList; checked: boolean }>
        ) => {
            const { index, field, checked } = action.payload;
            if (!state.menusList || !state.menusList[index]) return;

            const key: keyof IUserWiseMenuPermissionMenusList = field;

            (state.menusList[index] as any)[key] = checked;
        },


        // setInventorySaleValidationErrors(
        //     state,
        //     action: PayloadAction<InventorySaleValidationErrors | null>
        // ) {
        //     state.validationErrors = action.payload;
        // },
    },

    extraReducers: (builder) => {

        //save user wise menu permission
        builder.addCase(createUserWiseMenuPermission.pending, (state) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(createUserWiseMenuPermission.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message || "Action performed successfully";
        })
        builder.addCase(createUserWiseMenuPermission.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to save";
        })

        //get paginated data
        builder.addCase(getPagedUserWiseMenuPermission.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getPagedUserWiseMenuPermission.fulfilled, (state, action) => {
            state.paginationObject = action.payload;
            state.list = action.payload.data;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getPagedUserWiseMenuPermission.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //get list
        builder.addCase(getUserWiseMenuPermissionList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserWiseMenuPermissionList.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserWiseMenuPermissionList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //get module items
        builder.addCase(getUserWiseMenuPermissionModuleItems.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserWiseMenuPermissionModuleItems.fulfilled, (state, action) => {
            state.moduleItems = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserWiseMenuPermissionModuleItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //get menu items
        builder.addCase(getUserWiseMenuPermissionMenuItems.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserWiseMenuPermissionMenuItems.fulfilled, (state, action) => {
            state.menuItems = action.payload;
            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserWiseMenuPermissionMenuItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        //get users info
        builder.addCase(getUserWiseMenuPermissionUsersList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserWiseMenuPermissionUsersList.fulfilled, (state, action) => {

            if (!state.usersLIst) state.usersLIst = [];

            action.payload.forEach((newUser) => {
                const exists = state.usersLIst.find(u => u.UserId === newUser.UserId);
                if (!exists) {
                    state.usersLIst.push(newUser);
                }
            });

            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserWiseMenuPermissionUsersList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })


        //get menu list
        builder.addCase(getUserWiseMenuPermissionMenusList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserWiseMenuPermissionMenusList.fulfilled, (state, action) => {
            if (!state.menusList) state.menusList = [];

            action.payload.forEach((newMenu) => {
                const exists = state.menusList.find(
                    m => m.ModuleId === newMenu.ModuleId && m.MenuId === newMenu.MenuId
                );
                if (!exists) {
                    state.menusList.push(newMenu);
                }
            });

            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserWiseMenuPermissionMenusList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })



        //get saved menu list
        builder.addCase(getSavedUserWiseMenuPermissionMenusList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getSavedUserWiseMenuPermissionMenusList.fulfilled, (state, action) => {
            if (!state.menusList) state.menusList = [];

            action.payload.forEach((newMenu) => {
                const exists = state.menusList.find(
                    m => m.ModuleId === newMenu.ModuleId && m.MenuId === newMenu.MenuId
                );
                if (!exists) {
                    state.menusList.push(newMenu);
                }
            });

            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getSavedUserWiseMenuPermissionMenusList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })



        //get menu list by user
        builder.addCase(getUserWiseMenuPermissionMenusListByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getUserWiseMenuPermissionMenusListByUser.fulfilled, (state, action) => {
            if (!state.menusList) state.menusList = [];

            action.payload.forEach((newMenu) => {
                const exists = state.menusList.find(
                    m => m.ModuleId === newMenu.ModuleId && m.MenuId === newMenu.MenuId
                );
                if (!exists) {
                    state.menusList.push(newMenu);
                }
            });

            state.loading = false;
            state.status = "succeeded";
        });

        builder.addCase(getUserWiseMenuPermissionMenusListByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});


export default userWiseMenuPermissionSlice.reducer;

export const {
    handleUserCheckBox,
    handleMenuPermissionChange,
    clearUserWiseMenuPermissionState,
    removeMenuFromList,
    checkAllPermission
} = userWiseMenuPermissionSlice.actions;