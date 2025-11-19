import Button from '@/components/form/Button';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import React from 'react';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { addDepreciationRow, clearDepreciationRows, removeDepreciationRow, updateMaterialGroupLedgerField } from '../../reduxSlices/materialgroup.Slice';
import Checkbox from '@/components/form/Checkbox';
import DropdownAutoSuggest from '@/components/form/DropdownAutoSuggest';
import { IMaterialGroupLedger } from '../materialGroupSetup/materialgroup.interface';

const GLMaterial = () => {
    const dispatch: AppDispatch = useDispatch();
    const { materialGroupLedger, error, message, validationErrors } = useSelector((state: RootState) => state.materialGroup);

    const handleChange = (key: keyof IMaterialGroupLedger, value: string | boolean, displayValue?: string) => {
        dispatch(
            updateMaterialGroupLedgerField({
                key: key,
                value: value,
                displayValue: displayValue
            })
        );
    };

    const tableRows = materialGroupLedger.depreciationRows ?? [];

    const handleAddRow = () => {
        if (!materialGroupLedger.deprefield_1 || !materialGroupLedger.deprefield_2)
            return;
        dispatch(
            addDepreciationRow({
                ledgerId: materialGroupLedger.deprefield_1,
                ledger: materialGroupLedger.deprefield_1_display,
                percentage: Number(materialGroupLedger.deprefield_2),
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
                        checked={materialGroupLedger.isFixedAsset}
                        onChange={(val) => handleChange("isFixedAsset", val)}
                        size='small'
                    ></Checkbox>
                    <Checkbox
                        id='isCurrentAsset'
                        label='Is Current Asset'
                        checked={materialGroupLedger.isCurrentAsset}
                        onChange={(val) => {
                            handleChange("isCurrentAsset", val);
                            handleCheckAlert(val);
                        }}
                        size='small'
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <FormField
                        label="Inventory Stock Account"
                        id="InventoryStockAccount"
                        variant="block"
                        error={validationErrors?.inventoryStockAccount}
                    >
                        <DropdownAutoSuggest
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialGroupLedger.inventoryStockAccount}
                            onSelect={(val, displayVal) => handleChange('inventoryStockAccountId', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Item Expense Account"
                        id="ItemExpenseAccount"
                        variant="block"
                        error={validationErrors?.itemExpenseAccount}
                    >
                        <DropdownAutoSuggest
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialGroupLedger.itemExpenseAccount}
                            onSelect={(val, displayVal) => handleChange('itemExpenseAccountId', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Item Convert Account"
                        id="ItemConvertAccount"
                        variant="block"
                        error={validationErrors?.itemConvertAccount}
                    >
                        <DropdownAutoSuggest
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialGroupLedger.itemConvertAccount}
                            onSelect={(val, displayVal) => handleChange('itemConvertAccountId', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Depreciation Account"
                        id="DepreciationAccount"
                        variant="block"
                        error={validationErrors?.depreciationAccount}
                    >
                        <DropdownAutoSuggest
                            name="ledgerAccounts"
                            inputWidth={200}
                            value={materialGroupLedger.depreciationAccount}
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
                            checked={materialGroupLedger.isYearlyDepreciation}
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
                            checked={materialGroupLedger.isMonthlyDepreciation}
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
                        value={materialGroupLedger.depreciationPercentage.toString()}
                        onChange={(val) => handleChange("depreciationPercentage", val)}
                        id="depriciationpercentage"
                        type="number"
                        placeholder="Depreciation Percentage"
                        className="w-full"
                        disabled={materialGroupLedger.isCurrentAsset}
                    />
                </FormField>
                <div className='grid grid-cols-4 gap-2'>
                    <DropdownAutoSuggest
                        className="w-full col-span-2"
                        name="ledgerAccounts"
                        disabled={materialGroupLedger.isCurrentAsset}
                        inputWidth={200}
                        value={materialGroupLedger.deprefield_1_display}
                        onSelect={(val, displayVal) => {
                            handleChange('deprefield_1', val, displayVal);
                        }}
                    />
                    <SimpleInputBox
                        value={materialGroupLedger.deprefield_2.toString()}
                        onChange={(val) => handleChange("deprefield_2", val)}
                        id="deprefield_2"
                        type="number"
                        disabled={materialGroupLedger.isCurrentAsset}
                        placeholder=""
                        className="w-full"
                    />
                    <div className='col-span-1'>
                        <Button
                            variant='filled'
                            className=''
                            size='sm'
                            disabled={materialGroupLedger.isCurrentAsset}
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

export default GLMaterial;