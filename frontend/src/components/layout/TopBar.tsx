"use client";

import { Search, Bell, ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100"
      style={{ left: "220px" }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Date range */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Calendar size={13} />
          <span>May 20, 2024 – May 26, 2024</span>
          <ChevronDown size={12} />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Bell size={16} className="text-gray-500" />
          </button>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center bg-green-500">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-green-700">
            AU
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              Admin User
            </p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}