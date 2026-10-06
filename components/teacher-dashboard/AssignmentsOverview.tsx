"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Eye,
  Search,
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Database Design Project",
    subject: "DBMS",
    className: "BCA 3A",
    due: "Sep 08, 2026",
    submissions: 38,
    total: 45,
    status: "Review",
  },
  {
    id: 2,
    title: "React Portfolio Website",
    subject: "Web Development",
    className: "BCA 3B",
    due: "Sep 10, 2026",
    submissions: 31,
    total: 40,
    status: "Review",
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    subject: "Data Science",
    className: "BCA 4A",
    due: "Sep 12, 2026",
    submissions: 0,
    total: 44,
    status: "Upcoming",
  },
];

export default function AssignmentsOverview() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return assignments;

    return assignments.filter((item) =>
      `${item.title} ${item.subject} ${item.className}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Assignment Overview
              </h2>

              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                {filtered.length}
              </span>
            </div>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              Recent assignments and submissions
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/teacher/assignments")}
            className="inline-flex items-center gap-1.5 self-start rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50 sm:self-auto"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-[10px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const percentage =
              item.total > 0
                ? Math.round((item.submissions / item.total) * 100)
                : 0;

            return (
              <div
                key={item.id}
                className="group px-5 py-4 transition hover:bg-slate-50/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                      <ClipboardList className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-slate-400">
                        {item.subject} · {item.className}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/teacher/assignments/${item.id}`)
                    }
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    title="View assignment"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                      <CalendarDays className="h-3 w-3 text-slate-400" />
                      Due {item.due}
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        item.status === "Review"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="mt-1.5 text-[9px] font-medium text-slate-400">
                    {item.submissions}/{item.total} submissions · {percentage}
                    %
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-5 py-12 text-center">
            <Search className="mx-auto h-5 w-5 text-slate-300" />
            <p className="mt-3 text-xs font-bold text-slate-700">
              No assignments found
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3">
        <button
          type="button"
          onClick={() => router.push("/teacher/assignments/new")}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-[10px] font-bold text-white transition hover:bg-indigo-700"
        >
          Create New Assignment
        </button>
      </div>
    </section>
  );
}