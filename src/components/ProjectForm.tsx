import React, { useState } from 'react';
import { Project } from '../types/Project';

interface ProjectFormProps {
  onAddProject: (project: Project) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName.trim(),
      };
      onAddProject(newProject);
      setProjectName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};