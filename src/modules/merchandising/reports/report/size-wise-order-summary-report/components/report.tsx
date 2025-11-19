/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { SizeWiseOrderSummaryReportType } from "../size-wise-order-summary-report-type";

function Report({
  data,
  searchParams,
}: {
  data: SizeWiseOrderSummaryReportType[];
  searchParams: { fromDate: string, toDate: string };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: SizeWiseOrderSummaryReportType[], keys: string[]) {
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

  interface GroupedByBuyer {
    [key: string]: {
      items: SizeWiseOrderSummaryReportType[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "BUYER",
    "STYLE NO.",
    "ORDER NO.",
    "ITEM DESCRIPTION",
    "COLOR",
  ];
  const secondHeader = ["TOTAL QTY", "PO REVISED DATE", "SHIP DATE"];

  const uniqueSizes: Set<string> = new Set();

  data.forEach((item) => {
    if (item.SIZENAME != null) uniqueSizes.add(item.SIZENAME);
  });

  const sizeHeader = Array.from(uniqueSizes);

  return (
    <div>
      <div className="p-2 text-gray-950" style={{ fontFamily: '"Times New Roman", serif' }}>
        <ReportHeader
          searchParams={searchParams}
          masterData={data[0]}
        />

        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            data={groupedByBuyer[key].items}
            firstHeader={firstHeader}
            sizeHeader={sizeHeader}
            secondHeader={secondHeader}
          ></ReportTable>
        ))}

        <div>
          {/* <ReportFooter masterData={data[0]}></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
