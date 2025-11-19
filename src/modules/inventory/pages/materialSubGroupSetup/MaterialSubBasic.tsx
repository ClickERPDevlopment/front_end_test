import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import Checkbox from '@/components/form/Checkbox';
import { updateMaterialSubGroupField } from '../../reduxSlices/materialsubgroupSlice';
import TextareaBox from '@/components/form/TextareaBox';
import SelectDropdown from '@/components/form/SelectDropdown';
import { IMaterialSubGroup } from './materialsubgroup.interface';
import RadioButton from '@/components/form/RadioButton';
import { useTheme } from '@/hooks/useTheme';
import { getRoutes, RouteLayout } from '@/app/constants';

const MaterialSubBasic = () => {

    const dispatch: AppDispatch = useDispatch();
    const { materialSubGroups, materialSubGroup, error, message, validationErrors } = useSelector((state: RootState) => state.materialSubGroup);
    const { materialGroups } = useSelector((state: RootState) => state.materialGroup);
    const { companies } = useSelector((state: RootState) => state.company);
    const { sections } = useSelector((state: RootState) => state.section);
    const { layout } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);

    const handleChange = (key: keyof IMaterialSubGroup, value: string, displayValue?: string) => {
        dispatch(
            updateMaterialSubGroupField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IMaterialSubGroup, value: boolean) => {
        dispatch(
            updateMaterialSubGroupField({
                key: key,
                value: value,
            })
        );
    };

    const handleRadioChange = (key: keyof IMaterialSubGroup, checked: boolean, value: string | number) => {
        dispatch(
            updateMaterialSubGroupField({
                key: key,
                value: +value
            })
        );
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='flex flex-col gap-3'>
                <FormField
                    label="Material Group Type"
                    id="MaterialGroupCode"
                    variant="inline"
                    error={validationErrors?.code}
                >
                    <Checkbox
                        id="isServiceType"
                        label='Is Service Type?'
                        checked={materialSubGroup.isServiceType}
                        onChange={(val) => handleCheckboxChange("isServiceType", val)}
                        size='small'
                    />
                </FormField>
                <FormField
                    label='Material Group'
                    id='MaterialGroup'
                    variant='block'
                    error={validationErrors?.category}
                >
                    <SelectDropdown
                        options={materialGroups}
                        value={materialSubGroup.materialGroupId.toString()}
                        isSameKeyValue={false}
                        labelKey="category"
                        valueKey="id"
                        onChange={(val, item) => handleChange("materialGroupId", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>
                <FormField
                    label="Sub Group Code"
                    id="SubGroupCode"
                    variant="block"
                    error={validationErrors?.code}
                >
                    <SimpleInputBox
                        value={materialSubGroup.code}
                        onChange={(val) => handleChange("code", val)}
                        id="Code"
                        type="text"
                        placeholder="Group Code"
                        className="w-full"
                    />
                </FormField>
                <FormField
                    label="Sub Group/Item Name"
                    id="SubGroupName"
                    variant="block"
                    error={validationErrors?.name}
                >
                    <SimpleInputBox
                        value={materialSubGroup.name}
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
                        value={materialSubGroup.remarks}
                        onChange={(val) => handleChange("remarks", val)}
                        id="Remarks"
                        placeholder="Remarks"
                        className='w-full'
                    />
                </FormField>
                <div className='flex flex-row gap-2'>
                    <Checkbox
                        id="isActive"
                        label='Is Active'
                        checked={materialSubGroup.isActive}
                        onChange={(val) => handleCheckboxChange("isActive", val)}
                        size='small'
                    />
                    <Checkbox
                        id="suppressHitOnStock"
                        label='Suppress Hit on Stock'
                        checked={materialSubGroup.suppressHitOnStock}
                        onChange={(val) => handleCheckboxChange("suppressHitOnStock", val)}
                        size='small'
                    />
                </div>
                <div className='flex gap-2 mt-5'>
                    {
                        sections.map(section => {
                            return (<RadioButton
                                name='section'
                                id={`section_${section.id}`}
                                checked={materialSubGroup.sectionId === section.id}
                                onChange={(checked, val) => handleRadioChange("sectionId", checked, val)}
                                value={section.id.toString()}
                                size='small'
                                label={section.name}
                            />)
                        })
                    }
                </div>
            </div >
        </div>
    );
};

export default MaterialSubBasic;





