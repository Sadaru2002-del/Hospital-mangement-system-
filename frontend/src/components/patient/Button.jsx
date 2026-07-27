import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 rounded-lg font-semibold transition duration-300
      bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;