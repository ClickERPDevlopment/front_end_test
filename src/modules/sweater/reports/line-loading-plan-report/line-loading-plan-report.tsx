import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./components/line-loading-plan-report.css";
import { LineLoadingPlanType } from "@/actions/Sweater/swt-planning-action";
import {
  GetAllUniqueDates,
  GetAllUniqueFloor,
  GetBalanceMcByDate,
  GetRowPlanQtyByDate,
  GetTotalAvlMinByDate,
  GetTotalUsedMinByDate,
} from "./components/actions";
import FloorWisePlanRow from "./components/floor-wise-plan-row";

export interface props {
  data: LineLoadingPlanType;
}
export default function LineLoadingPlanReport({ data }: props) {
  const dates = GetAllUniqueDates(data.lstLineLoadingPlanDetailsDto!);
  const floors = GetAllUniqueFloor(data.lstLineLoadingPlanDetailsDto!);

  return (
    <main className="p-4">
      <div className="mb-4">
        <h1 className="text-left font-bold text-2xl">{data?.Company?.NAME}</h1>
        <h1 className="text-left font-bold text-base">
          Line Loading Plan Report
        </h1>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="head">
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                M/C Group
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                Buyer
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                STYLE NO
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th whitespace-nowrap text-center">
                PO
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th whitespace-nowrap">
                SMV
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th whitespace-nowrap">
                Ship Date
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                Order Qty
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                Production Qty
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                Production Bal Qty
              </TableHead>
              <TableHead className="line-loading-plan-report-css line-loading-plan-report-th">
                Plan Qty
              </TableHead>
              {dates.map((date) => (
                <TableHead className="whitespace-nowrap line-loading-plan-report-css line-loading-plan-report-th">
                  {date}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {floors.map((floor) => (
              <FloorWisePlanRow
                data={data}
                dates={dates}
                details={data.lstLineLoadingPlanDetailsDto?.filter(
                  (f) => f.FLOOR_NO === floor
                )}
              />
            ))}

            {/* // plan pcs */}
            <TableRow className="font-bold">
              <TableCell
                className="line-loading-plan-report-css text_right"
                colSpan={10}
              >
                Plan Pcs:
              </TableCell>
              {/* Date-wise column cell data */}
              {dates?.map((date) => (
                <TableCell className="line-loading-plan-report-css">
                  {GetRowPlanQtyByDate(
                    date!,
                    data.lstLineLoadingPlanDetailsDto!
                  )}
                </TableCell>
              ))}
              {/* end- Date-wise column cell data */}
            </TableRow>

            {/* // total mc */}
            <TableRow className="font-bold">
              <TableCell
                className="line-loading-plan-report-css text_right"
                colSpan={10}
              >
                Total M/C Qty:
              </TableCell>
              {/* Date-wise column cell data */}
              {dates?.map((date) => (
                <TableCell className="line-loading-plan-report-css">
                  {GetTotalAvlMinByDate(
                    date!,
                    data.lstLineLoadingPlanAvlMinutesDto!
                  )}
                </TableCell>
              ))}
              {/* end- Date-wise column cell data */}
            </TableRow>

            {/* // total plan mc */}
            <TableRow className="font-bold">
              <TableCell
                className="line-loading-plan-report-css text_right"
                colSpan={10}
              >
                Total Plan M/C Qty:
              </TableCell>
              {/* Date-wise column cell data */}
              {dates?.map((date) => (
                <TableCell className="line-loading-plan-report-css">
                  {GetTotalUsedMinByDate(
                    date!,
                    data.lstLineLoadingPlanUsedMinutesDto!
                  )}
                </TableCell>
              ))}
              {/* end- Date-wise column cell data */}
            </TableRow>

            {/* // total avl mc */}
            <TableRow className="font-bold">
              <TableCell
                className="line-loading-plan-report-css text_right"
                colSpan={10}
              >
                Total Blc M/C Qty:
              </TableCell>
              {/* Date-wise column cell data */}
              {dates?.map((date) => (
                <TableCell className="line-loading-plan-report-css">
                  {GetBalanceMcByDate(
                    date!,
                    data.lstLineLoadingPlanAvlMinutesDto!,
                    data.lstLineLoadingPlanUsedMinutesDto!
                  )}
                </TableCell>
              ))}
              {/* end- Date-wise column cell data */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
