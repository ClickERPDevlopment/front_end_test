import Button from "@/components/form/Button";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import FeatherIcon from "@/components/FeatherIcon";
import { FormField } from "@/components/form/FormField";
import GroupBox from "@/components/form/GroupBox";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { ICurrency } from "@/modules/accounts/pages/currencySetup/currency.interface";
import { VoucherScope, voucherTransactionTypes } from "@/types/global";
import { PlusCircle } from "react-feather";
import { VoucherDetails } from "../voucher.interface";

type GroupBoxProps = {
    formData: VoucherDetails;
    onChange: (key: keyof VoucherDetails, value: string, displayVal?: string) => void;
    currencies: ICurrency[];
    onClick: () => void;
    voucherScope: VoucherScope;
};

export const VoucherDetailsInfo: React.FC<GroupBoxProps> = ({
    formData,
    onChange,
    currencies,
    onClick,
    voucherScope
}) => {
    return (
        <GroupBox title="Details Info" className="mb-6 grid grid-cols-10 md:grid-cols-10 gap-6">
            <FormField label="TR" id="tr" variant="block" labelFontSize="text-xs"
            >
                <SelectDropdown
                    options={voucherTransactionTypes}
                    value={formData.transactionType}
                    isSameKeyValue={true}
                    onChange={(val) => onChange("transactionType", val)}
                    className="h-8 text-sm w-full"
                />
            </FormField>

            <FormField label="Ledger" id="Ledger" variant="block" labelFontSize="text-xs" className="col-span-2"
                labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">

                <DropdownAutoSuggest
                    className="h-8 text-sm"
                    name={formData.transactionType === "DR" ? "debitLedgers" : "creditLedgers"}
                    inputWidth={200}
                    value={formData.ledgerName}
                    onSelect={(val, displayVal) => onChange('ledgerId', val, displayVal)} />
            </FormField>

            <FormField label="Balance" id="Balance" variant="block" labelFontSize="text-xs"
                labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                <SimpleInputBox
                    value={formData.balance.toString()}
                    type="number"
                    disabled
                    onChange={() => { }}
                    className="h-8 text-sm w-full"
                />
            </FormField>

            <FormField label="ICurrency" id="ICurrency" variant="block" labelFontSize="text-xs"
            >
                <SelectDropdown
                    options={currencies}
                    value={formData.currencyId.toString()}
                    isSameKeyValue={false}
                    labelKey="Currencycode"
                    valueKey="Id"
                    onChange={(val) => onChange("currencyId", val)}
                    className="h-8 text-sm w-full"
                />
            </FormField>

            <FormField label="Debit" id="debit" variant="block" labelFontSize="text-xs"
                labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                <SimpleInputBox
                    value={formData.debit.toString()}
                    onChange={(val) => onChange("debit", val)}
                    disabled={formData.transactionType === "CR"}
                    className="h-8 text-sm w-full"
                />
            </FormField>

            <FormField label="Credit" id="credit" variant="block" labelFontSize="text-xs"
                labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                <SimpleInputBox
                    value={formData.credit.toString()}
                    onChange={(val) => onChange("credit", val)}
                    disabled={formData.transactionType === "DR"}
                    className="h-8 text-sm w-full"
                />
            </FormField>

            {
                voucherScope == 'Costcenter' ?
                    <FormField label="Costcenter" id="costCenter" variant="block" labelFontSize="text-xs"
                        labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">

                        <DropdownAutoSuggest
                            className="h-8 text-sm"
                            name="costCenters"
                            inputWidth={200}
                            value={formData.costCenterName}
                            onSelect={(val, displayVal) => onChange('costCenterId', val, displayVal)} />
                    </FormField> :
                    <FormField label="Project" id="Project" variant="block" labelFontSize="text-xs"
                        labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">

                        <DropdownAutoSuggest
                            className="h-8 text-sm"
                            name="projects"
                            inputWidth={200}
                            value={formData.costCenterName}
                            onSelect={(val, displayVal) => onChange('costCenterId', val, displayVal)} />
                    </FormField>
            }


            <FormField label="Reference" id="Reference" variant="block" labelFontSize="text-xs"
                labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                <SimpleInputBox
                    value={formData.refNo}
                    onChange={(val) => onChange("refNo", val)}
                    className="h-8 text-sm w-full"
                />
            </FormField>


            <div>
                <Button onClick={onClick} size="sm" className="float-end mt-4">
                    <FeatherIcon icon={PlusCircle} /> Add
                </Button>
            </div>
        </GroupBox>
    );
};
