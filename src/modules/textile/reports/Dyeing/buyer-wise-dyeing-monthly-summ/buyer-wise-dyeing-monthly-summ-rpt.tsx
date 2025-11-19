import moment from "moment";
import { BuyerWiseDyeingMonthlySummaryReportType } from "./buyer-wise-dyeing-monthly-summ-rpt-type";

export default function BuyerWiseDyeingMonthlySummaryReport({
  data,
}: {
  data: BuyerWiseDyeingMonthlySummaryReportType[];
}) {
  const lstBuyer: { name: string; sroting: number }[] = [];

  data?.forEach((element) => {
    const da = lstBuyer.filter((x) => x.name === element.BUYER_NAME);
    if (da != null && da.length <= 0) {
      lstBuyer.push({ name: element.BUYER_NAME, sroting: element.SORTING_NO });
    }
  });

  lstBuyer.sort(
    (a, b) => a.sroting - b.sroting || a.name.localeCompare(b.name)
  );

  // lstBuyer.sort((x, y) => {
  //   if (x < y) {
  //     return -1;
  //   }
  //   if (x > y) {
  //     return 1;
  //   }
  //   return 0;
  // });

  //after sortin complete the add N/A
  // if (isNAExist) {
  //   lstBuyer.push("N/A");
  // }

  const lstBatchDate = [
    ...new Set(
      data.map((item) => moment(item.BATCH_DATE).format("DD-MMM-YYYY"))
    ),
  ]; // [ 'A', 'B']

  const getDateBuyerWiseQty = (buyerName: string, _date: string): number =>
    data
      ?.filter(
        (ele) =>
          ele.BUYER_NAME === buyerName &&
          moment(ele.BATCH_DATE).format("DD-MMM-YYYY") ===
          moment(_date).format("DD-MMM-YYYY")
      )
      ?.reduce((pre, cur) => pre + cur.BATCH_QTY_KG, 0);

  const getDateWiseQty = (_date: string): number =>
    data
      ?.filter(
        (ele) =>
          moment(ele.BATCH_DATE).format("DD-MMM-YYYY") ===
          moment(_date).format("DD-MMM-YYYY")
      )
      ?.reduce((pre, cur) => pre + cur.BATCH_QTY_KG, 0);

  const getBuyerWiseQty = (buyerName: string): number =>
    data
      ?.filter((ele) => ele.BUYER_NAME === buyerName)
      ?.reduce((pre, cur) => pre + cur.BATCH_QTY_KG, 0);

  const getTotalQty = (): number =>
    data?.reduce((pre, cur) => pre + cur.BATCH_QTY_KG, 0);

  return (
    <div className="p-4 px-10">
      <div className="">
        <h1 className="font-bold text-2xl text-center">
          {data[0]?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-sm text-center">
          {data[0]?.COMPANY_ADDRESS}
        </h4>
        <div className="flex justify-center">
          <h3 className="font-bold text-lg text-center px-2 mt-2 bg-gray-200">
            Buyer wise Dyeing Monthly Summary report
          </h3>
        </div>
      </div>
      <div className="mt-5">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr className="text-center font-semibold">
              <th className="border border-gray-300 p-1 text-sm min-w-20 text-center">
                Date
              </th>
              {lstBuyer.map((buyer) => (
                <th className="border border-gray-300 p-1 text-sm min-w-28">
                  {buyer.name}
                </th>
              ))}
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {lstBatchDate?.map((date) => (
              <tr>
                <td className="border border-gray-300 p-1 text-sm text-center">
                  {moment(date).format("DD-MMM-YY")}
                </td>
                {lstBuyer?.map((buyer) => (
                  <td className="border border-gray-300 p-1 text-sm text-center">
                    {getDateBuyerWiseQty(buyer.name, date.toString())}
                  </td>
                ))}
                <td className="border border-gray-300 p-1 text-sm text-center">
                  {getDateWiseQty(date.toString()).toFixed(2)}
                </td>
              </tr>
            ))}
            {/* Total row */}
            <tr>
              <td className="border border-gray-300 p-1 text-sm text-center font-bold">
                Total
              </td>
              {lstBuyer?.map((buyer) => (
                <td className="border border-gray-300 p-1 text-sm text-center font-bold">
                  {getBuyerWiseQty(buyer.name).toFixed(2)}
                </td>
              ))}
              <td className="border border-gray-300 p-1 text-sm text-center font-bold">
                {getTotalQty().toFixed(2)}
              </td>
            </tr>


            <tr>
              <td className="border border-gray-300 p-1 text-sm text-center font-bold">
                % Of Total Qty
              </td>
              {lstBuyer?.map((buyer) => (
                <td className="border border-gray-300 p-1 text-sm text-center font-bold">
                  {(getBuyerWiseQty(buyer.name) * 100 / getTotalQty()).toFixed(2)} %
                </td>
              ))}
              <td className="border border-gray-300 p-1 text-sm text-center font-bold">
                100 %
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
