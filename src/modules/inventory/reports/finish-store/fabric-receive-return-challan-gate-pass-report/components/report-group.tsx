import moment from "moment";
import { IFabricReceiveReturnChallanGatePassReport } from "../fabric-receive-return-challan-gate-pass-report-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: IFabricReceiveReturnChallanGatePassReport[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IFabricReceiveReturnChallanGatePassReport[], keys: string[]) {
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
      items: IFabricReceiveReturnChallanGatePassReport[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalReceiveQty = data.reduce((acc, item) => acc + item.RCV_QTY, 0);
  const totalReceiveRoll = data.reduce((acc, item) => acc + item.RCV_ROLL, 0);
  const totalReturnQty = data.reduce((acc, item) => acc + item.RET_QTY, 0);
  const totalReturnRoll = data.reduce((acc, item) => acc + item.RET_ROLL, 0);

  return (
    <div className="mb-2 mt-2">
      <div className="flex w-full justify-between">
        <div>
          <table>
            <tr>
              <td className="font-bold">Return No</td>
              <td> :{data[0]?.RET_CHALLAN}</td>
            </tr>
            <tr>
              <td className="font-bold">Return Date</td>
              <td> :{moment(data[0]?.RET_DATE).format("DD-MMM-YY")}</td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td className="font-bold">Supplier</td>
              <td> :{data[0]?.SUPPLIER}</td>
            </tr>
            <tr>
              <td className="font-bold">Wo No</td>
              <td> :{data[0]?.WORK_ORDER_NO}</td>
            </tr>
          </table>
        </div>
      </div>

      <table className="border-collapse border text-sm border-gray-300  w-[100%]">
        <thead>
          <tr className="bg-lime-200 text-center">
            {firstHeader?.map((item) => (
              <th className="border border-gray-300">{item}</th>
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
            <td className="border border-gray-300" colSpan={6}>
              Grand Total
            </td>
            <td className="border border-gray-300">{totalReceiveQty.toFixed(3)}</td>
            <td className="border border-gray-300">{totalReceiveRoll.toFixed(3)}</td>
            <td className="border border-gray-300">{totalReturnQty.toFixed(3)}</td>
            <td className="border border-gray-300">{totalReturnRoll.toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportGroup;
