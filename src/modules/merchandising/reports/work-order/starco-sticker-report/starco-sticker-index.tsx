import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { iaccWorkOrder } from "../components/iaccWorkOrder";

function StarcoStickerReport() {
  const [data, setData] = useState<iaccWorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id: number = 325;
  let currency: string = "TK";
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

  const sortedData = data.sort((item) => {
    if (item.MTL_NAME.toUpperCase().includes("SIZE LABEL")) return -1;
    if (item.MTL_NAME.toUpperCase().includes("CARE LABEL")) return 0;
    if (item.MTL_NAME.toUpperCase().includes("HANGTAG")) return 1;
    return 1;
  });

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
        <Report data={sortedData}></Report>
      </div>
    </>
  );
}
export default StarcoStickerReport;
