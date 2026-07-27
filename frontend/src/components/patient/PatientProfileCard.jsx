import React from 'react';

export const PatientProfileCard = ({ patient, darkMode = false }) => {
  const {
    initials = 'IS',
    name = 'Imasha',
    patientId = '#MR-8921',
    age = '34 Years',
    bloodGroup = 'O+',
    allergy = 'Penicillin',
    lastVisit = 'Oct 12, 2026',
    chartImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    emergencyContactName = 'Thirasha Lamkamli',
    emergencyContactPhone = '+94768543890',
  } = patient || {};

  return (
    <div
      className={`border rounded-2xl p-5 w-full max-w-sm transition-colors ${
        darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center text-sm ${
            darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {initials}
        </div>
        <div>
          <div className={`font-extrabold text-lg leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {name}
          </div>
          <span
            className={`inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
              darkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            Patient ID: {patientId}
          </span>
        </div>
      </div>

      <div className={`mt-5 divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
        <div className="flex items-center justify-between py-3">
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Age</span>
          <span className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{age}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Blood Group</span>
          <span className="text-sm font-bold text-red-500">{bloodGroup}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Allergies</span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              darkMode ? 'bg-red-950 text-red-400' : 'bg-red-100 text-red-600'
            }`}
          >
            {allergy}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Last Visit</span>
          <span className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{lastVisit}</span>
        </div>
      </div>

      <img
        src={chartImage}
        alt="Patient recovery progress chart"
        className={`w-full h-28 object-cover rounded-xl mt-2 border ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}
      />

      <div className={`mt-5 rounded-xl p-4 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className={`font-extrabold text-base leading-tight mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Emergency Contact
        </div>
        <div className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          {emergencyContactName}
        </div>
        <div className={`text-sm mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {emergencyContactPhone}
        </div>

        <button
          className={`mt-4 w-full font-semibold text-sm rounded-xl py-2.5 transition border ${
            darkMode
              ? 'border-blue-800 text-blue-300 hover:bg-slate-800'
              : 'border-blue-700 text-blue-700 hover:bg-blue-50'
          }`}
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
};