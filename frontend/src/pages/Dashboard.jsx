import React, { useState } from 'react';
import { Calendar, Folder, CreditCard, ChevronRight, ExternalLink, Plus, MoreVertical, Heart, Check, X, CheckCircle2 } from 'lucide-react';

/**
 * Dashboard Component
 * 
 * Represents the main Patient Dashboard page.
 * Displays greeting, quick stats cards, and a table of upcoming appointments.
 * Built to be responsive and supports dark/light mode based on Tailwind classes.
 */
export default function Dashboard() {
  // State to manage the visibility of the success alert banner
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-8">
      
      {/* =========================================
          1. Header Section 
          Contains the welcome message and alert 
      ========================================= */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Welcome, Imasha <span className="text-2xl" aria-label="waving hand">👋</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening with your health today.
          </p>
        </div>
        
        {/* Success Alert Banner */}
        {showAlert && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" />
            Login successfully
            <button 
              onClick={() => setShowAlert(false)}
              className="ml-4 text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-300 transition-colors"
              aria-label="Close alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* =========================================
          2. Stats Cards Section 
          Displays key metrics in a 3-column grid
      ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Next Appointment */}
        <div className="bg-white dark:bg-[#15234b] rounded-xl border border-blue-600 shadow-sm p-6 relative overflow-hidden flex flex-col">
          {/* Urgent Badge (Top Right) */}
          <div className="absolute top-0 right-0 bg-[#0a235c] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider">
            URGENT
          </div>
          
          {/* Icon Container */}
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-[#0b132e] flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <Calendar className="w-5 h-5" />
          </div>
          
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mb-1">Next Appointment</p>
          <h3 className="text-lg font-bold text-blue-900 dark:text-white mb-1">June 18, 2:30 AM</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Dr. Sarah Miller</p>
          
          {/* Action Button */}
          <button className="mt-auto w-full py-2 flex items-center justify-center gap-2 border border-blue-200 dark:border-slate-600 text-blue-700 dark:text-slate-200 rounded-lg text-sm font-semibold hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
            View Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Unread Reports */}
        <div className="bg-white dark:bg-[#15234b] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm p-6 flex flex-col">
          {/* Icon Container */}
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-[#0b132e] flex items-center justify-center text-blue-500 dark:text-blue-400 mb-4">
            <Folder className="w-5 h-5" />
          </div>
          
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mb-1">Unread Reports</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">2 new reports</h3>
          
          {/* Action Button */}
          <button className="mt-auto w-full py-2 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            Open Portal <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Pending Bills */}
        <div className="bg-white dark:bg-[#15234b] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm p-6 flex flex-col">
          {/* Icon Container */}
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#0b132e] flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4">
            <CreditCard className="w-5 h-5" />
          </div>
          
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mb-1">Pending Bills</p>
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-6">Rs. 150</h3>
          
          {/* Action Button */}
          <button className="mt-auto w-full py-2 flex items-center justify-center gap-2 bg-[#0550ae] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            Pay now <CreditCard className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* =========================================
          3. Appointments Table Section 
          Displays upcoming appointments list
      ========================================= */}
      <div className="bg-white dark:bg-[#15234b] rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
        
        {/* Table Header with Title and Action Button */}
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-[#111c3a]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming Appointments</h2>
          <button className="flex items-center gap-2 bg-[#335d88] hover:bg-[#254668] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" /> Schedule New
          </button>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            {/* Table Columns Header */}
            <thead className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#111c3a] border-b border-slate-200 dark:border-slate-700/50">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Doctor Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            
            {/* Table Body (Rows) */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              
              {/* Row 1: Confirmed Appointment */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1b2b5a] transition-colors">
                
                {/* Date Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-white text-blue-700 dark:text-[#15234b] rounded-lg p-2 flex flex-col items-center justify-center w-12 h-12 leading-tight shadow-sm">
                      <span className="text-[10px] font-bold uppercase">Jun</span>
                      <span className="text-lg font-bold">12</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">June 12, 2024</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">10:00 AM</p>
                    </div>
                  </div>
                </td>
                
                {/* Doctor Name Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrNimal" alt="Dr. Nimal" className="w-8 h-8 rounded-full bg-slate-200 shadow-sm" />
                    <span className="font-bold text-slate-900 dark:text-white">Dr. Nimal</span>
                  </div>
                </td>
                
                {/* Department Column */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                    <Heart className="w-3 h-3" /> Cardiology
                  </span>
                </td>
                
                {/* Status Column (Confirmed) */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    Confirmed
                  </span>
                </td>
                
                {/* Action Column */}
                <td className="px-6 py-4 text-center">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                    <MoreVertical className="w-5 h-5 mx-auto" />
                  </button>
                </td>
              </tr>

              {/* Row 2: Pending Appointment */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1b2b5a] transition-colors">
                
                {/* Date Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-white text-blue-700 dark:text-[#15234b] rounded-lg p-2 flex flex-col items-center justify-center w-12 h-12 leading-tight shadow-sm">
                      <span className="text-[10px] font-bold uppercase">Jun</span>
                      <span className="text-lg font-bold">18</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">June 18, 2024</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">02:30 PM</p>
                    </div>
                  </div>
                </td>
                
                {/* Doctor Name Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSarah" alt="Dr. Sarah Miller" className="w-8 h-8 rounded-full bg-slate-200 shadow-sm" />
                    <span className="font-bold text-slate-900 dark:text-white">Dr. Sarah Miller</span>
                  </div>
                </td>
                
                {/* Department Column */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                    <Check className="w-3 h-3" /> Orthopedics
                  </span>
                </td>
                
                {/* Status Column (Pending) */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-transparent text-orange-600 dark:text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                    Pending
                  </span>
                </td>
                
                {/* Action Column */}
                <td className="px-6 py-4 text-center">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                    <MoreVertical className="w-5 h-5 mx-auto" />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
