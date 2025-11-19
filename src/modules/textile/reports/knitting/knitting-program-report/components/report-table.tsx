/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { IKnittingProgramReport } from "../knitting-program-report-type";

function ReportTable({
  data
}: {
  data: IKnittingProgramReport[];
}) {

  function groupBy(data: IKnittingProgramReport[], part: string) {
    return data.reduce((result: any, item: any) => {

      if (item.FABRIC_PART === part) {

        const key = item.FINISH_DIA;

        if (!result[key]) {
          result[key] = {
            FINISH_DIA: item.FINISH_DIA,
            PICES: 0,
          };
        }
        result[key].PICES += item.PICES;
      }
      return result;
    }, {});
  }

  function groupByYarnColor(data: IKnittingProgramReport[], part: string) {
    return data.reduce((result: any, item: IKnittingProgramReport) => {

      if (item.FABRIC_PART === part) {

        const key = item.YARN_COLOR;

        if (!result[key]) {
          result[key] = {
            YARN_COLOR: item.YARN_COLOR,
            STRIPE_MEASUREMENT_CM: [],
          };
        }

        if (item.STRIPE_MEASUREMENT_CM && item.STRIPE_MEASUREMENT_CM !== "") {
          result[key].STRIPE_MEASUREMENT_CM.push(item.STRIPE_MEASUREMENT_CM);
        }

      }
      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      FINISH_DIA: string;
      PICES: number;
    };
  }

  interface GroupedYarnColorData {
    [key: string]: {
      YARN_COLOR: string;
      STRIPE_MEASUREMENT_CM: [];
    };
  }

  let buyer: string = "";
  let style: string = "";
  let PO: string = "";
  let yarn: string = "";
  let lot: string = "";
  let programYarnQty: number = 0;
  let uniqueFabricType: string[] = [];
  let color: string = "";
  let sl: string = "";
  let fabricParts: string[] = [];

  if (data) {

    const uniqueBuyers = Array.from(new Set(data.map(item => item.BUYER)));
    buyer = uniqueBuyers.join(", ");

    const uniqueStyle = Array.from(new Set(data.map(item => item.STYLENO)));
    style = uniqueStyle.join(", ");

    const uniquePO = Array.from(new Set(data.map(item => item.PONO)));
    PO = uniquePO.join(", ");

    const uniqueYarn = Array.from(new Set(data.map(item => item.YARN)));
    yarn = uniqueYarn.join(", ");

    const uniqueLot = Array.from(new Set(data.map(item => item.YARN_LOT_NUMBER)));
    lot = uniqueLot.join(", ");

    programYarnQty = data.reduce((acc, item) => acc += item.QUANTITY, 0)

    uniqueFabricType = Array.from(new Set(data.map(item => item.FABRIC)));

    const uniqueFabricColor = Array.from(new Set(data.map(item => item.COLORNAME)));
    color = uniqueFabricColor.join(", ");

    const uniqueSL = Array.from(new Set(data.map(item => item.STITCH_LENGTH)));
    sl = uniqueSL.join(", ");

    fabricParts = Array.from(new Set(data.map(item => item.FABRIC_PART)));
  }

  const groupedData: Record<string, GroupedData> = {};
  fabricParts.forEach(part => {
    groupedData[part] = groupBy(data, part);
  })

  const totalData: Record<string, number> = {};
  fabricParts.forEach(part => {
    totalData[part] = data.reduce((acc, item) => { if (item.FABRIC_PART == part) { return acc + item.PICES } else { return acc } }, 0)
  })

  const groupedByYarnColor: Record<string, GroupedYarnColorData> = {};
  fabricParts.forEach(part => {
    groupedByYarnColor[part] = groupByYarnColor(data, part);
  })

  return (
    <div className="text-sm mt-3">
      <div className="flex items-center font-semibold">
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div >
          <table className="border-collapse border border-gray-300  w-[100%] font-bold">
            <thead>
            </thead>
            <tbody>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Factory Name</td>
                <td className="border border-gray-300 p-1">{data[0]?.KNIT_HOUSE}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Address</td>
                <td className="border border-gray-300 p-1">{data[0]?.KNIT_HOUSE_ADDRESS}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Attn.</td>
                <td className="border border-gray-300 p-1"></td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Program Date</td>
                <td className="border border-gray-300 p-1">{moment(data[0]?.KNITTING_PROG_DATE).format("DD-MMM-YY")}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Program No</td>
                <td className="border border-gray-300 p-1">{data[0]?.KNITTING_PROGRAM_NO}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-1">
            {
              fabricParts.map(part => <table className="border-collapse border border-gray-300  w-[100%] mt-2">
                <thead>
                  <tr className="bg-white">
                    <th colSpan={2} className="border border-gray-300 p-1">{part}</th>
                  </tr>
                  <tr className="bg-white">
                    <th className="border border-gray-300 p-1">SIZE</th>
                    <th className="border border-gray-300 p-1">PCS QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedData[part]).map(([key, value]) => (
                    <tr key={key} className="text-start">
                      <td className="border border-gray-300 p-1">{value.FINISH_DIA}</td>
                      <td className="border border-gray-300 p-1">{value.PICES}</td>
                    </tr>
                  ))}
                  <tr className="text-start font-bold">
                    <td className="border border-gray-300 p-1">Total</td>
                    <td className="border border-gray-300 p-1">{totalData[part]}</td>
                  </tr>
                </tbody>
              </table>)
            }
          </div>
          <div>
            <p className="mt-3">Knitting Advice: {data[0]?.KNITTING_ADVICE}</p>
          </div>
        </div>
        <div>
          <table className="border-collapse border border-gray-300  w-[100%] font-bold">
            <thead>
            </thead>
            <tbody>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Buyer</td>
                <td className="border border-gray-300 p-1">{buyer}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Style</td>
                <td className="border border-gray-300 p-1">{style}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">PO</td>
                <td className="border border-gray-300 p-1">{PO}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Yan Count</td>
                <td className="border border-gray-300 p-1">{yarn}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Yarn Lot</td>
                <td className="border border-gray-300 p-1">{lot}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Program Yarn Qty(kg)</td>
                <td className="border border-gray-300 p-1">{programYarnQty.toFixed(2)}</td>
              </tr>
              {uniqueFabricType.length > 0 && (
                <tr className="text-start">
                  <td rowSpan={uniqueFabricType.length} className="border border-gray-300 p-1">Fabric Type</td>
                  <td className="border border-gray-300 p-1">{uniqueFabricType[0]}</td>
                </tr>
              )}
              {uniqueFabricType.slice(1).map((item, index) => (
                <tr key={index} className="text-start">
                  <td className="border border-gray-300 p-1">{item}</td>
                </tr>
              ))}
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">Color</td>
                <td className="border border-gray-300 p-1">{color}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">S/L={sl}</td>
                <td className="border border-gray-300 p-1">CPI={data[0]?.CPI}</td>
              </tr>
              <tr className={`text-start`}>
                <td className="border border-gray-300 p-1">PLY={data[0]?.PLY}</td>
                <td className="border border-gray-300 p-1">Needle Ratio={data[0]?.NEEDLE_RATIO}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-1">
            {
              fabricParts.map(part => <table className="border-collapse border border-gray-300  w-[100%] mt-2">
                <thead>
                  <tr className="bg-white">
                    <th colSpan={2} className="border border-gray-300 p-1">{part}</th>
                  </tr>
                  <tr className="bg-white">
                    <th className="border border-gray-300 p-1">Yarn Color</th>
                    <th className="border border-gray-300 p-1">Tipping M.</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedByYarnColor[part]).map(([key, value]) => (
                    <tr key={key} className="text-start">
                      <td className="border border-gray-300 p-1">{value.YARN_COLOR}</td>
                      <td className="border border-gray-300 p-1">{value.STRIPE_MEASUREMENT_CM.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportTable;
