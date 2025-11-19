/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-array-constructor */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IAccessoriesReport } from "../accessories-report-type";
import moment from "moment";

function Report({ data, isShipDateShow }: { data: IAccessoriesReport[], isShipDateShow: boolean }) {
  //set table header
  const firstHeader = [
    "STYLE",
    "PO/JOB",
    "MATERIAL NAME",
    "GMT COLOR",
    "MTL COLOR",
  ];

  const secondHeader = [
    "GMT SIZE",
    "MTL SIZE",
    "GMT QTY",
    "EXT. (%)",
    "CONZ",
    "WO QTY",
    "UOM",
    "CURRENCY",
    "RATE",
    "AMOUNT",
    "DESCRIPTION 1",
    "DESCRIPTION 2",
    isShipDateShow && "SHIP DATE",
  ].filter(Boolean) as string[];


  const uniqueSizes: Set<string> = new Set();



  data.forEach((item) => {
    if (item.GMT_SIZE_NAME != null) uniqueSizes.add(item.GMT_SIZE_NAME);
  });

  const sizeHeader = new Array();

  return (
    <div>
      <div className="p-2">
        <ReportHeader masterData={data[0]} />

        {
          data[0]?.REVICE_DATE &&
          <div className="mt-2">
            <p style={{ fontSize: "12px" }}>
              <span className="font-bold">Revision No#</span>{data[0]?.REVICE_NO} <span className="font-bold ms-2">Revision Date:</span> {data[0]?.REVICE_DATE && moment(data[0]?.REVICE_DATE).format("DD-MMM-YY")}<span className="font-bold ms-2">Revision Reason:</span> {data[0]?.REVICE_REASON}
            </p>
          </div>
        }

        <div></div>
        <ReportTable
          data={data}
          firstHeader={firstHeader}
          sizeHeader={sizeHeader}
          secondHeader={secondHeader}
          isShipDateShow={isShipDateShow}
        ></ReportTable>
        <div className="mt-3">
          <p><span className="font-bold">Note:</span> Please mention the Work Order Number in the Delivery Challan and PI.</p>
          <p><span className="font-bold">Remarks:</span> {data[0]?.REMARKS}</p>
        </div>
        <div>
          <ReportFooter masterData={data[0]}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
