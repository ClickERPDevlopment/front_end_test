/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IImportFabricInspectionInfo } from "../import-fabric-inspection-info-report-type";

function Report({
  data,
  searchParams,
}: {
  data: IImportFabricInspectionInfo[];
  searchParams: { toDate: any; fromDate: any };
}) {
  //set table header
  const firstHeader = [
    "BUYER",
    "WORKORDER NO",
    "STYLE NO",
    "FABRIC TYPE",
    "FABRIC NAME",
    "COLOR",
    "LOT NO",
    "TOTAL ROLL",
    "CHECK ROLL",
    "TOTAL QTY",
    "CHECK QTY",
    "UOM",
    "DEFECT",
    "INSPECTION DATE",
    "SHADE SUBMIT DATE",
    "SHADE APPROVAL DATE",
    "REMARKS",
  ];

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
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
              <tr className="text-center">
                <td className="border border-gray-300 p-1">{item.NAME}</td>
                <td className="border border-gray-300 p-1">
                  {item.WORKORDER_NO}
                </td>
                <td className="border border-gray-300 p-1">{item.STYLE_NO}</td>
                <td className="border border-gray-300 p-1">
                  {item.FABRIC_SUBGROUP}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.FABRIC_NAME}
                </td>
                <td className="border border-gray-300 p-1">{item.COLOR}</td>
                <td className="border border-gray-300 p-1">{item.LOT_NO}</td>
                <td className="border border-gray-300 p-1">
                  {item.TOTAL_ROLL}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.CHECK_ROLL}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.BALANCE_QTY}
                </td>
                <td className="border border-gray-300 p-1">{item.CHECK_QTY}</td>
                <td className="border border-gray-300 p-1">{item.UOM}</td>
                <td className="border border-gray-300 p-1">
                  {item.DEFECT_NAME}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.INSPECTION_DATE &&
                  moment(item.INSPECTION_DATE).format("DD-MMM-YY") !==
                    "01-Jan-01"
                    ? moment(item.INSPECTION_DATE).format("DD-MMM-YY")
                    : ""}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.SHADE_SUBMIT_DATE &&
                  moment(item.SHADE_SUBMIT_DATE).format("DD-MMM-YY") !==
                    "01-Jan-01"
                    ? moment(item.SHADE_SUBMIT_DATE).format("DD-MMM-YY")
                    : ""}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.SHADE_APPROVAL_DATE &&
                  moment(item.SHADE_APPROVAL_DATE).format("DD-MMM-YY") !==
                    "01-Jan-01"
                    ? moment(item.SHADE_APPROVAL_DATE).format("DD-MMM-YY")
                    : ""}
                </td>
                <td className="border border-gray-300 p-1">{item.REMARKS}</td>
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
