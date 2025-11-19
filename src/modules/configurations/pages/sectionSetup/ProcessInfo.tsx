import { AppDispatch, RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISection } from './section.interface';
import { updateSectionField } from '../../reduxSlices/sectionSlice';
import { FormField } from '@/components/form/FormField';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import Checkbox from '@/components/form/Checkbox';

const ProcessInfo = () => {

    const dispatch: AppDispatch = useDispatch();
    const { section, error, message, validationErrors } = useSelector((state: RootState) => state.section);

    const handleChange = (key: keyof ISection, value: string, displayValue?: string) => {
        dispatch(
            updateSectionField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof ISection, value: boolean) => {
        dispatch(
            updateSectionField({
                key: key,
                value: value,
            })
        );
    };

    return (
        <>
            {/* Process Name */}
            <FormField
                label="Process Name"
                id="ProcessName"
                variant="block"
                error={validationErrors?.name}
            >
                <SimpleInputBox
                    value={section.name}
                    onChange={(val) => handleChange("name", val)}
                    id="code"
                    type="text"
                    placeholder="Process Name"
                    className="w-full"
                />
            </FormField>
            {/* Remarks */}
            <FormField
                label="Process Remarks"
                id="ProcessRemarks"
                variant="block"
                error={validationErrors?.remarks}
            >
                <SimpleInputBox
                    value={section.remarks}
                    onChange={(val) => handleChange("remarks", val)}
                    id="ProcessRemarks"
                    type="text"
                    placeholder="Remarks"
                    className="w-full"
                />
            </FormField>

            {/* Checkbox section */}
            <div className="flex flex-col gap-4 mt-4">
                <Checkbox
                    label="Is Garment Process"
                    checked={section.isSubContract}
                    // onChange={(val) => handleCheckboxChange("", val)}
                    color="primary"
                    shape="square"
                    size="small"
                />
                <Checkbox
                    label="Is Fabrics Process"
                    checked={section.isActive}
                    // onChange={(val) => handleCheckboxChange("", val)}
                    color="primary"
                    shape="square"
                    size="small"
                />
                <Checkbox
                    label="Is Yarn Process"
                    checked={section.isSubContract}
                    // onChange={(val) => handleCheckboxChange("", val)}
                    color="primary"
                    shape="square"
                    size="small"
                />
                <Checkbox
                    label="Is Outside Process"
                    checked={section.isActive}
                    // onChange={(val) => handleCheckboxChange("", val)}
                    color="primary"
                    shape="square"
                    size="small"
                />
            </div>
        </>
    );
};

export default ProcessInfo;