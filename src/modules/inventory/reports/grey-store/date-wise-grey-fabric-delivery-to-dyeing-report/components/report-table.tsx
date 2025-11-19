import moment from "moment";
import { DateWiseGreyFabricDeliveryToDyeingReport } from "../date-wise-grey-fabric-delivery-to-dyeing-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  companyHeader,
  secondHeader,
}: {
  data: DateWiseGreyFabricDeliveryToDyeingReport[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();




  function groupBy(data: DateWiseGreyFabricDeliveryToDyeingReport[]) {
    const grouped: IGroupedData = {};
    const grandTotal: IGrandTotal = {};
    const finalTotal: IFinalTotal = {
      IN_HOUSE_TOTAL: 0,
      OUTSIDE_TOTAL: 0,
      TOTAL_QTY: 0,
    };

    data.forEach((item) => {
      const dateKey = moment(item.CHALLAN_DATE).format("DD-MMM-YY");
      const companyKey = item.INTER_COMPANY || "Unknown";

      const inHouseProduction = Number(item.IN_HOUSE_QTY);
      const outsideProduction = Number(item.OUTSIDE_QTY);

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          PRODUCTION_DATE: dateKey,
          TOTAL_QTY: 0,
          IN_HOUSE: 0,
          OUTSIDE: 0,
          INTER_COMPANY: {},
        };
      }

      if (!grouped[dateKey].INTER_COMPANY[companyKey]) {
        grouped[dateKey].INTER_COMPANY[companyKey] = {
          IN_HOUSE: 0,
          OUTSIDE: 0,
        };
      }

      grouped[dateKey].INTER_COMPANY[companyKey].IN_HOUSE += inHouseProduction;
      grouped[dateKey].INTER_COMPANY[companyKey].OUTSIDE += outsideProduction;

      grouped[dateKey].IN_HOUSE += inHouseProduction;
      grouped[dateKey].OUTSIDE += outsideProduction;
      grouped[dateKey].TOTAL_QTY += inHouseProduction + outsideProduction;

      if (!grandTotal[companyKey]) {
        grandTotal[companyKey] = {
          IN_HOUSE: 0,
          OUTSIDE: 0,
        };
      }
      grandTotal[companyKey].IN_HOUSE += inHouseProduction;
      grandTotal[companyKey].OUTSIDE += outsideProduction;

      finalTotal.IN_HOUSE_TOTAL += inHouseProduction;
      finalTotal.OUTSIDE_TOTAL += outsideProduction;
      finalTotal.TOTAL_QTY += inHouseProduction + outsideProduction;

      uniqueKeys.add(dateKey);
    });

    return { grouped, grandTotal, finalTotal };
  }

  interface IGroupedData {
    [date: string]: {
      PRODUCTION_DATE: string;
      TOTAL_QTY: number;
      IN_HOUSE: number;
      OUTSIDE: number;
      INTER_COMPANY: {
        [companyName: string]: {
          IN_HOUSE: number;
          OUTSIDE: number;
        };
      };
    };
  }

  interface IGrandTotal {
    [companyName: string]: {
      IN_HOUSE: number;
      OUTSIDE: number;
    };
  }

  interface IFinalTotal {
    IN_HOUSE_TOTAL: number;
    OUTSIDE_TOTAL: number;
    TOTAL_QTY: number;
  }



  let groupedData: IGroupedData = {};
  let grandTotal: IGrandTotal = {};
  let finalTotal: IFinalTotal = {
    IN_HOUSE_TOTAL: 0,
    OUTSIDE_TOTAL: 0,
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
                <th className="border border-gray-300 p-1">In-House</th>
                <th className="border border-gray-300 p-1">Outside</th>
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
                      {groupedData[key]?.INTER_COMPANY[company]?.IN_HOUSE.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-1 text-center">
                      {groupedData[key]?.INTER_COMPANY[company]?.OUTSIDE.toFixed(2)}
                    </td>
                  </>
                );
              })}

              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].IN_HOUSE.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].OUTSIDE.toFixed(2)}
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
                {grandTotal[company]?.IN_HOUSE?.toFixed(2) || "0.00"}
              </td>
              <td className="border border-gray-300 p-1 text-center font-bold">
                {grandTotal[company]?.OUTSIDE?.toFixed(2) || "0.00"}
              </td>
            </>
          ))}

          <td className="border border-gray-300 p-1 text-center font-bold">
            {finalTotal.IN_HOUSE_TOTAL.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1 text-center font-bold">
            {finalTotal.OUTSIDE_TOTAL.toFixed(2)}
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
