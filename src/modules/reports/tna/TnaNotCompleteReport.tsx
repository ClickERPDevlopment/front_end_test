// pages/TnaReport.tsx
import { Column } from "@/components/data-display/CustomDataTable";
import ReportHeader from "@/components/layout/ReportLayout/ReportHeader";
import ReportLayout from "@/components/layout/ReportLayout/ReportLayout";
import ReportTable from "@/components/layout/ReportLayout/ReportTable";
import React, { useEffect } from "react";
import { ITnaAchievementReportDto, ITnaCalenderDto, ITnaNotCompleteTask } from "./tnaReport.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useLocation } from "react-router-dom";
import { fetchTnaAchievementReport, fetchTnaDetailsReport, fetchTnaNotCompleteReport } from "../reduxSlices/tnaReportSlice";

const columns: Column<ITnaNotCompleteTask>[] = [
  { key: "index", header: "#", align: "center" as const },
  { key: "buyerDisplayName", header: "Buyer", align: "center" as const },
  { key: "styleNos", header: "Style No.", align: "center" as const },
  { key: "pono", header: "PO", align: "center" as const },
  { key: "jobNumber", header: "Job No.", align: "center" as const },
  { key: "planLastDateStr", header: "Plan Date", align: "center" as const },
  { key: "curActualDateStr", header: "Actual Date", align: "center" as const },
  { key: "deviation", header: "Deviation", align: "center" as const },
  { key: "remarks", header: "Remarks", align: "center" as const },
  { key: "commentCount", header: "Commnt.", align: "center" as const },

];

const TnaAchievementReport: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tnaNotCompleteTasks, loading } = useSelector((state: RootState) => state.tnaReport);
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const taskName = params.get("taskName") || "";

  useEffect(() => {
    document.title = "TNA Achievement Report (Not Completed Task)";

    return () => {
      document.title = "";
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTnaNotCompleteReport({
        BuyerList: "1,2",
        FactoryList: ["1"],
        PlacementMonthFrom: "",
        PlacementMonthTo: "",
        TaskName: taskName
      }));
  }, [taskName]);

  return (
    <></>
  );
};

export default TnaAchievementReport;
