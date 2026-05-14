/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Lock, ArrowLeft } from 'lucide-react';

export default function FacultyLogin({ role: propRole }: { role?: string }) {
  const { role: paramRole } = useParams<{ role: string }>();
  const navigate = useNavigate();
  
  const role = propRole || paramRole;

  const roleTitle = role === 'ca' ? 'Advisor' : role === 'mentor' ? 'Mentor' : 'HOD';
  const roleDashboard = `/${role}-dashboard`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-8 rounded-3xl"
      >
        <button 
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
            <User className="text-purple-400 w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">{roleTitle} Login</h1>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Faculty ID" 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all shadow-inner"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all shadow-inner"
            />
          </div>
          <button 
            onClick={() => navigate(roleDashboard)}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 text-lg"
          >
            Login as {roleTitle}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
