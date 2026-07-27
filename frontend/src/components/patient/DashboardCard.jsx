import React from "react";

const DashboardCard = ({
  icon,
  title,
  value,
  subtitle,
  buttonText,
  buttonIcon,
  buttonStyle = "",
  urgent = false,
  darkMode = false,
}) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden relative p-6 transition-colors ${
        darkMode ? "bg-slate-900" : "bg-white"
      } ${
        urgent
          ? darkMode
            ? "border-2 border-blue-500"
            : "border-2 border-[#134A8E]"
          : darkMode
          ? "border border-slate-800"
          : "border border-gray-300"
      }`}
    >
      {/* Urgent Badge */}
      {urgent && (
        <div className={`absolute top-0 right-0 text-white text-xs font-bold px-6 py-2 ${darkMode ? "bg-blue-600" : "bg-[#134A8E]"}`}>
          URGENT
        </div>
      )}

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${darkMode ? "bg-blue-950" : "bg-[#E8EEFF]"}`}>
        {icon}
      </div>

      {/* Title */}
      <p className={`font-bold text-[17px] ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
        {title}
      </p>

      {/* Value */}
      <h2
        className={`text-[22px] font-bold mt-3 ${title === "Pending Bills"
          ? darkMode ? "text-amber-400" : "text-red-600"
          : darkMode ? "text-blue-300" : "text-[#134A8E]"
          }`}
      >
        {value}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`mt-3 text-[16px] ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}

      {/* Button */}
      <button
        className={`mt-6 w-full h-14 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${buttonStyle}`}
      >
        {buttonText}

        {buttonIcon}
      </button>
    </div>
  );
};

export default DashboardCard;
