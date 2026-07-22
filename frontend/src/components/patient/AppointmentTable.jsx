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

const AppointmentTable = () => {
  return (
    <div className="mt-10 bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">

        <h2 className="text-[20px] font-bold text-[#232323]">
          Upcoming Appointments
        </h2>

        <button
          className="bg-[#2E5F94] hover:bg-[#214b74]
          text-white font-semibold rounded-full
          px-8 py-3 flex items-center gap-2 transition"
        >
          <span className="text-xl leading-none">＋</span>
          Schedule New
        </button>

      </div>

      {/* Table */}

      <table className="w-full">

        <thead className="bg-[#F5F5F7]">

          <tr className="text-left text-[13px] tracking-widest uppercase text-gray-600">

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
              className="border-t hover:bg-gray-50 transition"
            >

              {/* Date */}

              <td className="px-10 py-6">

                <div className="flex items-center gap-5">

                  <div
                    className="w-14 h-14 rounded-lg
                    bg-[#DCE7FF]
                    flex flex-col items-center justify-center"
                  >
                    <span className="text-[12px] font-bold text-[#134A8E]">
                      {item.month}
                    </span>

                    <span className="text-[28px] font-bold text-[#134A8E] leading-none">
                      {item.day}
                    </span>

                  </div>

                  <div>

                    <h4 className="font-bold text-[17px]">
                      {item.fullDate}
                    </h4>

                    <p className="text-gray-500">
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

                  <span className="font-bold text-[16px]">
                    {item.doctor}
                  </span>

                </div>

              </td>

              {/* Department */}

              <td className="px-6">

                <span
                  className="bg-[#DFF0FF]
                  text-[#335B7A]
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-semibold"
                >
                  ♡ {item.department}
                </span>

              </td>

              {/* Status */}

              <td className="px-6">

                <span
                  className={`px-5 py-2 rounded-full text-sm font-bold border ${item.status === "CONFIRMED"
                    ? "bg-[#E8FFF0] border-[#88E0A6] text-[#179E42]"
                    : "bg-[#FFF6DB] border-[#FFD66B] text-[#D88A00]"
                    }`}
                >
                  {item.status}
                </span>

              </td>

              {/* Action */}

              <td className="text-center">

                <button className="text-2xl text-gray-500 hover:text-[#2E5F94] transition">
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