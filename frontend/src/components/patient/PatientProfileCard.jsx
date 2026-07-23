import React from 'react';

export const PatientProfileCard = ({ patient }) => {
  const {
    initials = 'IS',
    name = 'Imasha',
    patientId = '#MR-8921',
    age = '34 Years',
    bloodGroup = 'O+',
    allergy = 'Penicillin',
    lastVisit = 'Oct 12, 2026',
    chartImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    emergencyContactName = 'Thirasha Lamkamli',
    emergencyContactPhone = '+94768543890',
  } = patient || {};

  return (
    <div className="border border-slate-200 rounded-2xl p-5 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
          {initials}
        </div>
        <div>
          <div className="font-extrabold text-slate-900 text-lg leading-tight">{name}</div>
          <span className="inline-block mt-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
            Patient ID: {patientId}
          </span>
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-slate-500">Age</span>
          <span className="text-sm font-semibold text-slate-900">{age}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-slate-500">Blood Group</span>
          <span className="text-sm font-bold text-red-500">{bloodGroup}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-slate-500">Allergies</span>
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-lg">
            {allergy}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-slate-500">Last Visit</span>
          <span className="text-sm font-bold text-slate-900">{lastVisit}</span>
        </div>
      </div>

      <img
        src={chartImage}
        alt="Patient recovery progress chart"
        className="w-full h-28 object-cover rounded-xl mt-2 border border-slate-100"
      />

      <div className="mt-5 bg-slate-50 rounded-xl p-4">
        <div className="font-extrabold text-slate-900 text-base leading-tight mb-3">
          Emergency Contact
        </div>
        <div className="text-sm font-semibold text-slate-800">{emergencyContactName}</div>
        <div className="text-sm text-slate-500 mt-0.5">{emergencyContactPhone}</div>

        <button className="mt-4 w-full border border-blue-700 text-blue-700 font-semibold text-sm rounded-xl py-2.5 hover:bg-blue-50 transition">
          View Full Profile
        </button>
      </div>
    </div>
  );
};