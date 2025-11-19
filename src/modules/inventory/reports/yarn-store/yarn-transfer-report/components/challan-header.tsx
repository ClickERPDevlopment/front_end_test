import moment from "moment";
import { IYarnTransfer } from "../yarn-transfer-report-type";

function ChallanHeader({
  data,
}: {
  data: IYarnTransfer | null | undefined;
}) {

  return (
    <div className="flex justify-between mt-3">
      <div>
        <table className="font-bold align-top">
          <thead></thead>
          <tbody>
            <tr>
              <td className="align-top">Challan No</td>
              <td className="align-top">: {data?.CHALLAN_NO}</td>
            </tr>
            <tr>
              <td className="align-top">Date</td>
              <td className="align-top">: {moment(data?.CHALLAN_DATE).format("DD-MM-YY")}</td>
            </tr>
            <tr>
              <td className="align-top">{data?.WORK_ORDER ? 'Wo No' : ''}</td>
              <td className="align-top">{data?.WORK_ORDER ? (': ' + data?.WORK_ORDER) : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="font-bold">
          <thead></thead>
          <tbody>
            <tr>
              <td className="align-top">To</td>
              <td className="align-top">: {data?.PARTY}</td>
            </tr>
            <tr>
              <td className="align-top"></td>
              <td className="align-top" rowSpan={2}>{data?.PARTY_ADDRESS}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChallanHeader;
