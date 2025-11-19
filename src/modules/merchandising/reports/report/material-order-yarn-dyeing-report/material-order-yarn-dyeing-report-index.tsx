/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { IMaterialOrderYarnDyeingReport } from "./material-order-yarn-dyeing-report-type";
import YarnDyeingWOReportFame from "./fame";
import useAppClient from "@/hooks/use-AppClient";

function MaterialOrderYarnDyeingReport() {
  const [data, setData] = useState<IMaterialOrderYarnDyeingReport[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id = "1";

  if (searchParams.get("id")) {
    id = String(searchParams.get("id"));
  }


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);


  const client = useAppClient();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/MaterialOrderYarnDyeingReport?id=${id}`
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
      <div className="min-w-[60%] w-fit ms-auto me-auto">
        {/* <YarnDyeingWOReportFame data={data} /> */}
        {
          client.currentClient == client.FAME
            ? <YarnDyeingWOReportFame data={data} />
            : <Report data={data} />
        }
      </div>
    </>
  );
}
export default MaterialOrderYarnDyeingReport;
