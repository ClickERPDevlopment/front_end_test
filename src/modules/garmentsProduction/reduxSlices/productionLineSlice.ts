// // src/features/buyer/buyerSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../../api/axiosInstance";
// import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
// import { checkIfLineStore, getAllProductionLine, saveLineData, } from "../../../app/idb/production/lineOperations";
// import { LineState, ProductionLine } from "../types/line.interface";
// import { AxiosError } from "axios";
// import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
// import { getAllProductionFloor } from "../../../app/idb/production/floorOperations";
// import { IFloor } from "@/modules/configurations/pages/floorSetup/floor.interface";
// import { ILine } from "@/modules/configurations/pages/lineSetup/line.interface";

// const initialState: LineState = {
//     lines: [],
//     filteredLines: [],
//     line: {
//         floorName: "",
//         floorId: 0,
//         lineCode: "",
//         lineName: "",
//         sortingNo: 0,
//         id: 0,
//     },
//     paginationObject: createInitialPaginationObject<ProductionLine>(),
//     loading: false,
//     error: null,
//     status: "idle",
//     message: "",
// };

// // Async thunk for fetching buyers
// export const fetchPaginatedLines = createAsyncThunk(
//     "line/fetchPaginatedLines",
//     async (
//         { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
//         { rejectWithValue }
//     ) => {
//         try {
//             const response = await axiosInstance.get(
//                 `/line-list?page=${page}&perPage=${perPage}`
//             );
//             return response.data;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;

//             // Safely access error.response?.data?.message
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const fetchAllLines = createAsyncThunk(
//     "line/fetchAllLines",
//     async (_, { rejectWithValue }) => {
//         try {
//             const { hasData } = await checkIfLineStore();
//             if (!hasData) {
//                 const response = await axiosInstance.get(`/line-list-all`);
//                 await saveLineData(response.data);
//                 return response.data;
//             } else {
//                 const data = await getAllProductionLine();
//                 return data;
//             }
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const fetchAllLinesJson = createAsyncThunk(
//     "line/fetchAllLinesJson",
//     async (_, { rejectWithValue }) => {
//         try {
//             const { hasData } = await checkIfLineStore();

//             if (!hasData) {
//                 // Optional: switch to static JSON instead of API
//                 const res = await fetch("/data/line_list.json");
//                 if (!res.ok) throw new Error("Failed to load lines.json");

//                 const data: ILine[] = await res.json();
//                 await saveLineData(data);
//                 return data;
//             }

//             const cachedData = await getAllProductionLine();
//             return cachedData;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage = error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const filterLineByFloor = createAsyncThunk(
//     "line/filterLineByFloor",
//     async ({ floor_id }: { floor_id: string }, { rejectWithValue, dispatch }) => {
//         try {
//             let allLines: ProductionLine[] = await getAllProductionLine();

//             // If no floors found, fetch from JSON and save
//             if (allLines.length === 0) {
//                 const jsonData = await dispatch(fetchAllLinesJson()).unwrap();

//                 allLines = jsonData;
//             }

//             const filteredFloors = allLines.filter(
//                 (line) => line.floorId.toString() === floor_id.toString()
//             );

//             return filteredFloors;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const filterLinesByStage = createAsyncThunk<
//     ProductionLine[], // return type
//     { stage_id: number }, // argument type
//     { rejectValue: string } // thunkAPI config (optional)
// >(
//     "floorLine/filterLinesByStage",
//     async ({ stage_id }, { dispatch, rejectWithValue }) => {
//         try {
//             const allFloors: IFloor[] = await getAllProductionFloor();

//             //   if (allFloors.length === 0) {
//             //     // Call another thunk via dispatch
//             //     const result = await dispatch(fetchAllFloors()).unwrap();
//             //     // Assuming anotherThunk returns floors or you handle it differently
//             //     allFloors = result;
//             //   }

//             let allLines: ProductionLine[] = await getAllProductionLine();

//             if (allLines.length === 0) {
//                 // Call another thunk via dispatch
//                 const result = await dispatch(fetchAllLines()).unwrap();
//                 // Assuming anotherThunk returns floors or you handle it differently
//                 allLines = result;
//             }

//             // Filter floors by stage_id
//             const filteredFloorIds = allFloors
//                 .filter((floor) => true)
//                 .map((floor) => floor.id.toString());

//             // Filter lines by filteredFloorIds
//             const filteredLines = allLines.filter((line) =>
//                 filteredFloorIds.includes(line.floorId.toString())
//             );

//             return filteredLines;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const fetchLine = createAsyncThunk(
//     "line/fetchLine",
//     async ({ id }: { id: string }, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.get(`/line-show/${id}`);
//             return response.data;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// export const createLine = createAsyncThunk(
//     "line/createLine",
//     async (formState: Omit<ProductionLine, "id">, { rejectWithValue }) => {
//         try {
//             const { floorId, lineCode, lineName, sortingNo } = formState;

//             const data = {
//                 floorId: floorId,
//                 lineCode: lineCode,
//                 lineName: lineName,
//                 sortingNo: sortingNo,
//             };

//             const response = await axiosInstance.post("/line-save", data);
//             return response.data.message;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage = error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// // Async thunk for updating a session
// export const updateLine = createAsyncThunk(
//     "line/updateLine",
//     async (formState: ProductionLine, { rejectWithValue }) => {
//         try {
//             const { floorId, lineCode, lineName, sortingNo, id } = formState;

//             const data = {
//                 id: id,
//                 floorId: floorId,
//                 lineCode: lineCode,
//                 lineName: lineName,
//                 sortingNo: sortingNo,
//             };

//             const response = await axiosInstance.put(`/line-update/${data.id}`, data);
//             return response.data.message;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage = error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// // Async thunk for deleting a session
// export const deleteLine = createAsyncThunk(
//     "line/deleteLine",
//     async (id: number, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.delete(`/line-delete/${id}`);
//             return response.data.message;
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage = error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// const productionLineSlice = createSlice({
//     name: "line",
//     initialState,
//     reducers: {
//         resetForm(state) {
//             Object.assign(state, initialState);
//         },
//         resetMessage(state) {
//             state.message = "";
//         },
//         resetError(state) {
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPaginatedLines.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchPaginatedLines.fulfilled,
//                 (state, action: PayloadAction<PaginationObject<ProductionLine>>) => {
//                     state.paginationObject = action.payload;
//                     state.loading = false;
//                 }
//             )
//             .addCase(fetchPaginatedLines.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(fetchAllLines.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchAllLines.fulfilled,
//                 (state, action: PayloadAction<ProductionLine[]>) => {
//                     state.lines = action.payload;
//                     state.loading = false;
//                 }
//             )
//             .addCase(fetchAllLines.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(fetchAllLinesJson.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchAllLinesJson.fulfilled,
//                 (state, action: PayloadAction<ProductionLine[]>) => {
//                     state.lines = action.payload;
//                     state.loading = false;
//                 }
//             )
//             .addCase(fetchAllLinesJson.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(
//                 filterLineByFloor.fulfilled,
//                 (state, action: PayloadAction<ProductionLine[]>) => {
//                     state.filteredLines = action.payload;
//                 }
//             )
//             .addCase(filterLineByFloor.rejected, (state, action) => {
//                 state.error = action.payload as string;
//             })
//             .addCase(
//                 filterLinesByStage.fulfilled,
//                 (state, action: PayloadAction<ProductionLine[]>) => {
//                     state.filteredLines = action.payload;
//                 }
//             )
//             .addCase(filterLinesByStage.rejected, (state, action) => {
//                 state.error = action.payload as string;
//             })
//             .addCase(fetchLine.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchLine.fulfilled,
//                 (state, action: PayloadAction<ProductionLine>) => {
//                     state.line = action.payload;
//                     state.loading = false;
//                 }
//             )
//             .addCase(fetchLine.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(createLine.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createLine.fulfilled, (state, action: PayloadAction<string>) => {
//                 state.loading = false;
//                 state.message = action.payload;
//             })
//             .addCase(createLine.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(updateLine.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(updateLine.fulfilled, (state, action: PayloadAction<string>) => {
//                 state.loading = false;
//                 state.message = action.payload;
//             })
//             .addCase(updateLine.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(deleteLine.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteLine.fulfilled, (state, action: PayloadAction<string>) => {
//                 state.loading = false;
//                 state.message = action.payload;
//             })
//             .addCase(deleteLine.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const {
//     resetForm: resetLineForm,
//     resetMessage,
//     resetError,
// } = productionLineSlice.actions;

// export default productionLineSlice.reducer;
