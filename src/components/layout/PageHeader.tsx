import React from "react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    buttonLabel?: string;
    buttonHref?: string;
    onButtonClick?: () => void;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    buttonLabel,
    buttonHref,
    onButtonClick,
    className = "",
}) => {
    return (
        <div className={`page-header flex items-center justify-between p-2 border-b ${className}`}>
            <h5 className="page-header-title text-base font-semibold">{title}</h5>

            {buttonLabel && (buttonHref || onButtonClick) && (
                <Link
                    to={buttonHref || "#"}
                    onClick={onButtonClick}
                    className="page-header-btn px-4 py-2 rounded cursor-pointer"
                >
                    {buttonLabel}
                </Link>
            )}
        </div>
    );
};

export default PageHeader;
