/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { BudgetReportResponseType, BudgetReportType } from "../budget-report-type";
import useAppClient from "@/hooks/use-AppClient";
import { useEffect, useState } from "react";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Button } from "@/components/ui/button";


function Report({
  data,
}: {
  data: BudgetReportResponseType | undefined;
}) {

  const client = useAppClient();
  const uniqueKeys: Set<string> = new Set();
  const api = useApiUrl();


  function groupBy(
    data: BudgetReportType[],
    keys: string[]
  ) {
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

  interface GroupedByDate {
    [key: string]: {
      items: BudgetReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data?.Report, ["DS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "PARTICULARS",
    "MTL",
    "QTY",
    "UOM",
    "PRICE($)",
    "TOTAL($)",
  ];

  const totalBudgetValue = data?.Report?.reduce(
    (acc, item) => acc + Number(item.BUDGET_TOTAL_VALUE),
    0
  );

  const [styleImage, setStyleImage] = useState<string | null>(null);

  useEffect(() => {
    fetchImage(data && data?.Report[0]?.STYLE_ID || 0);
  }, [data?.Report[0]?.STYLE_ID]);

  const fetchImage = async (id: number) => {
    try {
      const response = await fetch(
        `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (styleImage) {
          URL.revokeObjectURL(styleImage);
        }
        setStyleImage(url);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };


  const report = data?.Report?.[0];
  const fob = data?.FOB;
  const requiredCM =
    client.currentClient === client.EURO
      ? `SMV x 0.07`
      : client.currentClient === client.FAME
        ? `SMV x 0.0653`
        : null;

  const exportToExcel = async () => {
    try {
      const response = await fetch(
        `${api.ProductionUrl}/production/MerchReport/BudgetExcelReport?id=${data?.Report[0]?.BUDGET_ID}`,
        {
          method: "GET",
          headers: {
            // add headers if required, e.g. Authorization
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Excel file");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `BudgetReport_${data?.Report[0]?.BUDGET_ID}.xlsx`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };


  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}
      className="px-12 text-gray-950 mt-10">
      <div className="p-2">

        <div className="print:hidden text-right mb-2">
          <Button onClick={exportToExcel} size={"sm"} value={"default"}>Export Excel</Button>
        </div>

        <ReportHeader
          data={data}
        />

        <div className="flex justify-between align-top gap-3 border border-gray-950 p-0.5 mt-10">
          <div className="w-[40%]">
            <table className="font-bold align-top w-full">
              <tbody>
                <tr>
                  <td className="p-0.5 text-nowrap">Budget No.</td>
                  <td className="p-0.5">: {report?.BUDGET_NO}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">Budget For</td>
                  <td className="p-0.5">: {report?.BUYER}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">Style</td>
                  <td className="p-0.5 text-nowrap">: {report?.STYLENO}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">Item</td>
                  <td className="p-0.5">: {report?.ITEM}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">PO</td>
                  <td className="p-0.5">: {report?.COMBINE_PONO}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">FOB($)</td>
                  <td className="p-0.5">: {fob}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">SALES CONTACT</td>
                  <td className="p-0.5">: {data?.Report[0]?.SCNO}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-[20%] flex items-start align-top justify-center">
            {styleImage && (
              <img
                src={styleImage}
                alt="Style Image"
                className="max-h-[160px] w-auto object-contain"
              />
            )}
          </div>

          <div className="w-[40%]">
            <table className="font-bold w-full">
              <tbody>
                <tr>
                  <td className="p-0.5">SMV</td>
                  <td className="p-0.5">: {data?.SMV}</td>
                </tr>
                {requiredCM && (
                  <tr>
                    <td className="p-0.5 text-nowrap">Required CM ({requiredCM})</td>
                    <td className="p-0.5">: {data?.RequiredCM}</td>
                  </tr>
                )}
                <tr>
                  <td className="p-0.5 text-nowrap">Qty(Pcs)</td>
                  <td className="p-0.5">: {report?.PO_QTY?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">Total FOB Value($)</td>
                  <td className="p-0.5">: {report?.TOTAL_FOB_VALUE?.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">Buying Commission($)</td>
                  <td className="p-0.5">
                    : {((report?.TOTAL_FOB_VALUE ?? 0) - (report?.BALANCE_VALUE ?? 0)).toFixed(2)} ({report?.BUYEING_COMMI}%)
                  </td>
                </tr>
                <tr>
                  <td className="p-0.5 text-nowrap">Balance($)</td>
                  <td className="p-0.5">: {report?.BALANCE_VALUE?.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <table className="border-collapse border border-gray-300  w-[100%] mt-2">
          <thead className="print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                totalQty={data?.Report[0]?.PO_QTY ?? 0}
                totalFob={report?.TOTAL_FOB_VALUE}
                poQty={report?.PO_QTY}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "12px" }} className="">
              <td colSpan={5} className="p-0.5 text-end  border-s border-gray-950">Total Expenditures($):</td>
              <td className=" p-0.5 text-center font-bold border-e border-gray-950"> {totalBudgetValue?.toFixed(2)}</td>
            </tr>
            <tr style={{ fontSize: "12px" }} className="">
              <td colSpan={5} className="p-0.5 text-end border-s border-gray-950">Budget Markup($): </td>
              <td className=" p-0.5 text-center border-e border-gray-950 font-bold">{((data?.Report[0]?.BALANCE_VALUE ?? 0) - (totalBudgetValue ?? 0)).toFixed((2))}</td>
            </tr>

            <tr style={{ fontSize: "12px" }} className="">
              <td colSpan={5} className="p-0.5 text-end border-s border-gray-950 border-b">Markup %: </td>
              <td className=" p-0.5 text-center border-e border-b border-gray-950 font-bold">{((((data?.Report[0]?.BALANCE_VALUE ?? 0) - (totalBudgetValue ?? 0)) / (data?.Report[0]?.TOTAL_FOB_VALUE ?? 0)) * 100).toFixed((2))}</td>
            </tr>

          </tbody>
        </table>
        {/* <div className="flex justify-between">
          <div></div>
          <table className="font-bold align-top">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">Total Expenditures($)</td>
                <td className="align-top">: {totalBudgetValue?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="align-top">Budget Markup($)</td>
                <td className="align-top">: {((data?.Report[0]?.BALANCE_VALUE ?? 0) - (totalBudgetValue ?? 0)).toFixed((2))}</td>
              </tr>
              <tr>
                <td className="align-top">Markup %</td>
                <td className="align-top">: {((((data?.Report[0]?.BALANCE_VALUE ?? 0) - (totalBudgetValue ?? 0)) / (data?.Report[0]?.TOTAL_FOB_VALUE ?? 0)) * 100).toFixed((2))}</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div>
          <ReportFooter data={data?.Report ?? []}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
