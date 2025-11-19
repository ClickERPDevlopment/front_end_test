/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPartyWiseKnittingProgram } from "../party-wise-knitting-program-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: IPartyWiseKnittingProgram[];
  firstHeader: string[] | null;
  index: number
}) {


  const collarCuffData = data?.filter((item) => item.FABRIC_PART === "COLLAR" || item.FABRIC_PART === "CUFF") || [];
  const othersData = data?.filter((item) => item.FABRIC_PART !== "COLLAR" && item.FABRIC_PART !== "CUFF") || [];

  const collarCuffKeys: Set<string> = new Set();
  const othersKeys: Set<string> = new Set();

  function groupBy(
    data: IPartyWiseKnittingProgram[],
    keys: string[],
    keyStore: Set<string>
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      keyStore.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);
      return result;
    }, {});
  }


  const collarCuffGrouped = groupBy(collarCuffData, ["KNITTING_PROGRAM_NO", "BUYER", "STYLENO", "YARN", "YARN_LOT", "BRAND_NAME", "FABRIC", "GSM", "COLORNAME", "STITCH_LENGTH", "REMARKS"], collarCuffKeys);

  const othersGrouped = groupBy(othersData, ["KNITTING_PROGRAM_NO", "BUYER", "STYLENO", "YARN", "YARN_LOT", "BRAND_NAME", "FABRIC", "MC_DIA", "GAUGE", "FINISH_DIA", "GSM", "COLORNAME", "STITCH_LENGTH", "REMARKS"], othersKeys);

  const collarCuffKeysArray = Array.from(collarCuffKeys);
  const othersKeysArray = Array.from(othersKeys);


  function getRowSpansByKey(
    items: IPartyWiseKnittingProgram[],
    key: keyof IPartyWiseKnittingProgram
  ): number[] {
    const rowSpans = new Array(items.length).fill(0);
    let i = 0;

    while (i < items.length) {
      let count = 1;
      const currentValue = items[i]?.[key];
      for (let j = i + 1; j < items.length; j++) {
        if (items[j]?.[key] === currentValue) {
          count++;
        } else {
          break;
        }
      }
      rowSpans[i] = count;
      for (let k = i + 1; k < i + count; k++) {
        rowSpans[k] = 0;
      }
      i += count;
    }

    return rowSpans;
  }


  const newCollarCuffData = collarCuffKeysArray.map(
    (key) => collarCuffGrouped[key]?.items[0]
  );

  const newOthersData = othersKeysArray.map(
    (key) => othersGrouped[key]?.items[0]
  );

  const collarCuffRowSpansByProgramNO = getRowSpansByKey(newCollarCuffData, "KNITTING_PROGRAM_NO");
  const collarCuffRowSpansByBuyer = getRowSpansByKey(newCollarCuffData, "BUYER");
  const collarCuffRowSpansByStyle = getRowSpansByKey(newCollarCuffData, "STYLENO");
  const collarCuffRowSpansByYarn = getRowSpansByKey(newCollarCuffData, "YARN");
  const collarCuffRowSpansByFabric = getRowSpansByKey(newCollarCuffData, "FABRIC");

  const othersRowPansByProgramNo = getRowSpansByKey(newOthersData, "KNITTING_PROGRAM_NO");
  const othersRowSpansByBuyer = getRowSpansByKey(newOthersData, "BUYER");
  const othersfRowSpansByStyle = getRowSpansByKey(newOthersData, "STYLENO");
  const othersRowSpansByYarn = getRowSpansByKey(newOthersData, "YARN");
  const othersRowSpansByFabric = getRowSpansByKey(newOthersData, "FABRIC");

  console.log('othersRowPansByProgramNo', othersRowPansByProgramNo);
  console.log('newOthersData', newOthersData);
  console.log('othersKeysArray', othersKeysArray);

  return (
    <>
      {collarCuffKeysArray?.map((key, index) => {

        const currentFabric = collarCuffGrouped[key].items[0]?.FABRIC;

        const fabricWiseTotalQtyKg = collarCuffData
          .filter(item => item.FABRIC === currentFabric)
          .reduce((acc, item) => acc + Number(item.DTLS_QTY), 0);

        return <ReportSubgroup
          key={key}
          data={collarCuffGrouped[key].items}
          firstHeader={firstHeader}
          index={index}
          rowSpansByProgramNO={collarCuffRowSpansByProgramNO}
          rowSpansByBuyer={collarCuffRowSpansByBuyer}
          rowSpansByStyle={collarCuffRowSpansByStyle}
          rowSpansByYarn={collarCuffRowSpansByYarn}
          rowSpansByFabric={collarCuffRowSpansByFabric}
          fabricWiseTotalQtyKg={fabricWiseTotalQtyKg}
        ></ReportSubgroup>;
      })}

      {othersKeysArray?.map((key, index) => {

        const currentFabric = othersGrouped[key].items[0]?.FABRIC;
        const fabricWiseTotalQtyKg = othersData
          .filter(item => item.FABRIC === currentFabric)
          .reduce((acc, item) => acc + Number(item.DTLS_QTY), 0);

        return <ReportSubgroup
          key={key}
          data={othersGrouped[key].items}
          firstHeader={firstHeader}
          index={index}
          rowSpansByProgramNO={othersRowPansByProgramNo}
          rowSpansByBuyer={othersRowSpansByBuyer}
          rowSpansByStyle={othersfRowSpansByStyle}
          rowSpansByYarn={othersRowSpansByYarn}
          rowSpansByFabric={othersRowSpansByFabric}
          fabricWiseTotalQtyKg={fabricWiseTotalQtyKg}
          collarCuffDataLength={collarCuffKeysArray.length}
        ></ReportSubgroup>
      })}
    </>
  );
}

export default ReportTable;
