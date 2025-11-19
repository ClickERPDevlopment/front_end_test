import React, { useRef } from "react";
import Checkbox from "../../../../../components/form/Checkbox";
import CustomDatePicker from "../../../../../components/form/CustomDatePicker";
import DropdownAutoSuggest from "../../../../../components/form/DropdownAutoSuggest";
import { FormField } from "../../../../../components/form/FormField";
import GroupBox from "../../../../../components/form/GroupBox";
import SelectDropdown from "../../../../../components/form/SelectDropdown";
import SimpleInputBox from "../../../../../components/form/SimpleInputBox";
import TextareaBox from "../../../../../components/form/TextareaBox";
import { CuttingFormMaster } from "../cutting.interface";
import SmartForm, { SmartFormHandle } from "../../../../../components/form/SmartForm";
import { IFloor } from "@/modules/configurations/pages/floorSetup/floor.interface";
import { ILine } from "@/modules/configurations/pages/lineSetup/line.interface";

type GroupBoxProps = {
    formData: CuttingFormMaster;
    onChange: (key: keyof CuttingFormMaster, value: string, displayVal?: string) => void;
    onDateChange: (key: keyof CuttingFormMaster, date: Date | null) => void;
    filteredFloor: IFloor[];
    filteredLines: ILine[];
};

export const LayerCuttingMasterInfo: React.FC<GroupBoxProps> = ({
    formData,
    onChange,
    onDateChange,
    filteredFloor,
    filteredLines,
}) => {
    const smartFormRef = useRef<SmartFormHandle>(null);
    const ref = React.useRef<HTMLSelectElement>(null);
    const ref2 = React.useRef<HTMLSelectElement>(null);
    const groupBoxRef = React.useRef<HTMLFieldSetElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log('enter press')
            // debugger
            smartFormRef.current?.focusNext();
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            smartFormRef.current?.focusPrev();
        }
    };

    return (
        <SmartForm ref={smartFormRef} inputRefs={[ref, ref2]}>
            <GroupBox title="Master Info" className="mb-6 " ref={groupBoxRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <FormField
                            ref={ref}
                            label="Cut Floor"
                            id="floor" variant="inline"
                            required labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <SelectDropdown<IFloor>
                                ref={ref}
                                options={filteredFloor}
                                value={formData.floorId}
                                isSameKeyValue={false}
                                labelKey="floorName"
                                valueKey="id"
                                onChange={(val) => onChange("floorId", val)}
                                className="h-8 text-sm w-full"
                                onKeyDown={handleKeyDown}
                            />
                        </FormField>

                        <FormField
                            ref={ref2}
                            label="Line"
                            id="line"
                            variant="inline"
                            required
                            labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <SelectDropdown
                                ref={ref2}
                                options={filteredLines}
                                value={formData.lineId}
                                isSameKeyValue={false}
                                labelKey="lineName"
                                valueKey="id"
                                onChange={(val) => onChange("lineId", val)}
                                className="h-8 text-sm w-full"
                                onKeyDown={handleKeyDown}
                            />
                        </FormField>

                        <FormField label="Buyer" id="buyer" variant="inline" required labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <DropdownAutoSuggest
                                className="h-8 text-sm"
                                name="buyers"
                                inputWidth={200}
                                value={formData.buyerName}
                                onSelect={(val, displayVal) => onChange('buyerId', val, displayVal)} />
                        </FormField>

                        <FormField label="Style" id="style" variant="inline" required labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <DropdownAutoSuggest
                                className="h-8 text-sm"
                                name="styles"
                                inputWidth={200}
                                value={formData.styleNo}
                                onSelect={(val, displayVal) => onChange('styleId', val, displayVal)} />
                        </FormField>

                        <FormField label="Type" id="type" variant="inline" required labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <SelectDropdown
                                options={['Bulk Cutting', 'Sample Cutting', 'Size Set Cutting', 'Other']}
                                value={formData.type}
                                onChange={(val) => onChange("type", val)}
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <Checkbox label="Is Tube" size="small" />

                        <FormField label="Cut Dt" id="cuttingDate" variant="inline" required labelFontSize="text-xs"
                            labelWidth="w-[70px] lg:w-[80px] xl:w-[65px]">
                            <CustomDatePicker
                                selected={formData.cuttingDate ? new Date(formData.cuttingDate) : null}
                                onChange={(date) => onDateChange('cuttingDate', date)}
                                className="flex-1"
                            />
                        </FormField>

                        <FormField label="B.N.S" id="bns" variant="inline" labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <SimpleInputBox
                                value={formData.bns.toString()}
                                onChange={(val) => onChange("bns", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="S.N.S" id="sns" variant="inline" labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                            <SimpleInputBox
                                value={formData.sns.toString()}
                                onChange={(val) => onChange("sns", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                    </div>

                    <div className="space-y-4">
                        <FormField label="Cutting No." id="cuttingNo" variant="inline" labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.cuttingNo}
                                onChange={(val) => onChange("cuttingNo", val)}
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="Marker Len" id="markerLength" variant="inline" required labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.markerLength.toString()}
                                onChange={(val) => onChange("markerLength", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="Marker W." id="markerWidth" variant="inline" required labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.markerWidth.toString()}
                                onChange={(val) => onChange("markerWidth", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="Allow. Len" id="allowanceLength" variant="inline" required labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.allowanceLength.toString()}
                                onChange={(val) => onChange("allowanceLength", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="B. Qty" id="bundleQty" variant="inline" required labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.bundleQty.toString()}
                                onChange={(val) => onChange("bundleQty", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="Min B. Qty" id="minBundleQty" variant="inline" required labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.minBundleQty.toString()}
                                onChange={(val) => onChange("minBundleQty", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="Marker Qty" id="markerQty" variant="inline" labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.markerQty.toString()}
                                onChange={(val) => onChange("markerQty", val)}
                                type="number"
                                disabled
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="Cutting Qty" id="cuttingQty" variant="inline" labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.cuttingQty.toString()}
                                onChange={(val) => onChange("cuttingQty", val)}
                                type="number"
                                disabled
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                        <FormField label="T. Lay Qty" id="layQty" variant="inline" labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.layQty.toString()}
                                onChange={(val) => onChange("layQty", val)}
                                type="number"
                                disabled
                                className="h-8 text-sm w-full"
                            />
                        </FormField>

                    </div>
                </div>

                <FormField label="Remarks(20 character only)" id="Remarks" labelFontSize="text-xs">
                    <TextareaBox
                        value={formData.remarks}
                        onChange={(val) => onChange("remarks", val)}
                        className="h-14 w-full" />
                </FormField>

            </GroupBox>
        </SmartForm>
    );
};
