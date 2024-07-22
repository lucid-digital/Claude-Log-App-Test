import React, { useState } from 'react';
import { PREDEFINED_CATEGORIES } from '../utils/categories';

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onRemoveCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const addCategory = () => {
    if (selectedCategory && !categories.includes(selectedCategory)) {
      onAddCategory(selectedCategory);
      setSelectedCategory('');
    }
  };

  const availableCategories = PREDEFINED_CATEGORIES.filter(cat => !categories.includes(cat));

  return (
    <div>
      <h2>Manage Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            {category}
            <button onClick={() => onRemoveCategory(category)}>Remove</button>
          </li>
        ))}
      </ul>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select a category to add</option>
        {availableCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={addCategory} disabled={!selectedCategory}>Add Category</button>
    </div>
  );
};