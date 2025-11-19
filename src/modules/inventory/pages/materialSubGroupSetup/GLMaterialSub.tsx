import Button from '@/components/form/Button';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import React from 'react';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { addDepreciationRow, clearDepreciationRows, removeDepreciationRow, updateMaterialSubGroupLedgerField } from '../../reduxSlices/materialsubgroupSlice';
import Checkbox from '@/components/form/Checkbox';
import SelectDropdown from '@/components/form/SelectDropdown';
import { MSGCompanyNameOptions } from '@/types/global';
import DropdownAutoSuggest from '@/components/form/DropdownAutoSuggest';
import { IMaterialSubGroupLedger } from './materialsubgroup.interface';

const GLMaterialSub = () => {

    const dispatch: AppDispatch = useDispatch();
    const { materialSubGroupLedger, error, message, validationErrors } = useSelector((state: RootState) => state.materialSubGroup);
    const { companies } = useSelector((state: RootState) => state.company);

    const handleChange = (key: keyof IMaterialSubGroupLedger, value: string | boolean, displayValue?: string) => {
        dispatch(
            updateMaterialSubGroupLedgerField({
                key: key,
                value: value,
                displayValue: displayValue
            })
        );
    };

    const tableRows = materialSubGroupLedger.depreciationRows ?? [];
    const handleAddRow = () => {
        if (!materialSubGroupLedger.deprefield_1 || !materialSubGroupLedger.deprefield_2) return;
        dispatch(
            addDepreciationRow({
                ledgerId: materialSubGroupLedger.deprefield_1,
                ledger: materialSubGroupLedger.deprefield_1_display,
                percentage: Number(materialSubGroupLedger.deprefield_2),
            })
        );
    };

    const handleCheckAlert = (val: boolean) => {
        if (val && tableRows.length > 0) {
            const confirmed = window.confirm(
                "Current Asset checkbox has been checked!\n\nExisting depreciation rows will be cleared. Do you want to proceed?"
            );
            if (confirmed) {
                dispatch(clearDepreciationRows());
            }
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-row gap-5'>
                    <Checkbox
                        id='isFixedAsset'
                        label={`Is Fixed Asset`}
                        checked={materialSubGroupLedger.isFixedAsset}
                        onChange={(val) => handleChange("isFixedAsset", val)}
                        size='small'
                    ></Checkbox>
                    <Checkbox
                        id='isCurrentAsset'
                        label='Is Current Asset'
                        checked={materialSubGroupLedger.isCurrentAsset}
                        onChange={(val) => {
                            handleChange("isCurrentAsset", val);
                            handleCheckAlert(val);
                        }}
                        size='small'
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <FormField
                        label="Company"
                        id="CompanyName"
                        variant="block"
                        error={validationErrors?.companyName}
                    >
                        <SelectDropdown
                            options={companies}
                            value={materialSubGroupLedger.companyId.toString()}
                            isSameKeyValue={false}
                            labelKey='name'
                            valueKey='companyId'
                            onChange={(val) => handleChange("companyId", val)}
                            className="h-8 text-sm w-full"
                        />
                    </FormField>
                    <FormField
                        label="Inventory Stock Account"
                        id="InventoryStockAccount"
                        variant="block"
                        error={validationErrors?.inventoryStockAccount}
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialSubGroupLedger.inventoryStockAccount}
                            onSelect={(val, displayVal) => handleChange('inventoryStockAccountId', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Item Expense Account"
                        id="ItemExpenseAccount"
                        variant="block"
                        error={validationErrors?.itemExpenseAccount}
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialSubGroupLedger.itemExpenseAccount}
                            onSelect={(val, displayVal) => handleChange('itemExpenseAccountId', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Item Convert Account"
                        id="ItemConvertAccount"
                        variant="block"
                        error={validationErrors?.itemConvertAccount}
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialSubGroupLedger.itemConvertAccount}
                            onSelect={(val, displayVal) => handleChange('itemConvertAccountId', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Depreciation Account"
                        id="DepreciationAccount"
                        variant="block"
                        error={validationErrors?.depreciationAccount}
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialSubGroupLedger.depreciationAccount}
                            onSelect={(val, displayVal) => handleChange('depreciationAccountId', val, displayVal)} />
                    </FormField>
                </div>
                <div className='flex flex-row gap-5'>
                    <FormField
                        label=""
                        id=""
                        variant="block"
                        error={validationErrors?.isYearlyDepreciation}
                    >
                        <Checkbox
                            id='isYearlyDepreciation'
                            label='is Yearly Depreciation'
                            checked={materialSubGroupLedger.isYearlyDepreciation}
                            onChange={(val) => handleChange("isYearlyDepreciation", val)}
                            size='small'
                        ></Checkbox>
                    </FormField>
                    <FormField
                        label=""
                        id=""
                        variant="block"
                        error={validationErrors?.isMonthlyDepreciation}
                    >
                        <Checkbox
                            id='isMonthlyDepreciation'
                            label='is Monthly Depreciation'
                            checked={materialSubGroupLedger.isMonthlyDepreciation}
                            onChange={(val) => handleChange("isMonthlyDepreciation", val)}
                            size='small'
                        ></Checkbox>
                    </FormField>
                </div>
                <FormField
                    label="Depreciation Percentage %"
                    id="DepreciationPercentage"
                    variant="block"
                    error={validationErrors?.depreciationPercentage}
                >
                    <SimpleInputBox
                        value={materialSubGroupLedger.depreciationPercentage.toString()}
                        onChange={(val) => handleChange("depreciationPercentage", val)}
                        id="depriciationpercentage"
                        type="number"
                        placeholder="Depreciation Percentage"
                        className="w-full"
                        disabled={materialSubGroupLedger.isCurrentAsset}
                    />
                </FormField>
                <div className='grid grid-cols-4 gap-2'>
                    <DropdownAutoSuggest
                        className="h-8 w-full col-span-2"
                        name="ledgerAccounts"
                        disabled={materialSubGroupLedger.isCurrentAsset}
                        inputWidth={200}
                        value={materialSubGroupLedger.deprefield_1_display}
                        onSelect={(val, displayVal) => {
                            handleChange('deprefield_1', val, displayVal);
                        }}
                    />
                    <SimpleInputBox
                        value={materialSubGroupLedger.deprefield_2.toString()}
                        onChange={(val) => handleChange("deprefield_2", val)}
                        id="deprefield_2"
                        type="number"
                        disabled={materialSubGroupLedger.isCurrentAsset}
                        placeholder=""
                        className="w-full"
                    />
                    <div className='col-span-1'>
                        <Button
                            variant='filled'
                            className=''
                            size='sm'
                            disabled={materialSubGroupLedger.isCurrentAsset}
                            onClick={handleAddRow}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>
                    <div className='col-span-4'>
                        <table className="min-w-full mt-4 border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Ledger</th>
                                    <th className="border border-gray-300 px-4 py-2 w-[100px]">%</th>
                                    <th className="border border-gray-300 px-4 py-2 w-[100px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{row.ledger}</td>
                                        <td className="text-center border border-gray-300 px-4 py-2">{row.percentage}</td>
                                        <td className="text-center border border-gray-300 px-4 py-2 w-[100px]">
                                            <Button
                                                onClick={() => dispatch(removeDepreciationRow(row.ledgerId))}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GLMaterialSub;