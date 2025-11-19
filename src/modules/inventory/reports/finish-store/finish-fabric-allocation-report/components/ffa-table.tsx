/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FinishFabricAllocatinReportDetailsType,
  FinishFabricAllocatinReportMasterType,
} from "../finish-fabric-allocation-report-type";

export default function FFATable({
  masterData,
  detailsData,
}: {
  masterData: FinishFabricAllocatinReportMasterType;
  detailsData: FinishFabricAllocatinReportDetailsType[];
}) {
  const columns = [
    { name: "SUPPLIER", classes: "min-w-[150px]" },
    { name: "WO NO/PI", classes: "min-w-[150px]" },
    { name: "ORDER REF", classes: "min-w-[100px]" },
    { name: "ITEM NAME", classes: "min-w-[200px]" },
    { name: "MATERIAL COLOR", classes: "" },
    { name: "WO QTY", classes: "" },
    { name: "AGEING", classes: "" },
    { name: "RCV QTY", classes: "" },
    { name: "RET QTY", classes: "" },
    { name: "RCV BAL", classes: "" },
    // { name: "STOCK QTY", classes: "min-w-[60px]" } /*Rcv-Allocation*/,
    { name: "ALLO. QTY", classes: "" },
    { name: "ALLO. BAL", classes: "" },
    { name: "UOM", classes: "" },
    { name: "PCS BAL", classes: "" },

    { name: "ALLOC. STYLE", classes: "" },
    { name: "ALLOC. PO", classes: "" },
    // { name: "REQ. QTY", classes: "" },
    { name: "ALLO. QTY", classes: "" },
    // { name: "ALLO. BAL", classes: "" },
  ];

  let totalAllocation = 0;
  detailsData.forEach((element) => {
    totalAllocation += element.ALLOCATED_QTY;
  });

  // const totalAllocationBalance = detailsData.reduce((acc, item) => {
  //   return (acc += item.ALLOCATED_QTY - item.REQUIRED_QTY);
  // }, 0);

  //   console.log(masterData.MTL_COLOR, JSON.stringify(detailsData));

  return (
    <>
      {/* <thead className="sticky top-0 z-10"> */}
      <thead className="">
        {/* <tr>{JSON.stringify(detailsData)}</tr> */}
        <tr>
          <th colSpan={2} className="text-left px-2 text-sm">
            Buyer: {masterData.BUYER}
          </th>
          <th colSpan={2} className="text-left px-2 text-sm">
            {/* Style: {masterData.STYLENO} */}
          </th>
          <th colSpan={10} className="text-left"></th>
          <th colSpan={3} className="text-center border text-sm rounded-tr">
            ALLOCATION DETAILS
          </th>
        </tr>
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
        <tr>
          <td className="border text-center text-xs">{masterData.SUPPLIER}</td>
          <td className="border text-center text-xs">
            {masterData.PINO
              ? masterData.WORK_ORDER_NO + "|" + masterData.PINO
              : masterData.WORK_ORDER_NO}
          </td>
          <td className="border text-center text-xs">
            {masterData.ORDER_REFERENCE}
          </td>
          <td className="border text-center text-xs">{masterData.FABRIC}</td>
          <td className="border text-center text-xs">
            {masterData.GMT_COLOR_ID} {masterData.MTL_COLOR}
          </td>
          <td className="border text-center text-xs">{masterData.WO_QTY}</td>
          <td className="border text-center text-xs">
            {masterData.AGEING}
          </td>
          <td className="border text-center text-xs">
            {masterData.RECEIVE_QTY}
          </td>
          <td className="border text-center text-xs">
            {masterData.RET_QTY}
          </td>
          {Number(masterData.RECEIVE_QTY - masterData.WO_QTY) < 0 ? (
            <td className={`border text-center text-xs text-red-500`}>
              {(masterData.RECEIVE_QTY - masterData.RET_QTY - masterData.WO_QTY).toFixed(2)}
            </td>
          ) : (
            <td className={`border text-center text-xs`}>
              {(masterData.RECEIVE_QTY - masterData.RET_QTY - masterData.WO_QTY).toFixed(2)}
            </td>
          )}

          <td className="border text-center text-xs">{masterData?.ALLOCATED_QTY}</td>
          <td className="border text-center text-xs">
            {(masterData.RECEIVE_QTY - masterData?.ALLOCATED_QTY).toFixed(2)}
          </td>
          <td className="border text-center text-xs">{masterData.UOM}</td>
          <td className="border text-center text-xs">
            {Number(masterData.CONSUMPTION_PER_DZN) == 0
              ? "0"
              : (
                Math.abs(masterData.RECEIVE_QTY - masterData.ALLOCATED_QTY) /
                (Number(masterData.CONSUMPTION_PER_DZN) / 12)
              ).toFixed(2)}
          </td>
          {/* only render first row of details data */}
          <td className="border text-center text-xs">
            {detailsData[0]?.STYLENO}
          </td>
          <td className="border text-center text-xs">{detailsData[0]?.PONO}</td>
          {/* <td className="border text-center text-xs">
            {detailsData[0]?.REQUIRED_QTY}
          </td> */}
          <td className="border text-center text-xs">
            {detailsData[0]?.ALLOCATED_QTY}
          </td>

          {/* <td className="border text-center text-xs">
            {
              isNaN(detailsData[0]?.ALLOCATED_QTY - detailsData[0]?.REQUIRED_QTY)
                ? "0"
                : (detailsData[0]?.ALLOCATED_QTY - detailsData[0]?.REQUIRED_QTY).toFixed(2)
            }

          </td> */}
          {/* end only render first row of details data */}
        </tr>

        {/* render all except first row of details data*/}
        {detailsData.map((dtls, index) =>
          index === 0 ? null : (
            <tr key={Math.random()}>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center text-xs">{dtls?.STYLENO}</td>
              <td className="border text-center text-xs">{dtls?.PONO}</td>
              {/* <td className="border text-center text-xs">
                {dtls?.REQUIRED_QTY}
              </td> */}
              <td className="border text-center text-xs">
                {dtls?.ALLOCATED_QTY}
              </td>
              {/* <td className="border text-center text-xs">
                {(dtls?.ALLOCATED_QTY - dtls?.REQUIRED_QTY).toFixed(2) || "0"}
              </td> */}
            </tr>
          )
        )}
        {/* end render all except first row of details data*/}

        {/* total allocation qty */}
        <tr key={Math.random()}>
          <td className="border text-right font-bold text-xs" colSpan={16}>
            TOTAL
          </td>
          {/* <td className="border text-center text-xs">{totalReqQty?.toFixed(2)}</td> */}
          <td className="border text-center font-bold text-xs">
            {totalAllocation?.toFixed(2)}
          </td>
          {/* <td className="border text-center text-xs">{isNaN(totalAllocation - totalReqQty) ? "0" : (totalAllocation - totalReqQty).toFixed(2)}</td> */}
        </tr>
        {/* total allocation qty */}
        <tr className="h-7">
          <td colSpan={16}></td>
        </tr>
      </tbody>
    </>
  );
}
