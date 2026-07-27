import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import PatientLayout from './layouts/PatientLayout';
import Dashboard from './pages/patient/Dashboard';
import { Appointments } from './pages/patient/Appointments';
import { Patients } from './pages/Patients';
import MedicalRecords from './pages/patient/Records_history';
import Payments from './pages/patient/Payments';
import DigitalPrescription from './pages/DigitalPrescription';

const MainAppContent = () => {
  const { user, loading, logoutUser } = useAuth();
  const [activeTab, setActiveTabState] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'dashboard';
  });
  const [authMode, setAuthMode] = useState('login');
  // Dark mode is lifted up here so the toggle works the same way, and stays
  // in sync, no matter which patient page you're currently viewing.
  const [darkMode, setDarkMode] = useState(false);

  // Wraps tab navigation so the Sidebar's built-in "logout" action
  // actually signs the user out instead of rendering a blank page.
  const setActiveTab = (tab) => {
    if (tab === 'logout') {
      logoutUser();
      setActiveTabState('dashboard');
      return;
    }
    setActiveTabState(tab);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-slate-100 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-400">Loading Medimate workspace...</span>
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

  // Records, Prescriptions, and Payments render their own sidebar/topbar/footer,
  // so they're shown standalone (not nested inside PatientLayout). They all
  // share the same darkMode state so the toggle behaves identically everywhere.
  if (activeTab === 'records') {
    return (
      <MedicalRecords
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }
  if (activeTab === 'prescriptions') {
    return (
      <DigitalPrescription
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }
  if (activeTab === 'payments') {
    return (
      <Payments
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  // Render active page based on sidebar tab selection
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard darkMode={darkMode} />;
      case 'appointments':
        return <Appointments darkMode={darkMode} />;
      case 'patients':
        return <Patients darkMode={darkMode} />;
      case 'staff':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Staff Directory</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage physicians, nursing shifts, and administration teams</p>
            </div>
            <div className={`border rounded-2xl p-6 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Staff records integration coming soon.</p>
            </div>
          </div>
        );
      case 'settings':
        return <Settings darkMode={darkMode} />;
      case 'support':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Support</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Need help? Reach our care team any time.</p>
            </div>
            <div className={`border rounded-2xl p-6 shadow-sm space-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>📞 Call Doctor: +94 700 000 000</p>
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>✉️ Email: support@medimate.health</p>
            </div>
          </div>
        );
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  return (
    <PatientLayout activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode}>
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
