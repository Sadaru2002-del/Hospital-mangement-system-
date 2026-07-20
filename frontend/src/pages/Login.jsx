import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('doctor@careflow.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('doctor');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login for template
    loginUser({
      name: role === 'doctor' ? 'Dr. Sarah Connor' : 'Alex Mercer',
      email,
      role,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-4 shadow-lg shadow-indigo-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9.5M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Welcome to CareFlow</h2>
          <p className="text-sm text-slate-400 mt-2">Sign in to your hospital workspace account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Workspace Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setRole('doctor'); setEmail('doctor@careflow.com'); }}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                  role === 'doctor'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                Doctor / Staff
              </button>
              <button
                type="button"
                onClick={() => { setRole('admin'); setEmail('admin@careflow.com'); }}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                  role === 'admin'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                Administrator
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              placeholder="name@careflow.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition duration-150 mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
