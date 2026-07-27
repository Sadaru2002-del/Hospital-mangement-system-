import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Pill,
  CreditCard,
  Settings,
  Headphones,
  LogOut,
  PhoneCall,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', name: 'Appointments', icon: CalendarDays },
  { id: 'records', name: 'Records', icon: FileText },
  { id: 'prescriptions', name: 'Prescriptions', icon: Pill },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar = ({
  activeTab,
  setActiveTab,
  userName = 'Imasha',
  userAvatar = 'https://i.pravatar.cc/150?img=12',
  darkMode = false,
}) => {
  return (
    <aside
      className={`w-[285px] flex flex-col justify-between min-h-screen border-r transition-colors ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'
      }`}
    >
      <div>
        <div className="px-6 pt-7 pb-4">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0F4C81]'}`}>
            Medimate
          </h1>
          <p className={`font-medium ${darkMode ? 'text-slate-300' : 'text-[#0F4C81]'}`}>
            Healthcare
          </p>
        </div>

        <div className="px-5">
          <div
            className={`rounded-2xl p-4 flex items-center gap-4 ${
              darkMode ? 'bg-slate-900' : 'bg-[#F6F8FC]'
            }`}
          >
            <img
              src={userAvatar}
              alt="patient"
              className="w-14 h-14 rounded-full border-2 border-blue-700 object-cover"
            />
            <div>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Welcome,</p>
              <h3 className={`font-bold text-lg ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                {userName}
              </h3>
            </div>
          </div>
        </div>

        <nav className="mt-10 px-5 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1E73E8] text-white shadow-lg'
                    : darkMode
                    ? 'text-slate-300 hover:bg-slate-900'
                    : 'text-[#21496B] hover:bg-blue-50'
                }`}
              >
                <Icon size={22} />
                <span className="font-semibold text-[17px]">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-5 pb-6">
        <div className={`border-t pt-6 ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('support')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
              darkMode ? 'text-slate-300 hover:bg-slate-900' : 'text-[#21496B] hover:bg-gray-100'
            }`}
          >
            <Headphones size={22} />
            <span className="font-semibold">Support</span>
          </button>

          <button
            onClick={() => setActiveTab('logout')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition mt-1"
          >
            <LogOut size={22} />
            <span className="font-semibold">Logout</span>
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