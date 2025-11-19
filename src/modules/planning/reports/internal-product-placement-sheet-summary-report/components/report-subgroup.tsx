import moment from "moment";
import { InternalProductPlacementSheetReportType } from "../internal-product-placement-sheet-report-type";

function ReportSubgroup({
  data, index
}: {
  data: InternalProductPlacementSheetReportType[];
  firstHeader: string[] | null;
  index: number;
}) {


  const totalOrderQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.ORDERQTY),
    0);


  function getRemarks(
    PORECEIVEDATE: Date | null,
    FRIDATE: Date | null,
    PACKEDQTY: number,
    ORDERQTY: number
  ): string {
    if (PORECEIVEDATE !== null) {
      return 'Shipped';
    } else if (FRIDATE === null) {
      if (ORDERQTY === 0) return '0%';
      const percentage = (PACKEDQTY * 100) / ORDERQTY;
      return `${percentage.toFixed(2)}%`;
    } else {
      return 'FRI DONE';
    }
  }


  return (
    <>
      <tr style={{ fontSize: "14px" }} className="">
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYERNAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PONO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COMMERCIALFACTORYPREFIX}</td>
        <td className="border border-gray-950 p-0.5">{totalOrderQuantiy}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLEID}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.NOCOLOR}</td>

        <td className="border border-gray-950 p-0.5">
          {data[0]?.PROPOSEDELIVERYDATE ? moment(data[0].PROPOSEDELIVERYDATE).format("DD-MMM-YY") : ""}
        </td>
        <td className="border border-gray-950 p-0.5">
          {data[0]?.DELIVERYDATE ? moment(data[0].DELIVERYDATE).format("DD-MMM-YY") : ""}
        </td>
        <td className="border border-gray-950 p-0.5">
          {data[0]?.PORECEIVEDATE ? moment(data[0].PORECEIVEDATE).format("DD-MMM-YY") : ""}
        </td>


        <td className="border border-gray-950 p-0.5">
          {getRemarks(
            data[0]?.PORECEIVEDATE || null,
            data[0]?.FRIDATE || null,
            data[0]?.PACKEDQTY,
            data[0]?.ORDERQTY
          )}
        </td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
