"use client";

import {
  Plus,
  FileText,
  CalendarDays,
  Eye,
  Award,
  Search,
  Clock3,
  CheckCircle2,
  Users,
  ChevronDown,
  MoreHorizontal,
  ArrowUpRight,
  Layers3,
} from "lucide-react";
import { useMemo, useState } from "react";

const exams = [
  {
    name: "First Terminal Examination",
    subject: "Database Management Systems",
    className: "BCA 3A",
    date: "Sep 15, 2026",
    marks: "100",
    status: "Marks Entered",
  },
  {
    name: "First Terminal Examination",
    subject: "Web Development",
    className: "BCA 3B",
    date: "Sep 17, 2026",
    marks: "100",
    status: "Marks Pending",
  },
  {
    name: "Mid-Term Examination",
    subject: "Data Science",
    className: "BCA 4A",
    date: "Sep 22, 2026",
    marks: "100",
    status: "Upcoming",
  },
];

export default function ExamsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        exam.name.toLowerCase().includes(searchValue) ||
        exam.subject.toLowerCase().includes(searchValue) ||
        exam.className.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalExams = exams.length;

  const marksEntered = exams.filter(
    (exam) => exam.status === "Marks Entered"
  ).length;

  const marksPending = exams.filter(
    (exam) => exam.status === "Marks Pending"
  ).length;

  const upcomingExams = exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <Award size={18} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Academic Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Exams &amp; Marks
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Manage examinations, marks and student results.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]">
            <Plus size={17} />
            Create Exam
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Exams"
            value={totalExams}
            description="Examinations scheduled"
            icon={FileText}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <KpiCard
            title="Marks Entered"
            value={marksEntered}
            description="Results completed"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <KpiCard
            title="Marks Pending"
            value={marksPending}
            description="Need your attention"
            icon={Clock3}
            iconClass="bg-orange-50 text-orange-600"
            highlight
          />

          <KpiCard
            title="Upcoming Exams"
            value={upcomingExams}
            description="Scheduled examinations"
            icon={CalendarDays}
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
                  placeholder="Search exams, classes or subjects..."
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
                    <option value="Marks Entered">Marks Entered</option>
                    <option value="Marks Pending">Marks Pending</option>
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

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Examination Overview
                </h2>

                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                  {filteredExams.length}
                </span>
              </div>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {filteredExams.length === 0
                  ? "No examinations found"
                  : `${filteredExams.length} examination${
                      filteredExams.length !== 1 ? "s" : ""
                    } available`}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
              <Users size={14} />
              Examination results
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <TableHeader>Examination</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Full Marks</TableHeader>
                  <TableHeader>Status</TableHeader>

                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam, index) => (
                    <tr
                      key={`${exam.name}-${exam.className}-${index}`}
                      className="group border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                    >

                      {/* Examination */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 transition group-hover:bg-indigo-100">
                            <FileText
                              size={17}
                              className="text-indigo-600"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {exam.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">
                              <Layers3
                                size={11}
                                className="text-slate-400"
                              />

                              <p className="text-[11px] font-medium text-slate-400">
                                {exam.subject}
                              </p>
                            </div>
                          </div>

                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {exam.className}
                        </span>
                      </td>

                      {/* Date */}
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
                              {exam.date}
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                              Examination date
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Full Marks */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">

                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                            <Award
                              size={14}
                              className="text-slate-500"
                            />
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-700">
                              {exam.marks}
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                              Maximum marks
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={exam.status} />
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">

                          <button className="group/action inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:border-indigo-100 hover:bg-indigo-50">
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">

                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search
                          size={20}
                          className="text-slate-400"
                        />
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-800">
                        No examinations found
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

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] font-medium text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filteredExams.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-600">
                {exams.length}
              </span>{" "}
              examinations
            </p>

            <div className="flex items-center gap-1.5">

              <button
                disabled
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-300"
              >
                <ChevronDown
                  size={13}
                  className="rotate-90"
                />
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

                <ChevronDown
                  size={13}
                  className="-rotate-90"
                />
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Table Header */
/* ---------------------------------- */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
      {children}
    </th>
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

      <div className="mt-4">
        <p
          className={`text-[11px] font-medium ${
            highlight
              ? "text-orange-600"
              : "text-slate-400"
          }`}
        >
          {description}
        </p>
      </div>

    </div>
  );
}

/* ---------------------------------- */
/* Status Badge */
/* ---------------------------------- */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const isEntered = status === "Marks Entered";
  const isPending = status === "Marks Pending";

  const styles = isEntered
    ? "bg-emerald-50 text-emerald-600"
    : isPending
      ? "bg-orange-50 text-orange-600"
      : "bg-indigo-50 text-indigo-600";

  const dot = isEntered
    ? "bg-emerald-500"
    : isPending
      ? "bg-orange-500"
      : "bg-indigo-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}