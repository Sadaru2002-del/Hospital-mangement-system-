import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import PatientLayout from './layouts/PatientLayout';
import { Dashboard } from './pages/Dashboard';
import { Appointments } from './pages/Appointments';
import { Patients } from './pages/Patients';
import { Records } from './pages/patient/Records';
import { RecordsHistory } from './pages/patient/Records_history';
import { Payments } from './pages/patient/Payments';

const MainAppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'dashboard';
  });
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

  if (!user && activeTab !== 'settings') {
    if (authMode === 'register') {
      return <Register onNavigateLogin={() => setAuthMode('login')} />;
    }
    return <Login onNavigateRegister={() => setAuthMode('register')} />;
  }

  // Records, Records history, and Payments render their own sidebar/topbar/footer,
  // so they're shown standalone (not nested inside DashboardLayout).
  if (activeTab === 'records') {
    return <Records activeTab={activeTab} setActiveTab={setActiveTab} />;
  }
  if (activeTab === 'records-history') {
    return <RecordsHistory activeTab={activeTab} setActiveTab={setActiveTab} />;
  }
  if (activeTab === 'payments') {
    return <Payments activeTab={activeTab} setActiveTab={setActiveTab} />;
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
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <PatientLayout>
      {renderActivePage()}
    </PatientLayout>
  );
};

/**
 * App Component
 *
 * The entry point of the React application.
 * Wraps the app in AuthProvider and renders the tab-driven main content.
 */
function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;