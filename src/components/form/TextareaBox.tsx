import React from "react";

type TextareaBoxProps = {
    id?: string;
    name?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    variant?: "default" | "flat" | "bordered";
    className?: string;
};

const variantClasses: Record<string, string> = {
    default: "textarea-default",
    flat: "textarea-flat",
    bordered: "textarea-bordered",
};

const TextareaBox: React.FC<TextareaBoxProps> = ({
    id,
    name,
    value,
    onChange,
    placeholder = "",
    rows = 4,
    variant = "default",
    className = "",
}) => {
    return (
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`textarea-base ${variantClasses[variant]} ${className}`}
            style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
            }}
        />
    );
};

export default TextareaBox;
