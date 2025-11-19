import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import moment from "moment";

import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IMonthlyKnittingProdSummaryReportDto } from "./components/monthly-knitting-pro-summary-report.dto";
import useAppCalculation from "@/hooks/use-app-calculation";

export default function MonthlyKnittingProdSummaryReportIndex() {
  const [data, setData] = useState<IMonthlyKnittingProdSummaryReportDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const calculation = useAppCalculation();

  //
  let fromDate: string | null = "";
  let toDate: string | null = "";
  let factoryId: string | null = "";

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }
  if (searchParams.get("factoryId")) {
    factoryId = searchParams.get("factoryId");
  }

  console.log("fromDate: ", fromDate);
  console.log("toDate: ", toDate);
  console.log("factoryId: ", factoryId);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Daily Knitting Update";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/KnittingReport/MonthlyKnittingProdSummaryReport?` +
            `fromDate=${fromDate}&` +
            `toDate=${toDate}&` +
            `factoryId=${factoryId}`
          )
          .then((res) => {
            if (res.data) {
              const result = res.data;
              if (result.IsError) {
                console.log("Error found: ", result.ErrorMessage);
                setData([]);
              } else {
                setData(res.data);
                console.log(res.data);
              }
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

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex flex-col">
          <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </div>
      ) : (
        <div className="mx-2">
          <div>
            <h1 className="text-center text-2xl font-bold">
              {data[0]?.COMPANY_NAME}
            </h1>
            <h1 className="text-center text-base font-bold">
              {data[0]?.COMPANY_ADDRESS}
            </h1>
            <h2 className="text-center p-2 text-xl font-bold">
              Monthly  Production Summary Report
            </h2>
            <div className="p-0 m-0 text-center">
              <span className="text-center text-base">
                From {moment(fromDate).format("MMM-YYYY")} To {moment(toDate).format("MMM-YYYY")}
              </span>
            </div>
          </div>
          <table>
            <thead className="border border-black sticky top-0 z-10 bg-green-200">
              <tr className="border border-black">
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Month
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2" colSpan={3}>
                  Inside production details with value
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2" colSpan={5}>
                  Outside production details with value
                </th>
              </tr>
              <tr className="border border-black">
                <th className="border border-black text-center p-1">Production Month</th>
                <th className="border border-black text-center p-1">Inside Production (kg)</th>
                <th className="border border-black text-center p-1">Inside Production (Pcs)</th>
                <th className="border border-black text-center p-1">Knitting  Sale  Value (TK)</th>
                <th className="border border-black text-center p-1">Outside Production (kg)</th>
                <th className="border border-black text-center p-1">Outside Production (Pcs)</th>
                <th className="border border-black text-center p-1">Knitting  Bill Value ( TK)</th>
                <th className="border border-black text-center p-1">Actual Bill Value ( TK )</th>
                <th className="border border-black text-center p-1">Profit/Loss ( TK )</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {data?.map((x) => (
                <tr>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.ACTION_DATE}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KNIT_PRO_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KNIT_PRO_PCS}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KNIT_SALES_AMOUNT}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.OUTSIDE_PRODUCTION_KG}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.OUTSIDE_PRODUCTION_PCS}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KNITTING_BILL_VALUE}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.ACTUAL_BILL_VALUE}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.PROFIT_LOSS}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-green-100">
                <td className="border border-black text-xs  text-center p-2">
                  Total
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "KNIT_PRO_QTY").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "KNIT_PRO_PCS").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "KNIT_SALES_AMOUNT").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "OUTSIDE_PRODUCTION_KG").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "OUTSIDE_PRODUCTION_PCS").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "KNITTING_BILL_VALUE").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "ACTUAL_BILL_VALUE").toFixed(2)}
                </td>
                <td className="border border-black text-xs  text-center p-2">
                  {calculation.CalculateSum(data, "PROFIT_LOSS").toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
