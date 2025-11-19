// src/features/style/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfStyleStore, getAllStyle, getStylesByBuyerId, saveStyleData, } from "../../../app/idb/production/styleOperations";
import { IStyle, IStyleState } from "../types/style.interface";
import { FetchAllConfigStyle, FetchStylesByBuyer } from "@/modules/merchandising/api/style.API";
import { handleThunkError } from "@/utils/handleThunkError";

const initialState: IStyleState = {
    styles: [
        {
            buyerId: 0,
            isActive: true,
            isDying: false,
            isEmbroidery: false,
            isKnitting: false,
            isPrint: false,
            isPrintEmb: false,
            isSmoke: false,
            isWashing: false,
            itemType: "",
            itemUom: "",
            printEmbAfterSew: false,
            smvCutting: 0,
            smvFinishing: 0,
            smvSewing: 0,
            styleName: "Style - 1",
            styleNo: "S1",
            id: 1,
        },
        {
            buyerId: 2,
            isActive: true,
            isDying: false,
            isEmbroidery: false,
            isKnitting: false,
            isPrint: false,
            isPrintEmb: false,
            isSmoke: false,
            isWashing: false,
            itemType: "",
            itemUom: "",
            printEmbAfterSew: false,
            smvCutting: 0,
            smvFinishing: 0,
            smvSewing: 0,
            styleName: "Style - 2",
            styleNo: "S2",
            id: 2,
        }
    ],
    filteredStyle: [],
    style: {
        buyerId: 0,
        isActive: true,
        isDying: false,
        isEmbroidery: false,
        isKnitting: false,
        isPrint: false,
        isPrintEmb: false,
        isSmoke: false,
        isWashing: false,
        itemType: "",
        itemUom: "",
        printEmbAfterSew: false,
        smvCutting: 0,
        smvFinishing: 0,
        smvSewing: 0,
        styleName: "",
        styleNo: "",
        id: 0,
    },
    paginationObject: createInitialPaginationObject<IStyle>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

export const fetchStylesByBuyerId = createAsyncThunk<
    IStyle[],
    number,
    { rejectValue: string }
>("style/fetchStylesByBuyerId", async (buyerId, thunkAPI) => {
    try {
        const data = await FetchStylesByBuyer(buyerId);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch styles by buyer")
        );
    }
});

// Async thunk for fetching buyers
export const fetchPaginatedStyles = createAsyncThunk(
    "style/fetchPaginatedStyles",
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

export const fetchAllStyles = createAsyncThunk(
    "style/fetchAllStyles",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfStyleStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveStyleData(response.data);
                return response.data;
            } else {
                const data = await getAllStyle();
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

export const fetchAllStylesJson = createAsyncThunk(
    "style/fetchAllStylesJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfStyleStore();

            if (!hasData) {
                const res = await fetch("/data/style_list.json");
                if (!res.ok) throw new Error("Failed to load styles.json");

                const data: IStyle[] = await res.json();
                await saveStyleData(data);
                return data;
            }

            const cachedData = await getAllStyle();
            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllStylesByBuyerId = createAsyncThunk(
    "style/fetchAllStylesByBuyerId",
    async ({ buyerId }: { buyerId: number }, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfStyleStore();

            if (!hasData) {
                const res = await fetch("/data/style_list.json");
                if (!res.ok) throw new Error("Failed to load styles.json");

                const data: IStyle[] = await res.json();
                await saveStyleData(data);
                return data;
            }

            const cachedData = await getStylesByBuyerId(buyerId);
            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchStyle = createAsyncThunk(
    "style/fetchStyle",
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

export const createStyle = createAsyncThunk(
    "style/createStyle",
    async (formState: Omit<IStyle, "id">, { rejectWithValue }) => {
        try {
            const { buyerId, styleName, styleNo } = formState;

            const data = {
                buyerId: buyerId,
                styleName: styleName,
                styleNo: styleNo,
            };

            const response = await axiosInstance.post("/line-save", data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for updating a session
export const updateStyle = createAsyncThunk(
    "style/updateStyle",
    async (formState: IStyle, { rejectWithValue }) => {
        try {
            const { buyerId, styleName, styleNo, id } = formState;

            const data = {
                id: id,
                buyerId: buyerId,
                styleName: styleName,
                styleNo: styleNo,
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
export const deleteStyle = createAsyncThunk(
    "style/deleteStyle",
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


// Fetch all config Style
export const GetAllConfigStyle = createAsyncThunk<
    IStyle[],
    void,
    { rejectValue: string }
>("style/getAll", async (_, thunkAPI) => {
    try {
        return await FetchAllConfigStyle();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all styles")
        );
    }
});


const productionStyleSlice = createSlice({
    name: "style",
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
            .addCase(fetchPaginatedStyles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedStyles.fulfilled,
                (state, action: PayloadAction<PaginationObject<IStyle>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedStyles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllStyles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllStyles.fulfilled,
                (state, action: PayloadAction<IStyle[]>) => {
                    state.styles = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllStyles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllStylesJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllStylesJson.fulfilled,
                (state, action: PayloadAction<IStyle[]>) => {
                    state.styles = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllStylesJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllStylesByBuyerId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllStylesByBuyerId.fulfilled,
                (state, action: PayloadAction<IStyle[]>) => {
                    state.styles = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllStylesByBuyerId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchStyle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStyle.fulfilled, (state, action: PayloadAction<IStyle>) => {
                state.style = action.payload;
                state.loading = false;
            })
            .addCase(fetchStyle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createStyle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createStyle.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createStyle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateStyle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateStyle.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateStyle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteStyle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteStyle.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteStyle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(GetAllConfigStyle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllConfigStyle.fulfilled, (state, action) => {
                state.styles = action.payload;
                state.loading = false;
            })
            .addCase(GetAllConfigStyle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchStylesByBuyerId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchStylesByBuyerId.fulfilled,
                (state, action: PayloadAction<IStyle[]>) => {
                    state.styles = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchStylesByBuyerId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetStyleForm,
    resetMessage,
    resetError,
} = productionStyleSlice.actions;

export default productionStyleSlice.reducer;
