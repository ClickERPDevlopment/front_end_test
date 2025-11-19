import { PartyWiseYanrIssueAndGreyRcvSummaryType } from "./partyw-yarni-greyr-balance-sum-rpt-type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type props = {
  data: PartyWiseYanrIssueAndGreyRcvSummaryType[];
};

export default function PartyWiseYanrIssueAndGreyRcvSummary({ data }: props) {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-center">
          {data[0]?.COMPANY_NAME}
        </h1>
        <h1 className="text-sm text-center">{data[0]?.COMPANY_ADDRESS}</h1>
        <h1 className="text-base text-center font-bold mt-4">
          Party Wise Yarn WIP Report
        </h1>
      </div>
      <div className="border rounded-md mb-20">
        <Table>
          <TableHeader>
            <TableRow className="text-black bg-green-100">
              <TableHead className="min-w-28 text-center text-slate-600 font-bold">
                SL
              </TableHead>
              <TableHead className="min-w-40 text-center text-slate-600 font-bold">
                Party Name
              </TableHead>
              <TableHead className="min-w-32 text-center text-slate-600 font-bold">
                Yarn Issue qty.
              </TableHead>
              <TableHead className="min-w-32 text-center text-slate-600 font-bold">
                Grey Receive qty.
              </TableHead>
              <TableHead className="min-w-28 text-center text-slate-600 font-bold">
                Process Loss
              </TableHead>
              <TableHead className="min-w-28 text-center text-slate-600 font-bold">
                Yarn Balance
              </TableHead>
              <TableHead className="min-w-28 text-center text-slate-600 font-bold">
                Value
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((d, i) => (
              <TableRow key={JSON.stringify(d)}>
                <TableCell className="text-center">{i + 1}</TableCell>
                <TableCell className="text-center">{d.KNIT_HOUSE}</TableCell>
                <TableCell className="text-center">
                  {d.YARN_ISSUE_QTY}
                </TableCell>
                <TableCell className="text-center">
                  {d.GREY_RECEIVE_QTY}
                </TableCell>
                <TableCell className="text-center">
                  {d.KNT_PROCESS_LOSS_QTY}
                </TableCell>
                <TableCell className="text-center">{d.YARN_BALANCE}</TableCell>
                <TableCell className="text-center">
                  {d.YARN_BALANCE_VALUE}
                </TableCell>
              </TableRow>
            ))}
            {/* total============================================ */}

            <TableRow className=" bg-green-100">
              <TableCell className="font-bold text-right" colSpan={2}>
                Total=
              </TableCell>
              <TableCell className="text-center font-bold">
                {data.reduce((p, c) => p + c.YARN_ISSUE_QTY, 0).toFixed(2)}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data.reduce((p, c) => p + c.GREY_RECEIVE_QTY, 0).toFixed(2)}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data
                  .reduce((p, c) => p + c.KNT_PROCESS_LOSS_QTY, 0)
                  .toFixed(2)}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data.reduce((p, c) => p + c.YARN_BALANCE, 0).toFixed(2)}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data.reduce((p, c) => p + c.YARN_BALANCE_VALUE, 0).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
