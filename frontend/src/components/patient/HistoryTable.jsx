import React, { useState } from 'react';
import { DotsIcon, ShareIcon, DownloadIcon } from './icons';

const statusStyles = {
  Confirmed: 'bg-emerald-100 text-emerald-600',
  Pending: 'bg-amber-100 text-amber-600',
};

export const HistoryTable = ({ rows }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <>
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Doctor Name</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/60 transition">
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-900 text-sm">{row.date}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{row.time}</div>
                </td>
                <td className="px-6 py-5 font-bold text-slate-900 text-sm">{row.doctor}</td>
                <td className="px-6 py-5 text-slate-600 text-sm">{row.department}</td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusStyles[row.status]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {row.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-5 text-right relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                    className="text-slate-400 hover:text-slate-600 px-2"
                  >
                    <DotsIcon className="w-5 h-5" />
                  </button>
                  {openMenuId === row.id && (
                    <div className="absolute right-6 top-12 z-10 bg-white border border-slate-200 rounded-xl shadow-lg py-2 w-40 text-left">
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        View Details
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        Reschedule
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-50">
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
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition">
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