import React, { useState } from 'react';
import { DeveloperLog, Project } from '../types';
import { isValidCategory } from '../utils/categories';
import { formatDateForAPI } from '../utils/dateUtils';

interface DeveloperLogFormProps {
  onAddLog: (log: Omit<DeveloperLog, '_id'>) => void;
  categories: string[];
  projects: Project[];
}

interface FormState {
  taskDescription: string;
  hours: string;
  date: string;
  category: string;
  projectId: string;
  developerName: string;
}

const initialFormState: FormState = {
  taskDescription: '',
  hours: '',
  date: '',
  category: '',
  projectId: '',
  developerName: '',
};

export const DeveloperLogForm: React.FC<DeveloperLogFormProps> = ({ onAddLog, categories, projects }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [categoryError, setCategoryError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'category') {
      setCategoryError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidCategory(formState.category)) {
      setCategoryError('Please select a valid category');
      return;
    }
    const newLog: Omit<DeveloperLog, '_id'> = {
      description: formState.description,
      hours: parseFloat(formState.hours),
      date: formatDateForAPI(formState.date),
      category: formState.category,
      projectId: formState.projectId,
    };
    onAddLog(newLog);
    resetForm();
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setCategoryError('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="taskDescription">Task Description:</label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          value={formState.taskDescription}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="developerName">Developer Name:</label>
        <input
          type="text"
          id="developerName"
          name="developerName"
          value={formState.developerName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formState.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {categoryError && <div style={{ color: 'red' }}>{categoryError}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="hours">Hours Worked:</label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={formState.hours}
          onChange={handleInputChange}
          required
          step="0.1"
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formState.date}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectId">Project:</label>
        <select
          id="projectId"
          name="projectId"
          value={formState.projectId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a project</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Log</button>
    </form>
  );
};