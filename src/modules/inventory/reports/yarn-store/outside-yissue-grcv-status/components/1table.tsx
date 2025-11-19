import PartyWiseGroup from "./2party-wise-group";
import {
  outsideYIssueGRcvStatus_GreyRcv,
  outsideYIssueGRcvStatus_LoseyarnRcv,
  outsideYIssueGRcvStatus_YarnIssue,
} from "./outsideYIssueGRcvS-Interfaces";
import ReportTotal from "./report-total";

export interface props {
  yarnIssue: outsideYIssueGRcvStatus_YarnIssue[];
  greyRcv: outsideYIssueGRcvStatus_GreyRcv[];
  loseYanRcv: outsideYIssueGRcvStatus_LoseyarnRcv[];
}

export default function Table({ yarnIssue, greyRcv, loseYanRcv }: props) {
  const parties: string[] = [];

  console.log("yarnIssue new :::", yarnIssue);

  yarnIssue?.forEach((element) => {
    if (!parties.includes(element.KNITTING_HOUSE)) {
      parties.push(element.KNITTING_HOUSE);
    }
  });

  function getChallanByParty(partyName: string) {
    const yCs: number[] = [];

    yarnIssue?.forEach((element) => {
      if (element.KNITTING_HOUSE === partyName) {
        yCs.push(element.YARN_CHALLAN_ID);
      }
    });
    return yCs;
  }

  console.log("mtls: ", parties);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="text-[8px] border border-black p-1">
              YARN DELIVERY DATE
            </th>
            <th className="text-[8px] border border-black p-1">
              YARN CHALLAN NO
            </th>
            <th className="text-[8px] border border-black p-1">BUYER</th>
            <th className="text-[8px] border border-black p-1">ORDER NO</th>
            <th className="text-[8px] border border-black p-1 min-w-48">
              YARN COUNT
            </th>
            <th className="text-[8px] border border-black p-1">YARN BRAND</th>
            <th className="text-[8px] border border-black p-1">YARN LOT</th>
            <th className="text-[8px] border border-black p-1">
              DELIVERY YARN QTY (Kg)
            </th>
            <th className="text-[8px] border border-black p-1">
              RETURN YARN CHALLAN
            </th>
            <th className="text-[8px] border border-black p-1">
              RETURN YARN QTY (Kg)
            </th>
            <th className="text-[8px] border border-black p-1">
              FABRIC/YARN RECEIVE DATE
            </th>
            <th className="text-[8px] border border-black p-1">
              RECEIVE CHALLAN NO
            </th>
            <th className="text-[8px] border border-black p-1">
              FABRIC RECEIVE QTY (Kg)
            </th>
            <th className="text-[8px] border border-black p-1">
              Lose YARN RECEIVE QTY (Kg)
            </th>
            <th className="text-[8px] border border-black p-1">
              TOTAL RECEIVE (Kg)
            </th>
            <th className="text-[8px] border border-black p-1">BALANCE (Kg)</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((kname) => (
            <PartyWiseGroup
              yarnIssue={yarnIssue.filter((d) => d.KNITTING_HOUSE === kname)}
              greyRcv={greyRcv.filter((d) =>
                getChallanByParty(kname).includes(d.YARN_CHALLAN_ID)
              )}
              loseYanRcv={loseYanRcv.filter((d) =>
                getChallanByParty(kname).includes(d.YARN_CHALLAN_ID)
              )}
              key={Math.random()}
            />
          ))}
          <ReportTotal
            yarnIssue={yarnIssue}
            greyRcv={greyRcv}
            loseYanRcv={loseYanRcv}
            title="Grand Total"
          />
        </tbody>
      </table>
    </>
  );
}
