import useAppClient from "@/hooks/use-AppClient";
import { IPartyWiseKnittingProgram } from "../party-wise-knitting-program-report-type";




function ReportFooter({ data }: { data: IPartyWiseKnittingProgram[] }) {
  const client = useAppClient();
  const signs: { title: string, name: string }[] = [
    {
      title: 'Prepared By',
      name: data[0]?.PREPARED_BY
    },
    {
      title: 'Receiver\'s Signature',
      name: ''
    },
    {
      title: 'Knitting Incharge',
      name: ''
    },
    {
      title: 'Approved By',
      name: ''
    }]

  const signs_fame: { title: string, name: string }[] = [
    {
      title: 'Received By',
      name: ''
    },
    {
      title: 'Prepared By',
      name: data[0]?.PREPARED_BY
    },
    {
      title: 'Manager Knitting',
      name: ''
    },
    {
      title: 'HOD (Knitting)',
      name: ''
    },
    {
      title: 'Authorised By',
      name: ''
    }]

  const signInData = client.currentClient === client.FAME ? signs_fame : signs;

  return (
    <div className="flex mt-10">
      <table className="w-full">
        <tbody>
          <tr className="text-center">
            {signInData.map((ele, i) =>
              <td className="w-[25%] border-0">
                <span>{ele.name}</span>
              </td>
            )}
          </tr>
          <tr className="text-center">
            {signInData.map((ele, i) =>
              <td className="w-[25%] border-0 text-nowrap">
                <span className="border-t border-gray-950 px-10 pb-1">{ele.title}</span>
              </td>
            )}
            {/*             
            <td className="w-[25%] border-0 text-nowrap">
              <span className="border-t border-gray-950 px-5 pb-1">Receiver's Signature</span>
            </td>
            <td className="w-[25%] border-0 text-nowrap">
              <span className="border-t border-gray-950 px-5 pb-1">Knitting Incharge</span>
            </td>
            <td className="w-[25%] border-0 text-nowrap">
              <span className="border-t border-gray-950 px-5 pb-1">Approved By</span>
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
