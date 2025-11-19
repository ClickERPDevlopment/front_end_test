import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreateLinePayload, ILine, ILineState, LineValidationErrors, UpdateLinePayload } from "../pages/lineSetup/line.interface";
import { createLine, deleteLine, fetchPagedLines, showLine, updateLine } from "../api/lineAPI";
import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { IFloor } from "../pages/floorSetup/floor.interface";
import { getAllProductionFloor } from "@/app/idb/production/floorOperations";
import { checkIfLineStore, getAllProductionLine, saveLineData } from "@/app/idb/production/lineOperations";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/app/constants";

const initialState: ILineState = {
    line: {
        lineCode: "",
        lineName: "",
        floorName: "",
        chiefSupervisor: "",
        bestFor: "",
        operatorQTY: 0, // Optional, if applicable
        helperQTY: 0, // Optional, if applicable
        groupName: "", // Optional, if applicable
        remarks: "",
        id: 0,
        floorId: 0,
        sortingNo: 0
    },
    lines: [],
    filteredLines: [],
    paginationObject: createInitialPaginationObject<ILine>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};


// Async thunk for fetching buyers
export const fetchPaginatedLines = createAsyncThunk(
    "line/fetchPaginatedLines",
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

export const fetchAllLines = createAsyncThunk(
    "line/fetchAllLines",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfLineStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveLineData(response.data);
                return response.data;
            } else {
                const data = await getAllProductionLine();
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

export const fetchAllLinesJson = createAsyncThunk(
    "line/fetchAllLinesJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfLineStore();

            if (!hasData) {
                // Optional: switch to static JSON instead of API
                const res = await fetch("/data/line_list.json");
                if (!res.ok) throw new Error("Failed to load lines.json");

                const data: ILine[] = await res.json();
                await saveLineData(data);
                return data;
            }

            const cachedData = await getAllProductionLine();
            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const filterLineByFloor = createAsyncThunk(
    "line/filterLineByFloor",
    async ({ floor_id }: { floor_id: string }, { rejectWithValue, dispatch }) => {
        try {
            let allLines: ILine[] = await getAllProductionLine();

            // If no floors found, fetch from JSON and save
            if (allLines.length === 0) {
                const jsonData = await dispatch(fetchAllLinesJson()).unwrap();

                allLines = jsonData;
            }

            const filteredFloors = allLines.filter(
                (line) => line.floorId.toString() === floor_id.toString()
            );

            return filteredFloors;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const filterLinesByStage = createAsyncThunk<
    ILine[], // return type
    { stage_id: number }, // argument type
    { rejectValue: string } // thunkAPI config (optional)
>(
    "floorLine/filterLinesByStage",
    async ({ stage_id }, { dispatch, rejectWithValue }) => {
        try {
            const allFloors: IFloor[] = await getAllProductionFloor();

            //   if (allFloors.length === 0) {
            //     // Call another thunk via dispatch
            //     const result = await dispatch(fetchAllFloors()).unwrap();
            //     // Assuming anotherThunk returns floors or you handle it differently
            //     allFloors = result;
            //   }

            let allLines: ILine[] = await getAllProductionLine();

            if (allLines.length === 0) {
                // Call another thunk via dispatch
                const result = await dispatch(fetchAllLines()).unwrap();
                // Assuming anotherThunk returns floors or you handle it differently
                allLines = result;
            }

            // Filter floors by stage_id
            const filteredFloorIds = allFloors
                .filter((floor) => true)
                .map((floor) => floor.id.toString());

            // Filter lines by filteredFloorIds
            const filteredLines = allLines.filter((line) =>
                filteredFloorIds.includes(line.floorId.toString())
            );

            return filteredLines;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchLine = createAsyncThunk(
    "line/fetchLine",
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

// Fetch paginated
export const getPagedLines = createAsyncThunk<
    PaginationObject<ILine>,
    FetchParams,
    { rejectValue: string }
>("lines/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedLines(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all (non-paginated)
export const getAllLines = createAsyncThunk<
    ILine[],
    void,
    { rejectValue: string }
>("lines/getAll", async (_, thunkAPI) => {
    try {
        return await getAllProductionLine();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all currencies")
        );
    }
});

// Fetch one currency by ID
export const getLine = createAsyncThunk<
    ILine,
    number,
    { rejectValue: string }
>("lines/show", async (id, thunkAPI) => {
    try {
        return await showLine(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new currency
export const addLine = createAsyncThunk<
    { message: string },
    CreateLinePayload,
    { rejectValue: string }
>("lines/add", async (payload, thunkAPI) => {
    try {
        return await createLine(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create currency")
        );
    }
});

// Update currency
export const editLine = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateLinePayload },
    { rejectValue: string }
>("lines/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateLine(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update currency")
        );
    }
});

// Delete currency
export const removeLine = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("lines/delete", async (id, thunkAPI) => {
    try {
        return await deleteLine(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const LineSlice = createSlice({
    name: "lines",
    initialState,
    reducers: {
        updateLineField<K extends keyof ILine>(
            state: ILineState,
            action: PayloadAction<{ key: K; value: ILine[K] }>
        ) {
            const { key, value } = action.payload;
            state.line[key] = value;
        },
        setLineValidationErrors(
            state,
            action: PayloadAction<LineValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearLineValidationErrors(state) {
            state.validationErrors = null;
        },
        clearLineMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                line: state.line,
            };
        },
        clearLineState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedLines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedLines.fulfilled,
                (state, action: PayloadAction<PaginationObject<ILine>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedLines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllLines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllLines.fulfilled,
                (state, action: PayloadAction<ILine[]>) => {
                    state.lines = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllLines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllLinesJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllLinesJson.fulfilled,
                (state, action: PayloadAction<ILine[]>) => {
                    state.lines = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllLinesJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(
                filterLineByFloor.fulfilled,
                (state, action: PayloadAction<ILine[]>) => {
                    state.filteredLines = action.payload;
                }
            )
            .addCase(filterLineByFloor.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(
                filterLinesByStage.fulfilled,
                (state, action: PayloadAction<ILine[]>) => {
                    state.filteredLines = action.payload;
                }
            )
            .addCase(filterLinesByStage.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchLine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchLine.fulfilled,
                (state, action: PayloadAction<ILine>) => {
                    state.line = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchLine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getPagedLines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedLines.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.lines = data;
                state.loading = false;
            })
            .addCase(getPagedLines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllLines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllLines.fulfilled, (state, action) => {
                state.lines = action.payload;
                state.loading = false;
            })
            .addCase(getAllLines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getLine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLine.fulfilled, (state, action) => {
                state.line = action.payload;
                state.loading = false;
            })
            .addCase(getLine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addLine.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addLine.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addLine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })
            .addCase(editLine.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editLine.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editLine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeLine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeLine.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeLine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const {
    updateLineField,
    setLineValidationErrors,
    clearLineValidationErrors,
    clearLineMessages,
    clearLineState,
} = LineSlice.actions;

export default LineSlice.reducer;
