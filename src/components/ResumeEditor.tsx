import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Briefcase, GraduationCap, Code, Trophy, Contact, User } from 'lucide-react';

export default function ResumeEditor() {
  const { data, setData } = useResume();

  const updateField = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const updateSubField = (section: keyof any, index: number, field: string, value: any) => {
    const list = [...(data[section as keyof typeof data] as any[])];
    list[index] = { ...list[index], [field]: value };
    setData({ ...data, [section as keyof typeof data]: list });
  };

  const addItem = (section: keyof typeof data, emptyObj: any) => {
    setData({ ...data, [section]: [...(data[section] as any[]), emptyObj] });
  };

  return (
    <div className="space-y-6 sm:space-y-8 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-100 pb-3 sm:pb-4">
        <User className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Professional Identity</h2>
      </div>
      
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        <Input label="Full Name" value={data.name} onChange={(val) => updateField('name', val)} />
        <Input label="Email Address" value={data.email} onChange={(val) => updateField('email', val)} />
        <Input label="Phone" value={data.phone} onChange={(val) => updateField('phone', val)} />
        <Input label="Location" value={data.location} onChange={(val) => updateField('location', val)} />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Professional Summary</label>
        <textarea
          value={data.about}
          onChange={(e) => updateField('about', e.target.value)}
          rows={4}
          className="w-full rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4 text-sm sm:text-base text-slate-900 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Highlight your core competencies, years of experience, and career achievements. Focus on your unique value proposition to potential employers..."
        />
      </div>

      <SectionHeader icon={<Briefcase className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />} title="Professional Experience" />
      {data.experience.map((exp, idx) => (
        <div key={idx} className="space-y-3 sm:space-y-4 rounded-lg sm:rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <Input label="Organization" value={exp.company} onChange={(v) => updateSubField('experience', idx, 'company', v)} />
            <Input label="Job Title" value={exp.position} onChange={(v) => updateSubField('experience', idx, 'position', v)} />
            <Input label="Employment Period" value={exp.duration} onChange={(v) => updateSubField('experience', idx, 'duration', v)} />
          </div>
          <textarea
             value={exp.description}
             onChange={(e) => updateSubField('experience', idx, 'description', e.target.value)}
             className="w-full rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
             rows={2}
             placeholder="Describe key responsibilities, achievements, and impact. Use action verbs and quantifiable results..."
          />
        </div>
      ))}
      <button 
        onClick={() => addItem('experience', { company: '', position: '', duration: '', description: '' })}
        className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
      >+ Add Position</button>

      <SectionHeader icon={<Code className="h-4 sm:h-5 w-4 sm:w-5 text-indigo-600" />} title="Core Competencies" />
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-slate-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700">
            {skill}
            <button onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== idx) })} className="text-slate-400 hover:text-red-500 font-bold text-sm sm:text-base">&times;</button>
          </div>
        ))}
        <input 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setData({ ...data, skills: [...data.skills, (e.target as HTMLInputElement).value] });
              (e.target as HTMLInputElement).value = '';
            }
          }}
          className="rounded-full border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter skill and press Enter..."
        />
      </div>

      {/* Simplified for other sections to save space in block */}
      <SectionHeader icon={<GraduationCap className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />} title="Academic Credentials" />
      {data.education.map((edu, idx) => (
        <div key={idx} className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
           <Input label="Educational Institution" value={edu.institution} onChange={(v) => updateSubField('education', idx, 'institution', v)} />
           <Input label="Degree / Certification" value={edu.degree} onChange={(v) => updateSubField('education', idx, 'degree', v)} />
           <Input label="Graduation Year" value={edu.year} onChange={(v) => updateSubField('education', idx, 'year', v)} />
        </div>
      ))}
      <button 
        onClick={() => addItem('education', { institution: '', degree: '', year: '' })}
        className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
      >+ Add Qualification</button>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
      <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-100 pt-3 sm:pt-4 pb-2 sm:pb-2">
        {icon}
        <h3 className="text-base sm:text-lg font-bold text-slate-800">{title}</h3>
      </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-slate-900 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
