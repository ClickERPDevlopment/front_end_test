/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportSummary from "./report-summary";
import { IDateWiseFabricRequisitionReceive } from "../date-wise-fabric-requisition-receive-type";

function Report({
  data,
  searchParams,
}: {
  data: IDateWiseFabricRequisitionReceive[];
  searchParams: { toDate: any; fromDate: any };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IDateWiseFabricRequisitionReceive[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByBuyer {
    [key: string]: {
      items: IDateWiseFabricRequisitionReceive[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "BUYER",
    "ORDER/JOB NO",
    "STYLE",
    "COLUR",
    "FABRIC NAME",
    "FABRIC SOURCE",
    "UNIT",
    "TOTAL REQUIRED",
    "READY QTY",
    "DAY REQUISITION",
    "DAY RECEIVE",
    "TOTAL RECEIVE",
    "BALANCE",
  ];

  //summary header
  const summaryHeader = [
    "BUYER",
    "TOTAL REQUIRED",
    "DAY RECEIVE",
    "TOTAL RECEIVE",
    "BALANCE",
  ];

  const totalRequired = data.reduce((acc, item) => {
    return acc + item.TOTAL_REQUIRED;
  }, 0);

  const totalRedy = data.reduce((acc, item) => {
    return acc + item.READY_QTY;
  }, 0);

  const totalDayRequisition = data.reduce((acc, item) => {
    return acc + item.DAY_REQUISITION;
  }, 0);

  const totalDayReceive = data.reduce((acc, item) => {
    return acc + item.DAY_RECEIVE;
  }, 0);

  const totalReceive = data.reduce((acc, item) => {
    return acc + item.TOTAL_RECEIVE;
  }, 0);

  const totalBalance = data.reduce((acc, item) => {
    return acc + (item.TOTAL_RECEIVE - item.TOTAL_REQUIRED);
  }, 0);

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
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
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByBuyer[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
            <tr className="text-center  bg-yellow-200">
              <td className="border border-gray-300 p-1 font-bold" colSpan={7}>
                Grand Total
              </td>
              <td className="border border-gray-300 p-1">
                {totalRequired.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalRedy.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalDayRequisition.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalDayReceive.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalReceive.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalBalance.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5">
          {/* <h3 className='font-bold text-xl text-left'>Buyer Wise Summary</h3> */}
          <table className="border-collapse border border-gray-300 mt-2">
            <thead>
              <tr>
                <th
                  colSpan={5}
                  className="border border-gray-300 p-1 font-bold uppercase"
                >
                  Buyer Wise Summary
                </th>
              </tr>
              <tr className="bg-lime-200 text-center">
                {summaryHeader?.map((item) => (
                  <th className="border border-gray-300 p-1">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueKeysArray?.map((key) => (
                <ReportSummary
                  key={key}
                  data={groupedByBuyer[key].items}
                  firstHeader={firstHeader}
                ></ReportSummary>
              ))}
              <tr className="text-center  bg-yellow-200">
                <td className="border border-gray-300 p-1 font-bold">Total</td>
                <td className="border border-gray-300 p-1">
                  {totalRequired.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-1">
                  {totalDayReceive.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-1">
                  {totalReceive.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-1">
                  {totalBalance.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
