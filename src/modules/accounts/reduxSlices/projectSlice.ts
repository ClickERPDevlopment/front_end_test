// src/features/project/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfProjectStore, getAllProject, saveProjectData, } from "../../../app/idb/accounts/projectOperations";
import { Project, ProjectState } from "../pages/projectSetup/project.interface";

const initialState: ProjectState = {
    projects: [],
    filteredProjects: [],
    project: {
        convertedAssetId: 0,
        fixedAssetId: 0,
        id: 0,
        inventoryIssueLedgerId: 0,
        isClose: "1",
        projectName: "",
        wipLedger: 0,
    },
    paginationObject: createInitialPaginationObject<Project>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedProjects = createAsyncThunk(
    "project/fetchPaginatedProjects",
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

export const fetchAllProjects = createAsyncThunk(
    "project/fetchAllProjects",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfProjectStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveProjectData(response.data);
                return response.data;
            } else {
                const data = await getAllProject();
                return data;
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllProjectsJson = createAsyncThunk(
    "project/fetchAllProjectsJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfProjectStore();
            if (!hasData) {
                const res = await fetch("/data/project_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: Project[] = await res.json(); // ✅ parse JSON properly
                await saveProjectData(response);
                return response;
            } else {
                const data = await getAllProject();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchProject = createAsyncThunk(
    "project/fetchProject",
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

export const createProject = createAsyncThunk(
    "project/createProject",
    async (formState: Omit<Project, "id">, { rejectWithValue }) => {
        try {
            const {
                convertedAssetId,
                fixedAssetId,
                inventoryIssueLedgerId,
                isClose,
                projectName,
                wipLedger,
            } = formState;

            const data = {
                convertedAssetId: convertedAssetId,
                fixedAssetId: fixedAssetId,
                inventoryIssueLedgerId: inventoryIssueLedgerId,
                isClose: isClose,
                projectName: projectName,
                wipLedger: wipLedger,
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
export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (formState: Project, { rejectWithValue }) => {
        try {
            const {
                convertedAssetId,
                fixedAssetId,
                id,
                inventoryIssueLedgerId,
                isClose,
                projectName,
                wipLedger,
            } = formState;

            const data = {
                id: id,
                convertedAssetId: convertedAssetId,
                fixedAssetId: fixedAssetId,
                inventoryIssueLedgerId: inventoryIssueLedgerId,
                isClose: isClose,
                projectName: projectName,
                wipLedger: wipLedger,
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
export const deleteProject = createAsyncThunk(
    "project/deleteProject",
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

const colorSlice = createSlice({
    name: "project",
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
            .addCase(fetchPaginatedProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedProjects.fulfilled,
                (state, action: PayloadAction<PaginationObject<Project>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllProjects.fulfilled,
                (state, action: PayloadAction<Project[]>) => {
                    state.projects = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllProjectsJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllProjectsJson.fulfilled,
                (state, action: PayloadAction<Project[]>) => {
                    state.projects = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllProjectsJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchProject.fulfilled,
                (state, action: PayloadAction<Project>) => {
                    state.project = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createProject.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateProject.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteProject.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetProjectForm,
    resetMessage,
    resetError,
} = colorSlice.actions;

export default colorSlice.reducer;
