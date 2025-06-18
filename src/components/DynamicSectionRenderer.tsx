
import React, { useState } from 'react';
import { CustomSection, Entry, Publication, Technologies, CustomSectionField } from '../types/cv';
import SectionManager from './SectionManager';
import TechnologiesForm from './TechnologiesForm';
import PublicationsForm from './PublicationsForm';
import CustomSectionForm from './CustomSectionForm';
import SectionHeader from './SectionHeader';

interface DynamicSectionRendererProps {
  section: CustomSection;
  entries: Entry[];
  publications: Publication[];
  technologies: Technologies;
  customFields: CustomSectionField[];
  onUpdateEntries: (entries: Entry[]) => void;
  onUpdatePublications: (publications: Publication[]) => void;
  onUpdateTechnologies: (technologies: Technologies) => void;
  onUpdateCustomFields: (fields: CustomSectionField[]) => void;
  onUpdateSection: (section: CustomSection) => void;
  onDeleteSection: () => void;
}

const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({
  section,
  entries,
  publications,
  technologies,
  customFields,
  onUpdateEntries,
  onUpdatePublications,
  onUpdateTechnologies,
  onUpdateCustomFields,
  onUpdateSection,
  onDeleteSection
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSettingsUpdate = (settings: any) => {
    onUpdateSection({ ...section, settings });
  };

  const renderSectionContent = () => {
    if (!isExpanded) return null;

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
          <CustomSectionForm
            fields={customFields}
            onChange={onUpdateCustomFields}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <SectionHeader
        title={section.title}
        settings={section.settings}
        onUpdateSettings={handleSettingsUpdate}
        onDelete={onDeleteSection}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
      {renderSectionContent()}
    </div>
  );
};

export default DynamicSectionRenderer;
