import React from "react";
import { Search } from "lucide-react";
import {
  FaMoon,
  FaRegUserCircle,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="h-[72px] bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      <h1 className="text-[22px] font-bold text-[#0F4C81]">
        Dashboard
      </h1>

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            placeholder=""
            className="w-[400px] h-11 rounded-full border border-gray-300 bg-[#F8FAFC] pl-11 pr-4 outline-none"
          />

        </div>

        {/* Icons */}

        <button className="w-10 h-10 rounded-full border flex justify-center items-center">
          <FaMoon className="text-[#0F4C81]" />
        </button>

        <button className="w-10 h-10 rounded-full border flex justify-center items-center">
          <FaRegUserCircle className="text-[#0F4C81]" />
        </button>

        <button className="w-10 h-10 rounded-full border flex justify-center items-center">
          <FiSettings className="text-[#0F4C81]" />
        </button>

      </div>

    </header>
  );
};

export default Navbar;