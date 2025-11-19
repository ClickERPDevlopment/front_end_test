import useApiUrl from "@/hooks/use-ApiUrl";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IShortShipmentReasonStatus } from "./short-shipment-reason-status-type";

function ShortShipmentReasonStatusReport() {
  // State management
  const [data, setData] = useState<IShortShipmentReasonStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL params handling
  const [searchParams] = useSearchParams();
  const api = useApiUrl();

  // Extract and parse URL parameters
  const buyerId = Number(searchParams.get("buyerId")) || 0;
  const styleId = Number(searchParams.get("styleId")) || 0;
  const poId = Number(searchParams.get("poId")) || 0;
  const fromDate = searchParams.get("fromDate") || "01-Jun-0001";
  const toDate = searchParams.get("toDate") || "06-Oct-2025";
  const poIds = searchParams.get("poIds") || "";

  // Set document title
  useEffect(() => {
    document.title = "Short Shipment Reason Status Report";
  }, []);

  useEffect(() => {
    const fetchShortShipmentData = async () => {
      try {
        setIsLoading(true);
        const url = `${api.ProductionUrl}/production/GmtFinishingReport/GetShortShipmentReasonStatusReport`;
        const params = {
          dtFrom: fromDate,
          dtTo: toDate,
          buyerId,
          styleId,
          poId,
          poIds,
        };

        const response = await axios.get(url, { params });

        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        const err = error as AxiosError;
        setErrorMessage(err?.response?.data as string);
        console.error(
          "Error fetching short shipment data:",
          err.response?.data
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchShortShipmentData();
  }, [api.ProductionUrl, fromDate, toDate, buyerId, styleId, poId, poIds]);

  console.log(data);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <h3 className="text-center p-2 m-4 text-3xl font-bold">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </div>
      ) : (
        <div>
          {errorMessage ? (
            <div className="text-center mt-20">
              <h1 className="font-bold text-2xl text-red-600">
                <em>{errorMessage}</em>
              </h1>
            </div>
          ) : (
            <Report data={data} />
          )}
        </div>
      )}
    </>
  );
}
export default ShortShipmentReasonStatusReport;
