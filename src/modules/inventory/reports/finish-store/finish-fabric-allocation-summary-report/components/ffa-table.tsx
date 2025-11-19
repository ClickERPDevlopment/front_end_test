import {
  FinishFabricAllocationSummaryReportDetailsType,
  FinishFabricAllocationSummaryReportMasterType,
} from "../finish-fabric-allocation-summary-report-type";

export default function FFATable({
  masterData,
  detailsData,
}: {
  masterData: FinishFabricAllocationSummaryReportMasterType;
  detailsData: FinishFabricAllocationSummaryReportDetailsType[];
}) {
  const columns = [
    { name: "SUPPLIER", classes: "min-w-[150px]" },
    { name: "WO NO/PI", classes: "min-w-[150px]" },
    { name: "ORDER REF", classes: "min-w-[100px]" },
    { name: "ITEM NAME", classes: "min-w-[200px]" },
    { name: "MATERIAL COLOR", classes: "" },
    { name: "WO QTY", classes: "" },
    { name: "RCV QTY", classes: "" },
    { name: "STOCK QTY", classes: "min-w-[60px]" } /*Rcv-Allocation*/,
    { name: "UOM", classes: "" },
    { name: "ALLOC. STYLE", classes: "" },
    { name: "ALLOC. PO", classes: "" },
    { name: "REQ. QTY", classes: "" },
    { name: "ALLO. QTY", classes: "" },
    { name: "ALLO. BAL", classes: "" },
  ];

  let totalAllocation = 0;
  detailsData.forEach((element) => {
    totalAllocation += element.ALLOCATED_QTY;
  });

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
            Style: {masterData.STYLENO}
          </th>
          <th colSpan={5} className="text-left"></th>
          <th colSpan={5} className="text-center border text-sm rounded-tr">
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
            {masterData.WORK_ORDER_NO}
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
            {masterData.RECEIVE_QTY}
          </td>
          <td className="border text-center text-xs">{masterData.STOCK}</td>
          <td className="border text-center text-xs">{masterData.UOM}</td>
          {/* only render first row of details data */}
          <td className="border text-center text-xs">
            {detailsData[0]?.STYLENO}
          </td>
          <td className="border text-center text-xs">{detailsData[0]?.PONO}</td>
          <td className="border text-center text-xs">
            {detailsData[0]?.REQUIRED_QTY}
          </td>
          <td className="border text-center text-xs">
            {detailsData[0]?.ALLOCATED_QTY}
          </td>
          <td className="border text-center text-xs">
            {detailsData[0]?.ALLOCATION_BALANCE}
          </td>
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
              <td className="border text-center text-xs">{dtls?.STYLENO}</td>
              <td className="border text-center text-xs">{dtls?.PONO}</td>
              <td className="border text-center text-xs">
                {dtls?.REQUIRED_QTY}
              </td>
              <td className="border text-center text-xs">
                {dtls?.ALLOCATED_QTY}
              </td>
              <td className="border text-center text-xs">
                {dtls?.ALLOCATION_BALANCE}
              </td>
            </tr>
          )
        )}
        {/* end render all except first row of details data*/}

        {/* total allocation qty */}
        <tr key={Math.random()}>
          <td className="border text-right font-bold text-xs" colSpan={12}>
            TOTAL ALLOCATION QTY
          </td>
          <td className="border text-center font-bold text-xs">
            {totalAllocation}
          </td>
          <td className="border text-center text-xs"></td>
        </tr>
        {/* total allocation qty */}
        <tr className="h-7">
          <td colSpan={14}></td>
        </tr>
      </tbody>
    </>
  );
}
