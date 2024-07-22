import React from 'react';
import { DeveloperLog } from '../types/DeveloperLog';

interface DeveloperLogListProps {
  logs: DeveloperLog[];
}

export const DeveloperLogList: React.FC<DeveloperLogListProps> = ({ logs }) => {
  return (
    <div>
      <h2>Developer Logs</h2>
      {logs.length === 0 ? (
        <p>No logs yet. Add a new log to get started!</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.developerName}</strong> - {log.date}
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