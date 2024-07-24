import React, { useMemo } from 'react';
import { DeveloperLog, Project } from '../types';
import { projectColors } from '../utils/colors';

interface DeveloperLogListProps {
  logs: DeveloperLog[];
  selectedProjectId: string | null;
  projects: Project[];
}

export const DeveloperLogList: React.FC<DeveloperLogListProps> = ({ logs, selectedProjectId, projects }) => {
  const getProjectColor = (projectId: string): string => {
    const index = projects.findIndex(p => p._id === projectId);
    return projectColors[index % projectColors.length];
  };
  const filteredAndGroupedLogs = useMemo(() => {
    const filteredLogs = selectedProjectId
      ? logs.filter(log => log.projectId === selectedProjectId)
      : logs;

    return filteredLogs.reduce((acc, log) => {
      const name = log.developerName.toLowerCase();
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(log);
      return acc;
    }, {} as Record<string, DeveloperLog[]>);
  }, [logs, selectedProjectId]);

  const calculateTotalHours = (developerLogs: DeveloperLog[]): number => {
    return developerLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const selectedProject = projects.find(p => p._id === selectedProjectId);

  return (
    <div>
      {selectedProject && (
        <h2 style={{ color: getProjectColor(selectedProject._id) }}>
          Project: {selectedProject.name}
        </h2>
      )}
      {Object.entries(filteredAndGroupedLogs).map(([developerName, developerLogs]) => (
        <div key={developerName} className="developer-table-container">
          <h3>{developerName}</h3>
          <table className="developer-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Category</th>
                <th>Description</th>
                {!selectedProjectId && <th>Project</th>}
              </tr>
            </thead>
            <tbody>
              {developerLogs.map((log) => (
                <tr key={log._id}>
                  <td>{formatDate(log.date)}</td>
                  <td>{log.hoursWorked.toFixed(1)}</td>
                  <td>{log.category}</td>
                  <td>{log.taskDescription}</td>
                  {!selectedProjectId && (
                    <td>
                      <span style={{ color: getProjectColor(log.projectId) }}>
                        {projects.find(p => p._id === log.projectId)?.name || 'N/A'}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={selectedProjectId ? 4 : 5} className="total-hours">
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