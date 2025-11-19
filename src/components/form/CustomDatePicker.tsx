import { useTheme } from "@/hooks/useTheme";
import { ChevronRight } from "lucide-react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft } from "react-feather";
import { DateFormatType } from "../../types/global";

interface CustomDatePickerProps {
    onChange: (date: Date | null) => void;
    selected: Date | null;
    dateFormat?: DateFormatType;
    disabled?: boolean;
    className?: string;
    monthYearOnly?: boolean;
    colored?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    onChange,
    selected,
    className = "",
    disabled = false,
    monthYearOnly = false,
    dateFormat = "",
    colored = false
}) => {
    const { datePickerFormat, } = useTheme();

    return (
        <div className={` w-full ${className}`}>
            <DatePicker
                selected={selected}
                disabled={disabled}
                onChange={onChange}
                dateFormat={dateFormat || datePickerFormat}
                placeholderText={dateFormat}
                showMonthYearPicker={monthYearOnly}
                wrapperClassName="w-full"
                className={`!w-full !h-[30px] mt-1 block px-3 border bg-[#FFFFF9] 
                                    shadow-sm focus:outline-none focus:ring-[#51A2FF] focus:border-[#51A2FF]
                                    sm:text-sm text-colorBlack dark:text-colorWhite 
                                     ${className} ${colored ? 'bg-amber-50' : ''}`}
                
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div className="flex justify-between items-center px-2 py-1 bg-[#f5f5f5] dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 rounded-t">
                        <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            className=" rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div className="flex gap-2">
                            <select
                                value={date.getFullYear()}
                                onChange={(e) => changeYear(Number(e.target.value))}
                                className={`w-[60px] border border-gray-300`}
                            >
                                {Array.from({ length: 50 }, (_, i) => {
                                    const year = new Date().getFullYear() - 25 + i;
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                value={date.getMonth()}
                                onChange={(e) => changeMonth(Number(e.target.value))}
                                className={`w-[60px] border border-gray-300`}
                            >
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {new Date(0, i).toLocaleString("default", { month: "short" })}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            className=" rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                           <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default CustomDatePicker;
