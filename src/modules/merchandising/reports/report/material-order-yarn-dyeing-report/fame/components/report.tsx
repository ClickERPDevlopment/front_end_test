/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { ToWords } from 'to-words';
import { IMaterialOrderYarnDyeingReport } from "../../material-order-yarn-dyeing-report-type";


function Report({
  data,
}: {
  data: IMaterialOrderYarnDyeingReport[];
}) {

  const toWords = new ToWords({
    localeCode: 'en-BD',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      currencyOptions: {
        name: 'Taka',
        plural: 'Taka',
        symbol: '৳',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paisa',
          symbol: '',
        },
      },
    },
  })


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IMaterialOrderYarnDyeingReport[],
    keys: string[]
  ) {
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

  interface GroupedByDate {
    [key: string]: {
      items: IMaterialOrderYarnDyeingReport[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Style",
    "PO",
    "MTL Name",
    "GMT Color",
    "MTL Color",
    "UOM",
    "WO Qty",
    // "Issue Qty",
    // "Balance",
    "Price ($)",
    "Amount",
  ];

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.WORK_ORDER_QTY),
    0
  );

  // const totalIsseQty = data?.reduce(
  //   (acc, item) => acc + Number(item.ISSUE_QTY),
  //   0
  // );


  const totalAmount = data?.reduce(
    (acc, item) => acc + Number(item.WORK_ORDER_QTY * item.SUPPLIER_RATE_PER_PCS),
    0
  );

  return (
    <div style={{ fontFamily: "Calibri, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3 gap-3">
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">WORKORDER NO</td>
                  <td className="align-top">: {data[0]?.WORK_ORDER_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">ISSUE DATE</td>
                  <td className="align-top">: {moment(data[0]?.ISSUE_DATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">DELIVERY DATE</td>
                  <td className="align-top">: {moment(data[0]?.DELIVERY_DATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">RECEIVE STORE</td>
                  <td className="align-top">: {data[0]?.RCV_STORE}</td>
                </tr>
                <tr>
                  <td className="align-top">CONTACT PERSON</td>
                  <td className="align-top">: {data[0]?.STORE_PERSONNEL}</td>
                </tr>
                <tr>
                  <td className="align-top">MOBILE NUMBER</td>
                  <td className="align-top">: {data[0]?.MOBILE_NO}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">BUYER NAME</td>
                  <td className="align-top">: {data[0]?.BUYER_NAME}</td>
                </tr>
                <tr>
                  <td className="align-top">SUPPLIER NAME</td>
                  <td className="align-top">: {data[0]?.SUPPLIER_NAME}</td>
                </tr>
                <tr>
                  <td className="align-top">ATTENTION</td>
                  <td className="align-top">: {data[0]?.ATTENTION}</td>
                </tr>
                <tr>
                  <td className="align-top">MOBILE NUMBER</td>
                  <td className="align-top">: {data[0]?.SUPPLIER_MOBILE_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">SUPPLIER ADDRESS</td>
                  <td className="align-top">: {data[0]?.SUPPLIER_ADDRESS}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-1">
          <label htmlFor="" className="font-bold">Subject: {data[0]?.WO_SUBJECT}</label>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
            <tr style={{ fontSize: "11px" }} className="font-bold">
              <td colSpan={6} className="border border-gray-950 p-0.5 text-center">Total</td>
              <td className="border border-gray-950 p-0.5  text-center">{totalQuantiy.toFixed(2)}</td>
              {/* <td className="border border-gray-950 p-0.5">{totalIsseQty.toFixed(2)}</td> */}
              {/* <td className="border border-gray-950 p-0.5">{(totalQuantiy - totalIsseQty).toFixed(2)}</td> */}
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5  text-center">{totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <p style={{ fontSize: "12px" }} className="font-bold mt-2">IN WORD: {toWords.convert(Number(totalAmount.toFixed(2)))}</p>
          <p style={{ fontSize: "12px" }} className="font-bold">NOTE: Please proceed bulk after approval from concern merchandiser.</p>
          <p style={{ fontSize: "12px" }} className="font-bold">REMARKS:{data[0]?.REMARKS}</p>
        </div>

        <div className="mt-[30px]"></div>

        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
