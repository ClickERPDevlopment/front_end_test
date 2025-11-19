import moment from "moment";
import { IBuyerWiseYarnPossitionReport } from "../buyer-wise-yarn-possition-report-type";

export default function ReportSubGroup({ data }: { data: IBuyerWiseYarnPossitionReport[] }) {
  return (
    data?.map((_, i) => {
      return (
        i === 0 ?
          <tr>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}>{_.BUYER}	</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}>{`${_.STYLENO} (${_.STYLENAME})`}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}>{_.PONO}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}>{_.BOOKING_YARN}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}> {_.BOOKING_QTY}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}> {moment(_.BOOKING_DATE).format('DD-MMM-YYYY')}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}> {_.DELIVERYDATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.ALLOCATED_YARN}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.ALLOCATED_QTY}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs' rowSpan={data.length}> {
              (_.BOOKING_QTY - (data.reduce((p, c) => (p + c.ALLOCATED_QTY), 0))).toFixed(2)
            }	</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PI_DATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PINO}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PI_QUANTITY}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.BBLC_DATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.BBLC_NO}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.SUPPLIER}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.YARN_RECEIVED_DATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.CURRENCY}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.TOTAL_AMOUNT}</td>
          </tr>
          : <tr>
            {/* <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.BUYER}	</td>
                      <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.STYLENO}</td>
                      <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PONO}</td>
                      <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.BOOKING_YARN}</td>
                      <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.BOOKING_QTY}</td>
                      <td className='border border-gray-600 p-0.5 text-center text-xs'> {moment(_.BOOKING_DATE).format('DD-MMM-YYYY')}</td>
                      <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.DELIVERYDATE}</td> */}
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.ALLOCATED_YARN}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.ALLOCATED_QTY}</td>
            {/* <td className='border border-gray-600 p-0.5 text-center text-xs'> Balance	</td> */}
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PI_DATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PINO}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.PI_QUANTITY}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'>{_.BBLC_DATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.BBLC_NO}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.SUPPLIER}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.YARN_RECEIVED_DATE}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.CURRENCY}</td>
            <td className='border border-gray-600 p-0.5 text-center text-xs'> {_.TOTAL_AMOUNT.toFixed(2)}</td>
          </tr>
      )
    })
  )


}
