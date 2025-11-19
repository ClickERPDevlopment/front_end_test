import { IAccessoriesReportWithPo } from "../accessories-with-po-type";
import ReportGroup from "./report-group";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
  isShipDateShow,
}: {
  data: IAccessoriesReportWithPo[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
  isShipDateShow: boolean;
}) {
  let header;
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader);
  }

  const totalWoQty = data.reduce((acc, item) => {
    return (acc += item.WORK_ORDER_QTY);
  }, 0);

  const totalAmount = data.reduce((acc, item) => {
    return (acc += item.WORK_ORDER_QTY * item.SUPPLIER_RATE_PER_PCS);
  }, 0);


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IAccessoriesReportWithPo[],
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
      items: IAccessoriesReportWithPo[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["MTL_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  return (
    <div className="mt-1">
      <div className=" font-semibold text-xs">
        <p>SUB: {data[0]?.WO_SUBJECT}</p>
        <p>BUYER: {data[0]?.BUYER_NAME}</p>
      </div>
      <table className="border-collapse border border-gray-900  w-[100%]">
        <thead style={{ backgroundColor: "#a4f4cf" }}>
          <tr className="text-xs align-top bg-transparent">
            {header?.map((item) => (
              <th className="border border-gray-900 p-0.5">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <ReportGroup
              key={key}
              data={groupedByDate[key].items}
              isShipDateShow={isShipDateShow}
            ></ReportGroup>
          ))}
          <tr className="text-xs font-bold">
            <td colSpan={8} className="border border-gray-900 p-1 text-center ">Total</td>
            <td className="border border-gray-900 p-1 text-center">

            </td>
            <td className="border border-gray-900 p-1 text-center"></td>
            <td className="border border-gray-900 p-1 text-center"></td>
            <td className="border border-gray-900 p-1 text-center">{totalWoQty}</td>
            <td className="border border-gray-900 p-1 text-center"></td>
            <td className="border border-gray-900 p-1 text-center">
            </td>
            <td className="border border-gray-900 p-1 text-center"></td>
            <td className="border border-gray-900 p-1 text-center">{totalAmount.toFixed(2)}</td>
            <td className="border border-gray-900 p-1 text-center"></td>
            <td className="border border-gray-900 p-1 text-center"></td>
            {
              isShipDateShow && <td className="border border-gray-900 p-1 text-center"></td>
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
