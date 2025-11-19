/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupplierWiseEmbStockColorWiseReportType } from "../supplier-wise-emb-stock-color-wise-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data,
  firstHeader,
}: {
  data: SupplierWiseEmbStockColorWiseReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SupplierWiseEmbStockColorWiseReportType[],
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
      items: SupplierWiseEmbStockColorWiseReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BUYER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const pRcv = data?.reduce((acc, item) => acc + item.P_RECEIVEQTY, 0)
  const eRcv = data?.reduce((acc, item) => acc + item.E_RECEIVEQTY, 0)
  const peRcv = data?.reduce((acc, item) => acc + item.PE_RECEIVEQTY, 0)
  const wRcv = data?.reduce((acc, item) => acc + item.W_RECEIVEQTY, 0)

  const pProcess = data?.reduce((acc, item) => acc + item.P_SENDQTY, 0)
  const eProcess = data?.reduce((acc, item) => acc + item.E_SENDQTY, 0)
  const peProcess = data?.reduce((acc, item) => acc + item.PE_SENDQTY, 0)
  const wProcess = data?.reduce((acc, item) => acc + item.W_SENDQTY, 0)

  const pStock = data?.reduce((acc, item) => acc + item.P_STOCK, 0)
  const eStock = data?.reduce((acc, item) => acc + item.E_STOCK, 0)
  const peStock = data?.reduce((acc, item) => acc + item.PE_STOCK, 0)
  const wStock = data?.reduce((acc, item) => acc + item.W_STOCK, 0)

  const orderQty = data?.reduce((acc, item) => acc + item.ORDQTY, 0)


  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-bold">
        <td colSpan={20} className="border border-gray-950 p-0.5">{data[0]?.SUPPLIER}</td>
      </tr>
      {uniqueKeysArray?.map((key) => {
        const data = groupedByDate[key].items;
        return <>
          <ReportGroup
            key={key}
            data={data}
            firstHeader={firstHeader}
          ></ReportGroup>
        </>
      })}
      <tr style={{ fontSize: "12px" }} className="font-bold">
        <td colSpan={5} className="border border-gray-950 p-0.5 text-center">Supplier Total</td>
        <td className="border border-gray-950 p-0.5 text-center">{orderQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{pRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center">{eRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center">{peRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center">{wRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center">{pProcess}</td>
        <td className="border border-gray-950 p-0.5 text-center">{eProcess}</td>
        <td className="border border-gray-950 p-0.5 text-center">{peProcess}</td>
        <td className="border border-gray-950 p-0.5 text-center">{wProcess}</td>
        <td className="border border-gray-950 p-0.5 text-center">{pStock}</td>
        <td className="border border-gray-950 p-0.5 text-center">{eStock}</td>
        <td className="border border-gray-950 p-0.5 text-center">{peStock}</td>
        <td className="border border-gray-950 p-0.5 text-center">{wStock}</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
      </tr>
    </>
  );
}

export default ReportTable;
