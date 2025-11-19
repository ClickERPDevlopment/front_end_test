/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { DateWiseFabricPurchaseReceiveRegisterReportType } from "./date-wise-fabric-purchase-receive-register-report-type";

function DateWiseFabricPurchaseReceiveRegisterReport() {
  const [data, setData] = useState<DateWiseFabricPurchaseReceiveRegisterReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "02-Jan-25";
  const toDate = searchParams.get("toDate") || "02-Aug-25";
  const lcNo = searchParams.get("lcNo") || "";
  const challanNo = searchParams.get("challanNo") || "";
  const supplierId = searchParams.get("supplierId") || "0";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Date Wise Fabric Purchase Receive Register Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const url = `${api.ProductionUrl}/production/FinishFabricStore/DateWiseFabricPurchaseReceiveRegisterReport?fromDate=${fromDate}&toDate=${toDate}&lcNo=${lcNo}&challanNo=${challanNo}&supplierId=${supplierId}`;

        const res = await axios.get(url);

        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);



  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default DateWiseFabricPurchaseReceiveRegisterReport;
