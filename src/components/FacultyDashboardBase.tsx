/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  LogOut, 
  Clock, 
  History, 
  User, 
  Calendar, 
  FileText 
} from 'lucide-react';

interface FacultyDashboardProps {
  roleTitle: string;
  profileName: string;
}

export default function FacultyDashboard({ roleTitle, profileName }: FacultyDashboardProps) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Pending Approvals');

  const pendingRequests = [
    { student: 'Mahendraprasad R', id: '21CS001', type: 'Leave', dates: 'May 12 - May 14', reason: 'Personal work at hometown' },
    { student: 'Siva Kumar S', id: '21CS042', type: 'On Duty', dates: 'May 15', reason: 'Paper presentation at PSG Tech' },
    { student: 'Dinesh B', id: '21CS015', type: 'Leave', dates: 'May 18 - May 20', reason: 'Medical emergency in family' }
  ];

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
            <div className="w-28 h-28 rounded-full border-2 border-purple-500 p-1 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white text-center">{profileName}</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{roleTitle}</p>
        </div>

        <nav className="w-full space-y-4 flex-1">
          <button 
            onClick={() => setActiveMenu('Pending Approvals')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeMenu === 'Pending Approvals' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Clock className="w-5 h-5" /> Pending Approvals
          </button>
          <button 
            onClick={() => setActiveMenu('Action History')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeMenu === 'Action History' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <History className="w-5 h-5" /> Action History
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
          <h1 className="text-3xl font-bold text-white mb-2">{roleTitle} Dashboard</h1>
          <p className="text-gray-400 mb-10">Review and manage student leave requests</p>

          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" /> Recent Pending Requests
              </h3>
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {pendingRequests.length} NEW
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-widest bg-black/20">
                    <th className="px-6 py-4 font-medium">Student</th>
                    <th className="px-6 py-4 font-medium">Type & Dates</th>
                    <th className="px-6 py-4 font-medium">Reason</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingRequests.map((r, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-all">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <User className="text-blue-400 w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{r.student}</div>
                            <div className="text-xs text-gray-500">{r.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col gap-1">
                          <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${r.type === 'Leave' ? 'text-blue-400 bg-blue-400/10' : 'text-purple-400 bg-purple-400/10'}`}>
                            {r.type}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                             <Calendar className="w-3.5 h-3.5 text-gray-500" /> {r.dates}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-normal text-sm text-gray-400 max-w-xs">{r.reason}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20 active:scale-95">
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-red-500/20 active:scale-95">
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pendingRequests.length === 0 && (
              <div className="p-12 text-center text-gray-500 italic">
                No pending requests at the moment.
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
