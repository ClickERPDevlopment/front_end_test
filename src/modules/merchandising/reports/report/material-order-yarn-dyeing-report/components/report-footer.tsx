import { IMaterialOrderYarnDyeingReport } from "../material-order-yarn-dyeing-report-type";

function ReportFooter({ data }: { data: IMaterialOrderYarnDyeingReport[] }) {
  return (
    <div className="flex flex-col">
      <div className="border flex flex-col my-3 p-2 w-[500px]">
        <label htmlFor="" className="font-bold text-sm mb-2">
          PREPARED BY
        </label>
        <div className="flex flex-row mb-2">
          <label
            htmlFor=""
            className="font-bold text-sm w-[150px] text-right pr-2 "
          >
            SIGNATURE:
          </label>
          <div className="border-b flex-1">
            <span>{ }</span>
          </div>
        </div>
        <div className="flex flex-row mb-2 ">
          <label
            htmlFor=""
            className="font-bold text-sm w-[150px] text-right pr-2"
          >
            NAME:
          </label>
          <div className="border-b flex-1">
            <span className="text-sm">{data[0]?.PREPARED_BY}</span>
          </div>
        </div>
        <div className="flex flex-row">
          <label
            htmlFor=""
            className="font-bold text-sm w-[150px] text-right pr-2"
          >
            DESIGNATION:
          </label>
          <div className="border-b flex-1">
            <span className="text-sm">{data[0]?.PREPARED_BY_DESG}</span>
          </div>
        </div>
      </div>
      <div>
        <span className="text-xs font-bold">
          NOTE: THIS IS A COMPUTER GENERATED DOCUMENT AND DOES NOT NEED ANY
          SIGNATURE.
        </span>
      </div>

      <div className="mt-20 mb-5">
        <table className="w-full mt-5">
          <thead>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-center">
                <span className="border-t border-gray-950 px-2">
                  Sr. Merchandiser
                </span>
              </td>
              <td className="text-center">
                <span className="border-t border-gray-950 px-2">
                  Mer. Manager
                </span>
              </td>
              <td className="text-center">
                <span className="border-t border-gray-950 px-2">
                  AGM. Mer & Marketing
                </span>
              </td>
              <td className="text-center">
                <span className="border-t border-gray-950 px-2">
                  ED
                </span>
              </td>
              <td className="text-center">
                <span className="border-t border-gray-950 px-2">
                  COO
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportFooter;
