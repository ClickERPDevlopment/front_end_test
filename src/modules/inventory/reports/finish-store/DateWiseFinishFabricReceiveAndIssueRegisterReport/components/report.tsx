/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportHeader from "./report-header";
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from "../DateWiseFinishFabricReceiveAndIssueRegisterReport-type";
import moment from "moment";
import TotalRow from "./total-row";
import GroupSectionRows from "./group-section-rows";

function Report({
  data,
}: {
  data: DateWiseFinishFabricReceiveAndIssueRegisterReportType[];
}) {

  const uniqueGroups = Array.from(
    new Map(
      data
        ?.filter(item => item.FABRIC && item.GMT_COLOR && item.UOM)
        .map(item => [
          `${item.FABRIC}__${item.GMT_COLOR}__${item.UOM}`, // composite key
          { FABRIC: item.FABRIC, GMT_COLOR: item.GMT_COLOR, UOM: item.UOM }
        ])
    ).values()
  );

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              <th className="border border-gray-950 p-1" colSpan={11}>General Info</th>
              <th className="border border-gray-950 p-1" colSpan={3}>Receive Details</th>
              <th className="border border-gray-950 p-1" colSpan={3}>Issue Details</th>
            </tr>
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              <th className="border border-gray-950 p-1">Date</th>
              <th className="border border-gray-950 p-1">Challan No</th>
              <th className="border border-gray-950 p-1 text-nowrap">PI No</th>
              <th className="border border-gray-950 p-1 min-w-24">Work Order No</th>
              <th className="border border-gray-950 p-1">Buyer	</th>
              <th className="border border-gray-950 p-1">Style</th>
              <th className="border border-gray-950 p-1">Po</th>
              <th className="border border-gray-950 p-1">Fabrics Type</th>
              <th className="border border-gray-950 p-1">UOM</th>
              <th className="border border-gray-950 p-1">Color</th>
              <th className="border border-gray-950 p-1">TRNS TYPE</th>
              <th className="border border-gray-950 p-1">Received Qty</th>
              <th className="border border-gray-950 p-1">Received Roll Qty</th>
              <th className="border border-gray-950 p-1">Received PCS Qty</th>
              <th className="border border-gray-950 p-1">Issue Qty</th>
              <th className="border border-gray-950 p-1">Issue Roll Qty</th>
              <th className="border border-gray-950 p-1">Issue PCS Qty </th>
            </tr>
          </thead>
          <tbody>
            {uniqueGroups?.map((g, ig) =>
              <GroupSectionRows key={ig} data={data?.filter(_ => _.FABRIC === g.FABRIC && _.GMT_COLOR === g.GMT_COLOR && _.UOM === g.UOM)} />
            )}
            <TotalRow data={data} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
