import React, { useMemo } from 'react';
import { DeveloperLog } from '../types/DeveloperLog';

interface DeveloperLogListProps {
  logs: DeveloperLog[];
}

export const DeveloperLogList: React.FC<DeveloperLogListProps> = ({ logs }) => {
  const logsByDeveloper = useMemo(() => {
    return logs.reduce((acc, log) => {
      if (!acc[log.developerName]) {
        acc[log.developerName] = [];
      }
      acc[log.developerName].push(log);
      return acc;
    }, {} as Record<string, DeveloperLog[]>);
  }, [logs]);

  const calculateTotalHours = (developerLogs: DeveloperLog[]): number => {
    return developerLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h2>Developer Logs</h2>
      {Object.entries(logsByDeveloper).map(([developerName, developerLogs]) => (
        <div key={developerName} className="developer-table-container">
          <h3>{developerName}</h3>
          <table className="developer-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {developerLogs.map((log) => (
                <tr key={log.id}>
                  <td>{formatDate(log.date)}</td>
                  <td>{log.hoursWorked.toFixed(1)}</td>
                  <td>{log.category}</td>
                  <td>{log.taskDescription}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="total-hours">
                  Total Hours: {calculateTotalHours(developerLogs).toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
};