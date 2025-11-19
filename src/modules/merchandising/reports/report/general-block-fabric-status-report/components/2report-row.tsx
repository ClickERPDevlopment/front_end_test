import { GeneralBlockFabricStatusReportType } from "../general-block-f-status-rpt-type";

function ReportRow({ data }: { data: GeneralBlockFabricStatusReportType }) {
  return (
    <tr>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.WORK_ORDER_NO}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.PI_NO}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.BUYER}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.STYLENO}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.FABRIC}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.FABRIC_COLOR}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data.GMT_COLOR}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data.WO_QTY}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.RCV_QTY}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.ALLOCATED_QTY}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.ALLOCATED_BALANCE_QTY}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.UOM}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.FABRIC_DIA}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.FABRIC_GSM}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.MATERIAL_DESCRIPTION}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.ORDER_REFERENCE}
      </td>
      <td className="border border-gray-300 p-1 text-sm text-center">
        {data?.SEASON}
      </td>
    </tr>
  );
}

export default ReportRow;
