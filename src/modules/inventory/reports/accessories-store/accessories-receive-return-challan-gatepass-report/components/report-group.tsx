/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAccessoriesReceiveReturnChallanGatePassReport } from "../accessories-receive-return-challan-gatepass-report-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: IAccessoriesReceiveReturnChallanGatePassReport[];
  firstHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IAccessoriesReceiveReturnChallanGatePassReport[],
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

  interface IGroup {
    [key: string]: {
      items: IAccessoriesReceiveReturnChallanGatePassReport[];
    };
  }

  let groupedData: IGroup = {};

  if (data) {
    groupedData = groupBy(data, [
      "CHALLAN_NO",
      "MATERIAL",
      "UOM",
      "MTL_SIZE",
      "ML_COLOR_1",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalRcvQty = data.reduce((prev, curr) => prev + curr.RCV_QTY, 0);
  const totalReturnQty = data.reduce(
    (prev, curr) => prev + curr.CHALLAN_QTY,
    0
  );

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
          {uniqueKeysArray?.length > 0 &&
            uniqueKeysArray.map((key) => (
              <ReportTable key={key} data={groupedData[key].items} />
            ))}

          <tr className="text-center font-bold">
            <td className="border border-gray-300 p-1" colSpan={4}>
              Total
            </td>
            <td className="border border-gray-300 p-1">{totalRcvQty}</td>
            <td className="border border-gray-300 p-1">{totalReturnQty}</td>
          </tr>
        </tbody>
      </table>
      <p className="font-bold mt-5">Remarks: {data[0]?.COMMENTS}</p>
    </div>
  );
}

export default ReportGroup;
