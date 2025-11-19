import { AppDispatch, RootState } from '@/app/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import Checkbox from '@/components/form/Checkbox';
import { updateBuyerField } from '../../reduxSlices/buyer.Slice';
import { IBuyer } from './buyerSetup.interface';
import SelectDropdown from '@/components/form/SelectDropdown';
import { useDashboardActions } from '@/layouts/DashboardLayout';
import { ActionButtons, ActionType } from '@/components/layout/ActionButtons';

const BuyerBasicSetup = () => {
    const dispatch: AppDispatch = useDispatch();
    const { buyers, buyer, error, message, validationErrors } = useSelector((state: RootState) => state.buyer);
    const { countries, country } = useSelector((state: RootState) => state.country);

    const handleChange = (key: keyof IBuyer, value: string, displayValue?: string) => {
        dispatch(
            updateBuyerField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IBuyer, value: boolean) => {
        dispatch(
            updateBuyerField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <div className='grid grid-cols-1'>
            <div className='lg:grid grid-cols-3 gap-2'>
                <FormField
                    label="Buyer Code"
                    id="buyerCode"
                    variant="block"
                    error={validationErrors?.buyerCode}
                >
                    <SimpleInputBox
                        value={buyer.buyerCode}
                        onChange={(val) => handleChange("buyerCode", val)}
                        id="buyerCode"
                        placeholder="Buyer Code"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <FormField
                    label="Buyer Name"
                    id="buyerName"
                    variant="block"
                    error={validationErrors?.buyerName}
                >
                    <SimpleInputBox
                        value={buyer.buyerName}
                        onChange={(val) => handleChange("buyerName", val)}
                        id="buyerName"
                        placeholder="Buyer Name"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <FormField
                    label="Buyer Display Name"
                    id="displayName"
                    variant="block"
                    error={validationErrors?.displayName}
                >
                    <SimpleInputBox
                        value={buyer.displayName}
                        onChange={(val) => handleChange("displayName", val)}
                        id="displayName"
                        placeholder="Buyer Display Name"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <FormField
                    label="Contact No"
                    id="contactNo"
                    variant="block"
                    error={validationErrors?.contactNo}
                >
                    <SimpleInputBox
                        value={buyer.contactNo}
                        onChange={(val) => handleChange("contactNo", val)}
                        id="contactNo"
                        placeholder="Contact No"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <FormField
                    label="Email"
                    id="email"
                    variant="block"
                    error={validationErrors?.email}
                >
                    <SimpleInputBox
                        value={buyer.email}
                        onChange={(val) => handleChange("email", val)}
                        id="email"
                        placeholder="Email"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <FormField
                    label="Buying Commission"
                    id="buyingComission"
                    variant="block"
                    error={validationErrors?.buyingCommission}
                >
                    <SimpleInputBox
                        value={buyer.buyingCommission}
                        onChange={(val) => handleChange("buyingCommission", val)}
                        id="buyingComission"
                        placeholder="Buying commission"
                        className="w-full"
                        type='number'
                    />
                </FormField>

                <FormField
                    label="Main Buyer"
                    id="mainBuyerId"
                    variant="block"
                    error={validationErrors?.mainBuyerId}
                >
                    {/* drop down */}
                    <SimpleInputBox
                        value={buyer.mainBuyerId}
                        onChange={(val) => handleChange("mainBuyerId", val)}
                        id="mainBuyerId"
                        placeholder="Main Buyer"
                        className="w-full"
                        type='number'
                    />
                </FormField>

                <FormField
                    label="Country"
                    id="countryId"
                    variant="block"
                    error={validationErrors?.countryId}
                >
                    {/* drop down */}
                    <SelectDropdown
                        options={countries}
                        value={buyer.countryId.toString()}
                        isSameKeyValue={false}
                        labelKey="countryName"
                        valueKey="id"
                        onChange={(val, item) => handleChange('countryId', val)}
                        className="text-sm w-full bg-white dark:bg-gray-800"
                    />
                </FormField>

                <FormField
                    label="Symbolic Name"
                    id="symbolicName"
                    variant="block"
                    error={validationErrors?.symbolicName}
                >
                    <SimpleInputBox
                        value={buyer.symbolicName}
                        onChange={(val) => handleChange("symbolicName", val)}
                        id="symbolicName"
                        placeholder="Symbolic Name"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <FormField
                    label="Address"
                    id="address"
                    variant="block"
                    error={validationErrors?.address}
                >
                    <SimpleInputBox
                        value={buyer.address}
                        onChange={(val) => handleChange("address", val)}
                        id="address"
                        placeholder="Address"
                        className="w-full"
                        type='text'
                    />
                </FormField>

                <div className='flex gap-5 mt-6'>
                    <FormField
                        label=""
                        id="isNoStartFromZero"
                        variant="block"
                        error={validationErrors?.isNoStartFromZero}
                    >
                        <Checkbox
                            id="isNoStartFromZero"
                            label="Always Bundle No Start from Zero"
                            checked={buyer.isNoStartFromZero}
                            onChange={(val) => handleCheckboxChange("isNoStartFromZero", val)}
                            size="small"
                        ></Checkbox>
                    </FormField>

                    <FormField
                        label=""
                        id="isActive"
                        variant="block"
                        error={validationErrors?.isActive}
                    >
                        <Checkbox
                            id="isActive"
                            label="Is Active"
                            checked={buyer.isActive}
                            onChange={(val) => handleCheckboxChange("isActive", val)}
                            size="small"
                        ></Checkbox>
                    </FormField>
                </div>
            </div>
        </div >
    );
};

export default BuyerBasicSetup;