// src/features/buyer/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import {
    createInitialPaginationObject,
    FetchParams,
    PaginationObject,
} from "../../../types/global";
import { ModuleItem, ModuleState } from "../types/module.interface";
import {
    checkIfModuleStore,
    getAllModules,
    saveModuleData,
} from "../../../app/idb/systemConfig/moduleOperations";

const initialState: ModuleState = {
    module: {
        name: "",
        link: "",
        image: "",
        id: 0,
    },
    modules: [

    ],
    filteredModule: [
        // { id: 1, image: "", link: "", name: "Merchandising" },
        // { id: 2, image: "", link: "", name: "Commercial" },
        // { id: 3, image: "", link: "", name: "Procurement" }
    ],
    paginationObject: createInitialPaginationObject<ModuleItem>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};


// Async thunk for fetching modules by company
export const fetchModulesByCompany = createAsyncThunk(
    "menu/fetchModulesByCompany",
    async (companyId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/${companyId}/Module`);

            const converted: ModuleItem[] = response.data.map((item: any) => ({
                id: item.Id,
                name: item.Modulename,
                link: "",
                image: "",
            }));

            await saveModuleData(converted); // optional caching
            const data = await getAllModules(); // get cached data
            return data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


// Async thunk for fetching buyers
export const fetchPaginatedModules = createAsyncThunk(
    "menu/fetchPaginatedModules",
    async (
        { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `/line-list?page=${page}&perPage=${perPage}`
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

export const fetchAllModules = createAsyncThunk(
    "menu/fetchAllModules",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`User/GetAllModuleByUser`);

            const converted: ModuleItem[] = response.data.map((item: any) => ({
                id: item.ID,
                name: item.MODULENAME,
                link: "/webapp/" + item.MODULEPROPERTIESNAME,
                image: "/module_icons/" + item.IMAGENAME + ".png",
            }));

            await saveModuleData(converted);
            const data = await getAllModules();
            return data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllModulesJson = createAsyncThunk(
    "menu/fetchAllModulesJson",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/data/module_list.json");
            if (!res.ok) throw new Error("Failed to load menus.json");

            const data: ModuleItem[] = await res.json();
            await saveModuleData(data);

            const cachedData = await getAllModules();
            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchModule = createAsyncThunk(
    "menu/fetchModule",
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

export const createModule = createAsyncThunk(
    "menu/createModule",
    async (formState: Omit<ModuleItem, "id">, { rejectWithValue }) => {
        try {
            const { link, name } = formState;

            const data = {
                link: link,
                name: name,
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
export const updateModule = createAsyncThunk(
    "menu/updateModule",
    async (formState: ModuleItem, { rejectWithValue }) => {
        try {
            const { link, name, id } = formState;

            const data = {
                id: id,
                link: link,
                name: name,
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
export const deleteModule = createAsyncThunk(
    "menu/deleteModule",
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

const productionModuleSlice = createSlice({
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
            .addCase(fetchPaginatedModules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedModules.fulfilled,
                (state, action: PayloadAction<PaginationObject<ModuleItem>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedModules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllModules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllModules.fulfilled,
                (state, action: PayloadAction<ModuleItem[]>) => {
                    state.modules = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllModules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllModulesJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllModulesJson.fulfilled,
                (state, action: PayloadAction<ModuleItem[]>) => {
                    state.modules = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllModulesJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchModule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchModule.fulfilled,
                (state, action: PayloadAction<ModuleItem>) => {
                    state.module = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchModule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createModule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createModule.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createModule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateModule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateModule.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateModule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteModule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteModule.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(deleteModule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchModulesByCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchModulesByCompany.fulfilled, (state, action: PayloadAction<ModuleItem[]>) => {
                state.filteredModule = action.payload;
                state.loading = false;
            })
            .addCase(fetchModulesByCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetModuleForm,
    resetMessage,
    resetError,
} = productionModuleSlice.actions;

export default productionModuleSlice.reducer;
