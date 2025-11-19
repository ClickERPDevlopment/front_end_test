// src/features/planWorkingTeam/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfPlanWorkingTeamStore, getAllPlanWorkingTeam, savePlanWorkingTeamData, } from "../../../app/idb/planning/tnaTeamOperations";
import { PlanWorkingTeam, PlanWorkingTeamState } from "../pages/tnaTeamSetup/tnaTeam.interface";

const initialState: PlanWorkingTeamState = {
    planWorkingTeams: [],
    filteredPlanWorkingTeam: [],
    planWorkingTeam: {
        id: 0,
        teamName: ""
    },
    paginationObject: createInitialPaginationObject<PlanWorkingTeam>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedPlanWorkingTeams = createAsyncThunk(
    "planWorkingTeam/fetchPaginatedPlanWorkingTeams",
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

export const fetchAllPlanWorkingTeams = createAsyncThunk(
    "planWorkingTeam/fetchAllPlanWorkingTeams",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfPlanWorkingTeamStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await savePlanWorkingTeamData(response.data);
                return response.data;
            } else {
                const data = await getAllPlanWorkingTeam();
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

export const fetchAllPlanWorkingTeamsJson = createAsyncThunk(
    "planWorkingTeam/fetchAllPlanWorkingTeamsJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfPlanWorkingTeamStore();
            if (!hasData) {
                const res = await fetch("/data/tna_team_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: PlanWorkingTeam[] = await res.json(); // ✅ parse JSON properly
                await savePlanWorkingTeamData(response);
                return response;
            } else {
                const data = await getAllPlanWorkingTeam();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchPlanWorkingTeam = createAsyncThunk(
    "planWorkingTeam/fetchPlanWorkingTeam",
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

export const createPlanWorkingTeam = createAsyncThunk(
    "planWorkingTeam/createPlanWorkingTeam",
    async (formState: Omit<PlanWorkingTeam, "id">, { rejectWithValue }) => {
        try {
            const { teamName } = formState;

            const data = {
                teamName: teamName,
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
export const updatePlanWorkingTeam = createAsyncThunk(
    "planWorkingTeam/updatePlanWorkingTeam",
    async (formState: PlanWorkingTeam, { rejectWithValue }) => {
        try {
            const { teamName, id } = formState;

            const data = {
                id: id,
                teamName: teamName,
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
export const deletePlanWorkingTeam = createAsyncThunk(
    "planWorkingTeam/deletePlanWorkingTeam",
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
    name: "planWorkingTeam",
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
            .addCase(fetchPaginatedPlanWorkingTeams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedPlanWorkingTeams.fulfilled,
                (state, action: PayloadAction<PaginationObject<PlanWorkingTeam>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedPlanWorkingTeams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllPlanWorkingTeams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllPlanWorkingTeams.fulfilled,
                (state, action: PayloadAction<PlanWorkingTeam[]>) => {
                    state.planWorkingTeams = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllPlanWorkingTeams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllPlanWorkingTeamsJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllPlanWorkingTeamsJson.fulfilled,
                (state, action: PayloadAction<PlanWorkingTeam[]>) => {
                    state.planWorkingTeams = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllPlanWorkingTeamsJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchPlanWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlanWorkingTeam.fulfilled, (state, action: PayloadAction<PlanWorkingTeam>) => {
                state.planWorkingTeam = action.payload;
                state.loading = false;
            })
            .addCase(fetchPlanWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createPlanWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createPlanWorkingTeam.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createPlanWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updatePlanWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updatePlanWorkingTeam.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updatePlanWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deletePlanWorkingTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deletePlanWorkingTeam.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deletePlanWorkingTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetPlanWorkingTeamForm,
    resetMessage,
    resetError,
} = colorSlice.actions;

export default colorSlice.reducer;
