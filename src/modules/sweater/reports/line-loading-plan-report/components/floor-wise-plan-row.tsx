import { TableCell, TableRow } from "@/components/ui/table";
import {
  GetAllUniqueRows,
  GetOrderQtyByRow,
  GetPlanQtyByRow,
  GetProductionBalanceQtyByRow,
  GetProductionQtyByRow,
  GetRowPlanQtyByDate,
  GetRowPlanQtyByDateByRow,
} from "./actions";
import {
  LineLoadingPlanDetailsType,
  LineLoadingPlanType,
} from "@/actions/Sweater/swt-planning-action";

export interface porps {
  data: LineLoadingPlanType;
  details: LineLoadingPlanDetailsType[] | undefined;
  dates: string[] | undefined;
}
export default function FloorWisePlanRow({ data, dates, details }: porps) {
  const rows = GetAllUniqueRows(details!);
  return (
    <>
      {rows.map((row) => (
        <TableRow>
          <TableCell className=" whitespace-nowrap">{row.LINE_NO}</TableCell>
          <TableCell className=" whitespace-nowrap">{row.BUYER}</TableCell>
          <TableCell>{row.STYLE_NO}</TableCell>
          <TableCell>{row.PO}</TableCell>
          <TableCell className=" whitespace-nowrap">{row.SMV}</TableCell>
          <TableCell className="whitespace-nowrap">{row.SHIP_DATE}</TableCell>
          <TableCell>
            {GetOrderQtyByRow(row, data.lstLineLoadingPlanOrderStatusDto!)}
          </TableCell>
          <TableCell className=" ">
            {GetProductionQtyByRow(row, data.lstLineLoadingPlanOrderStatusDto!)}
          </TableCell>
          <TableCell className=" ">
            {GetProductionBalanceQtyByRow(
              row,
              data.lstLineLoadingPlanOrderStatusDto!
            )}
          </TableCell>
          <TableCell className=" ">{GetPlanQtyByRow(row, details!)}</TableCell>
          {/* Date-wise column cell data */}
          {dates?.map((date) => (
            <TableCell>
              {GetRowPlanQtyByDateByRow(date!, row, details!)}
            </TableCell>
          ))}
          {/* end- Date-wise column cell data */}
        </TableRow>
      ))}
      <TableRow className="font-bold">
        <TableCell colSpan={10}>
          {details ? details[0]?.FLOOR_NO : ""}
        </TableCell>
        {/* Date-wise column cell data */}
        {dates?.map((date) => (
          <TableCell>{GetRowPlanQtyByDate(date!, details!)}</TableCell>
        ))}
        {/* end- Date-wise column cell data */}
      </TableRow>
    </>
  );
}
