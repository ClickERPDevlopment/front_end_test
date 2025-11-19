/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbellishmentDeliveryReportType } from "../../embellishment-delivery-report-type";
import moment from "moment";
import ReportFooter from "./report-footer";
import EmbellishmentDeliveryGatePassRejectReportIndex from "../../embellishment-delivery-gate-pass-reject-report/embellishment-delivery-gate-pass-reject-report-index";

function Report({
  data,
}: {
  data: EmbellishmentDeliveryReportType[];
}) {

  //set table header
  const firstHeader = [
    "PO",
    "Color",
    "Total",
  ];


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <div className="flex justify-between mb-4">
          <table className="font-bold">
            <tbody>
              <tr>
                <td className="p-0.5 align-top">Challan No</td>
                <td className="p-0.5 align-top">: {data[0]?.DELIVERY_CHALLAN_NO}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Party Name</td>
                <td className="p-0.5 align-top">: {data[0]?.SUPPLIER}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Address</td>
                <td className="p-0.5 align-top">: {data[0]?.SUPPLIER_ADDRESS}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Buyer</td>
                <td className="p-0.5 align-top">
                  : {[...new Set(data.map(d => d.BUYER || d.OS_BUYER))].filter(Boolean).join(", ")}
                </td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Style</td>
                <td className="p-0.5 align-top">
                  : {[...new Set(data.map(d => d.STYLE || d.OS_STYLE))].filter(Boolean).join(", ")}
                </td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Embellishment Type</td>
                <td className="p-0.5 align-top">
                  : {data[0]?.EMB_TYPE || ""}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="font-bold">
            <tbody>
              <tr>
                <td className="p-0.5 align-top">Challan Date</td>
                <td className="p-0.5 align-top">: {moment(data[0]?.DELIVERY_DATE).format("DD-MMM-YY")}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Delivery Date</td>
                <td className="p-0.5 align-top">: {moment(data[0]?.DELIVERY_DATE).format("DD-MMM-YY")}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">WO No</td>
                <td className="p-0.5 align-top">: {data[0]?.EMBELLISHMENT_ORDERNO}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Order No</td>
                <td className="p-0.5 align-top">: {data[0]?.WORK_ORDER_NO}</td>
              </tr>
              <tr>
                <td className="p-0.5 align-top">Part</td>
                <td className="p-0.5 align-top">: {[...new Set(data.map(d => d.PARTS))].filter(Boolean).join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ReportTable
          data={data}
          firstHeader={firstHeader}
        ></ReportTable>

        <div>
          <EmbellishmentDeliveryGatePassRejectReportIndex data={data}></EmbellishmentDeliveryGatePassRejectReportIndex>
        </div>

        <div style={{ marginTop: "80px" }}>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
