import { GreyFabricIssueToDyeingChallanType_Details } from '../grey-fabric-issue-to-dyeing-challan-type'

export default function ReportBody({ data }: { data: GreyFabricIssueToDyeingChallanType_Details[] | null | undefined }) {

    const fabrics = [...new Set(data?.map(item => item.FABRIC))]; // [ 'A', 'B']

    return (
        <div className='min-w-full mt-5 font-bold'>
            <table className='min-w-full'>
                <thead>
                    <tr>
                        <th className='p-1 text-center border border-gray-600' colSpan={6}>Description</th>

                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>M/C Dia</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>Fin. Dia</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>GSM</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>S/L</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>Roll Qty</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>Grey Qty</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>UOM</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>PCS</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>Store</th>
                        <th className='p-1 text-center border border-gray-600' rowSpan={2}>Remarks</th>
                    </tr>
                    <tr>
                        <th className='p-1 text-center border border-gray-600'>Yarn Lot</th>
                        <th className='p-1 text-center border border-gray-600'>Brnad</th>
                        <th className='p-1 text-center border border-gray-600'>Yarn</th>
                        <th className='p-1 text-center border border-gray-600'>Part</th>
                        <th className='p-1 text-center border border-gray-600'>Color</th>
                        <th className='p-1 text-center border border-gray-600'>Color Code</th>
                    </tr>
                </thead>
                <tbody>
                    {fabrics?.map((fabric, findex) => {
                        return (
                            <>
                                <tr key={findex}>
                                    <td className='p-1 border border-gray-600 text-start bg-gray-300' colSpan={16}>
                                        {fabric}
                                    </td>
                                </tr>
                                {data?.filter(f => f.FABRIC === fabric).map((ele, i) =>
                                    <tr key={i}>
                                        <td className='p-1 text-center border border-gray-600'>{ele.YARN_LOT_NUMBER}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.YARN_BRAND}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.YARN}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.FABRIC_PART}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.GMT_COLOR}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.COLOR_CODE}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.MC_DIA}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.FINISH_DIA}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.GSM}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.STITCH_LENGTH}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.ROLL_QTY}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.GREY_WEIGHT}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.UOM}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.PCS}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.PCS}</td>
                                        <td className='p-1 text-center border border-gray-600'>{ele.DETAILS_REMARKS}</td>
                                    </tr>
                                )}
                            </>
                        )
                    }
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th className='p-1 text-center border border-gray-600' colSpan={10}>Total</th>
                        <th className='p-1 text-center border border-gray-600'>
                            {
                                data?.reduce((p, c) => p + Number(c.ROLL_QTY), 0)
                            }
                        </th>
                        <th className='p-1 text-center border border-gray-600'>
                            {
                                data?.reduce((p, c) => p + Number(c.GREY_WEIGHT), 0)
                            }
                        </th>
                        <th className='p-1 text-center border border-gray-600' colSpan={4}></th>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
