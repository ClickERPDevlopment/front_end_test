/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import { IAtoZReportFabric } from "./components/IAtoZReportFabric";
import TotalRow from "./components/total-row";
import BuyerGroupSection from "./components/buyer-group-section";
import { Skeleton } from "@/components/ui/skeleton";
import AppAlert from "@/components/app-alert";
import useAxiosInstance from "@/hooks/axios-instance";;
import { IAtoZReportGmt } from "./components/IAtoZReportGmt";
import TableHeader from "./components/table-header";
import moment from "moment";

export default function AtoZReportIndex() {
  const [data_fabric, setDataFabric] = useState<IAtoZReportFabric[]>([]);
  const [data_gmt, setDataGMT] = useState<IAtoZReportGmt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const axios = useAxiosInstance();


  let isOpmWise: string | null = "";
  let fromOpmDate: string | null = "";
  let toOpmDate: string | null = "";
  let companyId: string | null = "";
  let buyerId: string | null = "";
  let poId: string | null = "";
  let styleId: string | null = "";
  let isPlanningDateWise: string | null = "";
  let fromPlanningDate: string | null = "";
  let toPlanningDate: string | null = "";

  if (searchParams.get("isOpmWise")) {
    isOpmWise = searchParams.get("isOpmWise");
  }
  if (searchParams.get("fromOpmDate")) {
    fromOpmDate = searchParams.get("fromOpmDate");
  }
  if (searchParams.get("toOpmDate")) {
    toOpmDate = searchParams.get("toOpmDate");
  }
  if (searchParams.get("companyId")) {
    companyId = searchParams.get("companyId");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }
  if (searchParams.get("isPlanningDateWise")) {
    isPlanningDateWise = searchParams.get("isPlanningDateWise");
  }
  if (searchParams.get("fromPlanningDate")) {
    fromPlanningDate = searchParams.get("fromPlanningDate");
  }
  if (searchParams.get("toPlanningDate")) {
    toPlanningDate = searchParams.get("toPlanningDate");
  }




  const api = useApiUrl();

  useEffect(() => {
    document.title = "A-Z Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/AtoZReport?isOpmWise=${isOpmWise}&fromOpmDate=${fromOpmDate}&toOpmDate=${toOpmDate}&companyId=${companyId}&buyerId=${buyerId}&poId=${poId}&styleId=${styleId}&isPlanningDateWise=${isPlanningDateWise}&fromPlanningDate=${fromPlanningDate}&toPlanningDate=${toPlanningDate}`
          )
          .then((res) => {
            if (res.data) {
              setDataFabric(res.data.lstFabricData);
              setDataGMT(res.data.lstGMTData);
              // console.log(res.data.lstGMTData);
              requestAnimationFrame(() => {
                setIsRendering(false);
              });
              setIsLoading(false);
            } else {
              console.log('error', res);
              setError('Can not load data. Please try again later.');
            }
          })
          .catch((m) => {
            setError('Can not load data. Please try again later.');
            console.log('error', m)
            setIsLoading(false);
            setIsRendering(false);
          }
          );

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const uniqueBuyer = [...new Set(data_fabric?.map(item => item.BUYER))];

  return (
    <>
      {isLoading || isRendering ? (
        <>
          <h3 className=" text-center p-1 m-4 text-3xl font-bold ">
            <Skeleton className="min-h-10 min-w-64" />
          </h3>
          <TableSkeleton />
        </>
      ) : (
        error ? <AppAlert message={error} type="error" /> :
          <div className="">
            <div className="">
              <h1 className="text-left font-bold text-2xl px-5 mt-3">A-Z Report</h1>
              {isOpmWise?.toLowerCase() === 'true' ?
                <h5 className="text-left font-bold text-base px-5">
                  Order Placement Month from {moment(fromOpmDate).format("MMM-YYYY")} to {moment(toOpmDate).format("MMM-YYYY")}
                </h5>
                : ''
              }
              {isPlanningDateWise?.toLowerCase() === 'true' ?
                <h5 className="text-left font-bold text-base px-5">
                  Planning Date from {moment(fromPlanningDate).format("MMM-YYYY")} to {moment(toPlanningDate).format("MMM-YYYY")}
                </h5>
                : ''
              }
            </div>

            <div className="border border-gray-500 rounded-md my-5 max-h-screen/20 m-1">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <TableHeader />
                </thead>
                <tbody id="table-body">
                  {uniqueBuyer?.map((x, i) => (
                    <BuyerGroupSection
                      data_fabric={data_fabric?.filter(y => y.BUYER === x)}
                      data_gmt={data_gmt}
                      buyerIndex={i}
                      key={i} />
                  ))}
                  <TotalRow data={data_fabric} title="Total" />
                </tbody>
              </table>
            </div>
          </div>
      )}
    </>
  );
}
