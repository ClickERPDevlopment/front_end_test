/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import { IGreyFabricStock } from "./components/IGreyFabricStock";
import TotalRow from "./components/total-row";
import BuyerGroupSection from "./components/buyer-group-section";
import { Skeleton } from "@/components/ui/skeleton";
import AppAlert from "@/components/app-alert";
import useAxiosInstance from "@/hooks/axios-instance";;
import TableHeader from "./components/table-header";
import moment from "moment";
import { ICompanyType } from "@/actions/Configurations/company-action";

export default function GreyFabricStockReportIndex() {
  const [company, setCompany] = useState<ICompanyType>();
  const [data, setData] = useState<IGreyFabricStock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const axios = useAxiosInstance();


  let isOPMWise: string | null = "";
  let fromOpmDate: string | null = "";
  let toOpmDate: string | null = "";
  let factoryId: string | null = "";
  let buyerId: string | null = "";
  let poId: string | null = "";
  let styleId: string | null = "";
  let isColorWise: string | null = "";
  let isOnlyStockQuantity: string | null = "";

  if (searchParams.get("isOPMWise")) {
    isOPMWise = searchParams.get("isOPMWise");
  }
  if (searchParams.get("fromOpmDate")) {
    fromOpmDate = searchParams.get("fromOpmDate");
  }
  if (searchParams.get("toOpmDate")) {
    toOpmDate = searchParams.get("toOpmDate");
  }
  if (searchParams.get("factoryId")) {
    factoryId = searchParams.get("factoryId");
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
  if (searchParams.get("isColorWise")) {
    isColorWise = searchParams.get("isColorWise");
  }
  if (searchParams.get("isOnlyStockQuantity")) {
    isOnlyStockQuantity = searchParams.get("isOnlyStockQuantity");
  }
  const api = useApiUrl();

  useEffect(() => {
    document.title = "Grey Fabric Stock Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/GreyStoreReport/GreyFabricStockReport?` +
            `isOPMWise=${isOPMWise}&` +
            `fromOpmDate=${fromOpmDate}&` +
            `toOpmDate=${toOpmDate}&` +
            `factoryId=${factoryId}&` +
            `buyerId=${buyerId}&` +
            `poId=${poId}&` +
            `styleId=${styleId}&` +
            `isColorWise=${isColorWise}&` +
            `isOnlyStockQuantity=${isOnlyStockQuantity}`
          )
          .then((res) => {
            if (res.data) {
              setCompany(res.data.company)
              setData(res.data.reportData);
              console.log(res.data);

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

  const uniqueBuyer = [...new Set(data?.map(item => item.BUYER))];

  return (
    <>
      {isLoading || isRendering ? (
        <div className="w-full flex justify-center flex-col">
          <div className="container flex justify-center flex-col">
            <h3 className=" text-center p-1 m-4 text-3xl font-bold ">
              <Skeleton className="min-h-10 min-w-64" />
            </h3>
            <TableSkeleton />
          </div>
        </div>
      ) : (
        error ?
          (<div className="flex justify-center w-full">
            <AppAlert message={error} type="error" />
          </div>) :
          <div className="">
            <div className="">
              <h1 className="text-center font-bold text-2xl px-5 mt-3">{company?.NAME}</h1>
              <h1 className="text-center font-bold text-2xl px-5 mt-3">

                Grey Fabric Stock Report ({isColorWise?.toLowerCase() === 'true' ? 'Color And Fabric wise' : 'Fabric Wise'})
              </h1>
              {isOPMWise?.toLowerCase() === 'true' ?
                <h5 className="text-center font-bold text-base px-5">
                  Order Placement Month from {moment(fromOpmDate).format("MMM-YYYY")} to {moment(toOpmDate).format("MMM-YYYY")}
                </h5>
                : ''
              }
            </div>

            <div className="border border-gray-500 rounded-md my-5 m-1">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-green-200">
                  <TableHeader />
                </thead>
                <tbody id="table-body">
                  {uniqueBuyer?.map((x, i) => (
                    <BuyerGroupSection
                      data_fabric={data?.filter(y => y.BUYER === x)}
                      buyerIndex={i}
                      key={i} />
                  ))}
                  <TotalRow data={data} title="Total" />
                </tbody>
              </table>
            </div>
          </div>
      )}
    </>
  );
}
