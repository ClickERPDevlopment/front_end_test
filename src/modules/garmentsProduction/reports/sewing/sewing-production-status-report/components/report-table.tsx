import moment from "moment";
import { SewingProductionStatusReportType } from "../sewing-production-status-report-type";
import { SewingHourlyProductionStatusReportType } from "../sewing-hourly-production-status-report-type";
import React from "react";

function ReportTable({
  data,
  sewingHourlyProductionData,
  secondHeader,
}: {
  data: SewingProductionStatusReportType[];
  sewingHourlyProductionData: SewingHourlyProductionStatusReportType[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const uniqueHoursKeys: Set<string> = new Set();

  sewingHourlyProductionData.forEach((item) => { uniqueHoursKeys.add(item.HOUR.toString()) })

  function groupBy(data: SewingProductionStatusReportType[]) {
    const grouped: IGroupedData = {};
    const grandTotal: IGrandTotal = {};
    const companyTotals: Record<string, number> = {};
    const finalTotal: IFinalTotal = { TARGET: 0 };

    data.forEach((item) => {
      const dateKey = moment(item.TARGETDATE).format("DD-MMM-YY");
      const companyKey = item.PREFIX || "Unknown";
      const floorKey = item.UNITNAME || "Unknown Floor";
      const target = Number(item.HOURLYTARGET);

      const hourlyPerUnit = Number(item.HOURLYTARGET) / Number(item.TARGETHOUR);
      const hourlyPerLine = Number(hourlyPerUnit) / Number(item.NO_OF_LINE);
      const availableMin = Number(item.AVAILMIN);
      const earnMin = Number(item.EARN_MIN);

      const operator = Number(item.OPERATOR);
      const actualHours = Number(item.ACTUALHOURS);
      const targetHours = Number(item.TARGETHOUR);
      const runningTarget = Number(item.RUNNING_HOURLYTARGET);
      const numberOfLine = Number(item.NO_OF_LINE);
      const totalLine = Number(item.TOTAL_LINE);
      const avgSMV = Number(item.AVG_SMV);
      const fAvgSMV = Number(item.FACTORY_AVG_SMV);

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          TARGET_DATE: dateKey,
          TARGET: 0,
          HOURLY_PER_UNIT: 0,
          HOURLY_PER_LINE: 0,
          OPERATOR: 0,
          ACTUALHOURS: 0,
          TARGETHOUR: 0,
          RUNNING_HOURLYTARGET: 0,
          AVAILMIN: 0,
          EARN_MIN: 0,
          NO_OF_LINE: 0,
          TOTAL_LINE: 0,
          AVG_SMV: 0,
          COMPANY: {},
        };
      }

      if (!grouped[dateKey].COMPANY[companyKey]) {

        grouped[dateKey].COMPANY[companyKey] = {
          FLOORS: {},
          COMPANY_TOTAL: 0,
          FACTORYID: 0,
          HOURLY_PER_LINE_TOTAL: 0,
          HOURLY_PER_UNIT_TOTAL: 0,
          AVAILMIN_TOTAL: 0,
          EARN_MIN_TOTAL: 0,
          OPERATOR_TOTAL: 0,
          ACTUALHOURS_TOTAL: 0,
          TARGETHOUR_TOTAL: 0,
          RUNNING_HOURLYTARGET_TOTAL: 0,
          NO_OF_LINE: 0,
          TOTAL_LINE: 0,
          AVG_SMV: 0,
          FACTORY_AVG_SMV: 0,
        };
      }

      if (!grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey]) {
        grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey] = {
          TARGET: 0,
          HOURLY_PER_UNIT: 0,
          HOURLY_PER_LINE: 0,
          EARN_MIN: 0,
          AVAILMIN: 0,
          OPERATOR: 0,
          ACTUALHOURS: 0,
          TARGETHOUR: 0,
          RUNNING_HOURLYTARGET: 0,
          FLOOR_ID: 0,
          NO_OF_LINE: 0,
          TOTAL_LINE: 0,
          AVG_SMV: 0,
        };
      }

      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].TARGET += target;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].HOURLY_PER_UNIT += hourlyPerUnit;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].HOURLY_PER_LINE += hourlyPerLine;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].OPERATOR += operator;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].AVAILMIN += availableMin;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].EARN_MIN += earnMin;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].ACTUALHOURS += actualHours;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].TARGETHOUR += targetHours;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].FLOOR_ID = item.FLOORID;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].NO_OF_LINE += numberOfLine;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].TOTAL_LINE += totalLine;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].AVG_SMV = avgSMV;
      grouped[dateKey].COMPANY[companyKey].FLOORS[floorKey].RUNNING_HOURLYTARGET += runningTarget;


      grouped[dateKey].COMPANY[companyKey].COMPANY_TOTAL += target;
      grouped[dateKey].COMPANY[companyKey].HOURLY_PER_UNIT_TOTAL += hourlyPerUnit;
      grouped[dateKey].COMPANY[companyKey].HOURLY_PER_LINE_TOTAL += hourlyPerLine;
      grouped[dateKey].COMPANY[companyKey].OPERATOR_TOTAL += operator;
      grouped[dateKey].COMPANY[companyKey].AVAILMIN_TOTAL += availableMin;
      grouped[dateKey].COMPANY[companyKey].EARN_MIN_TOTAL += earnMin;
      grouped[dateKey].COMPANY[companyKey].ACTUALHOURS_TOTAL += actualHours;
      grouped[dateKey].COMPANY[companyKey].TARGETHOUR_TOTAL += targetHours;
      grouped[dateKey].COMPANY[companyKey].FACTORYID = item.FACTORYID;
      grouped[dateKey].COMPANY[companyKey].FACTORYID = item.FACTORYID;
      grouped[dateKey].COMPANY[companyKey].FACTORY_AVG_SMV = fAvgSMV;
      grouped[dateKey].COMPANY[companyKey].NO_OF_LINE += numberOfLine;
      grouped[dateKey].COMPANY[companyKey].TOTAL_LINE += totalLine;

      grouped[dateKey].TARGET += target;
      grouped[dateKey].RUNNING_HOURLYTARGET += runningTarget;
      grouped[dateKey].HOURLY_PER_UNIT += hourlyPerUnit;
      grouped[dateKey].HOURLY_PER_LINE += hourlyPerLine;
      grouped[dateKey].OPERATOR += operator;
      grouped[dateKey].AVAILMIN += availableMin;
      grouped[dateKey].EARN_MIN += earnMin;
      grouped[dateKey].ACTUALHOURS += actualHours;
      grouped[dateKey].TARGETHOUR += targetHours;
      grouped[dateKey].NO_OF_LINE += numberOfLine;
      grouped[dateKey].TOTAL_LINE += totalLine;


      if (!grandTotal[companyKey]) {
        grandTotal[companyKey] = {
          FLOORS: {},
          FACTORYID: 0,
          COMPANY_TOTAL: 0,
          HOURLY_PER_LINE_TOTAL: 0,
          HOURLY_PER_UNIT_TOTAL: 0,
          EARN_MIN_TOTAL: 0,
          AVAILMIN_TOTAL: 0,
          OPERATOR_TOTAL: 0,
          ACTUALHOURS_TOTAL: 0,
          TARGETHOUR_TOTAL: 0,
          RUNNING_HOURLYTARGET_TOTAL: 0,
          NO_OF_LINE: 0,
          TOTAL_LINE: 0,
          AVG_SMV: 0,
          FACTORY_AVG_SMV: 0,
        };
      }

      if (!grandTotal[companyKey].FLOORS[floorKey]) {

        grandTotal[companyKey].FLOORS[floorKey] = {
          TARGET: 0,
          HOURLY_PER_UNIT: 0,
          HOURLY_PER_LINE: 0,
          AVAILMIN: 0,
          EARN_MIN: 0,
          OPERATOR: 0,
          ACTUALHOURS: 0,
          TARGETHOUR: 0,
          RUNNING_HOURLYTARGET: 0,
          FLOOR_ID: 0,
          NO_OF_LINE: 0,
          TOTAL_LINE: 0,
          AVG_SMV: 0,
        };
      }

      grandTotal[companyKey].FLOORS[floorKey].TARGET += target;
      grandTotal[companyKey].COMPANY_TOTAL += target;

      companyTotals[companyKey] = (companyTotals[companyKey] || 0) + target;
      finalTotal.TARGET += target;

      uniqueKeys.add(dateKey);
    });

    return { grouped, grandTotal, finalTotal, companyTotals };
  }

  interface IFloorData {
    TARGET: number;
    HOURLY_PER_UNIT: number;
    HOURLY_PER_LINE: number;
    OPERATOR: number;
    ACTUALHOURS: number;
    TARGETHOUR: number;
    RUNNING_HOURLYTARGET: number;
    AVAILMIN: number;
    EARN_MIN: number;
    FLOOR_ID: number;
    NO_OF_LINE: number;
    TOTAL_LINE: number;
    AVG_SMV: number;
  }

  interface ICompanyData {
    FLOORS: Record<string, IFloorData>;
    FACTORYID: number;
    COMPANY_TOTAL: number;
    HOURLY_PER_UNIT_TOTAL: number;
    HOURLY_PER_LINE_TOTAL: number;
    OPERATOR_TOTAL: number;
    ACTUALHOURS_TOTAL: number;
    TARGETHOUR_TOTAL: number;
    RUNNING_HOURLYTARGET_TOTAL: number;
    AVAILMIN_TOTAL: number;
    EARN_MIN_TOTAL: number;
    NO_OF_LINE: number;
    TOTAL_LINE: number;
    AVG_SMV: number;
    FACTORY_AVG_SMV: number;
  }

  interface IGroupedData {
    [date: string]: {
      TARGET_DATE: string;
      TARGET: number;
      HOURLY_PER_UNIT: number;
      HOURLY_PER_LINE: number;
      OPERATOR: number;
      ACTUALHOURS: number;
      TARGETHOUR: number;
      RUNNING_HOURLYTARGET: number;
      AVAILMIN: number;
      EARN_MIN: number;
      NO_OF_LINE: number;
      TOTAL_LINE: number;
      AVG_SMV: number;
      COMPANY: Record<string, ICompanyData>;
    };
  }

  interface IGrandTotal {
    [companyName: string]: ICompanyData;
  }

  interface IFinalTotal {
    TARGET: number;
  }

  const { grouped, grandTotal, finalTotal, companyTotals } = data
    ? groupBy(data)
    : {
      grouped: {},
      grandTotal: {},
      finalTotal: { TARGET: 0 },
      companyTotals: {},
    };

  console.log(finalTotal, companyTotals)

  const uniqueKeysArray = Array.from(uniqueKeys);

  const companyFloorData: {
    company: string;
    floor: string | null;
  }[] = [];

  Object.keys(grandTotal).forEach((company) => {
    Object.keys(grandTotal[company].FLOORS).forEach((floor) => {
      companyFloorData.push({ company, floor });
    });
    companyFloorData.push({ company, floor: null });
  });

  interface HourlyProductionData {
    byFloor: Record<number, Record<number, number>>;
    byFactory: Record<number, Record<number, number>>;
    byHour: Record<number, number>;
    byFloorTotal: Record<number, number>;
    byFactoryTotal: Record<number, number>;
    grandTotal: number;
  }

  function organizeHourlyProductionData(
    data: SewingHourlyProductionStatusReportType[]
  ): HourlyProductionData {
    const result: HourlyProductionData = {
      byFloor: {},
      byFactory: {},
      byHour: {},
      byFloorTotal: {},
      byFactoryTotal: {},
      grandTotal: 0
    };

    data.forEach(item => {
      const hour = item.HOUR;
      const floorId = item.FLOORID;
      const factoryId = item.FACTORYID;
      const output = item.SEWINGOUTPUT;

      if (!result.byFloor[hour]) result.byFloor[hour] = {};
      if (!result.byFactory[hour]) result.byFactory[hour] = {};
      if (!result.byHour[hour]) result.byHour[hour] = 0;
      if (!result.byFloorTotal[floorId]) result.byFloorTotal[floorId] = 0;
      if (!result.byFactoryTotal[factoryId]) result.byFactoryTotal[factoryId] = 0;

      result.byFloor[hour][floorId] = (result.byFloor[hour][floorId] || 0) + output;

      result.byFactory[hour][factoryId] = (result.byFactory[hour][factoryId] || 0) + output;

      result.byHour[hour] += output;

      result.byFloorTotal[floorId] += output;

      result.byFactoryTotal[factoryId] += output;

      result.grandTotal += output;

    });

    return result;
  }


  const organizedData = organizeHourlyProductionData(sewingHourlyProductionData);


  const getOrdinal = <T extends number | string>(value: T): string => {
    const num = Number(value);
    if (isNaN(num)) return String(value);

    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];

    return `${num}${suffix}`;
  };

  let totalLine = 0;
  let grandTotalLine = 0;
  let totalFloor = 0;
  let grandTotalHourly = 0;
  let grandTotalHourlyLine = 0;
  let grandTotalSMV = 0;
  let grandTotalProduced = 0;
  let grandTotalTarget = 0;


  let grandTotalPlanHour = 0;
  let grandTotalProductionHourly = 0;
  let grandTotalAchvHourly = 0;

  const getFactoryColor = (factoryName: string): string => {
    let hash = 0;
    for (let i = 0; i < factoryName.length; i++) {
      hash = factoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 80%, 90%)`;
  };

  const firstColBg = "#A7F3D0";

  let factoryCount = 0;

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-950 ms-auto me-auto">
        <thead>
          <tr style={{ backgroundColor: "#A7F3D0" }}>
            <th

              rowSpan={2}
              className="border border-gray-950 p-1 text-center font-bold"
            >
              {
                moment(data[0]?.TARGETDATE).format("DD-MMM-YY")
              }
            </th>

            {Object.keys(grandTotal).map((company) => {

              const effectiveDateKey = Object.keys(grouped)[0] || '';

              const companyData = grouped[effectiveDateKey]?.COMPANY?.[company];

              const lineCount = companyData?.NO_OF_LINE || grandTotal[company]?.NO_OF_LINE || 0;
              const totalLineCount = companyData?.TOTAL_LINE || grandTotal[company]?.TOTAL_LINE || 0;

              totalLine += lineCount;
              grandTotalLine += totalLineCount;

              return (
                <th
                  key={`company-${company}`}
                  colSpan={Object.keys(grandTotal[company].FLOORS).length + 1}
                  className="border border-gray-950 text-center font-bold"
                  style={{ backgroundColor: getFactoryColor(company) }}
                >
                  {company}({totalLineCount}) ({lineCount})
                </th>
              );
            })}

            {secondHeader?.map((item, index) => (
              <th
                key={`second-${index}`}
                rowSpan={2}
                className="border border-gray-950 p-1 text-center font-bold"
              >
                {item}({grandTotalLine}) ({totalLine})
              </th>
            ))}
          </tr>

          <tr>
            {Object.keys(grandTotal).map((company) => (
              <>
                {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                  <th
                    key={`${company}-${floor}`}
                    className="border border-gray-950 p-1 text-center font-bold"
                    style={{ backgroundColor: getFactoryColor(company) }}
                  >
                    {floor}
                  </th>
                ))}
                <th className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                  Total
                </th>
              </>
            ))}
          </tr>
        </thead>

        <tbody>
          {uniqueKeysArray.map((dateKey) => (
            <>
              <tr key={dateKey} >
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  TARGET
                </td>

                {Object.keys(grandTotal).map((company) => {

                  factoryCount += 1;

                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.TARGET) || "0"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.COMPANY_TOTAL) || ""}
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold" >
                  {Math.round(grouped[dateKey]?.TARGET) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY/UNIT
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.HOURLY_PER_UNIT) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.HOURLY_PER_UNIT_TOTAL) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">

                  {Math.round(grouped[dateKey]?.HOURLY_PER_UNIT) || "0.00"}
                </td>
              </tr>



              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY/LINE
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];

                  const floorCount = Object.keys(grandTotal[company].FLOORS).length;

                  grandTotalProductionHourly += (companyData?.HOURLY_PER_LINE_TOTAL / floorCount) * companyData.NO_OF_LINE;

                  totalFloor += floorCount;

                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.HOURLY_PER_LINE) || "0.00"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.HOURLY_PER_LINE_TOTAL / floorCount) || "0.00"}
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {Math.round(grandTotalProductionHourly / totalLine) || "0.00"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  TGT EFF.
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.EARN_MIN * 100 / companyData?.FLOORS?.[floor]?.AVAILMIN) || "0.00"} %
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.EARN_MIN_TOTAL * 100 / companyData.AVAILMIN_TOTAL) || "0.00"} %
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {Math.round(grouped[dateKey]?.EARN_MIN * 100 / grouped[dateKey].AVAILMIN) || "0.00"} %
                </td>
              </tr>


              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  RUN MACHINE
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {Math.round(companyData?.FLOORS?.[floor]?.OPERATOR) || "0"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {Math.round(companyData?.OPERATOR_TOTAL) || "0"}
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {Math.round(grouped[dateKey]?.OPERATOR) || "0"}
                </td>
              </tr>

              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  SMV
                </td>

                {Object.keys(grandTotal).map((company) => {

                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  let companyTotalSMV = 0;
                  const floors = Object.keys(grandTotal[company]?.FLOORS || {});

                  grandTotalSMV += companyData.FACTORY_AVG_SMV;

                  const floorCells = floors.map((floor) => {
                    const smv = companyData?.FLOORS?.[floor]?.AVG_SMV ?? 0;
                    companyTotalSMV += smv;

                    return (
                      <td
                        key={`${dateKey}-${company}-${floor}`}
                        className="border border-gray-950 p-1 text-center"
                        style={{ backgroundColor: getFactoryColor(company) }}
                      >
                        {smv.toFixed(2)}
                      </td>
                    );
                  });

                  const avgCell = (
                    <td
                      key={`${dateKey}-${company}-avg`}
                      className="border border-gray-950 p-1 text-center font-bold"
                      style={{ backgroundColor: getFactoryColor(company) }}
                    >
                      {(companyData?.FACTORY_AVG_SMV).toFixed(2)}
                    </td>
                  );

                  return [...floorCells, avgCell];
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {(grandTotalSMV / factoryCount).toFixed(2)}
                </td>
              </tr>
              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  PLAN W/H
                </td>

                {Object.keys(grandTotal).map((company) => {

                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  const floorCount = Object.keys(grandTotal[company].FLOORS).length;

                  grandTotalPlanHour +=
                    (((companyData?.TARGETHOUR_TOTAL || 0) / (floorCount || 1)) *
                      (companyData?.NO_OF_LINE || 0));


                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => (
                        <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {(companyData?.FLOORS?.[floor]?.TARGETHOUR).toFixed(2) || "0"}
                        </td>
                      ))}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {(companyData?.TARGETHOUR_TOTAL / floorCount).toFixed(2) || "0"}
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {(grandTotalPlanHour / totalLine).toFixed(3) || "0"}
                </td>
              </tr>


              <tr key={dateKey}>
                <td
                  style={{ backgroundColor: firstColBg }}
                  className="border text-center border-gray-950 p-1 text-nowrap font-bold"
                >
                  ACTUAL W/H
                </td>

                {(() => {
                  let grandTotalWorkingHour = 0;

                  const companyCells = Object.keys(grandTotal).map((company) => {
                    const companyData = grouped[dateKey]?.COMPANY?.[company];
                    const floorCount = Object.keys(grandTotal[company].FLOORS).length || 1;

                    const companyWorkingHour =
                      ((companyData?.ACTUALHOURS_TOTAL || 0) / floorCount) *
                      (companyData?.NO_OF_LINE || 0);

                    grandTotalWorkingHour += companyWorkingHour;

                    return (
                      <React.Fragment key={company}>
                        {Object.keys(grandTotal[company].FLOORS).map((floor) => {
                          const actual = companyData?.FLOORS?.[floor]?.ACTUALHOURS ?? 0;
                          return (
                            <td
                              key={`${dateKey}-${company}-${floor}`}
                              className="border border-gray-950 p-1 text-center"
                              style={{ backgroundColor: getFactoryColor(company) }}
                            >
                              {actual.toFixed(2)}
                            </td>
                          );
                        })}
                        <td
                          className="border border-gray-950 p-1 text-center font-bold"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {((companyData?.ACTUALHOURS_TOTAL || 0) / floorCount).toFixed(2)}
                        </td>
                      </React.Fragment>
                    );
                  });

                  return (
                    <>
                      {companyCells}
                      <td
                        style={{ backgroundColor: firstColBg }}
                        className="border border-gray-950 p-1 text-center font-bold"
                      >
                        {((grandTotalWorkingHour / (totalLine || 1)) || 0).toFixed(3)}
                      </td>
                    </>
                  );
                })()}
              </tr>



              {
                Array.from(uniqueHoursKeys).map(item => {
                  return <>
                    <tr key={dateKey}>

                      <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                        {getOrdinal(item)}
                      </td>

                      {Object.keys(grandTotal).map((company) => {
                        const companyData = grouped[dateKey]?.COMPANY?.[company];
                        return (
                          <>
                            {Object.keys(grandTotal[company].FLOORS).map((floor) => {
                              return <td
                                key={`${dateKey}-${company}-${floor}`}
                                className="border border-gray-950 p-1 text-center"
                                style={{}}
                              >
                                {

                                }
                                {organizedData.byFloor[Number(item)][companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0] || 0}
                              </td>
                            })}
                            <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                              {organizedData.byFactory[Number(item)][companyData?.FACTORYID ?? 0] || 0}
                            </td>
                          </>
                        );
                      })}

                      <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                        {organizedData.byHour[Number(item)] || 0}
                      </td>
                    </tr>
                  </>
                })
              }


              <tr key={dateKey}>

                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  PRODUCTION
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];
                  return (
                    <>
                      {Object.keys(grandTotal[company].FLOORS).map((floor) => {
                        return <td
                          key={`${dateKey}-${company}-${floor}`}
                          className="border border-gray-950 p-1 text-center"
                          style={{ backgroundColor: getFactoryColor(company) }}
                        >
                          {organizedData.byFloorTotal[companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0] || 0}
                        </td>
                      })}
                      <td className="border border-gray-950 p-1 text-center font-bold" style={{ backgroundColor: getFactoryColor(company) }}>
                        {organizedData.byFactoryTotal[companyData?.FACTORYID ?? 0] || 0}
                      </td>
                    </>
                  );
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {organizedData.grandTotal}
                </td>
              </tr>

              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY/UNIT
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];

                  // const floorCount = Object.keys(grandTotal[company].FLOORS).length;
                  const floorCount = Object.keys(grandTotal[company].FLOORS).length || 1;

                  let totalHourly = 0;

                  const cells = Object.keys(grandTotal[company].FLOORS).map((floor) => {
                    const floorData = companyData?.FLOORS?.[floor];
                    const floorId = floorData?.FLOOR_ID ?? 0;
                    const actualHours = floorData?.ACTUALHOURS ?? 0;
                    const noOfLine = floorData?.NO_OF_LINE ?? 0;
                    const total = organizedData.byFloorTotal[floorId] ?? 0;

                    const uniqueHours = new Set(
                      sewingHourlyProductionData
                        .filter(item => item.FLOORID === floorId)
                        .map(item => item.HOUR)
                    );

                    const uniqueHourCount = uniqueHours.size;

                    const hourly =
                      uniqueHourCount > 0 && noOfLine > 0
                        ? (total / actualHours)
                        : 0;

                    totalHourly += hourly;
                    // grandTotalHourly += hourly;

                    return (
                      <td
                        key={`${dateKey}-${company}-${floor}`}
                        className="border border-gray-950 p-1 text-center"
                        style={{ backgroundColor: getFactoryColor(company) }}
                      >
                        {isNaN(hourly) ? "0" : Math.round(hourly)}
                      </td>
                    );
                  });


                  grandTotalHourly += Math.round((organizedData.byFactoryTotal[companyData?.FACTORYID ?? 0] || 0) / Number((((companyData?.ACTUALHOURS_TOTAL || 0) / floorCount).toFixed(2))));


                  const companyTotalProduction = organizedData.byFactoryTotal[companyData?.FACTORYID ?? 0] || 0


                  cells.push(
                    <td
                      key={`${dateKey}-${company}-factory`}
                      className="border border-gray-950 p-1 text-center font-bold"
                      style={{ backgroundColor: getFactoryColor(company) }}
                    >

                      {isNaN(companyTotalProduction) ? "0" : Math.round(companyTotalProduction / ((companyData?.ACTUALHOURS_TOTAL || 0) / floorCount))}

                      {/* {
                        isNaN(totalHourly) ? "0" : Math.round((organizedData.byFactoryTotal[companyData?.FACTORYID ?? 0] || 0) / Number((((companyData?.ACTUALHOURS_TOTAL || 0) / floorCount).toFixed(2))))
                      } */}

                    </td>
                  );

                  return cells;
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {(() => {

                    return isNaN(grandTotalHourly) ? "0" : Math.round(grandTotalHourly);
                  })()}
                </td>
              </tr>

              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  HOURLY/LINE
                </td>

                {Object.keys(grandTotal).map((company) => {

                  const companyData = grouped[dateKey]?.COMPANY?.[company];

                  const floorCount = Object.keys(grandTotal[company].FLOORS).length;

                  let totalHourly = 0;


                  const cells = Object.keys(grandTotal[company].FLOORS).map((floor) => {

                    const floorData = companyData?.FLOORS?.[floor];
                    const floorId = floorData?.FLOOR_ID ?? 0;
                    const actualHours = floorData?.ACTUALHOURS ?? 0;
                    const noOfLine = floorData?.NO_OF_LINE ?? 0;
                    const total = organizedData.byFloorTotal[floorId] ?? 0;

                    const uniqueHours = new Set(
                      sewingHourlyProductionData
                        .filter(item => item.FLOORID === floorId)
                        .map(item => item.HOUR)
                    );

                    const uniqueHourCount = uniqueHours.size;

                    const hourly =
                      uniqueHourCount > 0 && noOfLine > 0
                        ? (total / noOfLine / actualHours)
                        : 0;

                    totalHourly += hourly;
                    grandTotalHourlyLine += hourly;




                    return (
                      <td
                        key={`${dateKey}-${company}-${floor}`}
                        className="border border-gray-950 p-1 text-center"
                        style={{ backgroundColor: getFactoryColor(company) }}
                      >
                        {isNaN(hourly) ? "0" : Math.round(hourly)}
                      </td>
                    );
                  });

                  const companyTotalProduction = organizedData.byFactoryTotal[companyData?.FACTORYID ?? 0] || 0

                  grandTotalAchvHourly += (totalHourly / floorCount) * companyData.NO_OF_LINE;

                  cells.push(
                    <td
                      key={`${dateKey}-${company}-factory`}
                      className="border border-gray-950 p-1 text-center font-bold"
                      style={{ backgroundColor: getFactoryColor(company) }}
                    >
                      {isNaN(companyTotalProduction) ? "0" : Math.round(companyTotalProduction / companyData.NO_OF_LINE / ((companyData?.ACTUALHOURS_TOTAL || 0) / floorCount))}
                    </td>
                  );

                  return cells;
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {(() => {

                    return isNaN(grandTotalHourlyLine) ? "0" : Math.round(grandTotalAchvHourly / totalLine);
                  })()}
                </td>
              </tr>

              <tr key={dateKey}>
                <td style={{ backgroundColor: firstColBg }} className="border text-center border-gray-950 p-1 text-nowrap font-bold">
                  ACHIEVE %
                </td>

                {Object.keys(grandTotal).map((company) => {
                  const companyData = grouped[dateKey]?.COMPANY?.[company];

                  let totalTarget = 0;

                  let totalAchv = 0;

                  const cells = Object.keys(grandTotal[company].FLOORS).map((floor) => {

                    const target = companyData?.FLOORS?.[floor]?.RUNNING_HOURLYTARGET; // Math.floor(companyData?.FLOORS?.[floor]?.RUNNING_HOURLYTARGET * (companyData?.FLOORS?.[floor]?.TARGET / companyData?.FLOORS?.[floor]?.TARGETHOUR))

                    const achv = organizedData.byFloorTotal[companyData?.FLOORS?.[floor]?.FLOOR_ID ?? 0] || 0;

                    totalAchv += achv;
                    totalTarget += target;

                    const achieve = achv * 100 / target;

                    return (
                      <td
                        key={`${dateKey}-${company}-${floor}`}
                        className="border border-gray-950 p-1 text-center"
                        style={{ backgroundColor: getFactoryColor(company) }}
                      >
                        {isNaN(achieve) ? "0.00" : Math.round(achieve)} %
                      </td>
                    );
                  });

                  const companyAchieve =
                    totalTarget > 0 ? (totalAchv / totalTarget) * 100 : 0;

                  grandTotalProduced += totalAchv;
                  grandTotalTarget += totalTarget;

                  cells.push(
                    <td
                      key={`${dateKey}-${company}-factory`}
                      className="border border-gray-950 p-1 text-center font-bold"
                      style={{ backgroundColor: getFactoryColor(company) }}
                    >
                      {isNaN(companyAchieve) ? "0" : Math.round(companyAchieve)} %
                    </td>
                  );

                  return cells;
                })}

                <td style={{ backgroundColor: firstColBg }} className="border border-gray-950 p-1 text-center font-bold">
                  {(() => {
                    const grandAchieve =
                      grandTotalTarget > 0
                        ? (grandTotalProduced / grandTotalTarget) * 100
                        : 0;
                    return isNaN(grandAchieve) ? "0" : Math.round(grandAchieve);
                  })()} %
                </td>

              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;