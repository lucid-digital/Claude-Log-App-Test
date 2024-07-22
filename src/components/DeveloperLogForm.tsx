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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Developer Name"
        value={developerName}
        onChange={(e) => setDeveloperName(e.target.value)}
        required
      />
      <select
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
      <input
        type="number"
        placeholder="Hours Worked"
        value={hoursWorked}
        onChange={(e) => setHoursWorked(e.target.value)}
        required
        step="0.1"
        min="0"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        required
      />
      <button type="submit">Add Log</button>
    </form>
  );
};