import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { YarnTwistingWorkOrderReportType } from "./yarn-twisting-wrok-order-rpt-type";

function YarnTwistingWorkOrderReport() {
  const [data, setData] = useState<YarnTwistingWorkOrderReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id: number = 0;

  if (searchParams.get("id")) {
    id = Number(searchParams.get("id"));
  }

  console.log("id: ", id);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Yarn twisting work-order";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/YarnTwistingWo/GetTwistingWorkOrderReport?id=${id}`
          )
          .then((res) => {
            //console.log(res.data);
            if (res.data) {
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
  }, [api.ProductionUrl, id]);

  //console.log(data);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="print:border-none min-w-full py-5 px-10">
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default YarnTwistingWorkOrderReport;
