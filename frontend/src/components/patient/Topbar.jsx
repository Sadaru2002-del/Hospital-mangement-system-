import React from 'react';
import { SearchIcon, MoonIcon, UserIcon, GearIcon } from './icons';

/**
 * Topbar
 *
 * The single, shared header used across every patient page (Dashboard,
 * Appointments, Records, Prescriptions, Payments, Settings, ...).
 * Having one implementation guarantees the dark-mode, profile, and
 * settings icons always look and behave the same no matter which page
 * you're on.
 */
export const Topbar = ({
  title = 'Dashboard',
  darkMode = false,
  setDarkMode = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
}) => {
  return (
    <header
      className={`flex items-center justify-between px-8 py-6 border-b transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'
      }`}
    >
      <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h2>

      <div className="flex-1 max-w-xl mx-8 relative">
        <SearchIcon
          className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${
            darkMode ? 'text-slate-500' : 'text-slate-400'
          }`}
        />
        <input
          type="text"
          placeholder="Search"
          className={`w-full rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
            darkMode
              ? 'bg-slate-900 text-slate-200 placeholder-slate-500 focus:ring-blue-900'
              : 'bg-slate-50 text-slate-600 placeholder-slate-400 focus:ring-blue-200'
          }`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle dark mode"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
            darkMode
              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <MoonIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onProfileClick}
          aria-label="Profile"
          className={darkMode ? 'text-blue-300 hover:text-white' : 'text-blue-800 hover:text-blue-900'}
        >
          <UserIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onSettingsClick}
          aria-label="Settings"
          className={darkMode ? 'text-blue-300 hover:text-white' : 'text-blue-800 hover:text-blue-900'}
        >
          <GearIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
