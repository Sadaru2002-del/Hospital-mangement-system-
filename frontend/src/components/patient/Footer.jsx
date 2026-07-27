import React from "react";

const Footer = ({ darkMode = false }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`w-full px-8 py-5 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-sm transition-colors ${
        darkMode
          ? "bg-slate-950 border-slate-800 text-slate-400"
          : "bg-white border-gray-200 text-gray-500"
      }`}
    >
      <p>&copy; {year} Medimate Healthcare. All rights reserved.</p>

      <div className="flex items-center gap-6 font-medium">
        <a href="#privacy" className="hover:text-[#0F4C81] transition-colors">
          Privacy Policy
        </a>
        <a href="#terms" className="hover:text-[#0F4C81] transition-colors">
          Terms of Service
        </a>
        <a href="#support" className="hover:text-[#0F4C81] transition-colors">
          Support
        </a>
      </div>
    </footer>
  );
};

export default Footer;
