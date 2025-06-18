
import React from 'react';
import { Publication } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface PublicationsFormProps {
  publications: Publication[];
  onChange: (publications: Publication[]) => void;
}

const PublicationsForm: React.FC<PublicationsFormProps> = ({ publications, onChange }) => {
  const addPublication = () => {
    const newPublication: Publication = {
      id: Date.now().toString(),
      title: '',
      authors: '',
      date: undefined,
      doiUrl: ''
    };
    onChange([...publications, newPublication]);
  };

  const updatePublication = (index: number, field: keyof Publication, value: any) => {
    const updated = [...publications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deletePublication = (index: number) => {
    onChange(publications.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Publications</CardTitle>
        <Button onClick={addPublication}>
          <Plus className="w-4 h-4 mr-2" />
          Add Publication
        </Button>
      </CardHeader>
      <CardContent>
        {publications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No publications added yet. Click "Add Publication" to get started.
          </p>
        ) : (
          publications.map((pub, index) => (
            <Card key={pub.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-md font-medium">Publication {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePublication(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={pub.title}
                      onChange={(e) => updatePublication(index, 'title', e.target.value)}
                      placeholder="Publication title"
                    />
                  </div>
                  
                  <div>
                    <Label>Authors</Label>
                    <Input
                      value={pub.authors}
                      onChange={(e) => updatePublication(index, 'authors', e.target.value)}
                      placeholder="Author 1, Author 2, Author 3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Publication Date</Label>
                      <Input
                        type="date"
                        value={pub.date ? pub.date.toISOString().split('T')[0] : ''}
                        onChange={(e) => updatePublication(index, 'date', e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </div>
                    
                    <div>
                      <Label>DOI URL</Label>
                      <Input
                        value={pub.doiUrl}
                        onChange={(e) => updatePublication(index, 'doiUrl', e.target.value)}
                        placeholder="https://doi.org/..."
                      />
                    </div>
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

export default PublicationsForm;
