/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { IFinishFabricStockResponse } from "./IFinishFabricStockReport";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import moment from "moment";
import React from "react";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import Report from "./report";

export default function FinishFabricStockReportIndex() {
  const api = useApiUrl();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState<IFinishFabricStockResponse>();

  let companyId: string | null = "";
  let isOpmWise: string | null = "";
  let fromDate: string | null = "";
  let toDate: string | null = "";
  let buyerId: string | null = "";
  let poId: string | null = "";
  let styleId: string | null = "";
  let colorId: string | null = "";
  let isOnlyStockQty: string | null = "";
  let isSizeWiseCheck: string | null = "";
  let isOnlyInactivePo: string | null = "";

  companyId = searchParams.get("companyId") ?? '0';
  buyerId = searchParams.get("buyerId") ?? '0';
  poId = searchParams.get("poId") ?? '0';
  styleId = searchParams.get("styleId") ?? '0';
  colorId = searchParams.get("colorId") ?? '0';
  isOnlyStockQty = searchParams.get("isOnlyStockQty") ?? 'false';
  isSizeWiseCheck = searchParams.get("isSizeWiseCheck") ?? 'false';
  isOnlyInactivePo = searchParams.get("isOnlyInactivePo") ?? 'false';
  isOpmWise = searchParams.get("isOpmWise") ?? 'false';
  fromDate = searchParams.get("fromDate") ?? moment().format('DD-MM-YYYY');
  toDate = searchParams.get("toDate") ?? moment().format('DD-MM-YYYY');

  useEffect(() => {
    document.title = "Finish fabric stock";

    const getData = async () => {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/FinishFabricStore/FinishFabricsStockDetailsReport?` +
            `companyId=${companyId}&` +
            `isOpmWise=${isOpmWise}&` +
            `fromDate=${fromDate}&` +
            `toDate=${toDate}&` +
            `buyerId=${buyerId}&` +
            `poId=${poId}&` +
            `styleId=${styleId}&` +
            `colorId=${colorId}&` +
            `isOnlyStockQty=${isOnlyStockQty}&` +
            `isSizeWiseCheck=${isSizeWiseCheck}&` +
            `isOnlyInactivePo=${isOnlyInactivePo}`
          )
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              const result = res.data as IFinishFabricStockResponse;
              setData(result);
              setIsLoading(false);
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log(m));
      } catch (error: any) {
        setIsLoading(false);
        console.log(error.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ReportSkeleton />
      ) : (
        <Report
          data={data?.Data}
          CompanyName={data?.CompanyName}
          CompanyAddress={data?.CompanyAddress}
          isSizeWiseCheck={isSizeWiseCheck.toLowerCase() === 'true' ? true : false} />
      )}
    </>
  );
}
