import { createInitialPaginationObject } from "@/types/global";
import { IStyle, IStyleState } from "@/modules/garmentsProduction/types/style.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
import { FetchAllConfigStyle } from "../api/style.API";

export const GetAllConfigStyle = createAsyncThunk<
    IStyle[],
    void,
    { rejectValue: string }
>("style/getAllConfig", async (_, thunkAPI) => {
    try {
        const data = await FetchAllConfigStyle();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all styles")
        );
    }
});

const initialState: IStyleState = {
    style: {
        id: 0,
        buyerId: 0,
        styleNo: "",
        styleName: "",
        itemType: "",
        smvSewing: 0,
        smvCutting: 0,
        smvFinishing: 0,
        isActive: false,
        isPrint: false,
        isEmbroidery: false,
        isSmoke: false,
        isDying: false,
        isWashing: false,
        isKnitting: false,
        itemUom: "",
        isPrintEmb: false,
        printEmbAfterSew: false,
    },
    styles: [],
    filteredStyle: [],
    paginationObject: createInitialPaginationObject<IStyle>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
};

const configStyleSlice = createSlice({
    name: "style",
    initialState,
    reducers: {
        clearStyleState: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllConfigStyle.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(GetAllConfigStyle.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.styles = action.payload;
            })
            .addCase(GetAllConfigStyle.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload || "Failed to fetch styles";
            });
    },
});

export default configStyleSlice.reducer;
export const { clearStyleState } = configStyleSlice.actions;
