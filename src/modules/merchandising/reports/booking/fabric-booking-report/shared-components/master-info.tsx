import moment from 'moment'
import { FabricBookingReportDto_MasterData } from '../fabric-booking-type'
import { useEffect, useState } from 'react';
import useApiUrl from '@/hooks/use-ApiUrl';
import Skeleton from 'react-loading-skeleton';



export default function MasterInfo({ masterData, children }: { masterData?: FabricBookingReportDto_MasterData, children?: React.ReactNode }) {
    const [imageSrc, setImageSrc] = useState<string>();
    const api = useApiUrl();

    useEffect(() => {
        console.log('styleid', masterData?.STYLEID);
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${masterData?.STYLEID}`
                );
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageSrc(url);
                } else {
                    console.error("Failed to fetch image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [api.ProductionUrl, masterData?.STYLEID]);

    return (
        <div className='relative'>
            <h1 className='text-right absolute right-0 top-0'>{moment(masterData?.CONS_DATE).format('D-MMM-yy')}</h1>
            <h1 className='text-[2.5rem] font-bold text-center mb-3'>{masterData?.COMPANY_NAME}</h1>
            <h3 className='text-xl font-bold text-center'>FABRICS BOOKING SHEET</h3>
            {children}
            <div className='flex gap-10 mt-3 justify-between' >
                <div className='flex flex-1 justify-between gap-5'>
                    <table className='flex flex-1'>
                        <tbody>
                            <tr>
                                <td className='font-bold'>Job No.</td>
                                <td className='value_colum'>: {masterData?.PONO}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Buyer PO</td>
                                <td className='value_colum'>: {masterData?.SUB_PONO}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Style</td>
                                <td className='value_colum'>: {masterData?.STYLENAME}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Item Type</td>
                                <td className='value_colum'>: {masterData?.ITEMTYPE}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Buyer Name</td>
                                <td className='value_colum'>: {masterData?.BUYER_NAME}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Lead Time</td>
                                <td className='value_colum'>: {moment(masterData?.SHIPMENT_DATE).diff(moment(masterData?.RECEIVE_DATE), 'days')} Days</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>B.Release Date</td>
                                <td className='value_colum'>: {moment(masterData?.CREATED_DATE).format("D-MMM-yy")}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Fabric Source</td>
                                <td className='value_colum'>: {masterData?.FABRIC_SOURCE}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='table_two'>
                        <tbody>
                            <tr>
                                <td className='font-bold'>Order Qty</td>
                                <td className='value_colum'>: {masterData?.ORDER_QTY}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Shipment Date</td>
                                <td className='value_colum'>: {moment(masterData?.SHIPMENT_DATE).format('D-MMM-yy')}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Po Rcv Date</td>
                                <td className='value_colum'>: {moment(masterData?.RECEIVE_DATE).format('D-MMM-yy')}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Season</td>
                                <td className='value_colum'>: {masterData?.SESSIONNO}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Dealing Merchant</td>
                                <td className='value_colum'>: {masterData?.DEALMERCHANDISERNAME}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Embellishment</td>
                                <td className='value_colum'>: {masterData?.EMBELLISHMENT}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Update Date</td>
                                {masterData?.UPDATED_DATE ?
                                    <td className='value_colum'>
                                        : {moment(masterData?.UPDATED_DATE).format('D-MMM-yy')}
                                    </td> :
                                    <td>: </td>
                                }
                            </tr>

                        </tbody>
                    </table>
                </div >

                <div className="flex-1 max-w-[150px] aspect-square border border-gray-500 rounded-lg flex justify-center items-center overflow-hidden p-1">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="GMT image"
                            className="w-full h-auto max-h-full object-contain"
                        />
                    ) : (
                        <Skeleton width={200} height={200} />
                    )}
                </div>

            </div >
        </div >
    )
}
