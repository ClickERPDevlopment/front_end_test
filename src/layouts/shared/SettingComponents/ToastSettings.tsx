import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import toast, { ToastBar, Toaster, ToastIcon, ToastPosition } from "react-hot-toast";
import SelectDropdown from "@/components/form/SelectDropdown";
import Label from '@/components/form/Label';
import CustomColorPicker from "@/components/form/CustomColorPicker";
import CircleRadio from "@/components/form/CircleRadio";
import Slider from "@/components/form/CustomSlider";
import Button from "@/components/form/Button";
import { useHotToast } from "@/utils/hotToast.util";
// import ToastIconPicker from "@/components/ToastIconPicker";




const ToastSettings: React.FC = () => {
    const {
        toastBgColor,
        toastTextColor,
        toastFontSize,
        toastPosition,
        toastIcon,
        setToastBgColor,
        setToastTextColor,
        setToastFontSize,
        setToastPosition,
        setToastIcon,
    } = useTheme();

    // 4 Default colors for toast
    const presetColors: Record<string, string> = {
        red: "bg-red-500",
        green: "bg-green-500",
        blue: "bg-blue-500",
        white: "bg-white",
    };


    const { showHotSuccess } = useHotToast();
    // Test Toast function
    const showTestToast = () => {
        // showHotSuccess("Demo toaster", {});
        toast("Message", {
            icon: typeof toastIcon === "string" || React.isValidElement(toastIcon) ? toastIcon : undefined,
            style: {
                background: "#1B3767",
                color: "#ffffff",
                fontSize: toastFontSize,
            },
            position: toastPosition,
        });
    };


    const { toastIconName, setToastIconName } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    return (
        <div className="bg-white dark:bg-gray-900 max-w-md mx-auto">
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 pb-2.5">
                Toast Settings
            </h2>

            {/* Background Color */}

            {/* <div className="pt-2 pb-2">
                <Label text="Background Color" htmlFor="" />
                <div className="flex space-x-3 items-center">
                    {Object.entries(presetColors).map(([key, className]) => (
                        <CircleRadio
                            key={key}
                            name="toast-bg"
                            value={key}
                            color={className}
                            checked={toastBgColor === key}
                            onChange={(val) => setToastBgColor(val)}
                            className={className}
                        />
                    ))}
                    
                    <CustomColorPicker
                        id="toast-bg"
                        label=""
                        value={toastBgColor}
                        onChange={setToastBgColor}
                    />
                </div>
            </div > */}

            {/* Text Color */}
            {/* <div className="pt-2 pb-2">
                <Label text="Text Color" htmlFor="" />
                <div className="flex space-x-3 items-center">
                    {Object.entries(presetColors).map(([key, className]) => (
                        <CircleRadio
                            key={key}
                            name="toast-text"
                            value={key}
                            color={className}
                            checked={toastTextColor === key}
                            onChange={(val) => setToastTextColor(val)}
                            className={className}
                        />
                    ))}
                   
                    <CustomColorPicker
                        id="toast-text"
                        label=""
                        value={toastTextColor}
                        onChange={setToastTextColor}
                    />
                </div>
            </div> */}

            {/* Font Size Slider */}
            <div className="pt-2 pb-2">
                <Slider
                    id="toast-font-size"
                    label="Font Size"
                    min={8}
                    max={15}
                    value={parseInt(toastFontSize)}
                    onChange={(val) => setToastFontSize(`${val}px`)}
                />
            </div>

            {/* Toast Position */}
            <div className={`pt-2 z-10 ${isDropdownOpen ? "duration-300 pb-40" : "duration-300 pb-2"}`}>
                <Label text="Toast Position" htmlFor="toast-position" />
                <SelectDropdown
                    options={[
                        { value: "top-left", label: "Top Left" },
                        { value: "top-center", label: "Top Center" },
                        { value: "top-right", label: "Top Right" },
                        { value: "bottom-left", label: "Bottom Left" },
                        { value: "bottom-center", label: "Bottom Center" },
                        { value: "bottom-right", label: "Bottom Right" },
                    ]}
                    value={toastPosition}
                    onChange={(val) => setToastPosition(val as ToastPosition)}
                    onOpenChange={setIsDropdownOpen}
                    isSameKeyValue={false}
                    valueKey="value"
                    labelKey="label"
                    placeholder="Select position"
                    variant="bordered"
                />
            </div>

            {/* Toast Icon Picker
            <div className="pt-2 pb-2">
                <Label text="Toast Icon" htmlFor="" />
                <ToastIconPicker value={toastIconName} onChange={setToastIconName} />
            </div> */}

            {/* Test Toast Button */}
            <div className="pt-2 flex justify-start">
                <Button
                    size="sm"
                    className="cursor-pointer"
                    onClick={showTestToast}>
                    Demo
                </Button>
            </div>
        </div >
    );
};

export default ToastSettings;
