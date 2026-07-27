import React from "react";
import {
    FaCalendarAlt,
    FaFolderOpen,
    FaMoneyCheckAlt,
    FaExternalLinkAlt,
    FaCreditCard,
    FaChevronRight,
} from "react-icons/fa";

import DashboardCard from "../../components/patient/DashboardCard";
import AppointmentTable from "../../components/patient/AppointmentTable";


const Dashboard = ({ darkMode = false }) => {
    return (
        <div>

            {/* Welcome */}

            <div className="mb-10">
                <h1 className={`text-[52px] font-extrabold leading-none ${darkMode ? "text-white" : "text-[#232323]"}`}>
                    Welcome, Imasha 👋
                </h1>

                <p className={`mt-4 text-[18px] ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                    Here's what's happening with your health today.
                </p>
            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                <DashboardCard
                    darkMode={darkMode}
                    urgent={true}
                    icon={<FaCalendarAlt className={darkMode ? "text-blue-300" : "text-[#134A8E]"} size={26} />}
                    title="Next Appointment"
                    value="June 10, 10:00 AM"
                    subtitle="Dr. Nirmal Jaywardhana"
                    buttonText="View Details"
                    buttonIcon={<FaChevronRight />}
                    buttonStyle={
                        darkMode
                            ? "border-2 border-blue-500 text-blue-300 hover:bg-blue-950"
                            : "border-2 border-[#134A8E] text-[#134A8E] hover:bg-blue-50"
                    }
                />

                <DashboardCard
                    darkMode={darkMode}
                    icon={<FaFolderOpen className={darkMode ? "text-blue-300" : "text-[#134A8E]"} size={24} />}
                    title="Unread Reports"
                    value="2 new reports"
                    buttonText="Open Portal"
                    buttonIcon={<FaExternalLinkAlt size={15} />}
                    buttonStyle={
                        darkMode
                            ? "border border-slate-700 text-slate-200 hover:bg-slate-800"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                />

                <DashboardCard
                    darkMode={darkMode}
                    icon={<FaMoneyCheckAlt className={darkMode ? "text-blue-300" : "text-[#134A8E]"} size={24} />}
                    title="Pending Bills"
                    value="Rs. 150"
                    buttonText="Pay Now"
                    buttonIcon={<FaCreditCard size={18} />}
                    buttonStyle={
                        darkMode
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-[#165DB6] hover:bg-[#134A8E] text-white"
                    }
                />

            </div>

            {/* Appointment Table */}

            <AppointmentTable darkMode={darkMode} />

        </div>
    );
};

export default Dashboard;
