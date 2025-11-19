import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import Checkbox from '@/components/form/Checkbox';
import { updateMaterialGroupField } from '../../reduxSlices/materialgroup.Slice';
import { IMaterialGroup } from './materialgroup.interface';
import TextareaBox from '@/components/form/TextareaBox';
import SelectDropdown from '@/components/form/SelectDropdown';
import Button from '@/components/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const BasicMaterial = () => {
    const dispatch: AppDispatch = useDispatch();

    const { materialGroup, materialGroups, error, message, validationErrors } = useSelector((state: RootState) => state.materialGroup);
    const { uom, uoms } = useSelector((state: RootState) => state.uom);
    const { material, materials } = useSelector((state: RootState) => state.material);
    const { materialSubGroup, materialSubGroups } = useSelector((state: RootState) => state.materialSubGroup);


    const handleChange = (key: keyof IMaterialGroup, value: string, displayValue?: string) => {
        if (key in materialGroup) {
            dispatch(
                updateMaterialGroupField({
                    key: key as keyof IMaterialGroup,
                    value: value,
                })
            );
        }
    };

    const handleCheckboxChange = (key: keyof IMaterialGroup, value: boolean) => {
        dispatch(
            updateMaterialGroupField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5'>
            <div className='flex flex-col gap-2'>
                <Checkbox
                    id="isServiceType"
                    label='Is Service Type?'
                    checked={materialGroup.isServiceType}
                    onChange={(val) => handleCheckboxChange("isServiceType", val)}
                    size='small'
                ></Checkbox>
                <FormField
                    label="Group Code"
                    id="GroupCode"
                    variant="block"
                    error={validationErrors?.code}
                >
                    <SimpleInputBox
                        value={materialGroup.code}
                        onChange={(val) => handleChange("code", val)}
                        id="Code"
                        type="text"
                        placeholder="Group Code"
                        className="w-full"
                    />
                </FormField>
                <FormField
                    label="Group Name"
                    id="GroupName"
                    variant="block"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={materialGroup.name}
                        onChange={(val) => handleChange("name", val)}
                        id="Name"
                        type="text"
                        placeholder="Group Name"
                        className="w-full"
                    />
                </FormField>
                <FormField
                    label="Remarks"
                    id="Remarks"
                    variant="block"
                    error={validationErrors?.remarks}
                >
                    <TextareaBox
                        value={materialGroup.remarks}
                        onChange={(val) => handleChange("remarks", val)}
                        id="Remarks"
                        placeholder="Remarks"
                        className='w-full'
                    />
                </FormField>
                <FormField
                    label='Category'
                    id='Catgeory'
                    variant='block'
                    error={validationErrors?.category}
                >
                    <SelectDropdown
                        options={materialGroups}
                        value={materialGroup.category}
                        isSameKeyValue={false}
                        labelKey='category'
                        valueKey='id'
                        onChange={(val) => handleChange("category", val)}
                        className="text-sm w-full"
                    />
                </FormField>
                <div className='flex flex-row gap-2'>
                    <Checkbox
                        id="isActive"
                        label='Is Active'
                        checked={materialGroup.isActive}
                        onChange={(val) => handleCheckboxChange("isActive", val)}
                        size='small'
                    />
                    <Checkbox
                        id="suppressHitOnStock"
                        label='Suppress Hit on Stock'
                        checked={materialGroup.suppressHitOnStock}
                        onChange={(val) => handleCheckboxChange("suppressHitOnStock", val)}
                        size='small'
                    />
                </div>
            </div >
            <div className='w-3/4'>
                <div className='flex gap-2'>
                    <FormField
                        label='UOM'
                        id='uomId'
                        variant='block'
                        error={validationErrors?.uom}
                    >
                        <SelectDropdown
                            options={uoms}
                            value={materialGroup.uomId.toString()}
                            isSameKeyValue={false}
                            labelKey='uomName'
                            valueKey='id'
                            onChange={(val) => handleChange("uomId", val)}
                            className="text-sm w-full"
                        />
                    </FormField>
                    <div className='mt-5'>
                        <Button variant='filled' className='' size='sm' onClick={() => { }}>
                            <FontAwesomeIcon icon={faAdd} /> Add UOM
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default BasicMaterial;





