import { useResume } from '../context/ResumeContext';
import { Palette, Type, Box, Sparkles, Move } from 'lucide-react';

const COLORS = [
  { name: 'Indigo', primary: '#6366f1', secondary: '#4f46e5' },
  { name: 'Blue', primary: '#3b82f6', secondary: '#1e40af' },
  { name: 'Purple', primary: '#a855f7', secondary: '#6b21a8' },
  { name: 'Green', primary: '#22c55e', secondary: '#15803d' },
  { name: 'Orange', primary: '#f97316', secondary: '#c2410c' },
  { name: 'Slate', primary: '#334155', secondary: '#0f172a' },
];

const FONTS = ['Inter', 'Playfair Display', 'Poppins', 'Montserrat', 'Roboto Mono'];

const LAYOUTS = [
  { id: 'modern', name: 'Modern Stack' },
  { id: 'minimal', name: 'Clean Minimal' },
  { id: 'sidebar', name: 'Classic Sidebar' },
];

export default function TemplateSelector() {
  const { config, setConfig } = useResume();

  return (
    <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
        <Palette className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Design Customization</h2>
      </div>

      <div className="space-y-5 sm:space-y-8">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Portfolio Layout</label>
          <div className="mt-2 sm:mt-3 grid grid-cols-1 gap-1.5 sm:gap-2">
             {LAYOUTS.map((l) => (
               <button
                 key={l.id}
                 onClick={() => setConfig({ ...config, layout: l.id as any })}
                 className={`flex items-center justify-between rounded-lg sm:rounded-xl border px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition ${
                   config.layout === l.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                 }`}
               >
                 {l.name}
                 {config.layout === l.id && <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-blue-600"></div>}
               </button>
             ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Color Palette</label>
          <div className="mt-2 sm:mt-3 grid grid-cols-6 gap-2 sm:gap-3">
             {COLORS.map((c) => (
               <button
                 key={c.name}
                 onClick={() => setConfig({ ...config, primaryColor: c.primary, secondaryColor: c.secondary })}
                 className={`h-8 sm:h-10 w-full rounded-lg transition hover:scale-105 active:scale-95 ${
                   config.primaryColor === c.primary ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                 }`}
                 style={{ backgroundColor: c.primary }}
                 title={c.name}
               />
             ))}
          </div>
        </div>

        <div>
           <div className="flex items-center gap-2 mb-2 sm:mb-3">
             <Type className="h-3 sm:h-4 w-3 sm:w-4 text-slate-400" />
             <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Typography</label>
           </div>
           <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {FONTS.map(f => (
                <button
                  key={f}
                  onClick={() => setConfig({ ...config, fontFamily: f })}
                  className={`rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm transition ${
                    config.fontFamily === f ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={{ fontFamily: f }}
                >
                  {f}
                </button>
              ))}
           </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
             <Box className="h-3 sm:h-4 w-3 sm:w-4 text-slate-400" />
             <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Shapes & Style</label>
          </div>
          <div className="space-y-2 sm:space-y-4">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Border Radius</span>
                <div className="flex bg-slate-100 rounded-lg p-0.5 sm:p-1 flex-wrap sm:flex-nowrap gap-0.5 sm:gap-0">
                   {(['none', 'small', 'medium', 'large', 'full'] as const).map(r => (
                     <button
                        key={r}
                        onClick={() => setConfig({ ...config, borderRadius: r })}
                        className={`px-1.5 sm:px-2 py-0.5 text-[10px] font-bold rounded transition ${
                          config.borderRadius === r ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                        }`}
                     >{r}</button>
                   ))}
                </div>
             </div>
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Buttons</span>
                <div className="flex bg-slate-100 rounded-lg p-0.5 sm:p-1 gap-0.5 sm:gap-0">
                   {(['sharp', 'rounded', 'pill'] as const).map(b => (
                     <button
                        key={b}
                        onClick={() => setConfig({ ...config, buttonStyle: b })}
                        className={`px-1.5 sm:px-2 py-0.5 text-[10px] font-bold rounded transition capitalize ${
                          config.buttonStyle === b ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                        }`}
                     >{b}</button>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
             <Sparkles className="h-3 sm:h-4 w-3 sm:w-4 text-slate-400" />
             <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Visual Effects</label>
          </div>
          <div className="space-y-2 sm:space-y-3">
             <button 
               onClick={() => setConfig({ ...config, glassmorphism: !config.glassmorphism })}
               className={`flex w-full items-center justify-between rounded-lg sm:rounded-xl border p-2 sm:p-3 text-xs font-bold transition ${
                 config.glassmorphism ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-600'
               }`}
             >
               Glassmorphism
               <div className={`h-3 sm:h-4 w-6 sm:w-8 rounded-full transition-colors ${config.glassmorphism ? 'bg-blue-600' : 'bg-slate-300'} relative`}>
                  <div className={`absolute top-0.5 sm:top-1 h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-white transition-all ${config.glassmorphism ? 'right-1' : 'left-1'}`}></div>
               </div>
             </button>
             
             <div className="flex gap-1 sm:gap-2">
                {(['none', 'dots', 'grid'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setConfig({ ...config, pattern: p })}
                    className={`flex-1 rounded-lg sm:rounded-xl border p-2 sm:p-3 text-[10px] font-bold uppercase transition ${
                      config.pattern === p ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-600'
                    }`}
                  >{p}</button>
                ))}
             </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
             <Move className="h-3 sm:h-4 w-3 sm:w-4 text-slate-400" />
             <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Motion & Animation</label>
          </div>
          <div className="flex bg-slate-100 rounded-lg sm:rounded-xl p-0.5 sm:p-1 gap-0.5 sm:gap-0">
             {(['none', 'subtle', 'dynamic'] as const).map(a => (
               <button
                  key={a}
                  onClick={() => setConfig({ ...config, animation: a })}
                  className={`flex-1 py-1.5 sm:py-2 text-[10px] font-bold rounded-lg transition capitalize ${
                    config.animation === a ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
               >{a}</button>
             ))}
          </div>
        </div>

        <div>
           <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2 sm:mb-3">Section Specific Styles</label>
           <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Projects</span>
                <div className="flex bg-slate-100 rounded-lg p-0.5 sm:p-1 gap-0.5 sm:gap-0">
                   {(['grid', 'list'] as const).map(s => (
                     <button
                        key={s}
                        onClick={() => setConfig({ ...config, projectsStyle: s })}
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] font-bold rounded transition capitalize ${
                          config.projectsStyle === s ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                        }`}
                     >{s}</button>
                   ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Skills</span>
                <div className="flex bg-slate-100 rounded-lg p-0.5 sm:p-1 gap-0.5 sm:gap-0">
                   {(['solid', 'outline'] as const).map(s => (
                     <button
                        key={s}
                        onClick={() => setConfig({ ...config, skillsStyle: s })}
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] font-bold rounded transition capitalize ${
                          config.skillsStyle === s ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                        }`}
                     >{s}</button>
                   ))}
                </div>
              </div>
           </div>
        </div>

        <div className="rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 border border-blue-100">
            <p className="text-[10px] font-bold leading-relaxed text-blue-800 uppercase tracking-tight">Pro Tip: Subtle animations and glassmorphism often feel more professional for senior roles.</p>
        </div>
      </div>
    </div>
  );
}
