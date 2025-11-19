/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IMonthlyOrderVsShipmentStatusReport } from "../monthly-order-vs-shipment-status-report-type";

function Report({
  data,
  searchParams,
}: {
  data: IMonthlyOrderVsShipmentStatusReport[];
  searchParams: { toDate: any; fromDate: any };
}) {
  //set table header
  const firstHeader = [
    "MONTH",
    "ORDER QTY",
    "ORDER MIN",
    "ORDER VALUE",
    "ORDER CM",
    "SHIP QTY",
    "SHIP MIN",
    "SHIP VALUE",
    "SHIP CM",
  ];

  const totalOrderQty = data.reduce((acc, item) => {
    return acc + (item.ORDER_QTY || 0);
  }, 0);

  const totalOrderMin = data.reduce((acc, item) => {
    return acc + (item.ORDER_MIN || 0);
  }, 0);
  const totalOrderValue = data.reduce((acc, item) => {
    return acc + (item.ORDER_FOB || 0);
  }, 0);
  const totalOrderCm = data.reduce((acc, item) => {
    return acc + (item.ORDER_CM || 0);
  }, 0);
  const totalShipQty = data.reduce((acc, item) => {
    return acc + (item.SHIP_QTY || 0);
  }, 0);
  const totalShipMin = data.reduce((acc, item) => {
    return acc + (item.SHIP_MIN || 0);
  }, 0);
  const totalShipValue = data.reduce((acc, item) => {
    return acc + (item.SHIP_FOB || 0);
  }, 0);
  const totalShipCm = data.reduce((acc, item) => {
    return acc + (item.SHIP_CM || 0);
  }, 0);

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          data={data}
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="text-center odd:bg-lime-100 even:bg-white">
                <td className="border border-gray-300 p-1">
                  {item.ORDER_DATE
                    ? moment(item.ORDER_DATE).format("MMM-YY")
                    : moment(item.SHIP_DATE).format("MMM-YY")}
                </td>
                <td className="border border-gray-300 p-1">{item.ORDER_QTY}</td>
                <td className="border border-gray-300 p-1">{item.ORDER_MIN}</td>
                <td className="border border-gray-300 p-1">{item.ORDER_FOB}</td>
                <td className="border border-gray-300 p-1">{item.ORDER_CM}</td>
                <td className="border border-gray-300 p-1">{item.SHIP_QTY}</td>
                <td className="border border-gray-300 p-1">{item.SHIP_MIN}</td>
                <td className="border border-gray-300 p-1">{item.SHIP_FOB}</td>
                <td className="border border-gray-300 p-1">{item.SHIP_CM}</td>
              </tr>
            ))}

            <tr className="text-center bg-yellow-100">
              <td className="border border-gray-300 p-1">Total</td>
              <td className="border border-gray-300 p-1">{totalOrderQty}</td>
              <td className="border border-gray-300 p-1">{totalOrderMin}</td>
              <td className="border border-gray-300 p-1">{totalOrderValue}</td>
              <td className="border border-gray-300 p-1">{totalOrderCm}</td>
              <td className="border border-gray-300 p-1">{totalShipQty}</td>
              <td className="border border-gray-300 p-1">{totalShipMin}</td>
              <td className="border border-gray-300 p-1">{totalShipValue}</td>
              <td className="border border-gray-300 p-1">{totalShipCm}</td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
