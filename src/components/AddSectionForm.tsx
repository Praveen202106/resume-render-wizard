
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus } from 'lucide-react';
import { CustomSection } from '../types/cv';

interface AddSectionFormProps {
  onAddSection: (section: CustomSection) => void;
}

const AddSectionForm: React.FC<AddSectionFormProps> = ({ onAddSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'entries' | 'publications' | 'technologies' | 'custom'>('entries');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: title.trim(),
      type,
      settings: {
        title: title.trim(),
        showLine: true,
        topMargin: 0.3,
        bottomMargin: 0.2,
        order: Date.now(),
        visible: true
      }
    };

    onAddSection(newSection);
    setTitle('');
    setType('entries');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button onClick={() => setIsOpen(true)} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Section
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="section-title">Section Title</Label>
            <Input
              id="section-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Experience, Education, Projects"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="section-type">Section Type</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entries">Standard Entries (Experience, Education, etc.)</SelectItem>
                <SelectItem value="publications">Publications</SelectItem>
                <SelectItem value="technologies">Technologies/Skills</SelectItem>
                <SelectItem value="custom">Custom Content</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button type="submit">Add Section</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSectionForm;
