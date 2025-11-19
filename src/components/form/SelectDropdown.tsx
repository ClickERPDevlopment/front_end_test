// select dropdown


import { ChevronDown } from 'lucide-react';
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

interface SelectDropdownProps<T> {
    options: T[];
    value: string;
    onChange: (value: string, item?: T) => void;
    onOpenChange?: (isOpen: boolean) => void;
    isSameKeyValue?: boolean;
    valueKey?: keyof T;
    labelKey?: keyof T;
    placeholder?: string;
    variant?: "default" | "flat" | "bordered";
    className?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    disabled?: boolean;
    showPlaceholder?: boolean;
}

const SelectDropdownInner = <T,>(
    {
        options,
        value,
        onChange,
        onOpenChange,
        isSameKeyValue = true,
        valueKey,
        labelKey,
        placeholder = "-- Select --",
        variant = "default",
        className = "",
        onKeyDown,
        disabled = false,
        showPlaceholder = true,
    }: SelectDropdownProps<T>,
    ref: React.Ref<HTMLDivElement>
) => {
    "use memo";
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Forward ref
    useEffect(() => {
        if (ref && typeof ref === "object") {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = containerRef.current;
        }
    }, [ref]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: T, val: string) => {
        onChange(val, item);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onOpenChange?.(false);
    };

    const heightToTextSize: Record<string, string> = {
        "h-6": "text-xs",
        "h-8": "text-xs",
        "h-10": "text-base",
        "h-12": "text-lg",
        "h-14": "text-xl",
    };

    const heightClass = className.split(" ").find((cls) => cls.startsWith("h-")) ?? "h-8";

    const dynamicTextSize = heightToTextSize[heightClass] ?? "text-sm";

    const variantClasses: Record<string, string> = {
        default: "border border-gray-300 dark:border-gray-600 dark:text-white",
        flat: "border-none dark:text-white",
        bordered: "border-2 border-blue-400 dark:border-blue-300 dark:text-white",
    };



    const displayedOptions = showPlaceholder ? [{} as T, ...options] : options;

    const getOptionValue = (item: T, index: number) =>
        index === 0 && showPlaceholder
            ? ""
            : isSameKeyValue
                ? (item as unknown as string)
                : String(item[valueKey!]);

    const getOptionLabel = (item: T, index: number) =>
        index === 0 && showPlaceholder
            ? placeholder
            : isSameKeyValue
                ? (item as unknown as string)
                : String(item[labelKey!]);

    const displayLabel =
        options.find((item) =>
            isSameKeyValue ? (item as unknown as string) === value : String(item[valueKey!]) === value
        )
            ? isSameKeyValue
                ? value
                : String(options.find((item) => String(item[valueKey!]) === value)?.[labelKey!])
            : placeholder;

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                setIsOpen(true);
                setHighlightedIndex(0);
                e.preventDefault();
            }
        } else {
            if (e.key === "ArrowDown") {
                setHighlightedIndex((prev) => Math.min(prev + 1, displayedOptions.length - 1));
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                e.preventDefault();
            } else if (e.key === "Enter") {
                if (highlightedIndex >= 0) {
                    handleSelect(displayedOptions[highlightedIndex], getOptionValue(displayedOptions[highlightedIndex], highlightedIndex));
                }
                e.preventDefault();
            } else if (e.key === "Escape") {
                setIsOpen(false);
                setHighlightedIndex(-1);
                e.preventDefault();
            }
        }

        if (onKeyDown) onKeyDown(e);
    };


    // function to open dropdown
    const openDropdown = () => {
        setIsOpen(true);
        onOpenChange?.(true);
    };

    // function to close dropdown
    const closeDropdown = () => {
        setIsOpen(false);
        onOpenChange?.(false);
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-60 text-black select-dropdown-container ${heightClass} ${className}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div
                onClick={() => {
                    if (disabled) return;

                    if (isOpen) {
                        closeDropdown();
                    } else {
                        openDropdown();
                    }
                }}
                className={`mt-0 flex items-center justify-between px-2 py-[5px] h-[30px] rounded-none cursor-pointer select-dropdown-input ${dynamicTextSize} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <span>{displayLabel}</span>
                {/* <span className="ml-2">&#9662;</span> */}
                <ChevronDown
                    size={12}
                    className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                />


            </div>


            {isOpen && !disabled && (
                <ul className={`absolute z-999 w-full select-dropdown-ul dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-none max-h-50 overflow-auto ${dynamicTextSize} scroll-smooth`}>
                    {displayedOptions.map((item, idx) => {
                        const optionValue = getOptionValue(item, idx);
                        const optionLabel = getOptionLabel(item, idx);
                        const isSelected = optionValue === value;
                        const isHighlighted = idx === highlightedIndex;

                        return (
                            <li
                                key={idx}
                                onClick={() => handleSelect(item, optionValue)}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                className={`px-2 py-2 min-h-[30px] cursor-pointer select-dropdown-ul-li m-[2px] z-0
                                    ${dynamicTextSize} 
                                    ${isHighlighted ? "active" : ""} 
                                    ${isSelected && !isHighlighted ? "selected" : ""}`}
                            >
                                {optionLabel}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

// const SelectDropdown = React.forwardRef(SelectDropdownInner) as <T>(
//     props: SelectDropdownProps<T> & { ref?: React.Ref<HTMLDivElement> }
// ) => ReturnType<typeof SelectDropdownInner>;

const SelectDropdown = React.forwardRef(SelectDropdownInner) as <T>(
    props: SelectDropdownProps<T> & { ref?: React.Ref<HTMLDivElement | HTMLSelectElement> }
) => ReturnType<typeof SelectDropdownInner>;


export default SelectDropdown;
