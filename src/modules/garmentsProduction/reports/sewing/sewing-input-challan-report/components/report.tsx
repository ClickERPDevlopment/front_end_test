/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { SewingInputChallanReportType } from "../sewing-input-challan-report-type";
import ReportFooter from "./report-footer";
import moment from "moment";

function Report({
  data,
  reportName,
}: {
  data: SewingInputChallanReportType[];
  reportName: string;
}) {

  const grandTotal: {
    QUANTITY: number;
    SIZES: { [key: string]: number };
  } = {
    QUANTITY: 0,
    SIZES: {}
  };

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SewingInputChallanReportType[],
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

      grandTotal.SIZES[item.SIZENAME] = (grandTotal.SIZES[item.SIZENAME] || 0) + item.SEWINGINPUTQTY;
      grandTotal.QUANTITY += item.SEWINGINPUTQTY;

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: SewingInputChallanReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);
  const sizeHeader: string[] = Array.from(new Set(data?.map((item) => item.SIZENAME || "")));


  //set table header
  const firstHeader = [
    "PO No",
    "Color",
  ];


  const header = firstHeader.concat(sizeHeader);

  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "11px" }}
      className="px-12 text-gray-950 w-full">
      <div className="p-2">
        <ReportHeader
          data={data}
          reportName={reportName}
        />

        <div >
          <div className="flex justify-between items-start gap-3">
            <table className="border-none font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="p-0.5">Challan No</td>
                  <td className="p-0.5"> :{data[0]?.SEWINGISSUENO}</td>
                </tr>
                <tr>
                  <td className="p-0.5">CFloor Name</td>
                  <td className="p-0.5"> :{data[0]?.FLOORNAME}</td>
                </tr>
                <tr>
                  <td className="p-0.5">Buyer Name</td>
                  <td className="p-0.5"> :{data[0]?.BUYERNAME}</td>
                </tr>
                <tr>
                  <td className="p-0.5">Style Name:</td>
                  <td className="p-0.5"> :{data[0]?.STYLENO}</td>
                </tr>
              </tbody>
            </table>

            <table className="border-none font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="p-0.5">Batch No</td>
                  <td className="p-0.5"> :{data[0]?.BATCH_NO}</td>
                </tr>
                <tr>
                  <td className="p-0.5">Line Name</td>
                  <td className="p-0.5"> :{data[0]?.LINENAME}</td>
                </tr>
                <tr>
                  <td className="p-0.5">Remarks</td>
                  <td className="p-0.5"> :{data[0]?.REMARKS}</td>
                </tr>
              </tbody>
            </table>

            <table className="border-none font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="p-0.5">Sewing Input Date</td>
                  <td className="p-0.5"> :{moment(data[0]?.SEWINGINPUTDATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="p-0.5">Country</td>
                  <td className="p-0.5"> :{ }</td>
                </tr>
                <tr>
                  <td className="p-0.5">Actual Shipment Date</td>
                  <td className="p-0.5">
                    :{data[0]?.ACTUALETD ? moment(new Date(data[0].ACTUALETD)).format("DD-MMM-YY") : "-"}
                  </td>

                </tr>
                <tr>
                  <td className="p-0.5">PO Qty</td>
                  <td className="p-0.5"> :{data[0]?.PO_QTY}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
              {header?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
              <th className="border border-gray-950 p-0.5">Total</th>
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                sizeHeader={sizeHeader}
              ></ReportTable>
            ))}
            <tr style={{ backgroundColor: "#e0fcef" }}>
              <td className="border border-gray-950 p-0.5 font-bold text-right" colSpan={firstHeader.length}>Grand Total</td>
              {sizeHeader?.map((size) => (
                <td key={size} className="border border-gray-950 p-0.5 text-center font-bold">
                  {grandTotal.SIZES[size] || 0}
                </td>
              ))}
              {
                <td className="border border-gray-950 p-0.5 text-center font-bold">
                  {grandTotal.QUANTITY || 0}
                </td>
              }
            </tr>
          </tbody>
        </table>
        <div className="p-2"></div>
        <div className="mt-10">
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
