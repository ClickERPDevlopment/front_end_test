/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
// import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { ICompensationClaimMasterType } from "../compensation-claim-report-type";
import { ToWords } from "to-words";

function Report({
  data,
}: {
  data: ICompensationClaimMasterType | undefined;
}) {
  const firstHeader = [
    "SL",
    "Material Name",
    "Claim Qty",
    "UOM",
    "Claim Amount/Unit",
    "Claim Amount",
    "Claim Details",
    "Action Taken",
  ];

  const secondHeader = ["SL", "Buyer", "Style", "PO"];

  // const totalDamageQty = data?.ClaimDetails?.reduce(
  //   (acc, item) => acc + item.QUANTITY_DAMAGED,
  //   0
  // );

  const totalClaimAmount = data?.ClaimDetails?.reduce(
    (acc, item) => acc + item.CLAIM_AMOUNT,
    0
  );

  const toWords = new ToWords();

  return (
    <div className="text-[13px] font-sans text-gray-950 print:text-black">
      <ReportHeader />

      {/* Top Info Section */}
      <div className="flex justify-between border-b border-gray-950 pb-2 mb-2">
        <div>
          <table className="text-sm leading-tight">
            <tbody>
              <tr>
                <td className="font-semibold pr-2">Date: {moment(data?.CLAIM_DATE).format("DD-MMM-YY")}</td>
                <td></td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Managing Director<br></br>
                  <span style={{ fontSize: "14px" }}>{data?.RELATED_SUPPLIER_NAME}</span>
                </td>
                <td> </td>
              </tr>
              <tr>
                <td style={{ fontSize: "12px" }} className="font-semibold pr-2">{data?.SUPPLIER_ADDRESS}
                </td>
                <td> </td>
              </tr>
              <tr className="font-bold" style={{ fontSize: "14px" }}>
                <td className="pt-4">Subject: Claim Letter</td>
                <td className="pt-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <table className="text-sm leading-tight font-bold">
            <tbody>
              <tr>
                <td className="pr-2">SI NO:</td>
                <td>{data?.CLAIM_ID}</td>
              </tr>
              {/* <tr>
                <td className="font-semibold pr-2">Claim Date:</td>
                <td>{moment(data?.CLAIM_DATE).format("DD-MMM-YY")}</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remarks Section */}
      <div className="mt-4 mb-2">
        <p className="mb-1 font-bold">Dear Sir,</p>
        <div className="whitespace-pre-wrap">{data?.REMARKS}</div>
      </div>


      {/* Related Orders */}
      {data?.RelatedOrders && data.RelatedOrders.length > 0 && (
        <table className="border border-gray-950 border-collapse w-1/2 mt-5 text-center">
          <thead>
            <tr className="bg-gray-100">
              {secondHeader.map((item, index) => (
                <th key={index} className="border border-gray-950 px-2 py-1 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.RelatedOrders.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-950 py-1">{index + 1}</td>
                <td className="border border-gray-950">{item.BUYER_NAME}</td>
                <td className="border border-gray-950">{item.STYLE_NAME}</td>
                <td className="border border-gray-950">{item.PO_NO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      {/* Claim Details Table */}
      <table className="w-full border border-gray-950 border-collapse mt-4 text-center">
        <thead>
          <tr className="bg-gray-100" style={{ fontSize: "14px" }}>
            {firstHeader.map((item, index) => (
              <th key={index} className="border border-gray-950 px-2 py-1 font-semibold">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.ClaimDetails?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-950 py-1">{index + 1}</td>
              <td className="border border-gray-950 text-left px-2">{item.MATERIAL_NAME}</td>
              <td className="border border-gray-950">{item.QUANTITY_DAMAGED}</td>
              <td className="border border-gray-950">{item.UOM}</td>
              <td className="border border-gray-950">{item.CLAIM_AMOUNT_PER_UNIT}</td>
              <td className="border border-gray-950">{item.CLAIM_AMOUNT}</td>
              <td className="border border-gray-950 text-left px-2">{item.DAMAGE_DETAILS}</td>
              <td className="border border-gray-950 text-left px-2">{item.ACTION_TAKEN}</td>
            </tr>
          ))}

          {/* Total Row */}
          <tr className="font-semibold bg-gray-100" style={{ fontSize: "14px" }}>
            <td colSpan={2} className="border border-gray-950">
              Total
            </td>
            <td className="border border-gray-950">{ }</td>
            <td className="border border-gray-950"></td>
            <td className="border border-gray-950"></td>
            <td className="border border-gray-950">{totalClaimAmount}</td>
            <td className="border border-gray-950" colSpan={3}></td>
          </tr>
        </tbody>
      </table>


      {/* Additional Notes */}
      {data?.ADDITIONAL_NOTES && (
        <div className="mt-4">

          <div className="whitespace-pre-wrap">  <p ><span className="font-bold">Additional Note:</span> {data.ADDITIONAL_NOTES}</p> </div>
        </div>
      )}

      <div className="mt-2">
        <p>
          We claimed a total amount of{" "}
          <span className="font-bold">
            {totalClaimAmount?.toLocaleString("en-BD")} (
            {toWords.convert(totalClaimAmount || 0).toUpperCase()} TAKA ONLY)
          </span>{" "}
          against our claim. Please do the needful and oblige with your supreme
          cooperation.
        </p>
      </div>

      {/* Footer */}
      {/* <div className="mt-8">
        <ReportFooter data={data} />
      </div> */}
    </div>
  );
}

export default Report;
