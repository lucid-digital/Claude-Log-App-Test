import React, { useState } from 'react';
import { Project } from '../types/Project';
import { ProjectForm } from './ProjectForm';
import { projectColors } from '../utils/colors';

interface SidebarProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onAddProject: (project: Project) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ projects, onSelectProject, onAddProject }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="sidebar">
      <button className="add-project-btn" onClick={toggleForm}>Add Project</button>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add New Project</h2>
            <ProjectForm onAddProject={(project) => {
              onAddProject(project);
              onSelectProject(project);
              toggleForm();
            }} />
            <button className="close-btn" onClick={toggleForm}>Close</button>
          </div>
        </div>
      )}
      <ul className="project-list">
        {projects.map((project, index) => (
          <li 
            key={project.id} 
            onClick={() => onSelectProject(project)}
            style={{ backgroundColor: projectColors[index % projectColors.length] }}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};