import React from 'react';
import { Line } from 'react-chartjs-2';
import '../css/graph.css';

const Graph = ({ logsData, summaryData }) => {
  const aggregateDataByDay = () => {
    const aggregatedData = {};
  
    logsData.forEach((log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      
      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          users: new Set(),
          calls: 0,
          failures: 0,
        };
      }
  
      aggregatedData[date].users.add(log.user_id);
  
      if (log.status === 'success') {
        aggregatedData[date].calls += 1;
      } else if (log.status === 'failed') {
        aggregatedData[date].failures += 1;
      }
    });
  
    const sortedDates = Object.keys(aggregatedData).sort();
  
    const sortedData = sortedDates.map((date) => ({
      date,
      users: aggregatedData[date].users.size,
      calls: aggregatedData[date].calls,
      failures: aggregatedData[date].failures,
    }));
  
    return sortedData;
  };

  const sortedData = aggregateDataByDay();

  const labels = sortedData.map((data) => data.date);
  const usersData = sortedData.map((data) => data.users);
  const callsData = sortedData.map((data) => data.calls);
  const failuresData = sortedData.map((data) => data.failures);

  const userData = {
    labels: labels,
    datasets: [
      {
        label: 'Unique Users',
        data: usersData,
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const callsAndFailuresData = {
    labels: labels,
    datasets: [
      {
        label: 'Successful Calls',
        data: callsData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Failures',
        data: failuresData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className='graph-container'>
      <div className='graph'>
        <h3>Unique Users Graph</h3>
        <Line data={userData} options={options} />
      </div>
      <div className='graph'>
        <h3>Calls and Failures Graph</h3>
        <Line data={callsAndFailuresData} options={options} />
      </div>
    </div>
  );
};

export default Graph;
