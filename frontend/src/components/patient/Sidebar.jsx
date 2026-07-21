import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Pill,
  CreditCard,
  Headphones,
  LogOut,
  PhoneCall,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      title: "Appointments",
      icon: CalendarDays,
    },
    {
      title: "Records",
      icon: FileText,
    },
    {
      title: "Prescriptions",
      icon: Pill,
    },
    {
      title: "Payments",
      icon: CreditCard,
    },
  ];

  return (
    <aside className="w-[285px] bg-white border-r border-gray-200 flex flex-col justify-between min-h-screen">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="px-6 pt-7 pb-4">
          <h1 className="text-3xl font-bold text-[#0F4C81]">
            Medimate
          </h1>
          <p className="text-[#0F4C81] font-medium">
            Healthcare
          </p>
        </div>

        {/* User Card */}
        <div className="px-5">
          <div className="bg-[#F6F8FC] rounded-2xl p-4 flex items-center gap-4">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="patient"
              className="w-14 h-14 rounded-full border-2 border-blue-700"
            />

            <div>
              <p className="text-sm text-gray-500">
                Welcome,
              </p>

              <h3 className="font-bold text-gray-800 text-lg">
                Imasha
              </h3>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10 px-5 space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300
                  ${item.active
                    ? "bg-[#1E73E8] text-white shadow-lg"
                    : "text-[#21496B] hover:bg-blue-50"
                  }`}
              >
                <Icon size={22} />
                <span className="font-semibold text-[17px]">
                  {item.title}
                </span>
              </button>
            );
          })}

        </nav>

      </div>

      {/* Bottom Section */}
      <div className="px-5 pb-6">

        <div className="border-t pt-6">

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[#21496B] hover:bg-gray-100 transition">
            <Headphones size={22} />
            <span className="font-semibold">
              Support
            </span>
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition mt-1">
            <LogOut size={22} />
            <span className="font-semibold">
              Logout
            </span>
          </button>

          <button className="w-full mt-6 bg-red-700 hover:bg-red-800 text-white rounded-xl py-4 flex justify-center items-center gap-3 font-semibold text-lg transition">
            <PhoneCall size={22} />
            Call Doctor
          </button>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;