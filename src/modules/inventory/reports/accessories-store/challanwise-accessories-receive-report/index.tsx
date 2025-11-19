import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";

interface IAccessoriesItem {
  companyName?: string | null;
  companyAddress?: string | null;
  buyerName?: string | null;
  poNo?: string | null;
  subPo?: string | null;
  styleNo?: string | null;
  challanNo?: string | null;
  mrrNumber?: string | null;
  challanDate?: string | null;
  receiveDate?: string | null;
  itemName?: string | null;
  uom?: string | null;
  gmtColor?: string | null;
  gmtSize?: string | null;
  mtlColor?: string | null;
  mtlSize?: string | null;
  receiveQty: number;
  description1?: string | null;
  description2?: string | null;
}

interface IChallanwiseAccessoriesReceiveReport {
  items: IAccessoriesItem[];
}

const ChallanwiseAccessoriesReceiveReport: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isDateChecked = searchParams.get("isDateChecked");
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const companyId = searchParams.get("companyId");
  const buyerId = searchParams.get("buyerId");
  const styleId = searchParams.get("styleId");
  const poId = searchParams.get("poId");
  const challan = searchParams.get("challan");
  const workOrder = searchParams.get("workOrder");

  const [report, setReport] = useState<IChallanwiseAccessoriesReceiveReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    if (!isDateChecked || !companyId) {
      setError("Missing required query parameters");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<IAccessoriesItem[]>(
        "/AccessoriesStoreReport/GetChallanwiseAccessoriesReceiveReport",
        {
          params: {
            isDateChecked,
            fromDate: fromDate ? formatDate(fromDate, "db_format") : null,
            toDate: toDate ? formatDate(toDate, "db_format") : null,
            companyId,
            buyerId,
            styleId,
            poId,
            challan,
            workOrder
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
  if (!report || report.items.length === 0) return <p className="p-4">No data available</p>;

  // Calculate total receive quantity
  const totalReceiveQty = report.items.reduce((sum, item) => sum + item.receiveQty, 0);

  // Group items by buyer for subtotal
  const buyerGroups = report.items.reduce((acc: Record<string, IAccessoriesItem[]>, item) => {
    const buyer = item.buyerName || "Unknown Buyer";
    if (!acc[buyer]) acc[buyer] = [];
    acc[buyer].push(item);
    return acc;
  }, {});

  return (
    <div className="w-[90%] mx-auto p-4 default">
      <table className="data-table report w-full">
        <thead>
          <tr className="bg-white text-black">
            <th className="border" colSpan={17}>
              <div className="flex flex-col items-center">
                <span className="text-xl">{report.items[0]?.companyName}</span>
                <span className="text-lg">{`Challanwise Accessories Receive Report`}</span>  
                {fromDate && toDate ? <span className="text-lg">{`Date : ${formatDate(fromDate || "", "dd-MMM-yyyy")} to ${formatDate(toDate || "", "dd-MMM-yyyy")}`}</span> : ""}                   
                </div>
            </th>
          </tr>
        </thead>

        <thead className="bg-gray-100 sticky top-0 text-medium">
          <tr>
            <th className="border p-2">Buyer</th>
            <th className="border p-2">PO</th>
            <th className="border p-2">Sub PO</th>
            <th className="border p-2">Style</th>
            <th className="border p-2">Challan</th>
            <th className="border p-2">MRR/Alloc/Return No</th>
            <th className="border p-2">Challan Date</th>
            <th className="border p-2">Receive Date</th>
            <th className="border p-2">Item</th>
            <th className="border p-2">G.Color</th>
            <th className="border p-2">G.Size</th>
            <th className="border p-2">M.Color</th>
            <th className="border p-2">M.Size</th>
            <th className="border p-2">RCV Qty</th>
            <th className="border p-2">UOM</th>
            <th className="border p-2">Description 1</th>
            <th className="border p-2">Description 2</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(buyerGroups).map(([buyer, items]) => {
            const buyerTotal = items.reduce((sum, item) => sum + item.receiveQty, 0);

            return (
              <React.Fragment key={buyer}>
                {items.map((item, index) => (
                  <tr key={index} className="text-center text-medium">
                    <td className="border px-2 py-1">{item.buyerName}</td>
                    <td className="border px-2 py-1">{item.poNo}</td>
                    <td className="border px-2 py-1">{item.subPo}</td>
                    <td className="border px-2 py-1">{item.styleNo}</td>
                    <td className="border px-2 py-1">{item.challanNo}</td>
                    <td className="border px-2 py-1">{item.mrrNumber}</td>
                    <td className="border px-2 py-1 w-28">{item.challanDate ? formatDate(item.challanDate, "dd-MMM-yyyy") : ""}</td>
                    <td className="border px-2 py-1 w-28">{item.receiveDate ? formatDate(item.receiveDate, "dd-MMM-yyyy") : ""}</td>
                    <td className="border px-2 py-1">{item.itemName}</td>
                    <td className="border px-2 py-1">{item.gmtColor}</td>
                    <td className="border px-2 py-1">{item.gmtSize}</td>
                    <td className="border px-2 py-1">{item.mtlColor}</td>
                    <td className="border px-2 py-1">{item.mtlSize}</td>
                    <td className="border px-2 py-1">{item.receiveQty}</td>
                    <td className="border px-2 py-1">{item.uom}</td>
                    <td className="border px-2 py-1">{item.description1}</td>
                    <td className="border px-2 py-1">{item.description2}</td>
                  </tr>
                ))}
                <tr className="bg-[#1f7bc99e] font-semibold text-center text-white text-medium hover:text-black">
                  <td colSpan={13} className="text-right px-2 border">
                    {buyer} Subtotal
                  </td>
                  <td className="border px-2 py-1">{buyerTotal}</td>
                  <td colSpan={3} className="border px-2 py-1"></td>
                </tr>
              </React.Fragment>
            );
          })}

          {/* Grand Total */}
          <tr className="bg-[#1f7bc99e] font-semibold text-center text-white text-medium hover:text-black">
            <td colSpan={13} className="text-right px-2 border">
              Total
            </td>
            <td className="border px-2 py-1">{totalReceiveQty}</td>
            <td colSpan={3} className="border px-2 py-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChallanwiseAccessoriesReceiveReport;
