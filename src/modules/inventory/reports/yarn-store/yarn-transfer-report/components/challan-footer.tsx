import { IYarnTransfer } from "../yarn-transfer-report-type";

function ChallanFooter({
  data,
}: {
  data: IYarnTransfer | null | undefined;
}) {
  return (
    <div>
      <h1 className="font-bold">Receive the above goods in good conditions.</h1>
      <h1 className="font-bold">Remarks: {data?.REMARKS}</h1>
    </div>
  );
}

export default ChallanFooter;
