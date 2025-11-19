import useAppClient from "@/hooks/use-AppClient";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function ReportFooter({ data }: { data: OperationBulletinReportType[] }) {

  const client = useAppClient();

  return (
    <div style={{ fontSize: "11px", marginTop: "60px" }} className="flex font-bold justify-between ">
      <table className="w-full text-center">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <span>
                {
                  data[0]?.CREATEBY
                }
              </span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="">
              <span className='pb-1 border-t border-gray-900 px-2'>
                {
                  client.currentClient == client.FAME ? "Sr. Executive (IE)" : "Prepared By"
                }
              </span>
            </td>
            <td className="">
              <span className='pb-1 border-t border-gray-900 px-2'>
                Head Of IE
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
