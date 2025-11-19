import { FabricBookingReportDto_Revice } from "../fabric-booking-type";

export default function Revise({ lstRevise }: { lstRevise?: FabricBookingReportDto_Revice[] }) {
  if (!lstRevise) return null;
  if (lstRevise.length === 0) return null;
  return (
    <table className="my-5 w-6/12">
      <thead>
        <tr>
          <th className="border border-black w-12 text-nowrap px-2" colSpan={2}>Revise Details</th>
        </tr>
        <tr>
          <th className="border border-black w-12 text-nowrap px-2">Revise No</th>
          <th className="border border-black w-auto text-nowrap px-1">Reason</th>
        </tr>
      </thead>
      <tbody>
        {lstRevise?.map((comm: FabricBookingReportDto_Revice, index: number) => (
          <tr key={index}>
            <td className="border border-black text-center text-sm">
              {comm.REVICE_NO}
            </td>
            <td className="border border-black pl-3 text-sm">
              {comm.REVICE_REASON}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
