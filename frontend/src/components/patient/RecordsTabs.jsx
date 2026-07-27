import React from 'react';

export const RecordsTabs = ({ activeTab, setActiveTab, darkMode = false }) => {
  const tabs = [
    { id: 'lab', label: 'Lab Reports' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className={`flex items-center gap-3 border-b mb-6 pb-3 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
              isActive
                ? 'bg-blue-700 text-white'
                : darkMode
                ? 'text-blue-300/80 hover:bg-slate-900'
                : 'text-blue-600/80 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
