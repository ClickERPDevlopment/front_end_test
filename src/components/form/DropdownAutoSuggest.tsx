import { setDropdownData } from '@/app/dropdownSlice';
import { faEraser, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { createPortal } from 'react-dom';

type Props<T> = {
    name: string;
    onSelect?: (value: any, displayValue: any, item?: T) => void;
    className?: string;
    inputWidth?: number;
    value?: string | string[];
    disabled?: boolean;
    isMultiple?: boolean;
    variant?: "default" | "flat" | "bordered";
    onSearch?: (val: string) => void;       // for server-side search
    onScrollEnd?: () => void;               // for infinite scroll
    onFocus?: () => void;
    showSearchIcon?: boolean;
    showClearIcon?: boolean;
    showListIcon?: boolean;
};

const DropdownAutoSuggest = <T,>({
    name,
    onSelect,
    className = "",
    inputWidth,
    value,
    disabled = false,
    isMultiple = false,
    variant = "default",
    onSearch,
    onFocus,
    onScrollEnd,
    showSearchIcon = true,
    showClearIcon = true,
    showListIcon = false
}: Props<T>) => {
    const dispatch: AppDispatch = useDispatch();
    const dropdown = useSelector((state: RootState) => state.dropdown[name]);

    const { data = [], labelKey = 'label', valueKey = 'value', isLoading, searchCriteria } = dropdown || {};
    // isLoading
    // const [input, setInput] = useState(onSearch ? searchCriteria || "" : (typeof value === "string" ? value : ""));
    const [input, setInput] = useState((typeof value === "string" ? value : ""));
    const [searchText, setSearchText] = useState("");
    const [show, setShow] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const classList = className.trim().split(/\s+/);
    const hasWidthClass = classList.some((cls) => cls.startsWith("w-") || cls.startsWith("w-["));
    const hasHeightClass = classList.some((cls) => cls.startsWith("h-") || cls.startsWith("h-["));

    const rect = containerRef.current?.getBoundingClientRect();
    const top = rect ? rect.bottom + window.scrollY : 0;
    const left = rect ? rect.left + window.scrollX : 0;
    const width = containerRef.current?.offsetWidth || 200;


    // Height → Text Size Mapping
    const heightToTextSize: Record<string, string> = {
        "h-6": "text-xs",
        "h-8": "text-xs",
        "h-10": "text-base",
        "h-12": "text-lg",
        "h-14": "text-xl",
    };
    const heightClass = className.split(" ").find((cls) => cls.startsWith("h-")) ?? "h-8";
    const dynamicTextSize = heightToTextSize[heightClass] ?? "text-sm";

    // Variant Classes (synced with SelectDropdown)
    const variantClasses: Record<string, string> = {
        default: "border border-gray-300 dark:border-gray-600 dark:text-white",
        flat: "border-none dark:text-white",
        bordered: "border-2 border-blue-400 dark:border-blue-300 dark:text-white",
    };

    useEffect(() => {
        const handleCloseAllDropdowns = () => {
            setShow(false);
        };

        window.addEventListener("closeAllDropdowns", handleCloseAllDropdowns);
        return () => window.removeEventListener("closeAllDropdowns", handleCloseAllDropdowns);
    }, []);


    useEffect(() => {
        // console.log('autocomplete value ', value, data.length)
        if (!show) return;
        console.log('paged call')

    }, [currentPage, show]);


    useEffect(() => {
        // console.log('autocomplete value ', value, data.length)
        // console.log('set single value', value)
        if (!isMultiple) {

            if (typeof value === 'string') {
                setInput(value || '');
            }
        } else if (Array.isArray(value) && Array.isArray(data)) {
            const matched = data.filter((item) => value.includes(item[valueKey]));
            setSelectedItems(matched);
        }
    }, [value, data]);

    useEffect(() => {
        // console.log('autocomplete value ', value, data.length)
        if (listRef.current && highlightIndex >= 0) {
            const itemEl = listRef.current.children[highlightIndex] as HTMLElement;
            itemEl?.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightIndex]);

    const safeData = Array.isArray(data) ? data : [];
    const filtered = safeData.filter((item) =>
        item[labelKey]?.toLowerCase().includes(onSearch ? (searchText.toLowerCase()) : input.toLowerCase())
    );

    const handleSelect = (item: any) => {
        if (isMultiple) {
            if (!selectedItems.find((i) => i[valueKey] === item[valueKey])) {
                const newItems = [...selectedItems, item];
                setSelectedItems(newItems);
                onSelect?.(newItems.map(i => i[valueKey]), newItems.map(i => i[labelKey]), item);
            }
            setInput('');
        } else {
            setInput(item[labelKey]);
            setSearchText(item[labelKey])
            dispatch(setDropdownData({
                data,
                name,
                labelKey,
                valueKey,
                append: true,
                searchCriteria: item[labelKey],
                isLoading: true
            }));
            onSelect?.(item[valueKey], item[labelKey], item);
        }
        setShow(false);
        setHighlightIndex(-1);
    };

    const handleRemove = (item: any) => {
        const newItems = selectedItems.filter(i => i[valueKey] !== item[valueKey]);
        setSelectedItems(newItems);
        onSelect?.(newItems.map(i => i[valueKey]), newItems.map(i => i[labelKey]), item);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!show || filtered.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % filtered.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        } else if (e.key === 'Enter' && highlightIndex >= 0) {
            e.preventDefault();
            handleSelect(filtered[highlightIndex]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setShow(false);
            setHighlightIndex(-1);
        }
    };
    const handleClear = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleClearAll();
    };

    const handleClearAll = () => {
        setInput('');
        onSelect?.("", "",);
        dispatch(setDropdownData({
            data,
            name,
            labelKey,
            valueKey,
            searchCriteria: "",
            append: true,
            isLoading: true
        }));
    }


    const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // console.log({ scrollTop, scrollHeight, clientHeight })
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setCurrentPage(prev => prev + 1);
            if (onScrollEnd) {
                console.log('onScrollEnd call')
                dispatch(setDropdownData({
                    data,
                    name,
                    labelKey,
                    valueKey,
                    append: true,
                    isLoading: true
                }));
                onScrollEnd();
            }
        }
    };

    return (
        <div
            className={`relative w-full ${heightClass} ${className}`}
            ref={containerRef}
        >
            <div
                className={`mt-0 flex flex-col h-[30px] rounded-none shadow-sm text-gray-900 dark:text-white  cursor-pointer dropdown-auto-suggest-input
                ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onMouseDown={(e) => {
                    // Only prevent default if NOT clicking on the input or its children (Input box text extraction with mouse)
                    if (e.target !== inputRef.current) {
                        e.preventDefault();
                        inputRef.current?.focus();
                        setShow(true);
                    }
                }}

            >
                <div className={`flex items-center h-[30px] justify-between px-2 py-[5px] z-0 ${dynamicTextSize}`}>
                    {/* Search Icon */}
                    {input ? (
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();         // prevent input blur
                                e.stopPropagation();        // stop parent onMouseDown from firing
                            }}
                            onClick={handleClear}
                            className="ml-2 py-[5px] text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
                            type="button"
                        >
                            {showClearIcon && (
                                <FontAwesomeIcon icon={faEraser} className='mr-2' />
                            )}
                        </button>
                    ) : (
                        showSearchIcon && !input && (
                            <FontAwesomeIcon icon={faSearch} className="ml-2 mr-2 text-gray-500" />
                        )
                    )}
                    {/* Input Section */}
                    <input
                        ref={inputRef}
                        value={onSearch ? searchText : input}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                                handleClearAll();
                            }
                            console.log({ searchCriteria, val })
                            setInput(val);
                            setShow(true);
                            if (onSearch) {
                                setSearchText(val);
                                // dispatch(setDropdownData({
                                //     data,
                                //     name,
                                //     labelKey,
                                //     valueKey,
                                //     searchCriteria: val
                                // }));
                                onSearch(val);
                            }
                        }}
                        onFocus={() => {
                            setShow(true)
                            if (onFocus) { onFocus() }
                        }
                        }
                        // onBlur={() => {
                        //     setTimeout(() => {
                        //         setShow(false);
                        //         const matchedItem = data.find(item => item[labelKey]?.toLowerCase() === input.toLowerCase());
                        //         if (!matchedItem) {
                        //             setInput('');
                        //             // onSelect?.('', '');
                        //         }
                        //     }, 150);
                        // }}
                        onBlur={() => {
                            setTimeout(() => {
                                setShow(false);
                            }, 150);
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        className={`flex-grow w-full h-[30px] border-none outline-none auto-suggestion-focus-input ${dynamicTextSize}`}

                    />

                </div>

                {/* Dropdown List */}
                {show && !disabled && createPortal(
                    <div className='light'>
                        <div className='default'>
                            <ul
                                onScroll={handleScroll}
                                ref={listRef}
                                className={`dropdown-auto-suggest-ul absolute max-h-60 overflow-y-auto z-[9999] rounded-md p-0 m-0 shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
                                style={{ top, left, width, }}
                            >
                                {filtered.length > 0 ? (
                                    filtered.map((item, idx) => (
                                        <li
                                            key={idx}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleSelect(item)}
                                            className={`dropdown-auto-suggest-ul-li px-3 py-2 cursor-pointer m-[2px] ${dynamicTextSize} ${idx === highlightIndex ? 'active' : ''}`}
                                        >
                                            <div className='flex items-center'>
                                                {showListIcon && (
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className='dropdown-auto-suggest-icon mr-2'
                                                    />
                                                )}
                                                {item[labelKey]}
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className={`px-4 py-2 h-[30px] text-gray-400 italic select-none ${dynamicTextSize}`}>
                                        No data found
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </div>
    );
};

export default DropdownAutoSuggest;
