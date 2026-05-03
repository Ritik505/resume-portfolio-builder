import { FileUser, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-slate-100 bg-slate-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        
        {/* Centered Brand Section */}
        <div className="mb-8 sm:mb-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 justify-center">
            <div className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600">
              <FileUser className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-base sm:text-lg">Resume Portfolio Builder</span>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 sm:mt-3 px-2 sm:px-0">
            Create a professional resume and portfolio that opens doors to exceptional career opportunities.
          </p>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
            
            <p className="text-xs sm:text-sm text-slate-600 text-center px-2 sm:px-0">
              &copy; {currentYear} Resume Portfolio Builder™ Developed by{" "}
              <span className="text-black font-medium">Ritik Verma</span>. All rights reserved.
            </p>

            {/*
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>
              */}

          </div>
        </div>

      </div> 
    </footer>
  );
}