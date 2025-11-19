/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PrintEmbellishmentQualityReportMasterType } from "../embellishment-quality-report-type";
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import moment from "moment";
import { ICompany } from "../../../finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type";

function ReportHeader({
  data,
  searchParamObj
}: {
  data: PrintEmbellishmentQualityReportMasterType[];
  searchParamObj: { fromDate: string, toDate: string }
}) {
  const [companyData, setCompanyData] = useState<ICompany>();
  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${api.ProductionUrl}/production/Company/3`);
        if (res.data) {
          setCompanyData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="w-full pb-3 mb-4">
      {/* Date & Logo */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>{moment().format("DD-MMM-YYYY")}</span>
        <span className="italic">"CLICK"</span>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-start">
        {/* Center Block (Company + Report Title + Date Range) */}
        <div className="flex-1 text-center">
          {companyData?.NAME && (
            <>
              <h1 className="font-extrabold text-2xl text-gray-900 tracking-wide">
                {companyData?.NAME}
              </h1>
              <p className="text-sm text-gray-700">{companyData?.ADDRESS}</p>
            </>
          )}

          {/* Report Title */}
          <h2 className="font-bold text-base uppercase tracking-wide mt-1">
            {data[0]?.EmbType} Quality Check Report
          </h2>

          {/* Date Range */}
          <p className="font-medium text-sm">
            {moment(searchParamObj.fromDate).format("DD-MMM-YY")} to{" "}
            {moment(searchParamObj.toDate).format("DD-MMM-YY")}
          </p>
        </div>

        {/* Document Info Right-Aligned */}
        <div className="ml-4">
          <table className="border-collapse">
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="border border-gray-950 p-0.5 text-center"
                >
                  <span className="text-sm font-semibold">
                    DOCUMENT NO: FO-MB-EQCE-QA-54
                  </span>
                </td>
              </tr>
              <tr className="font-bold text-center text-xs">
                <td className="border border-gray-950 p-0.5">Issue No.</td>
                <td className="border border-gray-950 p-0.5">Issue Date</td>
                <td className="border border-gray-950 p-0.5">Page No.</td>
              </tr>
              <tr className="font-bold text-center text-xs">
                <td className="border border-gray-950 p-0.5">1</td>
                <td className="border border-gray-950 p-0.5">11-02-25</td>
                <td className="border border-gray-950 p-0.5">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default ReportHeader;
