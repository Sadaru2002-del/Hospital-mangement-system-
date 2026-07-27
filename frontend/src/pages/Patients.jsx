import React, { useState } from 'react';

export const Patients = ({ darkMode = false }) => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Alice Smith', age: 34, gender: 'Female', phone: '+1 555-0199', bloodGroup: 'A+', address: '123 Pine St, Seattle' },
    { id: 2, name: 'John Doe', age: 45, gender: 'Male', phone: '+1 555-0144', bloodGroup: 'O-', address: '456 Oak Rd, Seattle' },
    { id: 3, name: 'Robert Johnson', age: 60, gender: 'Male', phone: '+1 555-0188', bloodGroup: 'B+', address: '789 Maple Ave, Tacoma' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Female',
    phone: '',
    bloodGroup: 'A+',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.phone) return;
    const newPatient = {
      id: patients.length + 1,
      ...formData,
      age: parseInt(formData.age, 10),
    };
    setPatients((prev) => [...prev, newPatient]);
    setFormData({
      name: '',
      age: '',
      gender: 'Female',
      phone: '',
      bloodGroup: 'A+',
      address: '',
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
          Patient Directory
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Manage patient files, view medical charts, and record diagnoses
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patients Table */}
        <div className={`border rounded-2xl p-6 lg:col-span-2 shadow-xl transition-colors ${cardBg}`}>
          <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>Registered Patients</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-gray-200 text-gray-500'}`}>
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Age/Gender</th>
                  <th className="pb-3 font-semibold">Phone</th>
                  <th className="pb-3 font-semibold">Blood Group</th>
                  <th className="pb-3 font-semibold">Address</th>
                </tr>
              </thead>
              <tbody className={darkMode ? 'divide-y divide-slate-800/50' : 'divide-y divide-gray-100'}>
                {patients.map((pat) => (
                  <tr key={pat.id} className={darkMode ? 'text-slate-300 hover:bg-slate-900/50' : 'text-gray-700 hover:bg-gray-50'}>
                    <td className={`py-3.5 font-medium ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>{pat.name}</td>
                    <td className="py-3.5">{pat.age} yrs / {pat.gender}</td>
                    <td className={`py-3.5 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{pat.phone}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center justify-center border px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                        darkMode ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-200'
                      }`}>
                        {pat.bloodGroup}
                      </span>
                    </td>
                    <td className={`py-3.5 text-xs max-w-[150px] truncate ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{pat.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Register Form */}
        <div className={`border rounded-2xl p-6 shadow-xl h-fit transition-colors ${cardBg}`}>
          <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>Register Patient</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Patient Full Name"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 35"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 555-0100"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${labelColor}`}>
                Home Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address, City"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition ${inputBg}`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition duration-150 mt-4"
            >
              Add Patient Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
