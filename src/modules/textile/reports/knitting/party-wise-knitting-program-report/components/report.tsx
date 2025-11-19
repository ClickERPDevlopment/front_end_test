/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { IPartyWiseKnittingProgram } from "../party-wise-knitting-program-report-type";
import { CollarCuffQuantitySummaryReportType } from "../collar-cuff-quantity-summary-report-type";
import ReportSummary from "./report-summary";
import ColorSizeBreakdown from "./color-size-breakdown";
import { PartyWiseKnittingProgramStripeMeasurementType } from "../stripe-measurement-type";
import StripeMeasurementTable from "./stripe-measurement-table";
import useAppClient from "@/hooks/use-AppClient";

function Report({
  data,
  collarCuffQtySummary,
  stripeMeasurementData
}: {
  data: IPartyWiseKnittingProgram[];
  collarCuffQtySummary: CollarCuffQuantitySummaryReportType[],
  stripeMeasurementData: PartyWiseKnittingProgramStripeMeasurementType[]
}) {

  const uniqueKeys: Set<string> = new Set();
  let dtlsUniqueKeys: Set<string> = new Set();
  let summaryUniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IPartyWiseKnittingProgram[],
    keys: string[]
  ) {

    uniqueKeys.clear();

    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface IGroupedData {
    [key: string]: {
      items: IPartyWiseKnittingProgram[];
    };
  }

  let groupedData: IGroupedData = {};
  let summaryData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, [""]);
    dtlsUniqueKeys = new Set(uniqueKeys)


    summaryData = groupBy(data, ["BRAND_NAME", "YARN_LOT", "YARN",]);
    summaryUniqueKeys = new Set(uniqueKeys)

  }

  const dtlsUniqueKeysArray: string[] = Array.from(dtlsUniqueKeys);
  const summaryUniqueKeysArray: string[] = Array.from(summaryUniqueKeys);

  const client = useAppClient();
  const firstHeader = client.currentClient == client.FAME ? [
    "SL",
    "P. No.",
    "Buyer",
    "Style",
    "Fabrication",
    "Yarn Count & Composition",
    'Brand x Lot',
    "Location", //new column
    "McDia x GG",
    "Finish Dia X Type",
    "GSM",
    "Color",
    "Stitch L.",
    "Qty(Kg)",
    "TTL Qty(Kg)",
    "Remarks",
  ] : [
    "SL",
    "P. No.",
    "Buyer",
    "Style",
    "Fabrication",
    "Yarn Count & Composition",
    "Brand x Lot",
    "McDia x GG",
    "Finish Dia X Type",
    "GSM",
    "Color",
    "Stitch L.",
    "Qty(Kg)",
    "TTL Qty(Kg)",
    "Remarks",
  ];

  const summaryHeader = [
    "SL",
    "Yarn Count & Composition",
    client.currentClient == client.FAME ? 'Location' : "Brand",
    "Yarn Lot",
    "Quantity(kg)",
  ];


  const totalQtyKg = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_QTY),
    0
  );


  //"PLACKET"
  let fabricParts: string[] = [];

  let fabricPartWiseData: Record<string, IPartyWiseKnittingProgram[]> = {};

  if (data) {
    fabricParts = Array.from(new Set(data.filter(item => item.IS_CONSIDER_AS_RIB_FOR_REPORT === "1").map(item => item.FABRIC)));

    fabricPartWiseData = fabricParts.reduce((acc, part) => {
      acc[part] = data.filter(item => item.FABRIC === part);
      return acc;
    }, {} as Record<string, IPartyWiseKnittingProgram[]>);
  }

  console.log("Fabric Parts: ", fabricPartWiseData);

  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "14px" }}
      className="px-11 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3 gap-3">
          {/* {JSON.stringify(data)} */}
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top border border-gray-950 p-0.5">Factory Name.</td>
                  <td className="align-top border border-gray-950 p-0.5">: {data[0]?.KNIT_HOUSE}</td>
                </tr>
                <tr>
                  <td className="align-top border border-gray-950 p-0.5">Address</td>
                  <td className="align-top border border-gray-950 p-0.5">: {data[0]?.KNIT_HOUSE_ADDRESS}</td>
                </tr>
                <tr>
                  <td className="align-top border border-gray-950 p-0.5">Attention</td>
                  <td className="align-top border border-gray-950 p-0.5">: </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top border border-gray-950 p-0.5">Program Date</td>
                  <td className="align-top border border-gray-950 p-0.5">: {moment(data[0]?.KNITTING_PROG_DATE).format("DD-MMM-YY")}</td>
                  <td className="align-top border border-gray-950 p-0.5">Program Start Date</td>
                  <td className="align-top border border-gray-950 p-0.5 ">: {moment(data[0]?.START_DATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top border border-gray-950 p-0.5">Job Number</td>
                  <td className="align-top border border-gray-950 p-0.5 ">: {data[0]?.PONO}</td>
                  <td className="align-top border border-gray-950 p-0.5">Program End Date</td>
                  <td className="align-top border border-gray-950 p-0.5">: {moment(data[0]?.END_DATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top border border-gray-950 p-0.5">Order Number</td>
                  <td colSpan={3} className="align-top border border-gray-950 p-0.5 ">: {data[0]?.ORDER_NO}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="print:bg-transparent">
            <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th key={item} className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {dtlsUniqueKeysArray?.map((key, index) => (
              <ReportTable
                key={key}
                data={groupedData[key]?.items}
                firstHeader={firstHeader}
                index={index}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "11px" }} className="font-bold">
              <td colSpan={firstHeader.length - 3} className="border border-gray-950 p-0.5">Total</td>
              <td className="border border-gray-950 p-0.5">{totalQtyKg.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>
          </tbody>
        </table>
        {/* <p style={{ fontSize: "11px" }}><span className="font-bold">Taka:</span> {data[0]?.DTLS_TOTAL_KNIT_AMOUNT}</p> */}


        <div>
          <div className="flex flex-col">
            {
              fabricParts.map(part => {
                const partData = data.filter(item => item.FABRIC === part);
                return (
                  <div className="w-[60%]">
                    <ColorSizeBreakdown
                      key={part}
                      data={partData}
                      fabricPart={part}
                    /></div>
                );
              })
            }
          </div>
        </div>

        {
          stripeMeasurementData.length > 0 && <div className="mt-5">
            <div className="flex">
              <div className="w-[50%]">
                <StripeMeasurementTable data={stripeMeasurementData}></StripeMeasurementTable>
              </div>
            </div>
          </div>
        }

        <div className="mt-5">
          <div className="flex justify-between gap-3 items-start">
            <div>
              <p style={{ fontSize: "15px" }} className="font-bold text-center">Yarn Summary</p>
              <table className="border-collapse border border-gray-300  w-[100%]">
                <thead className="print:bg-transparent">
                  <tr style={{ fontSize: "15px" }} className="bg-indigo-200 text-center">
                    {summaryHeader?.map((item) =>
                      <th key={item} className="border border-gray-950 p-0.5">{item}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {summaryUniqueKeysArray?.map((key, index) => (
                    <ReportSummary
                      key={key}
                      data={summaryData[key]?.items}
                      index={index}
                    ></ReportSummary>
                  ))}

                  <tr style={{ fontSize: "14px" }} className="font-bold">
                    <td colSpan={4} className="border border-gray-950 p-0.5">Total</td>
                    <td className="border border-gray-950 p-0.5 text-center">{totalQtyKg.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

            </div>
            {collarCuffQtySummary.length > 0 && <div className="min-w-[30%]">
              <p style={{ fontSize: "15px" }} className="font-bold text-center">
                Collar Cuff Quantity Summary
              </p>
              <table className="border-collapse border border-gray-300  w-[100%]">
                <thead className="print:bg-transparent">
                  <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
                    <th className="border border-gray-950 p-0.5">Fabric</th>
                    <th className="border border-gray-950 p-0.5">PCs Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    collarCuffQtySummary.map(item =>
                      <tr key={item.FABRIC} className="border border-gray-950 p-0.5" style={{ fontSize: "11px" }}>
                        <td className="border border-gray-950 p-0.5">{item.FABRIC}</td>
                        <td className="border border-gray-950 p-0.5">{item.PCS_QTY}</td>
                      </tr>
                    )
                  }
                  <tr className="border border-gray-950 p-0.5 font-bold" style={{ fontSize: "11px" }}>
                    <td className="border border-gray-950 p-0.5">Total</td>
                    <td className="border border-gray-950 p-0.5">
                      {
                        collarCuffQtySummary.reduce((acc, item) => acc + item.PCS_QTY, 0)
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>}
          </div>
        </div>

        <div className="mt-3">
          <p style={{ fontSize: "16px" }} className="mt-2 font-bold">
            <span className="font-bold">Special Remarks: </span>
            {data[0]?.KNITTING_ADVICE}
          </p>

          <p style={{ fontSize: "11px" }}>
            <span className="font-bold">MUST IN ROLL MARK: </span>
            1) MC.NO, 2)Order No, 3) Booking No, 4) Prog SI No, 5) Buyer Name, 6) Color, 7) F/Dia, 8) F/GSM, 9) Y/Count, 10) Lot, 11) F.Type, 12) Brand, 13) Stitch Lengh, 14) Date & shift, 15) Operator Name.
          </p>

          <p style={{ fontSize: "11px" }} className="mt-2">
            <span className="font-bold">NOT ALLOWED: </span>
            Barre, # Sinker Mark/Needle Mark, #Hole/Loop/Press off, #Drop stitch/Pin Hole, #Oill Spot, #Foreign Fiber.
          </p>

          <p style={{ fontSize: "11px" }} className="mt-2">
            <span className="font-bold">N.B: </span>
            If any kind of problem is found in fabrics knitting then must inform to Knitting Department. Without any approval fabrics will not be knitted.
            Marking on each roll of fabrics must be indicated & clearly visible with permanent color. Loose yarn must return after knitting for order close.
          </p>
        </div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
