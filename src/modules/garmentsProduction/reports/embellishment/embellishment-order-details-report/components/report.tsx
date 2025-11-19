/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbellishmentOrderDetailsReportType } from "../embellishment-order-details-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: EmbellishmentOrderDetailsReportType[];
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; styleId: string; poId: string; typeId: string; };
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbellishmentOrderDetailsReportType[],
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

  interface IGroupedData {
    [key: string]: {
      items: EmbellishmentOrderDetailsReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["EMBELLISHMENT_TYPE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Party",
    "WO",
    "Buyer",
    "Style",
    "PO",
    "Rcv Date",
    "Delivery Date",
    "Order Type",
    "Color",
    "Size",
    "Category",
    "Body Parts",
    "Qty (PCS)",
    "Rate (USD)",
    "Total (Value)",
    "Rcv Qty",
    "Prod Qty",
    "Del Qty",
    "Del Bal",
    "Budget Status",
  ];

  const totalQtyPcs = data.reduce(
    (acc, item) => acc + (item.WO_QTY || 0),
    0
  );

  const totalValue = data.reduce(
    (acc, item) => acc + ((item.RATE || 0) * (item.WO_QTY || 0)),
    0
  );

  const totalRcvQty = data.reduce(
    (acc, item) => acc + (item.RCV_QTY || 0),
    0
  );

  const totalProdQty = data.reduce(
    (acc, item) => acc + (item.PRO_QTY || 0),
    0
  );

  const totalDelQty = data.reduce(
    (acc, item) => acc + (item.DELIVERY_QTY || 0),
    0
  );

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
          searchParamsObj={searchParamsObj}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "15px" }} className="bg-lime-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => (<>
              <tr style={{ fontSize: "14px" }} className="font-bold">
                <td colSpan={20} className="border border-gray-950 p-0.5">Emb Type: {groupedData[key]?.items[0]?.EMBELLISHMENT_TYPE}</td>
              </tr>
              <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            </>
            ))}
            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td colSpan={12} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalQtyPcs}</td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5 text-center">{totalValue.toFixed(3)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalRcvQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalProdQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalDelQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalProdQty - totalDelQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
            </tr>
          </tbody>
        </table>

        <div className="pt-10">
          {/* <ReportFooter></ReportFooter> */}
        </div>

      </div>
    </div>
  );
}

export default Report;
