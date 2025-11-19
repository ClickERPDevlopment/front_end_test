import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { iaccWorkOrder } from "../components/iaccWorkOrder";

function GeorgeVariousMaterialReport() {
  const [data, setData] = useState<iaccWorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id: number = 325;
  let currency: string = "..";
  let cmbReportFormat: string = "";

  if (searchParams.get("id")) {
    id = Number(searchParams.get("id"));
  }
  if (searchParams.get("currency")) {
    currency = String(searchParams.get("currency"));
  }
  if (searchParams.get("cmbReportFormat")) {
    cmbReportFormat = String(searchParams.get("cmbReportFormat"));
  }

  // console.log("id: ", id);
  // console.log("orderRef: ", currency);
  // console.log("fabricId: ", cmbReportFormat);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Accessories work order";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/accessorieswo/GetWorkOrderReport?id=${id}&currency=${currency}&cmbReportFormat=${cmbReportFormat}`
          )
          .then((res) => {
            //console.log(res);
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
  }, []);

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
      <div>
        <Report searchParams={{ currency }} data={data}></Report>
      </div>
    </>
  );
}
export default GeorgeVariousMaterialReport;
