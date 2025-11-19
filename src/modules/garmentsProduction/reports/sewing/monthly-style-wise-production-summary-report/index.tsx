import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import { MonthlyStyleWiseProductionSummaryReportType } from "./monthly-style-wise-production-summary-report-type";
import Report from "./report-component/report";
import moment from "moment";

const MonthlyStyleWiseProductionSummaryReport: React.FC = () => {
  const location = useLocation();

  const [data, setData] = useState<MonthlyStyleWiseProductionSummaryReportType[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);

  const factoryId = Number(searchParams.get("factoryId")) || 0;
  const buyerId = Number(searchParams.get("buyerId")) || 0;

  const fromDate = searchParams.get("fromDate") || new Date().toISOString().split("T")[0];
  const toDate = searchParams.get("toDate") || new Date().toISOString().split("T")[0];


  const lineColorMap: Record<string, string> = {};
  let colorToggle = false;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const responseInput = await axiosInstance.get<MonthlyStyleWiseProductionSummaryReportType[]>(
        "GmtSewingReport/MonthlyStyleWiseProductionSummaryReport",
        {
          params: {
            factoryId,
            buyerId,
            fromDate,
            toDate,
          },
        }
      );
      setData(responseInput.data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Monthly Style wise Production Summary`;

    fetchData();

    return () => {
      document.title = "";
    };

  }, [factoryId, fromDate,]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="w-[90%] mx-auto p-4 default ">
      <h3 className="text-center font-bold text-2xl p-0 m-0">{data && data[0].COMPANY_NAME}</h3>
      <h3 className="text-center text-sm p-0 m-0">{data && data[0].COMPANY_ADDRESS}</h3>
      <h3 className="text-center font-bold text-lg p-0 m-0">Monthly Style wise Production Summary </h3>

      <h3 className="text-center font-bold text-sm p-0 m-0">From: {moment(fromDate).format("MMM-YY")} To: {moment(toDate).format("MMM-YY")}</h3>
      <Report data={data || []}></Report>

    </div>
  );
};

export default MonthlyStyleWiseProductionSummaryReport;
