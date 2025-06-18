
import React from 'react';
import { Entry } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Plus, Minus } from 'lucide-react';

interface EntryFormProps {
  entry: Entry;
  onChange: (entry: Entry) => void;
  onDelete: () => void;
  title: string;
}

const EntryForm: React.FC<EntryFormProps> = ({ entry, onChange, onDelete, title }) => {
  const handleChange = (field: keyof Entry, value: any) => {
    onChange({
      ...entry,
      [field]: value
    });
  };

  const addBulletPoint = () => {
    onChange({
      ...entry,
      bulletPoints: [...entry.bulletPoints, '']
    });
  };

  const removeBulletPoint = (index: number) => {
    const newBulletPoints = entry.bulletPoints.filter((_, i) => i !== index);
    onChange({
      ...entry,
      bulletPoints: newBulletPoints
    });
  };

  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...entry.bulletPoints];
    newBulletPoints[index] = value;
    onChange({
      ...entry,
      bulletPoints: newBulletPoints
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-md">{title}</CardTitle>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Remove
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${entry.id}-leftTitle`}>Title/Organization</Label>
            <Input
              id={`${entry.id}-leftTitle`}
              value={entry.leftTitle}
              onChange={(e) => handleChange('leftTitle', e.target.value)}
              placeholder="Job Title / University Name"
            />
          </div>
          <div>
            <Label htmlFor={`${entry.id}-subtitle`}>Subtitle</Label>
            <Input
              id={`${entry.id}-subtitle`}
              value={entry.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Company / Degree"
            />
          </div>
          <div>
            <Label htmlFor={`${entry.id}-location`}>Location</Label>
            <Input
              id={`${entry.id}-location`}
              value={entry.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, State"
            />
          </div>
          <div>
            <Label htmlFor={`${entry.id}-dateRange`}>Date Range</Label>
            <Input
              id={`${entry.id}-dateRange`}
              value={entry.dateRange || ''}
              onChange={(e) => handleChange('dateRange', e.target.value)}
              placeholder="June 2020 - Present"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={entry.isOneColumn}
            onCheckedChange={(checked) => handleChange('isOneColumn', checked)}
          />
          <Label>One Column Layout</Label>
        </div>

        {entry.projectLink !== undefined && (
          <div>
            <Label htmlFor={`${entry.id}-projectLink`}>Project Link</Label>
            <Input
              id={`${entry.id}-projectLink`}
              value={entry.projectLink}
              onChange={(e) => handleChange('projectLink', e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>
        )}

        {entry.toolsUsed !== undefined && (
          <div>
            <Label htmlFor={`${entry.id}-toolsUsed`}>Tools Used</Label>
            <Input
              id={`${entry.id}-toolsUsed`}
              value={entry.toolsUsed}
              onChange={(e) => handleChange('toolsUsed', e.target.value)}
              placeholder="React, TypeScript, Node.js"
            />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Bullet Points</Label>
            <Button type="button" size="sm" onClick={addBulletPoint}>
              <Plus className="w-4 h-4 mr-1" />
              Add Point
            </Button>
          </div>
          {entry.bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Textarea
                value={point}
                onChange={(e) => updateBulletPoint(index, e.target.value)}
                placeholder="Describe your achievement or responsibility..."
                className="flex-1"
                rows={2}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeBulletPoint(index)}
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EntryForm;
