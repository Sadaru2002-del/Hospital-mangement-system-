import React from 'react';

export const Footer = ({ darkMode = false }) => {
  return (
    <footer
      className={`flex items-center justify-between px-8 py-5 border-t text-xs ${
        darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'
      }`}
    >
      <span>© 2024 CareConnect Health Systems. All rights reserved.</span>
      <div className="flex gap-6">
        <a href="#" className={darkMode ? 'hover:text-slate-300' : 'hover:text-slate-600'}>Privacy</a>
        <a href="#" className={darkMode ? 'hover:text-slate-300' : 'hover:text-slate-600'}>Terms</a>
        <a href="#" className={darkMode ? 'hover:text-slate-300' : 'hover:text-slate-600'}>Audit Log</a>
      </div>
    </footer>
  );
};