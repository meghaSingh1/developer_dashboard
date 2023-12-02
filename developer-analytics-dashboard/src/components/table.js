import React from 'react';
import '../css/table.css';

const Table = ({ logsData }) => {
  console.log("Table",logsData);
  return (
    <div className='table-container'>
    <table className="Table">
      <thead className="thead">
        <tr>
          <th className="th">User ID</th>
          <th className="th">Timestamp</th>
          <th className="th">Status</th>
          <th className="th">Error Message</th>
          <th className="th">Request</th>
          <th className="th">Response</th>
        </tr>
      </thead>
      <tbody>
        {logsData.map((log, index) => (
          <tr key={index} className="tr">
            <td className="td">{log.user_id}</td>
            <td className="td">{log.timestamp}</td>
            <td className="td">{log.status}</td>
            <td className="td">{log.error_message}</td>
            <td className="td">{JSON.stringify(log.request)}</td>
            <td className="td">{JSON.stringify(log.response)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
