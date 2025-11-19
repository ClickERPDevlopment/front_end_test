import React from 'react';
import { TimelineTask } from './timeline.Interface';

type Props = {
    data: TimelineTask;
};

export default function TaskDetailsData({ data }: Props) {
    const { item, breakdowns, duration, start_day, start_hour, line_index, uid, } = data;

    return (
        <div className=" max-w-4xl flex-col mx-auto max-h-[calc(100vh-100px)] bg-white rounded-2xl">

            <div className="grid grid-cols-1 h-[150px] sm:grid-cols-2 gap-4 mb-6">
                <div className='space-y-2'>
                    <Info label="Buyer" value={item.buyer_name} />
                    <Info label="PO No. #" value={item.po_no} />
                    <Info label="Style" value={item.style_no} />
                    <Info label="Unit" value={'pcs'} />
                    <Info label="SMV" value={item.smv.toString()} />
                    <Info label="Strip Qty" value={item.strip_qty.toString()} />
                </div>
                <div className='space-y-2'>
                    <Info label="Learning Curve" value={item.learning_curve_name} />
                    <Info label="Start Day Index" value={start_day.toString()} />
                    <Info label="Start Hour" value={start_hour.toFixed(2)} />
                    <Info label="Duration (days)" value={duration.toFixed(2)} />
                    <Info label="Line Index" value={line_index.toString()} />
                    <Info label="UID" value={uid.toString()} />
                    <Info label="Delivery Date" value={item.delivery_date} />
                </div>
            </div>

            <div className="flex1">
                <h3 className="text-12-8 font-semibold text-gray-700 mb-2">Breakdown</h3>
                <div className="border border-gray-200 rounded overflow-hidden">
                    {/* Sticky Header Table */}
                    {/* Table Wrapper */}
                    <div className=" rounded-lg overflow-hidden shadow-sm">
                        {/* Header */}
                        <table className="min-w-full text-sm text-left text-gray-700 table-fixed">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-600 sticky top-0 z-10">
                                <tr>
                                    <th className="w-2/12 px-3 py-2 font-semibold border-b border-gray-200">Day</th>
                                    <th className="w-2/12 px-3 py-2 font-semibold border-b border-gray-200">Efficiency (%)</th>
                                    <th className="w-2/12 px-3 py-2 font-semibold border-b border-gray-200">Output</th>
                                    <th className="w-2/12 px-3 py-2 font-semibold border-b border-gray-200">Cumulative</th>
                                    <th className="w-2/12 px-3 py-2 font-semibold border-b border-gray-200">Hours</th>
                                    <th className="w-2/12 px-3 py-2 font-semibold border-b border-gray-200">Day Index</th>
                                </tr>
                            </thead>
                        </table>

                        {/* Scrollable Body */}
                        <div className="overflow-y-auto max-h-60">
                            <table className="min-w-full text-sm text-left text-gray-700 table-fixed border-collapse">
                                <tbody>
                                    {breakdowns.map((entry, i) => (
                                        <tr
                                            key={i}
                                            className={`transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                } hover:bg-blue-50`}
                                        >
                                            <td className="w-2/12 px-3 py-2 border-b border-gray-200">{entry.day}</td>
                                            <td className="w-2/12 px-3 py-2 border-b border-gray-200">{entry.efficiency}%</td>
                                            <td className="w-2/12 px-3 py-2 border-b border-gray-200">{entry.output}</td>
                                            <td className="w-2/12 px-3 py-2 border-b border-gray-200">{entry.cumulative}</td>
                                            <td className="w-2/12 px-3 py-2 border-b border-gray-200">{entry.hour.toFixed(2)}</td>
                                            <td className="w-2/12 px-3 py-2 border-b border-gray-200">{entry.day_index}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center gap-1 text-sm text-gray-800">
            <span className="text-gray-500">{label}:</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

