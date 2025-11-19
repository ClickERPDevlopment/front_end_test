import React from "react";

interface SliderProps {
    id: string;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
    id,
    label,
    min = 8,
    max = 15,
    step = 1,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col space-y-2">
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                    {label} <span className="ml-1 text-gray-500">({value}px)</span>
                </label>
            )}
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
            />
        </div>
    );
};

export default Slider;
