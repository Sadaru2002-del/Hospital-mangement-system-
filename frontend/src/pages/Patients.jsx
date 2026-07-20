import React, { useState } from 'react';

export const Patients = () => {
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

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
          Patient Directory
        </h1>
        <p className="text-sm text-slate-400 mt-1">Manage patient files, view medical charts, and record diagnoses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patients Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-xl">
          <h2 className="text-lg font-bold text-slate-200 mb-6">Registered Patients</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Age/Gender</th>
                  <th className="pb-3 font-semibold">Phone</th>
                  <th className="pb-3 font-semibold">Blood Group</th>
                  <th className="pb-3 font-semibold">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {patients.map((pat) => (
                  <tr key={pat.id} className="text-slate-300 hover:bg-slate-900/50">
                    <td className="py-3.5 font-medium text-slate-200">{pat.name}</td>
                    <td className="py-3.5">{pat.age} yrs / {pat.gender}</td>
                    <td className="py-3.5 text-slate-400">{pat.phone}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center justify-center bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                        {pat.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400 text-xs max-w-[150px] truncate">{pat.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Register Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
          <h2 className="text-lg font-bold text-slate-200 mb-6">Register Patient</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Patient Full Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 35"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 555-0100"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
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
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Home Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address, City"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
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
