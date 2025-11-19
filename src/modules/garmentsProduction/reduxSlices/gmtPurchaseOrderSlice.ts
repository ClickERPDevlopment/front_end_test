// src/features/gmtPurchaseOrder/buyerSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "../../../types/global";
import { checkIfGmtPurchaseOrderStore, getAllGmtPurchaseOrder, getDistinctColorByPONo, getDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth, getDistinctOrderPlacementMonthsByPoNoColorId, getDistinctPOByStyleId, getDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate, saveGmtPurchaseOrderData, } from "../../../app/idb/production/poDataOperations";
import { IGmtPurchaseOrder, IGmtPurchaseOrderState, IOrderColor, IOrderSize } from "../types/poData.interface";

const initialState: IGmtPurchaseOrderState = {
    orders: [
        {
            actualETD: "2025-09-10",
            colorName: "Navy Blue",
            sizeName: "M",
            styleNo: "ST-4587",
            additionalBookingId: 102,
            buyerId: 7,
            colorId: 15,
            deliveryDate: "2025-09-20",
            factoryId: 3,
            isMultiPoCombine: true,
            isSideSeam: false,
            orderPlacementMonth: "August-2025",
            orderType: "Bulk",
            poNo: "PO-992134",
            proposedDeliveryDate: "2025-09-25",
            qty: 1500,
            revisedNo: "R-2",
            sampleProgramId: 12,
            shipQty: 1400,
            sizeId: 4,
            styleId: 23,
            id: 101
        },
        {
            actualETD: "2025-09-10",
            colorName: "Sky Blue",
            sizeName: "L",
            styleNo: "ST-2587",
            additionalBookingId: 103,
            buyerId: 6,
            colorId: 11,
            deliveryDate: "2025-09-20",
            factoryId: 1,
            isMultiPoCombine: true,
            isSideSeam: false,
            orderPlacementMonth: "August-2025",
            orderType: "Mega Bulk",
            poNo: "PO-123456",
            proposedDeliveryDate: "2025-09-25",
            qty: 1500,
            revisedNo: "R-3",
            sampleProgramId: 12,
            shipQty: 1400,
            sizeId: 4,
            styleId: 23,
            id: 102
        }
    ],
    placementMonths: [],
    deliveryDates: [],
    orderColors: [],
    orderSizes: [],
    filteredOrder: [],
    order: {
        actualETD: "",
        colorName: "",
        sizeName: "",
        styleNo: "",
        additionalBookingId: 0,
        buyerId: 0,
        colorId: 0,
        deliveryDate: "",
        factoryId: 0,
        isMultiPoCombine: false,
        isSideSeam: false,
        orderPlacementMonth: "",
        orderType: "",
        poNo: "",
        proposedDeliveryDate: "",
        qty: 0,
        revisedNo: "",
        sampleProgramId: 0,
        shipQty: 0,
        sizeId: 0,
        styleId: 0,
        id: 0,
    },
    paginationObject: createInitialPaginationObject<IGmtPurchaseOrder>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

// Async thunk for fetching buyers
export const fetchPaginatedGmtPurchaseOrders = createAsyncThunk(
    "gmtPurchaseOrder/fetchPaginatedGmtPurchaseOrders",
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

export const fetchAllGmtPurchaseOrders = createAsyncThunk(
    "gmtPurchaseOrder/fetchAllGmtPurchaseOrders",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfGmtPurchaseOrderStore();
            if (!hasData) {
                const response = await axiosInstance.get(`/line-list-all`);
                await saveGmtPurchaseOrderData(response.data);
                return response.data;
            } else {
                const data = await getAllGmtPurchaseOrder();
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

export const fetchAllGmtPurchaseOrdersJson = createAsyncThunk(
    "gmtPurchaseOrder/fetchAllGmtPurchaseOrdersJson",
    async (_, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfGmtPurchaseOrderStore();

            if (!hasData) {
                const res = await fetch("/data/po_data.json");

                if (!res.ok)
                    throw new Error("Failed to load gmtPurchaseOrders.json");

                const data: IGmtPurchaseOrder[] = await res.json();
                await saveGmtPurchaseOrderData(data);
                return data;
            }

            const cachedData = await getAllGmtPurchaseOrder();
            return cachedData;
        } catch (err) {
            const error = err as Error;
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

export const fetchAllDistinctPOsByStyleId = createAsyncThunk(
    "gmtPurchaseOrder/fetchAllDistinctPOsByStyleId",
    async ({ styleId }: { styleId: number }, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfGmtPurchaseOrderStore();

            if (!hasData) {
                const res = await fetch("/data/po_data.json");

                if (!res.ok)
                    throw new Error("Failed to load styles.json");

                const data: IGmtPurchaseOrder[] = await res.json();
                await saveGmtPurchaseOrderData(data);
                // return data;
            }
            const cachedData = await getDistinctPOByStyleId(styleId);
            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllDistinctColorsByPoNo = createAsyncThunk(
    "gmtPurchaseOrder/fetchAllDistinctColorsByPoNo",
    async ({ poNo }: { poNo: string }, { rejectWithValue }) => {
        try {
            const { hasData } = await checkIfGmtPurchaseOrderStore();

            if (!hasData) {
                const res = await fetch("/data/po_data.json");
                if (!res.ok) throw new Error("Failed to load styles.json");

                const data: IGmtPurchaseOrder[] = await res.json();
                await saveGmtPurchaseOrderData(data);
                // return data;
            }

            const cachedData = await getDistinctColorByPONo(poNo);

            return cachedData;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllDistinctOrderPlacementMonthsByPoNoColorId =
    createAsyncThunk<
        string[],
        { poNo: string; colorId: number },
        {
            rejectValue: string;
        }
    >(
        "gmtPurchaseOrder/fetchAllDistinctOrderPlacementMonthsByPoNoColorId",
        async ({ poNo, colorId }, { rejectWithValue }) => {
            try {
                const { hasData } = await checkIfGmtPurchaseOrderStore();

                if (!hasData) {
                    const res = await fetch("/data/po_data.json");
                    if (!res.ok) throw new Error("Failed to load po_data.json");

                    const data: IGmtPurchaseOrder[] = await res.json();
                    await saveGmtPurchaseOrderData(data);
                }

                const cachedData = await getDistinctOrderPlacementMonthsByPoNoColorId(
                    poNo,
                    colorId
                );

                return cachedData;
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                const errorMessage =
                    error.response?.data?.message || error.message || "Unknown error";
                return rejectWithValue(errorMessage);
            }
        }
    );

export const fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth =
    createAsyncThunk<
        string[],
        { poNo: string; colorId: number; orderPlacementMonth: string },
        {
            rejectValue: string;
        }
    >(
        "gmtPurchaseOrder/fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth",
        async ({ poNo, colorId, orderPlacementMonth }, { rejectWithValue }) => {
            try {
                const { hasData } = await checkIfGmtPurchaseOrderStore();

                if (!hasData) {
                    const res = await fetch("/data/po_data.json");
                    if (!res.ok) throw new Error("Failed to load po_data.json");

                    const data: IGmtPurchaseOrder[] = await res.json();
                    await saveGmtPurchaseOrderData(data);
                }

                const cachedData =
                    await getDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth(
                        poNo,
                        Number(colorId),
                        orderPlacementMonth
                    );

                return cachedData;
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                const errorMessage =
                    error.response?.data?.message || error.message || "Unknown error";
                return rejectWithValue(errorMessage);
            }
        }
    );

export const fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate =
    createAsyncThunk<
        IOrderSize[],
        {
            poNo: string;
            colorId: number;
            orderPlacementMonth: string;
            deliveryDate: string;
        },
        {
            rejectValue: string;
        }
    >(
        "gmtPurchaseOrder/fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate",
        async (
            { poNo, colorId, orderPlacementMonth, deliveryDate },
            { rejectWithValue }
        ) => {
            try {
                const { hasData } = await checkIfGmtPurchaseOrderStore();

                if (!hasData) {
                    const res = await fetch("/data/po_data.json");
                    if (!res.ok) throw new Error("Failed to load po_data.json");

                    const data: IGmtPurchaseOrder[] = await res.json();
                    await saveGmtPurchaseOrderData(data);
                }

                const cachedData =
                    await getDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate(
                        poNo,
                        Number(colorId),
                        orderPlacementMonth,
                        deliveryDate
                    );

                return cachedData;
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                const errorMessage =
                    error.response?.data?.message || error.message || "Unknown error";
                return rejectWithValue(errorMessage);
            }
        }
    );

export const fetchGmtPurchaseOrder = createAsyncThunk(
    "gmtPurchaseOrder/fetchGmtPurchaseOrder",
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

export const createGmtPurchaseOrder = createAsyncThunk(
    "gmtPurchaseOrder/createGmtPurchaseOrder",
    async (formState: Omit<IGmtPurchaseOrder, "id">, { rejectWithValue }) => {
        try {
            const {
                actualETD,
                additionalBookingId,
                buyerId,
                colorId,
                deliveryDate,
                factoryId,
                isMultiPoCombine,
                isSideSeam,
                orderPlacementMonth,
                orderType,
                poNo,
                proposedDeliveryDate,
                qty,
                revisedNo,
                sampleProgramId,
                shipQty,
                sizeId,
                styleId,
            } = formState;

            const data = {
                actualEtd: actualETD,
                additionalBookingId: additionalBookingId,
                buyerId: buyerId,
                colorId: colorId,
                deliveryDate: deliveryDate,
                factoryId: factoryId,
                isMultiPoCombine: isMultiPoCombine,
                isSideSeam: isSideSeam,
                orderPlacementMonth: orderPlacementMonth,
                orderType: orderType,
                poNo: poNo,
                proposedDeliveryDate: proposedDeliveryDate,
                qty: qty,
                revisedNo: revisedNo,
                sampleProgramId: sampleProgramId,
                shipQty: shipQty,
                sizeId: sizeId,
                styleId: styleId,
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
export const updateGmtPurchaseOrder = createAsyncThunk(
    "gmtPurchaseOrder/updateGmtPurchaseOrder",
    async (formState: IGmtPurchaseOrder, { rejectWithValue }) => {
        try {
            const {
                actualETD,
                additionalBookingId,
                buyerId,
                colorId,
                deliveryDate,
                factoryId,
                isMultiPoCombine,
                isSideSeam,
                orderPlacementMonth,
                orderType,
                poNo,
                proposedDeliveryDate,
                qty,
                revisedNo,
                sampleProgramId,
                shipQty,
                sizeId,
                styleId,
                id,
            } = formState;

            const data = {
                id: id,
                actualEtd: actualETD,
                additionalBookingId: additionalBookingId,
                buyerId: buyerId,
                colorId: colorId,
                deliveryDate: deliveryDate,
                factoryId: factoryId,
                isMultiPoCombine: isMultiPoCombine,
                isSideSeam: isSideSeam,
                orderPlacementMonth: orderPlacementMonth,
                orderType: orderType,
                poNo: poNo,
                proposedDeliveryDate: proposedDeliveryDate,
                qty: qty,
                revisedNo: revisedNo,
                sampleProgramId: sampleProgramId,
                shipQty: shipQty,
                sizeId: sizeId,
                styleId: styleId,
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
export const deleteGmtPurchaseOrder = createAsyncThunk(
    "gmtPurchaseOrder/deleteGmtPurchaseOrder",
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

const GmtPurchaseOrderSlice = createSlice({
    name: "gmtPurchaseOrder",
    initialState,
    reducers: {
        resetForm(state) {
            Object.assign(state, initialState);
        },
        resetOrderColors(state) {
            state.orderColors = [];
        },
        resetPlacementMonths(state) {
            state.placementMonths = [];
        },
        resetDeliveryDates(state) {
            state.deliveryDates = [];
        },
        resetOrderSizes(state) {
            state.orderSizes = [];
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
            .addCase(fetchPaginatedGmtPurchaseOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedGmtPurchaseOrders.fulfilled,
                (state, action: PayloadAction<PaginationObject<IGmtPurchaseOrder>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedGmtPurchaseOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllGmtPurchaseOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllGmtPurchaseOrders.fulfilled,
                (state, action: PayloadAction<IGmtPurchaseOrder[]>) => {
                    state.orders = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllGmtPurchaseOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllGmtPurchaseOrdersJson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllGmtPurchaseOrdersJson.fulfilled,
                (state, action: PayloadAction<IGmtPurchaseOrder[]>) => {
                    state.orders = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllGmtPurchaseOrdersJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllDistinctPOsByStyleId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllDistinctPOsByStyleId.fulfilled,
                (state, action: PayloadAction<IGmtPurchaseOrder[]>) => {
                    state.orders = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllDistinctPOsByStyleId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllDistinctColorsByPoNo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllDistinctColorsByPoNo.fulfilled,
                (state, action: PayloadAction<IOrderColor[]>) => {
                    state.orderColors = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllDistinctColorsByPoNo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(
                fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate.fulfilled,
                (state, action: PayloadAction<IOrderSize[]>) => {
                    state.orderSizes = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                fetchAllDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            )

            .addCase(
                fetchAllDistinctOrderPlacementMonthsByPoNoColorId.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                fetchAllDistinctOrderPlacementMonthsByPoNoColorId.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.placementMonths = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                fetchAllDistinctOrderPlacementMonthsByPoNoColorId.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            )

            .addCase(
                fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.deliveryDates = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                fetchAllDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            )

            .addCase(fetchGmtPurchaseOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchGmtPurchaseOrder.fulfilled,
                (state, action: PayloadAction<IGmtPurchaseOrder>) => {
                    state.order = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchGmtPurchaseOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createGmtPurchaseOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createGmtPurchaseOrder.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createGmtPurchaseOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateGmtPurchaseOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateGmtPurchaseOrder.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateGmtPurchaseOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteGmtPurchaseOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteGmtPurchaseOrder.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteGmtPurchaseOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    resetForm: resetGmtPurchaseOrderForm,
    resetOrderColors,
    resetOrderSizes,
    resetPlacementMonths,
    resetDeliveryDates,
    resetMessage,
    resetError,
} = GmtPurchaseOrderSlice.actions;

export default GmtPurchaseOrderSlice.reducer;
