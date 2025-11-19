import React, { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";

type Option = {
    label: string;
    value: string;
};

interface AutoSuggestProps {
    sameKeyValue?: boolean;
    staticData?: Option[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOptionsThunk?: (params: { query: string; page: number }) => any;
    onSelect: (value: string) => void;
    placeholder?: string;
}

const RNDAutoSuggest: React.FC<AutoSuggestProps> = ({
    staticData,
    fetchOptionsThunk,
    onSelect,
    placeholder,
}) => {
    const [input, setInput] = useState<string>("");
    const [options, setOptions] = useState<Option[]>([]);
    const [page,] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    // const [activeIndex, setActiveIndex] = useState(-1);
    // const [filtered, setFiltered] = useState<string[]>([]);

    const dispatch: AppDispatch = useDispatch();

    const loadOptions = async (reset = false) => {
        if (fetchOptionsThunk) {
            try {
                const currentPage = reset ? 1 : page;
                if (fetchOptionsThunk) {
                    const thunkResult = await dispatch(fetchOptionsThunk({ query: input, page: currentPage })).unwrap();
                    setOptions(thunkResult);
                }

                // setOptions(prev => (reset ? result : [...prev, ...result]));
                // setPage(reset ? 2 : currentPage + 1);
                // setHasMore(result.length > 0);
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        } else if (staticData) {
            const filtered = staticData.filter(opt =>
                opt.label.toLowerCase().includes(input.toLowerCase())
            );
            setOptions(filtered);
            setHasMore(false);
        }
    };

    useEffect(() => {
        loadOptions(true);
    }, [input]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom =
            e.currentTarget.scrollHeight -
            e.currentTarget.scrollTop ===
            e.currentTarget.clientHeight;
        if (bottom && hasMore && fetchOptionsThunk) {
            loadOptions();
        }
    };

    const handleSelect = (option: Option) => {
        setInput(option.label);
        setShowDropdown(false);
        onSelect(option.value);
    };

    //       const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (!showDropdown || filtered.length === 0) return;

    //     if (e.key === 'ArrowDown') {
    //       setActiveIndex((prev) => (prev + 1) % filtered.length);
    //     } else if (e.key === 'ArrowUp') {
    //       setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    //     } else if (e.key === 'Enter') {
    //       if (activeIndex >= 0 && filtered[activeIndex]) {
    //         handleSelect(filtered[activeIndex]);
    //       }
    //     }
    //   };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-md" ref={containerRef}>
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                // onKeyDown={handleKeyDown}
                placeholder={placeholder || "Search..."}
            />

            {showDropdown && options.length > 0 && (
                <div
                    className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg"
                    onScroll={handleScroll}
                >
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => handleSelect(opt)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                            {opt.label}
                        </div>
                    ))}
                    {hasMore && fetchOptionsThunk && (
                        <div className="px-4 py-2 text-center text-sm text-gray-500">
                            Loading more...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RNDAutoSuggest;
