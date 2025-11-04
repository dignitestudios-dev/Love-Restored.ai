/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({
  label = "Select Date",
  value,
  onChange,
  minDate = null,
  maxDate = null,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      {/* {label && (
        <label className="text-sm font-medium block mb-1 text-gray-300">
          {label}
        </label>
      )} */}

      {/* Display Field */}
      <div
        className="border border-gray-600 bg-gray-800 text-gray-200 rounded-lg w-[250px] mt-4
        px-3 py-3 flex items-center justify-between text-sm cursor-pointer hover:border-blue-500 transition"
        onClick={() => setShowPicker(!showPicker)}
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value ? moment(value).format("MM-DD-YYYY") : label}
        </span>
      </div>

      {/* Date Picker Popup */}
      {showPicker && (
        <div className="absolute z-50 mt-2 bg-gray-900 rounded-lg shadow-lg p-2">
          <DatePicker
            selected={value}
            onChange={(date) => {
              onChange(date);
              setShowPicker(false);
            }}
            minDate={minDate}
            maxDate={maxDate}
            inline
            calendarClassName="dark-datepicker"
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
