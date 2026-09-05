"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-2.5">
        <Search size={20} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-64 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notifications */}
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell size={21} className="text-gray-600" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 border-l pl-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            BK
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Teacher
            </p>

            <p className="text-xs text-gray-500">
              Mathematics
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}