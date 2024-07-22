import React, { useState } from 'react';
import './App.css';
import { DeveloperLogForm } from './components/DeveloperLogForm';
import { DeveloperLogList } from './components/DeveloperLogList';
import { DeveloperLog } from './types/DeveloperLog';

const App: React.FC = () => {
  const [logs, setLogs] = useState<DeveloperLog[]>([]);

  const addLog = (log: DeveloperLog) => {
    setLogs([...logs, log]);
  };

  return (
    <div className="App">
      <h1>Developer Hour Logger</h1>
      <DeveloperLogForm onAddLog={addLog} />
      <DeveloperLogList logs={logs} />
    </div>
  );
};

export default App;