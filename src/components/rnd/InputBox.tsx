import React from "react";
import { X } from "react-feather";
import { InputType } from "../../types/global";

interface InputBoxProps {
  label?: string;
  type: InputType;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  labelPosition?: "top" | "left" | "right" | "bottom";
  theme?: "light" | "dark";
  size?: "sm" | "base" | "lg";
  borderStyle?: string;
  rounded?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  is_disabled?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  labelWidth?: string;
  inputWidth?: string;
}

const RNDInputBox: React.FC<InputBoxProps> = ({
  label,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder,
  icon,
  labelPosition = "left",
  theme = "light",
  size = "md",
  borderStyle = "border-gray-300",
  rounded = true,
  className = "",
  labelClassName = "px-1",
  inputClassName = "",
  is_disabled,
  showClearButton = true,
  onClear,
  labelWidth = label ? "w-[30%]" : "w-0 hidden",
  inputWidth = label ? "w-[70%]" : "w-full",
}) => {
  const themeStyles =
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-600"
      : "bg-white text-black";

  const sizeStyles =
    size === "sm"
      ? "py-1 px-2 text-sm"
      : size === "lg"
      ? "py-1 px-4 text-lg"
      : "py-1 px-3 text-base";

  const handleClear = () => {
    onClear?.();
  };

  const shouldShowClear = showClearButton && value != "" && !is_disabled;

  const renderInputField = () => (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </span>
      )}
      <input
        disabled={is_disabled}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`${rounded?"rounded-md":"rounded-none"}  w-full border ${borderStyle} ${themeStyles} ${sizeStyles}
        focus:ring-2 focus:ring-blue-400 ${icon ? "pl-10" : "pl-3"} ${
          shouldShowClear ? "pr-10" : "pr-3"
        } ${inputClassName}`}
      />
      {shouldShowClear && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {labelPosition === "top" && (
        <div className="flex flex-col w-full gap-1">
          {label && (
            <label
              className={`${borderStyle} ${themeStyles} ${sizeStyles} ${labelWidth} ${labelClassName} ${rounded ? "rounded-md" : "rounded-none"} `}
            >
              {label}
            </label>
          )}
          {renderInputField()}
        </div>
      )}

      {labelPosition === "left" && (
        <div className="flex items-center w-full gap-2">
          {label && (
            <label
              className={`${borderStyle} ${themeStyles} ${sizeStyles} ${labelWidth} ${labelClassName} ${rounded ? "rounded-md" : "rounded-none"} `}
            >
              {label}
            </label>
          )}
          <div className={inputWidth}>{renderInputField()}</div>
        </div>
      )}

      {labelPosition === "right" && (
        <div className="flex items-center w-full gap-2">
          <div className={inputWidth}>{renderInputField()}</div>
          {label && (
            <label
              className={`${borderStyle} ${themeStyles} ${sizeStyles} ${labelWidth} ${labelClassName} ${rounded ? "rounded-md" : "rounded-none"} `}
            >
              {label}
            </label>
          )}
        </div>
      )}

      {labelPosition === "bottom" && (
        <div className="flex flex-col w-full gap-1">
          {renderInputField()}
          {label && (
            <label className={`${labelWidth} ${labelClassName}`}>{label}</label>
          )}
        </div>
      )}
    </div>
  );
};

export default RNDInputBox;
