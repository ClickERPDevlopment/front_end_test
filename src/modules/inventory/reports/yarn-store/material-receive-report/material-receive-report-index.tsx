/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { MaterialReceiveReportType } from "./material-receive-report-type";

function MaterialReceiveReport() {
  const [data, setData] = useState<MaterialReceiveReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const autoID = searchParams.get("autoID") || 1;
  const POID = searchParams.get("POID") || 12;
  const company_no = searchParams.get("company_no") || 1;


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Material Receive Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/MaterialReceiveReport`,
            {
              params: {
                autoID, POID,
                company_no
              }
            }
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
      <div className="w-fit min-w-[50%] ms-auto me-auto">
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default MaterialReceiveReport;
