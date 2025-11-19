import { IFabricReceiveReturnChallanGatePassReport } from "../fabric-receive-return-challan-gate-pass-report-type";

function ReportFooter({ data }: { data: IFabricReceiveReturnChallanGatePassReport[] }) {
  return (
    <div className="flex mt-10">
      <table className="w-full">
        <tr className="text-center">
          <td className="w-[25%] border-0">
            {data[0]?.PREPARED_BY}
          </td>
          <td className="w-[25%] border-0">
          </td>
          <td className="w-[25%] border-0">
          </td>
          <td className="w-[25%] border-0">
          </td>
          <td className="w-[25%] border-0">
          </td>
        </tr>
        <tr className="text-center">
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1 text-nowrap">Prepared By</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1 text-nowrap">Receiver</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1 text-nowrap">Store Officer</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1 text-nowrap">Store Incharge</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1 text-nowrap">Authorized By</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportFooter;
