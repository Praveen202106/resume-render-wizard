
import React from 'react';
import { CustomSectionField } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CustomSectionFormProps {
  fields: CustomSectionField[];
  onChange: (fields: CustomSectionField[]) => void;
}

const CustomSectionForm: React.FC<CustomSectionFormProps> = ({ fields, onChange }) => {
  const addField = () => {
    const newField: CustomSectionField = {
      id: Date.now().toString(),
      mainHeading: '',
      rightSection: '',
      subHeading: '',
      rightSubSection: '',
      bulletPoints: ['']
    };
    onChange([...fields, newField]);
  };

  const updateField = (index: number, field: keyof CustomSectionField, value: any) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteField = (index: number) => {
    onChange(fields.filter((_, i) => i !== index));
  };

  const addBulletPoint = (fieldIndex: number) => {
    const updated = [...fields];
    updated[fieldIndex].bulletPoints.push('');
    onChange(updated);
  };

  const removeBulletPoint = (fieldIndex: number, bulletIndex: number) => {
    const updated = [...fields];
    updated[fieldIndex].bulletPoints = updated[fieldIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onChange(updated);
  };

  const updateBulletPoint = (fieldIndex: number, bulletIndex: number, value: string) => {
    const updated = [...fields];
    updated[fieldIndex].bulletPoints[bulletIndex] = value;
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Custom Fields</CardTitle>
        <Button onClick={addField}>
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </Button>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No custom fields added yet. Click "Add Field" to get started.
          </p>
        ) : (
          fields.map((field, index) => (
            <Card key={field.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-md font-medium">Custom Field {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteField(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Main Heading (Title/Organization)</Label>
                      <Input
                        value={field.mainHeading}
                        onChange={(e) => updateField(index, 'mainHeading', e.target.value)}
                        placeholder="Job Title / University Name"
                      />
                    </div>
                    
                    <div>
                      <Label>Right Section (Location)</Label>
                      <Input
                        value={field.rightSection}
                        onChange={(e) => updateField(index, 'rightSection', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Sub Heading (Subtitle)</Label>
                      <Input
                        value={field.subHeading}
                        onChange={(e) => updateField(index, 'subHeading', e.target.value)}
                        placeholder="Company / Degree"
                      />
                    </div>
                    
                    <div>
                      <Label>Right Sub Section (Date Range)</Label>
                      <Input
                        value={field.rightSubSection}
                        onChange={(e) => updateField(index, 'rightSubSection', e.target.value)}
                        placeholder="June 2020 - Present"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Bullet Points</Label>
                      <Button type="button" size="sm" onClick={() => addBulletPoint(index)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Point
                      </Button>
                    </div>
                    {field.bulletPoints.map((point, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-center space-x-2 mb-2">
                        <Textarea
                          value={point}
                          onChange={(e) => updateBulletPoint(index, bulletIndex, e.target.value)}
                          placeholder="Describe your achievement or responsibility..."
                          className="flex-1"
                          rows={2}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBulletPoint(index, bulletIndex)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CustomSectionForm;
