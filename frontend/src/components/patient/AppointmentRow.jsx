import React from "react";
import Button from "./Button";

const AppointmentRow = ({ appointment }) => {
  const statusColor = {
    Completed: "bg-green-100 text-green-700",
    Upcoming: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <img
            src={appointment.image}
            alt={appointment.doctor}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-gray-800">
              {appointment.doctor}
            </h4>

            <p className="text-sm text-gray-500">
              {appointment.speciality}
            </p>
          </div>

        </div>
      </td>

      <td className="px-6 py-4 text-gray-600">
        {appointment.date}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {appointment.time}
      </td>

      <td className="px-6 py-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[appointment.status]
            }`}
        >
          {appointment.status}
        </span>

      </td>

      <td className="px-6 py-4">

        <Button className="text-sm px-4 py-2">
          Details
        </Button>

      </td>

    </tr>
  );
};

export default AppointmentRow;