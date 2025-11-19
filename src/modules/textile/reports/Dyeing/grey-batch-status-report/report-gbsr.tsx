import {
  GreyBatchStatusReportBatchDetailsDto,
  GreyBatchStatusReportGreyRcvDtlsDto,
  GreyBatchStatusReportGreyRcvSummaryDto,
} from "./components/Interfaces";
import POColorWiseGroup from "./components/po-color-wise-group";

export interface props {
  lstBookingSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
  lstGreyRcvSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
  greyRcvDtls: GreyBatchStatusReportGreyRcvDtlsDto[];
  batchDtls: GreyBatchStatusReportBatchDetailsDto[];
}

export default function Report({
  lstBookingSummary,
  lstGreyRcvSummary,
  greyRcvDtls,
  batchDtls,
}: props) {
  const poColorIds: string[] = [];

  greyRcvDtls?.forEach((element) => {
    if (!poColorIds.includes(element.PO_ID + "_" + element.GMT_COLOR_ID)) {
      poColorIds.push(element.PO_ID + "_" + element.GMT_COLOR_ID);
    }
  });

  return (
    <>
      <div className="m-3 inline-block print:overflow-visible">
        {/* heading */}
        <div className="">
          <h3 className="text-center text-slate-700 my-1 font-bold text-2xl w-full">
            {greyRcvDtls[0]?.COMPANY_NAME}
          </h3>
          <h3 className="text-center text-slate-700 m-0 font-normal text-lg">
            {greyRcvDtls[0]?.COMPANY_ADDRESS}
          </h3>
          <div className="text-center text-slate-700 my-1 font-bold">
            <span className="bg-slate-200 px-10 py-1 text-lg">
              GREY - BATCH STATUS REPORT
            </span>
          </div>
        </div>
        {/* end heading */}

        {/* table */}
        <div className="min-w-[100%] mt-8">
          {poColorIds.map((id) => (
            <POColorWiseGroup
              lstBookingSummary={lstBookingSummary.filter(
                (d) => d.PO_ID + "_" + d.COLOR_ID === id
              )}
              lstGreyRcvSummary={lstGreyRcvSummary.filter(
                (d) => d.PO_ID + "_" + d.COLOR_ID === id
              )}
              greyRcvDtls={greyRcvDtls.filter(
                (d) => d.PO_ID + "_" + d.GMT_COLOR_ID === id
              )}
              batchDtls={batchDtls.filter(
                (d) => d.PO_ID + "_" + d.GMT_COLOR_ID === id
              )}
            />
          ))}
        </div>
        {/* end table */}
      </div>
    </>
  );
}
