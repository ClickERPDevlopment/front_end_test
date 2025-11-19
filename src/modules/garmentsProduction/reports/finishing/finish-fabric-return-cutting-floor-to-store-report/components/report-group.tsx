/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFinishFabricReturnCuttingFloorToStoreReport } from "../finish-fabric-return-cutting-floor-to-store-report-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: IFinishFabricReturnCuttingFloorToStoreReport[];
  firstHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IFinishFabricReturnCuttingFloorToStoreReport[],
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

  interface GroupedByBuyer {
    [key: string]: {
      items: IFinishFabricReturnCuttingFloorToStoreReport[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalReq = data.reduce((acc, item) => acc + item.REQ_QTY, 0);
  const totalRCV = data.reduce((acc, item) => acc + item.RCV_QTY, 0);
  const totalReturn = data.reduce((acc, item) => acc + item.RETURN_QTY, 0);

  return (
    <div className="mb-2 mt-2">
      <table className="border-collapse border border-gray-300  w-[100%]">
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
              data={groupedByBuyer[key].items}
            ></ReportTable>
          ))}

          <tr className="text-center font-bold">
            <td className="border border-gray-300 p-1" colSpan={3}>
              Grand Total
            </td>
            <td className="border border-gray-300 p-1">{totalReq}</td>
            <td className="border border-gray-300 p-1">
              {totalRCV.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-1">
              {(totalRCV - totalReq).toFixed(2)}
            </td>
            <td className="border border-gray-300 p-1">{totalReturn}</td>
            <td className="border border-gray-300 p-1">
              {(totalRCV - totalReturn - totalReq).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportGroup;
