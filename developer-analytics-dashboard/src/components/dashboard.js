import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Graph from './graph';
import Table from './table';
import TimeFilter from './timeFilter';
import SummaryData from './summaryData';
  
const Dashboard = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0);

    const startDatetimeDefault = oneMonthAgo.toISOString();
    const endDatetimeDefault = new Date().toISOString(); 
    const [logsData, setLogsData] = useState([]);
    const [summaryData, setSummaryData] = useState({
        totalUniqueUsers: 0,
        totalCalls: 0,
        totalFailures: 0,
      });
    const [filterType, setFilterType] = useState('last_7_days');
    const [startDatetime, setStartDatetime] = useState(startDatetimeDefault);
    const [endDatetime, setEndDatetime] = useState(endDatetimeDefault);

    const fetchData = async (startDatetime, endDatetime, filterType) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/logs`, {
                params: {
                filter_type: filterType,
                start_datetime: startDatetime,
                end_datetime: endDatetime,
                },
            });
            if (response.data && response.data.logs_data) {
                setLogsData(response.data.logs_data);
                const newSummaryData = {
                    totalUniqueUsers: response.data.total_unique_users,
                    totalCalls: response.data.total_calls,
                    totalFailures: response.data.total_failures,
                  };
                setSummaryData(newSummaryData);
            } else {
                console.error('Invalid data structure in the response:', response);
            }
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    const handleTimeFilterChange = (startDate, endDate, filterType) => {
        setFilterType(filterType);
        setStartDatetime(startDate);
        setEndDatetime(endDate);
    };

    useEffect(() => {
        fetchData(startDatetime, endDatetime, filterType);
    }, [filterType, startDatetime, endDatetime]);

    return (
        <div>
            <TimeFilter
                onFilterChange={handleTimeFilterChange}
                initialFilterType={filterType}
                startDate={startDatetimeDefault}
                endDate={endDatetimeDefault}
            />
            <SummaryData
                totalUniqueUsers={summaryData.totalUniqueUsers}
                totalCalls={summaryData.totalCalls}
                totalFailures={summaryData.totalFailures}
                startDate={startDatetimeDefault}
                endDate={endDatetimeDefault}
            />
            <Graph logsData={logsData} summaryData={summaryData}/>
            <Table logsData={logsData}/>
        </div>
    );
};

export default Dashboard;