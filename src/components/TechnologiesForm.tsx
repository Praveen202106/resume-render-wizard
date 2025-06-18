import React, { useState } from 'react';
import { Technologies, TechnologyCategory } from '../types/cv';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, X } from 'lucide-react';

interface TechnologiesFormProps {
  technologies: Technologies;
  onChange: (technologies: Technologies) => void;
}

const TechnologiesForm: React.FC<TechnologiesFormProps> = ({ technologies, onChange }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemInputs, setNewItemInputs] = useState<{[key: string]: string}>({});

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: TechnologyCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      items: []
    };
    
    onChange({
      categories: [...technologies.categories, newCategory]
    });
    
    setNewCategoryName('');
  };

  const updateCategoryName = (categoryId: string, name: string) => {
    onChange({
      categories: technologies.categories.map(cat =>
        cat.id === categoryId ? { ...cat, name } : cat
      )
    });
  };

  const removeCategory = (categoryId: string) => {
    onChange({
      categories: technologies.categories.filter(cat => cat.id !== categoryId)
    });
  };

  const addItemToCategory = (categoryId: string) => {
    const newItem = newItemInputs[categoryId]?.trim();
    if (!newItem) return;

    onChange({
      categories: technologies.categories.map(cat =>
        cat.id === categoryId 
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    });

    setNewItemInputs(prev => ({ ...prev, [categoryId]: '' }));
  };

  const removeItemFromCategory = (categoryId: string, itemIndex: number) => {
    onChange({
      categories: technologies.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((_, i) => i !== itemIndex) }
          : cat
      )
    });
  };

  const handleNewItemInputChange = (categoryId: string, value: string) => {
    setNewItemInputs(prev => ({ ...prev, [categoryId]: value }));
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {/* Add new category */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Label>Add New Category</Label>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g., Programming Languages, Frameworks"
              onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            />
          </div>
          <Button onClick={addCategory}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Existing categories */}
        {technologies.categories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Input
                value={category.name}
                onChange={(e) => updateCategoryName(category.id, e.target.value)}
                className="font-medium text-sm border-none p-0 h-auto bg-transparent"
                placeholder="Category name"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeCategory(category.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Items as tags */}
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeItemFromCategory(category.id, index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new item */}
            <div className="flex items-center space-x-2">
              <Input
                value={newItemInputs[category.id] || ''}
                onChange={(e) => handleNewItemInputChange(category.id, e.target.value)}
                placeholder="Add new item"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addItemToCategory(category.id)}
              />
              <Button
                size="sm"
                onClick={() => addItemToCategory(category.id)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {technologies.categories.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No technology categories added yet. Add a category to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TechnologiesForm;
