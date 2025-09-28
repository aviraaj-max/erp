import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { Navigation } from './components/layout/Navigation';
import { Sidebar } from './components/layout/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { SuperAdminDashboard } from './components/dashboard/SuperAdminDashboard';
import { SubscriptionManager } from './components/subscription/SubscriptionManager';

function AppContent() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const userRole = user.profile?.role || 'student';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            {/* Student Routes */}
            <Route path="/student" element={userRole === 'student' ? <StudentDashboard /> : <Navigate to="/unauthorized" />} />
            
            {/* Parent Routes */}
            <Route path="/parent" element={userRole === 'parent' ? <div>Parent Dashboard</div> : <Navigate to="/unauthorized" />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={userRole === 'teacher' ? <div>Teacher Dashboard</div> : <Navigate to="/unauthorized" />} />
            
            {/* Principal Routes */}
            <Route path="/principal" element={userRole === 'principal' ? <div>Principal Dashboard</div> : <Navigate to="/unauthorized" />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={userRole === 'admin' ? <div>Admin Dashboard</div> : <Navigate to="/unauthorized" />} />
            <Route path="/admin/subscriptions" element={userRole === 'admin' ? <SubscriptionManager /> : <Navigate to="/unauthorized" />} />
            
            {/* SuperAdmin Routes */}
            <Route path="/superadmin" element={userRole === 'superadmin' ? <SuperAdminDashboard /> : <Navigate to="/unauthorized" />} />
            
            {/* Default redirect based on role */}
            <Route path="/" element={<Navigate to={`/${userRole}`} />} />
            
            {/* Unauthorized */}
            <Route path="/unauthorized" element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Unauthorized</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">You don't have permission to access this page.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;