import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CustomDateTimePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeIntervals?: number;
};

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  selected,
  onChange,
  dateFormat = "yyyy-MM-dd h:mm aa",
  showTimeSelect = true,
  timeIntervals = 15,
}) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        timeIntervals={timeIntervals}
        dateFormat={dateFormat}
        className="w-full px-3 py-2 h-8 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm"
        calendarClassName="bg-white border border-gray-200 rounded-md shadow-lg text-sm z-9999"
      />
    </div>
  );
};

export default CustomDateTimePicker;
