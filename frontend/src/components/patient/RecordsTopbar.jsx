import React, { useState } from 'react';
import { SearchIcon, MoonIcon, UserIcon, GearIcon } from './icons';

export const RecordsTopbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
      <h2 className="text-2xl font-extrabold text-slate-900">Records</h2>

      <div className="flex-1 max-w-xl mx-8 relative">
        <SearchIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-slate-50 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
        >
          <MoonIcon className="w-4 h-4" />
        </button>
        <button className="text-blue-800 hover:text-blue-900">
          <UserIcon className="w-6 h-6" />
        </button>
        <button className="text-blue-800 hover:text-blue-900">
          <GearIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};