import React, { useState } from 'react';
import { TagIcon } from './icons';

export const BillingSummaryCard = ({ darkMode }) => {
  const [promo, setPromo] = useState('');

  const items = [
    { label: 'Consultation Fee', note: 'General Health Assessment', amount: 'Rs.100.00' },
    { label: 'Lab Charges', note: 'Complete Blood Count (CBC)', amount: 'Rs.50.00' },
  ];

  const cardBg = darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200';
  const textPrimary = darkMode ? 'text-white' : 'text-slate-900';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-400';

  return (
    <div className="flex flex-col gap-6">
      <div className={`border rounded-2xl p-6 ${cardBg}`}>
        <h3 className={`flex items-center gap-2 font-extrabold text-lg mb-5 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Billing Summary
        </h3>

        <div className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
          {items.map((item) => (
            <div key={item.label} className="flex items-start justify-between py-3">
              <div>
                <div className={`text-sm font-bold ${textPrimary}`}>{item.label}</div>
                <div className={`text-xs mt-0.5 ${textMuted}`}>{item.note}</div>
              </div>
              <span className={`text-sm font-bold ${textPrimary}`}>{item.amount}</span>
            </div>
          ))}
        </div>

        <div className={`mt-4 rounded-xl px-4 py-4 space-y-2 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <div className={`flex justify-between text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <span>Subtotal</span>
            <span className="font-semibold">Rs.150.00</span>
          </div>
          <div className={`flex justify-between text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <span>Tax (0%)</span>
            <span className="font-semibold">Rs.0.00</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-500">
            <span>Discount</span>
            <span className="font-semibold">-Rs.0.00</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <span className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Total</span>
          <span className={`text-2xl font-extrabold ${textPrimary}`}>Rs.150.00</span>
        </div>

        <div className={`mt-5 border border-dashed rounded-xl flex items-center px-4 py-3 ${darkMode ? 'border-slate-700' : 'border-slate-300'}`}>
          <TagIcon className={`w-4 h-4 mr-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Promo code"
            className={`flex-1 bg-transparent text-sm focus:outline-none ${
              darkMode ? 'text-slate-200 placeholder-slate-500' : 'text-slate-600 placeholder-slate-400'
            }`}
          />
          <button className="text-blue-600 text-sm font-bold">APPLY</button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-40">
        <img
          src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&q=80"
          alt="Secure transaction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-blue-900/10" />
        <span className="absolute bottom-4 left-4 text-white font-bold text-sm">
          Secure Transaction Guaranteed
        </span>
      </div>
    </div>
  );
};