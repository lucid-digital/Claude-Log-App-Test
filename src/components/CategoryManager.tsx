import React, { useState } from 'react';
import { PREDEFINED_CATEGORIES } from '../utils/categories';

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(PREDEFINED_CATEGORIES);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            {category}
            <button onClick={() => removeCategory(category)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category"
      />
      <button onClick={addCategory}>Add Category</button>
    </div>
  );
};