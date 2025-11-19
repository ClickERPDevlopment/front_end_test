import { IYarnTransfer } from "../yarn-transfer-report-type";

function ChallanBody({
  data,
}: {
  data: IYarnTransfer | null | undefined;
}) {

  return (
    <div className="flex min-w-full mt-5 border">
      <div className="flex-[2] min-w-full">
        <table className="border-collapse border border-gray-300 w-full">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center font-bold">
              <th className="border border-gray-950 p-0.5">SL</th>
              <th className="border border-gray-950 p-0.5">BBLC NO/WORK ORDER</th>
              <th className="border border-gray-950 p-0.5">YARN</th>
              <th className="border border-gray-950 p-0.5">LOT</th>
              <th className="border border-gray-950 p-0.5">BRAND</th>
              <th className="border border-gray-950 p-0.5">CTN QTY</th>
              <th className="border border-gray-950 p-0.5">PER CTN QTY</th>
              <th className="border border-gray-950 p-0.5">CONE QTY</th>
              <th className="border border-gray-950 p-0.5">QTY(KG)</th>
            </tr>
          </thead>
          <tbody>
            {data?.lstDetails?.map((item, index) =>
              <tr style={{ fontSize: "11px" }} className="font-bold">
                <td className="border border-gray-950 p-0.5 text-center">{index + 1}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.BB_LC ?? item.WORK_ORDER}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.YARN}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.YARN_LOT_NO}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.BRAND}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.CARTON_QTY}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.PER_CTN_QTY}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.CONE_QTY}</td>
                <td className="border border-gray-950 p-0.5 text-center">{item.QUANTITY}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center font-bold">
              <th className="border border-gray-950 p-0.5" colSpan={5}>TOTAL</th>
              <th className="border border-gray-950 p-0.5">{data?.lstDetails?.reduce((p, c) => p + c.CARTON_QTY, 0)}</th>
              <th className="border border-gray-950 p-0.5"></th>
              <th className="border border-gray-950 p-0.5">{data?.lstDetails?.reduce((p, c) => p + c.CONE_QTY, 0)}</th>
              <th className="border border-gray-950 p-0.5">{data?.lstDetails?.reduce((p, c) => p + c.QUANTITY, 0)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex-[1]">
      </div>
    </div>
  );
}

export default ChallanBody;
