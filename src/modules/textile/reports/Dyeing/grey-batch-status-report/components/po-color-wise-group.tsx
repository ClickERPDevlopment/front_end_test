import GreyRcvChallanGroup from "./grey-challan-group";
import BatchTable from "./batch-table";
import GreyRcvTotalRow from "./grey-rcv-total";
import PoColorWiseGroupSummaryTable from "./po-color-wise-group-summary";
import {
  GreyBatchStatusReportBatchDetailsDto,
  GreyBatchStatusReportGreyRcvDtlsDto,
  GreyBatchStatusReportGreyRcvSummaryDto,
} from "./Interfaces";

export interface props {
  lstBookingSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
  lstGreyRcvSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
  greyRcvDtls: GreyBatchStatusReportGreyRcvDtlsDto[];
  batchDtls: GreyBatchStatusReportBatchDetailsDto[];
}

export default function POColorWiseGroup({
  lstBookingSummary,
  lstGreyRcvSummary,
  greyRcvDtls,
  batchDtls,
}: props) {
  const greyChallanIds: number[] = [];

  greyRcvDtls?.forEach((e) => {
    if (!greyChallanIds.includes(e.RCV_CHALLAN_ID)) {
      greyChallanIds.push(e.RCV_CHALLAN_ID);
    }
  });

  function getTotlGreyQty(): number {
    let qty = 0;
    greyRcvDtls.forEach((element) => {
      qty += element.QUANTITY;
    });
    return Number(qty.toFixed(2));
  }

  return (
    <>
      {/* GREY RECEIVE */}
      <div className="flex gap-5 my-1">
        <div>
          <span className="text-sm">
            <strong>ORDER NO: </strong>{" "}
          </span>
          <span className="text-sm">{greyRcvDtls[0]?.PONO}</span>
        </div>
        <div>
          <span className="text-sm">
            <strong>SEASON: </strong>{" "}
          </span>
          <span className="text-sm">{greyRcvDtls[0]?.SEASON}</span>
        </div>
        <div>
          <span className="text-sm">
            <strong>COLOR: </strong>{" "}
          </span>
          <span className="text-sm">{greyRcvDtls[0]?.GMT_COLOR}</span>
        </div>
        <div>
          <span className="text-sm">
            <strong>TOTAL REQUIRED QTY(kg)[A]: </strong>{" "}
          </span>
          <span className="text-sm">{greyRcvDtls[0]?.PO_COLOR_REQ_QTY}</span>
        </div>
        <div>
          <span className="text-sm">
            <strong>TOTAL RECEIVE(kg)[B]: </strong>{" "}
          </span>
          <span className="text-sm">{getTotlGreyQty()}</span>
        </div>
        <div>
          <span className="text-sm">
            <strong>BALANCE(kg)[A-B]: </strong>{" "}
          </span>
          <span className="text-sm">
            {(
              (greyRcvDtls[0]?.PO_COLOR_REQ_QTY
                ? greyRcvDtls[0]?.PO_COLOR_REQ_QTY
                : 0) - getTotlGreyQty()
            ).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div>
          <PoColorWiseGroupSummaryTable
            lstBookingSummary={lstBookingSummary}
            lstGreyRcvSummary={lstGreyRcvSummary}
          />
        </div>

        <div className="mt-2">
          <table className="w-full">
            <thead className="bg-green-300">
              <tr>
                <th colSpan={12} className="text-sm border border-black">
                  Details
                </th>
              </tr>
              <tr>
                <th className="text-xs border border-black p-2 min-w-28">
                  GREY RCV DATE
                </th>
                <th className="text-xs border border-black p-2 min-w-28">
                  RCV CHALLAN NO
                </th>
                <th className="text-xs border border-black p-2 min-w-32">
                  BUYER
                </th>
                <th className="text-xs border border-black p-2 min-w-48">
                  FABRIC
                </th>
                <th className="text-xs border border-black p-2 min-w-24">
                  GSM
                </th>
                <th className="text-xs border border-black p-2 min-w-32">
                  COLOR
                </th>
                <th className="text-xs border border-black p-2">YARN COUNT</th>
                <th className="text-xs border border-black p-2">YARN BRAND</th>
                <th className="text-xs border border-black p-2">YARN LOT</th>
                <th className="text-xs border border-black p-2">DIA</th>
                <th className="text-xs border border-black p-2">SHAPE</th>
                <th className="text-xs border border-black p-2">
                  GREY RCV QTY (KG)
                </th>
              </tr>
            </thead>
            <tbody>
              {greyChallanIds.map((id) => (
                <GreyRcvChallanGroup
                  key={Math.random()}
                  greyRcvDtls={greyRcvDtls.filter(
                    (d) => d.RCV_CHALLAN_ID === id
                  )}
                />
              ))}
              <GreyRcvTotalRow greyRcvDtls={greyRcvDtls} title="GRAND TOTAL" />
            </tbody>
          </table>
        </div>
        {/* END GREY RECEIVE */}

        {/* BATCH DETAILS */}
        <div className="my-3">
          <BatchTable batchDtls={batchDtls} />
        </div>
        {/* END BATCH DETAILS */}
      </div>

      <hr style={{ backgroundColor: "green", height: "4px" }} />
    </>
  );
}
