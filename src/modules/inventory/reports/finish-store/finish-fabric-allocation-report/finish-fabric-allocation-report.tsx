import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios, { AxiosError } from "axios";

import {
  FinishFabricAllocatinReportDetailsType,
  FinishFabricAllocatinReportMasterType,
} from "./finish-fabric-allocation-report-type";
import FFATable from "./components/ffa-table";
import useApiUrl from "@/hooks/use-ApiUrl";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";

export default function FinishFabricAllocationReport() {
  const [masterData, setMasterData] = useState<
    FinishFabricAllocatinReportMasterType[]
  >([]);
  const [detailsData, setDetailsData] = useState<
    FinishFabricAllocatinReportDetailsType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let buyerId: string | null = "0";
  let fabricId: string | null = "0";
  let woId: string | null = "0";
  let orderRef: string | null = "";
  let isStockAvl: string | null = "true";
  let fromDate: string | null = "01-Jan-24";
  let toDate: string | null = "01-Jan-25";

  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("fabricId")) {
    fabricId = searchParams.get("fabricId");
  }
  if (searchParams.get("woId")) {
    woId = searchParams.get("woId");
  }
  if (searchParams.get("orderRef")) {
    orderRef = searchParams.get("orderRef");
  }
  if (searchParams.get("isStockAvl")) {
    isStockAvl = searchParams.get("isStockAvl");
  }

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }

  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/FinishFabricStore/FinishFabricAllocationReportMaster?buyerId=${buyerId}&fabricId=${fabricId}&orderRef=${orderRef}&isStockAvl=${isStockAvl}&woId=${woId}&fromDate=${fromDate}&toDate=${toDate}`
          )
          .then((res) => setMasterData(res.data));

        await axios
          .get(
            `${api.ProductionUrl}/production/FinishFabricStore/FinishFabricAllocationReportDetails?buyerId=${buyerId}&fabricId=${fabricId}&orderRef=${orderRef}&isStockAvl=${isStockAvl}&woId=${woId}`
          )
          .then((res) => setDetailsData(res.data));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log((error as AxiosError).message);
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, fabricId, isStockAvl, orderRef, woId]);


  const groupedData = new Map<string, FinishFabricAllocatinReportMasterType>();

  masterData.forEach((item) => {
    const key = [
      item.SUPPLIER,
      item.WORK_ORDER_NO,
      item.ORDER_REFERENCE,
      item.FABRIC,
      item.MTL_COLOR,
      item.UOM,
      item.CONSUMPTION_PER_DZN,
      item.AGEING
    ].join("|");

    if (!groupedData.has(key)) {
      groupedData.set(key, { ...item });
    } else {
      const existing = groupedData.get(key)!;
      existing.WO_QTY += item.WO_QTY;
      existing.RECEIVE_QTY += item.RECEIVE_QTY;
      existing.RET_QTY += item.RET_QTY;
      existing.ALLOCATED_QTY += item.ALLOCATED_QTY;
    }
  });

  const uniqueMasterData = Array.from(groupedData.values());

  if (isLoading) {
    return <ReportSkeleton />;
  } else {
    return (
      <>
        <div className="m-3 print:overflow-visible">
          <h3 className="text-center text-slate-700 m-3 font-bold text-2xl">
            {masterData[0]?.COMPANY_NAME}
          </h3>
          <h3 className="text-center text-slate-700 m-3 font-bold text-xl">
            Finish Fabric Allocation Report
          </h3>
          <div className="border h-auto print:overflow-visible rounded">
            <table className="border-collapse table-fixed rounded">
              {uniqueMasterData.map((mData) => (
                <FFATable
                  key={Math.random()}
                  masterData={mData}
                  detailsData={detailsData.filter(
                    (dData) =>
                      dData.BLOCK_WORK_ORDER_ID === mData.WO_ID &&
                      dData.FABRIC_ID === mData.FABRIC_ID &&
                      dData.STOCK_FABRIC_COLOR_ID === mData.GMT_COLOR_ID &&
                      dData.ORDER_REFERENCE === mData.ORDER_REFERENCE
                  )}
                />
              ))}
            </table>
          </div>
        </div>
      </>
    );
  }
}
