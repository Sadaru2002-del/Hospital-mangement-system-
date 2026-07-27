import React, { useState } from 'react';
import { DotsIcon, ShareIcon, DownloadIcon } from './icons';

const statusStyles = {
  light: {
    Confirmed: 'bg-emerald-100 text-emerald-600',
    Pending: 'bg-amber-100 text-amber-600',
  },
  dark: {
    Confirmed: 'bg-emerald-950 text-emerald-400',
    Pending: 'bg-amber-950 text-amber-400',
  },
};

export const HistoryTable = ({ rows, darkMode = false }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const statusStyle = darkMode ? statusStyles.dark : statusStyles.light;

  return (
    <>
      <div className={`border rounded-2xl overflow-hidden ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <table className="w-full text-left">
          <thead>
            <tr
              className={`text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'bg-slate-900 text-slate-500' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Doctor Name</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className={darkMode ? 'divide-y divide-slate-800' : 'divide-y divide-slate-100'}>
            {rows.map((row) => (
              <tr key={row.id} className={darkMode ? 'hover:bg-slate-900/60 transition' : 'hover:bg-slate-50/60 transition'}>
                <td className="px-6 py-5">
                  <div className={`font-bold text-sm ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{row.date}</div>
                  <div className={`text-xs mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{row.time}</div>
                </td>
                <td className={`px-6 py-5 font-bold text-sm ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {row.doctor}
                </td>
                <td className={`px-6 py-5 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {row.department}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusStyle[row.status]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {row.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-5 text-right relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                    className={darkMode ? 'text-slate-500 hover:text-slate-300 px-2' : 'text-slate-400 hover:text-slate-600 px-2'}
                  >
                    <DotsIcon className="w-5 h-5" />
                  </button>
                  {openMenuId === row.id && (
                    <div
                      className={`absolute right-6 top-12 z-10 border rounded-xl shadow-lg py-2 w-40 text-left ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'}`}>
                        View Details
                      </button>
                      <button className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'}`}>
                        Reschedule
                      </button>
                      <button className={`w-full text-left px-4 py-2 text-sm text-red-500 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition ${
            darkMode
              ? 'border-slate-800 text-slate-300 hover:bg-slate-900'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShareIcon className="w-4 h-4" />
          Share
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition">
          <DownloadIcon className="w-4 h-4" />
          Download PDF
        </button>
      </div>
    </>
  );
};
