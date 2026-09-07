"use client";

import { Bell, CalendarDays, ChevronRight } from "lucide-react";

const notices = [
  {
    title: "Faculty Meeting",
    description: "Monthly faculty meeting will be held tomorrow.",
    date: "Sep 07, 2026",
    priority: "IMPORTANT",
  },
  {
    title: "Examination Schedule Updated",
    description: "The first terminal examination schedule has been revised.",
    date: "Sep 06, 2026",
    priority: "URGENT",
  },
  {
    title: "Annual Sports Program",
    description: "Teachers are requested to submit student participation lists.",
    date: "Sep 05, 2026",
    priority: "NORMAL",
  },
];

export default function ImportantNotices() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Bell size={18} className="text-blue-600" />

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Important Notices
            </h2>

            <p className="mt-1 text-[10px] text-gray-400">
              Latest school announcements
            </p>
          </div>

        </div>

        <button className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </button>

      </div>

      {/* Notices */}
      <div className="space-y-3">

        {notices.map((notice) => (
          <div
            key={notice.title}
            className="group flex gap-3 rounded-lg border p-3 transition hover:shadow-sm"
          >

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <Bell size={14} className="text-blue-600" />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-2">

                <p className="text-xs font-semibold text-gray-800">
                  {notice.title}
                </p>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-semibold ${
                    notice.priority === "URGENT"
                      ? "bg-red-50 text-red-500"
                      : notice.priority === "IMPORTANT"
                      ? "bg-orange-50 text-orange-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {notice.priority}
                </span>

              </div>

              <p className="mt-1 line-clamp-2 text-[10px] text-gray-500">
                {notice.description}
              </p>

              <div className="mt-2 flex items-center justify-between">

                <div className="flex items-center gap-1 text-[9px] text-gray-400">
                  <CalendarDays size={11} />
                  {notice.date}
                </div>

                <ChevronRight
                  size={14}
                  className="text-gray-300 transition group-hover:text-blue-600"
                />

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}