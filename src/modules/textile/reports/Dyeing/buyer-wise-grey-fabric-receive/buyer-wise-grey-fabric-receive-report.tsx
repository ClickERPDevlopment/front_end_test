import moment from "moment";
import { BuyerWiseGreyFabricReceiveType } from "./buyer-wise-grey-fabric-receive-type";

export default function BuyerWiseGreyFabricReceiveReport({
  data,
}: {
  data: BuyerWiseGreyFabricReceiveType[];
}) {
  function GetTableType() {
    const tableType: number[] = [];
    data.forEach((element) => {
      if (!tableType.includes(element.IS_SUBCONTACT)) {
        tableType.push(element.IS_SUBCONTACT);
      }
    });
    return tableType;
  }
  return (
    <div className="container">
      <h1 className="text-3xl text-center font-bold m-2">
        {data[0]?.COMPANY_NAME}
      </h1>
      <h2 className="text-center  font-bold m-2">{data[0]?.COMPANY_ADDRESS}</h2>
      <h3 className="text-center  font-bold m-2">
        BUYER WISE GREY FABRIC RECEIVE SUMMARY REPORT
      </h3>
      <h6 id="BALANCE_DATE" className="text-center  font-bold m-3">
        {data[0]?.START_DATE
          ? moment(data[0].START_DATE).format("DD-MMM-YY")
          : null}
        {" to "}
        {data[0]?.END_DATE
          ? moment(data[0].END_DATE).format("DD-MMM-YY")
          : null}
      </h6>
      <div>
        <table className="w-full border border-black">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1">SL</th>
              <th className="border border-black p-1">Buyer / Party Name</th>
              <th className="border border-black p-1">Grey Receive Qty (kg)</th>
              <th className="border border-black p-1">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {GetTableType().map((type) => (
              <BuyerWiseGreyFabricReceive_BuyerType
                data={data.filter((d) => d.IS_SUBCONTACT === type)}
              />
            ))}
            <TotalRow data={data} typeId={3} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BuyerWiseGreyFabricReceive_BuyerType({
  data,
}: {
  data: BuyerWiseGreyFabricReceiveType[];
}) {
  return (
    <>
      {data.map((d, index) => (
        <tr>
          <td className="border border-black p-1 text-center">{index + 1}</td>
          <td className="border border-black p-1">{d.BUYER_PARTY}</td>
          <td className="border border-black p-1 text-center">{d.QUANTITY}</td>
          <td className="border border-black p-1 text-center"></td>
        </tr>
      ))}
      <TotalRow data={data} typeId={data[0]?.IS_SUBCONTACT} />
    </>
  );
}

function TotalRow({
  data,
  typeId,
}: {
  data: BuyerWiseGreyFabricReceiveType[];
  typeId: number;
}) {
  return (
    <tr className="bg-slate-200">
      <td className="border border-black p-1 text-center font-bold" colSpan={2}>
        {typeId === 0
          ? "Inside Total"
          : typeId === 1
          ? "Subcontract Total"
          : "Grand Total"}
      </td>
      <td className="border border-black p-1 text-center font-bold ">
        {data.reduce((p, c) => p + c.QUANTITY, 0).toFixed(2)}
      </td>
      <td className="border border-black p-1 text-center"></td>
    </tr>
  );
}
