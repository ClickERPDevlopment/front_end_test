import { DailyKnittingUpdate } from "./dailyKnittingUpdateInterface";

function Get_KP_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.KP_QTY;
  });
  return Math.round(sum);
}
function Get_KP_PCS(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.KP_PCS;
  });
  return Math.round(sum);
}
function Get_YARN_ISSUE_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.YARN_ISSUE_QTY;
  });
  return Math.round(sum);
}
function Get_YARN_ISSUE_BALANCE_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.YARN_ISSUE_BALANCE_QTY;
  });
  return Math.round(sum);
}
function Get_TODAY_PRODUCTION_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.TODAY_PRODUCTION_QTY;
  });
  return Math.round(sum);
}

// function Get_TOTAL_PRODUCTION_QTY(productionData: DailyKnittingUpdate[]) {
//   let sum = 0;
//   productionData.forEach((d) => {
//     sum += d.TOTAL_PRODUCTION_QTY;
//   });
//   return Math.round(sum);
// }

function Get_GREY_DELIVERY_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.GREY_DELIVERY_QTY;
  });
  return Math.round(sum);
}

function Get_GREY_DELIVERY_PCS(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.GREY_DELIVERY_PCS;
  });
  return Math.round(sum);
}

function Get_LOSE_YARN_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.LOSE_YARN_QTY;
  });
  return Math.round(sum);
}

function Get_WASTAGE_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.WASTAGE_QTY;
  });
  return Math.round(sum);
}
function Get_BALANCE_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.BALANCE_QTY;
  });
  return Math.round(sum);
}
function Get_BALANCE_PCS(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.BALANCE_PCS;
  });
  return Math.round(sum);
}
function Get_GREY_RCV_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.GREY_RCV_QTY;
  });
  return Math.round(sum);
}
function Get_GREY_DYEING_ISSUE_QTY(productionData: DailyKnittingUpdate[]) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.GREY_DYEING_ISSUE_QTY;
  });
  return Math.round(sum);
}
function Get_GREY_DYEING_ISSUE_BALANCE_QTY(
  productionData: DailyKnittingUpdate[]
) {
  let sum = 0;
  productionData.forEach((d) => {
    sum += d.GREY_DYEING_ISSUE_BALANCE_QTY;
  });
  return Math.round(sum);
}

export default function DailyKnittingUpdateTotal({
  data,
}: {
  data: DailyKnittingUpdate[];
}) {
  return (
    <tr key={Math.random()} className="border border-black bg-red-200">
      <td colSpan={12} className="text-center font-bold">
        Grand Total
      </td>
      <td className="border border-black text-center font-bold">
        {Get_KP_QTY(data)}{" "}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_KP_PCS(data)}{" "}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_YARN_ISSUE_QTY(data)}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_YARN_ISSUE_BALANCE_QTY(data)}
      </td>
      <td className="border border-black text-center font-bold"></td>
      <td className="border border-black text-center font-bold">
        {Get_TODAY_PRODUCTION_QTY(data)}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_GREY_DELIVERY_QTY(data)}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_GREY_DELIVERY_PCS(data)}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_LOSE_YARN_QTY(data)}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_WASTAGE_QTY(data)}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_BALANCE_QTY(data)}{" "}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_BALANCE_PCS(data)}{" "}
      </td>
      <td className="border border-black text-center font-bold"></td>
      <td className="border border-black text-center font-bold"></td>
      <td className="border border-black text-center font-bold"></td>
      <td className="border border-black text-center font-bold">
        {Get_GREY_RCV_QTY(data)}{" "}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_GREY_DYEING_ISSUE_QTY(data)}{" "}
      </td>
      <td className="border border-black text-center font-bold">
        {Get_GREY_DYEING_ISSUE_BALANCE_QTY(data)}{" "}
      </td>
    </tr>
  );
}
