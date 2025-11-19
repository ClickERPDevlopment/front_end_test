import { IAccessoriesReportWithPo } from "../accessories-report-with-po/accessories-with-po-type";
import Report from "./components/report";

function BlockAccessoriesReportFormat2({ data, searchParams }: { data: IAccessoriesReportWithPo[], searchParams: { currency: string }; }) {

  return (
    <>
      <div>
        <Report searchParams={searchParams} data={data}></Report>
      </div>
    </>
  );
}
export default BlockAccessoriesReportFormat2;
