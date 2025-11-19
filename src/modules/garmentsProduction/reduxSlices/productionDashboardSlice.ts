import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { checkIfProductionDashboardStore, getFirstProductionDashboardData, saveProductionDashboard, } from "../../../app/idb/production/productionDashboardOperations";
import { DashboardConfig, DashboardConfigState } from "../../../types/global";

const initialState: DashboardConfigState = {
    config: { id: 0, is_default: false, items: [], name: "", user_id: 0 },
    configList: [],
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

export const fetchProductionDasboardConfig = createAsyncThunk(
    "productionDashboard/fetchProductionDasboardConfig",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getFirstProductionDashboardData();
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const saveProductionDashboardToIndexDB = createAsyncThunk(
    "productionDashboard/saveProductionDashboardToIndexDB",
    async (dashboard: DashboardConfig, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfProductionDashboardStore();
            if (!hasData) {
                await saveProductionDashboard(dashboard);
                const response = await getFirstProductionDashboardData();
                return response;
            } else {
                const data = await getFirstProductionDashboardData();
                return data;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateProductionDashboardConfig = createAsyncThunk(
    "productionDashboard/updateProductionDashboardConfig",
    async (dashboard: DashboardConfig, { rejectWithValue }) => {
        try {

            await saveProductionDashboard(dashboard);
            const response = await getFirstProductionDashboardData();
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const dashboardSlice = createSlice({
    name: "productionDashboard",
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
            .addCase(fetchProductionDasboardConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchProductionDasboardConfig.fulfilled,
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
            .addCase(fetchProductionDasboardConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(saveProductionDashboardToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                saveProductionDashboardToIndexDB.fulfilled,
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
            .addCase(saveProductionDashboardToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateProductionDashboardConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateProductionDashboardConfig.fulfilled,
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
            .addCase(updateProductionDashboardConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetForm, resetMessage, resetError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
