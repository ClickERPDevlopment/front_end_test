import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";

interface IChemicalItem {
  companyName: string;
  companyAddress: string;
  materialName: string;
  requireQty: number;
  issueQty: number;
  uom: string;
}
interface IDyeingFinishingChemicalUsedReport {
  items: IChemicalItem[];
}
const DyeingFinishingChemicalUsedReport: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const materialIds = searchParams.get("materialIds");

  const [report, setReport] = useState<IDyeingFinishingChemicalUsedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    if (!fromDate || !toDate) {
      setError("Missing required query parameters");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<IChemicalItem[]>(
        "/DyeingReport/GetDyeingFinishingChemicalUsedReport",
        {
          params: {
            fromDate: formatDate(fromDate, "db_format"),
            toDate: formatDate(toDate, "db_format"),
            materialIds: materialIds,
          },
        }
      );
      setReport({ items: response.data });
    } catch (err: any) {
      console.error("API error:", err);
      setError("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [fromDate, toDate]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!report) return <p className="p-4">No data available</p>;

    // Calculate totals
  const totalRequireQty = report.items.reduce((sum, item) => sum + item.requireQty, 0);
  const totalIssueQty = report.items.reduce((sum, item) => sum + item.issueQty, 0);

return (
<div className="w-[90%] mx-auto p-4 default ">
    {
<table className="data-table report w-full">
            <thead>
            <tr className="bg-white text-black">
                <th className="border" colSpan={16}>
                <div className="flex flex-col items-center">
                    <span className="text-xl">{report.items[0]?.companyName}</span>
                    <span className="text-lg">{`Dyeing Finishing Chemical Used on ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`}</span>
                </div>
                </th>
            </tr>
            </thead>

            <thead className="bg-gray-100 sticky top-0 text-medium">
            <tr className="">
              <th className="border p-2">SL#</th>
              <th className="border p-2">Material Name</th>
              <th className="border p-2">Require Qty</th>
              <th className="border p-2">Issue Qty</th>
              <th className="border p-2">UOM</th>
            </tr>
          </thead>

        <tbody>
        {report?.items?.map((item, index) => (
          <tr key={index} className={`text-center text-medium`}>
            <td className="border px-2 py-1">{index + 1}</td>
            <td className="border px-2 py-1">{item.materialName}</td>
            <td className="border px-2 py-1">{item.requireQty}</td>
            <td className="border px-2 py-1">{item.issueQty}</td>
            <td className="border px-2 py-1">{item.uom}</td>
          </tr>
        ))}
        <tr key={`line-total-`} className={`bg-[#1f7bc99e] font-semibold text-center text-white text-medium hover:text-black`}>
            <td colSpan={2} className="text-left px-2 border">
                Total
            </td>
            <td className="border px-2 py-1">{totalRequireQty}</td>
            <td className="border px-2 py-1">{totalIssueQty}</td>
            <td className="border px-2 py-1"></td>
        </tr>
      </tbody>

</table>

    }
</div>
);

};

export default DyeingFinishingChemicalUsedReport;
