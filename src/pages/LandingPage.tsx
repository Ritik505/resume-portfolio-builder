import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileUp, Sparkles, Download, LayoutTemplate, Briefcase, GraduationCap, Code, Trophy } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden pt-14 sm:pt-16">
      {/* Background blobs */}
      <div className="absolute -top-32 sm:-top-40 -right-32 sm:-right-40 -z-10 h-64 sm:h-80 w-64 sm:w-80 animate-pulse rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute top-60 sm:top-80 -left-20 -z-10 h-56 sm:h-72 w-56 sm:w-72 animate-pulse rounded-full bg-purple-100/50 blur-3xl"></div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-32 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10 transition-transform hover:scale-105 cursor-default whitespace-normal sm:whitespace-nowrap">
              ✨ <span className="hidden sm:inline">Professional Portfolio Building Made Effortless</span>
              <span className="sm:hidden">Build Stunning Portfolios</span>
            </span>
            <h1 className="mt-6 sm:mt-8 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900">
              Professional <br className="sm:hidden" />
              <span className="hidden sm:inline">Portfolios </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 px-2 sm:px-0">
              Elevate your professional presence. Upload your resume and transform it into a sophisticated, production-ready portfolio website. Showcase your expertise, accomplishments, and career achievements.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:gap-6 px-2 sm:px-0">
              <Link
                to="/dashboard"
                className="group relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg lg:text-xl font-bold text-white shadow-2xl shadow-blue-600/30 transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-600/50"
              >
                Start Building Now
                <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 transition-transform group-hover:rotate-12" />
                <div className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 blur transition group-hover:opacity-100"></div>
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto rounded-full border border-slate-200 bg-white/50 px-6 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg lg:text-xl font-bold text-slate-700 backdrop-blur-sm transition hover:bg-white hover:text-blue-600 text-center"
              >
                Explore Features
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="mb-12 sm:mb-16 lg:mb-24 text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 px-2 sm:px-0">
              Professional Features Built for Success
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              We've engineered intelligent tools to streamline portfolio creation, allowing you to focus on what matters most: your career growth and professional advancement.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FileUp className="h-6 sm:h-7 w-6 sm:w-7 text-blue-600" />}
              title="Intelligent Data Recognition"
              description="Our advanced extraction engine precisely identifies and organizes professional information, contact details, core competencies, and career history."
              index={0}
            />
            <FeatureCard
              icon={<LayoutTemplate className="h-6 sm:h-7 w-6 sm:w-7 text-purple-600" />}
              title="Premium Design Templates"
              description="Select from expertly crafted, contemporary layouts that present your qualifications with sophistication and visual appeal."
              index={1}
            />
            <FeatureCard
              icon={<Download className="h-6 sm:h-7 w-6 sm:w-7 text-emerald-600" />}
              title="Standalone Digital Assets"
              description="Download a self-contained HTML portfolio. Deploy instantly, optimized performance, fully functional offline."
              index={2}
            />
            <FeatureCard
              icon={<Sparkles className="h-6 sm:h-7 w-6 sm:w-7 text-indigo-600" />}
              title="Enterprise-Grade Security"
              description="Your information stays within your browser. Zero cloud storage, complete data privacy, maximum confidentiality protection."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Section Dividers / Bento Style */}
      <section className="bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="grid gap-6 sm:gap-8 lg:gap-8 lg:grid-cols-12">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-8 rounded-2xl sm:rounded-[2rem] bg-white p-6 sm:p-8 lg:p-12 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 border border-white"
             >
                <div className="flex items-center gap-3 sm:gap-4 text-blue-600 mb-6 sm:mb-8">
                   <div className="p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-2xl"><Code className="h-6 sm:h-10 w-6 sm:w-10" /></div>
                   <h3 className="text-xl sm:text-3xl font-black text-slate-900">Customizable Everything</h3>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
                  Tailor your portfolio's aesthetic with our real-time editor. 
                  Adjust typography, color palettes, and component layouts 
                  with instant live feedback.
                </p>
                <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                   <div className="h-16 sm:h-24 rounded-lg sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs sm:text-base font-bold text-slate-400">COLORS</div>
                   <div className="h-16 sm:h-24 rounded-lg sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs sm:text-base font-bold text-slate-400">FONTS</div>
                   <div className="h-16 sm:h-24 rounded-lg sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs sm:text-base font-bold text-slate-400">LAYOUTS</div>
                   <div className="h-16 sm:h-24 rounded-lg sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs sm:text-base font-bold text-slate-400">CARDS</div>
                </div>
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-4 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 lg:p-12 text-white shadow-2xl shadow-blue-500/20"
             >
                <div className="p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-2xl w-fit mb-6 sm:mb-8"><Trophy className="h-6 sm:h-10 w-6 sm:w-10 text-blue-200" /></div>
                <h3 className="text-xl sm:text-3xl font-black italic tracking-tight">Hire-Ready Design</h3>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg opacity-80 leading-relaxed font-medium">
                  We follow industry best-practices to ensure your portfolio is scannable 
                  by both humans and automated screening systems.
                </p>
                <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-white/10 flex items-center gap-3 sm:gap-4">
                   <div>
                        <div className="text-xs sm:text-sm opacity-60">Developed By</div>
                      <div className="font-bold text-sm sm:text-base">Ritik Verma</div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 md:px-6 lg:px-8">
         <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl sm:rounded-[3rem] bg-slate-900 px-4 sm:px-8 py-16 sm:py-24 text-white shadow-2xl relative overflow-hidden w-full">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent)]"></div>
               <h2 className="relative text-2xl sm:text-4xl lg:text-6xl font-black mb-6 sm:mb-8 text-center">Ready to get hired?</h2>
               <p className="relative text-base sm:text-lg lg:text-xl opacity-60 mb-8 sm:mb-12 max-w-2xl mx-auto text-center">Build your professional portfolio today. No credit card required.</p>
               <div className="flex justify-center">
                 <Link
                  to="/dashboard"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-12 py-3 sm:py-5 text-base sm:text-lg lg:text-xl font-black text-slate-900 transition hover:scale-105 active:scale-95 shadow-xl"
                >
                  Create My Portfolio Now
                </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-xl sm:rounded-[2rem] border border-slate-100 bg-[#fafafa] p-5 sm:p-8 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2"
    >
      <div className="mb-6 sm:mb-8 inline-flex h-10 sm:h-14 w-10 sm:w-14 items-center justify-center rounded-lg sm:rounded-[1.25rem] bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 transition-transform group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
      <p className="mt-2 sm:mt-4 text-sm sm:text-base text-slate-500 leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
}
