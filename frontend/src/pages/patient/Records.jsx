import React, { useState } from "react";
import { Share2, FileDown, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";

export const Records = () => {
  const [activeTab, setActiveTab] = useState("lab"); // Default to lab reports based on the new request
  const [normalExpanded, setNormalExpanded] = useState(true);
  const [abnormalExpanded, setAbnormalExpanded] = useState(false);

  const historyRecords = [
    {
      id: 1,
      date: "June 12, 2024",
      time: "10:00 AM",
      doctor: "Dr. Nimal",
      department: "Cardiology",
      status: "CONFIRMED",
    },
    {
      id: 2,
      date: "June 18, 2024",
      time: "02:30 PM",
      doctor: "Dr. Nimal",
      department: "Orthopedics",
      status: "PENDING",
    },
    {
      id: 3,
      date: "July 05, 2024",
      time: "09:15 AM",
      doctor: "Dr. Sunimal",
      department: "Dermatology",
      status: "CONFIRMED",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header section with Dynamic Title and Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#232323] tracking-tight">
            {activeTab === "lab" ? "Medical Records" : "Records"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === "lab"
              ? "Comprehensive medical history and clinical logs"
              : "List of your consultations and appointments"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("lab")}
            className={`font-semibold text-[15px] px-6 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === "lab"
                ? "bg-[#1E73E8] text-white shadow-md shadow-blue-500/10"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lab Reports
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`font-semibold text-[15px] px-6 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === "history"
                ? "bg-[#1E73E8] text-white shadow-md shadow-blue-500/10"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {activeTab === "lab" ? (
        /* Lab Reports Tab Content */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Patient Summary Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#DCE7FF] text-[#134A8E] rounded-2xl flex items-center justify-center font-bold text-[22px]">
                IS
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#232323]">Imasha</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00F0FF]/15 text-[#008794] mt-1.5">
                  Patient ID: #MR-8921
                </span>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="divide-y divide-gray-100 text-sm">
              <div className="flex justify-between py-3.5">
                <span className="text-gray-500 font-medium">Age</span>
                <span className="font-bold text-[#232323]">34 Years</span>
              </div>
              <div className="flex justify-between py-3.5">
                <span className="text-gray-500 font-medium">Blood Group</span>
                <span className="font-bold text-red-600">O+</span>
              </div>
              <div className="flex justify-between py-3.5 items-center">
                <span className="text-gray-500 font-medium">Allergies</span>
                <span className="inline-flex px-2.5 py-0.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                  Penicillin
                </span>
              </div>
              <div className="flex justify-between py-3.5">
                <span className="text-gray-500 font-medium">Last Visit</span>
                <span className="font-bold text-[#232323]">Oct 12, 2026</span>
              </div>
            </div>

            {/* Clinical Health Score Chart */}
            <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Patient Recovery Progress: Clinical Health Score
              </span>

              {/* Responsive SVG Chart */}
              <div className="relative">
                <svg viewBox="0 0 320 160" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="300" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="60" x2="300" y2="60" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="100" x2="300" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="20" y1="140" x2="300" y2="140" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="score-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E73E8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#1E73E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path
                    d="M 20 140 Q 60 120, 110 95 T 200 65 T 300 45 L 300 140 Z"
                    fill="url(#score-grad)"
                  />

                  {/* Line Chart */}
                  <path
                    d="M 20 140 Q 60 120, 110 95 T 200 65 T 300 45"
                    fill="none"
                    stroke="#1E73E8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Nodes */}
                  <circle cx="20" cy="140" r="4.5" fill="#FFFFFF" stroke="#1E73E8" strokeWidth="2.5" />
                  <circle cx="110" cy="95" r="4.5" fill="#FFFFFF" stroke="#1E73E8" strokeWidth="2.5" />
                  <circle cx="200" cy="65" r="4.5" fill="#FFFFFF" stroke="#1E73E8" strokeWidth="2.5" />
                  <circle cx="300" cy="45" r="4.5" fill="#FFFFFF" stroke="#1E73E8" strokeWidth="2.5" />

                  {/* Month labels */}
                  <text x="20" y="155" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">Jan</text>
                  <text x="75" y="155" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">Mar</text>
                  <text x="145" y="155" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">May</text>
                  <text x="220" y="155" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">Jul</text>
                  <text x="300" y="155" fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="bold">Sep</text>
                </svg>
              </div>

              {/* Metrics beneath chart */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <div>
                  <span className="block text-[11px] font-bold text-gray-400 uppercase">Patient Score</span>
                  <span className="text-[17px] font-bold text-[#232323]">78 / 100</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold text-xs">
                    +24% (avg)
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-0.5">Excellent</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#F4F7FC] border border-gray-100 rounded-2xl p-5 space-y-4">
              <div>
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Emergency Contact
                </span>
                <span className="block font-bold text-[#232323] text-lg mt-1">
                  Thirasha Lamkamli
                </span>
                <span className="block text-sm text-gray-500 mt-0.5">
                  +94768543890
                </span>
              </div>
              <button className="w-full bg-white hover:bg-gray-50 text-[#1E73E8] border border-[#DCE7FF] rounded-xl py-3 font-semibold text-[14px] transition cursor-pointer">
                View Full Profile
              </button>
            </div>
          </div>

          {/* Right Column - Results accordions */}
          <div className="lg:col-span-2 space-y-5">
            {/* Accordion 1: Normal Results */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setNormalExpanded(!normalExpanded)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition cursor-pointer text-left"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-[#E8FFF0] text-[#179E42]">
                  Normal Results
                </span>
                <div className="text-gray-400 hover:text-gray-600">
                  {normalExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                </div>
              </button>

              {normalExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 divide-y divide-gray-100">
                  {/* Result Item 1 */}
                  <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 first:pt-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-[16px]">Full Blood Count (FBC)</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Collected: June 10, 2024 • Lab ID: #L-4921</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-sm font-bold text-[#232323]">Hemoglobin: 13.2 g/dL</span>
                        <span className="block text-[11px] text-gray-400">Ref: 12.0 - 15.5</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded">Normal</span>
                    </div>
                  </div>

                  {/* Result Item 2 */}
                  <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-[16px]">Lipid Profile</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Collected: June 10, 2024 • Lab ID: #L-4921</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-sm font-bold text-[#232323]">Cholesterol: 180 mg/dL</span>
                        <span className="block text-[11px] text-gray-400">Ref: &lt; 200</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded">Normal</span>
                    </div>
                  </div>

                  {/* Result Item 3 */}
                  <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 last:pb-0">
                    <div>
                      <h4 className="font-bold text-gray-800 text-[16px]">Thyroid Stimulating Hormone (TSH)</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Collected: May 05, 2024 • Lab ID: #L-3211</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-sm font-bold text-[#232323]">TSH: 2.1 mIU/L</span>
                        <span className="block text-[11px] text-gray-400">Ref: 0.4 - 4.0</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded">Normal</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Abnormal Results */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setAbnormalExpanded(!abnormalExpanded)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition cursor-pointer text-left"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-[#FFF6DB] text-[#D88A00]">
                  Abnormal Results
                </span>
                <div className="text-gray-400 hover:text-gray-600">
                  {abnormalExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                </div>
              </button>

              {abnormalExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 divide-y divide-gray-100">
                  <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 first:pt-2 last:pb-0">
                    <div>
                      <h4 className="font-bold text-gray-800 text-[16px]">Vitamin D (25-Hydroxy)</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Collected: June 10, 2024 • Lab ID: #L-4921</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-sm font-bold text-red-500">Value: 18 ng/mL</span>
                        <span className="block text-[11px] text-gray-400">Ref: 30 - 100 (Deficiency)</span>
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-600 rounded">Low</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* History Tab Content */
        <>
          {/* Records Table Card */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] text-left text-[13px] tracking-wider uppercase text-gray-500 font-semibold border-b border-gray-200">
                  <th className="px-10 py-5">Date</th>
                  <th className="px-6 py-5">Doctor Name</th>
                  <th className="px-6 py-5">Department</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {historyRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition">
                    {/* Date column */}
                    <td className="px-10 py-6">
                      <div className="font-bold text-[17px] text-[#232323]">
                        {record.date}
                      </div>
                      <div className="text-[13px] text-gray-400 font-medium mt-0.5">
                        {record.time}
                      </div>
                    </td>

                    {/* Doctor Name column */}
                    <td className="px-6 py-6 font-bold text-[17px] text-[#232323]">
                      {record.doctor}
                    </td>

                    {/* Department column */}
                    <td className="px-6 py-6 text-[16px] text-gray-500">
                      {record.department}
                    </td>

                    {/* Status column */}
                    <td className="px-6 py-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${
                          record.status === "CONFIRMED"
                            ? "bg-[#E8FFF0] border-[#88E0A6] text-[#179E42]"
                            : "bg-[#FFF6DB] border-[#FFD66B] text-[#D88A00]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            record.status === "CONFIRMED"
                              ? "bg-[#179E42]"
                              : "bg-[#D88A00]"
                          }`}
                        ></span>
                        {record.status}
                      </span>
                    </td>

                    {/* Action column */}
                    <td className="px-6 py-6 text-center">
                      <button className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-end items-center gap-4 mt-6">
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2.5 transition shadow-sm cursor-pointer text-[15px]">
              <Share2 size={18} className="text-gray-600" />
              Share
            </button>
            <button className="bg-[#1E73E8] hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2.5 transition shadow-md shadow-blue-500/10 cursor-pointer text-[15px]">
              <FileDown size={18} className="text-white" />
              Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Records;
