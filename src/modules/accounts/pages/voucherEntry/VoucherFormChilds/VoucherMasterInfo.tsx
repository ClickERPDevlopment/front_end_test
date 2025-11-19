import React, { useRef } from "react";
import { VoucherMaster } from "../voucher.interface";
import { IBusinessUnit } from "../../businessUnitSetup/businessUnit.interface";
import { VoucherType } from "../../voucherType/voucherType.interface";
import SmartForm, { SmartFormHandle } from "@/components/form/SmartForm";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import SelectDropdown from "@/components/form/SelectDropdown";
import { voucherScopes } from "@/types/global";

type GroupBoxProps = {
    formData: VoucherMaster;
    onChange: (key: keyof VoucherMaster, value: string, displayVal?: string) => void;
    onDateChange: (key: keyof VoucherMaster, date: Date | null) => void;
    businessUnits: IBusinessUnit[];
    voucherTypes: VoucherType[];
};

export const VoucherMasterInfo: React.FC<GroupBoxProps> = ({
    formData,
    onChange,
    onDateChange,
    businessUnits,
    voucherTypes
}) => {
    const smartFormRef = useRef<SmartFormHandle>(null);
    const ref = React.useRef<HTMLSelectElement>(null);
    const ref2 = React.useRef<HTMLSelectElement>(null);


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
            <div className="grid grid-cols-8 md:grid-cols-8 gap-6">
                <FormField label="Voucher No." id="voucherNo" variant="block" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SimpleInputBox
                        value={formData.voucherNo.toString()}
                        onChange={(val) => onChange("voucherNo", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <FormField label="Voucher Date" id="voucherDate" variant="block" required labelFontSize="text-xs"
                    labelWidth="w-[70px] lg:w-[80px] xl:w-[65px]">
                    <CustomDatePicker
                        selected={formData.voucherDate ? new Date(formData.voucherDate) : null}
                        onChange={(date) => onDateChange('voucherDate', date)}
                        className="flex-1"
                    />
                </FormField>

                <FormField
                    ref={ref2}
                    label="Voucher Type"
                    id="voucherTypeId"
                    variant="block"
                    required
                    labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        ref={ref2}
                        options={voucherTypes}
                        value={formData.voucherTypeId.toString()}
                        isSameKeyValue={false}
                        labelKey="typeName"
                        valueKey="vtypeNo"
                        onChange={(val, item) => onChange("voucherTypeId", val, String(item?.nature))}
                        className="h-8 text-sm w-full"
                        onKeyDown={handleKeyDown}
                    />
                </FormField>

                <FormField
                    ref={ref}
                    label="Business Unit"
                    id="bussinessUnitId" variant="block"
                    required labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown<IBusinessUnit>
                        ref={ref}
                        options={businessUnits}
                        value={formData.bussinessUnitId.toString()}
                        isSameKeyValue={false}
                        labelKey="baName"
                        valueKey="baNo"
                        onChange={(val) => onChange("bussinessUnitId", val)}
                        className="h-8 text-sm w-full"
                        onKeyDown={handleKeyDown}
                    />
                </FormField>

                <FormField
                    ref={ref2}
                    label="Project/Costcenter"
                    id="voucherScope"
                    variant="block"
                    required
                    labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        ref={ref2}
                        options={voucherScopes}
                        value={formData.voucherScope}
                        isSameKeyValue={true}
                        onChange={(val) => onChange("voucherScope", val)}
                        className="h-8 text-sm w-full"
                        onKeyDown={handleKeyDown}
                    />
                </FormField>
            </div>
        </SmartForm>
    );
};
