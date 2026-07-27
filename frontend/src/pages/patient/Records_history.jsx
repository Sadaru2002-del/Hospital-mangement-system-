import React, { useState } from 'react';
import { Sidebar } from '../../components/patient/Sidebar';
import { RecordsTopbar } from '../../components/patient/RecordsTopbar';
import { RecordsTabs } from '../../components/patient/RecordsTabs';
import { HistoryTable } from '../../components/patient/HistoryTable';
import { LabReportsPanel } from '../../components/patient/LabReportsPanel';
import { PatientProfileCard } from '../../components/patient/PatientProfileCard';
import Footer from '../../components/patient/Footer';

export const Records = ({
  activeTab: activeNav,
  setActiveTab: setActiveNav,
  darkMode = false,
  setDarkMode = () => {},
}) => {
  const [activeTab, setActiveTab] = useState('lab'); // 'lab' | 'history'

  const history = [
    { id: 1, date: 'June 12, 2024', time: '10:00 AM', doctor: 'Dr. Nimal', department: 'Cardiology', status: 'Confirmed' },
    { id: 2, date: 'June 18, 2024', time: '02:30 PM', doctor: 'Dr. Nimal', department: 'Orthopedics', status: 'Pending' },
    { id: 3, date: 'July 05, 2024', time: '09:15 AM', doctor: 'Dr. Sunimal', department: 'Dermatology', status: 'Confirmed' },
  ];

  const patient = {
    initials: 'IS',
    name: 'Imasha',
    patientId: '#MR-8921',
    age: '34 Years',
    bloodGroup: 'O+',
    allergy: 'Penicillin',
    lastVisit: 'Oct 12, 2026',
    emergencyContactName: 'Thirasha Lamkamli',
    emergencyContactPhone: '+94768543890',
  };

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'
      }`}
    >
      <Sidebar activeTab={activeNav} setActiveTab={setActiveNav} darkMode={darkMode} />

      <div className="flex-1 flex flex-col">
        <RecordsTopbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onProfileClick={() => setActiveNav('settings')}
          onSettingsClick={() => setActiveNav('settings')}
        />

        <main className="flex-1 px-8 py-8">
          <h1 className={`text-2xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Medical Records
          </h1>

          {activeTab === 'lab' ? (
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
              <PatientProfileCard patient={patient} darkMode={darkMode} />
              <div>
                <RecordsTabs activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
                <LabReportsPanel darkMode={darkMode} />
              </div>
            </div>
          ) : (
            <>
              <RecordsTabs activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
              <HistoryTable rows={history} darkMode={darkMode} />
            </>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Records;
