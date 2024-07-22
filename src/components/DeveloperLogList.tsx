import React from 'react';
import { DeveloperLog } from '../types/DeveloperLog';

interface DeveloperLogListProps {
  logs: DeveloperLog[];
}

export const DeveloperLogList: React.FC<DeveloperLogListProps> = ({ logs }) => {
  // Group logs by developer
  const logsByDeveloper = logs.reduce((acc, log) => {
    if (!acc[log.developerName]) {
      acc[log.developerName] = [];
    }
    acc[log.developerName].push(log);
    return acc;
  }, {} as Record<string, DeveloperLog[]>);

  const renderTable = (developerName: string, developerLogs: DeveloperLog[]) => {
    const totalHours = developerLogs.reduce((sum, log) => sum + log.hoursWorked, 0);

    return (
      <div key={developerName}>
        <h3>{developerName}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Hours</th>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {developerLogs.map((log) => (
              <tr key={log.id}>
                <td style={tableCellStyle}>{log.date}</td>
                <td style={tableCellStyle}>{log.hoursWorked}</td>
                <td style={tableCellStyle}>{log.category}</td>
                <td style={tableCellStyle}>{log.taskDescription}</td>
              </tr>
            ))}
            <tr>
              <td style={totalRowStyle} colSpan={3}>Total Hours:</td>
              <td style={totalRowStyle}>{totalHours.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h2>Developer Logs</h2>
      {Object.entries(logsByDeveloper).map(([developerName, developerLogs]) =>
        renderTable(developerName, developerLogs)
      )}
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  padding: '8px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
};

const totalRowStyle: React.CSSProperties = {
  fontWeight: 'bold',
  padding: '8px',
  borderTop: '2px solid #ddd',
};