import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
// import '../../../../../src/styles/report-table.css'
import { IInventorySale, IInventorySaleDetails } from "../../pages/inventorySale/inventorySale.interface";
import { IInventorySaleReport, SalesRowDto } from "./IInventorySaleReport";
import { amountInWords } from "@/utils/amountToWords";

const InventorySaleBillReport: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<IInventorySaleReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentClient = import.meta.env.VITE_APP_CLIENT_NAME;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const fetchReport = async () => {
    if (!id) {
      setError("Missing required query parameters");
      return;
    }

    setLoading(true);
    setError(null);
    try {

      const response = await axiosInstance.get<IInventorySaleReport>("inventory-sale/inventory-sale-challan-report", {
        params: {
          id: id,
        },
      });
      setReport(response.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Inventory Sales Bill `;

    fetchReport();

    return () => {
      document.title = "";
    };

  }, [id,]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;


  let row_num = 0;

  const allRows = report ? report.rows : [];

  const totalRow = allRows.reduce((acc, item) => {

    acc.qty += item.qty;
    acc.amount += item.qty * item.unitPrice;

    return acc;

  }, {
    qty: 0,
    amount: 0
  })

  return (
    <div className="w-[70%] mx-auto p-4 default container">
      {
        report &&
        <table className="report-table w-full">
          <thead className="header">
            <tr className="">
              <th className="!border-transparent" colSpan={16}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{ currentClient === "EURO" ? "EUROTEX KNITWEAR LTD" : ""}</span>
                  <span className="">{report?.companyAddress}</span>
                  <span className="text-md">({report?.companyName})</span>
                  <span className="text-2xl">Material I.S Bill</span>
                </div>
              </th>
            </tr>
          </thead>

          {
            report.rows && report.rows.length > 0 &&
            <tbody>
              <tr className="">
                <td className="!border-transparent !border-b-black" colSpan={6}>
                  <div className="grid grid-cols-5">
                    <div className="col-span-3 flex flex-col gap-1">
                      <span>Party: {report.rows[0].customerName}</span>
                      <span>Address: {report.rows[0].customerAddress}</span>
                    </div>
                    <div className="col-span-2 flex flex-col gap-1">
                      <span>Challan: {report.rows[0].saleNo}</span>
                      <span>Bill No.: {report.rows[0].saleNo}</span>
                      <span>Date: {report.rows[0].saleDate}</span>
                    </div>
                  </div>
                </td>
              </tr>

            </tbody>
          }

          <tbody className="">
            <tr className="border">
              <td className="border-black text-center">SL#</td>
              <td className="border-black text-center">Description Of Goods</td>
              <td className="border-black text-center">Quantity</td>
              <td className="border-black text-center">UOM</td>
              <td className="border-black text-center">Rate({report.rows[0].currencyCode})</td>
              <td className="border-black text-center">Amount</td>
            </tr>

          </tbody>
          {/* Table Body */}
          <tbody>
            {report && report.rows.map((row: SalesRowDto, index: number) => {


              return (
                <React.Fragment>

                  <tr key={index} className={``}>

                    <td className="text-center">{index + 1}</td>
                    <td className="">{row.itemName}</td>
                    <td className="text-right">{row.qty}</td>
                    <td className="text-center">{row.uomName}</td>
                    <td className="text-right">{row.unitPrice}</td>
                    <td className="text-right">{row.unitPrice * row.qty}</td>
                  </tr>

                </React.Fragment>
              )
            })}

            {
              report.rows && report.rows.length > 0 &&
              <tr>
                <td colSpan={2} className="text-center">Total</td>
                <td className="text-right">{totalRow.qty}</td>
                <td colSpan={2}></td>
                <td className="text-right">{totalRow.amount}</td>
              </tr>
            }


            {
              report.rows && report.rows.length > 0 &&
              <tr className="h-[100px]">
                <td className="uppercase !border-transparent relative" colSpan={6}>
                  <span className="absolute bottom-0 font-bold">TOTAL AMOUNT (IN WORD) : {amountInWords(totalRow.amount)}</span>
                </td>
              </tr>
            }

            {
              report.rows && report.rows.length > 0 &&
              <tr className="h-[150px]">
                <td colSpan={6} className="relative !border-transparent ">
                  <div className="grid grid-cols-6 absolute bottom-[50px] w-full text-[9px]">
                    <div className="flex flex-col gap-1 text-center">
                      <span className="font-bold text-[8px]">{report.rows[0].createdBy}</span>
                      <span className="border-t w-[90%]">PREPARED BY</span>
                    </div>
                    <div className="text-center flex flex-col gap-1">
                      <span className="text-white">.</span>
                      <span className="border-t w-[90%]">RECEIVED BY</span>
                    </div>
                    <div className="text-center flex flex-col gap-1">
                      <span className="text-white">.</span>
                      <span className="border-t w-[90%]">STORE</span>
                    </div>
                    <div className="text-center flex flex-col gap-1">
                      <span className="text-white">.</span>
                      <span className="border-t w-[90%]">ACCOUNTS</span>
                    </div>
                    <div className="text-center flex flex-col gap-1">
                      <span className="text-white">.</span>
                      <span className="border-t w-[90%]">HEAD OF DEPARTMENT</span>
                    </div>
                    <div className="text-center flex flex-col gap-1">
                      <span className="text-white font-bold text-[8px]">.</span>
                      <span className="border-t w-[90%]">AUTHORIZED BY</span>
                    </div>
                  </div>
                </td>
              </tr>
            }

          </tbody>
        </table>
      }


    </div>
  );
};

export default InventorySaleBillReport;
