import React from 'react';

export const Dashboard = () => {
  const stats = [
    { name: 'Total Patients Registered', value: '1,482', change: '+12% this month', icon: '👤', color: 'indigo' },
    { name: 'Appointments Scheduled Today', value: '28', change: '8 completed', icon: '📅', color: 'emerald' },
    { name: 'On-Duty Doctors', value: '14 / 20', change: '6 on leave', icon: '🩺', color: 'cyan' },
    { name: 'Pending Laboratory Reports', value: '7', change: '3 urgent', icon: '🔬', color: 'amber' },
  ];

  const recentAppointments = [
    { patient: 'David Miller', doctor: 'Dr. Sarah Connor', time: '10:30 AM', department: 'Cardiology', status: 'In Progress' },
    { patient: 'Elena Rostova', doctor: 'Dr. Bruce Banner', time: '11:15 AM', department: 'Pediatrics', status: 'Scheduled' },
    { patient: 'Marcus Aurelius', doctor: 'Dr. Gregory House', time: '12:00 PM', department: 'Diagnostics', status: 'Scheduled' },
    { patient: 'Sophia Loren', doctor: 'Dr. Sarah Connor', time: '02:30 PM', department: 'Cardiology', status: 'Completed' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">Real-time status updates and key hospital statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex justify-between items-start">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-xs text-slate-400 font-medium bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.name}</h3>
              <p className="text-3xl font-bold text-slate-100 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-200">Today's Schedule</h2>
            <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Patient</th>
                  <th className="pb-3 font-semibold">Doctor</th>
                  <th className="pb-3 font-semibold">Time</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {recentAppointments.map((appt, idx) => (
                  <tr key={idx} className="text-slate-300 hover:bg-slate-900/50">
                    <td className="py-3.5 font-medium text-slate-200">{appt.patient}</td>
                    <td className="py-3.5">{appt.doctor}</td>
                    <td className="py-3.5 text-slate-400">{appt.time}</td>
                    <td className="py-3.5">{appt.department}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        appt.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : appt.status === 'In Progress'
                          ? 'bg-indigo-500/10 text-indigo-400 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-200 mb-6">Quick Tasks</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/50 border border-slate-800/80 hover:border-indigo-500/40 text-left transition duration-150 group">
                <div>
                  <span className="block text-sm font-semibold text-slate-200 group-hover:text-indigo-400">Register New Patient</span>
                  <span className="block text-xs text-slate-400">Add medical logs and contact info</span>
                </div>
                <span className="text-slate-500 group-hover:translate-x-1 transition duration-150">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/50 border border-slate-800/80 hover:border-indigo-500/40 text-left transition duration-150 group">
                <div>
                  <span className="block text-sm font-semibold text-slate-200 group-hover:text-indigo-400">Schedule Appointment</span>
                  <span className="block text-xs text-slate-400">Select doctor, slot and room</span>
                </div>
                <span className="text-slate-500 group-hover:translate-x-1 transition duration-150">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/50 border border-slate-800/80 hover:border-indigo-500/40 text-left transition duration-150 group">
                <div>
                  <span className="block text-sm font-semibold text-slate-200 group-hover:text-indigo-400">Generate Billing Bill</span>
                  <span className="block text-xs text-slate-400">Process insurance claim records</span>
                </div>
                <span className="text-slate-500 group-hover:translate-x-1 transition duration-150">→</span>
              </button>
            </div>
          </div>
          <div className="mt-8 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-center">
            <span className="block text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Database Sync Status</span>
            <span className="text-xs text-slate-300">Connected to local MongoDB (hospital_management)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
