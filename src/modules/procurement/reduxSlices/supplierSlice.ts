import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleThunkError } from "@/utils/handleThunkError";
import { fetchAllSupplier } from "../api/supplierAPI";
import { ISupplier, ISupplierState } from "../pages/supplier/supplier.interface";

const initialState: ISupplierState = {
    suppliers:[],
    error: null,
    loading: false,
    message: null,
    status: "idle",
    validationErrors: null
}

export const getAllSupplier = createAsyncThunk<ISupplier[], void,{ rejectValue: string }>(
    "supplierSlice/getAllSupplier", async (_, thunkAPI) => {
    try {
        return await fetchAllSupplier();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Supplier")
        );
    }
});

const supplierSlice = createSlice({ 
    name: "supplierSlice",
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSupplier.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "loading";})
        builder.addCase(getAllSupplier.fulfilled, (state, action) => {
                state.suppliers = action.payload;
                state.loading = false;
                state.status = "succeeded";})
        builder.addCase(getAllSupplier.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.status = "failed";})
        },
    });

export default supplierSlice.reducer;

export const {
    
} = supplierSlice.actions;