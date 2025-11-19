import moment from "moment";
import { DyeingBuyerWiseGreyStockReportType } from "./dyeing-buyer-wise-grey-stock-report-type";

export default function DyeingBuyerWiseGreyStockReportDesign({
  data,
}: {
  data: DyeingBuyerWiseGreyStockReportType[];
}) {
  function GetTableType() {
    const tableType: number[] = [];
    data.forEach((element) => {
      if (!tableType.includes(element.TABLE_TYPE)) {
        tableType.push(element.TABLE_TYPE);
      }
    });
    return tableType;
  }
  const today = new Date();
  return (
    <div className="container">
      <h3 className="text-center font-bold">{data[0]?.COMPANY_NAME}</h3>
      <h5 className="text-center  font-bold m-2">{data[0]?.COMPANY_ADDRESS}</h5>
      <h3 className="text-center  font-bold m-3">
        BUYER WISE GREY STOCK SUMMARY
      </h3>
      <h6 id="BALANCE_DATE" className="text-center  font-bold m-3">
        Stock Till : {moment(today.toString()).format("DD-MMM-YY")}
      </h6>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-1">SL</th>
              <th className="border p-1">Buyer / Party Name</th>
              <th className="border p-1">Grey Stock Qty (kg)</th>
              <th className="border p-1">Balance Qty (kg)</th>
              <th className="border p-1">Batchable Qty (kg)</th>
              <th className="border p-1">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {GetTableType().map((type) => (
              <DyeingBuyerWiseGreyStockReportDesign_BuyerType
                data={data.filter((d) => d.TABLE_TYPE === type)}
              />
            ))}
            <TotalRow data={data} typeId={0} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DyeingBuyerWiseGreyStockReportDesign_BuyerType({
  data,
}: {
  data: DyeingBuyerWiseGreyStockReportType[];
}) {
  return (
    <>
      {data.map((d, index) => (
        <tr>
          <td className="border p-1 text-center">{index + 1}</td>
          <td className="border p-1">{d.BUYER_PARTY}</td>
          <td className="border p-1 text-center">{d.BATCH_BALANCE}</td>
          <td className="border p-1 text-center"></td>
          <td className="border p-1 text-center"></td>
          <td className="border p-1 text-center"></td>
        </tr>
      ))}
      <TotalRow data={data} typeId={data[0]?.TABLE_TYPE} />
    </>
  );
}

function TotalRow({
  data,
  typeId,
}: {
  data: DyeingBuyerWiseGreyStockReportType[];
  typeId: number;
}) {
  return (
    <tr>
      <td className="border p-1 text-center font-bold" colSpan={2}>
        {typeId === 1
          ? "Inside Total"
          : typeId === 2
          ? "Subcontract Total"
          : "Grand Total"}
      </td>
      <td className="border p-1 text-center font-bold">
        {data.reduce((p, c) => p + c.BATCH_BALANCE, 0).toFixed(2)}
      </td>
      <td className="border p-1 text-center" colSpan={3}></td>
    </tr>
  );
}
