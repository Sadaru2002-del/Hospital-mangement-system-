import React from "react";

const appointments = [
  {
    id: 1,
    month: "JUN",
    day: "12",
    fullDate: "June 12, 2024",
    time: "10:00 AM",
    doctor: "Dr. Nirmal Jaywardhana",
    image: "https://i.pravatar.cc/100?img=12",
    department: "Cardiology",
    status: "CONFIRMED",
  },
  {
    id: 2,
    month: "JUN",
    day: "18",
    fullDate: "June 18, 2024",
    time: "02:30 PM",
    doctor: "Dr. Amanda Silva",
    image: "https://i.pravatar.cc/100?img=32",
    department: "Neurology",
    status: "PENDING",
  },
  {
    id: 3,
    month: "JUN",
    day: "25",
    fullDate: "June 25, 2024",
    time: "09:00 AM",
    doctor: "Dr. Kasun Fernando",
    image: "https://i.pravatar.cc/100?img=18",
    department: "Dental",
    status: "CONFIRMED",
  },
];

const AppointmentTable = ({ darkMode = false }) => {
  return (
    <div
      className={`mt-10 border rounded-2xl overflow-hidden shadow-sm transition-colors ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-300"
      }`}
    >

      {/* Header */}

      <div className={`flex items-center justify-between px-6 py-6 border-b ${darkMode ? "border-slate-800" : "border-gray-200"}`}>

        <h2 className={`text-[20px] font-bold ${darkMode ? "text-white" : "text-[#232323]"}`}>
          Upcoming Appointments
        </h2>

        <button
          className={`font-semibold rounded-full px-8 py-3 flex items-center gap-2 transition text-white ${
            darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-[#2E5F94] hover:bg-[#214b74]"
          }`}
        >
          <span className="text-xl leading-none">＋</span>
          Schedule New
        </button>

      </div>

      {/* Table */}

      <table className="w-full">

        <thead className={darkMode ? "bg-slate-950" : "bg-[#F5F5F7]"}>

          <tr className={`text-left text-[13px] tracking-widest uppercase ${darkMode ? "text-slate-500" : "text-gray-600"}`}>

            <th className="px-10 py-5">Date</th>
            <th className="px-6 py-5">Doctor Name</th>
            <th className="px-6 py-5">Department</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-center">Action</th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((item) => (

            <tr
              key={item.id}
              className={`border-t transition ${darkMode ? "border-slate-800 hover:bg-slate-800/40" : "hover:bg-gray-50"}`}
            >

              {/* Date */}

              <td className="px-10 py-6">

                <div className="flex items-center gap-5">

                  <div
                    className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center ${
                      darkMode ? "bg-blue-950" : "bg-[#DCE7FF]"
                    }`}
                  >
                    <span className={`text-[12px] font-bold ${darkMode ? "text-blue-300" : "text-[#134A8E]"}`}>
                      {item.month}
                    </span>

                    <span className={`text-[28px] font-bold leading-none ${darkMode ? "text-blue-300" : "text-[#134A8E]"}`}>
                      {item.day}
                    </span>

                  </div>

                  <div>

                    <h4 className={`font-bold text-[17px] ${darkMode ? "text-white" : "text-[#232323]"}`}>
                      {item.fullDate}
                    </h4>

                    <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
                      {item.time}
                    </p>

                  </div>

                </div>

              </td>

              {/* Doctor */}

              <td className="px-6">

                <div className="flex items-center gap-4">

                  <img
                    src={item.image}
                    alt={item.doctor}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <span className={`font-bold text-[16px] ${darkMode ? "text-slate-100" : "text-[#232323]"}`}>
                    {item.doctor}
                  </span>

                </div>

              </td>

              {/* Department */}

              <td className="px-6">

                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold ${
                    darkMode ? "bg-blue-950 text-blue-300" : "bg-[#DFF0FF] text-[#335B7A]"
                  }`}
                >
                  ♡ {item.department}
                </span>

              </td>

              {/* Status */}

              <td className="px-6">

                <span
                  className={`px-5 py-2 rounded-full text-sm font-bold border ${
                    item.status === "CONFIRMED"
                      ? darkMode
                        ? "bg-emerald-600 border-emerald-500 text-white"
                        : "bg-[#E8FFF0] border-[#88E0A6] text-[#179E42]"
                      : darkMode
                      ? "bg-rose-600 border-rose-500 text-white"
                      : "bg-[#FFF6DB] border-[#FFD66B] text-[#D88A00]"
                  }`}
                >
                  {item.status}
                </span>

              </td>

              {/* Action */}

              <td className="text-center">

                <button className={`text-2xl transition ${darkMode ? "text-slate-500 hover:text-blue-300" : "text-gray-500 hover:text-[#2E5F94]"}`}>
                  ⋮
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AppointmentTable;
