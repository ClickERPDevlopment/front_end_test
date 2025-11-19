import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IAccessoriesReportWithPo } from "./accessories-with-po-type";

function AccessoriesReportWithPo() {
  const [data, setData] = useState<IAccessoriesReportWithPo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id: number = 227;
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

  const isShipDateShow: boolean = searchParams.get("isShipDateShow") === "True" ? true : false;


  // console.log("id: ", id);
  // console.log("orderRef: ", currency);
  // console.log("fabricId: ", cmbReportFormat);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Accessories report with PO";
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
      <div className="print:border-none w-fit ms-auto me-auto min-w-[70%]">
        <Report data={data} isShipDateShow={isShipDateShow}></Report>
      </div>
    </>
  );
}
export default AccessoriesReportWithPo;
