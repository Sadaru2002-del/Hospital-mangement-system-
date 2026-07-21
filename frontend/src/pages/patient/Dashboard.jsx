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

const Dashboard = () => {
    return (
        <div>

            {/* Welcome */}

            <div className="mb-10">
                <h1 className="text-[52px] font-extrabold text-[#232323] leading-none">
                    Welcome, Imasha 👋
                </h1>

                <p className="mt-4 text-[18px] text-gray-500">
                    Here's what's happening with your health today.
                </p>
            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                <DashboardCard
                    urgent={true}
                    icon={<FaCalendarAlt className="text-[#134A8E]" size={26} />}
                    title="Next Appointment"
                    value="June 10, 10:00 AM"
                    subtitle="Dr. Nirmal Jaywardhana"
                    buttonText="View Details"
                    buttonIcon={<FaChevronRight />}
                    buttonStyle="border-2 border-[#134A8E] text-[#134A8E] hover:bg-blue-50"
                />

                <DashboardCard
                    icon={<FaFolderOpen className="text-[#134A8E]" size={24} />}
                    title="Unread Reports"
                    value="2 new reports"
                    buttonText="Open Portal"
                    buttonIcon={<FaExternalLinkAlt size={15} />}
                    buttonStyle="border border-gray-300 text-gray-700 hover:bg-gray-50"
                />

                <DashboardCard
                    icon={<FaMoneyCheckAlt className="text-[#134A8E]" size={24} />}
                    title="Pending Bills"
                    value="Rs. 150"
                    buttonText="Pay Now"
                    buttonIcon={<FaCreditCard size={18} />}
                    buttonStyle="bg-[#165DB6] hover:bg-[#134A8E] text-white"
                />

            </div>

            {/* Appointment Table */}

            <AppointmentTable />

        </div>
    );
};

export default Dashboard;