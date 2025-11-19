import { AppDispatch, RootState } from '@/app/store';
import Button from '@/components/form/Button';
import Checkbox from '@/components/form/Checkbox';
import { FormField } from '@/components/form/FormField';
import SelectDropdown from '@/components/form/SelectDropdown';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { updateMaterialInfoField } from '../../reduxSlices/materialInfo.Slice';
import { IMaterial } from './materialinfo.interface';

const BasicMaterialInfo = () => {

    const dispatch: AppDispatch = useDispatch();

    const { materialGroups, materialGroup } = useSelector((state: RootState) => state.materialGroup);
    const { materialSubGroups, materialSubGroup } = useSelector((state: RootState) => state.materialSubGroup);
    const { material, materials, error, message, validationErrors } = useSelector((state: RootState) => state.material);

    // const location = useLocation();
    // const segments = location.pathname.split("/").filter(Boolean);


    const handleChange = (key: keyof IMaterial, value: string, displayValue?: string) => {
        if (key in material) {
            dispatch(
                updateMaterialInfoField({
                    key: key as keyof IMaterial,
                    value: value,
                })
            );
        }
    };

    const handleCheckboxChange = (key: keyof IMaterial, value: boolean) => {
        if (key in material) {
            dispatch(
                updateMaterialInfoField({
                    key: key as keyof IMaterial,
                    value: value,
                })
            );
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8'>
            {/* <Breadcrumb items={breadcrumbItems} /> */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2'>
                    {/* Material Group Type */}
                    <div>
                        <FormField
                            label="Material Group Type"
                            id="isServiceType"
                            variant="inline"
                        // error={validationErrors?.isServiceType}
                        >
                            <Checkbox
                                id="isServiceType"
                                label='Is Service Type?'
                                checked={materialGroup.isServiceType}
                                onChange={(val) => handleCheckboxChange("materialGroupId", val)}
                                size='small'
                            />
                        </FormField>
                    </div>

                    {/* Material Group */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Material Group"
                            id="MaterialGroupName"
                            variant="inline"
                            className='w-full'
                        // error={validationErrors?.name}
                        >
                            <SelectDropdown
                                options={materialGroups}
                                value={material.materialGroupId.toString()}
                                isSameKeyValue={false}
                                labelKey='category'
                                valueKey='id'
                                onChange={(val) => handleChange("materialGroupId", val)}
                                className="text-sm w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Material Sub Group */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Sub Group/Item Name"
                            id="MaterialGroupName"
                            variant="inline"
                            className='w-full'
                        // error={validationErrors?.type}
                        >
                            <SelectDropdown
                                options={materialSubGroups}
                                value={material.materialSubGroupId.toString()}
                                isSameKeyValue={false}
                                labelKey='name'
                                valueKey='id'
                                onChange={(val) => handleChange("materialSubGroupId", val)}
                                className="text-sm w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Code */}
                    <FormField
                        label="Material Group Code"
                        id="code"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.materialCode}
                            onChange={(val) => handleChange("materialCode", val)}
                            id="code"
                            type="text"
                            placeholder="Material Group Code"
                            className="w-full"
                        />
                    </FormField>

                    {/* Type TBD */}

                    {/* Description */}
                    <FormField
                        label="Material Description"
                        id="materialDescription"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.materialDescription}
                            onChange={(val) => handleChange("materialDescription", val)}
                            id="materialDescription"
                            type="text"
                            placeholder="Material Description"
                            className="w-full"
                        />
                    </FormField>


                    {/* Display Name */}
                    <FormField
                        label="Display Name"
                        id="displayName"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.materialDisplayName}
                            onChange={(val) => handleChange("materialDisplayName", val)}
                            id="materialDescription"
                            type="text"
                            placeholder="Material Display Name"
                            className="w-full"
                        />
                    </FormField>

                    {/* UOM */}
                    <FormField
                        label="Uom"
                        id="uom"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.uom}
                            onChange={(val) => handleChange("uom", val)}
                            id="uom"
                            type="text"
                            placeholder="Uom"
                            className="w-full"
                        />
                    </FormField>
                </div>

                <div className='flex flex-col gap-2'>

                    {/* Yarn Type */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Yarn Type"
                            id="YarnType"
                            variant="inline"
                            className='w-full'
                        // error={validationErrors?.code}
                        >
                            <SimpleInputBox
                                value={material.yarnType}
                                onChange={(val) => handleChange("yarnType", val)}
                                id="yarnType"
                                type="text"
                                placeholder="Yarn Type"
                                className="w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Yarn Cont */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Yarn Count"
                            id="YarnCount"
                            variant="inline"
                            className="w-full"
                        // error={validationErrors?.code}
                        >
                            <SimpleInputBox
                                value={material.yarnCount}
                                onChange={(val) => handleChange("yarnCount", val)}
                                id="YarnCount"
                                type="text"
                                placeholder="Yarn Count"
                                className="w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Yarn Composition */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Yarn Composition"
                            id="yarnComposition"
                            variant="inline"
                            className='w-full'
                        // error={validationErrors?.code}
                        >
                            <SimpleInputBox
                                value={material.yarnComposition}
                                onChange={(val) => handleChange("yarnComposition", val)}
                                id="yarnComposition"
                                type="text"
                                placeholder="Yarn Composition"
                                className="w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Yarn Quality */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Yarn Quality"
                            id="YarnQuality"
                            variant="inline"
                            className='w-full'
                        // error={validationErrors?.code}
                        >
                            <SimpleInputBox
                                value={material.yarnQuality}
                                onChange={(val) => handleChange("yarnQuality", val)}
                                id="YarnQuality"
                                type="text"
                                placeholder="Yarn Quality"
                                className="w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Blend Type */}
                    <div className='flex gap-2'>
                        <FormField
                            label="Blend Type"
                            id="BlendType"
                            variant="inline"
                            className='w-full'
                        // error={validationErrors?.code}
                        >
                            <SimpleInputBox
                                value={material.blendType}
                                onChange={(val) => handleChange("blendType", val)}
                                id="BlendType"
                                type="text"
                                placeholder="Blend Type"
                                className="w-full"
                            />
                        </FormField>
                        <Button
                            variant='filled'
                            size='sm'
                            onClick={() => ""}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add
                        </Button>
                    </div>

                    {/* Remarks */}
                    <FormField
                        label="Remarks"
                        id="Remarks"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.remarks}
                            onChange={(val) => handleChange("remarks", val)}
                            id="remarks"
                            type="text"
                            placeholder="Remarks"
                            className="w-full"
                        />
                    </FormField>

                    {/* Category */}
                    <FormField
                        label="Category"
                        id="category"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.category}
                            onChange={(val) => handleChange("category", val)}
                            id="category"
                            type="text"
                            placeholder="Category"
                            className="w-full"
                        />
                    </FormField>

                    {/* Is Dyed Yarn */}
                    <Checkbox
                        id="isDyedYarn"
                        label='Is Dyed Yarn'
                        checked={material.isDyedYarn}
                        onChange={(val) => handleCheckboxChange("isDyedYarn", val)}
                        size='small'
                    />

                    {/* Dyed Color */}
                    <FormField
                        label="Dyed Color"
                        id="dyedColor"
                        variant="inline"
                    // error={validationErrors?.code}
                    >
                        <SimpleInputBox
                            value={material.dyedColor}
                            onChange={(val) => handleChange("dyedColor", val)}
                            id="dyedColor"
                            type="text"
                            placeholder="Dyed Color"
                            className="w-full"
                        />
                    </FormField>

                    <div className='flex gap-5'>
                        {/* Is Active */}
                        <div>
                            <Checkbox
                                id="isActive"
                                label='Is Active'
                                checked={material.isActive}
                                onChange={(val) => handleCheckboxChange("isActive", val)}
                                size='small'
                            />
                        </div>

                        {/* Suppress Hit on Stock */}
                        <div>
                            <Checkbox
                                id="isActive"
                                label='suppressHitOnStock'
                                checked={material.suppressHitOnStock}
                                onChange={(val) => handleCheckboxChange("suppressHitOnStock", val)}
                                size='small'
                            />
                        </div>

                        {/* Is Round Calculation */}
                        <div>
                            <Checkbox
                                id="isActive"
                                label='Is Round Calculation'
                                checked={material.isRoundCalculation}
                                onChange={(val) => handleCheckboxChange("isRoundCalculation", val)}
                                size='small'
                            />
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default BasicMaterialInfo;





