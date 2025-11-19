import { MonthlyKnitProSummOutsideType } from "./monthly-knit-pro-sum-outside-type";

export default function ReportTotal({
  data,
}: {
  data: MonthlyKnitProSummOutsideType[];
}) {
  return (
    <tr key={Math.random()}>
      <td
        className="border border-black text-xs  text-center p-2 font-bold"
        colSpan={4}
      >
        Total
      </td>
      <td className="border border-black text-xs  text-center p-2">
        {data.reduce((pre, c) => pre + c.GREY_RECEIVE_KG, 0).toFixed(2)}
      </td>
      <td className="border border-black text-xs  text-center p-2">
        {data.reduce((pre, c) => pre + c.GREY_RECEIVE_PICES, 0).toFixed(2)}
      </td>
      <td className="border border-black text-xs  text-center p-2">
        {data.reduce((pre, c) => pre + c.BILL_WEIGHT, 0).toFixed(2)}
      </td>
      <td className="border border-black text-xs  text-center p-2">
        {data.reduce((pre, c) => pre + c.TOTAL_AMOUNT, 0).toFixed(2)}
      </td>
    </tr>
  );
}
