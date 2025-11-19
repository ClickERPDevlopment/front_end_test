import { GreyBatchStatusReportGreyRcvDtlsDto } from "./Interfaces";

export interface props {
  greyRcvDtls: GreyBatchStatusReportGreyRcvDtlsDto[];
  title: string;
}

export default function GreyRcvTotalRow({ greyRcvDtls, title }: props) {
  const getTotalGreyRcv = () => {
    let total = 0;
    greyRcvDtls?.forEach((element) => {
      total += element.QUANTITY;
    });
    return total.toFixed(2);
  };

  return (
    <>
      <tr>
        <th className="text-xs border border-black p-1 min-w-28">{title}</th>
        <th className="text-xs border border-black p-1 min-w-28"></th>
        <th className="text-xs border border-black p-1 min-w-32"></th>
        <th className="text-xs border border-black p-1 min-w-48"></th>
        <th className="text-xs border border-black p-1 min-w-24"></th>
        <th className="text-xs border border-black p-1 min-w-32"></th>
        <th className="text-xs border border-black p-1"> </th>
        <th className="text-xs border border-black p-1"> </th>
        <th className="text-xs border border-black p-1"> </th>
        <th className="text-xs border border-black p-1"></th>
        <th className="text-xs border border-black p-1"></th>
        <th className="text-xs border border-black p-1">{getTotalGreyRcv()}</th>
      </tr>
    </>
  );
}
