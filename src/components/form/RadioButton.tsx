import React, { useState } from "react";

interface RadioButtonProps {
  label?: string;  // Label for radio button
  checked?: boolean;  // Default checked state
  onChange?: (checked: boolean, val: string | number) => void;  // Custom change handler
  value: string;  // Value of the radio button
  name: string;  // Name for grouping radio buttons
  id: string;  // Name for grouping radio buttons
  size?: "small" | "medium" | "large";  // Size of the radio button
  color?: "primary" | "secondary";  // Color variants for checked state
  icon?: React.ReactNode;  // Custom icon for checked state
  disabled?: boolean;  // Disabled state
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  id,
  checked = false,
  onChange,
  value,
  name,
  size = "medium",
  color = "primary",
  icon,
  disabled = false,
}) => {

  const handleChange = () => {
    if (disabled) return;
    if (onChange) onChange(true, value);
  };

  // Custom size classes
  const sizeClasses = {
    small: "w-4 h-4 text-xs",
    medium: "w-6 h-6 text-sm",  // Default size
    large: "w-8 h-8 text-lg",
  };

  // Custom color classes for different color variants
  const colorClasses = color === "primary" ? "checked:bg-blue-500" : "checked:bg-green-500";

  return (
    <label htmlFor={id} className={`flex items-center space-x-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      {/* Radio Button */}
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={`w-6 h-6 border-2 border-gray-300 rounded-full transition-all ${sizeClasses[size]} ${colorClasses}`}
      />
      
      {/* Custom label */}
      {label && <span className="text-gray-700">{label}</span>}

      {/* Custom icon when checked */}
      {icon && checked && <span className="ml-2">{icon}</span>}
    </label>
  );
};

export default RadioButton;
