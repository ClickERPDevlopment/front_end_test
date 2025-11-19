/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import moment from "moment";

import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IStyleWiseProfitLossReport } from "./components/IStyleWiseProfitLossReport";
import TotalRow from "./components/total-row";
import BuyerGroupSection from "./components/buyer-group-section";

export default function StyleWiseProfitLossReportIndex() {
  const [data, setData] = useState<IStyleWiseProfitLossReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  //
  let month: string | null = "";
  let buyerId: string | null = "";
  let companyId: string | null = "";


  if (searchParams.get("month")) {
    month = searchParams.get("month");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("companyId")) {
    companyId = searchParams.get("companyId");
  }
  console.log("month: ", month);
  console.log("buyerId: ", buyerId);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Style-wise profit loss report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/StyleWiseProfitLossReport?month=${month}&buyerId=${buyerId}&companyId=${companyId}`
          )
          .then((res) => {
            if (res.data) {
              setData(res.data);
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const uniqueBuyer = [...new Set(data?.map(item => item.BUYER))];

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="container flex justify-center mt-10">
          <h3 className=" text-center p-1 m-4 text-3xl font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </div>
      ) : (

        data.length === 0 ?
          <div className="print:m-0 overflow-hidden  bg-sky-100 border-t border-b border-sky-500 text-sky-700 px-4 py-3 mt-16" role="alert">
            <p className="font-bold text-xl">Informational message</p>
            <p className="text-base">No Data Found. Please check "Style Wise Cost Breakdown" Entry.</p>
          </div>
          :
          <div className="">

            <div className="">
              <h1 className="text-center font-bold text-2xl">Style-wise Profit & Loss Report</h1>
              <h5 className="text-center font-bold text-base">Month: {moment(month).format("MMM-YYYY")}</h5>
            </div>

            <div className="border border-gray-500 rounded-md my-5">
              <table className="w-full">
                <thead className="sticky top-0 z-10 bg-green-200">
                  <tr>
                    <th className="min-w-[100px]  text-balance  text-center p-1 rounded-tl-md">Buyer</th>
                    <th className="min-w-[100px]  text-balance  text-center p-1 ">Style</th>
                    <th className="min-w-[100px] text-balance  text-center p-1 ">Job No</th>
                    <th className="text-balance text-center p-1 ">Order Qty</th>
                    <th className="text-balance text-center p-1 ">Ship Qty </th>
                    <th className="text-balance text-center p-1 ">Fabric Cost($)</th>
                    <th className="text-balance text-center p-1 ">Accessories Cost($)</th>
                    <th className="text-balance text-center p-1 ">Emblishment Cost($)</th>
                    <th className="text-balance text-center p-1 ">Commercial Cost($)</th>
                    <th className="text-balance text-center p-1 ">CM Cost($)</th>
                    <th className="text-balance text-center p-1 ">Total Cost($)</th>
                    <th className="text-balance text-center p-1 ">Ship Value($)</th>
                    <th className="text-balance text-center p-1 rounded-tr-md ">Profit/Loss($)</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {uniqueBuyer?.map((buyer, i) => (
                    <BuyerGroupSection key={i} data={data.filter(y => y.BUYER === buyer)} />
                  ))}
                  <TotalRow data={data} title="Total" />
                </tbody>
              </table>
            </div>
          </div>
      )}
    </div>
  );
}
