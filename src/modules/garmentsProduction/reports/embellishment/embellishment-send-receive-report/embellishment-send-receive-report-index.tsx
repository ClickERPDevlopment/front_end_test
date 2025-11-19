/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { SupplierWiseEmbStockReportType } from "./embellishment-send-receive-report-type";

function EmbellishmentSendReceiveReport() {
  const [data, setData] = useState<SupplierWiseEmbStockReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const fromOpmDate = searchParams.get("fromOpmDate") || "01-Jan-25";
  const toOpmDate = searchParams.get("toOpmDate") || "01-Jan-25";
  const fromSendRcvDate = searchParams.get("fromSendRcvDate") || "01-Jan-25";
  const toSendRcvDate = searchParams.get("toSendRcvDate") || "01-Jan-25";
  const isOpmDate = searchParams.get("isOpmDate") === "True";
  const isSendRcvDate = searchParams.get("isSendRcvDate") === "True";
  const buyerId = Number(searchParams.get("buyerId") || 0);
  const supplierId = Number(searchParams.get("supplierId") || 0);
  const styleId = Number(searchParams.get("styleId") || 0);
  const poId = Number(searchParams.get("poId") || 0);
  const colorId = Number(searchParams.get("colorId") || 0);
  const companyId = Number(searchParams.get("companyId") || 1);
  const loggedInCompanyId = Number(searchParams.get("loggedInCompanyId") || 1);


  const searchParamsObj = {
    fromOpmDate,
    toOpmDate,
    fromSendRcvDate,
    toSendRcvDate,
    isOpmDate,
    isSendRcvDate,
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams({
          fromOpmDate,
          toOpmDate,
          fromSendRcvDate,
          toSendRcvDate,
          isOpmDate: String(isOpmDate),
          isSendRcvDate: String(isSendRcvDate),
          buyerId: buyerId.toString(),
          supplierId: supplierId.toString(),
          styleId: styleId.toString(),
          poId: poId.toString(),
          colorId: colorId.toString(),
          companyId: companyId.toString(),
          loggedInCompanyId: loggedInCompanyId.toString()
        });

        const url = `${api.ProductionUrl}/production/EmbReport/SupplierWiseEmbStockReport?${queryParams.toString()}`;

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
        <Report data={data} searchParamsObj={searchParamsObj}></Report>
      </div>
    </>
  );
}
export default EmbellishmentSendReceiveReport;
