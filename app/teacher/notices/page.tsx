"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Pin,
  Search,
  AlertTriangle,
  CheckCircle2,
  Megaphone,
  Clock3,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Notice = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: "URGENT" | "IMPORTANT" | "NORMAL";
  pinned: boolean;
};

const notices: Notice[] = [
  {
    id: 1,
    title: "Faculty Meeting",
    description:
      "Monthly faculty meeting will be held tomorrow at 2:00 PM in the conference hall.",
    date: "Sep 07, 2026",
    priority: "IMPORTANT",
    pinned: true,
  },
  {
    id: 2,
    title: "Examination Schedule Updated",
    description:
      "The first terminal examination schedule has been revised. Please review the updated schedule.",
    date: "Sep 06, 2026",
    priority: "URGENT",
    pinned: true,
  },
  {
    id: 3,
    title: "Annual Sports Program",
    description:
      "Teachers are requested to submit student participation lists to the administration.",
    date: "Sep 05, 2026",
    priority: "NORMAL",
    pinned: false,
  },
  {
    id: 4,
    title: "Holiday Notice",
    description:
      "The institution will remain closed on the upcoming public holiday.",
    date: "Sep 03, 2026",
    priority: "NORMAL",
    pinned: false,
  },
  {
    id: 5,
    title: "Staff Development Workshop",
    description:
      "A professional development workshop for teaching staff will be conducted next week.",
    date: "Sep 02, 2026",
    priority: "IMPORTANT",
    pinned: false,
  },
  {
    id: 6,
    title: "Library Timing Update",
    description:
      "The library will remain open until 6:00 PM during the examination preparation period.",
    date: "Sep 01, 2026",
    priority: "NORMAL",
    pinned: false,
  },
];

export default function NoticesPage() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedNotice, setSelectedNotice] =
    useState<Notice | null>(null);

  const filteredNotices = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchValue) ||
        notice.description.toLowerCase().includes(searchValue);

      const matchesPriority =
        priorityFilter === "All" ||
        notice.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [search, priorityFilter]);

  const totalNotices = notices.length;

  const urgentNotices = notices.filter(
    (notice) => notice.priority === "URGENT"
  ).length;

  const importantNotices = notices.filter(
    (notice) => notice.priority === "IMPORTANT"
  ).length;

  const pinnedNotices = notices.filter(
    (notice) => notice.pinned
  ).length;

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <Bell size={18} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Announcements
              </span>

            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Notices
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Stay updated with school announcements and important notices.
            </p>
          </div>

        </div>

        {/* KPI Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            title="Total Notices"
            value={totalNotices}
            description="Published announcements"
            icon={Megaphone}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <KpiCard
            title="Urgent"
            value={urgentNotices}
            description="Require immediate attention"
            icon={AlertTriangle}
            iconClass="bg-red-50 text-red-600"
            highlight
          />

          <KpiCard
            title="Important"
            value={importantNotices}
            description="Important announcements"
            icon={Clock3}
            iconClass="bg-orange-50 text-orange-600"
          />

          <KpiCard
            title="Pinned"
            value={pinnedNotices}
            description="Pinned for quick access"
            icon={Pin}
            iconClass="bg-violet-50 text-violet-600"
          />

        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-slate-100 p-4">

            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">

                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notices..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* Priority Filter */}
              <div className="relative">

                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-10 text-xs font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-auto"
                >
                  <option value="All">All Priorities</option>
                  <option value="URGENT">Urgent</option>
                  <option value="IMPORTANT">Important</option>
                  <option value="NORMAL">Normal</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-sm font-bold text-slate-900">
                  Notice Board
                </h2>

                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                  {filteredNotices.length}
                </span>

              </div>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {filteredNotices.length === 0
                  ? "No notices found"
                  : `${filteredNotices.length} notice${
                      filteredNotices.length !== 1
                        ? "s"
                        : ""
                    } available`}
              </p>

            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
              <Bell size={14} />
              School announcements
            </div>

          </div>

          {/* Notices */}
          <div className="divide-y divide-slate-100">

            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (

                <div
                  key={notice.id}
                  className="group p-5 transition hover:bg-slate-50/60"
                >

                  <div className="flex gap-4">

                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        notice.priority === "URGENT"
                          ? "bg-red-50"
                          : notice.priority === "IMPORTANT"
                          ? "bg-orange-50"
                          : "bg-indigo-50"
                      }`}
                    >
                      <Bell
                        size={18}
                        className={
                          notice.priority === "URGENT"
                            ? "text-red-600"
                            : notice.priority === "IMPORTANT"
                            ? "text-orange-600"
                            : "text-indigo-600"
                        }
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-start justify-between gap-3">

                        <div className="flex items-center gap-2">

                          <h3 className="text-sm font-bold text-slate-800">
                            {notice.title}
                          </h3>

                          {notice.pinned && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50">
                              <Pin
                                size={11}
                                className="text-indigo-600"
                              />
                            </span>
                          )}

                        </div>

                        <PriorityBadge
                          priority={notice.priority}
                        />

                      </div>

                      <p className="mt-2 max-w-4xl text-xs font-medium leading-5 text-slate-500">
                        {notice.description}
                      </p>

                      {/* Bottom Row */}
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">

                          <CalendarDays size={12} />

                          <span>{notice.date}</span>

                        </div>

                        <button
                          onClick={() =>
                            setSelectedNotice(notice)
                          }
                          className="inline-flex items-center gap-1 text-left text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                        >
                          Read More
                          <ChevronRight
                            size={13}
                            className="transition group-hover:translate-x-0.5"
                          />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))
            ) : (

              /* Empty State */
              <div className="px-5 py-16 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Search
                    size={20}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-slate-800">
                  No notices found
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Try adjusting your search or priority filter.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setPriorityFilter("All");
                  }}
                  className="mt-4 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] font-medium text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filteredNotices.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-600">
                {notices.length}
              </span>{" "}
              notices
            </p>

            <div className="flex items-center gap-1.5">

              <span className="text-[10px] font-medium text-slate-400">
                Latest announcements
              </span>

              <CheckCircle2
                size={13}
                className="text-emerald-500"
              />

            </div>

          </div>

        </div>
      </div>

      {/* Read More Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 p-5">

              <div className="flex items-start gap-3">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    selectedNotice.priority === "URGENT"
                      ? "bg-red-50"
                      : selectedNotice.priority === "IMPORTANT"
                      ? "bg-orange-50"
                      : "bg-indigo-50"
                  }`}
                >
                  <Bell
                    size={18}
                    className={
                      selectedNotice.priority === "URGENT"
                        ? "text-red-600"
                        : selectedNotice.priority === "IMPORTANT"
                        ? "text-orange-600"
                        : "text-indigo-600"
                    }
                  />
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-sm font-bold text-slate-900">
                      {selectedNotice.title}
                    </h2>

                    {selectedNotice.pinned && (
                      <Pin
                        size={12}
                        className="text-indigo-600"
                      />
                    )}

                  </div>

                  <div className="mt-1 flex items-center gap-2">

                    <CalendarDays
                      size={11}
                      className="text-slate-400"
                    />

                    <span className="text-[10px] font-medium text-slate-400">
                      {selectedNotice.date}
                    </span>

                  </div>

                </div>

              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
              >
                <X size={16} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="p-5">

              <PriorityBadge
                priority={selectedNotice.priority}
              />

              <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
                {selectedNotice.description}
              </p>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 bg-slate-50/50 px-5 py-3">

              <button
                onClick={() => setSelectedNotice(null)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ---------------------------------- */
/* KPI Card */
/* ---------------------------------- */

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  highlight,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  highlight?: boolean;
}) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={18} />
        </div>

      </div>

      <p
        className={`mt-4 text-[11px] font-medium ${
          highlight
            ? "text-red-600"
            : "text-slate-400"
        }`}
      >
        {description}
      </p>

    </div>
  );
}

/* ---------------------------------- */
/* Priority Badge */
/* ---------------------------------- */

function PriorityBadge({
  priority,
}: {
  priority: Notice["priority"];
}) {
  const styles =
    priority === "URGENT"
      ? "bg-red-50 text-red-600"
      : priority === "IMPORTANT"
      ? "bg-orange-50 text-orange-600"
      : "bg-slate-100 text-slate-500";

  const dot =
    priority === "URGENT"
      ? "bg-red-500"
      : priority === "IMPORTANT"
      ? "bg-orange-500"
      : "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {priority}
    </span>
  );
}
