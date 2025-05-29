import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ value, onChange }) => {
  const { startDate, endDate } = value;

  const handleStartChange = (date) => {
    onChange({ startDate: date, endDate });
  };

  const handleEndChange = (date) => {
    onChange({ startDate, endDate: date });
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="border px-2 py-1 rounded"
          placeholderText="Start date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          className="border px-2 py-1 rounded"
          placeholderText="End date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
