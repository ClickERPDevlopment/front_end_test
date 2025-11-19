import { cn } from "@/lib/utils";
import { IGreyFabricStock } from "./IGreyFabricStock";

type props = {
  data: IGreyFabricStock[],
  title: string
}

export default function TotalRow({ data, title }: props) {
  return (
    <tr className={cn("border-t border-gray-500 font-bold",)}>
      <th className="border border-gray-500 text-nowrap text-center p-1" colSpan={8}>{title}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c?.GRAY_REQ_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.RECEIVE_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.TRANSFER_IN_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.TOTAL_RCVD_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.RECEIVE_BAL_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.DELIVERY_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.TRANSFER_OUT_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.TOTAL_DELIVERY_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.DELIVERY_BAL_QTY), 0)?.toFixed(2)}</th>
      <th className="border border-gray-500 text-nowrap text-center p-1">{data?.reduce((p, c) => p + Number(c.STOCK_QTY), 0)?.toFixed(2)}</th>
    </tr>
  );
}
