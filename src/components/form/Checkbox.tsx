import React, { useState } from "react";

interface CheckboxProps {
    id?: string;
    checked?: boolean;  // Default checked state
    onChange?: (checked: boolean) => void;  // Custom change handler
    label?: string;  // Label for checkbox
    shape?: "round" | "square";  // Shape of checkbox
    dotted?: boolean;  // Dotted label
    color?: "primary" | "secondary";  // Color variants for checked state
    disabled?: boolean;  // Disabled state
    icon?: React.ReactNode;  // Custom icon for checked state
    size?: "small" | "medium" | "large";  // Size of the checkbox
}

const Checkbox: React.FC<CheckboxProps> = ({
    id,
    checked = false,
    onChange,
    label,
    shape = "round",
    dotted = false,
    color = "primary",
    disabled = false,
    icon,
    size = "medium",  // Default size is "medium"
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        onChange?.(e.target.checked);
    };

    // Custom size classes
    const sizeClasses = {
        small: "w-4 h-4 text-xs",
        medium: "w-6 h-6 text-sm",  // Default size
        large: "w-8 h-8 text-lg",
    };

    // Custom styles for rounded/square checkboxes
    const shapeClasses = shape === "round" ? "rounded-full" : "rounded-sm";

    // Custom color classes for different color variants
    const colorClasses = color === "primary" ? "checked:bg-blue-500" : "checked:bg-green-500";

    // Dotted label style
    const labelClasses = dotted ? "truncate max-w-[160px] cursor-help border-b border-dotted border-gray-400" : "";

    return (
        <label className="flex items-center space-x-2">
            {/* Checkbox */}
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                className={`border-2 border-gray-300 ${shapeClasses} ${colorClasses} 
        transition-all ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            {/* Custom label */}
            {label && <span className={`${labelClasses}`}>{label}</span>}

            {/* Custom icon when checked */}
            {icon && checked && <span className="ml-2">{icon}</span>}
        </label>
    );
};

export default Checkbox;
