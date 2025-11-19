import moment from "moment";
import { KnittingProductionReportType } from "../knitting-production-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  secondHeader,
}: {
  data: KnittingProductionReportType[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: KnittingProductionReportType[]) {
    const grouped: IGroupedData = {};
    const grandTotal: IGrandTotal = {};
    const finalTotal: IFinalTotal = {
      IN_HOUSE_TOTAL: 0,
      OUTSIDE_TOTAL: 0,
      TOTAL_PROD: 0,
    };

    data.forEach((item) => {
      const dateKey = moment(item.PRODUCTION_DATE).format("DD-MMM-YY");
      const companyKey = item.INTER_COMPANY || "Unknown";
      const floorKey = item.FLOOR_NAME || "Unknown Floor";

      const inHouseProduction = Number(item.IN_HOUSE_PROD);
      const outsideProduction = Number(item.OUTSIDE_PROD);

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          PRODUCTION_DATE: dateKey,
          TOTAL_PROD: 0,
          IN_HOUSE_PROD: 0,
          OUTSIDE_PROD: 0,
          INTER_COMPANY: {},
        };
      }

      if (!grouped[dateKey].INTER_COMPANY[companyKey]) {
        grouped[dateKey].INTER_COMPANY[companyKey] = {};
      }

      if (!grouped[dateKey].INTER_COMPANY[companyKey][floorKey]) {
        grouped[dateKey].INTER_COMPANY[companyKey][floorKey] = {
          IN_HOUSE_PROD: 0,
          OUTSIDE_PROD: 0,
        };
      }

      grouped[dateKey].INTER_COMPANY[companyKey][floorKey].IN_HOUSE_PROD += inHouseProduction;
      grouped[dateKey].INTER_COMPANY[companyKey][floorKey].OUTSIDE_PROD += outsideProduction;

      grouped[dateKey].IN_HOUSE_PROD += inHouseProduction;
      grouped[dateKey].OUTSIDE_PROD += outsideProduction;
      grouped[dateKey].TOTAL_PROD += inHouseProduction + outsideProduction;

      if (!grandTotal[companyKey]) {
        grandTotal[companyKey] = {};
      }

      if (!grandTotal[companyKey][floorKey]) {
        grandTotal[companyKey][floorKey] = {
          IN_HOUSE_PROD: 0,
          OUTSIDE_PROD: 0,
        };
      }

      grandTotal[companyKey][floorKey].IN_HOUSE_PROD += inHouseProduction;
      grandTotal[companyKey][floorKey].OUTSIDE_PROD += outsideProduction;

      finalTotal.IN_HOUSE_TOTAL += inHouseProduction;
      finalTotal.OUTSIDE_TOTAL += outsideProduction;
      finalTotal.TOTAL_PROD += inHouseProduction + outsideProduction;

      uniqueKeys.add(dateKey);
    });

    return { grouped, grandTotal, finalTotal };
  }


  interface IGroupedData {
    [date: string]: {
      PRODUCTION_DATE: string;
      TOTAL_PROD: number;
      IN_HOUSE_PROD: number;
      OUTSIDE_PROD: number;
      INTER_COMPANY: {
        [companyName: string]: {
          [floorName: string]: {
            IN_HOUSE_PROD: number;
            OUTSIDE_PROD: number;
          };
        };
      };
    };
  }


  interface IGrandTotal {
    [companyName: string]: {
      [floorName: string]: {
        IN_HOUSE_PROD: number;
        OUTSIDE_PROD: number;
      };
    };
  }

  interface IFinalTotal {
    IN_HOUSE_TOTAL: number;
    OUTSIDE_TOTAL: number;
    TOTAL_PROD: number;
  }



  let groupedData: IGroupedData = {};
  let grandTotal: IGrandTotal = {};
  let finalTotal: IFinalTotal = {
    IN_HOUSE_TOTAL: 0,
    OUTSIDE_TOTAL: 0,
    TOTAL_PROD: 0,
  };

  if (data) {
    const result = groupBy(data);
    groupedData = result.grouped;
    grandTotal = result.grandTotal;
    finalTotal = result.finalTotal;
  }


  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const companyFloorHeader: { company: string; floor: string }[] = [];

  Object.keys(grandTotal).forEach((company) => {
    const floors = Object.keys(grandTotal[company]);
    floors.forEach((floor) => {
      companyFloorHeader.push({ company, floor });
    });
  });


  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-300 w-[100%]">
        <thead>
          <tr>
            {firstHeader?.map((item) => (
              <th rowSpan={2} className="border border-gray-300 p-1 text-center font-bold">
                {item}
              </th>
            ))}

            {companyFloorHeader?.map((item) => (
              <th
                key={`${item.company}-${item.floor}`}
                colSpan={2}
                className="border border-gray-300 text-center font-bold text-nowrap"
              >
                <p className="border-b  min-w-[100%] p-1">
                  {item.company}
                </p>
                <p className="p-1">{item.floor}</p>
              </th>
            ))}

            {secondHeader?.map((item) => (
              <th rowSpan={2} className="border border-gray-300 p-1 text-center font-bold">
                {item}
              </th>
            ))}
          </tr>

          <tr>
            {companyFloorHeader?.map(() => (
              <>
                <th className="border border-gray-300 p-1 text-center font-semibold">In-House</th>
                <th className="border border-gray-300 p-1 text-center font-semibold">Outside</th>
              </>
            ))}
          </tr>
        </thead>

        <tbody>
          {uniqueKeysArray?.map((dateKey) => (
            <tr key={dateKey}>
              <td className="border text-center border-gray-300 p-1 text-nowrap">
                {moment(groupedData[dateKey].PRODUCTION_DATE).format("DD-MMM-YY")}
              </td>

              {companyFloorHeader?.map(({ company, floor }) => {
                const floorData = groupedData[dateKey]?.INTER_COMPANY?.[company]?.[floor];
                return (
                  <>
                    <td className="border border-gray-300 p-1 text-center">
                      {floorData?.IN_HOUSE_PROD?.toFixed(2) || "0.00"}
                    </td>
                    <td className="border border-gray-300 p-1 text-center">
                      {floorData?.OUTSIDE_PROD?.toFixed(2) || "0.00"}
                    </td>
                  </>
                );
              })}

              <td className="border border-gray-300 p-1 text-center">
                {groupedData[dateKey].IN_HOUSE_PROD.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[dateKey].OUTSIDE_PROD.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[dateKey].TOTAL_PROD.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td
              className="border text-center border-gray-300 p-1 font-bold"
              colSpan={firstHeader?.length}
            >
              Grand Total
            </td>

            {companyFloorHeader?.map(({ company, floor }) => {
              const floorTotal = grandTotal?.[company]?.[floor];
              return (
                <>
                  <td className="border border-gray-300 p-1 text-center font-bold">
                    {floorTotal?.IN_HOUSE_PROD?.toFixed(2) || "0.00"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold">
                    {floorTotal?.OUTSIDE_PROD?.toFixed(2) || "0.00"}
                  </td>
                </>
              );
            })}

            <td className="border border-gray-300 p-1 text-center font-bold">
              {finalTotal.IN_HOUSE_TOTAL.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-1 text-center font-bold">
              {finalTotal.OUTSIDE_TOTAL.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-1 text-center font-bold">
              {finalTotal.TOTAL_PROD.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );

}

export default ReportTable;
