import { createContext, useContext, useState, ReactNode } from 'react';

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  technologies?: string[];
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  github?: string;
  linkedin?: string;
  website?: string;
  certifications: string[];
  achievements: string[];
}

export interface TemplateConfig {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'modern' | 'minimal' | 'sidebar';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
  animation: 'none' | 'subtle' | 'dynamic';
  glassmorphism: boolean;
  pattern: 'none' | 'dots' | 'grid';
  buttonStyle: 'sharp' | 'rounded' | 'pill';
  projectsStyle: 'grid' | 'list';
  skillsStyle: 'solid' | 'outline';
}

interface ResumeContextType {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  config: TemplateConfig;
  setConfig: (config: TemplateConfig) => void;
  isParsing: boolean;
  setIsParsing: (val: boolean) => void;
}

const defaultData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  about: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  achievements: [],
};

const defaultConfig: TemplateConfig = {
  id: 'developer',
  primaryColor: '#6366f1', // Indigo 500
  secondaryColor: '#4f46e5', // Indigo 600
  fontFamily: 'Inter',
  layout: 'modern',
  borderRadius: 'large',
  animation: 'dynamic',
  glassmorphism: false,
  pattern: 'dots',
  buttonStyle: 'pill',
  projectsStyle: 'grid',
  skillsStyle: 'solid',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [config, setConfig] = useState<TemplateConfig>(defaultConfig);
  const [isParsing, setIsParsing] = useState(false);

  return (
    <ResumeContext.Provider value={{ data, setData, config, setConfig, isParsing, setIsParsing }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
}
