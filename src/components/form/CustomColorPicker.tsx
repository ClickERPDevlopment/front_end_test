import React from "react";
import { FaEyeDropper } from "react-icons/fa";
import Label from "@/components/form/Label";

interface CustomColorPicker {
    id: string;
    label: string;
    value: string;
    onChange: (color: string) => void;
    disabled?: boolean;
    required?: boolean;
}

const CustomColorPicker: React.FC<CustomColorPicker> = ({
    id,
    label,
    value,
    onChange,
    disabled = false,
    required = false,
}) => {
    return (
        <div>
            {/* <Label text={label} htmlFor={id} required={required} disabled={disabled} /> */}
            <div className="relative w-8 h-8">
                {/* Hidden color input */}
                <input
                    type="color"
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />

                {/* Circle preview */}
                <span
                    className="block w-8 h-8 rounded-full border-2 border-gray-900"
                    style={{ backgroundColor: value }}
                />

                {/* Icon overlay */}
                <span className="inset-0 flex items-center justify-center">
                    {/* <FaEyeDropper className="text-white drop-shadow" /> */}
                </span>
            </div>
        </div>
    );
};

export default CustomColorPicker;
