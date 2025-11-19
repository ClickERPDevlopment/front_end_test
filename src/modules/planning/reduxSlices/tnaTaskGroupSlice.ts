// src/features/tnaTaskGroup/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfTnaTaskGroupStore, getAllTnaTaskGroup, saveTnaTaskGroupData, } from "../../../app/idb/planning/tnaTaskGroupOperations";
import { ITnaTaskGroup, ITnaTaskGroupState } from "../pages/tnaTaskGroup/tnaTaskGroup.interface";

const initialState: ITnaTaskGroupState = {
    tnaTaskGroups: [],
    tnaTaskGroup: {
        colorCode: "",
        id: 0,
        name: ""
    },
    paginationObject: createInitialPaginationObject<ITnaTaskGroup>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedTnaTaskGroups = createAsyncThunk(
    "tnaTaskGroup/fetchPaginatedTnaTaskGroups",
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

export const fetchAllTnaTaskGroups = createAsyncThunk(
    "tnaTaskGroup/fetchAllTnaTaskGroups",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tna-task-group/list`);
            return response.data;

            const { hasData } = await checkIfTnaTaskGroupStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/task-group/list`);
                await saveTnaTaskGroupData(response.data);
                return response.data;
            } else {
                const data = await getAllTnaTaskGroup();
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

export const fetchAllTnaTaskGroupsJson = createAsyncThunk(
    "tnaTaskGroup/fetchAllTnaTaskGroupsJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfTnaTaskGroupStore();
            if (!hasData) {
                const res = await fetch("/data/tna_task_group_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: ITnaTaskGroup[] = await res.json(); // ✅ parse JSON properly
                await saveTnaTaskGroupData(response);
                return response;
            } else {
                const data = await getAllTnaTaskGroup();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchTnaTaskGroup = createAsyncThunk(
    "tnaTaskGroup/fetchTnaTaskGroup",
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

export const createTnaTaskGroup = createAsyncThunk(
    "tnaTaskGroup/createTnaTaskGroup",
    async (formState: Omit<ITnaTaskGroup, "id">, { rejectWithValue }) => {
        try {
            const { colorCode, name } = formState;

            const data = {
                colorCode: colorCode,
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
export const updateTnaTaskGroup = createAsyncThunk(
    "tnaTaskGroup/updateTnaTaskGroup",
    async (formState: ITnaTaskGroup, { rejectWithValue }) => {
        try {
            const { colorCode, name, id } = formState;
            const data = {
                id: id,
                colorCode: colorCode,
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
export const deleteTnaTaskGroup = createAsyncThunk(
    "tnaTaskGroup/deleteTnaTaskGroup",
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
    name: "tnaTaskGroup",
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
            .addCase(fetchPaginatedTnaTaskGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedTnaTaskGroups.fulfilled,
                (state, action: PayloadAction<PaginationObject<ITnaTaskGroup>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedTnaTaskGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllTnaTaskGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnaTaskGroups.fulfilled,
                (state, action: PayloadAction<ITnaTaskGroup[]>) => {
                    state.tnaTaskGroups = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnaTaskGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllTnaTaskGroupsJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnaTaskGroupsJson.fulfilled,
                (state, action: PayloadAction<ITnaTaskGroup[]>) => {
                    state.tnaTaskGroups = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnaTaskGroupsJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchTnaTaskGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTnaTaskGroup.fulfilled, (state, action: PayloadAction<ITnaTaskGroup>) => {
                state.tnaTaskGroup = action.payload;
                state.loading = false;
            })
            .addCase(fetchTnaTaskGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createTnaTaskGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createTnaTaskGroup.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createTnaTaskGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateTnaTaskGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateTnaTaskGroup.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateTnaTaskGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTnaTaskGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTnaTaskGroup.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteTnaTaskGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetTnaTaskGroupForm,
    resetMessage,
    resetError,
} = colorSlice.actions;

export default colorSlice.reducer;
