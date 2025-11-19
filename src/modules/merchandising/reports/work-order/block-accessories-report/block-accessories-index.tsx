import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IAccessoriesReportWithPo } from "../accessories-report-with-po/accessories-with-po-type";
import BlockAccessoriesReportFormat2 from "../block-accessories-report-format-2/block-accessories-report-format-2-index";
import useAppClient from "@/hooks/use-AppClient";

function BlockAccessoriesReport() {
  const [data, setData] = useState<IAccessoriesReportWithPo[]>([]);
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

  const isColorWiseSummary = searchParams.get("isColorWiseSummary") == "True";

  const client = useAppClient();

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

  console.log(data);

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
      <div className="w-fit ms-auto me-auto">
        {/* <BlockAccessoriesReportFormat2 searchParams={{ currency }} data={data}></BlockAccessoriesReportFormat2> */}
        {
          client.currentClient == client.ICCL
            ? <BlockAccessoriesReportFormat2 searchParams={{ currency }} data={data}></BlockAccessoriesReportFormat2>
            : <Report searchParams={{ currency, isColorWiseSummary }} data={data}></Report>
        }
      </div>
    </>
  );
}
export default BlockAccessoriesReport;
