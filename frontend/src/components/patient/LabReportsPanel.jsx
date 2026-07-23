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
  normal: { pill: 'bg-emerald-100 text-emerald-700' },
  abnormal: { pill: 'bg-amber-100 text-amber-700' },
};

export const LabReportsPanel = ({ reports }) => {
  const groups = reports && reports.length ? reports : defaultGroups;
  const [openId, setOpenId] = useState(groups[0]?.id ?? null);

  if (!groups.length) {
    return (
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-12 text-center text-slate-400 text-sm">No lab reports available yet.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => {
        const isOpen = openId === group.id;
        return (
          <div key={group.id} className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : group.id)}
              className="w-full flex items-center justify-between px-6 py-4"
            >
              <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${toneStyles[group.tone].pill}`}>
                {group.label}
              </span>
              <ChevronIcon className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="px-6 pb-5 divide-y divide-slate-100 border-t border-slate-100">
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.note}</div>
                    </div>
                    <span className="text-xs text-slate-400">{item.date}</span>
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