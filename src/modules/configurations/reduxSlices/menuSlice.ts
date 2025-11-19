// src/features/buyer/buyerSlice.ts
import { getAllModules, saveModuleData } from "@/app/idb/systemConfig/moduleOperations";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { checkIfMenuStore, getAllMenuItems, getModuleIdBySegment, saveMenuData, } from "../../../app/idb/systemConfig/menuOperations";
import { createInitialPaginationObject, FetchParams, PaginationObject, } from "../../../types/global";
import { MenuItem, MenuState } from "../types/menu.interface";
import { ModuleItem } from "../types/module.interface";


const initialState: MenuState = {
    menu: {
        name: "",
        link: "",
        moduleId: 0,
        parentMenuId: 0,
        parentMenuName: "",
        isAccess: true,
        isDelete: true,
        isInsert: true,
        isUpdate: true,
        id: 0,
        moduleName: "",
    },
    menus: [

    ],
    moduleMenus: [],
    flatMeanus: [],
    filteredMenus: [

    ],
    paginationObject: createInitialPaginationObject<MenuItem>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};


export const fetchMenusByModuleIdZero = createAsyncThunk(
    "menu/fetchMenusByModuleIdZero",
    async ({ moduleId, companyId }: { moduleId: number, companyId: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/${companyId}/Menu/get-all-menu?moduleId=${0}`
            );
            const data: MenuItem[] = response.data.map((item: any) => ({
                id: item.ID,
                name: item.MENUNAME,
                parentMenuName: item.MAINMENU,
                moduleName: item.MODULE_NAME,
                moduleId: item.MODUELID
            }));
            return data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


export const fetchMenusByModule = createAsyncThunk(
    "menu/fetchMenusByModule",
    async ({ moduleId, companyId }: { moduleId: number, companyId: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/${companyId}/Menu/get-all-menu?moduleId=${moduleId}`
            );
            const data: MenuItem[] = response.data.map((item: any) => ({
                id: item.ID,
                name: item.MENUNAME,
                parentMenuName: item.MAINMENU,
                moduleName: item.MODULE_NAME,
                moduleId: item.MODUELID
            }));
            return data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for fetching buyers
export const fetchPaginatedMenus = createAsyncThunk(
    "menu/fetchPaginatedMenus",
    async (
        { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `/menu-list?page=${page}&perPage=${perPage}`
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;

            // Safely access error.response?.data?.message
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllMenus = createAsyncThunk(
    "menu/fetchAllMenus",
    async (segment: string, { rejectWithValue }) => {
        try {

            const module = await getModuleIdBySegment(segment);

            const response = await axiosInstance.get(
                `User/GetAllMenuAccessByUserModule?moduleId=${module?.id}`
            );
            // const response = await axiosInstance.get(
            //     `User/GetAllMenuAccessByUserModule?moduleId`
            // );
            // debugger
            const { flatList, hierarchyList } = transformApiMenus(response.data, module);

            return {
                flatList,
                hierarchyList
            };
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllMenusByModuleID = createAsyncThunk(
    "menu/fetchAllMenusByModuleID",
    async (moduleId: number, { rejectWithValue }) => {
        try {
            const modules = await getAllModules();
            const response = await axiosInstance.get(
                `User/GetAllMenuAccessByUserModule?moduleId=${moduleId}`
            );
            // const response = await axiosInstance.get(
            //     `User/GetAllMenuAccessByUserModule?moduleId`
            // );
            // debugger
            const module = modules.find(f => f.id === Number(moduleId))
            const { flatList, hierarchyList } = transformApiMenus(response.data, module || null);

            return {
                flatList,
                hierarchyList
            };
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchModuleMenus = createAsyncThunk(
    "menu/fetchModuleMenus",
    async (_, { rejectWithValue }) => {
        try {

            // const response = await axiosInstance.get(
            //     `User/GetAllMenuAccessByUserModule?moduleId=0`
            // );
            const response = await axiosInstance.get(
                `User/GetAllMenuAccessByUserModule?moduleId=0`
            );
            // console.log("hierarchyList")

            const modules = await getAllModules();

            const m: Record<string, MenuItem[]>[] = [];

            const moduleMenu: Record<number, MenuItem[]> = {};
            for (const item of response.data) {
                if (item.MENUNAME === 'Home') continue;
                if (!moduleMenu[item.MODUELID]) {
                    moduleMenu[item.MODUELID] = []; // initialize array if not exist
                }
                moduleMenu[item.MODUELID].push(item)
            }

            modules.forEach(module => {
                const { flatList, hierarchyList } = transformApiMenus(moduleMenu[module.id], module);
                // console.log({hierarchyList})

                m.push({
                    [module.name]: hierarchyList
                });
            })
            // console.log({ m })
            return m;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


// new menus with link
export const fetchAllMenusWithLink = createAsyncThunk(
    "menu/fetchAllMenusWithLink",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `User/GetAllMenuAccessByUser`
            );
            const flatList: MenuItem[] = []
            for (const item of response.data) {
                const menuItem: MenuItem = {
                    id: item.ID,
                    name: item.MENUNAME,
                    link: '/webapp' + item.MENU_PATH,
                    moduleId: item.MODUELID,
                    isAccess: item.ISACCESS === "1",
                    isDelete: item.ISDELETE === "1",
                    isInsert: item.ISINSERT === "1",
                    isUpdate: item.ISUPDATE === "1",
                    parentMenuId: item.PARENT_ID,
                    submenu: [],
                    moduleName: item.MODULENAME,
                    parentMenuName: item.PARENT_MENU,
                };

                if (item.MENU_PATH !== null && item.MENU_PATH !== "") {
                    const ifIncludedMenu = flatList.some(f => f.id === menuItem.id);
                    if (!ifIncludedMenu) {
                        flatList.push(menuItem);
                    }

                }

            }

            return flatList
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

function transformApiMenus(apiMenus: any[], module: ModuleItem | null): { flatList: MenuItem[], hierarchyList: MenuItem[] } {
    const map = new Map<number, MenuItem>();
    const roots: MenuItem[] = [];
    const flatList: MenuItem[] = [];

    // 1. Step: Build flat MenuItem map (excluding 'Home')
    for (const item of apiMenus) {
        if (item.MENUNAME === 'Home') continue; // skip "Home"

        const menuItem: MenuItem = {
            id: item.ID,
            name: item.MENUNAME,
            link: (module?.link + '/' + item.MENU_PATH),
            moduleId: item.MODUELID,
            isAccess: item.ISACCESS === "1",
            isDelete: item.ISDELETE === "1",
            isInsert: item.ISINSERT === "1",
            isUpdate: item.ISUPDATE === "1",
            parentMenuId: item.PARENT_ID,
            submenu: [],
            moduleName: item.MODULENAME,
            parentMenuName: item.PARENT_MENU,
        };

        if (item.MENU_PATH !== null && item.MENU_PATH !== "") {
            flatList.push(menuItem);
        }

        map.set(menuItem.id, menuItem);
    }

    // 2. Step: Nest into parent ➜ child
    for (const item of map.values()) {
        if (item.parentMenuId && map.has(item.parentMenuId)) {
            const parent = map.get(item.parentMenuId)!;
            parent.submenu!.push(item);
        }
    }

    // 3. Step: Find valid root items (only those with link or submenu)
    for (const item of map.values()) {
        const isTopLevel = !item.parentMenuId || !map.has(item.parentMenuId);
        const hasValidContent = item.link !== "" || (item.submenu && item.submenu.length > 0);

        if (isTopLevel && hasValidContent) {
            roots.push(item);
        }
    }

    return { flatList: flatList, hierarchyList: roots };
}


export const fetchAllMenusJson = createAsyncThunk(
    "menu/fetchAllMenusJson",
    async (segment: string, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfMenuStore();

            if (!hasData) {
                const res = await fetch("/data/menu_list.json");
                if (!res.ok) throw new Error("Failed to load menus.json");

                const rawData = await res.json();
                const { flatList, hierarchyList } = transformApiMenus(rawData, null);

                await saveMenuData(hierarchyList);
                // return data;
            }

            const cachedData = await getAllMenuItems(segment);

            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllMenusJsonByReset = createAsyncThunk(
    "menu/fetchAllMenusJsonByReset",
    async (segment: string, { rejectWithValue }) => {
        try {
            const res2 = await fetch("/data/module_list.json");
            if (!res2.ok) throw new Error("Failed to load menus.json");

            const data2: ModuleItem[] = await res2.json();
            await saveModuleData(data2);

            const res = await fetch("/data/menu_list.json");
            if (!res.ok) throw new Error("Failed to load menus.json");

            const data: MenuItem[] = await res.json();
            await saveMenuData(data);

            const cachedData = await getAllMenuItems(segment);

            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchMenu = createAsyncThunk(
    "menu/fetchMenu",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/line-show/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const createMenu = createAsyncThunk(
    "menu/createMenu",
    async (formState: Omit<MenuItem, "id">, { rejectWithValue }) => {
        try {
            const { link, moduleId, name, parentMenuId } = formState;

            const data = {
                link: link,
                moduleId: moduleId,
                name: name,
                parentMenuId: parentMenuId,
            };

            const response = await axiosInstance.post("/line-save", data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for updating a session
export const updateMenu = createAsyncThunk(
    "menu/updateMenu",
    async (formState: MenuItem, { rejectWithValue }) => {
        try {
            const { link, moduleId, name, parentMenuId, id } = formState;

            const data = {
                id: id,
                link: link,
                moduleId: moduleId,
                name: name,
                parentMenuId: parentMenuId,
            };

            const response = await axiosInstance.put(`/line-update/${data.id}`, data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for deleting a session
export const deleteMenu = createAsyncThunk(
    "menu/deleteMenu",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/line-delete/${id}`);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

const productionMenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        resetForm(state) {
            Object.assign(state, initialState);
        },
        resetMessage(state) {
            state.message = "";
        },
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedMenus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedMenus.fulfilled,
                (state, action: PayloadAction<PaginationObject<MenuItem>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllMenus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllMenus.fulfilled,
                (state, action: PayloadAction<{ flatList: MenuItem[], hierarchyList: MenuItem[] }>) => {
                    state.menus = action.payload.hierarchyList;
                    // state.flatMeanus = action.payload.flatList;
                    state.loading = false;
                }
            )
            .addCase(fetchAllMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllMenusByModuleID.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllMenusByModuleID.fulfilled,
                (state, action: PayloadAction<{ flatList: MenuItem[], hierarchyList: MenuItem[] }>) => {
                    state.filteredMenus = action.payload.flatList;
                    // state.flatMeanus = action.payload.flatList;
                    state.loading = false;
                }
            )
            .addCase(fetchAllMenusByModuleID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchModuleMenus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchModuleMenus.fulfilled,
                (state, action: PayloadAction<Record<string, MenuItem[]>[]>) => {
                    state.moduleMenus = action.payload;
                    // state.flatMeanus = action.payload.flatList;
                    state.loading = false;
                }
            )
            .addCase(fetchModuleMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchAllMenusJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllMenusJson.fulfilled,
                (state, action: PayloadAction<MenuItem[]>) => {
                    state.menus = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllMenusJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllMenusJsonByReset.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllMenusJsonByReset.fulfilled,
                (state, action: PayloadAction<MenuItem[]>) => {
                    state.menus = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllMenusJsonByReset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMenu.fulfilled,
                (state, action: PayloadAction<MenuItem>) => {
                    state.menu = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMenu.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMenu.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteMenu.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMenu.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteMenu.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllMenusWithLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllMenusWithLink.fulfilled,
                (state, action: PayloadAction<MenuItem[]>) => {
                    state.flatMeanus = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllMenusWithLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMenusByModule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenusByModule.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.filteredMenus = action.payload;
                state.loading = false;
            })
            .addCase(fetchMenusByModule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMenusByModuleIdZero.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenusByModuleIdZero.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.filteredMenus = action.payload;
                state.loading = false;
            })
            .addCase(fetchMenusByModuleIdZero.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        // debugger
    },
});

export const {
    resetForm: resetMenuForm,
    resetMessage,
    resetError,
} = productionMenuSlice.actions;

export default productionMenuSlice.reducer;
