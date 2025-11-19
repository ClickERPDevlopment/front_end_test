import React from "react";

interface CircleRadioProps {
    value: string;
    checked?: boolean;
    onChange?: (value: string) => void;
    color: string;
    disabled?: boolean;
    tooltip?: string; // Tooltip text
    name: string,
    className: string
}

const CircleRadio: React.FC<CircleRadioProps> = ({
    value,
    checked,
    onChange,
    color,
    disabled = false,
    tooltip = "",
    name,
    className
}) => {

    return (
        <div className="relative group">
            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute -top-10 left-5 text-center transform -translate-x-1/2 scale-0 group-hover:scale-100 w-25
          bg-gray-600 text-white text-xs rounded py-1 px-2 transition-all"
                >
                    {tooltip}
                </div>
            )}

            <label
                className={`relative flex items-center justify-center cursor-pointer w-10 h-10 transition-all
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
      `}
            >
                <input
                    name={name}
                    type="radio"
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onChange?.(value)}
                    className="hidden"
                />
                {/* ${checked ? `border-black scale-110` : "border-gray-300"} */}
                <div
                    className={
                        `w-8 h-8 flex items-center justify-center border-2 rounded-full transition-all 
                        ${className}
                        ${checked ? `border-black scale-110` : "border-gray-300"}
                        ${color.includes("gradient") ? color : ``}
                    `}
                >
                    {/* {checked && (
                        <div className={`w-5 h-5 rounded-full ${color.includes("gradient") ? color : `bg-${color}-sidemenu`} transition-all`} />
                    )} */}
                    {checked && (
                        <div className={`w-5 h-5 rounded-full ${color.includes("gradient") ? color : `bg-${color}-sidemenu`} transition-all`} />
                    )}
                </div>
            </label>
        </div>
    );
};

export default CircleRadio;
