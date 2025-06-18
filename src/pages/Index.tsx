import React, { useState } from 'react';
import { CVData, PersonalInfo, CustomSection, Entry, Publication, Technologies, StyleSettings, CustomSectionField } from '../types/cv';
import { generateLatexCode } from '../utils/latexGenerator';
import PersonalInfoForm from '../components/PersonalInfoForm';
import AddSectionForm from '../components/AddSectionForm';
import DynamicSectionRenderer from '../components/DynamicSectionRenderer';
import StyleSettingsForm from '../components/StyleSettings';
import LatexPreview from '../components/LatexPreview';
import { ScrollArea } from '../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';

const Index = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      linkedin: '',
      github: '',
      lastUpdated: new Date()
    },
    customSections: [],
    sectionEntries: {},
    publications: [],
    technologies: {
      categories: []
    },
    customSectionFields: {},
    styleSettings: {
      pageMargins: { top: 2, bottom: 2, left: 2, right: 2 },
      columnSpacing: 0,
      bulletLeftMargin: 0.4,
      sectionTitleLine: true,
      fontSize: '10pt',
      themeColor: '#004F90',
      showPageNumber: true,
      footerText: ''
    }
  });

  const [useTemplate, setUseTemplate] = useState(false);

  const loadTemplate = () => {
    setCvData({
      personalInfo: {
        fullName: 'John Doe',
        location: 'Your Location',
        email: 'youremail@yourdomain.com',
        phone: '+1-234-567-8900',
        website: 'https://yourwebsite.com',
        linkedin: 'https://linkedin.com/in/yourusername',
        github: 'https://github.com/yourusername',
        lastUpdated: new Date()
      },
      customSections: [
        {
          id: '1',
          title: 'Education',
          type: 'entries',
          settings: { title: 'Education', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 1, visible: true }
        },
        {
          id: '2',
          title: 'Experience',
          type: 'entries',
          settings: { title: 'Experience', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 2, visible: true }
        },
        {
          id: '3',
          title: 'Technologies',
          type: 'technologies',
          settings: { title: 'Technologies', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 3, visible: true }
        }
      ],
      sectionEntries: {
        '1': [{
          id: '1',
          leftTitle: 'University of Pennsylvania',
          subtitle: 'BS in Computer Science',
          rightSideValue: '',
          isOneColumn: false,
          bulletPoints: ['GPA: 3.9/4.0', 'Coursework: Computer Architecture, Algorithms, Computational Theory'],
          location: '',
          dateRange: 'Sept 2000 – May 2005'
        }],
        '2': [{
          id: '1',
          leftTitle: 'Software Engineer',
          subtitle: 'Apple',
          rightSideValue: '',
          isOneColumn: false,
          bulletPoints: [
            'Reduced time to render user buddy lists by 75% by implementing prediction algorithm',
            'Integrated iChat with Spotlight Search by creating metadata extraction tool'
          ],
          location: 'Cupertino, CA',
          dateRange: 'June 2005 – Aug 2007'
        }]
      },
      publications: [],
      technologies: {
        categories: [
          { id: '1', name: 'Programming Languages', items: ['C++', 'C', 'Java', 'JavaScript', 'Python'] },
          { id: '2', name: 'Frameworks', items: ['.NET', 'React', 'Node.js'] },
          { id: '3', name: 'Tools', items: ['Git', 'Docker', 'VS Code'] }
        ]
      },
      customSectionFields: {},
      styleSettings: {
        pageMargins: { top: 2, bottom: 2, left: 2, right: 2 },
        columnSpacing: 0,
        bulletLeftMargin: 0.4,
        sectionTitleLine: true,
        fontSize: '10pt',
        themeColor: '#004F90',
        showPageNumber: true,
        footerText: 'John Doe'
      }
    });
    setUseTemplate(true);
  };

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setCvData(prev => ({ ...prev, personalInfo }));
  };

  const addSection = (section: CustomSection) => {
    setCvData(prev => ({
      ...prev,
      customSections: [...prev.customSections, section],
      sectionEntries: { ...prev.sectionEntries, [section.id]: [] },
      customSectionFields: { ...prev.customSectionFields, [section.id]: [] }
    }));
  };

  const updateSection = (sectionId: string, updatedSection: CustomSection) => {
    setCvData(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => 
        s.id === sectionId ? updatedSection : s
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    setCvData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(s => s.id !== sectionId),
      sectionEntries: Object.fromEntries(
        Object.entries(prev.sectionEntries).filter(([key]) => key !== sectionId)
      ),
      customSectionFields: Object.fromEntries(
        Object.entries(prev.customSectionFields).filter(([key]) => key !== sectionId)
      )
    }));
  };

  const updateSectionEntries = (sectionId: string, entries: Entry[]) => {
    setCvData(prev => ({
      ...prev,
      sectionEntries: { ...prev.sectionEntries, [sectionId]: entries }
    }));
  };

  const updatePublications = (publications: Publication[]) => {
    setCvData(prev => ({ ...prev, publications }));
  };

  const updateTechnologies = (technologies: Technologies) => {
    setCvData(prev => ({ ...prev, technologies }));
  };

  const updateStyleSettings = (styleSettings: StyleSettings) => {
    setCvData(prev => ({ ...prev, styleSettings }));
  };

  const updateCustomSectionFields = (sectionId: string, fields: CustomSectionField[]) => {
    setCvData(prev => ({
      ...prev,
      customSectionFields: { ...prev.customSectionFields, [sectionId]: fields }
    }));
  };

  const latexCode = generateLatexCode(cvData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LaTeX CV Editor</h1>
          <p className="text-gray-600">Create and customize your professional CV with real-time LaTeX preview</p>
          
          {!useTemplate && cvData.customSections.length === 0 && (
            <div className="mt-4">
              <Button onClick={loadTemplate} variant="outline">
                Load Sample Template
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
          {/* Form Editor - Left Side */}
          <div className="bg-white rounded-lg shadow-sm border">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <PersonalInfoForm
                    personalInfo={cvData.personalInfo}
                    onChange={updatePersonalInfo}
                  />
                </div>

                {/* Add Section Button */}
                <AddSectionForm onAddSection={addSection} />

                {/* Dynamic Sections */}
                {cvData.customSections.map((section) => (
                  <DynamicSectionRenderer
                    key={section.id}
                    section={section}
                    entries={cvData.sectionEntries[section.id] || []}
                    publications={cvData.publications}
                    technologies={cvData.technologies}
                    customFields={cvData.customSectionFields[section.id] || []}
                    onUpdateEntries={(entries) => updateSectionEntries(section.id, entries)}
                    onUpdatePublications={updatePublications}
                    onUpdateTechnologies={updateTechnologies}
                    onUpdateCustomFields={(fields) => updateCustomSectionFields(section.id, fields)}
                    onUpdateSection={(updatedSection) => updateSection(section.id, updatedSection)}
                    onDeleteSection={() => deleteSection(section.id)}
                  />
                ))}

                {/* Style Settings */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Style Settings</h2>
                  <StyleSettingsForm
                    styleSettings={cvData.styleSettings}
                    onChange={updateStyleSettings}
                  />
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* LaTeX Preview - Right Side */}
          <div className="bg-white rounded-lg shadow-sm border">
            <LatexPreview latexCode={latexCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
