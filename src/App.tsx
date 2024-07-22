import React, { useState } from 'react';
import { DeveloperLogForm } from './components/DeveloperLogForm';
import { DeveloperLogList } from './components/DeveloperLogList';
import { Sidebar } from './components/Sidebar';
import { ProjectForm } from './components/ProjectForm';
import { DeveloperLog } from './types/DeveloperLog';
import { Project } from './types/Project';
import { categories } from './utils/categories';
import './App.css';

const App: React.FC = () => {
  const [logs, setLogs] = useState<DeveloperLog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const addLog = (newLog: DeveloperLog) => {
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const addProject = (newProject: Project) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const filteredLogs = selectedProject
    ? logs.filter((log) => log.projectId === selectedProject.id)
    : logs;

  return (
    <div className="app-container">
      <Sidebar projects={projects} onSelectProject={selectProject} />
      <div className="main-content">
        <h1>Developer Work Log</h1>
        <ProjectForm onAddProject={addProject} />
        <DeveloperLogForm onAddLog={addLog} categories={categories} projects={projects} />
        <DeveloperLogList logs={filteredLogs} selectedProjectId={selectedProject?.id || null} projects={projects} />
      </div>
    </div>
  );
};

export default App;