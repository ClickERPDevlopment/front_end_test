/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FinishFabricAllocationSummaryReportDetailsType,
  FinishFabricAllocationSummaryReportMasterType,
} from "../finish-fabric-allocation-summary-report-type";
import ReportTableRow from "./report-table-row";

export default function ReportTable({
  masterData,
  detailsData,
}: {
  masterData: FinishFabricAllocationSummaryReportMasterType[];
  detailsData: FinishFabricAllocationSummaryReportDetailsType[];
}) {
  const columns = [
    { name: "SUPPLIER", classes: "min-w-[150px]" },
    { name: "WO NO", classes: "min-w-[150px]" },
    { name: "ORDER REF", classes: "min-w-[100px]" },
    { name: "ITEM NAME", classes: "min-w-[200px]" },
    { name: "MATERIAL COLOR", classes: "" },
    { name: "AGEING", classes: "" },
    { name: "WO QTY", classes: "" },
    { name: "RCV QTY", classes: "" },
    { name: "RET QTY", classes: "" },
    { name: "RCV BAL", classes: "" },
    { name: "ALLO. QTY", classes: "" },
    { name: "ALLO. BAL", classes: "" },
    { name: "RATE", classes: "" },
    { name: "VALUE", classes: "" },
    { name: "UOM", classes: "" },
    { name: "PCS BAL", classes: "" },
  ];



  const groupedData = new Map<string, FinishFabricAllocationSummaryReportMasterType>();

  masterData.forEach((item) => {
    const key = [
      item.SUPPLIER,
      item.WORK_ORDER_NO,
      item.ORDER_REFERENCE,
      item.FABRIC,
      item.MTL_COLOR,
      item.SUPPLIER_RATE_PER_PCS,
      item.UOM,
      item.CONSUMPTION_PER_DZN
    ].join("|");

    if (!groupedData.has(key)) {
      groupedData.set(key, { ...item });
    } else {
      const existing = groupedData.get(key)!;
      existing.WO_QTY += item.WO_QTY;
      existing.RECEIVE_QTY += item.RECEIVE_QTY;
      existing.RET_QTY += item.RET_QTY;
      existing.ALLOCATED_QTY += item.ALLOCATED_QTY;
    }
  });

  const uniqueMasterData = Array.from(groupedData.values());

  const totalWoQty = masterData.reduce((acc, item) => {
    return (acc += item.WO_QTY);
  }, 0);

  const totalRcvQty = masterData.reduce((acc, item) => {
    return (acc += item.RECEIVE_QTY);
  }, 0);

  const totalRetQty = masterData.reduce((acc, item) => {
    return (acc += item.RET_QTY);
  }, 0);


  const totaAllocationQty = masterData.reduce((acc, item) => {
    return (acc += item.ALLOCATED_QTY);
  }, 0);

  let totalValue = masterData.reduce((acc, item) => {
    return (acc += ((item.RECEIVE_QTY - item.ALLOCATED_QTY) * item.SUPPLIER_RATE_PER_PCS));
  }, 0);


  return (
    <>
      <table className="w-[100%]">
        <thead className="">
          <tr id="table-header-row" className="bg-teal-200">
            {columns.map((c) => (
              <th
                key={Math.random()}
                className={"border p-1 text-xs  " + c.classes}
              >
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="table-body">
          {uniqueMasterData.map((mData) => {
            const filteredData = detailsData.filter(
              (dData) =>
                dData.BLOCK_WORK_ORDER_ID === mData.WO_ID &&
                dData.FABRIC_ID === mData.FABRIC_ID &&
                dData.STOCK_FABRIC_COLOR_ID === mData.GMT_COLOR_ID &&
                dData.ORDER_REFERENCE === mData.ORDER_REFERENCE
            );

            return (
              <ReportTableRow
                key={Math.random()}
                masterData={mData}
                detailsData={filteredData}
              />
            );
          })}

          <tr>
            <td
              className="border text-center text-xs font-semibold"
              colSpan={6}
            >
              Total
            </td>
            <td className="border text-center text-xs font-semibold">
              {totalWoQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {totalRcvQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {totalRetQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {(totalRcvQty - totalRetQty - totalWoQty).toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {totaAllocationQty?.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold">
              {(totalRcvQty - totaAllocationQty).toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold"></td>
            <td className="border text-center text-xs font-semibold">
              {totalValue.toFixed(2)}
            </td>
            <td className="border text-center text-xs font-semibold"></td>
            <td className="border text-center text-xs font-semibold"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
