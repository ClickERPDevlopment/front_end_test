/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import {
  outsideYIssueGRcvStatus_GreyRcv,
  outsideYIssueGRcvStatus_LoseyarnRcv,
  outsideYIssueGRcvStatus_YarnIssue,
} from "./outsideYIssueGRcvS-Interfaces";

export interface props {
  yarnIssue: outsideYIssueGRcvStatus_YarnIssue[];
  greyRcv: outsideYIssueGRcvStatus_GreyRcv[];
  loseYanRcv: outsideYIssueGRcvStatus_LoseyarnRcv[];
  title: string;
}

export default function ReportTotal({
  yarnIssue,
  greyRcv,
  loseYanRcv,
  title,
}: props) {
  type totalType = {
    issue: number;
    retun: number;
    greyRcv: number;
    loseyarn: number;
  };
  const [total, setTotal] = useState<totalType>();

  useEffect(() => {
    let issueQty = 0;
    let returnQty = 0;
    let grey = 0;
    let loseYQty = 0;

    yarnIssue.forEach((element) => {
      issueQty += element.QUANTITY;
      returnQty += element.RETURN_QUANTITY;
    });

    greyRcv.forEach((element) => {
      grey += element.GREY_WEIGHT;
    });

    loseYanRcv.forEach((element) => {
      loseYQty += element.QUANTITY;
    });

    setTotal({
      issue: issueQty,
      retun: returnQty,
      greyRcv: grey,
      loseyarn: loseYQty,
    });
  }, []);

  return (
    <tr>
      <td className="border border-black text-[8px] text-center p-1 font-bold">
        {title}
      </td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1 font-bold">
        {total?.issue.toFixed(3)}
      </td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1">
        {total?.retun}
      </td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1"></td>
      <td className="border border-black text-[8px] text-center p-1 font-bold">
        {total?.greyRcv}
      </td>
      <td className="border border-black text-[8px] text-center p-1 font-bold">
        {total?.loseyarn}
      </td>
      <td className="border border-black text-[8px] text-center p-1 font-bold">
        {total?.greyRcv! + total?.loseyarn!}
      </td>
      <td className="border border-black text-[8px] text-center p-1 font-bold">
        {(total?.issue! - total?.greyRcv! - total?.retun!).toFixed(2)}
      </td>
    </tr>
  );
}
