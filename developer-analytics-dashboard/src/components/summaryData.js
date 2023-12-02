import React from 'react';
import '../css/summaryData.css'

const SummaryData = ({ totalUniqueUsers, totalCalls, totalFailures }) => {
  return (
    <div className='SummaryData'>
      <p>Total Unique Users: {totalUniqueUsers}</p>
      <p>Total Calls: {totalCalls}</p>
      <p>Total Failures: {totalFailures}</p>
    </div>
  );
};

export default SummaryData;
