// src/features/tnaTask/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfTnaTaskTypeStore, getAllTnaTaskType, removeTnaTaskTypeByID, saveTnaTaskType, saveTnaTaskTypeData, } from "../../../app/idb/planning/tnaTaskOperations";
import { ITnaTaskTypeState, ITnaTask, TnaTaskValidationErrors, } from "../pages/tnaTaskSetup/tnaTaskType.interface";

const initialState: ITnaTaskTypeState = {
    tnaTasks: [],
    isIndexDBStoreUpdated: JSON.parse(localStorage.getItem("isTnaTaskIndexDBStoreUpdated") || "false"),
    tnaTask: {
        companyId: 0,
        departmentId: 0,
        dependentTaskBackId: 0,
        dependentTaskFrontId: 0,
        durationDifferent: 0,
        dependOn: "",
        taskGroupName: "",
        teamName: "",
        durationType: "",
        emailAddress: "",
        fakeId: 0,
        id: 0,
        isActive: "1",
        isAuto: "1",
        isCritical: "1",
        isDyeingEnd: "1",
        isDyeingStart: "1",
        isEnd: "1",
        isKnittingEnd: "1",
        isKnittingStart: "1",
        isManual: "1",
        isStart: "1",
        isSwEnd: "1",
        isSwStart: "1",
        isYarnEnd: "1",
        isYarnStart: "1",
        leadTime: 0,
        offsetTime: 0,
        relatedTaskId: 0,
        remarks: "",
        sortBy: 0,
        standardDuration: 0,
        taskAfterId: 0,
        taskCode: "",
        taskGroupId: 0,
        taskName: "",
        taskType: "",
        teamId: 0,
    },
    isUpdateMode: false,
    paginationObject: createInitialPaginationObject<ITnaTask>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: "",
};


export const fetchAllTnaTaskTypes = createAsyncThunk<
    ITnaTask[], // return type
    { companyId: number } // argument type
>(
    "tnaTask/fetchAllTnaTaskTypes",
    async ({ companyId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tna-task/list?companyId=${companyId}`);
            await saveTnaTaskTypeData(response.data, true);

            return response.data;

        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllTnaTaskTypesFromIDX = createAsyncThunk(
    "tnaTask/fetchAllTnaTaskTypesFromIDX",
    async (_, { rejectWithValue }) => {
        try {
            {
                const data = await getAllTnaTaskType();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const deleteTnaTaskTypesFromIDX = createAsyncThunk(
    "tnaTask/deleteTnaTaskTypesFromIDX",
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            await removeTnaTaskTypeByID(id);
            const data = await getAllTnaTaskType();
            return data;
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchTnaTaskType = createAsyncThunk(
    "tnaTask/fetchTnaTaskType",
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

export const saveTnaTaskTypeToIndexDB = createAsyncThunk(
    "tnaTask/saveTnaTaskTypeToIndexDB",
    async (task: ITnaTask, { rejectWithValue }) => {
        try {
            await saveTnaTaskType(task);
            return "Saved to Local DB";
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const bulkSaveTnaTaskTypeToIndexDB = createAsyncThunk<
    ITnaTask[],      // return type
    ITnaTask[]       // argument type
>(
    "tnaTask/bulkSaveTnaTaskTypeToIndexDB",
    async (tasks, { rejectWithValue }) => {
        try {

            await saveTnaTaskTypeData(tasks);
            const data = await getAllTnaTaskType();
            return data; // always array, never string
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const bulkSaveToDB = createAsyncThunk<
    string,       // return type
    { companyId: number; tasks: ITnaTask[] }   // argument type
>(
    "tnaTask/bulkSaveToDB",
    async ({ companyId, tasks }, { rejectWithValue }) => {
        try {
            // Include tasks in the request body
            const data = tasks.map(task => ({
                ...task,
                durationDifferent: task.leadTime,
                companyId
            }));

            const response = await axiosInstance.post(`/tna-task/bulk`, data);
            localStorage.removeItem("isTnaTaskIndexDBStoreUpdated");
            // Return something of type string
            return response.data; // or response.data if it's a string
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

const colorSlice = createSlice({
    name: "tnaTask",
    initialState,
    reducers: {
        setTnaTaskFieldByID(
            state: ITnaTaskTypeState,
            action: PayloadAction<{ id: number }>
        ) {
            const { id } = action.payload;

            const task = state.tnaTasks.find(t => t.id === id);

            if (task) {
                state.tnaTask = { ...task };
                state.isUpdateMode = true;
            } else {
                // Optionally, handle the case if task not found
                console.warn(`Task with id ${id} not found`);
            }
        },
        updateTnaTaskField<K extends keyof ITnaTask>(
            state: ITnaTaskTypeState,
            action: PayloadAction<{ key: K; value: ITnaTask[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;

            if (key === "dependentTaskBackId") {
                state.tnaTask.dependentTaskBackId = value ? Number(value) : null;
                state.tnaTask.dependentTaskBack = displayVal || "";
                state.tnaTask.dependOn = displayVal || "";
                state.tnaTask.dependentTaskFrontId = 0;
                state.tnaTask.dependentTaskFront = "";
            }
            else if (key === "dependentTaskFrontId") {
                state.tnaTask.dependentTaskFrontId = value ? Number(value) : null;
                state.tnaTask.dependentTaskFront = displayVal || "";
                state.tnaTask.dependOn = displayVal || "";
                state.tnaTask.dependentTaskBackId = 0;
                state.tnaTask.dependentTaskBack = "";
            }
            else if (
                [
                    "standardDuration",
                    "durationDifferent",
                    "taskAfterId",
                    "offsetTime",
                    "relatedTaskId",
                    "departmentId",
                    "companyId",
                    "fakeId",
                ].includes(key as string)
            ) {
                state.tnaTask[key] = (value ? Number(value) : 0) as ITnaTask[K];
            }
            else if (key === "leadTime") {
                state.tnaTask.leadTime = value ? Number(value) : 0;
                state.tnaTask.offsetTime = value ? Number(value) : 0;
            }
            else if (key === "taskGroupId") {
                state.tnaTask.taskGroupId = value ? Number(value) : 0;
                state.tnaTask.taskGroupName = displayVal || "";
            }
            else if (key === "teamId") {
                state.tnaTask.teamId = value ? Number(value) : 0;
                state.tnaTask.teamName = displayVal || "";
            }
            else {
                state.tnaTask[key] = value;
            }
        },
        resetForm(state) {
            Object.assign(state, initialState);
        },
        resetMessage(state) {
            state.message = "";
        },
        resetError(state) {
            state.error = null;
        },
        clearTaskState(state) {
            return {
                ...initialState,
                tnaTasks: state.tnaTasks,
                isUpdateMode: false,
                isIndexDBStoreUpdated: state.isIndexDBStoreUpdated
            };
        },
        setTnaTaskValidationErrors(
            state,
            action: PayloadAction<TnaTaskValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        setIndexDBUpdated(state, action: PayloadAction<boolean>) {
            state.isIndexDBStoreUpdated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAllTnaTaskTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnaTaskTypes.fulfilled,
                (state, action: PayloadAction<ITnaTask[]>) => {
                    state.tnaTasks = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnaTaskTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllTnaTaskTypesFromIDX.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnaTaskTypesFromIDX.fulfilled,
                (state, action: PayloadAction<ITnaTask[]>) => {
                    state.tnaTasks = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnaTaskTypesFromIDX.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(bulkSaveTnaTaskTypeToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                bulkSaveTnaTaskTypeToIndexDB.fulfilled,
                (state, action: PayloadAction<ITnaTask[]>) => {
                    state.tnaTasks = action.payload;
                    state.isIndexDBStoreUpdated = true;
                    state.loading = false;
                }
            )
            .addCase(bulkSaveTnaTaskTypeToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTnaTaskTypesFromIDX.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTnaTaskTypesFromIDX.fulfilled,
                (state, action: PayloadAction<ITnaTask[]>) => {

                    state.tnaTasks = [...action.payload];
                    state.isIndexDBStoreUpdated = true;
                    state.loading = false;
                }
            )
            .addCase(deleteTnaTaskTypesFromIDX.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchTnaTaskType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaTaskType.fulfilled,
                (state, action: PayloadAction<ITnaTask>) => {
                    state.tnaTask = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaTaskType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(saveTnaTaskTypeToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                saveTnaTaskTypeToIndexDB.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.isIndexDBStoreUpdated = true;
                    // state.message = action.payload;
                }
            )
            .addCase(saveTnaTaskTypeToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(bulkSaveToDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                bulkSaveToDB.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.isIndexDBStoreUpdated = false;
                    state.message = action.payload;
                }
            )
            .addCase(bulkSaveToDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const {
    resetForm: resetTnaTaskTypeForm,
    resetMessage,
    resetError,
    updateTnaTaskField,
    setTnaTaskFieldByID,
    clearTaskState,
    setTnaTaskValidationErrors,
    setIndexDBUpdated
} = colorSlice.actions;

export default colorSlice.reducer;
