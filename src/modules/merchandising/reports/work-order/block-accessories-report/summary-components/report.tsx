/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function SummaryReport({
  data,
}: {
  data: IAccessoriesReportWithPo[];
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IAccessoriesReportWithPo[], keys: string[]) {
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
      items: IAccessoriesReportWithPo[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "STYLE NO.",
    "COLOR",
    "MTL COLOR",
    "ITEM NAME",
  ];
  const secondHeader = ["TTL QTY", "UOM"];

  const uniqueSizes: Set<string> = new Set();

  data.forEach((item) => {
    if (item.GMT_SIZE_NAME != null) uniqueSizes.add(item.GMT_SIZE_NAME);
  });

  const sizeHeader = Array.from(uniqueSizes);

  return (
    <div style={{ fontFamily: "" }}>
      <div>
        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            data={groupedByBuyer[key].items}
            firstHeader={firstHeader}
            sizeHeader={sizeHeader}
            secondHeader={secondHeader}
          ></ReportTable>
        ))}
      </div>
    </div>
  );
}

export default SummaryReport;
