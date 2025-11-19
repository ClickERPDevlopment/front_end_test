import React from "react";

interface SpanProps {
    children: React.ReactNode;
    color?: string; // text color, e.g., "#1F7BC9"
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | string; // Tailwind size or custom
    weight?: "normal" | "medium" | "bold"; // font weight
    italic?: boolean;
    underline?: boolean;
    className?: string; // additional classes
}

const Span: React.FC<SpanProps> = ({
    children,
    color,
    size = "base",
    weight = "normal",
    italic = false,
    underline = false,
    className = "",
}) => {
    const weightClass =
        weight === "bold" ? "font-bold" : weight === "medium" ? "font-medium" : "font-normal";

    const sizeClass = ["xs", "sm", "base", "lg", "xl", "2xl"].includes(size)
        ? `text-${size}`
        : "";

    const style = color ? { color } : undefined;

    return (
        <span
            className={`${weightClass} ${sizeClass} ${italic ? "italic" : ""} ${underline ? "underline" : ""} ${className}`}
            style={style}
        >
            {children}
        </span>
    );
};

export default Span;
