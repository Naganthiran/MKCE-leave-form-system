/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  ShieldCheck, 
  Users,
  X,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import ParticleBrackets from '../components/ParticleBrackets';

export default function LandingPage() {
  const navigate = useNavigate();
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#030712]">
      {/* Top Navigation Header */}
      <header className="w-full py-6 px-8 lg:px-16 flex justify-between items-center z-10 border-b border-white/5 bg-black/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-500/20">
            M
          </div>
          <span className="text-lg font-bold tracking-tight text-white uppercase">MKCE Smart Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Portal Active</span>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 py-12 lg:px-16 gap-12 lg:gap-0 max-w-7xl mx-auto w-full z-10">
        
        {/* Left Section - Student (With Particle Brackets) */}
        <div className="flex-1 w-full flex flex-col items-center justify-center text-center">
          <ParticleBrackets>
            <span className="inline-block px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-blue-400 font-medium tracking-wide mb-6 uppercase">
              Student Portal
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2 text-white">
              For students
            </h2>
            <p className="text-xl lg:text-2xl text-gray-400 font-light mb-8">
              Apply Leave & OD requests
            </p>
            <button 
              onClick={() => navigate('/student-login')}
              className="px-12 py-3.5 bg-black text-white hover:bg-neutral-900 border border-white/25 hover:border-white/50 font-medium rounded-full transition-all text-base hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] active:scale-95"
            >
              Student Login
            </button>
          </ParticleBrackets>
        </div>

        {/* Vertical Divider for large screens */}
        <div className="hidden lg:block w-[1px] h-96 bg-gradient-to-b from-transparent via-white/10 to-transparent self-center"></div>

        {/* Right Section - Faculty */}
        <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-12">
          <div className="max-w-[450px] aspect-square flex flex-col items-center justify-center p-12">
            <span className="inline-block px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-purple-400 font-medium tracking-wide mb-6 uppercase">
              Faculty Portal
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2 text-white">
              For faculty
            </h2>
            <p className="text-xl lg:text-2xl text-gray-400 font-light mb-8">
              Multi-tier approval workflow
            </p>
            <button 
              onClick={() => setFacultyModalOpen(true)}
              className="px-12 py-3.5 bg-white text-black hover:bg-neutral-100 font-semibold rounded-full transition-all text-base hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95"
            >
              Faculty Access
            </button>
          </div>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="py-6 text-center text-xs text-gray-600 border-t border-white/5 w-full z-10 bg-black/10">
        M.Kumarasamy College of Engineering • Smart Leave & On-Duty Management System
      </footer>

      {/* Faculty Portal Selector Modal */}
      <AnimatePresence>
        {facultyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md glass p-8 rounded-3xl border border-white/10 shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setFacultyModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-purple-500/15 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                  <ShieldCheck className="text-purple-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Faculty Portals</h3>
                <p className="text-xs text-gray-400 mt-1">Select your role to access the dashboard</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setFacultyModalOpen(false);
                    navigate('/advisor-login');
                  }}
                  className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-105 transition-transform">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide">Class Advisor Login</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => {
                    setFacultyModalOpen(false);
                    navigate('/mentor-login');
                  }}
                  className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide">Mentor Login</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => {
                    setFacultyModalOpen(false);
                    navigate('/hod-login');
                  }}
                  className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide">HOD Login</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
