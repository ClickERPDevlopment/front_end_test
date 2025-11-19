import { useState, useEffect } from "react";
import { TabItem } from "../../types/global";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";

interface TabsProps {
    tabs: TabItem[];
    variant?: "default" | "underline" | "pill";
    tabButtonClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, variant = "default", tabButtonClassName = "" }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { setHash } = useTheme();

    // On mount, check URL hash
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        const index = tabs.findIndex(tab => tab.href === hash);
        if (index >= 0) setActiveIndex(index);
    }, [tabs]);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        if (tabs[index].href) {
            const newHash = `#${tabs[index].href}`;
            window.history.replaceState(null, "", newHash);
            setHash(newHash);
        }
    };

    const getButtonClass = (index: number) => {
        const isActive = index === activeIndex;
        const baseClass = (() => {
            switch (variant) {
                case "underline":
                    return clsx(
                        "py-2 px-4 text-sm font-medium border-b-2 transition-colors tab-underline",
                        isActive ? "active" : ""
                    );
                case "pill":
                    return clsx(
                        "py-1.5 px-4 text-sm rounded-full mx-1 transition-all tab-pill",
                        isActive ? "active" : ""
                    );
                default:
                    return clsx(
                        "py-1.5 border transition-all text-sm tab-default",
                        isActive ? "active" : ""
                    );
            }
        })();

        return clsx(baseClass, tabButtonClassName);
    };

    return (
        <div className="w-full">
            <div className={clsx("flex", variant === "pill" && "justify-center space-x-2")}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={getButtonClass(index)}
                        onClick={() => handleClick(index)}
                    >
                        <span>{tab.label}</span>
                        {/* Only render badge if count is provided */}
                        {typeof tab.count === "number" && (
                            <span
                                className={clsx(
                                    "ml-1 px-2 py-0.5 text-xs rounded-full tab-badge",
                                    index === activeIndex && "active"
                                )}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
            <div className="pt-4 text-gray-800 dark:text-gray-100">
                {tabs[activeIndex].content}
            </div>
        </div>
    );
};

export default Tabs;
