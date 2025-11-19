import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBudget, IBudgetState } from "../pages/budgetApproval/budget.interface";
import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { fetchPagedBudgetApprovals } from '../api/budget.API';
import { handleThunkError } from "@/utils/handleThunkError";
// import { fetchBudgetApprovalList } from "../api/budgetApproval.API";


const initialState: IBudgetState = {
    budget: {
        id: 0,
        buyer: "",
        buyerId: 0,
        style: "",
        styleId: 0,
        po: "",
        poId: 0,
        budgetDate: "",
        costingNo: "",
        totalFob: "",
        buyingCommission: "",
        balanceValue: "",
        approvedBy: "",
        actions: false,
        budgetId: 0,
        status: ""
    },
    budgetList: [
    ],
    filteredBudgetApproval: [],
    paginationObject: createInitialPaginationObject<IBudget>(),
    loading: false,
    error: null,
    validationErrors: null,
    status: "idle",
    message: null,
};



// export const getBudgetApprovalList = createAsyncThunk<
//     IBudgetApproval[],
//     { buyerId?: number; styleId?: number; poId?: number },
//     { rejectValue: string }
// >(
//     "budgetApproval/getList",
//     async ({ buyerId = 0, styleId = 0, poId = 0 }, thunkAPI) => {
//         try {
//             return await fetchBudgetApprovalList(buyerId, styleId, poId);
//         } catch (err) {
//             return thunkAPI.rejectWithValue(
//                 handleThunkError(err, "Failed to fetch budget approval list")
//             );
//         }
//     }
// );


// Fetch paginated
export const getPagedBudgetApprovals = createAsyncThunk<
    PaginationObject<IBudget>,
    FetchParams,
    { rejectValue: string }
>("budgetApproval/getPagedBudgetApprovals", async (params, thunkAPI) => {
    try {
        return await fetchPagedBudgetApprovals(params);
    } catch (err) {
        return thunkAPI.rejectWithValue(
            handleThunkError(err, "Failed to fetch Budget Approvals")
        );
    }
});




const budgetApprovalSlice = createSlice({
    name: "budgetApproval",
    initialState,
    reducers: {
        clearBudgetApprovalValidationErrors(state) {
            state.validationErrors = null;
        },
        clearBudgetApprovalMessages(state) {
            state.message = null;
        },
        clearBudgetApprovalState() {
            return { ...initialState };
        },
        setBudgetObject(state: IBudgetState, action: PayloadAction<IBudget>) {
            state.budget = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getBudgetApprovalList.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(getBudgetApprovalList.fulfilled, (state, action) => {
            //     state.budgetApprovalList = action.payload; // direct array
            //     state.loading = false;
            // })
            // .addCase(getBudgetApprovalList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(getPagedBudgetApprovals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPagedBudgetApprovals.fulfilled, (state, action) => {
                state.paginationObject = action.payload;
                state.budgetList = action.payload.data;
                state.loading = false;
                state.status = "succeeded";
            })
            .addCase(getPagedBudgetApprovals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            ;

    }
});


export default budgetApprovalSlice.reducer;

export const {
    clearBudgetApprovalValidationErrors,
    clearBudgetApprovalMessages,
    clearBudgetApprovalState,
} = budgetApprovalSlice.actions;
