/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { iaccWorkOrder } from "../../components/iaccWorkOrder";

function Report({
  data,
  searchParams,
}: {
  data: iaccWorkOrder[];
  searchParams: { currency: string };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: iaccWorkOrder[], keys: string[]) {
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
      items: iaccWorkOrder[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "STYLE",
    "ORDER",
    "COLOR",
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

        <div>
          <ReportFooter masterData={data[0]}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
