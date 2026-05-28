/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  LogOut, 
  Clock, 
  History, 
  User, 
  Calendar, 
  FileText,
  Eye,
  MessageSquare,
  Check,
  AlertCircle
} from 'lucide-react';
import { getRequests, updateRequestStatus, LeaveRequest } from '../utils/storage';

interface FacultyDashboardProps {
  roleTitle: string;
  profileName: string;
}

export default function FacultyDashboard({ roleTitle, profileName }: FacultyDashboardProps) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Pending Approvals');
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Map dashboard role to key and filters
  let roleKey: 'ca' | 'mentor' | 'hod' = 'ca';
  let pendingStatus: LeaveRequest['status'] = 'Pending CA';
  let nextApprovedStatus: LeaveRequest['status'] = 'Pending Mentor';

  if (roleTitle === 'Mentor') {
    roleKey = 'mentor';
    pendingStatus = 'Pending Mentor';
    nextApprovedStatus = 'Pending HOD';
  } else if (roleTitle === 'Head of Department') {
    roleKey = 'hod';
    pendingStatus = 'Pending HOD';
    nextApprovedStatus = 'Approved';
  }

  const loadRequests = () => {
    setRequests(getRequests());
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleAction = (request: LeaveRequest, action: 'approve' | 'reject') => {
    const finalStatus: LeaveRequest['status'] = action === 'approve' ? nextApprovedStatus : 'Rejected';
    
    updateRequestStatus(
      request.id,
      finalStatus,
      roleKey,
      action === 'approve' ? 'approved' : 'rejected',
      profileName,
      comment.trim() ? comment : undefined
    );

    showNotification(
      'success',
      `Request for ${request.studentName} has been ${action === 'approve' ? 'approved' : 'rejected'} successfully!`
    );

    setComment('');
    setSelectedRequest(null);
    loadRequests();
  };

  // Filter requests
  const pendingRequests = requests.filter(r => r.status === pendingStatus);
  const historyRequests = requests.filter(r => r.processedBy && r.processedBy[roleKey] !== undefined);

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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border bg-emerald-950/90 text-emerald-300 border-emerald-500/30 backdrop-blur-xl"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
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
            <Clock className="w-5 h-5" /> Pending Approvals ({pendingRequests.length})
          </button>
          <button 
            onClick={() => setActiveMenu('Action History')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeMenu === 'Action History' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <History className="w-5 h-5" /> Action History ({historyRequests.length})
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
          <h1 className="text-3xl font-bold text-white mb-2">{roleTitle} Dashboard</h1>
          <p className="text-gray-400 mb-8">Review and manage student leave requests</p>

          {activeMenu === 'Pending Approvals' ? (
            <div className="glass rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" /> Recent Pending Requests
                </h3>
                <span className="bg-purple-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
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
                    {pendingRequests.map((r) => (
                      <tr key={r.id} className="group hover:bg-white/5 transition-all">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                              <User className="text-blue-400 w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold">{r.studentName}</div>
                              <div className="text-xs text-gray-500">{r.studentId} • {r.studentType}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col gap-1">
                            <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${r.type === 'Leave' ? 'text-blue-400 bg-blue-400/10' : 'text-purple-400 bg-purple-400/10'}`}>
                              {r.type}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                               <Calendar className="w-3.5 h-3.5 text-gray-500" /> 
                               {r.fromDate === r.toDate ? r.fromDate : `${r.fromDate} to ${r.toDate}`}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 font-normal text-sm text-gray-400 max-w-xs truncate">{r.reason}</td>
                        <td className="px-6 py-6">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => setSelectedRequest(r)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg border border-white/10 transition-all active:scale-95"
                            >
                              <Eye className="w-3.5 h-3.5" /> Details
                            </button>
                            <button 
                              onClick={() => handleAction(r, 'approve')}
                              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg active:scale-95"
                            >
                              <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button 
                              onClick={() => handleAction(r, 'reject')}
                              className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pendingRequests.length === 0 && (
                <div className="p-12 text-center text-gray-500 italic bg-white/[0.02]">
                  No pending requests in your queue.
                </div>
              )}
            </div>
          ) : (
            /* History List Card */
            <div className="glass rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-purple-400" /> Action History Log
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-widest bg-black/20">
                      <th className="px-6 py-4 font-medium">Student</th>
                      <th className="px-6 py-4 font-medium">Type & Dates</th>
                      <th className="px-6 py-4 font-medium">Your Action</th>
                      <th className="px-6 py-4 font-medium">Action Date</th>
                      <th className="px-6 py-4 font-medium">Current Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {historyRequests.map((r) => (
                      <tr key={r.id} className="group hover:bg-white/5 transition-all">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <User className="text-blue-400 w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-semibold">{r.studentName}</div>
                              <div className="text-[11px] text-gray-500">{r.studentId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-300 font-medium">
                              {r.type}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {r.fromDate === r.toDate ? r.fromDate : `${r.fromDate} to ${r.toDate}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                            r.processedBy?.[roleKey]?.action === 'approved' 
                              ? 'text-emerald-400 bg-emerald-400/10' 
                              : 'text-rose-400 bg-rose-400/10'
                          }`}>
                            {r.processedBy?.[roleKey]?.action}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-xs text-gray-400">
                          {r.processedBy?.[roleKey]?.date 
                            ? new Date(r.processedBy[roleKey].date).toLocaleString(undefined, { 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })
                            : '-'
                          }
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {historyRequests.length === 0 && (
                <div className="p-12 text-center text-gray-500 italic bg-white/[0.02]">
                  You have not processed any requests yet.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-xl font-bold text-white mb-2">Request Details</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Leave approval flow verification</p>

              <div className="space-y-5 mb-8">
                {/* Student Profile Block */}
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <User className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">{selectedRequest.studentName}</h4>
                    <p className="text-xs text-gray-400">{selectedRequest.studentId} • {selectedRequest.studentType}</p>
                  </div>
                </div>

                {/* Specifics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3.5 rounded-xl">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Request Type</label>
                    <span className="text-white text-sm font-semibold">{selectedRequest.type}</span>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Duration</label>
                    <span className="text-white text-sm font-semibold">
                      {selectedRequest.fromDate === selectedRequest.toDate 
                        ? selectedRequest.fromDate 
                        : `${selectedRequest.fromDate} to ${selectedRequest.toDate}`
                      }
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Detailed Reason</label>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedRequest.reason}</p>
                </div>

                {selectedRequest.evidenceName && (
                  <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Evidence Document</label>
                      <span className="text-blue-400 text-sm font-medium">{selectedRequest.evidenceName}</span>
                    </div>
                    <button className="px-3.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold rounded-lg transition-all border border-blue-500/20">
                      View File
                    </button>
                  </div>
                )}

                {/* Audit Trail */}
                <div className="border-t border-white/10 pt-4">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Approval Status Timeline</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Class Advisor (CA) Approval</span>
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        selectedRequest.processedBy?.ca?.action === 'approved' 
                          ? 'text-emerald-400 bg-emerald-400/5' 
                          : selectedRequest.processedBy?.ca?.action === 'rejected'
                          ? 'text-rose-400 bg-rose-400/5'
                          : 'text-gray-500 bg-white/5'
                      }`}>
                        {selectedRequest.processedBy?.ca?.action || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Mentor Approval</span>
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        selectedRequest.processedBy?.mentor?.action === 'approved' 
                          ? 'text-emerald-400 bg-emerald-400/5' 
                          : selectedRequest.processedBy?.mentor?.action === 'rejected'
                          ? 'text-rose-400 bg-rose-400/5'
                          : 'text-gray-500 bg-white/5'
                      }`}>
                        {selectedRequest.processedBy?.mentor?.action || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">HOD Approval</span>
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        selectedRequest.processedBy?.hod?.action === 'approved' 
                          ? 'text-emerald-400 bg-emerald-400/5' 
                          : selectedRequest.processedBy?.hod?.action === 'rejected'
                          ? 'text-rose-400 bg-rose-400/5'
                          : 'text-gray-500 bg-white/5'
                      }`}>
                        {selectedRequest.processedBy?.hod?.action || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment Box */}
                <div className="border-t border-white/10 pt-4">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Approver Comments (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide comments or reason for your decision..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white text-sm transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setComment('');
                    setSelectedRequest(null);
                  }}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAction(selectedRequest, 'reject')}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => handleAction(selectedRequest, 'approve')}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all"
                >
                  Approve Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
