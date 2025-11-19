import { cn } from "@/lib/utils";
import { IStyleWiseProfitLossReport } from "./IStyleWiseProfitLossReport";

type props = {
  data: IStyleWiseProfitLossReport[],
  title: string
}

export default function TotalRow({ data, title }: props) {

  return (
    <tr className={cn("border-t border-gray-500 font-bold bg-violet-100")} >
      <td className="text-balance  text-center p-1" colSpan={3}>
        {title ?? 'Total'}
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.ORDER_QTY, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.SHIP_QTY, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.FABRIC_COST, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.ACCESSORIES_COST, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.EMBLISHMENT_COST, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.COMMERCIAL_COST, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.CM_COST, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.TOTAL_COST, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.SHIP_VALUE, 0).toFixed(2)
        }
      </td>
      <td className=" text-balance  text-center p-1">
        {
          data.reduce((p, c) => p + c.PROFIT_LOSS, 0).toFixed(2)
        }
      </td>
    </tr>
  );
}
