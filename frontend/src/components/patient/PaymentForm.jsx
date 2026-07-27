import React, { useState } from 'react';
import {
  CardIcon,
  InsuranceIcon,
  ShieldCheckIcon,
  LockIcon,
  EyeIcon,
  MicIcon,
  CheckCircleIcon,
  XIcon,
  InfoIcon,
  ArrowRightIcon,
} from './icons';

export const PaymentForm = ({ darkMode, amount = 150 }) => {
  const [method, setMethod] = useState('card'); // 'card' | 'insurance'
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);
  const [paid, setPaid] = useState(false);

  const cardBg = darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200';
  const inputBg = darkMode
    ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500'
    : 'bg-white border-slate-200 text-slate-700 placeholder-slate-400';
  const labelColor = darkMode ? 'text-slate-300' : 'text-slate-700';
  const iconColor = darkMode ? 'text-slate-500' : 'text-slate-400';

  const handlePay = (e) => {
    e.preventDefault();
    setPaid(true);
  };

  return (
    <div className={`border rounded-2xl overflow-hidden ${cardBg}`}>
      <div className="grid grid-cols-2">
        <button
          onClick={() => setMethod('card')}
          className={`flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-wide ${
            method === 'card'
              ? 'bg-blue-700 text-white'
              : darkMode
              ? 'text-slate-300 bg-slate-900'
              : 'text-slate-600 bg-slate-50'
          }`}
        >
          <CardIcon className="w-4 h-4" />
          CREDIT CARD
        </button>
        <button
          onClick={() => setMethod('insurance')}
          className={`flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-wide ${
            method === 'insurance'
              ? 'bg-blue-700 text-white'
              : darkMode
              ? 'text-slate-300 bg-slate-900'
              : 'text-slate-600 bg-slate-50'
          }`}
        >
          <InsuranceIcon className="w-4 h-4" />
          INSURANCE
        </button>
      </div>

      {method === 'card' ? (
        <form onSubmit={handlePay} className="p-6">
          <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>Card Number</label>
          <div className="relative mb-4">
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="00000 000000 0000 0000"
              className={`w-full rounded-xl border px-4 pr-32 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${inputBg}`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <MicIcon className={`w-4 h-4 ${iconColor}`} />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">VISA</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600">MC</span>
            </div>
          </div>

          <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>Cardholder Name</label>
          <div className="relative mb-4">
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Name"
              className={`w-full rounded-xl border px-4 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${inputBg}`}
            />
            <MicIcon className={`w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 ${iconColor}`} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-1">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>Expiry Date</label>
              <div className="relative">
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className={`w-full rounded-xl border px-4 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${inputBg}`}
                />
                <MicIcon className={`w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 ${iconColor}`} />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelColor}`}>CVV</label>
              <div className="relative">
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  type={showCvv ? 'text' : 'password'}
                  placeholder="***"
                  className={`w-full rounded-xl border px-4 pr-16 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${inputBg}`}
                />
                <MicIcon className={`w-4 h-4 absolute right-9 top-1/2 -translate-y-1/2 ${iconColor}`} />
                <button
                  type="button"
                  onClick={() => setShowCvv((v) => !v)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconColor}`}
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-500">
              <ShieldCheckIcon className="w-4 h-4" />
              SSL SECURED
            </span>
            <span className={`flex items-center gap-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <LockIcon className="w-4 h-4" />
              256-bit Encryption
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl py-4 transition"
          >
            Pay Rs{amount.toFixed(2)} Now
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className={`p-10 text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
          Insurance payment details go here.
        </div>
      )}

      {paid && method === 'card' && (
        <div className="px-6 pb-6">
          <div
            className={`flex items-center justify-between rounded-xl border px-5 py-4 ${
              darkMode ? 'bg-emerald-950 border-emerald-800' : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4" />
              </span>
              <span className="font-bold text-emerald-600">Payment done Successfully</span>
            </div>
            <button onClick={() => setPaid(false)} className="text-emerald-600">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className={`mx-6 mb-6 rounded-xl px-5 py-4 flex gap-3 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <InfoIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} />
        <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          By clicking "Pay Now", you agree to our{' '}
          <a href="#" className="text-blue-500 underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-500 underline">Payment Policy</a>. Your payment data is
          handled securely and never stored on our servers.
        </p>
      </div>
    </div>
  );
};