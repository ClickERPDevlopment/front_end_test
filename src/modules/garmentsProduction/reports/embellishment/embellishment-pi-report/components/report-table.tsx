import { ToWords } from "to-words";
import { EmbellishmentPIReportType } from "../embellishment-pi-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
}: {
  data: EmbellishmentPIReportType[];
  firstHeader: string[] | null;
}) {
  const totalQty = data?.reduce((acc, item) => acc + (item.QTY || 0), 0);
  const totalAmount = data?.reduce(
    (acc, item) => acc + (item.PRICE || 0) * (item.QTY || 0),
    0
  );

  const toWords = new ToWords({
    localeCode: "en-US",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: "Dollar",
        plural: "Dollars",
        symbol: "$",
        fractionalUnit: {
          name: "Cent",
          plural: "Cents",
          symbol: "",
        },
      },
    },
  });

  return (
    <div className="text-sm mt-5" style={{ fontSize: "14px" }}>
      <table className="border-collapse border border-gray-400 w-full shadow-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-900">
            {firstHeader?.map((item, idx) => (
              <th
                key={idx}
                className="border border-gray-400 px-2 py-1 text-center font-semibold"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >
          {data?.map((item, index) => {
            const totalRowAmount = (item.PRICE || 0) * (item.QTY || 0);

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-left">
                  {item.PARTS}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-left">
                  {item.STYLE}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-left">
                  {item.EMB_WORK_ORDER_NO}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-left">
                  {item.PRINT_TYPE}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {item.QTY}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {((item.PRICE || 0) * 12).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right">
                  {totalRowAmount.toFixed(2)}
                </td>
              </tr>
            );
          })}

          <tr className="bg-gray-100 font-bold">
            <td
              className="border border-gray-400 px-2 py-1 text-center"
              colSpan={5}
            >
              Total
            </td>
            <td className="border border-gray-400 px-2 py-1 text-center">
              {totalQty}
            </td>
            <td className="border border-gray-400 px-2 py-1 text-center">—</td>
            <td className="border border-gray-400 px-2 py-1 text-right">
              {totalAmount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4" style={{ fontSize: "14px" }}>
        <p>
          <span className="font-semibold">Amount in Words:</span>{" "}
          {totalAmount && toWords.convert(totalAmount)}
        </p>
      </div>

      {/* Terms & Conditions */}
      {/* <div className="mt-4 border border-gray-300 rounded-md p-3 bg-gray-50">
        <p className="text-sm font-semibold underline">Terms & Conditions:</p>
        <div className="mt-1 text-sm leading-6">
          {data[0]?.TERM_CONDITIONS
            ? data[0].TERM_CONDITIONS.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))
            : "No terms and conditions provided."}
        </div>
      </div> */}
    </div>
  );
}

export default ReportTable;
