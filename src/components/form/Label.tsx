import React from "react";

interface LabelProps {
    text: string; // Label text
    position?: "top" | "bottom" | "left" | "right"; // Label position
    required?: boolean; // Show asterisk for required fields
    disabled?: boolean; // Disabled state
    className?: string; // Custom class for the label
    htmlFor?: string; // Associate label with an input (for accessibility)
    weight?: "normal" | "medium" | "bold"; // Font weight
}

const Label: React.FC<LabelProps> = ({
    text,
    position = "top",
    required = false,
    disabled = false,
    className = "",
    htmlFor,
    weight = "bold" // default to bold
}) => {

    // Disabled state styles
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

    // Font weight classes
    const weightClass = weight === "bold" ? "font-bold" : weight === "medium" ? "font-medium" : "font-normal";

    return (
        <label
            htmlFor={htmlFor}
            className={`${weightClass} ${disabledStyles} ${className}`}
            style={{
                display: "block",
                marginBottom: position === "top" ? "0.5rem" : "0",
                marginRight: position === "left" ? "0.5rem" : "0",
                marginLeft: position === "right" ? "0.5rem" : "0",
                marginTop: position === "bottom" ? "0.5rem" : "0",
            }}
        >
            {text}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export default Label;
