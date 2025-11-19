/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function Report({
  data,
  searchParams,
}: {
  data: IAccessoriesReportWithPo[];
  searchParams: { currency: string };
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
    "REF/SWATCH",
    "MTL SIZE",
    "ITEM NAME",
    "UOM",
    "ITEM REF.",
  ];

  const secondHeader = ["TTL QTY", "RATE", "AMOUNT"];

  const uniqueSizes: Set<string> = new Set();

  data.forEach((item) => {
    if (item.GMT_SIZE_NAME != null) uniqueSizes.add(item.GMT_SIZE_NAME);
  });

  const sizeHeader = Array.from(uniqueSizes);

  console.log(groupedByBuyer);

  return (
    <div className="container">
      <div className="p-2">
        <ReportHeader
          searchParams={{ currency: searchParams.currency }}
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
        <div className="mt-3">
          <p>
            <span className="font-bold">Note:</span> Please mention the Work Order Number in the Delivery
            Challan and PI.
          </p>
        </div>

        <div className="mt-1">
          <p>
            <span className="font-bold">Remarks:</span> {data[0]?.REMARKS}
          </p>
        </div>

        <div>
          <ReportFooter masterData={data[0]}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
