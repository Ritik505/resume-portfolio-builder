import { motion } from 'motion/react';
import FileUpload from '../components/FileUpload';
import ResumeEditor from '../components/ResumeEditor';
import LivePreview from '../components/LivePreview';
import TemplateSelector from '../components/TemplateSelector';
import { useResume } from '../context/ResumeContext';
import { Layout, FileText, Settings, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const { data, isParsing } = useResume();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const hasData = data && (data.name || data.skills.length > 0 || data.experience.length > 0);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-14 sm:pt-20 pb-12">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        {!hasData ? (
          <div className="mx-auto flex h-[calc(100vh-200px)] sm:h-[80vh] max-w-2xl flex-col justify-center px-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center rounded-2xl sm:rounded-[3rem] bg-white p-6 sm:p-12 shadow-2xl shadow-slate-200/50 border border-white"
            >
              <div className="mx-auto mb-6 sm:mb-8 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-blue-600 shadow-xl shadow-blue-600/20">
                <FileText className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Launch Your Professional Presence
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 font-medium">
                Import your PDF or DOCX resume and transform it into a captivating, professional online portfolio that showcases your expertise and accomplishments.
              </p>
              <div className="mt-6 sm:mt-10">
                <FileUpload />
              </div>
              <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
                 <Feature value="Intelligent" label="Data Parsing" />
                 <Feature value="Premium" label="Design Templates" />
                 <Feature value="Direct" label="HTML Export" />
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Mobile/Tablet Tab Navigation */}
            <div className="lg:hidden mb-6 flex gap-2 bg-white rounded-xl p-1 shadow-sm ring-1 ring-slate-200 w-full">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex-1 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm font-medium transition ${
                  activeTab === 'editor'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="hidden sm:inline">Edit Resume</span>
                <span className="sm:hidden">Editor</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm font-medium transition ${
                  activeTab === 'preview'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="hidden sm:inline">Preview</span>
                <span className="sm:hidden">View</span>
              </button>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-col gap-8 lg:flex-row min-h-[calc(100vh-180px)]">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex w-full flex-col gap-6 overflow-y-auto pr-2 lg:w-[400px] hide-scrollbar"
              >
                 <FileUpload />
                 <TemplateSelector />
                 <ResumeEditor />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 overflow-hidden rounded-3xl border border-white bg-white/40 shadow-2xl backdrop-blur-xl"
              >
                 <LivePreview />
              </motion.div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              {activeTab === 'editor' ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-4 overflow-y-auto hide-scrollbar pb-8"
                >
                   <FileUpload />
                   <TemplateSelector />
                   <ResumeEditor />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white bg-white/40 shadow-2xl backdrop-blur-xl h-[calc(100vh-180px)]"
                >
                   <LivePreview />
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Feature({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4 transition-all hover:bg-white hover:shadow-lg">
      <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{value}</div>
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  );
}
