/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { PrintEmbellishmentQualityReportMasterType } from "../embellishment-quality-report-type";

function Report({
  data,
  searchParamObj
}: {
  data: PrintEmbellishmentQualityReportMasterType[];
  searchParamObj: { fromDate: string, toDate: string }
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: PrintEmbellishmentQualityReportMasterType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);
      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: PrintEmbellishmentQualityReportMasterType[];
    };
  }

  let groupedByDate: GroupedByDate = {};
  if (data) {
    groupedByDate = groupBy(data, [""]); 
  }
  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  // Table headers
  const firstHeader = [
    "Date",
    "Party Name",
    "Machine No.",
    "Buyer",
    "Style",
    "Order No.",
    "Color",
  ];

  const secondHeader = [
    "Check Qty",
    "Defect Qty.",
    "Alter Qty.",
    "Total Ok",
    "Remarks",
  ];

  function getUniqueDefectHeaders(
    masters: PrintEmbellishmentQualityReportMasterType[]
  ): string[] {
    const defectSet = new Set<string>();
    masters.forEach((master) => {
      master.Details.forEach((detail) => {
        detail.Defects.forEach((defect) => {
          defectSet.add(defect.DefectName);
        });
      });
    });
    return Array.from(defectSet);
  }

  function getDefectGrandTotalsByKey(
    masters: PrintEmbellishmentQualityReportMasterType[]
  ): Record<string, number> {
    return masters.reduce((acc, master) => {
      master.Details.forEach((detail) => {
        detail.Defects.forEach((defect) => {
          acc[defect.DefectName] = (acc[defect.DefectName] || 0) + defect.Qty;
        });
      });
      return acc;
    }, {} as Record<string, number>);
  }

  const defectHeader = getUniqueDefectHeaders(data);
  const defectGrandTotals = getDefectGrandTotalsByKey(data);

  const totalCheckQty = data.reduce((sum, master) => {
    return (
      sum +
      master.Details.reduce(
        (detailSum, detail) => detailSum + (detail.CheckQty || 0),
        0
      )
    );
  }, 0);

  // const totalDefectQty = data.reduce((sum, master) => {
  //   return (
  //     sum +
  //     master.Details.reduce(
  //       (detailSum, detail) => detailSum + (detail.DefectQty || 0),
  //       0
  //     )
  //   );
  // }, 0);

  const totalAlterQty = data.reduce((sum, master) => {
    return (
      sum +
      master.Details.reduce(
        (detailSum, detail) => detailSum + (detail.RectifyQty || 0),
        0
      )
    );
  }, 0);

  const totalOkQty = data.reduce((sum, master) => {
    return (
      sum +
      master.Details.reduce(
        (detailSum, detail) => detailSum + (detail.QcPassedQty || 0),
        0
      )
    );
  }, 0);

  const totalDefectQty = data.reduce((sum, master) => {
    return (
      sum +
      master.Details.reduce(
        (detailSum, detail) => detailSum + (detail?.Defects?.reduce((acc, item) => acc + item.Qty, 0) || 0),
        0
      )
    );
  }, 0);


  return (
    <div
      style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950 print:px-4"
    >
      <div className="p-4">
        {/* Report Header */}
        <ReportHeader data={data} searchParamObj={searchParamObj} />

        {/* Table */}
        <table className="border-collapse border border-black w-full mt-4 text-sm">
          <thead className="sticky top-0 print:static">
            <tr className="text-center font-semibold text-[13px]">
              {firstHeader.map((item, idx) => (
                <th
                  key={idx}
                  rowSpan={2}
                  className="border border-black px-2 py-1"
                >
                  {item}
                </th>
              ))}

              {defectHeader.length > 0 && (
                <th
                  colSpan={defectHeader.length}
                  className="border border-black px-2 py-1"
                >
                  {data[0]?.EmbType} Defect Points
                </th>
              )}

              {secondHeader.map((item, idx) => (
                <th
                  key={idx}
                  rowSpan={2}
                  className="border border-black px-2 py-1"
                >
                  {item}
                </th>
              ))}
            </tr>
            <tr className=" text-center text-[12px]">
              {defectHeader.map((item, idx) => (
                <th key={idx} className="border border-black px-2 py-1">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                defectHeader={defectHeader}
              />
            ))}

            {/* Grand Total Row */}
            <tr className="font-bold bg-gray-300 text-center text-[12px]">
              <td
                colSpan={firstHeader.length}
                className="text-right border border-black px-2 py-1"
              >
                Grand Total
              </td>

              {defectHeader.map((defect) => (
                <td key={defect} className="border border-black px-2 py-1 text-right">
                  {defectGrandTotals[defect] ?? 0}
                </td>
              ))}

              <td className="border border-black px-2 py-1 text-right">{totalCheckQty}</td>
              <td className="border border-black px-2 py-1 text-right">{totalDefectQty}</td>
              <td className="border border-black px-2 py-1 text-right">{totalAlterQty}</td>
              <td className="border border-black px-2 py-1 text-right">{totalOkQty}</td>
              <td className="border border-black px-2 py-1 text-right"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
