/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IShipmentDelayReport } from "../import-fabric-inspection-report-type";

function Report({
  data,
  searchParams,
}: {
  data: IShipmentDelayReport[];
  searchParams: { toDate: any; fromDate: any };
}) {
  //set table header
  const firstHeader = ["BUYER", "MONTH", "QTY", "SHIP DATE", "DELAY"];

  //summary header

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
            COMPANY_NAME: data[0]?.COMPANY_NAME || "",
            COMPANY_ADDRESS: data[0]?.COMPANY_ADDRESS || "",
            COMPANY_REMARKS: data[0]?.COMPANY_REMARKS || "",
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead>
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="text-center">
                <td className="border border-gray-300 p-1">
                  {item.BUYER_NAME}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.ORDER_PLACEMENT_MONTH &&
                    moment(item.ORDER_PLACEMENT_MONTH).format("DD-MMM-YY") !==
                    "01-Jan-01"
                    ? moment(item.ORDER_PLACEMENT_MONTH).format("DD-MMM-YY")
                    : ""}
                </td>
                <td className="border border-gray-300 p-1">{item.QTY}</td>
                <td className="border border-gray-300 p-1">
                  {item.DELIVERY_DATE &&
                    moment(item.DELIVERY_DATE).format("DD-MMM-YY") !== "01-Jan-01"
                    ? moment(item.DELIVERY_DATE).format("DD-MMM-YY")
                    : ""}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.DELIVERY_DATE &&
                    moment(item.DELIVERY_DATE).format("DD-MMM-YY") !== "01-Jan-01"
                    ? `${moment().diff(
                      moment(item.DELIVERY_DATE),
                      "days"
                    )} days`
                    : ""}
                </td>
              </tr>
            ))}
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
