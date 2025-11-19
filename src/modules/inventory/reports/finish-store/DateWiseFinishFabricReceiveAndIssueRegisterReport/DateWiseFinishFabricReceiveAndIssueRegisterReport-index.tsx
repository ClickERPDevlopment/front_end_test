/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from "./DateWiseFinishFabricReceiveAndIssueRegisterReport-type";

function DateWiseFinishFabricReceiveAndIssueRegisterReportIndex() {
  const [data, setData] = useState<DateWiseFinishFabricReceiveAndIssueRegisterReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "02-Jan-25";
  const toDate = searchParams.get("toDate") || "02-Aug-25";
  const buyerId = searchParams.get("buyerId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const poId = searchParams.get("poId") || "0";
  const transectioType = searchParams.get("transectioType") || "";
  const isImport = searchParams.get("isImport") || "false";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const url = `${api.ProductionUrl}/production/FinishFabricStore/DateWiseFinishFabricReceiveAndIssueRegisterReport?fromDate=${fromDate}&toDate=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}&transectioType=${transectioType}&isImport=${isImport}`;

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
    <div className="flex justify-center w-full">
      <div className="container flex justify-center mt-16">
        <h3 className=" text-center p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </div>
  ) : (
    <>
      <div>
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default DateWiseFinishFabricReceiveAndIssueRegisterReportIndex;
