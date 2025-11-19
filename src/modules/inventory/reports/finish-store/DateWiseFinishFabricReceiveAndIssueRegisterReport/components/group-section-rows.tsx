import React from 'react'
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from '../DateWiseFinishFabricReceiveAndIssueRegisterReport-type';
import TableRow from './table-row';
import TotalRow from './total-row';

export default function GroupSectionRows({
    data,
}: {
    data: DateWiseFinishFabricReceiveAndIssueRegisterReportType[];
}) {
    return (
        <>
            {data?.map((ele, index) => (
                <TableRow index={index} ele={ele} key={index} />
            ))}
            <TotalRow data={data} title='Fabric Color Wise Sub Total' />
        </>
    )
}
