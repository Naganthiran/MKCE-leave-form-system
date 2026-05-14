/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Clock, 
  FileUp, 
  Workflow, 
  Target, 
  ShieldCheck, 
  History, 
  User, 
  Users,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'student' | 'faculty'>('student');
  const navigate = useNavigate();

  const features = [
    { icon: Clock, title: "Instant Leave Application", desc: "Submit leave and OD forms with ease" },
    { icon: FileUp, title: "Evidence Upload", desc: "Attach proofs securely" },
    { icon: Workflow, title: "Multi-tier Workflow", desc: "CA → Mentor → HOD" },
    { icon: Target, title: "Real-time Tracking", desc: "Track approval status" },
    { icon: ShieldCheck, title: "Role-Based Access", desc: "Secure portals for students and staff" },
    { icon: History, title: "Digital Records", desc: "Maintain paperless history" }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-12">
      {/* Left Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 max-w-2xl"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold text-xl shadow-lg">
              MKCE
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">MKCE SMART PORTAL</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            MKCE Smart <br /><span className="text-blue-400">Leave Portal</span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed italic">
            "A seamless paperless workflow for managing student Leave and On-Duty requests at M.Kumarasamy College of Engineering."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 rounded-2xl hover:bg-white/15 transition-all group"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <f.icon className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <button className="mt-10 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20">
            Register Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Right Section - Login Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 rounded-3xl relative overflow-hidden">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
               <Users className="text-white w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Leave Management System</h2>
          </div>

          <div className="flex p-1 bg-black/20 rounded-xl mb-8">
            <button 
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${activeTab === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Student
            </button>
            <button 
              onClick={() => setActiveTab('faculty')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${activeTab === 'faculty' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Faculty
            </button>
          </div>

          {activeTab === 'student' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Student ID</label>
                <input 
                  type="text" 
                  placeholder="Enter ID (e.g. 21CS001)" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter Password" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all shadow-inner"
                />
              </div>
              <button 
                onClick={() => navigate('/student-login')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
              >
                Login as Student
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => navigate('/advisor-login')}
                className="w-full py-3 glass hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all group"
              >
                <User className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> Advisor Login
              </button>
              <button 
                onClick={() => navigate('/mentor-login')}
                className="w-full py-3 glass hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all group"
              >
                <User className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" /> Mentor Login
              </button>
              <button 
                onClick={() => navigate('/hod-login')}
                className="w-full py-3 glass hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all group"
              >
                <User className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" /> HOD Login
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Need a test account? <a href="#" className="text-blue-400 font-medium hover:underline">Register now</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
