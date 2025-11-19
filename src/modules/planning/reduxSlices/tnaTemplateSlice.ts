// src/features/tnaTemplate/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfTnaTemplateDetailStore, getAllTnaTemplateTask, removeTnaTemplateDetailByID, saveTnaTemplateDetail, saveTnaTempateTaskData, } from "../../../app/idb/planning/tnaTemplateOperations";
import { TnaTemplateState, ITnaTemplateTask, ITnaTemplateMaster } from "../pages/tnaTemplateSetup/tnaTemplate.interface";
import { string } from "zod";

const initialState: TnaTemplateState = {
    tnaTemplates: [],
    isIndexDBStoreUpdated: JSON.parse(localStorage.getItem("isTnaTemplateTaskIndexDBStoreUpdated") || "false"),
    tnaTemplateTasks: [],
    templateName: "",
    tnaTemplateTask: {
        changeBy: 0,
        p_date_db_prev_string: "",
        changingDate: null,
        isDependentChangeBy: false,
        dependentTaskBack: "",
        p_date_db: "",
        p_date_db_prev: null,
        p_date_db_real: null,
        presetDate: null,
        taskId: 0,
        templateCode: "",
        templateName: "",
        taskCode: "",
        companyId: 0,
        departmentId: 0,
        dependentTaskBackId: null,
        dependentTaskFrontId: null,
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
        taskGroupId: 0,
        taskName: "",
        taskType: "",
        teamId: 0,
    },
    tnaTemplate: {
        code: '',
        name: '',
        id: 0,
        buyerId: null, stylId: null, leadTime: null,
        createdBy: "", createdDate: "", updateBy: null, updatedDate: null, lead_time: null, companyId: 0
    },
    isUpdateMode: false,
    paginationObject: createInitialPaginationObject<ITnaTemplateMaster>(),
    loading: false,
    error: null,
    filteredTnaTemplate: [],
    status: "idle",
    message: "",
};


export const fetchAllTnaTemplate = createAsyncThunk(
    "tnaTemplate/fetchAllTnaTemplate",
    async ({ companyId }: { companyId: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/tna-template/list?companyId=${companyId}`
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


export const fetchAllTnaTemplateDetailsFromIDX = createAsyncThunk(
    "tnaTemplate/fetchAllTnaTemplateDetailsFromIDX",
    async (_, { rejectWithValue }) => {
        try {
            {
                const data = await getAllTnaTemplateTask();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const deleteTnaTemplateDetailsFromIDX = createAsyncThunk(
    "tnaTemplate/deleteTnaTemplateDetailsFromIDX",
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            await removeTnaTemplateDetailByID(id);
            const data = await getAllTnaTemplateTask();
            return data;

        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchTnaTemplateDetail = createAsyncThunk(
    "tnaTemplate/fetchTnaTemplateDetail",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tna-template/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaTemplateDetailsByLeadTime = createAsyncThunk(
    "tnaTemplate/fetchTnaTemplateDetailsByLeadTime",
    async ({ leadTime, companyId }: { leadTime: number, companyId: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tna-template/task-by-leadtime/${leadTime}?companyId=${companyId}`);
            await saveTnaTempateTaskData(response.data, true);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const saveTnaTemplateDetailToIndexDB = createAsyncThunk(
    "tnaTemplate/saveTnaTemplateDetailToIndexDB",
    async (task: ITnaTemplateTask, { rejectWithValue }) => {
        try {
            await saveTnaTemplateDetail(task);
            return "Saved to Local DB";
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const bulkSaveTnaTemplateTaskToIndexDB = createAsyncThunk<
    ITnaTemplateTask[],      // return type
    ITnaTemplateTask[]       // argument type
>(
    "tnaTemplate/bulkSaveTnaTemplateTaskToIndexDB",
    async (tasks, { rejectWithValue }) => {
        try {
            await saveTnaTempateTaskData(tasks);
            const data = await getAllTnaTemplateTask();
            return data; // always array, never string
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);


// Async thunk for deleting a session
export const deleteTnaTemplateTask = createAsyncThunk(
    "tnaTemplate/deleteTnaTemplateTask",
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

export const bulkTemplateTaskSaveToDB = createAsyncThunk<
    string,       // return type
    { companyId: number; tasks: ITnaTemplateTask[]; templateName: string }   // argument type
>(
    "tnaTemplate/bulkSaveToDB",
    async ({ companyId, tasks, templateName }, { rejectWithValue }) => {
        try {
            // Include tasks in the request body
            const data = tasks.map(task => ({
                ...task,
                durationDifferent: task.leadTime,
                templateName,
                companyId
            }));

            const response = await axiosInstance.post(`/tna-template/bulk`, data);
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
    name: "tnaTemplate",
    initialState,
    reducers: {
        setTnaTaskFieldByIndex(
            state: TnaTemplateState,
            action: PayloadAction<{ index: number }>
        ) {
            const { index } = action.payload;
            state.tnaTemplateTask = { ...state.tnaTemplateTasks[index] };
            state.isUpdateMode = true;
        },
        updateTnaTemplateTaskField<K extends keyof ITnaTemplateTask>(
            state: TnaTemplateState,
            action: PayloadAction<{ key: K; value: ITnaTemplateTask[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;

            if (key === "dependentTaskBackId") {
                state.tnaTemplateTask.dependentTaskBackId = value ? Number(value) : null;
                state.tnaTemplateTask.dependentTaskBack = displayVal || "";
                state.tnaTemplateTask.dependOn = displayVal || "";
            }
            if (key === "templateName") {
                state.templateName = String(value);
            }
            else if (key === "dependentTaskFrontId") {
                state.tnaTemplateTask.dependentTaskFrontId = value ? Number(value) : null;
                state.tnaTemplateTask.dependentTaskFront = displayVal || "";
                state.tnaTemplateTask.dependOn = displayVal || "";
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
                state.tnaTemplateTask[key] = (value ? Number(value) : 0) as ITnaTemplateTask[K];
            }
            else if (key === "leadTime") {
                state.tnaTemplateTask.leadTime = value ? Number(value) : 0;
                state.tnaTemplateTask.offsetTime = value ? Number(value) : 0;
            }
            else if (key === "taskGroupId") {
                state.tnaTemplateTask.taskGroupId = value ? Number(value) : 0;
                state.tnaTemplateTask.taskGroupName = displayVal || "";
            }
            else if (key === "teamId") {
                state.tnaTemplateTask.teamId = value ? Number(value) : 0;
                state.tnaTemplateTask.teamName = displayVal || "";
            }
            else {
                state.tnaTemplateTask[key] = value;
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
        clearTnaTemplateState(state) {
            return {
                ...initialState,
                tnaTasks: state.tnaTemplateTasks,
                isUpdateMode: false,
                isIndexDBStoreUpdated: state.isIndexDBStoreUpdated,
                tnaTemplates: state.tnaTemplates
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTnaTemplate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnaTemplate.fulfilled,
                (state, action: PayloadAction<ITnaTemplateMaster[]>) => {
                    state.tnaTemplates = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnaTemplate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllTnaTemplateDetailsFromIDX.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnaTemplateDetailsFromIDX.fulfilled,
                (state, action: PayloadAction<ITnaTemplateTask[]>) => {
                    state.tnaTemplateTasks = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnaTemplateDetailsFromIDX.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaTemplateDetailsByLeadTime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaTemplateDetailsByLeadTime.fulfilled,
                (state, action: PayloadAction<ITnaTemplateTask[]>) => {
                    state.tnaTemplateTasks = action.payload;
                    state.isIndexDBStoreUpdated = false;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaTemplateDetailsByLeadTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(bulkSaveTnaTemplateTaskToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                bulkSaveTnaTemplateTaskToIndexDB.fulfilled,
                (state, action: PayloadAction<ITnaTemplateTask[]>) => {
                    state.tnaTemplateTasks = action.payload;
                    state.loading = false;
                }
            )
            .addCase(bulkSaveTnaTemplateTaskToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteTnaTemplateDetailsFromIDX.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTnaTemplateDetailsFromIDX.fulfilled,
                (state, action: PayloadAction<ITnaTemplateTask[]>) => {
                    state.tnaTemplateTasks = action.payload;
                    state.loading = false;
                }
            )
            .addCase(deleteTnaTemplateDetailsFromIDX.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaTemplateDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaTemplateDetail.fulfilled,
                (state, action: PayloadAction<ITnaTemplateTask[]>) => {
                    state.tnaTemplateTasks = action.payload;
                    state.isUpdateMode = true;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaTemplateDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(saveTnaTemplateDetailToIndexDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                saveTnaTemplateDetailToIndexDB.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(saveTnaTemplateDetailToIndexDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteTnaTemplateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTnaTemplateTask.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteTnaTemplateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(bulkTemplateTaskSaveToDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                bulkTemplateTaskSaveToDB.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(bulkTemplateTaskSaveToDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetTnaTemplateDetailForm,
    resetMessage,
    resetError,
    updateTnaTemplateTaskField,
    setTnaTaskFieldByIndex,
    clearTnaTemplateState
} = colorSlice.actions;

export default colorSlice.reducer;
