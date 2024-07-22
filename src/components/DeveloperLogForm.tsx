import React, { useState } from 'react';
import { DeveloperLog } from '../types/DeveloperLog';
import { isValidCategory } from '../utils/categories';

interface DeveloperLogFormProps {
  onAddLog: (log: DeveloperLog) => void;
  categories: string[];
}

export const DeveloperLogForm: React.FC<DeveloperLogFormProps> = ({ onAddLog, categories }) => {
  const [developerName, setDeveloperName] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [date, setDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidCategory(category)) {
      setCategoryError('Please select a valid category');
      return;
    }
    const newLog: DeveloperLog = {
      id: Date.now().toString(),
      developerName,
      hoursWorked: parseFloat(hoursWorked),
      date,
      taskDescription,
      category,
    };
    onAddLog(newLog);
    setDeveloperName('');
    setHoursWorked('');
    setDate('');
    setTaskDescription('');
    setCategory('');
    setCategoryError('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="developerName">Developer Name:</label>
        <input
          type="text"
          id="developerName"
          value={developerName}
          onChange={(e) => setDeveloperName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCategoryError('');
          }}
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
        <label htmlFor="hoursWorked">Hours Worked:</label>
        <input
          type="number"
          id="hoursWorked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="taskDescription">Task Description:</label>
        <textarea
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Log</button>
    </form>
  );
};