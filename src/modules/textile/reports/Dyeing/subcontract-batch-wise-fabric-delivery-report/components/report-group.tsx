import { ISubcontractBatchWiseFabricDeliveryReport } from "../subcontract-batch-wise-fabric-delivery-report-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: ISubcontractBatchWiseFabricDeliveryReport[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: ISubcontractBatchWiseFabricDeliveryReport[], keys: string[]) {
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
      items: ISubcontractBatchWiseFabricDeliveryReport[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["PONO", "COLORNAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalBatchQtyKg = data.reduce((acc, item) => acc + item.BATCH_QTY_KG, 0);
  const totalGreyWeight = data.reduce((acc, item) => acc + item.GREY_WEIGHT, 0);
  const totalFinishQty = data.reduce((acc, item) => acc + item.FINISH_QUANTITY, 0);

  return (
    <div className="mb-2 mt-2">
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
            <td className="border border-gray-300">{totalBatchQtyKg.toFixed(3)}</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalGreyWeight.toFixed(3)}</td>
            <td className="border border-gray-300">{totalFinishQty.toFixed(3)}</td>
            <td className="border border-gray-300">{(100 * (totalGreyWeight - totalFinishQty) / totalGreyWeight).toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportGroup;
