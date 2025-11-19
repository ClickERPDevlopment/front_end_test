import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMaterialInfoField } from '../../reduxSlices/materialInfo.Slice';
import { IMaterial } from './materialinfo.interface';
import Checkbox from '@/components/form/Checkbox';

const SectionInfo = () => {
    const dispatch: AppDispatch = useDispatch();

    const { materialGroup } = useSelector((state: RootState) => state.materialGroup);
    const { materialSubGroup } = useSelector((state: RootState) => state.materialSubGroup);
    const { material, materials } = useSelector((state: RootState) => state.material);
    const { sections } = useSelector((state: RootState) => state.section);


    const handleCheckboxChange = (key: keyof IMaterial, id: number, value: boolean) => {
        dispatch(updateMaterialInfoField({ key, value: id })); // pass id as value
    };



    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
                {sections.map(({ id, name }) => (
                    <Checkbox
                        key={`section_${id}`}
                        id={String(id)}
                        label={name}
                        checked={material.sectionIds.includes(id)}
                        onChange={(val) => handleCheckboxChange('sectionIds', id, val)}
                        size="small"
                    />
                ))}
            </div>
        </div>
    );
};

export default SectionInfo;
