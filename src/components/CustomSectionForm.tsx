
import React from 'react';
import { CustomSectionField } from '../types/cv';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Plus, X } from 'lucide-react';

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

  const updateField = (index: number, updatedField: CustomSectionField) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    onChange(newFields);
  };

  const deleteField = (index: number) => {
    onChange(fields.filter((_, i) => i !== index));
  };

  const addBulletPoint = (fieldIndex: number) => {
    const field = fields[fieldIndex];
    updateField(fieldIndex, {
      ...field,
      bulletPoints: [...field.bulletPoints, '']
    });
  };

  const updateBulletPoint = (fieldIndex: number, bulletIndex: number, value: string) => {
    const field = fields[fieldIndex];
    const newBulletPoints = [...field.bulletPoints];
    newBulletPoints[bulletIndex] = value;
    updateField(fieldIndex, {
      ...field,
      bulletPoints: newBulletPoints
    });
  };

  const removeBulletPoint = (fieldIndex: number, bulletIndex: number) => {
    const field = fields[fieldIndex];
    updateField(fieldIndex, {
      ...field,
      bulletPoints: field.bulletPoints.filter((_, i) => i !== bulletIndex)
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Custom Content</h3>
          <Button onClick={addField}>
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </div>

        {fields.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No custom fields added yet. Click "Add Field" to get started.
          </p>
        ) : (
          fields.map((field, fieldIndex) => (
            <Card key={field.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-md font-medium">Field {fieldIndex + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteField(fieldIndex)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Main heading and right section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Main Heading</Label>
                      <Input
                        value={field.mainHeading}
                        onChange={(e) => updateField(fieldIndex, { ...field, mainHeading: e.target.value })}
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <Label>Right Section</Label>
                      <Input
                        value={field.rightSection}
                        onChange={(e) => updateField(fieldIndex, { ...field, rightSection: e.target.value })}
                        placeholder="e.g., June 2020 - Present"
                      />
                    </div>
                  </div>

                  {/* Sub heading and right sub section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sub Heading</Label>
                      <Input
                        value={field.subHeading}
                        onChange={(e) => updateField(fieldIndex, { ...field, subHeading: e.target.value })}
                        placeholder="e.g., Company Name"
                      />
                    </div>
                    <div>
                      <Label>Right Sub Section</Label>
                      <Input
                        value={field.rightSubSection}
                        onChange={(e) => updateField(fieldIndex, { ...field, rightSubSection: e.target.value })}
                        placeholder="e.g., Location"
                      />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Bullet Points</Label>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => addBulletPoint(fieldIndex)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Point
                      </Button>
                    </div>
                    {field.bulletPoints.map((point, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-center space-x-2 mb-2">
                        <Textarea
                          value={point}
                          onChange={(e) => updateBulletPoint(fieldIndex, bulletIndex, e.target.value)}
                          placeholder="Enter bullet point"
                          className="flex-1 min-h-[60px]"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBulletPoint(fieldIndex, bulletIndex)}
                        >
                          <X className="w-4 h-4" />
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
