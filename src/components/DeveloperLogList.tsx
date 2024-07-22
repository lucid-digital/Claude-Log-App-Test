import React, { useMemo } from 'react';
import { DeveloperLog } from '../types/DeveloperLog';

interface DeveloperLogListProps {
  logs: DeveloperLog[];
}

export const DeveloperLogList: React.FC<DeveloperLogListProps> = ({ logs }) => {
  const groupedLogs = useMemo(() => {
    console.log('Grouping logs:', logs);
    const grouped = logs.reduce((acc, log) => {
      const name = log.developerName.toLowerCase();
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(log);
      return acc;
    }, {} as Record<string, DeveloperLog[]>);
    console.log('Grouped logs:', grouped);
    return grouped;
  }, [logs]); // Add logs to the dependency array

  const calculateTotalHours = (developerLogs: DeveloperLog[]): number => {
    return developerLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  console.log('Rendering DeveloperLogList with groupedLogs:', groupedLogs);

  return (
    <div>
      {Object.entries(groupedLogs).map(([developerName, developerLogs]) => (
        <div key={developerName} className="developer-table-container">
          <h2>{developerLogs[0].developerName}</h2>
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