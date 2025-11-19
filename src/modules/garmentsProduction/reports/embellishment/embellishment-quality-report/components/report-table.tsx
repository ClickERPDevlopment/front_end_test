/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import moment from "moment";
import { PrintEmbellishmentQualityReportMasterType } from "../embellishment-quality-report-type";

interface ReportTableProps {
  data: PrintEmbellishmentQualityReportMasterType[];
  defectHeader: string[];
}

const ReportTable: React.FC<ReportTableProps> = ({ data, defectHeader }) => {
  return (
    <>
      {data.map((item, index) =>
        item.Details.map((detail, detailIndex) => (
          <tr
            key={`${index}-${detailIndex}`}
            className="text-sm font-medium odd:bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {/* First header columns */}
            <td className="border border-black px-2 py-1 text-nowrap">
              {item.EntryDate ? moment(item.EntryDate).format("DD-MMM-YY") : ""}
            </td>
            <td className="border border-black px-2 py-1">{item.Party}</td>
            <td className="border border-black px-2 py-1">{item.WorkStation}</td>
            <td className="border border-black px-2 py-1">
              {detail.Buyer || detail.OsBuyer}
            </td>
            <td className="border border-black px-2 py-1">
              {detail.Style || detail.OsStyle}
            </td>
            <td className="border border-black px-2 py-1">
              {detail.Po || detail.OsPo}
            </td>
            <td className="border border-black px-2 py-1">{detail.Color}</td>

            {/* Defect columns dynamically */}
            {defectHeader.map((defectName, defectIndex) => {
              const defect = detail.Defects.find(
                (d) => d.DefectName === defectName
              );
              return (
                <td
                  key={defectIndex}
                  className="border border-black px-2 py-1 text-right"
                >
                  {defect ? defect.Qty : 0}
                </td>
              );
            })}

            {/* Second header columns */}
            <td className="border border-black px-2 py-1 text-right">
              {detail.CheckQty || 0}
            </td>
            <td className="border border-black px-2 py-1 text-right">
              {detail?.Defects?.reduce((acc, item) => acc + item.Qty, 0) || 0}
            </td>
            <td className="border border-black px-2 py-1 text-right">
              {detail.RectifyQty || 0}
            </td>
            <td className="border border-black px-2 py-1 text-right">
              {detail.QcPassedQty || 0}
            </td>
            <td className="border border-black px-2 py-1 italic text-gray-700">
              {item.Remarks || ""}
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default ReportTable;
