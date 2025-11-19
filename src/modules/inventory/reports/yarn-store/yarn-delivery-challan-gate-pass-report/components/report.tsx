/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IYarnDeliveryChallanGatePassReport } from "../yarn-delivery-challan-gate-pass-report-type";
import moment from "moment";
import { IYarnBookingSummary } from "../yarn-booking-summary-type";
import axios from "axios";
import { useEffect, useState } from "react";
import useApiUrl from "@/hooks/use-ApiUrl";
import useAppClient from "@/hooks/use-AppClient";

function Report({
  data,
}: {
  data: IYarnDeliveryChallanGatePassReport[];
}) {

  const [bookingSummaryData, setBookingSummaryData] = useState<IYarnBookingSummary[]>(
    []
  );

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/YarnBookingSummaryReport?buyerId=${data[0]?.BUYER_ID}&styleId=${data[0]?.STYLE_ID}&poId=${data[0]?.PO_ID}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              setBookingSummaryData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

      } catch {
        //console.log(error.message);
      }
    }
    getData();
  }, []);

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IYarnDeliveryChallanGatePassReport[],
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
      items: IYarnDeliveryChallanGatePassReport[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const client = useAppClient();

  //set table header
  const firstHeader = [
    "SL NO.",
    "Prog. NO",
    "Yarn",
    client.currentClient == client.FAME ? 'Location' : "Brand",
    "Yarn Lot",
    "Issue Qty(KG)",
    "BAG & CONE",
    "Issue Store",
    "Remarks",
  ];

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3">
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Date</td>
                  <td className="align-top">: {moment(data[0]?.CHALLAN_DATE).format("DD-MM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Challan No</td>
                  <td className="align-top">: {data[0]?.CHALLAN_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">Buyer</td>
                  <td className="align-top">: {data[0]?.BUYER}</td>
                </tr>
                <tr>
                  <td className="align-top">Style</td>
                  <td className="align-top">: {data[0]?.STYLE}</td>
                </tr>
                <tr>
                  <td className="align-top">Order/Job No</td>
                  <td className="align-top">: {data[0]?.PO_NO}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">To</td>
                  <td className="align-top">: {data[0]?.KNITTING_HOUSE}<br></br>{data[0]?.KNITTING_HOUSE_ADDRESS}</td>
                </tr>
                <tr>
                  <td className="align-top">Issue Type</td>
                  <td className="align-top">: {data[0]?.ISSUE_TYPE}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
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
              ></ReportTable>
            ))}
          </tbody>
        </table>

        <div className="flex w-full mt-5">
          <div className="flex-[2]">
            <p style={{ fontSize: "11px" }} className="text-center font-bold">Booking Summary</p>
            <table className="border-collapse border border-gray-300  w-[100%]">
              <thead className="sticky top-0 print:static bg-white print:bg-transparent">
                <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center font-bold">
                  <th className="border border-gray-950 p-0.5">Buyer</th>
                  <th className="border border-gray-950 p-0.5">Job No</th>
                  <th className="border border-gray-950 p-0.5">Req. Yarn</th>
                  <th className="border border-gray-950 p-0.5">Issue Yarn</th>
                  <th className="border border-gray-950 p-0.5">Bal</th>
                  <th className="border border-gray-950 p-0.5">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontSize: "11px" }} className="font-bold">
                  <td className="border border-gray-950 p-0.5">{bookingSummaryData[0]?.BUYER_NAME}</td>
                  <td className="border border-gray-950 p-0.5">{bookingSummaryData[0]?.PO_NO}</td>
                  <td className="border border-gray-950 p-0.5">{bookingSummaryData[0]?.BOOKING_QTY}</td>
                  <td className="border border-gray-950 p-0.5">{bookingSummaryData[0]?.ISSUE_QTY}</td>
                  <td className="border border-gray-950 p-0.5">{(bookingSummaryData[0]?.BOOKING_QTY - bookingSummaryData[0]?.ISSUE_QTY).toFixed(2)}</td>
                  <td className="border border-gray-950 p-0.5">{bookingSummaryData[0]?.BOOKING_QTY - bookingSummaryData[0]?.ISSUE_QTY > 0 ? "Less" : "Over"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-[1]">
          </div>
        </div>

        <div>
          <p style={{ fontSize: "12px" }} className="font-bold mt-2">Remarks: {data[0]?.ADVICE}</p>
        </div>

        <div className="mt-[144px]"></div>

        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
