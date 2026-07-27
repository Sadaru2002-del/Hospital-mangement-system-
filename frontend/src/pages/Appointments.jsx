import React, { useState } from 'react';

export const Appointments = ({ darkMode = false }) => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Sarah Jenkins', doctor: 'Dr. Sarah Connor', date: '2026-07-20', time: '09:00 AM', reason: 'Annual physical checkup', status: 'Scheduled' },
    { id: 2, patient: 'Michael Chang', doctor: 'Dr. Bruce Banner', date: '2026-07-20', time: '10:00 AM', reason: 'Flu symptoms', status: 'Completed' },
    { id: 3, patient: 'Emma Watson', doctor: 'Dr. Gregory House', date: '2026-07-21', time: '02:00 PM', reason: 'Chronic migraine diagnostics', status: 'Scheduled' },
  ]);

  const [formData, setFormData] = useState({
    patient: '',
    doctor: 'Dr. Sarah Connor',
    date: '',
    time: '',
    reason: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.patient || !formData.date || !formData.time || !formData.reason) return;
    const newAppointment = {
      id: appointments.length + 1,
      ...formData,
      status: 'Scheduled',
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setFormData({
      patient: '',
      doctor: 'Dr. Sarah Connor',
      date: '',
      time: '',
      reason: '',
    });
  };

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-300';
  const inputBg = darkMode
    ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500'
    : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500';
  const labelColor = darkMode ? 'text-slate-400' : 'text-gray-500';

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${
          darkMode ? 'bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent' : 'text-gray-900'
        }`}>
          Appointments Setup
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Manage scheduled visits, register check-ins, and assign doctors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Table */}
        <div className={`border rounded-2xl p-6 lg:col-span-2 shadow-xl transition-colors ${cardBg}`}>
          <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>Upcoming Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-gray-200 text-gray-500'}`}>
                  <th className="pb-3 font-semibold">Patient</th>
                  <th className="pb-3 font-semibold">Doctor</th>
                  <th className="pb-3 font-semibold">Date/Time</th>
                  <th className="pb-3 font-semibold">Reason</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className={darkMode ? 'divide-y divide-slate-800/50' : 'divide-y divide-gray-100'}>
                {appointments.map((appt) => (
                  <tr key={appt.id} className={darkMode ? 'text-slate-300 hover:bg-slate-900/50' : 'text-gray-700 hover:bg-gray-50'}>
                    <td className={`py-3.5 font-medium ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>{appt.patient}</td>
                    <td className="py-3.5">{appt.doctor}</td>
                    <td className="py-3.5">
                      <span className={`block ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>{appt.date}</span>
                      <span className={`block text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{appt.time}</span>
                    </td>
                    <td className={`py-3.5 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{appt.reason}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        appt.status === 'Completed'
                          ? darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                          : darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
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

        {/* Schedule Form */}
        <div className={`border rounded-2xl p-6 shadow-xl h-fit transition-colors ${cardBg}`}>
          <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>Schedule Visit</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                Patient Name
              </label>
              <input
                type="text"
                name="patient"
                required
                value={formData.patient}
                onChange={handleInputChange}
                placeholder="Full Name"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                Assigned Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
              >
                <option value="Dr. Sarah Connor">Dr. Sarah Connor (Cardiology)</option>
                <option value="Dr. Bruce Banner">Dr. Bruce Banner (Pediatrics)</option>
                <option value="Dr. Gregory House">Dr. Gregory House (Diagnostics)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g. 10:30 AM"
                  className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                Reason for Visit
              </label>
              <textarea
                name="reason"
                required
                rows="3"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Reason description..."
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition resize-none ${inputBg}`}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition duration-150 mt-4"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
