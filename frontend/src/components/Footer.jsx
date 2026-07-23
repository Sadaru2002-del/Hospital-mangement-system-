import React from 'react';

/**
 * Footer Component
 * 
 * A simple, standalone footer component displayed at the bottom of the page.
 * It contains the copyright information and essential legal/audit links.
 */
export default function Footer() {
  // Dynamically get the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#15234b] py-5 px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 border-t border-slate-700/50 shrink-0 w-full">
      
      {/* Copyright Notice */}
      <div className="font-medium mb-4 sm:mb-0">
        &copy; {currentYear} CareConnect Health Systems. All rights reserved.
      </div>
      
      {/* Footer Navigation Links */}
      <div className="flex items-center gap-6 font-semibold">
        <a href="#privacy" className="hover:text-white transition-colors">
          Privacy
        </a>
        <a href="#terms" className="hover:text-white transition-colors">
          Terms
        </a>
        <a href="#audit-log" className="hover:text-white transition-colors">
          Audit Log
        </a>
      </div>
      
    </footer>
  );
}
