import React, { useState } from "react";
interface PanelProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    contentClassName?: string;
    isCollapsible?: boolean;
    defaultCollapsed?: boolean;
    onToggleCollapse?: (isCollapsed: boolean) => void;
    rounded?: boolean;
}

const Panel: React.FC<PanelProps> = ({
    header,
    footer,
    children,
    className = "",
    headerClassName = "",
    footerClassName = "",
    contentClassName = "",
    isCollapsible = false,
    defaultCollapsed = false,
    onToggleCollapse,
    rounded = true
}) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const handleToggleCollapse = () => {
        if (isCollapsible) {
            setIsCollapsed(!isCollapsed);
            onToggleCollapse?.(!isCollapsed);
        }
    };

    const roundedClass = rounded ? "rounded-lg" : "rounded-none";
    const showFooter = footer && !isCollapsed;

    return (
        <div className={`panel shadow-lg ${roundedClass} ${className}`}>
            {/* Header */}
            {header && (
                <>{header}</>
            )}

            {/* Content */}
            {!isCollapsed && (
                <div className={`px-4 pb-4  ${contentClassName} ${!header && rounded ? "rounded-t-lg" : ""
                    } ${!showFooter && rounded ? "rounded-b-lg" : ""
                    }`}>
                    {children}
                </div>
            )}

            {/* Footer */}
            {showFooter && (
                <>{footer}</>
            )}
        </div>
    );
};

export default Panel;