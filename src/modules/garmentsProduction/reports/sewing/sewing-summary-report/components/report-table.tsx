import moment from "moment";
import { SewingSummaryReportType } from "../sewing-summary-report-type";
import useAppClient from "@/hooks/use-AppClient";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  isMonthView,
  searchParam
}: {
  data: SewingSummaryReportType[];
  firstHeader: string[] | null;
  companyHeader: string[] | null;
  secondHeader: string[] | null;
  isMonthView: boolean,
  searchParam: { fromDate: string, toDate: string };
}) {


  function groupBy(data: SewingSummaryReportType[]) {
    const grouped: IGroupedData = {};
    const finalData: IFinalData = {
      UNIQUE_LINES: new Set<string>(),
      UNIQUE_SEWINGDATE: new Set<string>(),
      TARGET: 0,
      RUNNNING_TOTALTARGET: 0,
      SEWING_OUTPUT: 0,
      PERFORMANCE: 0,
      TGT_EARN_MIN: 0,
      EARN_MIN: 0,
      AVL_MIN: 0,
      ACHV_EFF: 0,
      TGT_EFF: 0,
      RUNNING_MC: 0,
      EARNED_CM: 0,
      EARNED_FOB: 0,
      SMV: 0,
      F_SMV: 0,
      WORKING_HOUR: 0,
      FIRST_HOUR_ACHV: 0,
      HP: 0,
      ROW_COUNT: 0,
      OP: 0,
      DEFECTQTY: 0,
      CHECKQTY: 0,
      SMV_QTY: 0,
      TARGETHOURS: 0,
      FIRST_HOUR_ACHV_PER: 0,
      FIRST_HOUR_TGT: 0,
      NO_OF_LINE: 0
    };

    data.forEach((item) => {
      const companyKey = item.COMPANY_PREFIX || "Unknown";
      const floorKey = item.FLOORNAME || "Unknown Floor";
      const lineKey = item.LINENAME || "Unknown Line";
      const sewingDateKey = item.SEWINGDATE || "Unknown Line";

      const target = Number(item.TOTALTARGET);
      const runningTarget = Number(item.RUNNNING_TOTALTARGET);
      const sewingOutput = Number(item.SEWINGOUTPUT);
      const performance = sewingOutput > 0 ? (target * 100) / sewingOutput : 0;

      const earnMin = Number(item.EARNINGMIN);
      const tgtEarnMin = Number(item.TARGET_EARN_MIN);
      const avlMin = Number(item.AVAILABLEMIN);
      const achvEff = avlMin > 0 ? (earnMin * 100) / avlMin : 0;
      const tgtEff = target > 0 ? (tgtEarnMin * 100) / avlMin : 0;

      const runningMC = Number(item.RUNNINGMC);
      const earnedCM = Number(item.TOTALCM);
      const earnedFOB = Number(item.TOTALFOB);
      const smv = Number(item.SMVSEWING);
      const fSmv = Number(item.F_SMVSEWING);
      const workingHour = Number(item.ACTUALHOURS);
      const targetHour = Number(item.TARGETHOURS);
      const firstHourAchv = Number(item.FIRST_HOUR_ACHIEVE);
      const defectQty = Number(item.DEFECTQTY);
      const checkQty = Number(item.CHECKQTY);
      const op = Number(item.OPERATOR);
      const hp = Number(item.HELPER);
      const smvQty = Number(item.SEWINGOUTPUT) * Number(item.SMVSEWING);


      const firstHourAchvPer = (firstHourAchv * 100) / (target / targetHour);

      const firstHourTarget = (target / targetHour);

      if (!grouped[companyKey]) {
        grouped[companyKey] = {};
      }

      const numOfLine = Number(item.NO_OF_LINE);

      const fManpower = Number(item.F_MANPOWER);
      const fHRPresent = Number(item.F_HR_PRESENT);
      const fLateOP = Number(item.F_LATE_OP);
      const fTraineeOP = Number(item.F_TRAINEE_OP);
      const fStyleChange = Number(item.F_STYLE_CHANGE);
      const cOtherMP = Number(item.C_OTHER_MANPOWER);
      const cOtherPresent = Number(item.C_OTHER_PRESENT);


      if (!grouped[companyKey][floorKey]) {
        grouped[companyKey][floorKey] = {
          UNIQUE_LINES: new Set<string>(),
          UNIQUE_SEWINGDATE: new Set<string>(),
          TARGET: 0,
          RUNNNING_TOTALTARGET: 0,
          SEWING_OUTPUT: 0,
          PERFORMANCE: 0,
          TGT_EARN_MIN: 0,
          EARN_MIN: 0,
          AVL_MIN: 0,
          ACHV_EFF: 0,
          TGT_EFF: 0,
          RUNNING_MC: 0,
          EARNED_CM: 0,
          EARNED_FOB: 0,
          SMV: 0,
          WORKING_HOUR: 0,
          FIRST_HOUR_ACHV: 0,
          DEFECTQTY: 0,
          CHECKQTY: 0,
          ROW_COUNT: 0,
          OP: 0,
          HP: 0,
          SMV_QTY: 0,
          TARGETHOURS: 0,
          FIRST_HOUR_ACHV_PER: 0,
          FIRST_HOUR_TGT: 0,
          F_SMV: 0,
          NO_OF_LINE: 0,

          F_MANPOWER: 0,
          F_HR_PRESENT: 0,
          F_LATE_OP: 0,
          F_TRAINEE_OP: 0,
          C_OTHER_MANPOWER: 0,
          C_OTHER_PRESENT: 0,
          F_STYLE_CHANGE: 0,
        };
      }

      const floorData = grouped[companyKey][floorKey];

      floorData.TARGET += target;
      floorData.RUNNNING_TOTALTARGET += runningTarget;
      floorData.SEWING_OUTPUT += sewingOutput;
      floorData.PERFORMANCE += performance;
      floorData.TGT_EARN_MIN += tgtEarnMin;
      floorData.EARN_MIN += earnMin;
      floorData.AVL_MIN += avlMin;
      floorData.ACHV_EFF += achvEff;
      floorData.TGT_EFF = tgtEff;
      floorData.RUNNING_MC += runningMC;
      floorData.EARNED_CM += earnedCM;
      floorData.EARNED_FOB += earnedFOB;
      floorData.SMV += smv;
      floorData.F_SMV += fSmv;
      floorData.WORKING_HOUR += workingHour;
      floorData.TARGETHOURS += targetHour;
      floorData.FIRST_HOUR_ACHV += firstHourAchv;
      floorData.DEFECTQTY += defectQty;
      floorData.CHECKQTY += checkQty;
      floorData.UNIQUE_LINES.add(lineKey);
      floorData.UNIQUE_SEWINGDATE.add(sewingDateKey);
      floorData.ROW_COUNT += 1;
      floorData.OP += op;
      floorData.HP += hp;
      floorData.SMV_QTY += smvQty;
      floorData.FIRST_HOUR_ACHV_PER += firstHourAchvPer;
      floorData.FIRST_HOUR_TGT += firstHourTarget;
      floorData.NO_OF_LINE += numOfLine;

      floorData.F_MANPOWER = fManpower;
      floorData.F_HR_PRESENT = fHRPresent;
      floorData.F_LATE_OP = fLateOP;
      floorData.F_TRAINEE_OP = fTraineeOP;
      floorData.F_STYLE_CHANGE = fStyleChange;

      floorData.C_OTHER_MANPOWER = cOtherMP;
      floorData.C_OTHER_PRESENT = cOtherPresent;


      finalData.TARGET += target;
      finalData.RUNNNING_TOTALTARGET += runningTarget;
      finalData.SEWING_OUTPUT += sewingOutput;
      finalData.PERFORMANCE += performance;
      finalData.TGT_EARN_MIN += tgtEarnMin;
      finalData.EARN_MIN += earnMin;
      finalData.AVL_MIN += avlMin;
      finalData.ACHV_EFF += achvEff;
      finalData.TGT_EFF += tgtEff;
      finalData.RUNNING_MC += runningMC;
      finalData.EARNED_CM += earnedCM;
      finalData.EARNED_FOB += earnedFOB;
      finalData.SMV += smv;
      finalData.F_SMV += fSmv;
      finalData.WORKING_HOUR += workingHour;
      finalData.TARGETHOURS += targetHour;
      finalData.FIRST_HOUR_ACHV += firstHourAchv;
      finalData.DEFECTQTY += defectQty;
      finalData.CHECKQTY += checkQty;
      finalData.ROW_COUNT += 1;
      finalData.OP += op;
      finalData.HP += hp;
      finalData.UNIQUE_LINES.add(lineKey);
      finalData.UNIQUE_SEWINGDATE.add(sewingDateKey);
      finalData.SMV_QTY += smvQty;
      finalData.FIRST_HOUR_ACHV_PER += firstHourAchvPer;
      finalData.FIRST_HOUR_TGT += firstHourTarget;
      finalData.NO_OF_LINE += numOfLine;

      finalData.C_OTHER_MANPOWER = cOtherMP;
      finalData.C_OTHER_PRESENT = cOtherPresent;


    });

    return { grouped, finalData };
  }

  interface IGroupedData {
    [company: string]: {
      [floor: string]: IFinalData;
    };
  }

  interface IFinalData {
    UNIQUE_LINES: Set<string>;
    UNIQUE_SEWINGDATE: Set<string>;
    TARGET: number;
    RUNNNING_TOTALTARGET: number;
    SEWING_OUTPUT: number;
    PERFORMANCE: number;
    TGT_EARN_MIN: number;
    EARN_MIN: number;
    AVL_MIN: number;
    ACHV_EFF: number;
    TGT_EFF: number;
    RUNNING_MC: number;
    EARNED_CM: number;
    EARNED_FOB: number;
    SMV: number;
    F_SMV: number;
    WORKING_HOUR: number;
    FIRST_HOUR_ACHV: number;
    ROW_COUNT: number;
    OP: number;
    HP: number;
    DEFECTQTY: number;
    CHECKQTY: number;
    SMV_QTY: number;
    TARGETHOURS: number;
    FIRST_HOUR_ACHV_PER: number;
    FIRST_HOUR_TGT: number;
    NO_OF_LINE: number;

    F_MANPOWER?: number;
    F_HR_PRESENT?: number;
    F_LATE_OP?: number;
    F_TRAINEE_OP?: number;
    C_OTHER_MANPOWER?: number;
    C_OTHER_PRESENT?: number;
    F_STYLE_CHANGE?: number;


  }

  const { grouped, finalData } = groupBy(data);

  interface CompanyFloorHeader {
    company: string;
    floor: string;
    colSpan: number;
  }

  const companyFloorHeader: CompanyFloorHeader[] = [];
  const companyColSpan: { [company: string]: number } = {};

  for (const company in grouped) {
    const floors = Object.keys(grouped[company]);
    companyColSpan[company] = floors.length;
    floors.forEach(floor => {
      companyFloorHeader.push({ company, floor, colSpan: 1 });
    });
  }


  const companyFloorsMap: { [company: string]: string[] } = {};

  companyFloorHeader.forEach(item => {
    if (!companyFloorsMap[item.company]) {
      companyFloorsMap[item.company] = [];
    }
    companyFloorsMap[item.company].push(item.floor);
  });

  const grandTotalBg = "#f4f4cb";
  const totalBg = "#b1e7ed";

  let grandTotalSmv = 0;
  let totalFloorCount = 0;

  let noOfGroupLine = 0;

  const client = useAppClient();


  let grandTotalMP = 0;
  let grandTotalStyleChangeQty = 0;
  let grandTotalHRPresent = 0;
  let grandTotalLateOP = 0;
  let grandTotalTraineeOP = 0;

  let grandTotalOtherOP = 0;
  let grandTotalOtherPresent = 0;


  return (
    <div className="text-sm mt-3 text-gray-950 font-semibold w-full">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-gray-950">
          {
            !isMonthView ? "Day (Sewing)" : "Month (Sewing)"
          }
        </p>
        <p className="text-sm font-bold text-gray-950">

          {
            isMonthView
              ? `Production Month: ${moment(searchParam.fromDate).format("MMM-YY")}`
              : `Production Date: ${moment(searchParam.fromDate).format("DD-MMM-YY")}`
          }

        </p>
      </div>
      <table className="border-collapse border border-gray-950 w-full">

        <thead style={{ backgroundColor: "#a7f3d0" }}>
          <tr>
            {firstHeader?.map(item => (
              <th rowSpan={2} className="border border-gray-950 p-0.5 text-center font-bold">{item}</th>
            ))}
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells =
                <th colSpan={floors.length + 1} key={company} className="border border-gray-950 p-0.5 text-center font-bold">
                  {
                    company
                  }
                </th>
              return cells;
            })}
            <th rowSpan={2} className="border border-gray-950 p-0.5 text-center font-bold">Grand Total</th>
          </tr>
          <tr>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                return (
                  <th key={floor} className="border border-gray-950 p-0.5 text-center font-bold">
                    {floor}
                  </th>
                );
              });

              cells.push(
                <th key={company} className="border border-gray-950 p-0.5 text-center font-bold">
                  Total
                </th>
              );
              return cells;
            })}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border  border-gray-950 p-0.5 text-nowrap text-start font-bold">Target Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];

                totalFloorCount++;

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {Math.round(floorData.TARGET)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].TARGET;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {Math.round(companyTotal)}
                </td>
              );

              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{Math.round(finalData.TARGET)}</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border  border-gray-950 p-0.5 text-nowrap text-start font-bold">Achievement Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {floorData.SEWING_OUTPUT}
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].SEWING_OUTPUT;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {companyTotal}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{finalData.SEWING_OUTPUT}</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Target Loss Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {Math.round(floorData.SEWING_OUTPUT - floorData.TARGET)}
                  </td>
                );
              });
              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT - grouped[company][floor].TARGET);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{Math.round(finalData.SEWING_OUTPUT - finalData.TARGET)}</td>
          </tr>

          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Performance %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              let uniqueLine = 0;
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.SEWING_OUTPUT * 100 / floorData.RUNNNING_TOTALTARGET).toFixed(2)} %
                  </td>
                );
              });

              const companyTotalAchv = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].SEWING_OUTPUT;
              }, 0);


              const companyTotalTarget = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].RUNNNING_TOTALTARGET;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotalAchv * 100 / companyTotalTarget).toFixed(2)} %
                </td>
              );

              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {
                (finalData.SEWING_OUTPUT * 100 / finalData.RUNNNING_TOTALTARGET).toFixed(2)
              } %</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Target Efficiency %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              let uniqueLine = 0;
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.TGT_EARN_MIN * 100 / floorData.AVL_MIN).toFixed(2)} %
                  </td>
                );
              });

              const companyTotalEarn = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].TGT_EARN_MIN;
              }, 0);


              const companyTotalAvl = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].AVL_MIN;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotalEarn * 100 / companyTotalAvl).toFixed(2)} %
                </td>
              );

              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{(finalData.TGT_EARN_MIN * 100 / finalData.AVL_MIN).toFixed(2)} %</td>
          </tr>

          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Achieved Efficiency %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              let uniqueLine = 0;
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                uniqueLine++;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.EARN_MIN * 100 / floorData.AVL_MIN).toFixed(2)} %
                  </td>
                );
              });

              const companyTotalEarn = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].EARN_MIN;
              }, 0);

              const companyTotalAchv = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].AVL_MIN;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotalEarn * 100 / companyTotalAchv).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{(finalData.EARN_MIN * 100 / finalData.AVL_MIN).toFixed(2)} %</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Output Line</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let noOfCLine = 0;
              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];

                noOfCLine += (floorData.NO_OF_LINE / floorData.ROW_COUNT);
                noOfGroupLine += (floorData.NO_OF_LINE / floorData.ROW_COUNT);

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.NO_OF_LINE / floorData.ROW_COUNT).toFixed(2)}
                  </td>
                );
              });

              const companyTotal = noOfCLine;

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotal).toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {(noOfGroupLine.toFixed(2))}
            </td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Running MC</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {Math.round(floorData.RUNNING_MC / floorData.UNIQUE_SEWINGDATE.size)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].RUNNING_MC / grouped[company][floor].UNIQUE_SEWINGDATE.size;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{Math.round(finalData.RUNNING_MC / finalData.UNIQUE_SEWINGDATE.size)}</td>
          </tr>



          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Earned CM ($)</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {client.currentClient == client.FAME && "$"}{Math.round(floorData.EARNED_CM)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_CM);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {client.currentClient == client.FAME && "$"}{Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{client.currentClient == client.FAME && "$"}{Math.round(finalData.EARNED_CM)}</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Earned FOB ($)</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {client.currentClient == client.FAME && "$"}{Math.round(floorData.EARNED_FOB)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_FOB);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {client.currentClient == client.FAME && "$"}{Math.round(companyTotal)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{client.currentClient == client.FAME && "$"}{Math.round(finalData.EARNED_FOB)}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">FOB Per Pcs ($)</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {
              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {client.currentClient == client.FAME && "$"}{(floorData.EARNED_FOB / floorData.SEWING_OUTPUT).toFixed(2)}
                  </td>
                );
              });
              const companyTotalFOB = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].EARNED_FOB);
              }, 0);

              const companyTotalAchv = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {client.currentClient == client.FAME && "$"}{(companyTotalFOB / companyTotalAchv).toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{client.currentClient == client.FAME && "$"}{(finalData.EARNED_FOB / finalData.SEWING_OUTPUT).toFixed(2)}</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">SMV</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;

              const cells = floors.map(floor => {
                const floorData = grouped[company][floor];
                floorCount += 1;


                grandTotalSmv += (floorData.SMV / floorData.ROW_COUNT);

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.SMV / floorData.ROW_COUNT).toFixed(2)}
                  </td>
                );
              });

              const companyTotalSmvQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_SMV / grouped[company][floor].ROW_COUNT);
              }, 0);



              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotalSmvQty / floorCount).toFixed(2)}
                </td>
              );




              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {(grandTotalSmv / totalFloorCount).toFixed(3)}
            </td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Target Hourly Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;
              let lineCount = 0;

              const cells = floors.map(floor => {

                floorCount++;
                const floorData = grouped[company][floor];

                lineCount += (floorData.NO_OF_LINE / floorData.ROW_COUNT);

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {Math.round(floorData.TARGET / (floorData.NO_OF_LINE) / (floorData.TARGETHOURS / floorData.ROW_COUNT))}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TARGET / grouped[company][floor].UNIQUE_SEWINGDATE.size);
              }, 0);

              const companyTotalHour = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {Math.round(companyTotal / lineCount / (companyTotalHour / floorCount))}
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {
                Math.round(finalData.TARGET / finalData.UNIQUE_SEWINGDATE.size / noOfGroupLine / (finalData.TARGETHOURS / finalData.ROW_COUNT))
              }
            </td>

          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Achieved Hourly Pcs</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;
              let lineCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;

                const floorData = grouped[company][floor];

                lineCount += (floorData.NO_OF_LINE / floorData.ROW_COUNT);

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {Math.round(floorData.SEWING_OUTPUT / floorData.NO_OF_LINE / (floorData.WORKING_HOUR / floorData.ROW_COUNT))}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT / grouped[company][floor].UNIQUE_SEWINGDATE.size);
              }, 0);

              const companyTotalHour = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT);
              }, 0);


              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {Math.round(companyTotal / lineCount / (companyTotalHour / floorCount))}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {Math.round(finalData.SEWING_OUTPUT / finalData.UNIQUE_SEWINGDATE.size / noOfGroupLine / (finalData.WORKING_HOUR / finalData.ROW_COUNT))}
            </td>
          </tr>

          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Hourly Pcs Loss</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;
              let lineCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;


                const floorData = grouped[company][floor];

                lineCount += (floorData.NO_OF_LINE / floorData.ROW_COUNT);

                const tgtHourly = floorData.TARGET / floorData.NO_OF_LINE / (floorData.TARGETHOURS / floorData.ROW_COUNT);

                const achvHourly = floorData.SEWING_OUTPUT / floorData.NO_OF_LINE / (floorData.WORKING_HOUR / floorData.ROW_COUNT);

                return (

                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {Math.round(achvHourly - tgtHourly)}
                  </td>
                );
              });

              const companyTotalOutput = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].SEWING_OUTPUT / grouped[company][floor].UNIQUE_SEWINGDATE.size);
              }, 0);

              const companyTotalHour = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT;
              }, 0);


              let achv = Math.round(companyTotalOutput / lineCount / (companyTotalHour / floorCount))



              const companyTotalTgt = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].TARGET / grouped[company][floor].UNIQUE_SEWINGDATE.size);
              }, 0);


              let tgt = Math.round(companyTotalTgt / lineCount / (companyTotalHour / floorCount))


              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {achv - tgt}
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {
                Math.round(finalData.SEWING_OUTPUT / finalData.UNIQUE_SEWINGDATE.size / noOfGroupLine / (finalData.WORKING_HOUR / finalData.ROW_COUNT)) - Math.round(finalData.TARGET / finalData.UNIQUE_SEWINGDATE.size / noOfGroupLine / (finalData.TARGETHOURS / finalData.ROW_COUNT))
              }
            </td>
          </tr>

          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Working Hour</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0;

              const cells = floors.map(floor => {

                floorCount += 1;

                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.WORKING_HOUR / floorData.ROW_COUNT).toFixed(2)}
                  </td>
                );
              });

              const companyTotal = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].WORKING_HOUR / grouped[company][floor].ROW_COUNT;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotal / floorCount).toFixed(2)}
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {(finalData.WORKING_HOUR / finalData.ROW_COUNT).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">1st Hour Achieve%</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {


              let floorCount = 0;
              //let companyTotalAchv = 0;

              let cmpFirstHourAchvPer = 0;

              const cells = floors.map(floor => {

                floorCount += 1;
                const floorData = grouped[company][floor];

                //companyTotalAchv += floorData.FIRST_HOUR_ACHV_PER / floorData.ROW_COUNT;

                cmpFirstHourAchvPer += floorData.FIRST_HOUR_ACHV * 100 / floorData.FIRST_HOUR_TGT;

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.FIRST_HOUR_ACHV * 100 / floorData.FIRST_HOUR_TGT).toFixed(2)} %
                  </td>
                );
              });

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(cmpFirstHourAchvPer / floorCount).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {(finalData.FIRST_HOUR_ACHV * 100 / finalData.FIRST_HOUR_TGT).toFixed(2)}
              %</td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Helper %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let lineCount = 0;

              const cells = floors.map(floor => {
                lineCount++;
                const floorData = grouped[company][floor];
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {(floorData.HP * 100 / floorData.OP).toFixed(2)} %
                  </td>
                );
              });

              const companyTotalHP = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].HP;
              }, 0);

              const companyTotalOP = floors.reduce((sum, floor) => {
                return sum + grouped[company][floor].OP;
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {(companyTotalHP * 100 / companyTotalOP).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">{(finalData.HP * 100 / finalData.OP).toFixed(2)} %</td>
          </tr>


          {/* style change */}
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Style Change Qty</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {floorData.F_STYLE_CHANGE}
                  </td>
                );
              });

              const totalStyleChangeQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_STYLE_CHANGE || 0);
              }, 0);

              grandTotalStyleChangeQty += totalStyleChangeQty;

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {totalStyleChangeQty}
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {grandTotalStyleChangeQty}
            </td>
          </tr>


          {/* operator absent % */}
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Operator Absent %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {
                      floorData?.F_HR_PRESENT != null && floorData?.F_MANPOWER
                        ? (100 - (floorData.F_HR_PRESENT / floorData.F_MANPOWER) * 100).toFixed(2)
                        : ""
                    } %
                  </td>
                );
              });

              const totalMP = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_MANPOWER || 0);
              }, 0);

              const totalHRPresent = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_HR_PRESENT || 0);
              }, 0);

              grandTotalMP += totalMP;

              grandTotalHRPresent += totalHRPresent;

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {totalHRPresent != null && totalMP
                    ? `${(100 - (totalHRPresent / totalMP) * 100).toFixed(2)}`
                    : ""} %
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {!isNaN(grandTotalHRPresent) && !isNaN(grandTotalMP) && grandTotalMP > 0
                ? `${(100 - (grandTotalHRPresent * 100 / grandTotalMP)).toFixed(2)}`
                : ""} %
            </td>
          </tr>


          {/* operator late % */}
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Operator Late %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {
                      floorData?.F_LATE_OP != null && floorData?.F_HR_PRESENT
                        ? ((floorData.F_LATE_OP / floorData.F_HR_PRESENT) * 100).toFixed(2)
                        : ""
                    } %
                  </td>
                );
              });

              const totalPresentMP = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_HR_PRESENT || 0);
              }, 0);

              const totalLateOP = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_LATE_OP || 0);
              }, 0);

              grandTotalLateOP += totalLateOP;

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {totalPresentMP > 0 && !isNaN(totalLateOP)
                    ? `${((totalLateOP / totalPresentMP) * 100).toFixed(2)}`
                    : ""} %
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {grandTotalHRPresent > 0 && !isNaN(grandTotalLateOP)
                ? `${((grandTotalLateOP / grandTotalHRPresent) * 100).toFixed(2)}`
                : ""} %
            </td>
          </tr>


          {/* helper trainee % */}
          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Helper Trainee</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];

                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {
                      floorData?.F_TRAINEE_OP != null && floorData?.F_MANPOWER
                        ? floorData.F_TRAINEE_OP
                        : ""
                    }
                  </td>
                );
              });

              const totalMP = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_MANPOWER || 0);
              }, 0);

              const totalTraineeOP = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].F_TRAINEE_OP || 0);
              }, 0);

              grandTotalTraineeOP += totalTraineeOP;

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {totalMP > 0 && !isNaN(totalTraineeOP)
                    ? `${totalTraineeOP}`
                    : ""}
                </td>
              );
              return cells;
            })}

            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {grandTotalMP > 0 && !isNaN(grandTotalTraineeOP)
                ? `${grandTotalTraineeOP}`
                : ""}
            </td>
          </tr>


          <tr>
            <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">DHU %</td>
            {Object.entries(companyFloorsMap).map(([company, floors]) => {

              let floorCount = 0

              const cells = floors.map(floor => {

                const floorData = grouped[company][floor];
                floorCount += 1;
                return (
                  <td
                    key={`${company}-${floor}`}
                    className="border text-center border-gray-950 p-0.5 text-nowrap"
                  >
                    {floorData.CHECKQTY > 0 && (floorData.DEFECTQTY * 100 / floorData.CHECKQTY).toFixed(2)} %
                  </td>
                );
              });

              const companyTotalDefectQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].DEFECTQTY);
              }, 0);

              const companyTotalCheckQty = floors.reduce((sum, floor) => {
                return sum + (grouped[company][floor].CHECKQTY);
              }, 0);

              cells.push(
                <td
                  style={{ backgroundColor: totalBg }}
                  key={`${company}-total`}
                  className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                >
                  {companyTotalCheckQty > 0 && (companyTotalDefectQty * 100 / companyTotalCheckQty).toFixed(2)} %
                </td>
              );
              return cells;
            })}
            <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
              {finalData.CHECKQTY > 0 && (finalData.DEFECTQTY * 100 / finalData.CHECKQTY).toFixed(2)} %
            </td>
          </tr>

          {
            isMonthView &&
            <>
              <tr style={{ backgroundColor: "" }}>
                <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Working Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.5 text-nowrap"
                      >
                        {floorData.UNIQUE_SEWINGDATE.size}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].UNIQUE_SEWINGDATE.size);
                  }, 0);

                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                    >
                      {Math.round(companyTotal / floorCount)}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
                  {finalData.UNIQUE_SEWINGDATE.size}
                </td>
              </tr>
              <tr style={{ backgroundColor: "" }}>
                <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Avg. Target Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.5 text-nowrap"
                      >
                        {Math.round(floorData.TARGET / (floorData.UNIQUE_SEWINGDATE.size))}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].TARGET / (grouped[company][floor].UNIQUE_SEWINGDATE.size));
                  }, 0);

                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                    >
                      {Math.round(companyTotal)}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
                  {Math.round(finalData.TARGET / (finalData.UNIQUE_SEWINGDATE.size))}
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Avg. Achieved Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.5 text-nowrap"
                      >
                        {Math.round(floorData.SEWING_OUTPUT / (floorData.UNIQUE_SEWINGDATE.size))}
                      </td>
                    );
                  });

                  const companyTotal = floors.reduce((sum, floor) => {
                    return sum + (grouped[company][floor].SEWING_OUTPUT / (grouped[company][floor].UNIQUE_SEWINGDATE.size));
                  }, 0);

                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                    >
                      {Math.round(companyTotal)}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
                  {Math.round((finalData.SEWING_OUTPUT) / (finalData.UNIQUE_SEWINGDATE.size))}
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">Avg. Target Loss Per Day</td>
                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let floorCount = 0

                  const cells = floors.map(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;
                    const avgAchieve = floorData.SEWING_OUTPUT / (floorData.UNIQUE_SEWINGDATE.size);
                    const avgTarget = floorData.TARGET / (floorData.UNIQUE_SEWINGDATE.size);

                    return (
                      <td
                        key={`${company}-${floor}`}
                        className="border text-center border-gray-950 p-0.5 text-nowrap"
                      >
                        {Math.round(avgAchieve - avgTarget)}
                      </td>
                    );
                  });

                  const totalAchieve = floors.reduce((sum, floor) => {
                    const avgAchieve =
                      grouped[company][floor].SEWING_OUTPUT /
                      (grouped[company][floor].UNIQUE_SEWINGDATE.size);

                    return sum + avgAchieve;
                  }, 0);

                  const totalTarget = floors.reduce((sum, floor) => {
                    const avgTarget =
                      grouped[company][floor].TARGET /
                      (grouped[company][floor].UNIQUE_SEWINGDATE.size);

                    return sum + avgTarget;
                  }, 0);


                  cells.push(
                    <td
                      style={{ backgroundColor: totalBg }}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                    >
                      {Math.round((totalAchieve) - (totalTarget))}
                    </td>
                  );
                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
                  {Math.round((finalData.SEWING_OUTPUT / (finalData.UNIQUE_SEWINGDATE.size)) - (finalData.TARGET / (finalData.UNIQUE_SEWINGDATE.size)))}
                </td>
              </tr>

              <tr style={{ backgroundColor: "" }}>
                <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">MMR(Present)</td>

                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let totalMP = 0;
                  let totalRunningMC = 0;
                  let floorCount = 0;

                  let otherPresent = 0;

                  let totalHrPresent = 0;

                  floors.forEach(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;

                    totalMP += floorData.F_MANPOWER || 0;

                    totalRunningMC += floorData.RUNNING_MC;

                    otherPresent = floorData.C_OTHER_PRESENT || 0;

                    totalHrPresent += floorData.F_HR_PRESENT || 0;

                  });

                  grandTotalOtherPresent += otherPresent;

                  const cells =
                    <td
                      colSpan={floorCount + 1}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                    >
                      {/* {(totalHrPresent / (totalRunningMC)).toFixed(2)},{totalRunningMC}, {totalHrPresent} */}
                      {((totalMP + otherPresent) / otherPresent).toFixed(2)}
                    </td>

                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
                  {((grandTotalMP + grandTotalOtherPresent) / grandTotalOtherPresent).toFixed(2)}
                </td>
              </tr>
              {/* // */}

              <tr style={{ backgroundColor: "" }}>
                <td style={{ backgroundColor: grandTotalBg }} className="border border-gray-950 p-0.5 text-nowrap text-start font-bold">MMR(Active)</td>

                {Object.entries(companyFloorsMap).map(([company, floors]) => {

                  let totalMP = 0;
                  let totalRunningMC = 0;
                  let floorCount = 0;

                  let otherMP = 0;

                  floors.forEach(floor => {

                    const floorData = grouped[company][floor];
                    floorCount += 1;

                    totalMP += floorData.F_MANPOWER || 0;

                    totalRunningMC += floorData.RUNNING_MC;

                    otherMP = floorData.C_OTHER_MANPOWER || 0;

                  });

                  grandTotalOtherOP += otherMP;

                  const cells =
                    <td
                      colSpan={floorCount + 1}
                      key={`${company}-total`}
                      className="border text-center border-gray-950 p-0.5 text-nowrap font-bold"
                    >
                      {((totalMP + otherMP) / otherMP).toFixed(2)}
                    </td>
                    ;

                  return cells;
                })}
                <td style={{ backgroundColor: grandTotalBg }} className="border text-center border-gray-950 p-0.5 text-nowrap">
                  {((grandTotalMP + grandTotalOtherOP) / grandTotalOtherOP).toFixed(2)}
                </td>
              </tr>

            </>
          }
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div >
  );

}

export default ReportTable;
