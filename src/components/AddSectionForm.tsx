
import React, { useState } from 'react';
import { CustomSection } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus } from 'lucide-react';

interface AddSectionFormProps {
  onAddSection: (section: CustomSection) => void;
}

const AddSectionForm: React.FC<AddSectionFormProps> = ({ onAddSection }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionType, setSectionType] = useState<'entries' | 'publications' | 'technologies' | 'custom'>('entries');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionTitle.trim()) return;

    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: sectionTitle.trim(),
      type: sectionType,
      settings: {
        title: sectionTitle.trim(),
        showLine: true,
        topMargin: 0.5,
        bottomMargin: 0.4,
        order: Date.now(),
        visible: true
      }
    };

    onAddSection(newSection);
    setSectionTitle('');
    setSectionType('entries');
  };

  const getSectionOptions = () => [
    { value: 'entries', label: 'Education' },
    { value: 'entries', label: 'Experience' },
    { value: 'entries', label: 'Projects' },
    { value: 'entries', label: 'Skills' },
    { value: 'technologies', label: 'Technologies' },
    { value: 'publications', label: 'Publications' },
    { value: 'custom', label: 'Custom Section' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Section
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Enter section title (e.g., Education, Experience)"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="sectionType">Section Type</Label>
            <Select value={sectionType} onValueChange={(value: 'entries' | 'publications' | 'technologies' | 'custom') => setSectionType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select section type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entries">Standard Entries (Education, Experience, Projects)</SelectItem>
                <SelectItem value="technologies">Technologies/Skills</SelectItem>
                <SelectItem value="publications">Publications</SelectItem>
                <SelectItem value="custom">Custom Fields</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Add Section
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSectionForm;
