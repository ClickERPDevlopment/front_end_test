import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface DynamicTooltipTextProps {
    text: string;
    maxLength?: number; // default length limit
}
 
const DynamicTooltipText: React.FC<DynamicTooltipTextProps> = ({
    text,
    maxLength = 20
}) => {
    const isLong = text.length > maxLength;
    const displayText = isLong ? text.slice(0, maxLength) + "..." : text;
    const uniqueId = `tooltip-${Math.random().toString(36).substring(2, 9)}`;
 
    return (
        <>
            <span
                id={uniqueId}
                style={{ cursor: isLong ? "pointer" : "default" }}
            >
                {displayText}
            </span>

            {isLong && (
                <Tooltip
                    anchorSelect={`#${uniqueId}`}
                    content={text}
                    place="top"
                    style={{ zIndex: 9999 }}
                />
            )}
        </>
    );
};

export default DynamicTooltipText;
