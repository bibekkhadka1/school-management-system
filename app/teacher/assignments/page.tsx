"use client";

import {
  Plus,
  Search,
  ClipboardList,
  Eye,
  Users,
  Clock3,
  CheckCircle2,
  FileCheck2,
  MoreHorizontal,
  ChevronDown,
  CalendarDays,
  ArrowUpRight,
  Layers3,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const assignments = [
  {
    id: "assignment-1",
    title: "Database Design Project",
    className: "BCA 3A",
    subject: "DBMS",
    due: "Sep 08, 2026",
    submissions: 38,
    total: 45,
    status: "Review",
  },
  {
    id: "assignment-2",
    title: "React Portfolio Website",
    className: "BCA 3B",
    subject: "Web Development",
    due: "Sep 10, 2026",
    submissions: 31,
    total: 40,
    status: "Review",
  },
  {
    id: "assignment-3",
    title: "Machine Learning Basics",
    className: "BCA 4A",
    subject: "Data Science",
    due: "Sep 12, 2026",
    submissions: 0,
    total: 44,
    status: "Upcoming",
  },
];

export default function AssignmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const router = useRouter();

  const filtered = useMemo(() => {
    return assignments.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.className.toLowerCase().includes(searchValue) ||
        item.subject.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalAssignments = assignments.length;

  const pendingReview = assignments.filter(
    (item) => item.status === "Review",
  ).length;

  const totalSubmissions = assignments.reduce(
    (sum, item) => sum + item.submissions,
    0,
  );

  const totalStudents = assignments.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const completionRate =
    totalStudents > 0
      ? Math.round((totalSubmissions / totalStudents) * 100)
      : 0;

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <ClipboardList size={18} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Academic Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Assignments
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Create, manage, track and grade assignments across your classes.
            </p>
          </div>

          {/* Create Assignment */}
          <button
            onClick={() => router.push("/teacher/assignments/new")}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200/70 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {/* Hover shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Content */}
            <span className="relative flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 transition-transform duration-200 group-hover:rotate-90">
                <Plus size={15} strokeWidth={2.5} />
              </span>

              <span>Create Assignment</span>
            </span>
          </button>
        </div>

        {/* =========================================================
            KPI CARDS
        ========================================================= */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Assignments"
            value={totalAssignments}
            description="Active assignments"
            icon={ClipboardList}
            iconClass="bg-indigo-50 text-indigo-600"
            hoverColor="indigo"
          />

          <KpiCard
            title="Pending Review"
            value={pendingReview}
            description="Need your attention"
            icon={Clock3}
            iconClass="bg-orange-50 text-orange-600"
            hoverColor="orange"
            highlight
          />

          <KpiCard
            title="Submissions"
            value={totalSubmissions}
            description={`Across ${assignments.length} assignments`}
            icon={FileCheck2}
            iconClass="bg-violet-50 text-violet-600"
            hoverColor="violet"
          />

          <KpiCard
            title="Completion Rate"
            value={`${completionRate}%`}
            description="Overall submission rate"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
            hoverColor="emerald"
            progress={completionRate}
          />
        </div>

        {/* =========================================================
            MAIN CARD
        ========================================================= */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* =======================================================
              TOOLBAR
          ======================================================= */}
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
                  placeholder="Search assignments, classes or subjects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-10 text-xs font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="All">All Status</option>
                    <option value="Review">Review</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <button className="hidden h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:flex">
                  <MoreHorizontal size={16} />
                  More
                </button>
              </div>
            </div>
          </div>

          {/* =======================================================
              SECTION HEADER
          ======================================================= */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Assignment Overview
                </h2>

                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                  {filtered.length}
                </span>
              </div>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {filtered.length === 0
                  ? "No assignments found"
                  : `${filtered.length} assignment${
                      filtered.length !== 1 ? "s" : ""
                    } available`}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
              <Users size={14} />
              Student submissions
            </div>
          </div>

          {/* =======================================================
              TABLE
          ======================================================= */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <TableHeader>Assignment</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader>Due Date</TableHeader>
                  <TableHeader>Submissions</TableHeader>
                  <TableHeader>Status</TableHeader>

                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((item) => {
                    const percentage =
                      item.total > 0
                        ? Math.round(
                            (item.submissions / item.total) * 100,
                          )
                        : 0;

                    return (
                      <tr
                        key={item.id}
                        className="group border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                      >
                        {/* Assignment */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 transition group-hover:bg-indigo-100">
                              <ClipboardList
                                size={17}
                                className="text-indigo-600"
                              />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {item.title}
                              </p>

                              <div className="mt-1 flex items-center gap-1.5">
                                <Layers3
                                  size={11}
                                  className="text-slate-400"
                                />

                                <p className="text-[11px] font-medium text-slate-400">
                                  {item.subject}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Class */}
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            {item.className}
                          </span>
                        </td>

                        {/* Due Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                              <CalendarDays
                                size={14}
                                className="text-slate-500"
                              />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-700">
                                {item.due}
                              </p>

                              <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Due date
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Submissions */}
                        <td className="px-5 py-4">
                          <div className="w-40">
                            <div className="mb-1.5 flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-700">
                                {item.submissions}/{item.total}
                              </span>

                              <span className="text-[10px] font-semibold text-slate-400">
                                {percentage}%
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  percentage >= 80
                                    ? "bg-emerald-500"
                                    : percentage >= 50
                                      ? "bg-indigo-600"
                                      : "bg-slate-300"
                                }`}
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>

                            <p className="mt-1 text-[10px] font-medium text-slate-400">
                              {item.submissions === 0
                                ? "No submissions yet"
                                : `${item.total - item.submissions} remaining`}
                            </p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                router.push(
                                  `/teacher/assignments/${item.id}`,
                                )
                              }
                              className="group/action inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:border-indigo-100 hover:bg-indigo-50"
                            >
                              <Eye size={14} />

                              <span>Details</span>

                              <ArrowUpRight
                                size={12}
                                className="opacity-0 transition group-hover/action:translate-x-0.5 group-hover/action:opacity-100"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search size={20} className="text-slate-400" />
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-800">
                        No assignments found
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Try adjusting your search or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =======================================================
              PAGINATION
          ======================================================= */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-600">
                {assignments.length}
              </span>{" "}
              assignments
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-300"
              >
                <ChevronDown size={13} className="rotate-90" />
                Previous
              </button>

              <button className="h-7 min-w-7 rounded-lg bg-indigo-600 px-2 text-[11px] font-semibold text-white shadow-sm">
                1
              </button>

              <button className="h-7 min-w-7 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-50">
                2
              </button>

              <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-50">
                Next
                <ChevronDown size={13} className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   TABLE HEADER
================================================================ */

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
      {children}
    </th>
  );
}

/* ================================================================
   KPI CARD
================================================================ */

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  hoverColor,
  highlight,
  progress,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  hoverColor: "indigo" | "orange" | "violet" | "emerald";
  highlight?: boolean;
  progress?: number;
}) {
  const hoverClasses = {
    indigo: "hover:border-indigo-300",
    orange: "hover:border-orange-300",
    violet: "hover:border-violet-300",
    emerald: "hover:border-emerald-300",
  };

  return (
    <div
      className={`group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverClasses[hoverColor]}`}
    >
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

      <div className="mt-4">
        <p
          className={`text-[11px] font-medium ${
            highlight ? "text-orange-600" : "text-slate-400"
          }`}
        >
          {description}
        </p>
      </div>

      {progress !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ================================================================
   STATUS BADGE
================================================================ */

function StatusBadge({ status }: { status: string }) {
  const isReview = status === "Review";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isReview
          ? "bg-orange-50 text-orange-600"
          : "bg-indigo-50 text-indigo-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isReview ? "bg-orange-500" : "bg-indigo-500"
        }`}
      />

      {status}
    </span>
  );
}