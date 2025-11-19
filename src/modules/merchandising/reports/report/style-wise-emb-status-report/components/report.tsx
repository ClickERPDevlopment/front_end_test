/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";
import { EmbStatusReportEmbDataType } from "../emb-status-emb-data-type";

type ReportProps = {
  styleData: EmbStatusReportStyleDataType[];
  embData: EmbStatusReportEmbDataType[];
  isEmbDone: boolean,
  isEmbNotDone: boolean,
  searchParams: { fromDate: string, toDate: string, isShipDate: boolean }
};

function Report({ styleData, embData, searchParams }: ReportProps) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbStatusReportStyleDataType[],
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
      items: EmbStatusReportStyleDataType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (styleData) {
    groupedByDate = groupBy(styleData, ["FACTORY", "BUYER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const firstHeader = [
    "FACTORY",
    "BUYER",
    "STYLE NO",
    "IMAGE",
    "ORDER NO",
    "ORDER QTY (Pcs)",
    "SHIP DATE",
    "EMB TYPE",
    "EMB CATEGORY",
  ];

  const grantTotalQty = styleData.reduce((acc, item) => acc + item.QTY, 0)

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={styleData}
          searchParams={searchParams}
        />

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th rowSpan={2} className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                styleData={groupedByDate[key].items}
                embData={embData}
              ></ReportTable>
            ))}

            <tr className="bg-lime-50 font-bold">
              <td colSpan={5} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{grantTotalQty}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
