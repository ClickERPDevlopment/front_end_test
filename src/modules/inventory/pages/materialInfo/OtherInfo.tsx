import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import { updateMaterialSubGroupField } from '../../reduxSlices/materialsubgroupSlice';
import { IMaterialGroup } from '../materialGroupSetup/materialgroup.interface';
import { updateMaterialGroupField } from '../../reduxSlices/materialgroup.Slice';
import { IMaterialSubGroup } from '../materialSubGroupSetup/materialsubgroup.interface';
import { updateMaterialInfoField } from '../../reduxSlices/materialInfo.Slice';
import { IMaterial } from './materialinfo.interface';
import SelectDropdown from '@/components/form/SelectDropdown';
import { ICompany } from '@/modules/configurations/pages/companySetup/company.interface';
import { updateCompanyField } from '@/modules/configurations/reduxSlices/companySlice';

const OtherInfo = () => {

    const dispatch: AppDispatch = useDispatch();

    const { materialGroup, error, message, validationErrors } = useSelector((state: RootState) => state.materialGroup);
    const { materialSubGroup } = useSelector((state: RootState) => state.materialSubGroup);
    const { material } = useSelector((state: RootState) => state.material);
    const { companies, company } = useSelector((state: RootState) => state.company);
    const { sections } = useSelector((state: RootState) => state.section);

    const handleChange = (key: keyof IMaterialGroup | keyof IMaterialSubGroup | keyof IMaterial | keyof ICompany, value: string, displayValue?: string) => {
        // Dispatch to materialgroup only if key is in IMaterialGroup
        if (key in materialGroup) {
            dispatch(
                updateMaterialGroupField({
                    key: key as keyof IMaterialGroup,
                    value: value,
                })
            );
        }
        // Dispatch to materialsubgroup only if key is in IMaterialSubGroup
        if (key in materialSubGroup) {
            dispatch(
                updateMaterialSubGroupField({
                    key: key as keyof IMaterialSubGroup,
                    value: value,
                })
            );
        }
        if (key in material) {
            dispatch(
                updateMaterialInfoField({
                    key: key as keyof IMaterial,
                    value: value,
                })
            );
        }
        if (key in company) {
            dispatch(
                updateCompanyField({
                    key: key as keyof ICompany,
                    value: value,
                })
            );
        }
    };

    const handleCheckboxChange = (key: keyof IMaterialGroup | keyof IMaterial, value: boolean) => {
        if (key in materialGroup) {
            dispatch(
                updateMaterialGroupField({
                    key: key as keyof IMaterialGroup,
                    value: value,
                })
            );
        }
        if (key in material) {
            dispatch(
                updateMaterialInfoField({
                    key: key as keyof IMaterial,
                    value: value,
                })
            );
        }
    };

    // const handleRadioChange = (key: keyof IMaterialSubGroup, checked: boolean, value: string | number) => {
    //     dispatch(
    //         updateMaterialSubGroupField({
    //             key: key,
    //             value: +value
    //         })
    //     );
    // };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='grid grid-cols-1 gap-2'>

                {/* Material */}
                <FormField
                    label="Material"
                    id="name"
                    variant="inline"
                    error={validationErrors?.type}
                >
                    <SimpleInputBox
                        value={materialGroup.type}
                        onChange={(val) => handleChange("type", val)}
                        id="name"
                        type="text"
                        placeholder="Material Name"
                        className="w-full"
                    />
                </FormField>

                {/* Company */}
                <FormField
                    label="Company"
                    id="companies"
                    variant="inline"
                    error={validationErrors?.name}
                >
                    <SelectDropdown
                        options={companies}
                        value={material.companyId.toString()}
                        isSameKeyValue={false}
                        labelKey="name"
                        valueKey="companyId"
                        onChange={(val) => handleChange('companyId', val)}
                        className="h-8 text-sm w-full bg-white dark:bg-gray-800"
                    />
                </FormField>

                {/* Reorder Point */}
                <FormField
                    label="Reorder Point"
                    id="reorderPoint"
                    variant="inline"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={material.reorderPoint}
                        onChange={(val) => handleChange("reorderPoint", val)}
                        id="reorderPoint"
                        type="number"
                        placeholder="Reorder Point"
                        className="w-full"
                    />
                </FormField>

                {/* Rate */}
                <FormField
                    label="Reorder Point"
                    id="rate"
                    variant="inline"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={material.rate}
                        onChange={(val) => handleChange("rate", val)}
                        id="rate"
                        type="text"
                        placeholder="Rate"
                        className="w-full"
                    />
                </FormField>

                {/* Consumption Qty */}
                <FormField
                    label="Consumption Qty"
                    id="consumptionQty"
                    variant="inline"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={material.consumptionQty}
                        onChange={(val) => handleChange("consumptionQty", val)}
                        id="consumptionQty"
                        type="number"
                        placeholder="Consumption Qty"
                        className="w-full"
                    />
                </FormField>

                {/* Decimal Place */}
                <FormField
                    label="Decimal Place"
                    id="decimalPlace"
                    variant="inline"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={material.decimalPlace}
                        onChange={(val) => handleChange("decimalPlace", val)}
                        id="decimalPlace"
                        type="number"
                        placeholder="Decimal Place"
                        className="w-full"
                    />
                </FormField>

                {/* Lead Time */}
                <FormField
                    label="Lead Time"
                    id="leadTime"
                    variant="inline"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={material.leadTime}
                        onChange={(val) => handleChange("leadTime", val)}
                        id="leadTime"
                        type="text"
                        placeholder="Decimal Place"
                        className="w-full"
                    />
                </FormField>


            </div>
        </div>
    );
};

export default OtherInfo;





