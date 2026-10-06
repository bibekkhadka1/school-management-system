"use client";

import { useState } from "react";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  X,
} from "lucide-react";

const notices = [
  {
    id: 1,
    title: "First Terminal Examination Schedule",
    description:
      "The first terminal examination schedule has been updated. Please review the dates for your assigned classes.",
    date: "Sep 08, 2026",
    type: "Academic",
  },
  {
    id: 2,
    title: "Assignment Submission Reminder",
    description:
      "Students should submit pending assignments before the respective due dates.",
    date: "Sep 07, 2026",
    type: "Reminder",
  },
  {
    id: 3,
    title: "Faculty Meeting",
    description:
      "The next faculty coordination meeting will cover examination preparation and student progress.",
    date: "Sep 05, 2026",
    type: "Faculty",
  },
];

export default function ImportantNotices() {
  const [selectedNotice, setSelectedNotice] = useState<
    (typeof notices)[number] | null
  >(null);

  const [readNotices, setReadNotices] = useState<number[]>([]);

  const markRead = (id: number) => {
    setReadNotices((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  const unreadCount = notices.filter(
    (notice) => !readNotices.includes(notice.id),
  ).length;

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Important Notices
              </h2>

              {unreadCount > 0 && (
                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                  {unreadCount} new
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              Important updates for your teaching activities
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Bell className="h-4 w-4" />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {notices.map((notice) => {
            const isRead = readNotices.includes(notice.id);

            return (
              <button
                key={notice.id}
                type="button"
                onClick={() => {
                  setSelectedNotice(notice);
                  markRead(notice.id);
                }}
                className="group flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-slate-50/70"
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    notice.type === "Academic"
                      ? "bg-indigo-50 text-indigo-600"
                      : notice.type === "Reminder"
                        ? "bg-orange-50 text-orange-600"
                        : "bg-violet-50 text-violet-600"
                  }`}
                >
                  {notice.type === "Reminder" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      {!isRead && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                      )}

                      <p
                        className={`truncate text-xs ${
                          isRead
                            ? "font-semibold text-slate-600"
                            : "font-bold text-slate-900"
                        }`}
                      >
                        {notice.title}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                  </div>

                  <p className="mt-1 line-clamp-2 text-[10px] font-medium leading-5 text-slate-400">
                    {notice.description}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-[9px] font-semibold text-slate-400">
                    <CalendarDays className="h-3 w-3" />
                    {notice.date}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3">
          <button
            type="button"
            onClick={() => setReadNotices(notices.map((notice) => notice.id))}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-[10px] font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Check className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        </div>
      </section>

      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Bell className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {selectedNotice.type}
                  </p>

                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {selectedNotice.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm font-medium leading-7 text-slate-600">
                {selectedNotice.description}
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-[10px] font-semibold text-slate-500">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                Published {selectedNotice.date}
              </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 p-4">
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}