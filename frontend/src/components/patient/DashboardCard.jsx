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
}) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden relative p-6 ${urgent
        ? "border-2 border-[#134A8E]"
        : "border border-gray-300"
        }`}
    >
      {/* Urgent Badge */}
      {urgent && (
        <div className="absolute top-0 right-0 bg-[#134A8E] text-white text-xs font-bold px-6 py-2">
          URGENT
        </div>
      )}

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-[#E8EEFF] flex items-center justify-center mb-6">
        {icon}
      </div>

      {/* Title */}
      <p className="font-bold text-[17px] text-gray-700">
        {title}
      </p>

      {/* Value */}
      <h2
        className={`text-[22px] font-bold mt-3 ${title === "Pending Bills"
          ? "text-red-600"
          : "text-[#134A8E]"
          }`}
      >
        {value}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-500 mt-3 text-[16px]">
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