/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";
import SummaryReport from "../summary-components/report";
import moment from "moment";

function Report({
  data,
  searchParams,
}: {
  data: IAccessoriesReportWithPo[];
  searchParams: { currency: string, isColorWiseSummary: boolean };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IAccessoriesReportWithPo[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) result[key] = { items: [] };
      result[key].items.push(item);
      return result;
    }, {} as Record<string, { items: IAccessoriesReportWithPo[] }>);
  }

  let groupedByBuyer = groupBy(data, ["SUB_PO"]);
  const uniqueKeysArray = Array.from(uniqueKeys);

  const firstHeader = ["STYLE NO.", "JOB", "PO", "COLOR", "MTL COLOR", "ITEM NAME"];
  const secondHeader = ["WO QTY", "EXT. (%)", "CONZ", "UOM", "RATE", "AMOUNT"];

  const uniqueSizes: Set<string> = new Set();
  data.forEach((item) => item.GMT_SIZE_NAME && uniqueSizes.add(item.GMT_SIZE_NAME));
  const sizeHeader = Array.from(uniqueSizes);

  const header = firstHeader.concat(sizeHeader).concat(secondHeader);

  const totalQty = data.reduce((acc, item) => acc + item.WORK_ORDER_QTY, 0);
  const totalAmount = data.reduce(
    (acc, item) => acc + item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY,
    0
  );

  const sizeGrandTotals: Record<string, number> = {};
  data.forEach((item) => {
    if (item.GMT_SIZE_NAME) {
      sizeGrandTotals[item.GMT_SIZE_NAME] =
        (sizeGrandTotals[item.GMT_SIZE_NAME] || 0) + item.WORK_ORDER_QTY;
    }
  });

  return (
    <div style={{ fontFamily: "" }}>
      <div className="p-2">
        <ReportHeader searchParams={{ currency: searchParams.currency }} masterData={data[0]} />

        {
          data[0]?.REVICE_DATE &&
          <div className="mt-2">
            <p style={{ fontSize: "12px" }}>
              <span className="font-bold">Revision No#</span>{data[0]?.REVICE_NO} <span className="font-bold ms-2">Revision Date:</span> {data[0]?.REVICE_DATE && moment(data[0]?.REVICE_DATE).format("DD-MMM-YY")}<span className="font-bold ms-2">Revision Reason:</span> {data[0]?.REVICE_REASON}
            </p>
          </div>
        }


        <div className=" font-bold text-sm mt-1">
          <p>SUB: {data[0]?.WO_SUBJECT}</p>
        </div>
        <div className="text-sm mt-1">
          <div className="flex items-center font-semibold justify-between">
            <p>BUYER: {data[0]?.BUYER_NAME}</p>
            <p className="text-right">
              <span className="font-bold">Currency:</span> {data[0]?.CURRENCY}
            </p>
          </div>

          <table className="border-collapse border border-gray-950 w-full" >
            <thead style={{ backgroundColor: "#a4f4cf" }}>
              <tr>
                {header.map((item) => (
                  <th key={item} className="border border-gray-950 p-1">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {uniqueKeysArray.map((key) => (
                <ReportTable
                  key={key}
                  data={groupedByBuyer[key].items}
                  firstHeader={firstHeader}
                  sizeHeader={sizeHeader}
                  secondHeader={secondHeader}
                />
              ))}

              <tr className="font-bold bg-yellow-100" style={{ backgroundColor: "#fbffdd" }}>
                <td colSpan={firstHeader.length} className="border text-center border-gray-950 p-1 font-bold">
                  Grand Total
                </td>

                {sizeHeader.map((size) => (
                  <td key={`grand-${size}`} className="border border-gray-950 p-1 text-center font-bold">
                    {sizeGrandTotals[size] || 0}
                  </td>
                ))}

                <td className="border border-gray-950 p-1 text-center font-bold">{totalQty}</td>
                <td className="border border-gray-950 p-1 text-center font-bold"></td>
                <td className="border border-gray-950 p-1 text-center font-bold"></td>
                <td className="border border-gray-950 p-1 text-center font-bold"></td>
                <td className="border border-gray-950 p-1 text-center font-bold"></td>
                <td className="border border-gray-950 p-1 text-center font-bold">{totalAmount.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {
          searchParams.isColorWiseSummary && <div>
            <p className="text-center font-bold mb-0 p-0 mt-2" style={{ fontSize: "15px" }}>
              Color Wise Summary
            </p>
            <SummaryReport data={data} />
          </div>
        }


        <div className="mt-3">
          <p>
            <span className="font-bold">Note:</span> Please mention the Work Order Number in the Delivery
            Challan and PI.
          </p>
        </div>

        <div className="mt-1">
          <p>
            <span className="font-bold">Remarks:</span> {data[0]?.REMARKS}
          </p>
        </div>


        <ReportFooter masterData={data[0]} />
      </div>
    </div>
  );
}

export default Report;
