import { useState, useCallback, DragEvent } from 'react';
import { FileUp, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { extractTextFromPDF, extractTextFromDOCX, extractTextFromTXT } from '../utils/fileUtils';
import { parseResumeText } from '../services/parserService';

export default function FileUpload() {
  const { setData, setIsParsing, isParsing } = useResume();
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleFile = useCallback(async (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.txt')) {
      setError('Unsupported file format. Please upload a PDF, DOCX, or TXT document.');
      setStatus('error');
      return;
    }

    try {
      setStatus('parsing');
      setIsParsing(true);
      setError('');

      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type.includes('word') || file.name.endsWith('.docx')) {
        text = await extractTextFromDOCX(file);
      } else {
        text = await extractTextFromTXT(file);
      }

      const parsedData = parseResumeText(text);
      setData(parsedData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      console.error(err);
      setError('Unable to process your resume. Please verify the file format and try again.');
      setStatus('error');
    } finally {
      setIsParsing(false);
    }
  }, [setData, setIsParsing]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-dashed p-6 sm:p-10 transition-all ${
          status === 'error' ? 'border-red-300 bg-red-50' : 
          status === 'success' ? 'border-green-300 bg-green-50' :
          'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30'
        }`}
      >
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0"
          accept=".pdf,.docx,.txt"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={isParsing}
        />
        
        {isParsing ? (
          <div className="text-center">
            <Loader2 className="mx-auto h-10 sm:h-12 w-10 sm:w-12 animate-spin text-blue-600" />
            <p className="mt-3 sm:mt-4 font-medium text-slate-900 text-sm sm:text-base">Intelligently Processing Your Resume...</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Our advanced engine is extracting and organizing your professional information.</p>
          </div>
        ) : status === 'success' ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-green-600" />
            <p className="mt-3 sm:mt-4 font-medium text-green-900 text-sm sm:text-base">Resume Successfully Imported!</p>
            <p className="text-xs sm:text-sm text-green-600 mt-1">Review, enhance, and customize your professional profile below.</p>
          </div>
        ) : status === 'error' ? (
          <div className="text-center">
            <AlertCircle className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-red-600" />
            <p className="mt-3 sm:mt-4 font-medium text-red-900 text-sm sm:text-base">Import Error: {error}</p>
            <p className="text-xs sm:text-sm text-red-600 mt-1">Please try again with a different file.</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <FileUp className="h-6 sm:h-8 w-6 sm:w-8" />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-slate-900">Import Your Resume</p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Drag & drop or click to upload your resume (PDF, DOCX, or TXT)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
