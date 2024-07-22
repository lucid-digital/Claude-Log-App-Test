import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectMenuProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onSelectProject: (projectId: string | null) => void;
  selectedProjectId: string | null;
}

export const ProjectMenu: React.FC<ProjectMenuProps> = ({
  projects,
  onAddProject,
  onSelectProject,
  selectedProjectId
}) => {
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: newProjectName.trim()
      };
      onAddProject(newProject);
      setNewProjectName('');
    }
  };

  return (
    <div className="project-menu">
      <h2>Projects</h2>
      <div>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name"
        />
        <button onClick={handleAddProject}>Add New Project</button>
      </div>
      <ul>
        <li
          className={selectedProjectId === null ? 'selected' : ''}
          onClick={() => onSelectProject(null)}
        >
          All Projects
        </li>
        {projects.map((project) => (
          <li
            key={project.id}
            className={selectedProjectId === project.id ? 'selected' : ''}
            onClick={() => onSelectProject(project.id)}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};