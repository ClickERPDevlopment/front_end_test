import { AppDispatch, RootState } from '@/app/store';
import Button from '@/components/form/Button';
import CustomDatePicker from '@/components/form/CustomDatePicker';
import DropdownAutoSuggest from '@/components/form/DropdownAutoSuggest';
import { FormField } from '@/components/form/FormField'
import { useTheme } from '@/hooks/useTheme'
import { faEraser, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDropdownData } from '@/app/dropdownSlice';
import Panel from '@/components/layout/Panel';
import PageHeader from '@/components/layout/PageHeader';
import { fetchTnaBuyerList, fetchTnaJobList } from '../../reduxSlices/tnaSlice';

interface ReportFilter {
    startDate: string;
    endDate: string;
    jobNo: string;
    buyerId: string;
}

export default function TnaDetailReport() {
    const dispatch: AppDispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.company);
    const { tnaJobList, tnaBuyerList } = useSelector((state: RootState) => state.tna);
    const { company, } = useTheme();

    const [form, setForm] = useState<ReportFilter>({
        startDate: "",
        endDate: "",
        jobNo: "",
        buyerId: ""
    });

    useEffect(() => {
        document.title = "TNA Detail Report";

        dispatch(fetchTnaJobList());
        dispatch(fetchTnaBuyerList());

        return () => {
            document.title = "";
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(setDropdownData({
            name: 'tnaJobs',
            data: tnaJobList,
            labelKey: 'text',
            valueKey: 'id',
        }))

    }, [tnaJobList])

    useEffect(() => {
        dispatch(setDropdownData({
            name: 'tnaBuyers',
            data: tnaBuyerList,
            labelKey: 'text',
            valueKey: 'id',
        }))

    }, [tnaBuyerList])

    const handleChange = (field: keyof ReportFilter, value: any) => {
        console.log(field, value)
        // Update state
        setForm((prev) => {
            const newState = { ...prev, [field]: value };

            // Dispatch API call with updated state
            if (field === "endDate" || field === "startDate") {
                // dispatch(
                //     fetchBuyerPO({
                //         buyerId: newState.buyerId ?? undefined,
                //         orderPlacement: newState.opMonthFrom ?? undefined,
                //         orderPlacementTo: newState.opMonthTo ?? undefined,
                //         dependFactoryId: newState.factoryId ?? undefined,
                //         noFactoryDepend: false,
                //     })
                // );
            }

            return newState;
        });
    };

    const handleShowReport = () => {
        const query = new URLSearchParams(form as unknown as Record<string, string>).toString();
        window.open(`/winapp/report/tna-detail-report?${query}`, "_blank");
    };

    return (
        <Panel
            header={
                <PageHeader
                    title={"TNA Detail Report"}
                />
            }
        >
            <div className='grid grid-cols-3 gap-3'>
                <div className='col-span-1'>
                    <FormField
                        className='mb-2'
                        label="O.P Month"
                        id="taskName" variant="inline"
                        labelFontSize="text-xs"
                        labelWidth="w-[100px]">
                        <div className='w-full grid grid-cols-5 gap-2'>
                            <CustomDatePicker
                                monthYearOnly
                                className='col-span-2'
                                onChange={(date) => handleChange('startDate', date?.toISOString().split('T')[0] ?? null)}
                                selected={form.startDate ? new Date(form.startDate) : null}
                                dateFormat='MM/yyyy'
                            />
                            <CustomDatePicker
                                monthYearOnly
                                className='col-span-2'
                                onChange={(date) => handleChange('endDate', date?.toISOString().split('T')[0] ?? null)}
                                dateFormat="MM/yyyy"
                                selected={form.endDate ? new Date(form.endDate) : null}
                            />
                            <Button variant='filled' size='sm' className='mt-1 float-end'>
                                <FontAwesomeIcon icon={faEraser} />
                            </Button>
                        </div>
                    </FormField>

                    <FormField
                        className='mb-2'
                        label="Buyer"
                        id="setectedTemplate"
                        variant="inline"
                        labelFontSize="text-xs"
                        labelWidth="w-[100px]"
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="tnaBuyers"
                            inputWidth={200}
                            value={""}
                            onSelect={(val) => handleChange('buyerId', val)} />
                    </FormField>

                    <FormField
                        className='mb-2'
                        label="Job No."
                        id="setectedTemplate"
                        variant="inline"
                        labelFontSize="text-xs"
                        labelWidth="w-[100px]"
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="tnaJobs"
                            inputWidth={200}
                            value={""}
                            onSelect={(val) => handleChange('jobNo', val)} />
                    </FormField>

                    <div className='float-end'>
                        <Button onClick={handleShowReport} variant='filled'
                            size="sm" className=' text-black' >
                            <FontAwesomeIcon icon={faFileLines} /> Show
                        </Button>
                    </div>

                </div>

            </div>
        </Panel>
    )
}

