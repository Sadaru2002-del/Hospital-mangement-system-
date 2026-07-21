import React from "react";
import Sidebar from "../components/patient/Sidebar";
import Navbar from "../components/patient/Navbar";
import Footer from "../components/patient/Footer";

const PatientLayout = ({ children, activeTab = "records" }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-[#F7F9FC]">

      {/* Sidebar */}
      <div className="w-[285px] h-screen overflow-y-auto border-r border-gray-200 bg-white flex-shrink-0">
        <Sidebar activeTab={activeTab} />
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-1 h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-8 py-7">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default PatientLayout;