import React, { ReactNode } from "react";

interface TooltipProps {
    content: string;
    position?: "top" | "bottom" | "left" | "right";
    children: ReactNode;
    dotted?: boolean;
    shape?: "round" | "square";  // Added shape prop
    className?: string;
}

const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip: React.FC<TooltipProps> = ({
    content,
    position = "top",
    children,
    dotted = false,
    shape = "round",  // Default shape is round
    className = "",
}) => {
    // Conditional class for the tooltip shape
    const shapeClasses = shape === "round" ? "rounded-xl" : "rounded-none";

    return (
        <div className="relative group inline-block">
            {/* Tooltip bubble */}
            <div
                className={`absolute z-20 w-max max-w-xs px-3 py-1.5 text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none tooltip-bubble ${positionClasses[position]} ${shapeClasses} ${className}`}
            >
                {content}
            </div>

            {/* Target with optional dotted style */}
            <div
                className={`
                    ${dotted ? "truncate max-w-[160px] cursor-help border-b border-dotted tooltip-dotted" : ""}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Tooltip;
