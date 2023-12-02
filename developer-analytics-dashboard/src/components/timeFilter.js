import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/timeFilter.css';

const TimeFilter = ({ onFilterChange, startDate, endDate, initialFilterType }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(startDate));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(endDate));
  const [filterType, setFilterType] = useState(initialFilterType);

  useEffect(() => {
    onFilterChange(selectedStartDate, selectedEndDate, filterType);
  }, [selectedStartDate, selectedEndDate, filterType, onFilterChange]);

  const handleFilterChange = () => {
    onFilterChange(selectedStartDate, selectedEndDate, filterType);
  };

  const maxEndDate = new Date();

  return (
    <div className="TimeFilter">
      <div className="filter-container">
        <label>Start Date:</label>
        <DatePicker
          selected={selectedStartDate}
          onChange={(date) => setSelectedStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
          maxDate={maxEndDate}
        />
        <label>End Date:</label>
        <DatePicker
          selected={selectedEndDate}
          onChange={(date) => setSelectedEndDate(date)}
          showTimeSelect
          dateFormat="Pp"
          maxDate={maxEndDate}
        />
        <label>Filter Type:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="last_24_hours">Last 24 Hours</option>
          <option value="last_7_days">Last 7 Days</option>
          <option value="custom">Custom</option>
        </select>

        <button onClick={handleFilterChange}>Apply Filter</button>
      </div>
    </div>
  );
};

export default TimeFilter;
