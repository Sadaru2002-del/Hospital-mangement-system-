import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Appointments } from './pages/Appointments';
import { Patients } from './pages/Patients';

const MainAppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-slate-100 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-400">Loading CareFlow workspace...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authMode === 'register') {
      return <Register onNavigateLogin={() => setAuthMode('login')} />;
    }
    return <Login onNavigateRegister={() => setAuthMode('register')} />;
  }

  // Render active page based on sidebar tab selection
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'patients':
        return <Patients />;
      case 'staff':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">Staff Directory</h1>
              <p className="text-sm text-slate-400 mt-1">Manage physicians, nursing shifts, and administration teams</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <p className="text-sm text-slate-400">Staff records integration coming soon.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActivePage()}
    </DashboardLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
