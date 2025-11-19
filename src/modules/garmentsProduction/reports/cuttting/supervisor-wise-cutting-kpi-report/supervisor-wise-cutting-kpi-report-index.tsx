import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { SupervisorWiseCuttingKPIReportType } from "./supervisor-wise-cutting-kpi-report-type";

// Types
export interface SearchParamsType {
  lineId?: number;
  companyId?: number;
  empCode: string;
  fromDate: string;
  toDate: string;
}

function SupervisorWiseCuttingKPIReport() {
  // API Context
  const api = useApiUrl();

  // State Management
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<SupervisorWiseCuttingKPIReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search Parameters Configuration
  const searchConfig: SearchParamsType = {
    lineId: Number(searchParams.get("lineId")) || 0,
    companyId: Number(searchParams.get("companyId")) || 0,
    empCode: searchParams.get("empCode") || "",
    fromDate: searchParams.get("fromDate") || "01-July-25",
    toDate: searchParams.get("toDate") || "01-July-25",
  };

  // API URL Construction
  const getApiUrl = () => {
    const baseUrl = `${api.ProductionUrl}/production/GmtCuttingReport/SupervisorWiseCuttingKPIReport`;
    const params = new URLSearchParams({
      fromDate: searchConfig.fromDate,
      toDate: searchConfig.toDate,
      lineId: String(searchConfig.lineId),
      empCode: String(searchConfig.empCode),
      companyId: String(searchConfig.companyId),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Data Fetching
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getApiUrl());
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    document.title = "Supervisor Wise Cutting KPI Report";
    fetchData();
  }, []);

  // Render
  if (isLoading) {
    return (
      <div className="container">
        <h3 className="text-center p-2 m-4 text-3xl font-bold">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <Report
        data={data}
        searchParams={{
          toDate: searchConfig.toDate,
          fromDate: searchConfig.fromDate,
        }}
      />
    </div>
  );
}

export default SupervisorWiseCuttingKPIReport;
