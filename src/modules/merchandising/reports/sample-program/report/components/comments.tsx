import { SampleProgramReportDto_CommentsType } from '../sample-program-report.-type'

export default function Comments({ lstComments }: { lstComments?: SampleProgramReportDto_CommentsType[] }) {
    if (lstComments) {
        return lstComments?.length <= 0 ? null :
            (
                <div className='mt-5 flex flex-col'>
                    <h1 className='font-bold underline'>Comments</h1>
                    <ul>
                        {lstComments?.map((ele, i) =>
                            <li>
                                <span>{i + 1}. </span>
                                <span>{ele.COMMENTS}</span>
                            </li>
                        )}
                    </ul>
                </div>
            )
    }
}
