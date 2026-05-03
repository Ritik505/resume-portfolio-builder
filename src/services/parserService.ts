import { type ResumeData } from '../context/ResumeContext';

export const parseResumeText = (text: string): ResumeData => {
  const data: ResumeData = {
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
    github: undefined,
    linkedin: undefined,
  };

  if (!text || typeof text !== 'string') return data;

  // 1. Extract Contact Info
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) data.email = emailMatch[0];

  // More inclusive phone pattern (handles digits, spaces, parentheses, +, and extensions)
  const phoneMatch = text.match(/(?:(?:\+|00)\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);
  if (phoneMatch) data.phone = phoneMatch[0];

  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9-_]+/i);
  if (linkedinMatch) data.linkedin = `https://${linkedinMatch[0]}`;

  const githubMatch = text.match(/github\.com\/[a-zA-Z0-9-_]+/i);
  if (githubMatch) data.github = `https://${githubMatch[0]}`;
  
  // Extract location/address and avoid matching project lines or skill lists
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  const addressLines = lines.filter(line => {
    const isHeading = /(projects|summary|skills|experience|education)/i.test(line);
    const isTooLong = line.length > 50;
    const hasProjectBullet = line.startsWith('🔹') || line.includes('Created a');
    const isContactWord = /(address|location|based in)/i.test(line) || (line.split(',').length >= 2 && !line.includes('@'));

    return !isHeading && !isTooLong && !hasProjectBullet && isContactWord;
  });

  if (addressLines.length > 0) {
    data.location = addressLines[0].replace(/(address|location|:)/gi, '').trim();
  }

  // 2. Split Sections
  const sections: Record<string, string> = {};
  const sectionKeywords = {
    about: /(summary|profile|about me|objective|biography)/i,
    skills: /(skills|technical skills|expertise|technologies|competencies)/i,
    experience: /(experience|work history|employment|professional background)/i,
    education: /(education|academic background|qualifications)/i,
    projects: /(projects|personal projects|portfolio)/i,
    certifications: /(certifications|licenses|certs)/i,
    achievements: /(achievements|awards|honors)/i,
  };
  
  // Guessing Name
  const nameCandidates: string[] = lines.slice(0, 10).filter(line => {
    const isHeading = Object.values(sectionKeywords).some(regex => regex.test(line));
    const isContact = line.includes('@') || 
                      line.includes('http') || 
                      line.match(/\d{5,}/) || 
                      line.toLowerCase().includes('resume') ||
                      line.toLowerCase().includes('page');
    return !isHeading && !isContact && line.length > 1 && line.length < 50;
  });

  if (nameCandidates.length > 0) {
    data.name = nameCandidates[0];
  }

  // Fallback Name
  if (!data.name && lines.length > 0) {
     const cleanLines = lines.filter(l => !l.includes('@') && !l.includes('http') && l.length < 60);
     data.name = cleanLines.length > 0 ? cleanLines[0] : 'Professional Developer';
  }

  let currentSection = '';
  lines.forEach(line => {
    let matched = false;
    for (const [key, regex] of Object.entries(sectionKeywords)) {
      if (regex.test(line) && line.length < 30) {
        currentSection = key;
        matched = true;
        break;
      }
    }
    if (!matched && currentSection) {
      sections[currentSection] = (sections[currentSection] || '') + line + '\n';
    }
  });

  // 3. Process Sections
  if (sections.about) {
    data.about = sections.about.trim();
  }

  if (sections.skills) {
    data.skills = sections.skills
      .split(/[,|•\t]|\n/)
      .map(s => s.trim())
      .filter(s => s.length > 2 && s.length < 50);
  }

  if (sections.experience) {
    const expLines = sections.experience.split('\n');
    let currentExp: any = null;
    data.experience = [];
    
    expLines.forEach(line => {
      if (/(19|20)\d{2}|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(line) && line.length < 50) {
        if (currentExp) data.experience.push(currentExp);
        currentExp = { company: '', position: '', duration: line, description: '' };
      } else if (currentExp) {
        if (!currentExp.company) {
          currentExp.company = line;
        } else if (!currentExp.position) {
          currentExp.position = line;
        } else {
          currentExp.description += line + ' ';
        }
      }
    });
    if (currentExp) data.experience.push(currentExp);
  }

  if (sections.education) {
    const eduLines = sections.education.split('\n');
    data.education = [];
    eduLines.forEach(line => {
      if (line.length > 5) {
        data.education.push({ institution: line, degree: '', year: '' });
      }
    });
  }

  if (sections.projects) {
    const projLines = sections.projects.split('\n');
    data.projects = [];
    projLines.forEach(line => {
      if (line.length > 5 && line.length < 100) {
        data.projects.push({ title: line, description: '' });
      }
    });
  }

  return data;
};