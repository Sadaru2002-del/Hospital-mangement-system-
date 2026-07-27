import React from "react";
import { Sidebar } from "../components/patient/Sidebar";
import Navbar from "../components/patient/Navbar";
import Footer from "../components/patient/Footer";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  appointments: "Appointments",
  records: "Records",
  prescriptions: "Prescriptions",
  payments: "Payments",
  patients: "Patients",
  staff: "Staff Directory",
  settings: "Account Settings",
  support: "Support",
};

const PatientLayout = ({
  children,
  activeTab = "dashboard",
  setActiveTab = () => {},
  darkMode = false,
  setDarkMode = () => {},
}) => {
  return (
    <div
      className={`min-h-screen flex font-sans transition-colors ${
        darkMode ? "bg-slate-950" : "bg-[#F7F9FC]"
      }`}
    >
      {/* Sidebar - same component used (unwrapped) on every other patient
          page, so scroll behavior is identical everywhere: the whole page
          scrolls together and the footer sits once at the true bottom. */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          title={PAGE_TITLES[activeTab] || "Dashboard"}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onProfileClick={() => setActiveTab("settings")}
          onSettingsClick={() => setActiveTab("settings")}
        />
        {/* Main */}
        <main className="flex-1 px-8 py-7">{children}</main>
        {/* Footer */}
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default PatientLayout;
