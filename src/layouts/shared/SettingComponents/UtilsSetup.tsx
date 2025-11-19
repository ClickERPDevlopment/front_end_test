import Button from "@/components/form/Button";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import { useTheme } from "@/hooks/useTheme";
import { DateFormatType, dateFormatTypes } from "@/types/global";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const UtilsSetup: React.FC = () => {

    const { datePickerFormat, setDatePickerFormat } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div>

            <div className={`${isDropdownOpen ? "duration-300 pb-35" : "duration-300 pb-2"}`}>
                {/* Theme Selector */}
                <FormField
                    label="Datepicker Format"
                    id="voucherScope"
                    variant="block"
                    labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={dateFormatTypes}
                        value={datePickerFormat}
                        onOpenChange={setIsDropdownOpen}
                        isSameKeyValue={true}
                        onChange={(val) => setDatePickerFormat(val as DateFormatType)}
                        className="h-8 text-sm w-full"
                        showPlaceholder={false}
                    />
                </FormField>
            </div>


        </div >
    );
};

export default UtilsSetup;
