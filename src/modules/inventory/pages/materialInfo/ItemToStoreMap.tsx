import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@/components/form/Checkbox';
import { updateMaterialInfoField } from '../../reduxSlices/materialInfo.Slice';
import { IMaterial } from './materialinfo.interface';

const ItemToStoreMap = () => {

    const dispatch: AppDispatch = useDispatch();
    const { material, error, message, validationErrors } = useSelector((state: RootState) => state.material);
    const { stores } = useSelector((state: RootState) => state.store);


    const handleCheckboxChange = (key: keyof IMaterial, id: number, checked: boolean) => {
        dispatch(updateMaterialInfoField({ key, value: id })); // toggle logic handled in slice
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="flex flex-col gap-2">
                {stores.map(({ id, storeName }) => (
                    <Checkbox
                        key={`store_${id}`}
                        id={String(id)}
                        label={storeName}
                        checked={material.storeIds.includes(id)}
                        onChange={(val) => handleCheckboxChange('storeIds', id, val)}
                        size="small"
                    />
                ))}
            </div>
        </div>
    );
};

export default ItemToStoreMap;





