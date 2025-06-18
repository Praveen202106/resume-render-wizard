
import React from 'react';
import { Entry } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import EntryForm from './EntryForm';

interface SectionManagerProps {
  title: string;
  entries: Entry[];
  onChange: (entries: Entry[]) => void;
  entryType?: 'experience' | 'education' | 'project' | 'custom';
}

const SectionManager: React.FC<SectionManagerProps> = ({ 
  title, 
  entries, 
  onChange, 
  entryType = 'custom' 
}) => {
  const addEntry = () => {
    const newEntry: Entry = {
      id: Date.now().toString(),
      leftTitle: '',
      subtitle: '',
      rightSideValue: '',
      isOneColumn: false,
      bulletPoints: [''],
      ...(entryType === 'project' && { projectLink: '', toolsUsed: '' }),
      location: '',
      dateRange: ''
    };
    onChange([...entries, newEntry]);
  };

  const updateEntry = (index: number, updatedEntry: Entry) => {
    const newEntries = [...entries];
    newEntries[index] = updatedEntry;
    onChange(newEntries);
  };

  const deleteEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        <Button onClick={addEntry}>
          <Plus className="w-4 h-4 mr-2" />
          Add {title.slice(0, -1)}
        </Button>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No {title.toLowerCase()} added yet. Click the "Add" button to get started.
          </p>
        ) : (
          entries.map((entry, index) => (
            <EntryForm
              key={entry.id}
              entry={entry}
              onChange={(updatedEntry) => updateEntry(index, updatedEntry)}
              onDelete={() => deleteEntry(index)}
              title={`${title.slice(0, -1)} ${index + 1}`}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default SectionManager;
