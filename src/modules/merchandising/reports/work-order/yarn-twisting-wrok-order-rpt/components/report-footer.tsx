import { ToWords } from "to-words";
import { YarnTwistingWorkOrderReportType } from "../yarn-twisting-wrok-order-rpt-type";

function ReportFooter({
  masterData,
}: {
  masterData: YarnTwistingWorkOrderReportType[] | null;
}) {

  const toWords = new ToWords({
    localeCode: 'en-BD',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      currencyOptions: {
        name: 'Dollar',
        plural: 'Dollar',
        symbol: '$',
        fractionalUnit: {
          name: 'Cent',
          plural: 'Cents',
          symbol: '¢',
        },
      },
    },
  })

  const totalAmount = masterData?.reduce((p, c) => p + Number(c.TOTAL_AMOUNT), 0);
  if (masterData)
    return (
      <div className="flex flex-col mt-5">
        <p>IN WORD($): {toWords.convert(Number(totalAmount))}</p>
        <p>NOTE: {masterData[0]?.NOTE}</p>
        <p>REMARKS: {masterData[0]?.REMARKS}</p>
      </div>
    );
}

export default ReportFooter;
