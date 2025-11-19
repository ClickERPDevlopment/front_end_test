import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import { SewingInputDetailsReportType, SewingOutputDetailsReportType } from "./sewing-input-output-report-type";
import SewingInputReport from "./sewing-input/report";
import SewingOutputReport from "./sewing-output/report";

const SewingInputOutputReport: React.FC = () => {
  const location = useLocation();

  const [sewingInputData, setSewingInputData] = useState<SewingInputDetailsReportType[] | null>(null);
  const [sewingOutputData, setSewingOutputData] = useState<SewingOutputDetailsReportType[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);

  const factoryId = Number(searchParams.get("factoryId")) || 0;
  const buyerId = Number(searchParams.get("buyerId")) || 0;
  const styleId = Number(searchParams.get("styleId")) || 0;
  const po = searchParams.get("po") || "";
  const colorId = Number(searchParams.get("colorId")) || 0;

  const fromDate = searchParams.get("fromDate") || new Date().toISOString().split("T")[0];
  const toDate = searchParams.get("toDate") || new Date().toISOString().split("T")[0];
  const fromOPMDate = searchParams.get("fromOPMDate") || new Date().toISOString().split("T")[0];
  const toOPMDate = searchParams.get("toOPMDate") || new Date().toISOString().split("T")[0];


  const lineColorMap: Record<string, string> = {};
  let colorToggle = false;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const responseInput = await axiosInstance.get<SewingInputDetailsReportType[]>(
        "GmtSewingReport/SewingInputDetailsReport",
        {
          params: {
            factoryId,
            buyerId,
            styleId,
            po,
            colorId,
            fromDate,
            toDate,
            fromOPMDate,
            toOPMDate,
          },
        }
      );
      setSewingInputData(responseInput.data);

      const responseOutput = await axiosInstance.get<SewingOutputDetailsReportType[]>(
        "GmtSewingReport/SewingOutputDetailsReport",
        {
          params: {
            factoryId,
            buyerId,
            styleId,
            po,
            colorId,
            fromDate,
            toDate,
            fromOPMDate,
            toOPMDate,
          },
        }
      );
      setSewingOutputData(responseOutput.data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    document.title = `Sewing Input Output Report`;

    fetchData();

    return () => {
      document.title = "";
    };

  }, [factoryId, fromDate,]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="w-[90%] mx-auto p-4 default ">
      <h3 className="text-center font-bold text-2xl p-0 m-0">{sewingInputData && sewingInputData[0]?.COMPAY_NAME}</h3>
      <h3 className="text-center font-bold text-lg p-0 m-0">Sewing Input</h3>
      <SewingInputReport data={sewingInputData || []}></SewingInputReport>
      <h3 className="text-center font-bold text-lg mt-3 p-0 m-0">Sewing Output</h3>
      <SewingOutputReport data={sewingOutputData || []}></SewingOutputReport>
    </div>
  );
};

export default SewingInputOutputReport;
