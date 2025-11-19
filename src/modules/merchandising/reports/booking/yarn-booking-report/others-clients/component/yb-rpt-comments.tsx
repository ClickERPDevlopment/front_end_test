/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import YarnBookingReportContext from "./yb-rpt-context";

export default function YarnBookingReportComments() {
  const data = useContext(YarnBookingReportContext);

  return (
    <table className="my-5 w-full">
      <thead>
        <tr>
          <th className="border border-black w-20">SL</th>
          <th className="border border-black w-auto">COMMENTS</th>
        </tr>
      </thead>
      <tbody>
        {data?.lstComments?.map((comm: any, index: number) => (
          <tr key={Math.random()}>
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
