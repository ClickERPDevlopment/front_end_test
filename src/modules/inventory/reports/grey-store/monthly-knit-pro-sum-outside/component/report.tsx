import moment from "moment";

import ReportTotal from "./report-total";
import { MonthlyKnitProSummOutsideType } from "./monthly-knit-pro-sum-outside-type";

export default function Report({
  data,
}: {
  data: MonthlyKnitProSummOutsideType[];
}) {
  return (
    <div className="container my-7 flex flex-col justify-center items-center">
      <div className="mb-5">
        <h1 className="text-center font-bold text-2xl">
          {data[0]?.COMPANY_NAME}
        </h1>
        <h1 className="text-center">{data[0]?.COMPANY_ADDRESS}</h1>
        <h1 className="text-center text-lg font-bold mt-5">
          Monthly Knitting Production Summary (From outside)
        </h1>
      </div>

      <table>
        <thead className="bg-green-200 border border-black">
          <tr className="border border-black">
            <th className="min-w-[100px] border border-black text-xs  text-center p-2">
              S/L
            </th>
            <th className="min-w-[100px] border border-black text-xs  text-center p-2 ">
              Date
            </th>
            <th className="border border-black text-xs  text-center p-2 ">
              Particular
            </th>
            <th className="border border-black text-xs  text-center p-2 ">
              Buyer Name
            </th>
            <th className="min-w-[200px] border border-black text-xs  text-center p-2 ">
              Gray Rcvd. Qty (kg)
            </th>
            <th className="min-w-[150px] border border-black text-xs  text-center p-2 ">
              Gray Rcvd. Qty (PC)
            </th>
            <th className="min-w-[155px] border border-black text-xs  text-center p-2 ">
              Bill qty.(kg)
            </th>
            <th className="min-w-[60px] border border-black text-xs  text-center p-2">
              Amount
            </th>
          </tr>
        </thead>
        <tbody id="table-body">
          {data?.map((x, i) => (
            <tr key={Math.random()}>
              <td className="border border-black text-xs  text-center p-2">
                {i + 1}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {moment(x.RCV_CHALLAN_DATE).format("DD-MMM-YYYY")}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {x.PARTICULARS}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {x.BUYER}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {x.GREY_RECEIVE_KG}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {x.GREY_RECEIVE_PICES}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {x.BILL_WEIGHT}
              </td>
              <td className="border border-black text-xs  text-center p-2">
                {x.TOTAL_AMOUNT}
              </td>
            </tr>
          ))}
          <ReportTotal data={data} />
        </tbody>
      </table>
    </div>
  );
}
