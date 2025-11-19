import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { ICreateDateWisePoSummaryReport } from "./create-date-wise-po-summary-report-type";

// Types
export interface SearchParamsType {
  fromDate: string;
  toDate: string;
  buyerId?: number;
  createdBy?: string;
  companyId?: number;
}

function CreateDateWisePoSummaryReport() {
  // API Context
  const api = useApiUrl();

  // State Management
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<ICreateDateWisePoSummaryReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search Parameters Configuration
  const searchConfig: SearchParamsType = {
    fromDate: searchParams.get("fromDate") || "01-Sep-2000",
    toDate: searchParams.get("toDate") || "1-Oct-2030",
    buyerId: Number(searchParams.get("buyerId")) || 0,
    createdBy: searchParams.get("createdBy") || "",
    companyId: Number(searchParams.get("companyId")) || 0,

  };

  // API URL Construction
  const getApiUrl = () => {
    const baseUrl = `${api.ProductionUrl}/production/MerchReport/CreateDateWisePoSummaryReport`;
    const params = new URLSearchParams({
      fromDate: searchConfig.fromDate,
      toDate: searchConfig.toDate,
      buyerId: String(searchConfig.buyerId),
      createdBy: String(searchConfig.createdBy),
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
    document.title = "Create Date Wise Po Summary Report";
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

export default CreateDateWisePoSummaryReport;
