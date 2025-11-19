import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkIfAccountDashboardStore, getFirstAccountDashboardData, saveAccountDashboard, } from "../../../app/idb/accounts/accountDashboardOperations";
import { DashboardConfig, DashboardConfigState } from "../../../types/global";

const initialState: DashboardConfigState = {
    config: { id: 0, is_default: false, items: [], name: "", user_id: 0 },
    configList: [],
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

export const fetchAccountsDasboardConfig = createAsyncThunk(
    "accountDashboard/fetchAccountsDasboardConfig",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getFirstAccountDashboardData();
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const saveAccountDashboardToIndexDB = createAsyncThunk(
    "accountDashboard/saveAccountDashboardToIndexDB",
    async (dashboard: DashboardConfig, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfAccountDashboardStore();
            if (!hasData) {
                await saveAccountDashboard(dashboard);
                const response = await getFirstAccountDashboardData();
                return response;
            } else {
                const data = await getFirstAccountDashboardData();
                return data;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateAccountsDashboardConfig = createAsyncThunk(
    "accountDashboard/updateAccountsDashboardConfig",
    async (dashboard: DashboardConfig, { rejectWithValue }) => {
        try {

            await saveAccountDashboard(dashboard);
            const response = await getFirstAccountDashboardData();
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const dashboardSlice = createSlice({
    name: "accountDashboard",
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
            .addCase(fetchAccountsDasboardConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAccountsDasboardConfig.fulfilled,
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
            .addCase(fetchAccountsDasboardConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(saveAccountDashboardToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                saveAccountDashboardToIndexDB.fulfilled,
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
            .addCase(saveAccountDashboardToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateAccountsDashboardConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateAccountsDashboardConfig.fulfilled,
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
            .addCase(updateAccountsDashboardConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm,
    resetMessage,
    resetError
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
