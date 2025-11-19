/* eslint-disable @typescript-eslint/no-explicit-any */

import { FabricBookingReportDto_Comments } from "../fabric-booking-type";

export default function Comments({ lstComments }: { lstComments?: FabricBookingReportDto_Comments[] }) {
  if (!lstComments) return null;
  if (lstComments.length === 0) return null;
  return (
    <table className="my-5 w-6/12">
      <thead>
        <tr>
          <th className="border border-black w-12">SL</th>
          <th className="border border-black w-auto">COMMENTS</th>
        </tr>
      </thead>
      <tbody>
        {lstComments?.map((comm: any, index: number) => (
          <tr key={index}>
            <td className="border border-black text-center text-sm">
              {index + 1}
            </td>
            <td className="border border-black pl-3 text-sm">
              {comm.COMMENTS}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
