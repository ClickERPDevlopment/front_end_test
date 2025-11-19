import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchParams, PaginationObject, createInitialPaginationObject, } from "@/types/global";
import { handleThunkError } from "@/utils/handleThunkError";
import { CreateSectionPayload, IFactoryLedger, ISection, ISectionState, SectionValidationErrors, UpdateSectionPayload, } from "../pages/sectionSetup/section.interface";
import { createSection, deleteSection, fetchAllSections, fetchPagedSections, showSection, updateSection, } from "../api/sectionAPI";

const initialState: ISectionState = {
    section: {
        code: "",
        name: "",
        inchargeName: "",
        productionManagerName: "",
        remarks: "",
        id: 0,
    },
    factoryLedger: {
        factoryId: 0,
        factoryName: "",
        inventoryStockLedgerId: 0,
        inventoryStockLedgerName: "",
        inventoryWIPStockLedgerId: 0,
        inventoryWIPStockLedgerName: "",
        expenseLedgerId: 0,
        expenseLedgerName: "",
    },
    sections: [
        {
            id: 1,
            name: "Cutting",
            code: "",
            inchargeName: "",
            productionManagerName: "",
            remarks: "",
        },
        {
            id: 2,
            name: "Sewing",
            code: "",
            inchargeName: "",
            productionManagerName: "",
            remarks: "",
        },
        {
            id: 3,
            name: "Finishing",
            code: "",
            inchargeName: "",
            productionManagerName: "",
            remarks: "",
        },
    ],
    filteredSection: [],
    paginationObject: createInitialPaginationObject<ISection>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};

// Fetch paginated sections
export const getPagedSections = createAsyncThunk<
    PaginationObject<ISection>,
    FetchParams,
    { rejectValue: string }
>("sections/get", async (params, thunkAPI) => {
    try {
        return await fetchPagedSections(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currencies")
        );
    }
});

// Fetch all sections (non-paginated)
export const getAllSections = createAsyncThunk<
    ISection[],
    void,
    { rejectValue: string }
>("sections/getAll", async (_, thunkAPI) => {
    try {
        return await fetchAllSections();
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch all currencies")
        );
    }
});

// Fetch one section by ID
export const getSection = createAsyncThunk<
    ISection,
    number,
    { rejectValue: string }
>("currencies/show", async (id, thunkAPI) => {
    try {
        return await showSection(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch currency")
        );
    }
});

// Create new currency
export const addSection = createAsyncThunk<
    { message: string },
    CreateSectionPayload,
    { rejectValue: string }
>("sections/add", async (payload, thunkAPI) => {
    try {
        return await createSection(payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to create currency")
        );
    }
});

// Update currency
export const editSection = createAsyncThunk<
    { message: string },
    { id: number; payload: UpdateSectionPayload },
    { rejectValue: string }
>("sections/edit", async ({ id, payload }, thunkAPI) => {
    try {
        return await updateSection(id, payload);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to update currency")
        );
    }
});

// Delete section
export const removeSection = createAsyncThunk<
    { message: string },
    number,
    { rejectValue: string }
>("sections/delete", async (id, thunkAPI) => {
    try {
        return await deleteSection(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to delete currency")
        );
    }
});

// Slice
const sectionSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        updateSectionField<K extends keyof ISection>(
            state: ISectionState,
            action: PayloadAction<{ key: K; value: ISection[K] }>
        ) {
            const { key, value } = action.payload;
            state.section[key] = value;
        },
        updateFactoryLedgerField<K extends keyof IFactoryLedger>(
            state: ISectionState,
            action: PayloadAction<{ key: K; value: IFactoryLedger[K] }>
        ) {
            const { key, value } = action.payload;
            state.factoryLedger[key] = value;
        },
        setSectionValidationErrors(
            state,
            action: PayloadAction<SectionValidationErrors | null>
        ) {
            state.validationErrors = action.payload;
        },
        clearSectionValidationErrors(state) {
            state.validationErrors = null;
        },
        clearSectionMessages(state) {
            return {
                ...initialState,
                error: null,
                message: null,
                floor: state.section,
            };
        },
        clearSectionState() {
            return { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagedSections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedSections.fulfilled, (state, action) => {
                const { data, ...pagination } = action.payload;
                state.paginationObject = { ...pagination, data: [] };
                state.sections = data;
                state.loading = false;
            })
            .addCase(getPagedSections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllSections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSections.fulfilled, (state, action) => {
                state.sections = action.payload;
                state.loading = false;
            })
            .addCase(getAllSections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSection.fulfilled, (state, action) => {
                state.section = action.payload;
                state.loading = false;
            })
            .addCase(getSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addSection.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(addSection.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create currency";
            })

            .addCase(editSection.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.validationErrors = null;
            })
            .addCase(editSection.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(editSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removeSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeSection.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(removeSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default sectionSlice.reducer;

export const {
    updateSectionField,
    updateFactoryLedgerField,
    setSectionValidationErrors,
    clearSectionValidationErrors,
    clearSectionMessages,
    clearSectionState,
} = sectionSlice.actions;
