import React, { useState } from 'react';
import { Project } from '../types/Project';
import { ProjectForm } from './ProjectForm';

interface SidebarProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ projects, onSelectProject }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="sidebar">
      <button onClick={toggleForm}>Add Project</button>
      {showForm && (
        <div className="popup">
          <ProjectForm onAddProject={(project) => {
            onSelectProject(project);
            toggleForm();
          }} />
          <button onClick={toggleForm}>Close</button>
        </div>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => onSelectProject(project)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};