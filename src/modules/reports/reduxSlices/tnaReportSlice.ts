import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReportState } from "../tna/tnaReport.interface";
import axiosInstance from "@/api/axiosInstance";

const initialState: IReportState = {
  tnaDetailsReport: [],
  tnaNotCompleteTasks: [],
  tnaAchievementReport: [],
  data: [],
  loading: false,
  error: null,
};

// API call with params
export const fetchTnaDetailsReport = createAsyncThunk(
  "report/fetchTnaDetailsReport",
  async (params: { jobNumber: string; }) => {
    const res = await axiosInstance.get("/tna/tna-details-report", { params });
    return res.data;
  }
);

export const fetchTnaAchievementReport = createAsyncThunk(
  "report/fetchTnaAchievementReport",
  async (params: {
    PlacementMonthFrom: string;
    PlacementMonthTo: string;
    FactoryList: string[];
    BuyerList: string;
  }) => {
    const res = await axiosInstance.post("/tna/achievement-report", params);
    return res.data;
  }
);

export const fetchTnaNotCompleteReport = createAsyncThunk(
  "report/fetchTnaNotCompleteReport",
  async (params: {
    PlacementMonthFrom: string;
    PlacementMonthTo: string;
    FactoryList: string[];
    BuyerList: string;
    TaskName: string;
  }) => {
    const res = await axiosInstance.post("/tna/not-complete-task-report", params);
    return res.data;
  }
);

const tnaReportSlice = createSlice({
  name: "tnaReport",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTnaDetailsReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTnaDetailsReport.fulfilled, (state, action) => {
        state.loading = false;
        state.tnaDetailsReport = action.payload;
      })
      .addCase(fetchTnaDetailsReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(fetchTnaAchievementReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTnaAchievementReport.fulfilled, (state, action) => {
        state.loading = false;
        state.tnaAchievementReport = action.payload;
      })
      .addCase(fetchTnaAchievementReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      
      .addCase(fetchTnaNotCompleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTnaNotCompleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.tnaNotCompleteTasks = action.payload;
      })
      .addCase(fetchTnaNotCompleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default tnaReportSlice.reducer;
