import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import Checkbox from '@/components/form/Checkbox';
import { updateMaterialSubGroupField } from '../../reduxSlices/materialsubgroupSlice';
import { IMaterialGroup } from '../materialGroupSetup/materialgroup.interface';
import { updateMaterialGroupField } from '../../reduxSlices/materialgroup.Slice';
import { IMaterialSubGroup } from '../materialSubGroupSetup/materialsubgroup.interface';
import { updateMaterialInfoField } from '../../reduxSlices/materialInfo.Slice';
import { IMaterial } from './materialinfo.interface';

const MeasurementInfo = () => {

    const dispatch: AppDispatch = useDispatch();
    const { materialGroup, materialGroups, error, message, validationErrors } = useSelector((state: RootState) => state.materialGroup);
    const { materialSubGroup } = useSelector((state: RootState) => state.materialSubGroup);
    const { material, materials } = useSelector((state: RootState) => state.material);
    const { sections } = useSelector((state: RootState) => state.section);

    const handleChange = (key: keyof IMaterialGroup | keyof IMaterialSubGroup | keyof IMaterial, value: string, displayValue?: string) => {
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
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className='flex flex-col gap-2'>

                    {/* Purchase Uom */}
                    <FormField
                        label="Purchase Uom"
                        id="purchaseUom"
                        variant="inline"
                        error={validationErrors?.name}
                    >
                        <SimpleInputBox
                            value={material.purchaseUom}
                            onChange={(val) => handleChange("purchaseUom", val)}
                            id="purchaseUom"
                            type="text"
                            placeholder="Purchase Uom"
                            className="w-full"
                        />
                    </FormField>

                    {/* Use Uom */}
                    <FormField
                        label="Use Uom"
                        id="useUom"
                        variant="inline"
                        error={validationErrors?.type}
                    >
                        <SimpleInputBox
                            value={material.useUom}
                            onChange={(val) => handleChange("useUom", val)}
                            id="useUom"
                            type="text"
                            placeholder="Use Uom"
                            className="w-full"
                        />
                    </FormField>

                    {/* Code */}
                    <FormField
                        label="HS Code"
                        id="hsCode"
                        variant="inline"
                        error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.hsCode}
                            onChange={(val) => handleChange("hsCode", val)}
                            id="hsCode"
                            type="text"
                            placeholder="HS Code"
                            className="w-full"
                        />
                    </FormField>

                    {/* Type TBD */}

                    {/* Description */}
                    <FormField
                        label="Service Label"
                        id="serviceLabel"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.serviceLabel}
                            onChange={(val) => handleChange("serviceLabel", val)}
                            id="serviceLabel"
                            type="text"
                            placeholder="Service Label"
                            className="w-full"
                        />
                    </FormField>

                    {/* Safety Stock */}
                    <FormField
                        label="Safety Stock"
                        id="safetyStock"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.safetyStock}
                            onChange={(val) => handleChange("safetyStock", val)}
                            id="materialDescription"
                            type="text"
                            placeholder="Safety Stock"
                            className="w-full"
                        />
                    </FormField>

                    {/* Gross Weight */}
                    <FormField
                        label="Uom"
                        id="grossWeight"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.grossWeight}
                            onChange={(val) => handleChange("grossWeight", val)}
                            id="grossWeight"
                            type="number"
                            placeholder="Gross Weight"
                            className="w-full"
                        />
                    </FormField>

                    {/* Net Weight */}
                    <FormField
                        label="Net Weight"
                        id="netWeight"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.netWeight}
                            onChange={(val) => handleChange("netWeight", val)}
                            id="netWeight"
                            type="number"
                            placeholder="Net Weight"
                            className="w-full"
                        />
                    </FormField>

                    {/* Area of Uses */}
                    <FormField
                        label="Area of Uses"
                        id="netWeight"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.areaOfUses}
                            onChange={(val) => handleChange("areaOfUses", val)}
                            id="areaOfUses"
                            type="text"
                            placeholder="Net Weight"
                            className="w-full"
                        />
                    </FormField>

                    {/* Production Category */}
                    <FormField
                        label="Production Category"
                        id="productionCategory"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.productionCategory}
                            onChange={(val) => handleChange("productionCategory", val)}
                            id="productionCategory"
                            type="text"
                            placeholder="Production Category"
                            className="w-full"
                        />
                    </FormField>
                </div>

                <div className='flex flex-col gap-2'>
                    {/* Yarn Type */}
                    <FormField
                        label="Standard Price"
                        id="standardPrice"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.uom}
                            onChange={(val) => handleChange("standardPrice", val)}
                            id="standardPrice"
                            type="text"
                            placeholder="Standard Price"
                            className="w-full"
                        />
                    </FormField>

                    {/* Yarn Count */}
                    <FormField
                        label="Yarn Count"
                        id="YarnCount"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.yarnCount}
                            onChange={(val) => handleChange("yarnCount", val)}
                            id="YarnCount"
                            type="number"
                            placeholder="Yarn Count"
                            className="w-full"
                        />
                    </FormField>

                    {/* Inverntory Price */}
                    <FormField
                        label="Inventory Price"
                        id="inventoryPrice"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.inventoryPrice}
                            onChange={(val) => handleChange("inventoryPrice", val)}
                            id="inventoryPrice"
                            type="number"
                            placeholder="Inventory Price"
                            className="w-full"
                        />
                    </FormField>

                    {/* Volume */}
                    <FormField
                        label="Volume"
                        id="YarnQuality"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.yarnQuality}
                            onChange={(val) => handleChange("yarnQuality", val)}
                            id="YarnQuality"
                            type="number"
                            placeholder="Yarn Quality"
                            className="w-full"
                        />
                    </FormField>

                    {/* Length */}
                    <FormField
                        label="Length"
                        id="BlendType"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.length}
                            onChange={(val) => handleChange("length", val)}
                            id="length"
                            type="number"
                            placeholder="Length"
                            className="w-full"
                        />
                    </FormField>

                    {/* Width */}
                    <FormField
                        label="Width"
                        id="width"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.width}
                            onChange={(val) => handleChange("width", val)}
                            id="width"
                            type="number"
                            placeholder="Remarks"
                            className="w-full"
                        />
                    </FormField>

                    {/* Total Stock */}
                    <FormField
                        label="Total Stock"
                        id="totalStock"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.totalStock}
                            onChange={(val) => handleChange("totalStock", val)}
                            id="totalStock"
                            type="text"
                            placeholder="totalStock"
                            className="w-full"
                        />
                    </FormField>

                    <div className='flex gap-5 mt-2.5'>

                        {/* Is Active */}
                        <div>
                            <Checkbox
                                id="isExpirable"
                                label='Is Expirable'
                                checked={material.isExpirable}
                                onChange={(val) => handleCheckboxChange("isExpirable", val)}
                                size='small'
                            />
                        </div>

                        {/* Suppress Hit on Stock */}
                        <div>
                            <Checkbox
                                id="isNonSortable"
                                label='Is Non Sortable'
                                checked={material.isNonSortable}
                                onChange={(val) => handleCheckboxChange("isNonSortable", val)}
                                size='small'
                            />
                        </div>

                        {/* Capital Assets */}
                        <div>
                            <Checkbox
                                id="isCapitalAssets"
                                label='Is Capital Assets'
                                checked={material.isCapitalAssets}
                                onChange={(val) => handleCheckboxChange("isCapitalAssets", val)}
                                size='small'
                            />
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default MeasurementInfo;





