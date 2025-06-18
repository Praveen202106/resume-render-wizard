
import React from 'react';
import { CustomSection, Entry, Publication, Technologies } from '../types/cv';
import SectionManager from './SectionManager';
import TechnologiesForm from './TechnologiesForm';
import PublicationsForm from './PublicationsForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface DynamicSectionRendererProps {
  section: CustomSection;
  entries: Entry[];
  publications: Publication[];
  technologies: Technologies;
  onUpdateEntries: (entries: Entry[]) => void;
  onUpdatePublications: (publications: Publication[]) => void;
  onUpdateTechnologies: (technologies: Technologies) => void;
  onDeleteSection: () => void;
}

const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({
  section,
  entries,
  publications,
  technologies,
  onUpdateEntries,
  onUpdatePublications,
  onUpdateTechnologies,
  onDeleteSection
}) => {
  const renderSectionContent = () => {
    switch (section.type) {
      case 'entries':
        return (
          <SectionManager
            title={section.title}
            entries={entries}
            onChange={onUpdateEntries}
            entryType="custom"
          />
        );
      
      case 'technologies':
        return (
          <TechnologiesForm
            technologies={technologies}
            onChange={onUpdateTechnologies}
          />
        );
      
      case 'publications':
        return (
          <PublicationsForm
            publications={publications}
            onChange={onUpdatePublications}
          />
        );
      
      case 'custom':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Custom section - Content editor coming soon</p>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{section.title}</h3>
        <Button variant="destructive" size="sm" onClick={onDeleteSection}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      {renderSectionContent()}
    </div>
  );
};

export default DynamicSectionRenderer;
