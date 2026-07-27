import React, { useState } from 'react';
import { ChevronIcon } from './icons';

const defaultGroups = [
  {
    id: 'normal',
    label: 'Normal Results',
    tone: 'normal',
    items: [
      { name: 'Complete Blood Count (CBC)', date: 'Oct 12, 2026', note: 'All values within range' },
      { name: 'Lipid Panel', date: 'Sep 28, 2026', note: 'All values within range' },
    ],
  },
  {
    id: 'abnormal',
    label: 'Abnormal Results',
    tone: 'abnormal',
    items: [
      { name: 'Fasting Glucose', date: 'Oct 12, 2026', note: 'Slightly above normal range' },
    ],
  },
];

const toneStyles = {
  light: {
    normal: { pill: 'bg-emerald-100 text-emerald-700' },
    abnormal: { pill: 'bg-amber-100 text-amber-700' },
  },
  dark: {
    normal: { pill: 'bg-emerald-950 text-emerald-400' },
    abnormal: { pill: 'bg-amber-950 text-amber-400' },
  },
};

export const LabReportsPanel = ({ reports, darkMode = false }) => {
  const groups = reports && reports.length ? reports : defaultGroups;
  const [openId, setOpenId] = useState(groups[0]?.id ?? null);
  const tones = darkMode ? toneStyles.dark : toneStyles.light;

  if (!groups.length) {
    return (
      <div className={`border rounded-2xl overflow-hidden ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`p-12 text-center text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          No lab reports available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => {
        const isOpen = openId === group.id;
        return (
          <div
            key={group.id}
            className={`border rounded-2xl overflow-hidden ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : group.id)}
              className="w-full flex items-center justify-between px-6 py-4"
            >
              <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${tones[group.tone].pill}`}>
                {group.label}
              </span>
              <ChevronIcon
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${
                  darkMode ? 'text-slate-500' : 'text-slate-500'
                }`}
              />
            </button>

            {isOpen && (
              <div
                className={`px-6 pb-5 border-t ${
                  darkMode ? 'divide-y divide-slate-800 border-slate-800' : 'divide-y divide-slate-100 border-slate-100'
                }`}
              >
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-3">
                    <div>
                      <div className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {item.name}
                      </div>
                      <div className={`text-xs mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {item.note}
                      </div>
                    </div>
                    <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
