import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreateFloorPayload, FloorValidationErrors, IFloor, IFloorState, UpdateFloorPayload, } from "../pages/floorSetup/floor.interface";
import { createFloor, deleteFloor, fetchPagedFloors, showFloor, updateFloor, } from "../api/floorAPI";
import { checkIfFloorStore, getAllProductionFloor, saveFloorData, } from "@/app/idb/production/floorOperations";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/app/constants";
import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";

const initialState: IFloorState = {
    floor: {
        floorCode: "",
        floorName: "",
        floorInchargeName: "",
        productionManagerName: "",
        remarks: "",
        id: 0,
        sectionId: 0,
        sectionName: ""
    },
    floors: [
        {
            floorCode: "F-123",
            floorName: "Floor - 1",
            floorInchargeName: "David",
            productionManagerName: "John",
            remarks: "Good",
            id: 1,
            sectionId: 0,
            sectionName: ""
        },
        {
            floorCode: "F-456",
            floorName: "Floor - 2",
            floorInchargeName: "Morris",
            productionManagerName: "Doe",
            remarks: "Excellent",
            id: 2,
            sectionId: 0,
            sectionName: ""
        },
    ],
    filteredFloor: [],
    paginationObject: createInitialPaginationObject<IFloor>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};


export const fetchPaginatedFloors = createAsyncThunk(
    "floor/fetchPaginatedFloors",
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

export const fetchAllFloors = createAsyncThunk(
    "floor/fetchAllFloors",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfFloorStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/floor-list-all`);
                await saveFloorData(response.data);
                return response.data;
            } else {
                const data = await getAllProductionFloor();
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


export const fetchAllFloorsJson = createAsyncThunk(
    "floor/fetchAllFloorsJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfFloorStore();

            if (!hasData) {
                const res = await fetch("/data/floor_list.json");
                if (!res.ok) throw new Error("Failed to load floors.json");

                const data: IFloor[] = await res.json();
                await saveFloorData(data);
                return data;
            }

            const cachedData = await getAllProductionFloor();
            return cachedData;
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);


export const filterFloorBySection = createAsyncThunk(
    "floor/filterFloorBySection",
    async (
        { section_id }: { section_id: number },
        { rejectWithValue, dispatch }
    ) => {
        try {
            let allFloors: IFloor[] = await getAllProductionFloor();

            // If no floors found, fetch from JSON and save
            if (allFloors.length === 0) {
                const jsonData = await dispatch(fetchAllFloorsJson()).unwrap();

                console.log('allFloors', jsonData)
                allFloors = jsonData;
            }

            const filteredFloors = allFloors.filter(
                (floor) => true
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

export const fetchFloor = createAsyncThunk(
    "floor/fetchFloor",
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
export const getPagedFloors = createAsyncThunk<
    PaginationObject<IFloor>,
    FetchParams,
    { rejectValue: string }
>("floors/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedFloors(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all (non-paginated)
export const getAllFloors = createAsyncThunk<
    IFloor[],
    void,
    { rejectValue: string }
>("floors/getAll", async (_, thunkAPI) => {
    try {
        // return await fetchAllFloors();
        return await getAllProductionFloor();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all floors")
        );
    }
});

export const getAllFloorsFromJson = createAsyncThunk<
    IFloor[],
    void,
    { rejectValue: string }
>("floors/getAllFromJson", async (_, thunkAPI) => {
    try {
        const { hasData } = await checkIfFloorStore();

        if (!hasData) {
            const res = await fetch("/data/floor_list.json");
            if (!res.ok) throw new Error("Failed to load buyer_list.json");

            const response: IFloor[] = await res.json(); // parse JSON properly
            await saveFloorData(response);
        }
        const data = await getAllProductionFloor();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all currencies")
        );
    }
});

// Fetch one by ID
export const getFloor = createAsyncThunk<
    IFloor,
    number,
    { rejectValue: string }
>("floors/show", async (id, thunkAPI) => {
    try {
        return await showFloor(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new 
export const addFloor = createAsyncThunk<
    { message: string },
    CreateFloorPayload,
    { rejectValue: string }
>("floors/add", async (payload, thunkAPI) => {
    try {
        return await createFloor(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create currency")
        );
    }
});

// Update 
export const editFloor = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateFloorPayload },
    { rejectValue: string }
>("floors/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateFloor(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update currency")
        );
    }
});

// Delete 
export const removeFloor = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("floors/delete", async (id, thunkAPI) => {
    try {
        return await deleteFloor(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const floorSlice = createSlice({
    name: "floors",
    initialState,
    reducers: {
        updateFloorField<K extends keyof IFloor>(
            state: IFloorState,
            action: PayloadAction<{ key: K; value: IFloor[K] }>
        ) {
            const { key, value } = action.payload;
            state.floor[key] = value;
        },
        setFloorValidationErrors(
            state,
            action: PayloadAction<FloorValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearFloorValidationErrors(state) {
            state.validationErrors = null;
        },
        clearFloorMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                floor: state.floor,
            };
        },
        clearFloorState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedFloors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedFloors.fulfilled,
                (state, action: PayloadAction<PaginationObject<IFloor>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedFloors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllFloors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllFloors.fulfilled,
                (state, action: PayloadAction<IFloor[]>) => {
                    state.floors = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllFloors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllFloorsJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllFloorsJson.fulfilled,
                (state, action: PayloadAction<IFloor[]>) => {
                    state.floors = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllFloorsJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(filterFloorBySection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                filterFloorBySection.fulfilled,
                (state, action: PayloadAction<IFloor[]>) => {
                    state.filteredFloor = action.payload;
                }
            )
            .addCase(filterFloorBySection.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchFloor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchFloor.fulfilled,
                (state, action: PayloadAction<IFloor>) => {
                    state.floor = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchFloor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getPagedFloors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedFloors.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.floors = data;
                state.loading = false;
            })
            .addCase(getPagedFloors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllFloors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFloors.fulfilled, (state, action) => {
                state.floors = action.payload;
                state.loading = false;
            })
            .addCase(getAllFloors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllFloorsFromJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFloorsFromJson.fulfilled, (state, action) => {
                state.floors = action.payload;
                state.loading = false;
            })
            .addCase(getAllFloorsFromJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getFloor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFloor.fulfilled, (state, action) => {
                state.floor = action.payload;
                state.loading = false;
            })
            .addCase(getFloor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addFloor.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addFloor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addFloor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create";
            })
            .addCase(editFloor.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editFloor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editFloor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeFloor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFloor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeFloor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const {
    updateFloorField,
    setFloorValidationErrors,
    clearFloorValidationErrors,
    clearFloorMessages,
    clearFloorState,
} = floorSlice.actions;

export default floorSlice.reducer;

