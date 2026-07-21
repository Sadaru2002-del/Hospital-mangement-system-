import React from "react";
import { HeartPulse } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-8 py-5">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

        {/* Left */}
        <div>
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} Medimate Healthcare. All Rights Reserved.
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Terms & Conditions
          </a>

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Contact
          </a>

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Help Center
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;