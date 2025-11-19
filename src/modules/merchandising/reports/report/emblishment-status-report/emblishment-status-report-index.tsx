import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { IEmblishmentStatusReport } from "./emblishment-status-report-type";

// Types
export interface SearchParamsType {
  isDate?: boolean;
  buyerId?: number;
  styleId?: number;
  poId?: number;
  embTypeId?: number;
  supplierId?: number;
  companyId?: number;
  fromDate: string;
  toDate: string;
}

function EmblishmentStatusReport() {
  // API Context
  const api = useApiUrl();

  // State Management
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IEmblishmentStatusReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search Parameters Configuration
  const searchConfig: SearchParamsType = {
    isDate: searchParams.get("isDate") == "True" ? true : false,
    buyerId: Number(searchParams.get("buyerId")) || 0,
    styleId: Number(searchParams.get("styleId")) || 0,
    poId: Number(searchParams.get("poId")) || 0,
    embTypeId: Number(searchParams.get("embTypeId")) || 0,
    supplierId: Number(searchParams.get("supplierId")) || 0,
    companyId: Number(searchParams.get("companyId")) || 0,
    fromDate: searchParams.get("fromDate") || "01-Sep-2000",
    toDate: searchParams.get("toDate") || "1-Oct-2030",
  };

  // API URL Construction
  const getApiUrl = () => {
    const baseUrl = `${api.ProductionUrl}/production/MerchReport/EmblishmentStatusReport`;
    const params = new URLSearchParams({
      isDate: String(searchConfig.isDate),
      fromDate: searchConfig.fromDate,
      toDate: searchConfig.toDate,
      buyerId: String(searchConfig.buyerId),
      styleId: String(searchConfig.styleId),
      poId: String(searchConfig.poId),
      embTypeId: String(searchConfig.embTypeId),
      supplierId: String(searchConfig.supplierId),
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
    document.title = "Emblishment Status Report";
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
          isDate: searchConfig.isDate,
          toDate: searchConfig.toDate,
          fromDate: searchConfig.fromDate,
        }}
      />
    </div>
  );
}

export default EmblishmentStatusReport;
