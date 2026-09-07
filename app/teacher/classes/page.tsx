"use client";

import {
  BookOpen,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Search,
} from "lucide-react";
import { useState } from "react";

const classes = [
  {
    code: "BCA-3A",
    name: "BCA 3rd Semester A",
    subject: "Database Management Systems",
    students: 45,
    room: "Room 201",
    schedule: "Sunday, Tuesday",
    time: "9:00 AM - 10:30 AM",
  },
  {
    code: "BCA-3B",
    name: "BCA 3rd Semester B",
    subject: "Web Development",
    students: 40,
    room: "Computer Lab 2",
    schedule: "Monday, Wednesday",
    time: "11:00 AM - 12:30 PM",
  },
  {
    code: "BCA-4A",
    name: "BCA 4th Semester A",
    subject: "Data Science",
    students: 44,
    room: "Room 205",
    schedule: "Sunday, Thursday",
    time: "2:00 PM - 3:30 PM",
  },
];

export default function ClassesPage() {
  const [search, setSearch] = useState("");

  const filteredClasses = classes.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          My Classes
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your assigned classes and teaching schedule.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5 flex max-w-md items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <Search size={17} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search classes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {filteredClasses.map((item) => (
          <div
            key={item.code}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <BookOpen size={19} className="text-blue-600" />
              </div>

              <span className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-semibold text-green-600">
                ASSIGNED
              </span>

            </div>

            <h2 className="mt-4 text-base font-semibold text-gray-900">
              {item.name}
            </h2>

            <p className="mt-1 text-xs font-medium text-blue-600">
              {item.code}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              {item.subject}
            </p>

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={14} />
                {item.students} Students
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={14} />
                {item.room}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays size={14} />
                {item.schedule}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={14} />
                {item.time}
              </div>

            </div>

            <button className="mt-5 w-full rounded-lg border px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
              View Class Details
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}