import { AppDispatch, RootState } from '@/app/store';
import Button from '@/components/form/Button';
import CustomDatePicker from '@/components/form/CustomDatePicker';
import DropdownAutoSuggest from '@/components/form/DropdownAutoSuggest';
import { FormField } from '@/components/form/FormField'
import SelectDropdown from '@/components/form/SelectDropdown';
import { useTheme } from '@/hooks/useTheme'
import { faCheck, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyerPO, fetchTnaPendingPO, fetchTnaPendingStyleDeliveryListByPO, updatePOStyleField, updateTnaMasterByPOStyleIndex } from '../../reduxSlices/tnaSlice';
import { setDropdownData } from '@/app/dropdownSlice';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import { IPOStyle } from './tna.interface';
import { formatDate } from '@/utils/dateUtil';


interface SearchFormState {
    factoryId?: number;
    opMonthFrom?: string | null;
    opMonthTo?: string | null;
    buyerId?: number | null;
    styleId?: number | null;
    jobNo?: string | null;
    poNo?: string | null;
}

export default function SearchForm() {
    const dispatch: AppDispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.company);
    const { buyerPOResponse, poItemList, pendingPoStyleList, } = useSelector((state: RootState) => state.tna);
    const { company, } = useTheme();

    useEffect(() => {
        console.log(buyerPOResponse)
        if (buyerPOResponse.buyer) {
            dispatch(setDropdownData({
                name: 'tnaBuyers',
                data: buyerPOResponse.buyer,
                labelKey: 'text',
                valueKey: 'id',
            }))
        }

        if (buyerPOResponse.style) {
            dispatch(setDropdownData({
                name: 'tnaStyles',
                data: buyerPOResponse.style,
                labelKey: 'text',
                valueKey: 'id',
            }));
        }

    }, [buyerPOResponse])

    useEffect(() => {
        dispatch(setDropdownData({
            name: 'poItemList',
            data: poItemList,
            labelKey: 'text',
            valueKey: 'id',
        }));
    }, [poItemList])

    const [formState, setFormState] = useState<SearchFormState>({
        factoryId: company?.companyId,
        opMonthFrom: null,
        opMonthTo: null,
        buyerId: null,
        styleId: null,
        jobNo: null,
    });

    const handleReset = () => {
        setFormState({
            factoryId: company?.companyId,
            opMonthFrom: null,
            opMonthTo: null,
            buyerId: null,
            styleId: null,
            jobNo: null,
        });
    };

    const handleChange = (field: keyof SearchFormState, value: any) => {
        console.log(field, value)
        // Update state
        setFormState((prev) => {
            let newState: SearchFormState = {};
            newState = { ...prev, [field]: value };
            if (field === "opMonthFrom" || field === "opMonthTo") {
                newState = { ...prev, [field]: formatDate(value, "db_format") };
            } 
            

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

    const handleChangeDate = (key: keyof IPOStyle, value: any, index: number) => {
        dispatch(updatePOStyleField({ key, value, index }));
    }

    const detailsColumns: Column<IPOStyle>[] = [
        { key: 'Pono', header: 'PO', align: 'left', width: 'w-[150px]' },
        { key: 'StyleNo', header: 'Style', align: 'left', width: 'w-[150px]' },
        { key: 'PoQty', header: 'Qty', align: 'left', width: 'w-[100px]' },
        { key: 'P_DeliveryDate', header: 'Ship Date', align: 'left', width: 'w-[100px]' },
        {
            key: 'SewingStart', header: 'Sewing Start', align: 'left', width: 'w-[150px]', paddingNone: true,
            render: (_item, index) => (
                <CustomDatePicker
                    onChange={(date) => handleChangeDate('SewingStart', date ?? null, index)}
                    selected={_item.SewingStart ? new Date(_item.SewingStart) : null}
                    dateFormat='yyyy-MM-dd'
                />
            ),
        },
        {
            key: 'SewingEnd', header: 'Sewing End', align: 'left', width: 'w-[150px]', paddingNone: true,
            render: (_item, index) => (
                <CustomDatePicker
                    onChange={(date) => handleChangeDate('SewingEnd', date ?? null, index)}
                    selected={_item.SewingEnd ? new Date(_item.SewingEnd) : null}
                    dateFormat='yyyy-MM-dd'
                />
            ),
        },
        {
            key: 'action', header: '', align: 'left', width: 'w-[80px]', paddingNone: true,
            render: (_item, index) => (
                <Button size='sm' onClick={() => dispatch(updateTnaMasterByPOStyleIndex({ index }))}>
                    <FontAwesomeIcon icon={faCheck} /> Confirm
                </Button>
            ),
        },
    ];


    // fetchBuyerPO
    return (
        <div className='grid grid-cols-2 '>
            <div className='col-span-1'>
                <FormField
                    
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
                    
                    label="Style"
                    id="setectedTemplate"
                    variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]"
                >
                    <DropdownAutoSuggest
                        className="h-8"
                        name="tnaStyles"
                        inputWidth={200}
                        value={""}
                        onSelect={(val) => handleChange('styleId', val)} />
                </FormField>


                <FormField
                    
                    label="Search Job No."
                    id="setectedTemplate"
                    variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]"
                >
                    <DropdownAutoSuggest
                        className="h-8"
                        name="tnaTemplates"
                        inputWidth={200}
                        value={""}
                        onSelect={(val) => handleChange('jobNo', val)} />
                </FormField>

                <FormField
                    
                    label="PO No."
                    id="setectedTemplate"
                    variant="inline"
                    labelFontSize="text-xs"
                    labelWidth="w-[100px]"
                >
                    <DropdownAutoSuggest
                        className="h-8"
                        name="poItemList"
                        inputWidth={200}
                        value={""}
                        onSelect={(val, displayVal) => handleChange('poNo', displayVal)} />
                </FormField>

            </div>
            <div className='col-span-2'>
                <CustomDataTable
                    columns={detailsColumns}
                    data={pendingPoStyleList}
                    fixedHeight="h-[200px]"
                />
            </div>
        </div>
    )
}

