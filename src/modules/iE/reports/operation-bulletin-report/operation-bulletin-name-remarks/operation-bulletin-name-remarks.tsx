/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinNameRemarksReportType } from "../operation-bulletin-name-remarks-report-type";

function OperationBulletinNameRemarks({
  data,
}: {
  data: OperationBulletinNameRemarksReportType[];
}) {

  //set table header
  const firstHeader = [
    "Name of Operation",
    "Presure Foot, Guide/Folder, Attachment",
  ];

  return (
    <div className="flex justify-between">
      <div className="min-w-[70%] w-fit ms-auto me-auto">
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-950 p-0.5">{item.OPERATION_NAME}</td>
                  <td className="border border-gray-950 p-0.5">{item.PRESSUREFOOT + " " + item.GUIDEFOLDER + " " + item.ATTACHMENT}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default OperationBulletinNameRemarks;
