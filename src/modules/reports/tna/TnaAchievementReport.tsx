// pages/TnaReport.tsx
import { Column } from "@/components/data-display/CustomDataTable";
import ReportHeader from "@/components/layout/ReportLayout/ReportHeader";
import ReportLayout from "@/components/layout/ReportLayout/ReportLayout";
import ReportTable from "@/components/layout/ReportLayout/ReportTable";
import React, { useEffect } from "react";
import { ITnaAchievementReportDto, ITnaCalenderDto } from "./tnaReport.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { Link, useLocation } from "react-router-dom";
import { fetchTnaAchievementReport, fetchTnaDetailsReport } from "../reduxSlices/tnaReportSlice";

const columns: Column<ITnaAchievementReportDto>[] = [
  { key: "index", header: "#", align: "center" as const },
  { key: "taskName", header: "Task Description", align: "left" as const },
  { key: "count", header: "Number Of Task", align: "center" as const },
  { key: "completeTna", header: "Completed As per TNA", align: "center" as const },
  { key: "notCompleteTna", header: "Not Completed As per TNA", align: "center" as const,
    render: (row, index) => {
      return (
        <Link className="underline text-blue-700" 
        to={`/winapp/report/tna-not-complete-task-report?taskName=${row.taskName}`} 
        target="_blank">{row.notCompleteTna}</Link>
      )
    }
   },
  { key: "achievePercent", header: "Achievement %", align: "center" as const },

];

const TnaAchievementReport: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tnaAchievementReport, loading } = useSelector((state: RootState) => state.tnaReport);
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const jobNumber = params.get("jobNo") || "";

  useEffect(() => {
    document.title = "TNA Achievement Report";

    return () => {
      document.title = "";
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTnaAchievementReport({
        BuyerList: "",
        FactoryList: ["1"],
        PlacementMonthFrom: "",
        PlacementMonthTo: ""
      }));
  }, []);

  return (
    <></>
  );
};

export default TnaAchievementReport;
