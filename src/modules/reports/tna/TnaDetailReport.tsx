// pages/TnaReport.tsx
import { Column } from "@/components/data-display/CustomDataTable";
import ReportHeader from "@/components/layout/ReportLayout/ReportHeader";
import ReportLayout from "@/components/layout/ReportLayout/ReportLayout";
import ReportTable from "@/components/layout/ReportLayout/ReportTable";
import React, { useEffect } from "react";
import { ITnaCalenderDto } from "./tnaReport.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useLocation } from "react-router-dom";
import { fetchTnaDetailsReport } from "../reduxSlices/tnaReportSlice";

const columns: Column<ITnaCalenderDto>[] = [
  { key: "index", header: "#", align: "center" as const },
  { key: "taskName", header: "Activity", align: "left" as const },
  { key: "initialDate", header: "Initial Plan", align: "center" as const },
  { key: "planLastDate", header: "Present Date", align: "center" as const },
  { key: "curActualDate", header: "Actual Date", align: "center" as const },
  { key: "deviationsDay", header: "Deviation (Days)", align: "center" as const },
  {
    key: "commentCount",
    header: "Comments",
    align: "center" as const,
    render: () => (
      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
        Comnt.
      </button>
    ),
  },
];

const TnaDetailReport: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tnaDetailsReport, loading } = useSelector((state: RootState) => state.tnaReport);
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const jobNumber = params.get("jobNo") || "";

  useEffect(() => {
    document.title = "TNA Detail Report";

    return () => {
      document.title = "";
    };
  }, [dispatch]);

  useEffect(() => {
    if (jobNumber !== "") {
      dispatch(fetchTnaDetailsReport({ jobNumber }));
    }
  }, [jobNumber]);

  return (
    <></>
  );
};

export default TnaDetailReport;
