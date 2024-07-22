import React, { useState } from 'react';
import { Project } from '../types/Project';
import { ProjectForm } from './ProjectForm';

interface SidebarProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const projectColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
  '#F06292', '#AED581', '#7986CB', '#4DB6AC', '#FFD54F'
];

export const Sidebar: React.FC<SidebarProps> = ({ projects, onSelectProject }) => {
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