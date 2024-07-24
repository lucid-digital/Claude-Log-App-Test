import React, { useState, useEffect } from 'react';
import { DeveloperLogForm } from './components/DeveloperLogForm';
import { DeveloperLogList } from './components/DeveloperLogList';
import { Sidebar } from './components/Sidebar';
import { DeveloperLog } from './types/DeveloperLog';
import { Project } from './types/Project';
import { categories } from './utils/categories';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

const App: React.FC = () => {
  const [logs, setLogs] = useState<DeveloperLog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`);
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      setError('Error fetching logs');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError('Error fetching projects');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchLogs(), fetchProjects()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addLog = async (newLog: Omit<DeveloperLog, "_id">): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLog),
      });
      if (!response.ok) {
        throw new Error('Failed to add log');
      }
      const addedLog = await response.json();
      setLogs((prevLogs) => [...prevLogs, addedLog]);
    } catch (error) {
      setError('Error adding log');
      console.error('Error adding log:', error);
    }
  };

  const addProject = async (newProject: Project) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      const addedProject = await response.json();
      setProjects((prevProjects) => [...prevProjects, addedProject]);
    } catch (error) {
      setError('Error adding project');
    }
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const filteredLogs = selectedProject
    ? logs.filter((log) => log.projectId === selectedProject._id)
    : logs;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <Sidebar projects={projects} onSelectProject={selectProject} onAddProject={addProject} />
      <div className="main-content">
        <h1>Developer Work Log</h1>
        <DeveloperLogForm onAddLog={addLog} categories={categories} projects={projects} />
        <DeveloperLogList logs={filteredLogs} selectedProjectId={selectedProject?._id || null} projects={projects} />
      </div>
    </div>
  );
};

export default App;