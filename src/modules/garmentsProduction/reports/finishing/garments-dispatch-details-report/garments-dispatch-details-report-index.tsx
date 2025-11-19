import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { IGarmentsDispatchDetailsReportDto } from "./garments-dispatch-details-report-type";

// Types
export interface SearchParamsType {
  buyerId?: number;
  styleId?: number;
  poId?: number;
  companyId?: number;
  fromDate: string;
  toDate: string;
}

function GarmentsDispatchDetailsReport() {
  // API Context
  const api = useApiUrl();

  // State Management
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IGarmentsDispatchDetailsReportDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search Parameters Configuration
  const searchConfig: SearchParamsType = {
    buyerId: Number(searchParams.get("buyerId")) || 0,
    styleId: Number(searchParams.get("styleId")) || 0,
    poId: Number(searchParams.get("poId")) || 0,
    companyId: Number(searchParams.get("companyId")) || 0,
    fromDate: searchParams.get("fromDate") || "01-Sep-2000",
    toDate: searchParams.get("toDate") || "1-Oct-2030",
  };

  // API URL Construction
  const getApiUrl = () => {
    const baseUrl = `${api.ProductionUrl}/production/GmtFinishingReport/GarmentsDispatchDetailsReport`;
    const params = new URLSearchParams({
      fromDate: searchConfig.fromDate,
      toDate: searchConfig.toDate,
      buyerId: String(searchConfig.buyerId),
      styleId: String(searchConfig.styleId),
      poId: String(searchConfig.poId),
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
    document.title = "Report";
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

export default GarmentsDispatchDetailsReport;
