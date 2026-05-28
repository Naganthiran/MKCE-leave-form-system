/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlusCircle, 
  List, 
  LogOut, 
  Send, 
  Calendar, 
  FileText, 
  ClipboardCheck, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  UploadCloud,
  FileCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { getRequests, addRequest, LeaveRequest } from '../utils/storage';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('New Request');
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  
  // Form states
  const [type, setType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load student-specific requests
  const loadRequests = () => {
    const all = getRequests();
    // Match the current mock student '21CS001'
    const studentRequests = all.filter(r => r.studentId === '21CS001');
    setRequests(studentRequests);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEvidenceFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || type === 'Select Type') {
      showNotification('error', 'Please select a request type (Leave or OD).');
      return;
    }
    if (!fromDate || !toDate) {
      showNotification('error', 'Please specify both From and To dates.');
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      showNotification('error', 'From Date cannot be later than To Date.');
      return;
    }
    if (!reason.trim()) {
      showNotification('error', 'Please provide a reason for the request.');
      return;
    }

    addRequest({
      studentName: 'Mahendraprasad R',
      studentId: '21CS001',
      studentType: 'Day Scholar',
      type,
      fromDate,
      toDate,
      reason,
      evidenceName: evidenceFile ? evidenceFile.name : undefined
    });

    // Reset form fields
    setType('');
    setFromDate('');
    setToDate('');
    setReason('');
    setEvidenceFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    showNotification('success', 'Your request has been submitted and sent to the Class Advisor.');
    loadRequests();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Pending Mentor': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Pending CA': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Pending HOD': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  // Stats calculation
  const totalCount = requests.length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const pendingCount = requests.filter(r => r.status.startsWith('Pending')).length;
  const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
              notification.type === 'success' 
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/30' 
                : 'bg-rose-950/90 text-rose-300 border-rose-500/30'
            } backdrop-blur-xl`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
            )}
            <span className="font-medium text-sm">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
            <List className="w-5 h-5" /> My Requests ({requests.length})
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
           key={activeMenu}
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.25 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-gray-400 mb-8">Submit and track your leave and ON DUTY requests</p>

          {activeMenu === 'New Request' ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Form Card */}
              <div className="xl:col-span-2 glass p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <ClipboardCheck className="text-blue-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">New Request Form</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Request Type</label>
                    <select 
                      value={type} 
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-900">Select Type</option>
                      <option value="Leave" className="bg-slate-900">Leave</option>
                      <option value="On Duty" className="bg-slate-900">On Duty (OD)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">From Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input 
                          type="date" 
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">To Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input 
                          type="date" 
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Reason</label>
                    <textarea 
                      rows={4} 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter detailed reason for leave/OD request..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Evidence Upload</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                    <div 
                      onClick={triggerFileSelect}
                      className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center hover:border-blue-500/50 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      {evidenceFile ? (
                        <>
                          <FileCheck className="text-emerald-400 w-10 h-10 mb-2" />
                          <p className="text-sm text-emerald-300 font-medium">{evidenceFile.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{(evidenceFile.size / 1024 / 1024).toFixed(2)} MB • Click to change</p>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="text-gray-500 w-10 h-10 mb-2" />
                          <p className="text-sm text-gray-400">Click to choose a file</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 5MB (optional)</p>
                        </>
                      )}
                    </div>
                  </div>

                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95">
                    <Send className="w-5 h-5" /> Submit Request
                  </button>
                </form>
              </div>

              {/* Stats & Quick Preview */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="glass p-6 rounded-3xl grid grid-cols-2 gap-4">
                  <div className="col-span-2 mb-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Status Summary</h4>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="text-2xl font-bold text-white">{totalCount}</div>
                    <div className="text-xs text-gray-400">Total Applied</div>
                  </div>
                  <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/10">
                    <div className="text-2xl font-bold text-emerald-400">{approvedCount}</div>
                    <div className="text-xs text-emerald-400/80">Approved</div>
                  </div>
                  <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/10">
                    <div className="text-2xl font-bold text-amber-400">{pendingCount}</div>
                    <div className="text-xs text-amber-400/80">Pending</div>
                  </div>
                  <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/10">
                    <div className="text-2xl font-bold text-rose-400">{rejectedCount}</div>
                    <div className="text-xs text-rose-400/80">Rejected</div>
                  </div>
                </div>

                {/* Balance Cards */}
                <div className="glass p-6 rounded-3xl space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Leave Balance</h4>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-blue-400 w-5 h-5" />
                      <div>
                        <div className="text-white font-medium text-sm">Regular Leave</div>
                        <div className="text-xs text-gray-500">Per Semester</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">10 / 12</div>
                      <div className="text-xs text-gray-400">Available</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Award className="text-purple-400 w-5 h-5" />
                      <div>
                        <div className="text-white font-medium text-sm">On Duty (OD)</div>
                        <div className="text-xs text-gray-500">For Events</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">8 / 15</div>
                      <div className="text-xs text-gray-400">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Full History List Card */
            <div className="glass p-8 rounded-3xl flex flex-col overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <List className="text-purple-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">My Request History</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-widest bg-black/20">
                      <th className="px-6 py-4 font-medium">Applied Date</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Duration</th>
                      <th className="px-6 py-4 font-medium">Reason</th>
                      <th className="px-6 py-4 font-medium">Evidence</th>
                      <th className="px-6 py-4 font-medium text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {requests.map((r, i) => (
                      <tr key={r.id} className="group hover:bg-white/5 transition-all">
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          {new Date(r.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${r.type === 'Leave' ? 'text-blue-400 bg-blue-400/10' : 'text-purple-400 bg-purple-400/10'}`}>
                            {r.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white text-sm font-medium">
                          {r.fromDate === r.toDate ? (
                            r.fromDate
                          ) : (
                            `${r.fromDate} to ${r.toDate}`
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">{r.reason}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {r.evidenceName ? (
                            <span className="flex items-center gap-1.5 text-blue-400 hover:underline cursor-pointer">
                              <FileText className="w-3.5 h-3.5" />
                              {r.evidenceName}
                            </span>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {requests.length === 0 && (
                <div className="p-12 text-center text-gray-500 italic">
                  No requests submitted yet.
                </div>
              )}

              <div className="mt-8 flex items-center gap-2 text-gray-500 text-xs italic">
                <AlertCircle className="w-4 h-4" /> Real-time status updates are reflected as soon as faculty processes your application.
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

