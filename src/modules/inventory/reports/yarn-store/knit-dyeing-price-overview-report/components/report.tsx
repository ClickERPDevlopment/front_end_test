/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportHeader from "./report-header";
import { IKnittingDyeingPriceOverviewReport } from "../knit-dyeing-price-overview-report-type";
import { ICompany } from "@/modules/garmentsProduction/reports/finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type";


function Report({
  company,
  data,
}: {
  company?: ICompany;
  data?: IKnittingDyeingPriceOverviewReport[];
}) {

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2" id="report-div">
        <ReportHeader company={company} data={data} />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr className="bg-emerald-200 text-center">
              <td className="p-1 border border-gray-600 text-center">Parts</td>
              <td className="p-1 border border-gray-600 text-center">Fabrication</td>
              <td className="p-1 border border-gray-600 text-center">Color</td>
              <td className="p-1 border border-gray-600 text-center">Yarn Count</td>
              <td className="p-1 border border-gray-600 text-center">GSM</td>
              <td className="p-1 border border-gray-600 text-center">Yarn issue qty</td>
              <td className="p-1 border border-gray-600 text-center">Gray Rcv  QTY</td>
              <td className="p-1 border border-gray-600 text-center">Knitting Rate tk</td>
              <td className="p-1 border border-gray-600 text-center">Fin. Fabric Rcv Qty (Grey)</td>
              <td className="p-1 border border-gray-600 text-center">Fin. Fabric Rcv Qty (Finish)</td>
              <td className="p-1 border border-gray-600 text-center">Color %</td>
              <td className="p-1 border border-gray-600 text-center">Color Wise Rate tk</td>
              <td className="p-1 border border-gray-600 text-center">Knitting Amount tk</td>
              <td className="p-1 border border-gray-600 text-center">Dyeing Amount tk</td>
            </tr>
          </thead>
          <tbody>

            {data?.map((item, index) => (
              <tr className="text-center" key={index}>
                <td className="p-1 border border-gray-600 text-center">{item?.FABRIC_PART}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.FABRIC}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.COLOR}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.YARN_COUNT}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.GSM}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.YARN_ISSUE_QTY}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.GREY_RCV_QTY}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.KNIT_RATE}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.GREY_QUANTITY}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.FINISH_QUANTITY}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.SHADE_PERCENT}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.DYEING_RATE}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.KNITTING_AMOUNT}</td>
                <td className="p-1 border border-gray-600 text-center">{item?.DYEING_AMOUNT}</td>
              </tr>
            ))}

            <tr className="font-bold">
              <td colSpan={12} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{(data?.reduce((p, c) => p + Number(c?.KNITTING_AMOUNT ?? 0), 0))?.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{data?.reduce((p, c) => p + Number(c.DYEING_AMOUNT ?? 0), 0)?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Report;
