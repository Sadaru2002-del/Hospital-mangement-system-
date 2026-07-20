import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9.5M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            CareFlow
          </span>
          <span className="text-xs block text-slate-400 font-medium">Hospital Management</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-right">
              <span className="block text-sm font-semibold text-slate-200">{user.name}</span>
              <span className="block text-xs text-indigo-400 capitalize">{user.role}</span>
            </div>
            <button
              onClick={logoutUser}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 px-4 rounded-xl border border-slate-700 transition duration-150"
            >
              Sign Out
            </button>
          </>
        ) : (
          <span className="text-sm text-slate-400">Please sign in to proceed</span>
        )}
      </div>
    </nav>
  );
};
