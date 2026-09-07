"use client";

import { CalendarDays, Clock } from "lucide-react";

const classes = [
  {
    time: "9:00 AM - 10:30 AM",
    subject: "Database Management Systems",
    className: "BCA 3rd • Room 201",
    status: "COMPLETED",
  },
  {
    time: "11:00 AM - 12:30 PM",
    subject: "Web Development",
    className: "BCA 3rd • Lab 2",
    status: "IN PROGRESS",
  },
  {
    time: "2:00 PM - 3:30 PM",
    subject: "Data Science Fundamentals",
    className: "BCA 4th • Room 205",
    status: "UPCOMING",
  },
];

export default function TodaysClasses() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-blue-600" />

          <h2 className="text-sm font-semibold text-gray-900">
            Today&apos;s Classes
          </h2>
        </div>

        <button className="text-xs font-medium text-blue-600 hover:underline">
          View Schedule
        </button>
      </div>

      {/* Classes */}
      <div className="space-y-4">

        {classes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-3"
          >

            <div className="flex gap-3">

              <div className="mt-1">
                <Clock size={16} className="text-gray-400" />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  {item.time}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {item.subject}
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {item.className}
                </p>
              </div>

            </div>

            <span
              className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                item.status === "COMPLETED"
                  ? "bg-green-50 text-green-600"
                  : item.status === "IN PROGRESS"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {item.status}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}