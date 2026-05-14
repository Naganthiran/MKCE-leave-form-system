/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  PlusCircle, 
  List, 
  LogOut, 
  Send, 
  Calendar, 
  FileText, 
  ClipboardCheck, 
  AlertCircle 
} from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('New Request');

  const requests = [
    { date: '2026-05-10', type: 'Leave', status: 'Approved', reason: 'Personal work' },
    { date: '2026-05-12', type: 'On Duty', status: 'Pending Mentor', reason: 'Symposium' },
    { date: '2026-05-15', type: 'Leave', status: 'Pending CA', reason: 'Family Function' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Pending Mentor': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Pending CA': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-72 glass-dark h-full p-8 flex flex-col items-center sidebar-fixed z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-2 border-blue-500 p-1 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute bottom-4 right-2 w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full shadow-lg"></div>
          </div>
          <h2 className="text-xl font-bold text-white text-center">MAHENDRAPRASAD R</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Student • Day Scholar</p>
        </div>

        <nav className="w-full space-y-4 flex-1">
          <button 
            onClick={() => setActiveMenu('New Request')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeMenu === 'New Request' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <PlusCircle className="w-5 h-5" /> New Request
          </button>
          <button 
            onClick={() => setActiveMenu('My Requests')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeMenu === 'My Requests' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <List className="w-5 h-5" /> My Requests
          </button>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-auto"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 sidebar-scroll">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-gray-400 mb-10">Submit and track your leave and ON DUTY requests</p>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Form Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <ClipboardCheck className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">New Request Form</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Request Type</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all appearance-none cursor-pointer">
                    <option className="bg-slate-900">Select Type</option>
                    <option className="bg-slate-900">Leave</option>
                    <option className="bg-slate-900">On Duty (OD)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">From Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input type="date" className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">To Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input type="date" className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Reason</label>
                  <textarea 
                    rows={4} 
                    placeholder="Enter detailed reason..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Evidence Upload</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center hover:border-blue-500/50 transition-all cursor-pointer bg-white/5">
                    <FileText className="text-gray-500 w-10 h-10 mb-3" />
                    <p className="text-sm text-gray-400">Click or drag proof documents</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG up to 5MB</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95">
                  <Send className="w-5 h-5" /> Submit Request
                </button>
              </div>
            </motion.div>

            {/* List Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-3xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <List className="text-purple-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">My Recent Requests</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-sm border-b border-white/10 uppercase tracking-wider">
                      <th className="pb-4 font-normal">Date</th>
                      <th className="pb-4 font-normal">Type</th>
                      <th className="pb-4 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {requests.map((r, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-all">
                        <td className="py-4 text-white font-medium">{r.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${r.type === 'Leave' ? 'text-blue-400 bg-blue-400/10' : 'text-purple-400 bg-purple-400/10'}`}>
                            {r.type}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto pt-8 flex items-center gap-2 text-gray-500 text-sm italic">
                <AlertCircle className="w-4 h-4" /> Keep track of statuses regularly.
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
