/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { YarnTransferReportType } from "./yarn-transfer-report-type";

function YarnTransferReportFormat2() {
  const [data, setData] = useState<YarnTransferReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id = "5";

  if (searchParams.get("id")) {
    id = String(searchParams.get("id"));
  }


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/YarnTransferReport?id=${id}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        //console.log(error.message);
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
      <div className="min-w-[50%] w-fit ms-auto me-auto print:min-w-[50%]">
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default YarnTransferReportFormat2;
