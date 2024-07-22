import React, { useState } from 'react';
import './App.css';
import { DeveloperLogForm } from './components/DeveloperLogForm';
import { DeveloperLogList } from './components/DeveloperLogList';
import { CategoryManager } from './components/CategoryManager';
import { DeveloperLog } from './types/DeveloperLog';
import { PREDEFINED_CATEGORIES } from './utils/categories';

const App: React.FC = () => {
  const [logs, setLogs] = useState<DeveloperLog[]>([]);
  const [categories, setCategories] = useState<string[]>(PREDEFINED_CATEGORIES);

  const addLog = (log: DeveloperLog) => {
    setLogs([...logs, log]);
  };

  const addCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  return (
    <div className="App">
      <h1>Developer Hour Logger</h1>
      <DeveloperLogForm onAddLog={addLog} categories={categories} />
      <DeveloperLogList logs={logs} />
      <CategoryManager 
        categories={categories}
        onAddCategory={addCategory}
        onRemoveCategory={removeCategory}
      />
    </div>
  );
};

export default App;