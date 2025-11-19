import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import moment from "moment";

import useApiUrl from "@/hooks/use-ApiUrl";
import DailyKnittingUpdateTotal from "./components/daily-knitting-update-total";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { DailyKnittingUpdate } from "./components/dailyKnittingUpdateInterface";

export default function DailyKnittingUpdateReport() {
  const [data, setData] = useState<DailyKnittingUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  //
  let fromDate: string | null = "";
  let toDate: string | null = "";
  let isDateWise: string | null = "";
  let buyerId: string | null = "";
  let poId: string | null = "";
  let partyIds: string | null = "";
  let isBalanceZeroNotShow: string | null = "";

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }
  if (searchParams.get("isDateWise")) {
    isDateWise = searchParams.get("isDateWise");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("partyIds")) {
    partyIds = searchParams.get("partyIds");
  }
  if (searchParams.get("isBalanceZeroNotShow")) {
    isBalanceZeroNotShow = searchParams.get("isBalanceZeroNotShow");
  }

  console.log("fromDate: ", fromDate);
  console.log("toDate: ", toDate);
  console.log("isDateWise: ", isDateWise);
  console.log("buyerId: ", buyerId);
  console.log("poId: ", poId);
  console.log("partyIds: ", partyIds);
  console.log("isBalanceZeroNotShow: ", isBalanceZeroNotShow);

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
            `${api.ProductionUrl}/production/knittingreport/DailyKnittingUpdate?fromDate=${fromDate}&toDate=${toDate}&isDateWise=${isDateWise}&buyerId=${buyerId}&poId=${poId}&partyIds=${partyIds}&isBalanceZeroNotShow=${isBalanceZeroNotShow}`
          )
          .then((res) => {
            if (res.data) {
              const result = res.data;
              if (result.IsError) {
                console.log("Error found: ", result.ErrorMessage);
                setData([]);
              } else {
                setData(result.Data);
                console.log(result.Data);
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
    <>
      {isLoading ? (
        <>
          <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </>
      ) : (
        <div className="mx-2">
          <table>
            <thead className="bg-red-100 border border-black sticky top-0 z-10">
              <tr className="border border-black">
                <th colSpan={31} className="border border-black">
                  <div className="p-0 m-0">
                    <span className="absolute left-[75%] font-bold text-lg">
                      {moment().format("DD-MMM-YYYY")}
                    </span>
                  </div>
                  <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
                    Daily Knitting Update
                  </h3>
                </th>
              </tr>
              <tr className="border border-black">
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Program Date
                </th>
                <th className="min-w-[70px] border border-black text-xs  text-center p-2 ">
                  KP NO
                </th>
                <th className="border border-black text-xs  text-center p-2 ">
                  BUYER
                </th>
                <th className="min-w-[200px] border border-black text-xs  text-center p-2 ">
                  STYLE NO & NAME/ PO NO
                </th>
                <th className="min-w-[150px] border border-black text-xs  text-center p-2 ">
                  Yarn Count ,Brand & lot
                </th>
                <th className="min-w-[155px] border border-black text-xs  text-center p-2 ">
                  F/TYPE
                </th>
                <th className="min-w-[60px] border border-black text-xs  text-center p-2">
                  MC Dia
                </th>
                <th className="min-w-[80px] border border-black text-xs  text-center p-2">
                  DIA
                </th>
                <th className="min-w-[80px] border border-black text-xs  text-center p-2">
                  GSM
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  COLOUR
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Stitch
                </th>
                <th className="min-w-[60px] border border-black text-xs  text-center p-2">
                  Lycra CM
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Program: QTY/ Yarn qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  KP Pcs
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Yarn Delivery Qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  YARN BALANCE
                </th>
                <th className="min-w-[150px] border border-black text-xs  text-center p-2">
                  Party Name
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Today Production qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Gray Delivery Qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Gray Delivery Pcs
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Lose Yarn
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Wastage Qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  BALANCE QTY
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  BALANCE PCS
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Rate
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Knitting Start Date
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Knitting Close Date
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Grey Rcv Qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Grey Dyeing Issue Qty
                </th>
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Grey Dyeing Issue Balance Qty
                </th>
              </tr>
            </thead>
            <tbody id="table-body">
              {data?.map((x) => (
                <tr>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.PROGRAM_DATE}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.PROGRAM_NO}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.BUYER}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.STYLENO + " || " + x.STYLENAME + " || " + x.PONO}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.YARN_LOT_BRAND}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.FABRIC}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.MC_DIA}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.FINISH_DIA}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GSM}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GMT_COLOR}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.STITCH_LENGTH}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.LYCRA_CM}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KP_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KP_PCS}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.YARN_ISSUE_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.YARN_ISSUE_BALANCE_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KNITTING_HOUSE}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.TODAY_PRODUCTION_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GREY_DELIVERY_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GREY_DELIVERY_PCS}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.LOSE_YARN_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.WASTAGE_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.BALANCE_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.BALANCE_PCS}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.KNITTING_RATE}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {moment(x.KNITTING_START).format("DD/MMM/YYYY") ===
                      "01/Jan/2001"
                      ? ""
                      : moment(x.KNITTING_START).format("DD/MMM/YYYY")}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {moment(x.KNITTING_END).format("DD/MMM/YYYY") ===
                      "01/Jan/2001"
                      ? ""
                      : moment(x.KNITTING_END).format("DD/MMM/YYYY")}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GREY_RCV_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GREY_DYEING_ISSUE_QTY}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GREY_DYEING_ISSUE_BALANCE_QTY}
                  </td>
                </tr>
              ))}
              <DailyKnittingUpdateTotal data={data} />
            </tbody>
          </table>
        </div>
      )}
    </>
    // {isLoading ? (
    //   <>
    //     <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
    //       <Skeleton width={400} height={40} />
    //     </h3>
    //     <TableSkeleton />
    //   </>
    // ) :(
    //   <>
    //   // <div className="m-1 w-[99vw]">
    //   {/* <div className="p-0 m-0">
    //     <span className="absolute left-[75%] font-bold text-lg">{moment().format('DD-MMM-YYYY')}</span>
    //     </div>
    //     <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
    //     Daily Knitting Update
    //     </h3> */}
    //     <div className="overflow-auto w-[100%] h-[85vh] print:overflow-visible">

    //     </div>

    //     </>
    // )}
  );
}
