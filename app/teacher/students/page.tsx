"use client";

import {
  Search,
  Users,
  Eye,
  UserCheck,
  Award,
  TrendingUp,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  MoreVertical,
  X,
  GraduationCap,
} from "lucide-react";
import { useState, useMemo } from "react";

// Expanded Mock Student Data
const students = [
  {
    id: "STU-001",
    name: "Aarav Sharma",
    className: "BCA 3A",
    roll: "01",
    attendance: 94,
    email: "aarav@example.com",
    avatar: "AS",
  },
  {
    id: "STU-002",
    name: "Priya Thapa",
    className: "BCA 3A",
    roll: "02",
    attendance: 91,
    email: "priya@example.com",
    avatar: "PT",
  },
  {
    id: "STU-003",
    name: "Sujan KC",
    className: "BCA 3B",
    roll: "15",
    attendance: 87,
    email: "sujan@example.com",
    avatar: "SK",
  },
  {
    id: "STU-004",
    name: "Anisha Rai",
    className: "BCA 4A",
    roll: "08",
    attendance: 96,
    email: "anisha@example.com",
    avatar: "AR",
  },
  {
    id: "STU-005",
    name: "Rohan Shrestha",
    className: "BCA 3B",
    roll: "22",
    attendance: 78,
    email: "rohan@example.com",
    avatar: "RS",
  },
  {
    id: "STU-006",
    name: "Kavya Joshi",
    className: "BCA 4A",
    roll: "12",
    attendance: 92,
    email: "kavya@example.com",
    avatar: "KJ",
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);

  const totalStudentsCount = 24;

  const classOptions = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(students.map((s) => s.className))),
    ];
  }, []);

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchesClass =
      classFilter === "All" || student.className === classFilter;

    return matchesSearch && matchesClass;
  });

  const averageAttendance = Math.round(
    students.reduce((acc, curr) => acc + curr.attendance, 0) /
      students.length
  );

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1500px]">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <GraduationCap size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Students Roster
                </h1>

                <p className="mt-0.5 text-sm font-medium text-slate-500">
                  Manage student profiles, attendance and academic standings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            KPI CARDS
        ========================================================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Total Students */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Enrolled
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {totalStudentsCount}
                  </span>

                  <span className="mb-1 text-[11px] font-bold text-emerald-600">
                    Active
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={21} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <TrendingUp size={13} />
                +8%
              </span>

              new admissions this semester
            </div>
          </div>

          {/* Attendance */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Average Attendance
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {averageAttendance}%
                  </span>

                  <span className="mb-1 text-[11px] font-bold text-emerald-600">
                    High Rate
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck size={21} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
              <span className="font-bold text-emerald-600">
                Optimal
              </span>

              across all assigned sections
            </div>
          </div>

          {/* Top Section */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-purple-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Top Performing Section
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    BCA 4A
                  </span>

                  <span className="mb-1 text-[11px] font-bold text-purple-600">
                    94% Avg
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Award size={21} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
              <span className="font-bold text-purple-600">
                Highest Engagement
              </span>

              in recent lectures
            </div>
          </div>
        </div>

        {/* =========================================================
            STUDENT DIRECTORY
        ========================================================= */}
        <section>

          {/* Section Heading */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Student Directory
              </h2>

              <p className="mt-0.5 text-xs font-medium text-slate-500">
                View student profiles, classes and attendance performance.
              </p>
            </div>

            <span className="hidden rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600 sm:block">
              {filteredStudents.length} students
            </span>
          </div>

          {/* =======================================================
              TOOLBAR
          ======================================================= */}
          <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-sm">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search students, ID or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-9 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                {/* Class Filter */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <Filter size={14} className="text-slate-400" />

                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Class
                  </span>

                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-800 outline-none"
                  >
                    {classOptions.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`rounded-lg p-1.5 transition ${
                      viewMode === "table"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                    title="Table View"
                  >
                    <List size={16} />
                  </button>

                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg p-1.5 transition ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              EMPTY STATE
          ======================================================= */}
          {filteredStudents.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={22} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                No matching students found
              </h3>

              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Try adjusting your search criteria or class filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setClassFilter("All");
                }}
                className="mt-4 rounded-lg px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "table" ? (

            /* =====================================================
               TABLE VIEW
            ===================================================== */
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

              {/* Table Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-600" />

                  <h2 className="text-sm font-extrabold text-slate-900">
                    All Students
                  </h2>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                  {filteredStudents.length} Shown
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      <th className="px-6 py-3.5">
                        Student
                      </th>

                      <th className="px-6 py-3.5">
                        Class
                      </th>

                      <th className="px-6 py-3.5">
                        Roll No.
                      </th>

                      <th className="px-6 py-3.5">
                        Attendance
                      </th>

                      <th className="px-6 py-3.5 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => {
                      const isHighAttendance =
                        student.attendance >= 90;

                      const isMediumAttendance =
                        student.attendance >= 80 &&
                        student.attendance < 90;

                      return (
                        <tr
                          key={student.id}
                          className="group transition-colors hover:bg-slate-50/70"
                        >
                          {/* Student */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-[10px] font-extrabold text-white shadow-sm">
                                {student.avatar}
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 transition group-hover:text-blue-600">
                                  {student.name}
                                </p>

                                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                                  <span>{student.id}</span>

                                  <span>•</span>

                                  <span className="flex items-center gap-1">
                                    <Mail size={10} />
                                    {student.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Class */}
                          <td className="px-6 py-4">
                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-700">
                              {student.className}
                            </span>
                          </td>

                          {/* Roll */}
                          <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                            #{student.roll}
                          </td>

                          {/* Attendance */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${
                                  isHighAttendance
                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                                    : isMediumAttendance
                                    ? "border-amber-500/20 bg-amber-500/10 text-amber-600"
                                    : "border-rose-500/20 bg-rose-500/10 text-rose-600"
                                }`}
                              >
                                {student.attendance}%
                              </span>

                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full ${
                                    isHighAttendance
                                      ? "bg-emerald-500"
                                      : isMediumAttendance
                                      ? "bg-amber-500"
                                      : "bg-rose-500"
                                  }`}
                                  style={{
                                    width: `${student.attendance}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye size={13} />
                              View Profile
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          ) : (

            /* =====================================================
               GRID VIEW
            ===================================================== */
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredStudents.map((student) => {
                const isHighAttendance =
                  student.attendance >= 90;

                const isMediumAttendance =
                  student.attendance >= 80 &&
                  student.attendance < 90;

                return (
                  <div
                    key={student.id}
                    className="group flex min-h-[300px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-extrabold text-white shadow-md">
                          {student.avatar}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-slate-900 transition group-hover:text-blue-600">
                            {student.name}
                          </h3>

                          <p className="text-[10px] font-medium text-slate-400">
                            {student.id}
                          </p>
                        </div>
                      </div>

                      <button className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className="my-5 h-px bg-slate-100" />

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">
                          Class
                        </span>

                        <span className="font-bold text-slate-700">
                          {student.className}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">
                          Roll Number
                        </span>

                        <span className="font-bold text-slate-700">
                          #{student.roll}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">
                          Email
                        </span>

                        <span className="truncate font-medium text-slate-600">
                          {student.email}
                        </span>
                      </div>
                    </div>

                    {/* Attendance */}
                    <div className="mt-auto pt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Attendance
                        </span>

                        <span
                          className={`text-xs font-extrabold ${
                            isHighAttendance
                              ? "text-emerald-600"
                              : isMediumAttendance
                              ? "text-amber-600"
                              : "text-rose-600"
                          }`}
                        >
                          {student.attendance}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            isHighAttendance
                              ? "bg-emerald-500"
                              : isMediumAttendance
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{
                            width: `${student.attendance}%`,
                          }}
                        />
                      </div>
                    </div>

                    <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                      <Eye size={14} />
                      View Full Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* =========================================================
            PAGINATION
        ========================================================= */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div className="text-xs font-medium text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              1
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-900">
              {filteredStudents.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900">
              {totalStudentsCount}
            </span>{" "}
            students
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
              1
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-slate-600 transition hover:bg-slate-100">
              2
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-slate-600 transition hover:bg-slate-100">
              3
            </button>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}