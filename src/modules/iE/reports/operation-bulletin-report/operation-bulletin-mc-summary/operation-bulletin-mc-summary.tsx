/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function OperationBulletinMCSummary({
  data,
}: {
  data: OperationBulletinReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  const uniqueMachine: Set<string> = new Set();

  data.forEach((item) => {
    if (item.MACHINENAME != null) uniqueMachine.add(item.MACHINENAME);
  });

  const machineHeader = Array.from(uniqueMachine);

  function groupBy(data: OperationBulletinReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          MACHINENAME: item.MACHINENAME,
          SMV: item.SMV,
          MACHINE: {},
          MACHINESMV: {},
        };
      }

      if (!result[key].MACHINE[item.MACHINENAME]) {
        result[key].MACHINE[item.MACHINENAME] = 0;
      }

      if (!result[key].MACHINESMV[item.MACHINENAME]) {
        result[key].MACHINESMV[item.MACHINENAME] = 0;
      }

      result[key].MACHINE[item.MACHINENAME] += Number(item.ALLOTTEDMP);
      result[key].MACHINESMV[item.MACHINENAME] += Number(item.SMV);

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      MACHINENAME: string;
      MACHINE: { [key: string]: number };
      MACHINESMV: { [key: string]: number };
    };
  }



  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let header = machineHeader;


  return (
    <table style={{ fontSize: "12px" }} className="border-collapse border border-gray-300  mt-3">
      <thead className="" style={{ backgroundColor: "#A7F3D0" }}>
        <tr>
          <th className="border border-gray-950 p-0.5">Machine</th>
          {header?.map((item) => (
            <th className="border border-gray-950 p-0.5">{item}</th>
          ))}
        </tr>
      </thead>

      <tbody style={{ fontSize: "12px" }}>
        {uniqueKeysArray?.map((key) => (
          <tr key={key}>
            <td className="border border-gray-950 p-0.5 text-center">
              Qty
            </td>
            {machineHeader?.map((machine) => {
              return (
                <td className="border border-gray-950 p-0.5 text-center">
                  {groupedData[key].MACHINE[machine]}
                </td>
              );
            })}
          </tr>
        ))}

        {uniqueKeysArray?.map((key) => (
          <tr key={key}>
            <td className="border border-gray-950 p-0.5 text-center">
              SMV
            </td>
            {machineHeader?.map((machine) => {
              return (
                <td className="border border-gray-950 p-0.5 text-center">
                  {groupedData[key].MACHINESMV[machine].toFixed(2)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OperationBulletinMCSummary;
