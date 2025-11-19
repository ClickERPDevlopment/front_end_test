import Button from '@/components/form/Button';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import React from 'react';
import { IFactoryLedger } from './section.interface';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFactoryLedgerField } from '../../reduxSlices/sectionSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const AccountsDetails = () => {

    const dispatch: AppDispatch = useDispatch();
    const { factoryLedger, error, message, validationErrors } = useSelector((state: RootState) => state.section);

    const handleChange = (key: keyof IFactoryLedger, value: string, displayValue?: string) => {
        dispatch(
            updateFactoryLedgerField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <>
            {/* Factory Name */}
            <FormField
                label="Factory Name"
                id="FactoryName"
                variant="block"
                error={validationErrors?.factoryName}
            >
                <SimpleInputBox
                    value={factoryLedger.factoryName}
                    onChange={(val) => handleChange("factoryName", val)}
                    id="code"
                    type="text"
                    placeholder="Factory Name"
                    className="w-full"
                />
            </FormField>
            {/* Inventory Stock Account */}
            <FormField
                label="Inventory Stock Account"
                id="InventoryStockAccount"
                variant="block"
                error={validationErrors?.inventoryStockLedgerName}
            >
                <SimpleInputBox
                    value={factoryLedger.inventoryStockLedgerName}
                    onChange={(val) => handleChange("inventoryStockLedgerName", val)}
                    id="code"
                    type="text"
                    placeholder="Inventory Stock Account"
                    className="w-full"
                />
            </FormField>
            {/* Inventory Work in Process tock Account */}
            <FormField
                label="Inventory Work in Process Stock Account"
                id="IWIPSAccount"
                variant="block"
                error={validationErrors?.inventoryWIPStockLedgerName}
            >
                <SimpleInputBox
                    value={factoryLedger.inventoryWIPStockLedgerName}
                    onChange={(val) => handleChange("inventoryWIPStockLedgerName", val)}
                    id="code"
                    type="text"
                    placeholder="Inventory Work in Process Stock Account"
                    className="w-full"
                />
            </FormField>
            {/* Expense Account */}
            <FormField
                label="Expense Account"
                id="ExpenseAccount"
                variant="block"
                error={validationErrors?.expenseLedgerName}
            >
                <SimpleInputBox
                    value={factoryLedger.expenseLedgerName}
                    onChange={(val) => handleChange("expenseLedgerName", val)}
                    id="code"
                    type="text"
                    placeholder="Expense Account"
                    className="w-full"
                />
            </FormField>

            <div className="flex flex-col gap-4 mt-4">
                <Button
                    size="sm"
                    className="px-4 py-2 bg-blue-600 text-white rounded justify-end hover:bg-blue-700 w-1/3">
                    <FontAwesomeIcon icon={faAdd} /> Add
                </Button>
            </div>

        </>
    );
};

export default AccountsDetails;