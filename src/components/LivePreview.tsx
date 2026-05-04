import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { generatePortfolioHTML } from '../services/templateService';
import { Smartphone, Monitor, Download, Copy, Check } from 'lucide-react';

export default function LivePreview() {
  const { data, config } = useResume();
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHtml(generatePortfolioHTML(data, config));
  }, [data, config]);

  const downloadFile = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '_')}_Portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center gap-1 sm:gap-2 rounded-lg bg-slate-100 p-0.5 sm:p-1 w-full sm:w-auto order-2 sm:order-1">
          <button
            onClick={() => setView('desktop')}
            className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition flex-1 sm:flex-none ${
              view === 'desktop' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Monitor className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="hidden sm:inline">Desktop</span>
            <span className="sm:hidden">PC</span>
          </button>
          <button
            onClick={() => setView('mobile')}
            className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition flex-1 sm:flex-none ${
              view === 'mobile' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="hidden sm:inline">Mobile</span>
            <span className="sm:hidden">Phone</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto order-1 sm:order-2">
          <button
            onClick={copyCode}
            className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-lg border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 transition hover:bg-slate-50 flex-1 sm:flex-none whitespace-nowrap"
          >
            {copied ? <Check className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-green-600" /> : <Copy className="h-3.5 sm:h-4 w-3.5 sm:w-4" />}
            <span className="hidden sm:inline">{copied ? 'Code Copied' : 'Copy HTML Code'}</span>
            <span className="sm:hidden">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={downloadFile}
            className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-lg bg-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 flex-1 sm:flex-none whitespace-nowrap"
          >
            <Download className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="hidden sm:inline">Export Portfolio</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-200 shadow-inner">
        <div 
          className={`mx-auto h-full transition-all duration-300 ${
            view === 'mobile' ? 'w-full sm:max-w-[600px]' : 'max-w-full'
          }`}
        >
          <iframe
            srcDoc={html}
            title="Portfolio Preview"
            className="h-full w-full bg-white shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
