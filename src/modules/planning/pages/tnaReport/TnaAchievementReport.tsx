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
import { fetchBuyerPO, fetchTnaBuyerList, fetchTnaPendingPO, fetchTnaPendingStyleDeliveryListByPO, fetchTnaResponsibleTeamMemberList } from '../../reduxSlices/tnaSlice';
import { setDropdownData } from '@/app/dropdownSlice';
import Panel from '@/components/layout/Panel';
import PageHeader from '@/components/layout/PageHeader';
import SelectDropdown from '@/components/form/SelectDropdown';
import { getAllPlanningWorkingTeam } from '../../reduxSlices/planningWorkingTeam.Slice';
import { fetchAllCompanies } from '@/modules/configurations/reduxSlices/companySlice';

interface SearchFormState {
    factoryId?: number;
    opMonthFrom?: string | null;
    opMonthTo?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
    buyerId?: number | null;
    styleId?: number | null;
    jobNo?: string | null;
    poNo?: string | null;
    teamId: string | null;
}

export default function TnaAchievementReport() {
    const dispatch: AppDispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.company);
    const { planningWorkingTeamList } = useSelector((state: RootState) => state.planningWorkingTeam);
    const { tnaBuyerList, tnaTeamMemberList } = useSelector((state: RootState) => state.tna);
    const { company, } = useTheme();

    useEffect(() => {
        document.title = "TNA Achievement Report";

        dispatch(fetchAllCompanies());
        dispatch(getAllPlanningWorkingTeam());
        dispatch(fetchTnaBuyerList());
        dispatch(fetchTnaResponsibleTeamMemberList());

        return () => {
            document.title = "";
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(setDropdownData({
            name: 'tnaBuyers',
            data: tnaBuyerList,
            labelKey: 'text',
            valueKey: 'id',
        }))

    }, [tnaBuyerList])

    useEffect(() => {
        dispatch(setDropdownData({
            name: 'tnaTeamMembers',
            data: tnaTeamMemberList,
            labelKey: 'text',
            valueKey: 'id',
        }))

    }, [tnaTeamMemberList])

    const [formState, setFormState] = useState<SearchFormState>({
        factoryId: company?.companyId,
        opMonthFrom: null,
        opMonthTo: null,
        buyerId: null,
        styleId: null,
        jobNo: null,
        teamId: null
    });

    const handleReset = () => {
        setFormState({
            factoryId: company?.companyId,
            opMonthFrom: null,
            opMonthTo: null,
            buyerId: null,
            styleId: null,
            jobNo: null,
            teamId: null
        });
    };

    const handleChange = (field: keyof SearchFormState, value: any) => {
        console.log(field, value)
        // Update state
        setFormState((prev) => {
            const newState = { ...prev, [field]: value };

            // Dispatch API call with updated state
            if (field === "opMonthFrom" || field === "opMonthTo") {
                dispatch(
                    fetchBuyerPO({
                        buyerId: newState.buyerId ?? undefined,
                        orderPlacement: newState.opMonthFrom ?? undefined,
                        orderPlacementTo: newState.opMonthTo ?? undefined,
                        dependFactoryId: newState.factoryId ?? undefined,
                        noFactoryDepend: false,
                    })
                );
            }
            if (field === "buyerId") {
                dispatch(
                    fetchTnaPendingPO({
                        buyerId: newState.buyerId ?? undefined,
                        orderPlacement: newState.opMonthFrom ?? undefined,
                        orderPlacementTo: newState.opMonthTo ?? undefined,
                        dependFactoryId: newState.factoryId ?? undefined,
                        noFactoryDepend: false,
                    })
                );
            }
            if (field === "poNo") {
                dispatch(
                    fetchTnaPendingStyleDeliveryListByPO({
                        pono: String(newState.poNo),
                        companyId: String(company?.companyId)
                    })
                );
            }

            return newState;
        });
    };

    const handleShowReport = () => {
        const query = new URLSearchParams(formState as unknown as Record<string, string>).toString();
        window.open(`/winapp/report/tna-achievement-report?${query}`, "_blank");
    };

    return (
        <Panel
            header={
                <PageHeader
                    title={"TNA Achievement Report"}
                />
            }
        >
            <div className='grid grid-cols-3 gap-3'>
                <div className='col-span-1'>
                    <FormField
                        className='mb-2'
                        label="Factory"
                        id="taskName" variant="inline"
                        labelFontSize="text-xs"
                        labelWidth="w-[100px]">
                        <SelectDropdown
                            options={companies}
                            value={String(company?.companyId) || ""}
                            isSameKeyValue={false}
                            labelKey="name"
                            valueKey="companyId"
                            onChange={(_, item) => console.log()}
                            className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                        />
                    </FormField>

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
                                onChange={(date) => handleChange('opMonthFrom', date?.toLocaleDateString() ?? null)}
                                selected={formState.opMonthFrom ? new Date(formState.opMonthFrom) : null}
                                dateFormat='MM/yyyy'
                            />
                            <CustomDatePicker
                                monthYearOnly
                                className='col-span-2'
                                onChange={(date) => handleChange('opMonthTo', date?.toLocaleDateString() ?? null)}
                                dateFormat="MM/yyyy"
                                selected={formState.opMonthTo ? new Date(formState.opMonthTo) : null}
                            />
                            <Button variant='filled' size='sm' className='mt-1 float-end'>
                                <FontAwesomeIcon icon={faEraser} />
                            </Button>
                        </div>
                    </FormField>

                    <FormField
                        className='mb-2'
                        label="Date"
                        id="taskName" variant="inline"
                        labelFontSize="text-xs"
                        labelWidth="w-[100px]">
                        <div className='w-full grid grid-cols-5 gap-2'>
                            <CustomDatePicker
                                className='col-span-2'
                                onChange={(date) => handleChange('fromDate', date?.toLocaleDateString() ?? null)}
                                selected={formState.fromDate ? new Date(formState.fromDate) : null}
                                dateFormat='yyyy-MM-dd'
                            />
                            <CustomDatePicker
                                className='col-span-2'
                                onChange={(date) => handleChange('toDate', date?.toLocaleDateString() ?? null)}
                                dateFormat="yyyy-MM-dd"
                                selected={formState.toDate ? new Date(formState.toDate) : null}
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
                        label="Responsible Team"
                        id="teamId" variant="inline"
                        required labelFontSize="text-xs"
                        labelWidth="w-[100px]">
                        <SelectDropdown
                            // ref={ref}
                            options={planningWorkingTeamList}
                            value={formState.teamId || ""}
                            isSameKeyValue={false}
                            labelKey='teamName'
                            valueKey='id'
                            onChange={(val) => handleChange("teamId", val)}
                            className="h-8 text-sm w-full"
                        // onKeyDown={handleKeyDown}
                        />
                    </FormField>

                    <FormField
                        className='mb-2'
                        label="Team Members"
                        id="tnaTeamMembers"
                        variant="inline"
                        labelFontSize="text-xs"
                        labelWidth="w-[100px]"
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="tnaTeamMembers"
                            inputWidth={200}
                            value={""}
                            onSelect={(val) => handleChange('styleId', val)} />
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

