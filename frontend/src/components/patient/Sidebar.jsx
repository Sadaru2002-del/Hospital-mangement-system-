import React from 'react';

const menuItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'appointments',
    name: 'Appointments',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    ),
  },
  {
    id: 'records',
    name: 'Records',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6M9 17h6M13 3v5h5" />
      </svg>
    ),
  },
  {
    id: 'prescriptions',
    name: 'Prescriptions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="8" width="18" height="8" rx="4" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M12 8v8" />
      </svg>
    ),
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M3 10h18" />
      </svg>
    ),
  },
];

const bottomItems = [
  {
    id: 'support',
    name: 'Support',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 9a2.5 2.5 0 115 .5c0 1.5-2.5 1.8-2.5 3.5M12 17h.01" />
      </svg>
    ),
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
    ),
    danger: true,
  },
];

export const Sidebar = ({
  activeTab,
  setActiveTab,
  userName = 'Imasha',
  userAvatar = 'https://i.pravatar.cc/40?img=12',
  darkMode = false,
}) => {
  return (
    <aside
      className={`w-64 flex flex-col justify-between min-h-screen border-r transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'
      }`}
    >
      <div>
        <div className="px-6 py-6">
          <h1 className={`text-xl font-extrabold ${darkMode ? 'text-white' : 'text-blue-800'}`}>
            Medimate Healthcare
          </h1>
        </div>

        <div
          className={`mx-4 mb-4 rounded-xl p-3 flex items-center gap-3 ${
            darkMode ? 'bg-slate-900' : 'bg-slate-50'
          }`}
        >
          <img src={userAvatar} alt="User avatar" className="w-9 h-9 rounded-full object-cover" />
          <span className={`font-semibold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            Welcome, {userName}
          </span>
        </div>

        <nav className="px-3 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                    : darkMode
                    ? 'text-slate-400 hover:bg-slate-900'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pb-6 flex flex-col gap-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition ${
              item.danger
                ? 'text-red-500 hover:bg-red-50'
                : darkMode
                ? 'text-slate-400 hover:bg-slate-900'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
        <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-3 transition">
          Call Doctor
        </button>
      </div>
    </aside>
  );
};