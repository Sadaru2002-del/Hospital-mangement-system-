import React from "react";
import {
  FaThLarge,
  FaCalendarAlt,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaMoneyBillWave,
  FaHeadset,
  FaSignOutAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    {
      title: "Dashboard",
      icon: <FaThLarge />,
      active: true,
    },
    {
      title: "Appointments",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Records",
      icon: <FaFileMedical />,
    },
    {
      title: "Prescriptions",
      icon: <FaPrescriptionBottleAlt />,
    },
    {
      title: "Payments",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <aside className="w-full min-h-full bg-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-7">
        <h2 className="text-[18px] font-bold text-[#134A8E]">
          Medimate Healthcare
        </h2>
      </div>

      {/* Profile */}
      <div className="mx-5 bg-[#F6F8FB] rounded-2xl p-4 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-blue-700"
        />

        <div>
          <h3 className="font-bold text-[15px]">
            Welcome, Imasha
          </h3>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-8 px-5 flex-1">
        {menu.map((item) => (
          <button
            key={item.title}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl mb-3 transition ${item.active
              ? "bg-[#2D79F3] text-white"
              : "text-[#1F4A63] hover:bg-gray-100"
              }`}
          >
            {item.icon}
            <span className="font-semibold">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="px-5 pb-6 mt-auto">

        <hr className="mb-6" />

        <button className="flex items-center gap-3 text-gray-700 mb-6">
          <FaHeadset />
          Support
        </button>

        <button className="flex items-center gap-3 text-red-600 font-semibold mb-6">
          <FaSignOutAlt />
          Logout
        </button>

        <button className="w-full bg-[#C81D25] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3 hover:bg-red-700 transition">
          <FaPhoneAlt />
          Call Doctor
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;