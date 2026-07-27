import React from 'react';
import { Search, Moon, User, Settings } from 'lucide-react';

/**
 * Navbar Component
 * 
 * This component represents the top navigation bar of the dashboard.
 * It contains the page title, a search input, and quick action icons 
 * (theme toggle, user profile, and settings).
 * 
 * Designed to be a standalone, conflict-free component.
 */
export default function Navbar() {
  return (
    <header className="h-20 bg-[#15234b] flex items-center justify-between px-8 border-b border-slate-700/50 shrink-0 w-full">
      
      {/* Left Section: Title and Search */}
      <div className="flex items-center gap-12 flex-1">
        
        {/* Page Title */}
        <h2 className="text-xl font-bold text-white">
          Dashboard
        </h2>
        
        {/* Search Bar Container - Hidden on small screens for better mobile experience */}
        <div className="relative max-w-md w-full hidden md:block">
          
          {/* Search Icon positioned inside the input field */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          
          {/* Search Input Field */}
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700/50 rounded-full leading-5 bg-[#0b132e] text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          />
        </div>
      </div>

      {/* Right Section: Action Icons */}
      <div className="flex items-center gap-4 ml-4">
        
        {/* Theme Toggle Button */}
        <button 
          aria-label="Toggle Dark Mode"
          className="w-10 h-10 rounded-full bg-[#0b132e] flex items-center justify-center text-white hover:bg-slate-700 transition-colors border border-slate-700/50"
        >
          <Moon className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        {/* User Profile Button */}
        <button 
          aria-label="User Profile"
          className="w-10 h-10 rounded-full bg-[#0b132e] flex items-center justify-center text-white hover:bg-slate-700 transition-colors border border-slate-700/50"
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        {/* Settings Button */}
        <button 
          aria-label="Settings"
          className="w-10 h-10 rounded-full bg-[#0b132e] flex items-center justify-center text-white hover:bg-slate-700 transition-colors border border-slate-700/50"
        >
          <Settings className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
      </div>
    </header>
  );
}
