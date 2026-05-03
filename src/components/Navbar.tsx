import { Link } from 'react-router-dom';
import { FileUser } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-200 flex-shrink-0">
            <FileUser className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
          </div>
          <span className="hidden sm:inline text-lg sm:text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent truncate">Resume Portfolio Builder</span>
          <span className="sm:hidden text-sm font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Builder</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/dashboard"
            className="rounded-full bg-slate-900 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-slate-800 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Launch Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
