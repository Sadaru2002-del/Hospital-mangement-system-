import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * MainLayout Component
 * 
 * This is the primary layout wrapper for the application.
 * It includes the Navbar at the top, the main content area in the middle, and the Footer at the bottom.
 */
export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-[#f4f4f5] dark:bg-[#0b132e] font-sans text-slate-900 overflow-hidden">
      <Navbar />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
