/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { GeneralAndOTHoursProductionReportType } from "../general-and-ot-hours-production-report-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";

function Report({
  data,
  searchParams,
}: {
  data: GeneralAndOTHoursProductionReportType[];
  searchParams: { dtTo: any; dtFrom: any };
}) {


  //set table header
  const firstHeader = [
    "Date",
    "Floor",
    "0-8 Hours",
    "9-10 Hours",
    "10+ Hours",
  ];

  const totalFirstEightHour = data.reduce(
    (acc, cur) => acc + cur.FIRST_EIGHT_HOUR, 0
  );

  const totalNineTenHour = data.reduce(
    (acc, cur) => acc + cur.NINE_TEN_HOUR, 0
  );

  const totalGreaterTenHour = data.reduce(
    (acc, cur) => acc + cur.GREATER_TEN_HOUR, 0
  );


  return (
    <div className="px-10 custom-scroll text-sm relative overflow-auto h-[100vh] bg-white print:h-[100%]">
      <div className="p-2">
        <ReportHeader
          data={data[0]}
          searchParams={{
            toDate: searchParams?.dtTo,
            fromDate: searchParams?.dtFrom,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead>
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-1">
                  {moment(item.SEWINGDATE).format("DD-MM-YYYY")}
                </td>
                <td className="border border-gray-300 p-1">{item.UNITNAME}</td>
                <td className="border border-gray-300 p-1">{item.FIRST_EIGHT_HOUR}</td>
                <td className="border border-gray-300 p-1">{item.NINE_TEN_HOUR}</td>
                <td className="border border-gray-300 p-1">{item.GREATER_TEN_HOUR}</td>
              </tr>
            ))}
            <tr className="text-center  bg-yellow-200">
              <td className="border border-gray-300 p-1 font-bold" colSpan={2}>
                Total
              </td>
              <td className="border border-gray-300 p-1 font-bold">
                {totalFirstEightHour}
              </td>
              <td className="border border-gray-300 p-1 font-bold">{totalNineTenHour}</td>
              <td className="border border-gray-300 p-1 font-bold">{totalGreaterTenHour}</td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
