import React, { useState } from 'react';
import { Sidebar } from '../../components/patient/Sidebar';
import { PaymentsTopbar } from '../../components/patient/PaymentsTopbar';
import { PaymentForm } from '../../components/patient/PaymentForm';
import { BillingSummaryCard } from '../../components/patient/BillingSummaryCard';
import { Footer } from '../../components/patient/Footer';

export const Payments = ({ activeTab: activeNav, setActiveTab: setActiveNav }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'
      }`}
    >
      <Sidebar activeTab={activeNav} setActiveTab={setActiveNav} darkMode={darkMode} />

      <div className="flex-1 flex flex-col">
        <PaymentsTopbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 px-8 py-8">
          <h1 className={`text-2xl font-extrabold mb-6 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            Secure Payment
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            <PaymentForm darkMode={darkMode} amount={150} />
            <BillingSummaryCard darkMode={darkMode} />
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Payments;