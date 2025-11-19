import moment from "moment";
import { DateWiseYarnAndGreyFabricStockReportType } from "../date-wise-yarn-and-grey-stock-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  companyHeader,
  secondHeader,
}: {
  data: DateWiseYarnAndGreyFabricStockReportType[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();




  function groupBy(data: DateWiseYarnAndGreyFabricStockReportType[]) {
    const grouped: IGroupedData = {};
    const grandTotal: IGrandTotal = {};
    const finalTotal: IFinalTotal = {
      YARN_STOCK_TOTAL: 0,
      GREY_FABRIC_STOCK_TOTAL: 0,
      TOTAL_QTY: 0,
    };

    data.forEach((item) => {
      const dateKey = moment(item.STOCK_DATE).format("DD-MMM-YY");
      const companyKey = item.INTER_COMPANY || "Unknown";

      const inHouseProduction = Number(item.YARN_STOCK_QTY);
      const outsideProduction = Number(item.GREY_STOCK_QTY);

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          PRODUCTION_DATE: dateKey,
          TOTAL_QTY: 0,
          YARN_STOCK_QTY: 0,
          GREY_STOCK_QTY: 0,
          INTER_COMPANY: {},
        };
      }

      if (!grouped[dateKey].INTER_COMPANY[companyKey]) {
        grouped[dateKey].INTER_COMPANY[companyKey] = {
          YARN_STOCK_QTY: 0,
          GREY_STOCK_QTY: 0,
        };
      }

      grouped[dateKey].INTER_COMPANY[companyKey].YARN_STOCK_QTY += inHouseProduction;
      grouped[dateKey].INTER_COMPANY[companyKey].GREY_STOCK_QTY += outsideProduction;

      grouped[dateKey].YARN_STOCK_QTY += inHouseProduction;
      grouped[dateKey].GREY_STOCK_QTY += outsideProduction;
      grouped[dateKey].TOTAL_QTY += inHouseProduction + outsideProduction;

      if (!grandTotal[companyKey]) {
        grandTotal[companyKey] = {
          YARN_STOCK_QTY: 0,
          GREY_STOCK_QTY: 0,
        };
      }
      grandTotal[companyKey].YARN_STOCK_QTY += inHouseProduction;
      grandTotal[companyKey].GREY_STOCK_QTY += outsideProduction;

      finalTotal.YARN_STOCK_TOTAL += inHouseProduction;
      finalTotal.GREY_FABRIC_STOCK_TOTAL += outsideProduction;
      finalTotal.TOTAL_QTY += inHouseProduction + outsideProduction;

      uniqueKeys.add(dateKey);
    });

    return { grouped, grandTotal, finalTotal };
  }

  interface IGroupedData {
    [date: string]: {
      PRODUCTION_DATE: string;
      TOTAL_QTY: number;
      YARN_STOCK_QTY: number;
      GREY_STOCK_QTY: number;
      INTER_COMPANY: {
        [companyName: string]: {
          YARN_STOCK_QTY: number;
          GREY_STOCK_QTY: number;
        };
      };
    };
  }

  interface IGrandTotal {
    [companyName: string]: {
      YARN_STOCK_QTY: number;
      GREY_STOCK_QTY: number;
    };
  }

  interface IFinalTotal {
    YARN_STOCK_TOTAL: number;
    GREY_FABRIC_STOCK_TOTAL: number;
    TOTAL_QTY: number;
  }



  let groupedData: IGroupedData = {};
  let grandTotal: IGrandTotal = {};
  let finalTotal: IFinalTotal = {
    YARN_STOCK_TOTAL: 0,
    GREY_FABRIC_STOCK_TOTAL: 0,
    TOTAL_QTY: 0,
  };

  if (data) {
    const result = groupBy(data);
    groupedData = result.grouped;
    grandTotal = result.grandTotal;
    finalTotal = result.finalTotal;
  }


  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr>
            {firstHeader?.map((item) => (
              <th rowSpan={2} className="border border-gray-300 p-1">{item}</th>
            ))}
            {companyHeader?.map((item) => (
              <th colSpan={2} className="border border-gray-300 p-1">{item}</th>
            ))}
            {secondHeader?.map((item) => (
              <th rowSpan={2} className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>

          <tr>
            {companyHeader?.map(() => (
              <>
                <th className="border border-gray-300 p-1">Yarn Stock</th>
                <th className="border border-gray-300 p-1">Grey Fabric Stock</th>
              </>
            ))}
          </tr>

        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border text-center border-gray-300 p-1 text-nowrap">
                {moment(groupedData[key].PRODUCTION_DATE).format("DD-MMM-YY")}
              </td>

              {companyHeader?.map((company) => {
                return (
                  <>
                    <td className="border border-gray-300 p-1 text-center">
                      {groupedData[key]?.INTER_COMPANY[company]?.YARN_STOCK_QTY.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-1 text-center">
                      {groupedData[key]?.INTER_COMPANY[company]?.GREY_STOCK_QTY.toFixed(2)}
                    </td>
                  </>
                );
              })}

              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].YARN_STOCK_QTY.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].GREY_STOCK_QTY.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].TOTAL_QTY.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tr>
          <td
            className="border text-center border-gray-300 p-1 font-bold"
            colSpan={firstHeader?.length}
          >
            Grand Total
          </td>

          {companyHeader?.map((company) => (
            <>
              <td className="border border-gray-300 p-1 text-center font-bold">
                {grandTotal[company]?.YARN_STOCK_QTY?.toFixed(2) || "0.00"}
              </td>
              <td className="border border-gray-300 p-1 text-center font-bold">
                {grandTotal[company]?.GREY_STOCK_QTY?.toFixed(2) || "0.00"}
              </td>
            </>
          ))}

          <td className="border border-gray-300 p-1 text-center font-bold">
            {finalTotal.YARN_STOCK_TOTAL.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1 text-center font-bold">
            {finalTotal.GREY_FABRIC_STOCK_TOTAL.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1 text-center font-bold">
            {finalTotal.TOTAL_QTY.toFixed(2)}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportTable;
