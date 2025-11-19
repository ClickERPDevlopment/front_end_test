import React, { useEffect, useState } from "react";

interface Option {
  id: number; // IDs are always numbers for simplicity
  name: string;
}

interface ComboBoxProps {
  label?: string;
  value?: number | null; 
  onChange?: (selectedId: number | null, selectedName: string | null) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  labelPosition?: "top" | "left" | "right" | "bottom";
  size?: "sm" | "md" | "lg";
  is_disabled?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  required?: boolean;
  selectedId?: number; // Initial selection (number only)
  selectedName?: string; // Initial selection by name
}

const RNDComboBox: React.FC<ComboBoxProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  labelPosition = "top",
  size = "md",
  is_disabled,
  className = "",
  labelClassName = "",
  selectClassName = "",
  errorClassName = "text-red-500 text-sm mt-1",
  required = false,
  selectedId,
  selectedName,
}) => {
  // State to manage the selected value internally
  const [internalValue, setInternalValue] = useState<number | "">(value || "");

  // Set initial selected value based on selectedId or selectedName
  useEffect(() => {
    if (selectedId !== undefined) {
      // Find the option with the matching id
      const selectedOption = options.find((option) => option.id === selectedId);
      if (selectedOption) {
        setInternalValue(selectedOption.id);
      }
    } else if (selectedName !== undefined) {
      // Find the option with the matching name
      const selectedOption = options.find((option) => option.name === selectedName);
      if (selectedOption) {
        setInternalValue(selectedOption.id);
      }
    }
  }, [selectedId, selectedName, options]);

  // Handle select change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value === "" ? null : Number(e.target.value);
    const selectedOption = options.find((option) => option.id === selectedId);
    setInternalValue(selectedId || "");
    if (onChange) {
      onChange(selectedId, selectedOption ? selectedOption.name : null);
    }
  };

  // Size-based styles
  const sizeStyles = size === "sm" ? "p-2 text-sm" : size === "lg" ? "p-4 text-lg" : "p-3";

  return (
    <div className={`px-1 text flex ${labelPosition === "top" || labelPosition === "bottom" ? "flex-col" : "flex-row items-center"} gap-2 ${className}`}>
      {/* Top or Left Label */}
      {(labelPosition === "top" || labelPosition === "left") && label && (
        <label className={`font-medium ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative flex-grow">
        {/* ComboBox */}
        <select
          value={internalValue}
          onChange={handleChange}
          disabled={is_disabled}
          className={`w-full light-bg border ${sizeStyles} ${selectClassName} rounded-md focus:ring-2 focus:ring-blue-400`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bottom or Right Label */}
      {(labelPosition === "bottom" || labelPosition === "right") && label && (
        <label className={`font-medium ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Error Message */}
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
};

export default RNDComboBox;