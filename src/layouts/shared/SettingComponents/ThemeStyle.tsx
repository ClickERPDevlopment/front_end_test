import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import { useTheme } from "@/hooks/useTheme";
import { FontSize, PaginationVariant, paginationVariants, themeTypes } from "@/types/global";
import { useState } from "react";

const ThemeStyle: React.FC = () => {

    const { theme, direction, fontSize, paginationStyle, setTheme, setDirection, setFontSize, setPaginationStyle } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <div>
            <div>
                {/* Theme Selector */}
                <FormField
                    label="Theme Mode"
                    id="ThemeMode"
                    variant="block"
                    labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={themeTypes}
                        value={theme}
                        isSameKeyValue={true}
                        onChange={(val) => setTheme(val as "light" | "dark")}
                        className="h-8 text-sm w-full"
                        showPlaceholder={false}
                    />
                </FormField>
            </div>

            <div className={`${isDropdownOpen ? "duration-300 pb-35" : "duration-300 pb-2"}`}>
                {/* Pagination Style */}
                <FormField
                    label="Pagination Style"
                    id="PaginationStyle"
                    variant="block"
                    labelFontSize="text-xs"
                    labelWidth="w-[80px] lg:w-[80px] xl:w-[86px]">
                    <SelectDropdown
                        options={paginationVariants}
                        value={paginationStyle}
                        onOpenChange={setIsDropdownOpen}
                        isSameKeyValue={true}
                        onChange={(val) => setPaginationStyle(val as PaginationVariant)}
                        className="h-8 text-sm w-full"
                        showPlaceholder={false}
                    />
                </FormField>
            </div>

            {/* Direction Selector */}
            <div className="hidden">
                <label className="block  ">Direction</label>
                <select value={direction} onChange={(e) => setDirection(e.target.value as "ltr" | "rtl")} className="mt-1 p-2 border rounded-md w-full  ">
                    <option className="light-bg text" value="ltr">LTR</option>
                    <option className="light-bg text" value="rtl">RTL</option>
                </select>
            </div>


            {/* Font Size */}
            <div className="hidden">
                <label className="block">Font Size</label>
                <input type="range" min="12" max="24" value={parseInt(fontSize.replace("px", ""))} onChange={(e) => setFontSize(`${e.target.value}px` as FontSize)} className="mt-1 w-full" />
                <p className="text-sm mt-1">Current: {fontSize}</p>
            </div>
        </div>
    );
};

export default ThemeStyle;
