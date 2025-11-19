/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { IBatchWiseApprovalStatus } from "../batch-wise-approval-status-report-type";

function ReportTable({
  data,
}: {
  data: IBatchWiseApprovalStatus[];
  header: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IBatchWiseApprovalStatus[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);

      if (!result[key]) {
        result[key] = {
          BATCH_NO: item.BATCH_NO,
          BATCH_QTY: 0,
          FABRIC_NAME: item.FABRIC_NAME,
          BUYER_NAME: new Set<string>(),
          STYLE_NO: new Set<string>(),
          PO_NO: new Set<string>(),
          COLOR_NAME: new Set<string>(),
          GARMENTS_PARTS: new Set<string>(),
          DIA: new Set<string>(),
          GSM: new Set<string>(),
          DYEING_DATE: item.DYEING_DATE,
          SUBMISSION_DATE: item.SUBMISSION_DATE,
          APPROVAL_DATE: item.APPROVAL_DATE,
          BATCH_FINISH_DATE: item.BATCH_FINISH_DATE,
          QI_DATE: item.QI_DATE,
          QUALITY_RESULT: item.QUALITY_RESULT,
          QUALITY_CLEARANCE: item.QUALITY_CLEARANCE,
          RFD_DATE: item.RFD_DATE,
          SPECIAL_INFO: item.SPECIAL_INFO,
          REMARKS: new Set<string>(),
          YARN_DETAILS: new Set<string>(),
        };
      }

      result[key]["BUYER_NAME"].add(item.BUYER_NAME);
      result[key]["STYLE_NO"].add(item.STYLE_NO);
      result[key]["PO_NO"].add(item.PO_NO);
      result[key]["COLOR_NAME"].add(item.COLOR_NAME);
      result[key]["GARMENTS_PARTS"].add(item.GARMENTS_PARTS);
      result[key]["DIA"].add(item.DIA);
      result[key]["GSM"].add(item.GSM);
      result[key]["YARN_DETAILS"].add(item.YARN_DETAILS);
      result[key]["REMARKS"].add(item.REMARKS);
      result[key].BATCH_QTY += item.BATCH_QTY;

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      BATCH_ID: number;
      BATCH_NO: string;
      BATCH_QTY: number;
      FABRIC_NAME: string;
      FABRIC_ID: number;
      BUYER_NAME: Set<string>;
      STYLE_NO: Set<string>;
      PO_NO: Set<string>;
      COLOR_NAME: Set<string>;
      GARMENTS_PARTS: Set<string>;
      DIA: Set<string>;
      GSM: Set<string>;
      DYEING_DATE?: Date;
      SUBMISSION_DATE: string;
      APPROVAL_DATE: string;
      BATCH_FINISH_DATE: string;
      QI_DATE: string;
      QUALITY_RESULT: string;
      QUALITY_CLEARANCE: string;
      RFD_DATE: string;
      SPECIAL_INFO: string;
      REMARKS: Set<string>;
      YARN_DETAILS: Set<string>;
    };
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["BATCH_ID", "FABRIC_ID"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const firstHeader = [
    "Batch No.",
    " Batch QTY Fabric wise  (Kg)",
    "Buyer",
    "Style",
    "Order/PO",
    "Color",
    "Garments patr",
    "Fabric",
    "Yarn Details",
    "R/Dia",
    "R/GSM",
    "Dyeing Date",
    " Submit Date",
    " Approval Date",
    "Batc Finish date",
    "Quality Inspection Date",
    "Quality Inspection result",
    "Quality Clearance",
    "RFD Date",
    "Special Info",
    "Remarks",
  ];

  return (
    <div className="text-sm mt-3">
      <div className="flex items-center font-semibold">
        {/* <p>BUYER: {data[0]?.BUYER_NAME}</p> */}
      </div>
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr>
            {firstHeader?.map((item) => (
              <th className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr className={`text-center`} key={key}>
              <td className="border border-gray-300 p-1">
                {groupedData[key].BATCH_NO}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].BATCH_QTY}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].BUYER_NAME).join(", ")}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].STYLE_NO).join(", ")}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].PO_NO).join(", ")}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].COLOR_NAME).join(", ")}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].GARMENTS_PARTS).join(", ")}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].FABRIC_NAME}
              </td>
              <td className="border border-gray-300 p-1"></td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].DIA).join(", ")}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].GSM).join(", ")}
              </td>
              <td className="border border-gray-300 p-1 text-center uppercase">
                {moment(groupedData[key].DYEING_DATE).format("DD-MMM-YY")}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].SUBMISSION_DATE}
              </td>
              <td
                className={`border border-gray-300 p-1 text-center ${
                  !groupedData[key].APPROVAL_DATE ? "bg-red" : ""
                }`}
              >
                {groupedData[key].APPROVAL_DATE}
              </td>

              <td className="border border-gray-300 p-1 uppercase">
                {moment(groupedData[key].BATCH_FINISH_DATE).format(
                  "DD-MMM-YY"
                ) == "01-Jan-01"
                  ? ""
                  : moment(groupedData[key].BATCH_FINISH_DATE).format(
                      "DD-MMM-YY"
                    )}
              </td>

              <td className="border border-gray-300 p-1 uppercase">
                {moment(groupedData[key].QI_DATE).format("DD-MMM-YY")}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].QUALITY_RESULT}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].QUALITY_CLEARANCE}
              </td>

              <td className="border border-gray-300 p-1 uppercase">
                {moment(groupedData[key].RFD_DATE).format("DD-MMM-YY") ==
                "01-Jan-01"
                  ? ""
                  : moment(groupedData[key].RFD_DATE).format("DD-MMM-YY")}
              </td>

              <td className="border border-gray-300 p-1">
                {groupedData[key].SPECIAL_INFO}
              </td>
              <td className="border border-gray-300 p-1">
                {Array.from(groupedData[key].REMARKS).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
