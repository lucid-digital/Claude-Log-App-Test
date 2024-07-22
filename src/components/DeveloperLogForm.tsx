import React, { useState } from 'react';
import { DeveloperLog } from '../types/DeveloperLog';

interface DeveloperLogFormProps {
  onAddLog: (log: DeveloperLog) => void;
}

export const DeveloperLogForm: React.FC<DeveloperLogFormProps> = ({ onAddLog }) => {
  const [developerName, setDeveloperName] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [date, setDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: DeveloperLog = {
      id: Date.now().toString(),
      developerName,
      hoursWorked: parseFloat(hoursWorked),
      date,
      taskDescription,
    };
    onAddLog(newLog);
    setDeveloperName('');
    setHoursWorked('');
    setDate('');
    setTaskDescription('');
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