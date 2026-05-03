/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-[#fafafa] font-sans text-slate-900 overflow-x-hidden">
          <Navbar />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ResumeProvider>
  );
}
