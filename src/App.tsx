/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StarBackground from './components/StarBackground';
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultyLogin';
import StudentDashboard from './pages/StudentDashboard';
import CADashboard from './pages/CADashboard';
import MentorDashboard from './pages/MentorDashboard';
import HODDashboard from './pages/HODDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <StarBackground />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/advisor-login" element={<FacultyLogin role="ca" />} />
          <Route path="/mentor-login" element={<FacultyLogin role="mentor" />} />
          <Route path="/hod-login" element={<FacultyLogin role="hod" />} />
          <Route path="/faculty-login/:role" element={<FacultyLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/ca-dashboard" element={<CADashboard />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/hod-dashboard" element={<HODDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
