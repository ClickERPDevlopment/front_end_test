import { DyeingBillChallanWiseSummaryType } from "./dyeing-bill-challan-wise-summary-type";
import moment from "moment";

export default function DyeingBillChallanWiseSummaryReport({
  data,
}: {
  data: DyeingBillChallanWiseSummaryType[];
}) {
  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="w-full mb-3">
        <h1 className="text-center text-lg font-bold mt-5">
          Dyeing Bill Challan Wise Summary
        </h1>
        {/* <h1 className="text-left font-bold">PO: {data[0]?.PONO}</h1>
        <h1 className="text-left font-bold w-full">
          Style: {data[0]?.STYLENO}
        </h1> */}
      </div>

      <table>
        <thead className="bg-green-200 border border-black">
          <tr>
            <th>PO:</th>
            <th colSpan={2} className="text-left">
              {data[0]?.PONO}
            </th>
            <th>Style:</th>
            <th colSpan={3} className="text-left">
              {data[0]?.STYLENO}
            </th>
          </tr>
          <tr className="border border-black">
            <th className="min-w-[100px] border border-black text-sm  text-center p-2">
              S/L
            </th>
            <th className="min-w-[100px] border border-black text-sm  text-center p-2 ">
              Dyeing Factory
            </th>
            <th className="border border-black text-sm  text-center p-2 ">
              Receive Challan
            </th>
            <th className="border border-black text-sm  text-center p-2 ">
              Receive Challan Date
            </th>
            <th className="min-w-[200px] border border-black text-sm  text-center p-2 ">
              Knitting Rate
            </th>
            <th className="min-w-[200px] border border-black text-sm  text-center p-2 ">
              Quantity
            </th>
            <th className="min-w-[150px] border border-black text-sm  text-center p-2 ">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody id="table-body">
          {data?.map((x, i) => (
            <tr key={Math.random()}>
              <td className="border border-black text-sm  text-center p-2">
                {i + 1}
              </td>
              <td className="border border-black text-sm  text-center p-2">
                {x?.DYEING_FACTORY}
              </td>
              <td className="border border-black text-sm  text-center p-2">
                {x?.RCV_CHALLAN}
              </td>
              <td className="border border-black text-sm  text-center p-2">
                {moment(x.RCV_CHALLAN_DATE).format("DD-MMM-YYYY")}
              </td>
              <td className="border border-black text-sm  text-center p-2">
                {x?.DYEING_RATE}
              </td>
              <td className="border border-black text-sm  text-center p-2">
                {x?.QUANTITY}
              </td>
              <td className="border border-black text-sm  text-center p-2">
                {x?.TOTAL_AMOUNT}
              </td>
            </tr>
          ))}
          <ReportTotal data={data} />
        </tbody>
      </table>
    </div>
  );
}

function ReportTotal({ data }: { data: DyeingBillChallanWiseSummaryType[] }) {
  return (
    <tr key={Math.random()}>
      <td
        className="border border-black text-sm  text-center p-2 font-bold"
        colSpan={6}
      >
        Total
      </td>
      <td className="border border-black text-sm  text-center p-2 font-bold">
        {data?.reduce((p, c) => p + c.TOTAL_AMOUNT, 0)}
      </td>
    </tr>
  );
}
