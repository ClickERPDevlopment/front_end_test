import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useState } from "react";

interface InputBoxProps {
    id?: string;
    name?: string;
    type?: "text" | "number" | "password" | "email" | "tel";
    value: string | number;
    onChange?: (value: string) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    placeholderClassName?: string;
    variant?: "default" | "flat" | "bordered";
    className?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    showPasswordToggle?: boolean;
    rounded?: boolean;
};

const SimpleInputBox = forwardRef<HTMLInputElement, InputBoxProps>(
    (
        {
            id,
            name,
            type = "text",
            value,
            onChange,
            onFocus,
            onBlur,
            onKeyDown,
            placeholder = "",
            placeholderClassName = "",
            variant = "default",
            className = "",
            disabled = false,
            required = false,
            readOnly = false,
            autoFocus = false,
            maxLength,
            minLength,
            pattern,
            showPasswordToggle = false,
            rounded = true
        },
        ref
    ) => {
        "use memo";
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const inputType = showPasswordToggle && type === "password" && showPassword ? "text" : type;

        const classList = className.trim().split(/\s+/);
        const hasWidthClass = classList.some((cls) => cls.startsWith("w-") || cls.startsWith("w-["));
        const hasHeightClass = classList.some((cls) => cls.startsWith("h-") || cls.startsWith("h-["));

        return (
            <div className="relative w-full">
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onKeyDown={(e) => onKeyDown?.(e)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`${!hasWidthClass ? "w-full" : ""} ${!hasHeightClass ? "h-[30px]" : ""} ${rounded === false ? "" : "rounded"} mt-0 simple-input-box px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        }  placeholder-gray-300 ${placeholderClassName}  ${className}`}
                    disabled={disabled}
                    required={required}
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    minLength={minLength}
                    pattern={pattern}
                />
                {showPasswordToggle && type === "password" && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/4 transform-translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="lg" className="text-black" />
                    </button>
                )}
            </div>
        );
    }
);

SimpleInputBox.displayName = "SimpleInputBox";

export default SimpleInputBox;