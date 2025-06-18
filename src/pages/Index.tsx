import React, { useState } from 'react';
import { CVData, PersonalInfo, SectionSettings, Entry, Publication, Technologies, StyleSettings } from '../types/cv';
import { generateLatexCode } from '../utils/latexGenerator';
import PersonalInfoForm from '../components/PersonalInfoForm';
import SectionManager from '../components/SectionManager';
import TechnologiesForm from '../components/TechnologiesForm';
import StyleSettingsForm from '../components/StyleSettings';
import LatexPreview from '../components/LatexPreview';
import { ScrollArea } from '../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Index = () => {
  const [cvData, setCvData] = useState<CVData>({
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
    sections: {
      education: { title: 'Education', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 1, visible: true },
      experience: { title: 'Experience', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 2, visible: true },
      publications: { title: 'Publications', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 3, visible: true },
      projects: { title: 'Projects', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 4, visible: true },
      technologies: { title: 'Technologies', showLine: true, topMargin: 0.3, bottomMargin: 0.2, order: 5, visible: true }
    },
    educationEntries: [
      {
        id: '1',
        leftTitle: 'University of Pennsylvania',
        subtitle: 'BS in Computer Science',
        rightSideValue: '',
        isOneColumn: false,
        bulletPoints: ['GPA: 3.9/4.0', 'Coursework: Computer Architecture, Algorithms, Computational Theory'],
        location: '',
        dateRange: 'Sept 2000 – May 2005'
      }
    ],
    experienceEntries: [
      {
        id: '1',
        leftTitle: 'Software Engineer',
        subtitle: 'Apple',
        rightSideValue: '',
        isOneColumn: false,
        bulletPoints: [
          'Reduced time to render user buddy lists by 75% by implementing prediction algorithm',
          'Integrated iChat with Spotlight Search by creating metadata extraction tool',
          'Redesigned chat file format and implemented backward compatibility'
        ],
        location: 'Cupertino, CA',
        dateRange: 'June 2005 – Aug 2007'
      }
    ],
    projectEntries: [
      {
        id: '1',
        leftTitle: 'Multi-User Drawing Tool',
        subtitle: '',
        rightSideValue: 'github.com/name/repo',
        isOneColumn: false,
        bulletPoints: [
          'Developed electronic classroom for simultaneous drawing with synchronized edits',
          'Tools Used: C++, MFC'
        ],
        projectLink: 'https://github.com/name/repo',
        toolsUsed: 'C++, MFC'
      }
    ],
    publications: [
      {
        id: '1',
        title: '3D Finite Element Analysis of No-Insulation Coils',
        authors: 'Frodo Baggins, John Doe, Samwise Gamgee',
        date: new Date('2004-01-01'),
        doiUrl: 'https://doi.org/10.1109/TASC.2023.3340648'
      }
    ],
    technologies: {
      programmingLanguages: ['C++', 'C', 'Java', 'JavaScript', 'Python'],
      frameworks: ['.NET', 'React', 'Node.js'],
      tools: ['Git', 'Docker', 'VS Code']
    },
    styleSettings: {
      pageMargins: { top: 2, bottom: 2, left: 2, right: 2 },
      columnSpacing: 0,
      bulletLeftMargin: 0.4,
      sectionTitleLine: true,
      fontSize: '10pt',
      themeColor: '#004F90',
      showPageNumber: true,
      footerText: 'John Doe'
    },
    customSections: [],
    sectionEntries: {}
  });

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setCvData(prev => ({ ...prev, personalInfo }));
  };

  const updateEducationEntries = (educationEntries: Entry[]) => {
    setCvData(prev => ({ ...prev, educationEntries }));
  };

  const updateExperienceEntries = (experienceEntries: Entry[]) => {
    setCvData(prev => ({ ...prev, experienceEntries }));
  };

  const updateProjectEntries = (projectEntries: Entry[]) => {
    setCvData(prev => ({ ...prev, projectEntries }));
  };

  const updateTechnologies = (technologies: Technologies) => {
    setCvData(prev => ({ ...prev, technologies }));
  };

  const updateStyleSettings = (styleSettings: StyleSettings) => {
    setCvData(prev => ({ ...prev, styleSettings }));
  };

  const latexCode = generateLatexCode(cvData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LaTeX CV Editor</h1>
          <p className="text-gray-600">Create and customize your professional CV with real-time LaTeX preview</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
          {/* Form Editor - Left Side */}
          <div className="bg-white rounded-lg shadow-sm border">
            <ScrollArea className="h-full p-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <PersonalInfoForm
                    personalInfo={cvData.personalInfo}
                    onChange={updatePersonalInfo}
                  />
                  <TechnologiesForm
                    technologies={cvData.technologies}
                    onChange={updateTechnologies}
                  />
                </TabsContent>
                
                <TabsContent value="experience">
                  <SectionManager
                    title="Experience"
                    entries={cvData.experienceEntries}
                    onChange={updateExperienceEntries}
                    entryType="experience"
                  />
                </TabsContent>
                
                <TabsContent value="education">
                  <SectionManager
                    title="Education"
                    entries={cvData.educationEntries}
                    onChange={updateEducationEntries}
                    entryType="education"
                  />
                </TabsContent>
                
                <TabsContent value="projects">
                  <SectionManager
                    title="Projects"
                    entries={cvData.projectEntries}
                    onChange={updateProjectEntries}
                    entryType="project"
                  />
                </TabsContent>
                
                <TabsContent value="style">
                  <StyleSettingsForm
                    styleSettings={cvData.styleSettings}
                    onChange={updateStyleSettings}
                  />
                </TabsContent>
              </Tabs>
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
