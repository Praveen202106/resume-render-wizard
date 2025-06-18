
export interface PersonalInfo {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  lastUpdated: Date | undefined;
}

export interface SectionSettings {
  title: string;
  showLine: boolean;
  topMargin: number;
  bottomMargin: number;
  order: number;
  visible: boolean;
}

export interface Entry {
  id: string;
  leftTitle: string;
  subtitle: string;
  rightSideValue: string;
  isOneColumn: boolean;
  bulletPoints: string[];
  projectLink?: string;
  toolsUsed?: string;
  location?: string;
  dateRange?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  date: Date | undefined;
  doiUrl: string;
}

export interface TechnologyCategory {
  id: string;
  name: string;
  items: string[];
}

export interface Technologies {
  categories: TechnologyCategory[];
}

export interface CustomSectionField {
  id: string;
  mainHeading: string;
  rightSection: string;
  subHeading: string;
  rightSubSection: string;
  bulletPoints: string[];
}

export interface StyleSettings {
  pageMargins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  columnSpacing: number;
  bulletLeftMargin: number;
  sectionTitleLine: boolean;
  fontSize: string;
  themeColor: string;
  showPageNumber: boolean;
  footerText: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'entries' | 'publications' | 'technologies' | 'custom';
  settings: SectionSettings;
}

export interface CVData {
  personalInfo: PersonalInfo;
  customSections: CustomSection[];
  sectionEntries: {[key: string]: Entry[]};
  publications: Publication[];
  technologies: Technologies;
  customSectionFields: {[key: string]: CustomSectionField[]};
  styleSettings: StyleSettings;
}
