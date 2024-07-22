import React, { useState } from 'react';
import { DeveloperLogForm } from './components/DeveloperLogForm';
import { DeveloperLogList } from './components/DeveloperLogList';
import { DeveloperLog } from './types/DeveloperLog';
import { categories } from './utils/categories';
import './App.css';

const App: React.FC = () => {
  const [logs, setLogs] = useState<DeveloperLog[]>([]);

  const addLog = (newLog: DeveloperLog) => {
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  return (
    <div className="app-container">
      <h1>Developer Work Log</h1>
      <DeveloperLogForm onAddLog={addLog} categories={categories} />
      <DeveloperLogList logs={logs} />
    </div>
  );
};

export default App;