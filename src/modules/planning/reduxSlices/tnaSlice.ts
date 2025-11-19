// src/features/tna/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, DurationType, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfTnaStore, getAllTna, getAllTnaCriticalPendingJobList, getAllTnaMissingActualDateTaskList, getAllTnaPendingJobList, getAllTnaPendingRequestList, saveTnaData, saveTnaMissingActualDateTask, saveTnaPendingJob, saveTnaPendingRequest, } from "../../../app/idb/planning/tnaOperations";
import { IBuyerPOResponse, ITNAState, ITnaDetails, ITnaMaster, IPOItem, IPOStyle, IOptionDTo, IPendingJobsBuyerStyleTask, IPendingJob, IPendingRequest, IMissingActualDate } from "../pages/tnaSetup/tna.interface";
import { formatDate } from "@/utils/dateUtil";

const initialState: ITNAState = {
    isTnaPendingJobSavedToIndexDB: JSON.parse(localStorage.getItem("isTnaPendingJobSavedToIndexDB") || "false"),
    isTnaPendingRequestSavedToIndexDB: JSON.parse(localStorage.getItem("isTnaPendingRequestSavedToIndexDB") || "false"),
    isTnaMissingActualDateSavedToIndexDB: JSON.parse(localStorage.getItem("isTnaMissingActualDateSavedToIndexDB") || "false"),
    missingActualDateTaskList: [],
    tnaBuyerList: [],
    tnaTeamMemberList: [],
    missingActualDateTaskLoading: false,
    buyerPoLoading: false,
    poItemLoading: false,
    tnaTaskListLoading: false,
    tnaJobListLoading: false,
    filterTnaLoading: false,
    tnaListLoading: false,
    pendingJobLoading: false,
    pendingRequestLoading: false,
    tnaList: [],
    criticalPendingJobs: [],
    pendingRequests: [],
    pendingPoStyleList: [],
    pendingJobsBuyerStyleTask: { buyers: [], styles: [], tasks: [] },
    tnaTaskList: [],
    poItemList: [],
    tnaJobList: [],
    pendingJobs: [],
    buyerPOResponse: { buyer: [], po: [], style: [] },
    filteredTna: [],
    tna: {
        buyerId: 0,
        buyerName: "",
        embellishmentType: "",
        fabricSource: "",
        itemType: "",
        reqGreyFabric: "",
        styleNo: "",
        templateName: "",
        companyNo: 0,
        id: 0,
        isDone: "1",
        isEnd: "1",
        isHold: "1",
        isStart: "1",
        jobNumber: "",
        leadTime: 0,
        pono: "",
        poQty: 0,
        poRcvDate: "",
        poShipDate: "",
        processSection: "",
        sewingEnd: "",
        sewingStart: "",
        templateId: 0,
        uniqueNumber: 0,
    },
    paginationObject: createInitialPaginationObject<ITnaMaster>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedTnas = createAsyncThunk(
    "tna/fetchPaginatedTnas",
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

export const fetchBuyerPO = createAsyncThunk(
    'tna/fetchBuyerPO',
    async (params: {
        buyerId?: number;
        orderPlacement?: string;
        orderPlacementTo?: string;
        dependFactoryId?: number;
        noFactoryDepend?: boolean;
    }) => {
        const response = await axiosInstance.get('/tna/pending-buyer-style-po-for-tna', {
            params,
        });
        return response.data;
    }
);

export const fetchTnaPendingPO = createAsyncThunk(
    'tna/fetchTnaPendingPO',
    async (params: {
        buyerId?: number;
        orderPlacement?: string;
        orderPlacementTo?: string;
        dependFactoryId?: number;
        noFactoryDepend?: boolean;
    }) => {
        const response = await axiosInstance.get('/tna/pending-buyer-style-po-for-tna', {
            params,
        });
        return response.data;
    }
);

export const fetchTnaPendingStyleDeliveryListByPO = createAsyncThunk(
    'tna/fetchTnaPendingStyleDeliveryListByPO',
    async (params: {
        pono: string;
        companyId: string;
    }) => {
        const response = await axiosInstance.get('/tna/pending-tna-style-delivery-date-by-po', {
            params,
        });
        return response.data;
    }
);

export const fetchTnaJobList = createAsyncThunk(
    'tna/fetchTnaJobList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get('/tna/user-job-list');
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaBuyerList = createAsyncThunk(
    'tna/fetchTnaBuyerList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get('/tna/user-buyer-list');
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaResponsibleTeamMemberList = createAsyncThunk(
    'tna/fetchTnaResponsibleTeamMemberList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get('/tna/team-member-list');
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaPendingJobBuyerStyleTaskList = createAsyncThunk(
    'tna/fetchTnaPendingJobBuyerStyleTaskList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post('/tna/pending-jobs-buyer-style-task',
                {
                    // "PlacementMonthFrom": "2025-08",
                    // "PlacementMonthTo": "2025-08",
                    // "CompanyId": 10
                }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaPendingJobList = createAsyncThunk(
    'tna/fetchTnaPendingJobList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post('/tna/pending-jobs', {
            });

            await saveTnaPendingJob(response.data);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaPendingJobListFromIDX = createAsyncThunk(
    'tna/fetchTnaPendingJobListFromIDX',
    async (_, { rejectWithValue }) => {

        try {

            const response = await getAllTnaPendingJobList();
            return response;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaCriticalPendingJobListFromIDX = createAsyncThunk(
    'tna/fetchTnaCriticalPendingJobListFromIDX',
    async (_, { rejectWithValue }) => {

        try {

            const response = await getAllTnaCriticalPendingJobList();
            return response;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaPendingRequestList = createAsyncThunk(
    'tna/fetchTnaPendingRequestList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post('/tna/pending-requests', {
            });

            await saveTnaPendingRequest(response.data);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaPendingRequestListFromIDX = createAsyncThunk(
    'tna/fetchTnaPendingRequestListFromIDX',
    async (_, { rejectWithValue }) => {

        try {

            const response = await getAllTnaPendingRequestList();
            return response;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaMissingActualDateTaskList = createAsyncThunk(
    'tna/fetchTnaMissingActualDateTaskList',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post('/tna/missing-actual-date-list', {
            });

            await saveTnaMissingActualDateTask(response.data);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTnaMissingActualDateTaskListFromIDX = createAsyncThunk(
    'tna/fetchTnaMissingActualDateTaskListFromIDX',
    async (_, { rejectWithValue }) => {

        try {

            const response = await getAllTnaMissingActualDateTaskList();
            return response;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllTnas = createAsyncThunk(
    "tna/fetchAllTnas",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfTnaStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveTnaData(response.data);
                return response.data;
            } else {
                const data = await getAllTna();
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

export const fetchAllTnasJson = createAsyncThunk(
    "tna/fetchAllTnasJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfTnaStore();
            if (!hasData) {
                const res = await fetch("/data/color_list.json");
                if (!res.ok) throw new Error("Failed to load buyers.json");

                const response: ITnaMaster[] = await res.json();
                await saveTnaData(response);
                return response;
            } else {
                const data = await getAllTna();
                return data;
            }
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchTna = createAsyncThunk(
    "tna/fetchTna",
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

export const createTna = createAsyncThunk(
    "tna/createTna",
    async (formState: Omit<ITnaMaster, "id">, { rejectWithValue }) => {
        try {
            const {
                buyerId,
                companyNo,
                isDone,
                isEnd,
                isHold,
                isStart,
                jobNumber,
                leadTime,
                poQty,
                poRcvDate,
                poShipDate,
                pono,
                processSection,
                sewingEnd,
                sewingStart,
                templateId,
                uniqueNumber,
            } = formState;

            const data = {
                buyerId: buyerId,
                companyNo: companyNo,
                isDone: isDone,
                isEnd: isEnd,
                isHold: isHold,
                isStart: isStart,
                jobNumber: jobNumber,
                leadTime: leadTime,
                poQty: poQty,
                poRcvDate: poRcvDate,
                poShipDate: poShipDate,
                pono: pono,
                processSection: processSection,
                sewingEnd: sewingEnd,
                templateId: templateId,
                sewingStart: sewingStart,
                uniqueNumber: uniqueNumber,
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
export const updateTna = createAsyncThunk(
    "tna/updateTna",
    async (formState: ITnaMaster, { rejectWithValue }) => {
        try {
            const {
                buyerId,
                companyNo,
                isDone,
                isEnd,
                isHold,
                isStart,
                jobNumber,
                leadTime,
                poQty,
                poRcvDate,
                poShipDate,
                pono,
                processSection,
                sewingEnd,
                sewingStart,
                templateId,
                uniqueNumber,
                id,
            } = formState;

            const data = {
                id: id,
                buyerId: buyerId,
                companyNo: companyNo,
                isDone: isDone,
                isEnd: isEnd,
                isHold: isHold,
                isStart: isStart,
                jobNumber: jobNumber,
                leadTime: leadTime,
                poQty: poQty,
                poRcvDate: poRcvDate,
                poShipDate: poShipDate,
                pono: pono,
                processSection: processSection,
                sewingEnd: sewingEnd,
                templateId: templateId,
                sewingStart: sewingStart,
                uniqueNumber: uniqueNumber,
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
export const deleteTna = createAsyncThunk(
    "tna/deleteTna",
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

// helper function for recursive backtracking
const backTracking = (
    tasks: ITnaDetails[],
    id: number,
    relationOffset: number,
    condition: boolean,
    standardDuration: number
): ITnaDetails[] => {
    let updatedTasks = [...tasks];

    const offset = condition ? relationOffset : 0;

    for (let i = 0; i < updatedTasks.length; i++) {
        const task = updatedTasks[i];

        if ((Number(task.dependentTaskBackId) + Number(task.dependentTaskFrontId)) === id) {
            // debugger
            // if (task.leadTime > 0 && task.leadTime !== standardDuration) {
            const newDate = task.p_date_db_real ? new Date(task.p_date_db_real) : null;
            if (newDate) {
                newDate.setDate(newDate.getDate() + offset);

                updatedTasks[i] = {
                    ...task,
                    p_date_db_real: formatDate(newDate.toLocaleDateString() || "", 'db_format'),
                    leadTime: task.leadTime + offset,
                    p_date_db: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`,
                };
            }
            // }

            // recursive call
            updatedTasks = backTracking(
                updatedTasks,
                task.id,
                offset,
                true,
                standardDuration
            );
        }
    }

    return updatedTasks;
};

const colorSlice = createSlice({
    name: "tna",
    initialState,
    reducers: {
        setTnaDetails(
            state: ITNAState,
            action: PayloadAction<{ data: ITnaDetails[] }>
        ) {
            const { data } = action.payload;
            state.tnaTaskList = [...data];
        },
        setTnaDateChange(
            state: ITNAState,
            action: PayloadAction<{ index: number, newDate: string }>
        ) {
            const { index, newDate } = action.payload;
            const updatedTasks = [...state.tnaTaskList];
            if (updatedTasks.length === 0) return;

            updatedTasks[index].p_date_db_real = newDate;

            // recalc duration difference → OffsetMutate equivalent
            const id = updatedTasks[index].id;
            const t = updatedTasks[index];

            const date1 = t.p_date_db_real && new Date(t.p_date_db_real);
            const date2 = t.p_date_db_prev && new Date(t.p_date_db_prev);
            debugger
            if (date1 && date2) {
                const diffTime = date1.getTime() - date2.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                updatedTasks[index].leadTime = t.leadTime + diffDays;
                updatedTasks[index].p_date_db_prev = newDate;

                // recursive dependency update
                const finalTasks = backTracking([...updatedTasks], id, diffDays, true, t.standardDuration);
                state.tnaTaskList = finalTasks;
                // return finalTasks;
            }

        },
        setTnaMasterField(
            state: ITNAState,
            action: PayloadAction<{ index: number }>
        ) {
            const { index } = action.payload;

        },
        updateTnaTaskField<K extends keyof ITnaDetails>(
            state: ITNAState,
            action: PayloadAction<{ key: K; value: ITnaDetails[K]; displayVal?: string }>
        ) {
            const { key, value, displayVal } = action.payload;

        },
        updatePOStyleField<K extends keyof IPOStyle>(
            state: ITNAState,
            action: PayloadAction<{ key: K; value: IPOStyle[K]; index: number }>
        ) {
            const { key, value, index } = action.payload;
            state.pendingPoStyleList[index][key] = value
        },
        updateTnaMasterByPOStyleIndex(
            state: ITNAState,
            action: PayloadAction<{ index: number }>
        ) {
            const { index } = action.payload;
            const {
                BuyerId, BuyerName, DeliveryDate, FabricSource, ReqGreyFabric,
                ItemType, SewingStart, SewingEnd, StyleNo,
                StyleId, PoQty, Pono, PoReceiveDate } = state.pendingPoStyleList[index];

            state.tna.buyerId = BuyerId;
            state.tna.buyerName = BuyerName;
            state.tna.embellishmentType = "";
            state.tna.itemType = ItemType;
            state.tna.fabricSource = String(FabricSource);
            state.tna.jobNumber = Pono;
            state.tna.leadTime = 0;
            state.tna.pono = Pono;
            state.tna.poRcvDate = formatDate(String(PoReceiveDate), "db_format");;
            state.tna.poShipDate = formatDate(DeliveryDate, "db_format");
            state.tna.poQty = PoQty;
            state.tna.styleNo = String(StyleNo);
            state.tna.reqGreyFabric = ReqGreyFabric ? String(ReqGreyFabric) : "";
            state.tna.sewingEnd = formatDate(String(SewingEnd), "db_format");
            state.tna.sewingStart = formatDate(String(SewingStart), "db_format");
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedTnas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedTnas.fulfilled,
                (state, action: PayloadAction<PaginationObject<ITnaMaster>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedTnas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchBuyerPO.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchBuyerPO.fulfilled,
                (state, action: PayloadAction<IBuyerPOResponse>) => {
                    state.buyerPOResponse = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchBuyerPO.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaPendingPO.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingPO.fulfilled,
                (state, action: PayloadAction<IPOItem[]>) => {
                    state.poItemList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaPendingPO.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaPendingStyleDeliveryListByPO.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingStyleDeliveryListByPO.fulfilled,
                (state, action: PayloadAction<IPOStyle[]>) => {
                    state.pendingPoStyleList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaPendingStyleDeliveryListByPO.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllTnas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnas.fulfilled,
                (state, action: PayloadAction<ITnaMaster[]>) => {
                    state.tnaList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchTnaJobList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaJobList.fulfilled,
                (state, action: PayloadAction<IOptionDTo[]>) => {
                    state.tnaJobList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaJobList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaBuyerList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaBuyerList.fulfilled,
                (state, action: PayloadAction<IOptionDTo[]>) => {
                    state.tnaBuyerList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaBuyerList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaResponsibleTeamMemberList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaResponsibleTeamMemberList.fulfilled,
                (state, action: PayloadAction<IOptionDTo[]>) => {
                    state.tnaTeamMemberList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaResponsibleTeamMemberList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchTnaPendingJobBuyerStyleTaskList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingJobBuyerStyleTaskList.fulfilled,
                (state, action: PayloadAction<IPendingJobsBuyerStyleTask>) => {
                    state.pendingJobsBuyerStyleTask = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTnaPendingJobBuyerStyleTaskList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchTnaPendingJobList.pending, (state) => {
                state.pendingJobLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingJobList.fulfilled,
                (state, action: PayloadAction<IPendingJob[]>) => {
                    state.pendingJobs = action.payload;
                    state.isTnaPendingJobSavedToIndexDB = true;
                    state.pendingJobLoading = false;
                }
            )
            .addCase(fetchTnaPendingJobList.rejected, (state, action) => {
                state.pendingJobLoading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchTnaPendingJobListFromIDX.pending, (state) => {
                state.pendingJobLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingJobListFromIDX.fulfilled,
                (state, action: PayloadAction<IPendingJob[]>) => {
                    state.pendingJobs = action.payload;
                    state.pendingJobLoading = false;
                }
            )
            .addCase(fetchTnaPendingJobListFromIDX.rejected, (state, action) => {
                state.pendingJobLoading = false;
                state.error = action.payload as string;
            })

             .addCase(fetchTnaCriticalPendingJobListFromIDX.pending, (state) => {
                state.pendingJobLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaCriticalPendingJobListFromIDX.fulfilled,
                (state, action: PayloadAction<IPendingJob[]>) => {
                    state.criticalPendingJobs = action.payload;
                    state.pendingJobLoading = false;
                }
            )
            .addCase(fetchTnaCriticalPendingJobListFromIDX.rejected, (state, action) => {
                state.pendingJobLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaPendingRequestList.pending, (state) => {
                state.pendingRequestLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingRequestList.fulfilled,
                (state, action: PayloadAction<IPendingRequest[]>) => {
                    state.pendingRequests = action.payload;
                    state.isTnaPendingRequestSavedToIndexDB = true;
                    state.pendingRequestLoading = false;
                }
            )
            .addCase(fetchTnaPendingRequestList.rejected, (state, action) => {
                state.pendingRequestLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaPendingRequestListFromIDX.pending, (state) => {
                state.pendingRequestLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaPendingRequestListFromIDX.fulfilled,
                (state, action: PayloadAction<IPendingRequest[]>) => {
                    state.pendingRequests = action.payload;
                    state.pendingRequestLoading = false;
                }
            )
            .addCase(fetchTnaPendingRequestListFromIDX.rejected, (state, action) => {
                state.pendingRequestLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaMissingActualDateTaskList.pending, (state) => {
                state.missingActualDateTaskLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaMissingActualDateTaskList.fulfilled,
                (state, action: PayloadAction<IMissingActualDate[]>) => {
                    state.missingActualDateTaskList = action.payload;
                    state.isTnaMissingActualDateSavedToIndexDB = true;
                    state.missingActualDateTaskLoading = false;
                }
            )
            .addCase(fetchTnaMissingActualDateTaskList.rejected, (state, action) => {
                state.missingActualDateTaskLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTnaMissingActualDateTaskListFromIDX.pending, (state) => {
                state.missingActualDateTaskLoading = true;
                state.error = null;
            })
            .addCase(
                fetchTnaMissingActualDateTaskListFromIDX.fulfilled,
                (state, action: PayloadAction<IMissingActualDate[]>) => {
                    state.missingActualDateTaskList = action.payload;
                    state.missingActualDateTaskLoading = false;
                }
            )
            .addCase(fetchTnaMissingActualDateTaskListFromIDX.rejected, (state, action) => {
                state.missingActualDateTaskLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllTnasJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllTnasJson.fulfilled,
                (state, action: PayloadAction<ITnaMaster[]>) => {
                    state.tnaList = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllTnasJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTna.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTna.fulfilled,
                (state, action: PayloadAction<ITnaMaster>) => {
                    state.tna = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTna.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createTna.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createTna.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createTna.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateTna.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateTna.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateTna.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTna.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTna.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteTna.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetTnaForm,
    resetMessage,
    resetError,
    setTnaMasterField,
    updateTnaTaskField,
    updatePOStyleField,
    updateTnaMasterByPOStyleIndex,
    setTnaDetails,
    setTnaDateChange
} = colorSlice.actions;

export default colorSlice.reducer;
