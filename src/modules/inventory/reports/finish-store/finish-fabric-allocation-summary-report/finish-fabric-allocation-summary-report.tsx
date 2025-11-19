/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios, { AxiosError } from "axios";

// import useApiUrl from "../../hooks/use-ApiUrl";
// import ReportSkeleton from "../../components/report-skeleton";
import {
  FinishFabricAllocationSummaryReportDetailsType,
  FinishFabricAllocationSummaryReportMasterType,
} from "./finish-fabric-allocation-summary-report-type";
import ReportTable from "./components/report-table";
import FinishFabricAllocationUomWiseSummaryReport from "./finish-fabric-allocation-uom-wise-summary/finish-fabric-allocation-uom-wise-summary-index";
import useApiUrl from "@/hooks/use-ApiUrl";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";

export default function FinishFabricAllocationSummaryReport() {
  const [masterData, setMasterData] = useState<
    FinishFabricAllocationSummaryReportMasterType[]
  >([]);
  const [detailsData, setDetailsData] = useState<
    FinishFabricAllocationSummaryReportDetailsType[]
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

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: FinishFabricAllocationSummaryReportMasterType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface groupedByBuyerStyle {
    [key: string]: {
      items: FinishFabricAllocationSummaryReportMasterType[];
    };
  }

  let groupedByBuyerStyle: groupedByBuyerStyle = {};

  if (masterData) {
    groupedByBuyerStyle = groupBy(masterData, ["BUYER", "WORK_ORDER_NO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  if (isLoading) {
    return <ReportSkeleton />;
  } else {
    return (
      <>
        <div className="m-3 print:overflow-visible">
          <h3 className="text-center text-slate-700 mb-1 font-bold text-2xl">
            {masterData[0]?.COMPANY_NAME}
          </h3>
          <h4 className="text-center text-slate-700 mb-1 font-bold text-sm">
            {masterData[0]?.COMPANY_ADDRESS}
          </h4>
          <h3 className="text-center text-slate-700 mb-3 font-bold text-xl">
            Finish Fabric Allocation Summary Report
          </h3>
          <div className="h-auto print:overflow-visible rounded">
            {uniqueKeysArray?.map((key) => (
              <div className="mb-3">
                <h4 className="font-semibold p-1">
                  <span>
                    {" "}
                    Buyer: {groupedByBuyerStyle[key]?.items[0]?.BUYER}
                  </span>
                </h4>
                <ReportTable
                  masterData={groupedByBuyerStyle[key].items}
                  detailsData={detailsData}
                ></ReportTable>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-10">
            <div></div>
            <div className="max-w-[50%] min-w-[40%]">
              <h6 className="font-lg text-center font-bold">Unit Wise Summary</h6>
              <FinishFabricAllocationUomWiseSummaryReport data={masterData} detailsData={detailsData}></FinishFabricAllocationUomWiseSummaryReport>
            </div>
          </div>
        </div>
      </>
    );
  }
}
