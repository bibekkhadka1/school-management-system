"use client";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  Pin,
} from "lucide-react";

const notices = [
  {
    title: "Faculty Meeting",
    description:
      "Monthly faculty meeting will be held tomorrow at 2:00 PM in the conference hall.",
    date: "Sep 07, 2026",
    priority: "IMPORTANT",
    pinned: true,
  },
  {
    title: "Examination Schedule Updated",
    description:
      "The first terminal examination schedule has been revised. Please review the updated schedule.",
    date: "Sep 06, 2026",
    priority: "URGENT",
    pinned: true,
  },
  {
    title: "Annual Sports Program",
    description:
      "Teachers are requested to submit student participation lists to the administration.",
    date: "Sep 05, 2026",
    priority: "NORMAL",
    pinned: false,
  },
  {
    title: "Holiday Notice",
    description:
      "The institution will remain closed on the upcoming public holiday.",
    date: "Sep 03, 2026",
    priority: "NORMAL",
    pinned: false,
  },
];

export default function NoticesPage() {
  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Notices
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Stay updated with school announcements and important notices.
        </p>
      </div>

      <div className="space-y-4">

        {notices.map((notice) => (
          <div
            key={notice.title}
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Bell size={18} className="text-blue-600" />
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-start justify-between gap-3">

                  <div className="flex items-center gap-2">

                    <h2 className="text-sm font-semibold text-gray-900">
                      {notice.title}
                    </h2>

                    {notice.pinned && (
                      <Pin size={13} className="text-blue-600" />
                    )}

                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
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

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {notice.description}
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <CalendarDays size={12} />
                    {notice.date}
                  </div>

                  <button className="flex items-center gap-1 text-xs font-medium text-blue-600">
                    Read More
                    <ChevronRight size={13} />
                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}