/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { DateWiseYarnReceiveRegisterReportType } from "./date-wise-yarn-receive-register-report-type";

function DateWiseYarnReceiveRegisterReport() {
  const [data, setData] = useState<DateWiseYarnReceiveRegisterReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "01-Jan-20";
  const toDate = searchParams.get("toDate") || "01-Jan-26";
  const supplierId = searchParams.get("supplierId") || 0;
  const yarnId = searchParams.get("yarnId") || 0;
  const lcId = searchParams.get("lcId") || 0;
  const isLocal = searchParams.get("isLocal") === "True";
  const isImported = searchParams.get("isImported") === "True";
  const companyId = searchParams.get("companyId") || 0;

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Yarn Delivery Challan Gate Pass Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams({
          fromDate,
          toDate,
          supplierId: String(supplierId),
          yarnId: String(yarnId),
          lcId: String(lcId),
          isLocal: String(isLocal),
          isImported: String(isImported),
          companyId: String(companyId),
        });

        const url = `${api.ProductionUrl}/production/YarnStoreReport/DateWiseYarnReceiveRegisterReport?${queryParams.toString()}`;

        const res = await axios.get(url);
        if (res.data) {
          setData(res.data);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
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
export default DateWiseYarnReceiveRegisterReport;
