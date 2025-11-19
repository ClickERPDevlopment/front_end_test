import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
    checkIfTnaDashboardStore,
    getFirstTnaDashboardData,
    saveTnaDashboard,
} from "../../../app/idb/planning/tnaDashboardOperations";
import { DashboardConfig, DashboardConfigState } from "../../../types/global";

const initialState: DashboardConfigState = {
    config: { id: 0, is_default: false, items: [], name: "", user_id: 0 },
    configList: [],
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

export const fetchTNADasboardConfig = createAsyncThunk(
    "tnaDashboard/fetchTNADasboardConfig",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getFirstTnaDashboardData();
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const saveTnaDashboardToIndexDB = createAsyncThunk(
    "tnaDashboard/saveTnaDashboardToIndexDB",
    async (dashboard: DashboardConfig, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfTnaDashboardStore();
            if (!hasData) {
                await saveTnaDashboard(dashboard);
                const response = await getFirstTnaDashboardData();
                return response;
            } else {
                const data = await getFirstTnaDashboardData();
                return data;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateTNADashboardConfig = createAsyncThunk(
    "tnaDashboard/updateTNADashboardConfig",
    async (dashboard: DashboardConfig, { rejectWithValue }) => {
        try {

            await saveTnaDashboard(dashboard);
            const response = await getFirstTnaDashboardData();
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const dashboardSlice = createSlice({
    name: "tnaDashboard",
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
            .addCase(fetchTNADasboardConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTNADasboardConfig.fulfilled,
                (state, action: PayloadAction<DashboardConfig | undefined>) => {
                    if (action.payload) {
                        state.config = action.payload;
                    } else {
                        // fallback if no data found in IndexedDB
                        state.config = {
                            id: 0,
                            user_id: 0,
                            name: "Default Dashboard",
                            is_default: true,
                            items: [],
                        };
                    }
                    state.loading = false;
                }
            )
            .addCase(fetchTNADasboardConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(saveTnaDashboardToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                saveTnaDashboardToIndexDB.fulfilled,
                (state, action: PayloadAction<DashboardConfig | undefined>) => {
                    if (action.payload) {
                        state.config = action.payload;
                    } else {
                        // fallback if no data found in IndexedDB
                        state.config = {
                            id: 0,
                            user_id: 0,
                            name: "Default Dashboard",
                            is_default: true,
                            items: [],
                        };
                    }
                    state.loading = false;
                }
            )
            .addCase(saveTnaDashboardToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateTNADashboardConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateTNADashboardConfig.fulfilled,
                (state, action: PayloadAction<DashboardConfig | undefined>) => {
                    if (action.payload) {
                        state.config = action.payload;
                    } else {
                        // fallback if no data found in IndexedDB
                        state.config = {
                            id: 0,
                            user_id: 0,
                            name: "Default Dashboard",
                            is_default: true,
                            items: [],
                        };
                    }
                    state.loading = false;
                }
            )
            .addCase(updateTNADashboardConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetForm, resetMessage, resetError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
