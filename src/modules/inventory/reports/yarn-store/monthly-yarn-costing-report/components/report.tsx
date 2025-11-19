/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IMonthlyYarnCosting } from "../monthly-yarn-costing-report-type";

function Report({
  data,
  searchParams,
}: {
  data: IMonthlyYarnCosting[];
  searchParams: { toDate: any; fromDate: any };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IMonthlyYarnCosting[], keys: string[]) {
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

  interface GroupedByKnittingHouse {
    [key: string]: {
      items: IMonthlyYarnCosting[];
    };
  }

  let groupedByKnittingHouse: GroupedByKnittingHouse = {};

  if (data) {
    groupedByKnittingHouse = groupBy(data, ["KNITTING_HOUSE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "YARN",
    "LOT",
    "KNITTING HOUSE",
    "QTY(KG)",
    "PRICE(USD)",
    "AMOUNT(USD)",
  ];

  const totalQty = data.reduce((acc, item) => {
    return acc + item.QTY;
  }, 0);

  const totalAmount = data.reduce((acc, item) => {
    return acc + item.UNIT_PRICE * item.QTY;
  }, 0);

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
          <thead>
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByKnittingHouse[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
            <tr className="text-center  bg-yellow-200">
              <td className="border border-gray-300 p-1 font-bold" colSpan={3}>
                Grand Total
              </td>
              <td className="border border-gray-300 p-1">
                {totalQty.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1"></td>
              <td className="border border-gray-300 p-1">
                {totalAmount.toFixed(2)}
              </td>
            </tr>
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
