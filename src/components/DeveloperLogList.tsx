import React from 'react';
import { DeveloperLog } from '../types/DeveloperLog';

interface DeveloperLogListProps {
  logs: DeveloperLog[];
}

const calculateTotalHours = (logs: DeveloperLog[]): { [key: string]: number } => {
  return logs.reduce((acc, log) => {
    acc[log.developerName] = (acc[log.developerName] || 0) + log.hoursWorked;
    return acc;
  }, {} as { [key: string]: number });
};

export const DeveloperLogList: React.FC<DeveloperLogListProps> = ({ logs }) => {
  const totalHours = calculateTotalHours(logs);

  return (
    <div>
      <h2>Developer Logs</h2>
      <div>
        <h3>Total Hours per Developer:</h3>
        <ul>
          {Object.entries(totalHours).map(([name, hours]) => (
            <li key={name}>{name}: {hours} hours</li>
          ))}
        </ul>
      </div>
      {logs.length === 0 ? (
        <p>No logs yet. Add a new log to get started!</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.developerName}</strong> - {log.date}
              <br />
              Category: {log.category}
              <br />
              Hours: {log.hoursWorked}
              <br />
              Task: {log.taskDescription}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};