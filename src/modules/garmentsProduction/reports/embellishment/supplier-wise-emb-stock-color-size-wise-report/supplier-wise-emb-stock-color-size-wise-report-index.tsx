/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { SupplierWiseEmbStockColorSizeWiseReportType } from "./supplier-wise-emb-stock-color-size-wise-report-type";

function SupplierWiseEmbStockColorSizeWiseReport() {
  const [data, setData] = useState<SupplierWiseEmbStockColorSizeWiseReportType[]>(
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
  const companyId = Number(searchParams.get("companyId") || 1);
  const loggedInCompanyId = Number(searchParams.get("loggedInCompanyId") || 1);
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
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default SupplierWiseEmbStockColorSizeWiseReport;
