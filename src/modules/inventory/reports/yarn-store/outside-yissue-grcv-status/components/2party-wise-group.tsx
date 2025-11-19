import YarnChallanWiseGroup from "./3yarn-ch-wise-group";
import {
  outsideYIssueGRcvStatus_GreyRcv,
  outsideYIssueGRcvStatus_LoseyarnRcv,
  outsideYIssueGRcvStatus_YarnIssue,
} from "./outsideYIssueGRcvS-Interfaces";

export interface props {
  yarnIssue: outsideYIssueGRcvStatus_YarnIssue[];
  greyRcv: outsideYIssueGRcvStatus_GreyRcv[];
  loseYanRcv: outsideYIssueGRcvStatus_LoseyarnRcv[];
}

export default function PartyWiseGroup({
  yarnIssue,
  greyRcv,
  loseYanRcv,
}: props) {
  const yarnChallanIds: number[] = [];

  yarnIssue?.forEach((element) => {
    if (!yarnChallanIds.includes(element.YARN_CHALLAN_ID)) {
      yarnChallanIds.push(element.YARN_CHALLAN_ID);
    }
  });

  console.log("mtls: ", yarnChallanIds);

  return (
    <>
      <tr className="border border-black">
        <td
          colSpan={14}
          className="text-[8px] border border-black p-1 font-bold"
        >
          <div className="flex flex-col">
            <span>FACTORY: {yarnIssue[0]?.KNITTING_HOUSE}</span>
            <span>ADDRESS: {yarnIssue[0]?.KNITTING_HOUSE_ADDRESS}</span>
          </div>
        </td>
      </tr>

      {yarnChallanIds.map((ycId) => (
        <YarnChallanWiseGroup
          yarnIssue={yarnIssue.filter((d) => d.YARN_CHALLAN_ID === ycId)}
          greyRcv={greyRcv.filter((d) => d.YARN_CHALLAN_ID === ycId)}
          loseYanRcv={loseYanRcv.filter((d) => d.YARN_CHALLAN_ID === ycId)}
          key={Math.random()}
        />
      ))}
    </>
  );
}
