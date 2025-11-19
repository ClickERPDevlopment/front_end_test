import { YarnTwistingWorkOrderReportType } from "../yarn-twisting-wrok-order-rpt-type";

function ReportTable({
  data
}: {
  data: YarnTwistingWorkOrderReportType[];
}) {

  return (
    <div className="mt-5 min-w-full border">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2 border border-gray-600 text-sm text-center">STYLE</th>
            <th className="p-2 border border-gray-600 text-sm text-center">PO/JOB</th>
            <th className="p-2 border border-gray-600 text-sm text-center">ISSUE YARN</th>
            <th className="p-2 border border-gray-600 text-sm text-center">YARN COLOR</th>
            <th className="p-2 border border-gray-600 text-sm text-center">WO QTY</th>
            <th className="p-2 border border-gray-600 text-sm text-center">UOM</th>
            <th className="p-2 border border-gray-600 text-sm text-center">PRICE</th>
            <th className="p-2 border border-gray-600 text-sm text-center">AMOUNT ($)</th>
            <th className="p-2 border border-gray-600 text-sm text-center">REQUIRED TWISTED YARN</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(ele =>
            <tr key={ele.ID}>
              <td className="p-2 border border-gray-600 text-sm text-center whitespace-nowrap">{ele.STYLENAME}</td>
              <td className="p-2 border border-gray-600 text-sm text-center whitespace-nowrap">{ele.PO_NO}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.SUB_YARN}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.MTL_COLOR_NAME}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.WORK_ORDER_QTY}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.UOM}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.SUPPLIER_RATE_PER_PCS}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.TOTAL_AMOUNT}</td>
              <td className="p-2 border border-gray-600 text-sm text-center">{ele.MTL_NAME}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th className="border border-gray-600 text-sm text-center" colSpan={4}>Total</th>
            <th className=" border border-gray-600 text-sm text-center">
              {
                data.reduce((p, c) => p + Number(c.WORK_ORDER_QTY), 0)
              }
            </th>
            <th className=" border border-gray-600 text-sm text-center"></th>
            <th className=" border border-gray-600 text-sm text-center"></th>
            <th className="border border-gray-600 text-sm text-center">
              {
                data.reduce((p, c) => p + Number(c.TOTAL_AMOUNT), 0)
              }
            </th>
            <th className=" border border-gray-600 text-sm text-center"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ReportTable;
