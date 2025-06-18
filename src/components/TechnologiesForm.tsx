
import React from 'react';
import { Technologies } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react';

interface TechnologiesFormProps {
  technologies: Technologies;
  onChange: (technologies: Technologies) => void;
}

const TechnologiesForm: React.FC<TechnologiesFormProps> = ({ technologies, onChange }) => {
  const addItem = (category: keyof Technologies) => {
    onChange({
      ...technologies,
      [category]: [...technologies[category], '']
    });
  };

  const removeItem = (category: keyof Technologies, index: number) => {
    const newItems = technologies[category].filter((_, i) => i !== index);
    onChange({
      ...technologies,
      [category]: newItems
    });
  };

  const updateItem = (category: keyof Technologies, index: number, value: string) => {
    const newItems = [...technologies[category]];
    newItems[index] = value;
    onChange({
      ...technologies,
      [category]: newItems
    });
  };

  const renderCategory = (category: keyof Technologies, title: string) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{title}</Label>
        <Button type="button" size="sm" onClick={() => addItem(category)}>
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
      {technologies[category].map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={item}
            onChange={(e) => updateItem(category, index, e.target.value)}
            placeholder={`Enter ${title.toLowerCase().slice(0, -1)}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeItem(category, index)}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Technologies & Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderCategory('programmingLanguages', 'Programming Languages')}
        {renderCategory('frameworks', 'Frameworks & Libraries')}
        {renderCategory('tools', 'Tools & Software')}
      </CardContent>
    </Card>
  );
};

export default TechnologiesForm;
