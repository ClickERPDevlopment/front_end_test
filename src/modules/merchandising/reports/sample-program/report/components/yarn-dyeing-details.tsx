import { SampleProgramReportDto_YarnDyeingDetails } from '../sample-program-report.-type'

export default function YarnDyeingDetails({ lstYarnDyeingDetails }: { lstYarnDyeingDetails?: SampleProgramReportDto_YarnDyeingDetails[] }) {

    const uniqueFabricCombos = Array.from(
        new Map(
            lstYarnDyeingDetails
                ?.filter(item => item.BODY_PARTS && item.FABRIC_COLOR && item.FABRIC_QTY_KG)
                .map(item => [
                    `${item.BODY_PARTS}__${item.FABRIC_COLOR}__${item.FABRIC_QTY_KG}`, // composite key
                    { BODY_PARTS: item.BODY_PARTS, FABRIC_COLOR: item.FABRIC_COLOR, FABRIC_QTY_KG: item.FABRIC_QTY_KG, }
                ])
        ).values()
    );

    const getDetails = (ele: {
        BODY_PARTS: string;
        FABRIC_COLOR: string;
        FABRIC_QTY_KG: number;
    }) =>
        lstYarnDyeingDetails?.filter(y =>
            y.BODY_PARTS == ele.BODY_PARTS &&
            y.FABRIC_COLOR == ele.FABRIC_COLOR &&
            y.FABRIC_QTY_KG == ele.FABRIC_QTY_KG);

    if (lstYarnDyeingDetails) {
        return lstYarnDyeingDetails?.length <= 0 ? null :
            (<div className='mt-5 flex'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={9} className='p-1 min-w-36 border border-gray-600 text-center'>Yarn Dyeing Details</th>
                        </tr>
                        <tr>
                            <th className='p-1 min-w-36 border border-gray-600 text-center'>BODY PARTS</th>
                            <th className='p-1 min-w-36 border border-gray-600 text-center'>FABRIC COLOR</th>
                            <th className='p-1 min-w-36 border border-gray-600 text-center'>FABRIC QTY (KG)</th>
                            <th className='p-1 min-w-36 border border-gray-600 text-center'>Y/D COLOR</th>
                            <th className='p-1 min-w-36 border border-gray-600 text-center'>YARN QTY (KG)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueFabricCombos?.map((ele) =>
                            getDetails(ele)?.map((dtls, i) =>
                                i == 0 ?
                                    <tr>
                                        <td className='p-1 border border-gray-600 text-center' rowSpan={getDetails(ele)?.length}>{ele.BODY_PARTS}</td>
                                        <td className='p-1 border border-gray-600 text-center' rowSpan={getDetails(ele)?.length}>{ele.FABRIC_COLOR}</td>
                                        <td className='p-1 border border-gray-600 text-center' rowSpan={getDetails(ele)?.length}>{ele.FABRIC_QTY_KG}</td>

                                        <td className='p-1 border border-gray-600 text-center'>{dtls.YD_COLOR}</td>
                                        <td className='p-1 border border-gray-600 text-center'>{dtls.YARN_QTY_KG}</td>
                                    </tr>
                                    :
                                    <tr>
                                        <td className='p-1 border border-gray-600 text-center'>{dtls.YD_COLOR}</td>
                                        <td className='p-1 border border-gray-600 text-center'>{dtls.YARN_QTY_KG}</td>
                                    </tr>
                            )
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className='p-1 border border-gray-600 text-center' colSpan={2}>Total</th>
                            <th className='p-1 border border-gray-600 text-center'>
                                {
                                    uniqueFabricCombos?.reduce((p, c) => p + Number(c.FABRIC_QTY_KG), 0).toFixed(2)
                                }
                            </th>
                            <th className='p-1 border border-gray-600 text-center'></th>
                            <th className='p-1 border border-gray-600 text-center'>
                                {
                                    lstYarnDyeingDetails?.reduce((p, c) => p + Number(c.YARN_QTY_KG), 0).toFixed(2)
                                }
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            )
    }
}
