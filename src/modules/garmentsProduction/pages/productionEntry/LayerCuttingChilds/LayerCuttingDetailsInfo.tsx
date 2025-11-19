import { PlusCircle } from "react-feather";
import Button from "../../../../../components/form/Button";
import DropdownAutoSuggest from "../../../../../components/form/DropdownAutoSuggest";
import FeatherIcon from "../../../../../components/FeatherIcon";
import { FormField } from "../../../../../components/form/FormField";
import GroupBox from "../../../../../components/form/GroupBox";
import SelectDropdown from "../../../../../components/form/SelectDropdown";
import SimpleInputBox from "../../../../../components/form/SimpleInputBox";
import { IOrderColor, } from "../../../types/poData.interface";
import { CuttingFormDetails, } from "../cutting.interface";
import { IUom } from "@/modules/inventory/pages/uomSetup/uom.interface";

type GroupBoxProps = {
    formData: CuttingFormDetails;
    onChange: (key: keyof CuttingFormDetails, value: string) => void;
    orderColors: IOrderColor[];
    placementMonths: string[];
    deliveryDates: string[];
    uoms: IUom[];
    onClick: () => void;
};

export const LayerCuttingDetailsInfo: React.FC<GroupBoxProps> = ({
    formData,
    onChange,
    orderColors,
    placementMonths,
    deliveryDates,
    uoms,
    onClick
}) => {
    return (
        <GroupBox title="Details Info" className="mb-6 grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-4">
                <FormField label="PO No" id="poNo" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">

                    <DropdownAutoSuggest
                        className="h-8 text-sm"
                        name="orders"
                        inputWidth={200}
                        value={formData.poNo}
                        onSelect={(val) => onChange('poNo', val)} />
                </FormField>

                <FormField label="Color" id="colorId" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={orderColors}
                        value={formData.colorId.toString()}
                        labelKey="colorName"
                        valueKey="colorId"
                        isSameKeyValue={false}
                        onChange={(val) => onChange("colorId", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <FormField label="Lot / Batch" id="lotBatchNo" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SimpleInputBox
                        value={formData.lotBatchNo}
                        onChange={(val) => onChange("lotBatchNo", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <FormField label="Roll No" id="rollNo" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SimpleInputBox
                        value={formData.rollNo}
                        onChange={(val) => onChange("rollNo", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <FormField label="Shrinkage" id="shrinkage" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={['0-3%', '3-6%', '9-10%']}
                        value={formData.shrinkage}
                        onChange={(val) => onChange("shrinkage", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <FormField label="GSM" id="gsm" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SimpleInputBox
                        value={formData.gsm}
                        onChange={(val) => onChange("gsm", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <div className="grid grid-cols-5 gap-1 mb-0">
                    <div className="col-span-3">
                        <FormField label="Length" id="length" variant="inline" labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[110px]">
                            <SimpleInputBox
                                value={formData.length.toString()}
                                onChange={(val) => onChange("length", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />

                        </FormField>
                    </div>
                    <div className="col-span-2">
                        <SelectDropdown
                            options={uoms}
                            value={formData.uomId.toString()}
                            isSameKeyValue={false}
                            labelKey="uomName"
                            valueKey="id"
                            onChange={(val) => onChange("uomId", val)}
                            className="h-8 text-sm w-full"
                            placeholder="Select Uom"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-1 mb-0">
                    <div className="col-span-3">
                        <FormField label="Weight (Kg)" id="weight" variant="inline" labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[110px]">
                            <SimpleInputBox
                                value={formData.weight.toString()}
                                onChange={(val) => onChange("weight", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>
                    </div>
                    <div className="col-span-2">
                        <FormField label="Shade" id="shade" variant="inline" required labelFontSize="text-xs">
                            <SelectDropdown
                                options={['A', 'B', 'C', 'D', 'E', 'F']}
                                value={formData.shade}
                                onChange={(val) => onChange("shade", val)}
                                className="h-8 text-sm w-full"
                            />
                        </FormField>
                    </div>

                </div>

                <div className="grid grid-cols-5 gap-1 mb-0">
                    <div className="col-span-3">
                        <FormField label="Lay Q. (pcs)" id="layQty" variant="inline" labelFontSize="text-xs"
                            labelWidth="w-[80px] lg:w-[80px] xl:w-[110px]">
                            <SimpleInputBox
                                value={formData.layQty.toString()}
                                onChange={(val) => onChange("layQty", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>
                    </div>
                    <div className="col-span-2">
                        <FormField label="Roll Bal" id="shade" variant="inline" required labelFontSize="text-xs">
                            <SimpleInputBox
                                value={formData.rollBal.toString()}
                                onChange={(val) => onChange("rollBal", val)}
                                type="number"
                                className="h-8 text-sm w-full"
                            />
                        </FormField>
                    </div>

                </div>

                <FormField label="Place M." id="placementMonth" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={placementMonths}
                        value={formData.placementMonth}
                        isSameKeyValue={true}
                        onChange={(val) => onChange("placementMonth", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <FormField label="Del. Dt" id="deliveryDate" variant="inline" labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={deliveryDates}
                        value={formData.deliveryDate}
                        isSameKeyValue={true}
                        onChange={(val) => onChange("deliveryDate", val)}
                        className="h-8 text-sm w-full"
                    />
                </FormField>

                <Button onClick={onClick} size="sm" className="float-end">
                    <FeatherIcon icon={PlusCircle} /> Add
                </Button>

            </div>
        </GroupBox>
    );
};
