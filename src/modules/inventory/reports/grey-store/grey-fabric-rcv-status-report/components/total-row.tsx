import { cn } from "@/lib/utils";
import { IGreyReceiveStatusReportDto } from "./IGreyFabricStock";

type props = {
  data: IGreyReceiveStatusReportDto[],
  title: string
}

export default function TotalRow({ data, title }: props) {
  return (
    <tr className={cn("border-t border-gray-500 font-bold",)}>
      <th className="border border-gray-500 text-nowrap text-center p-1" colSpan={10}>{title}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c?.ROLL_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c?.GREY_WEIGHT), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1"></th>
    </tr>
  );
}
