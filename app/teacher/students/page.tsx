"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Mail,
  Search,
  Users,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

/* --------------------------------
   API Student Type
--------------------------------- */

// This represents the student data coming from PostgreSQL
// through our Express /api/students endpoint.
type StudentFromAPI = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  roll_no: string;

  // Student's actual database/enrollment status.
  // We will NOT use this for the attendance-based Status column.
  status: "Active" | "Inactive";

  location: string | null;
  created_at: string;

  // These values come from the backend.
  class_name: string | null;
  attendance: string | number;
};

/* --------------------------------
   Frontend Student Type
--------------------------------- */

// This is the structure used by our existing UI.
//
// className and attendance are temporary because
// we have not created the Classes and Attendance tables yet.
type Student = {
  id: number;
  name: string;
  email: string;
  rollNo: string;
  className: string;
  attendance: number;

  // This status is calculated from attendance percentage.
  status: "Active" | "Less Active" | "Inactive";
};

export default function StudentsPage() {
  // Search box value
  const [search, setSearch] = useState("");

  // Stores students received from our backend API
  const [studentsFromAPI, setStudentsFromAPI] = useState<StudentFromAPI[]>([]);

  // Shows a loading state while the API request is running
  const [loading, setLoading] = useState(true);

  // Stores an error message if the API request fails
  const [error, setError] = useState("");

  // Currently selected class filter
  const [selectedClass, setSelectedClass] = useState("All");

  // Current pagination page
  const [currentPage, setCurrentPage] = useState(1);

  // Number of students displayed on each page
  const studentsPerPage = 6;

  /* --------------------------------
     Fetch Students From Backend
  --------------------------------- */

  useEffect(() => {
    // Fetch students from our Express backend
    const fetchStudents = async () => {
      try {
        // Call the backend API
        const response = await fetch("http://localhost:5000/api/students");

        // Check if the backend returned a successful response
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        // Convert the JSON response into JavaScript data
        const data: StudentFromAPI[] = await response.json();

        // Store the database students in React state
        setStudentsFromAPI(data);
      } catch (error) {
        // Show the actual error in the browser console
        console.error("Failed to load students:", error);

        // Store a user-friendly error message
        setError("Failed to load students.");
      } finally {
        // Loading is finished
        setLoading(false);
      }
    };

    // Run the API request when the page loads
    fetchStudents();
  }, []);

  /* --------------------------------
     Convert API Data To UI Data
  --------------------------------- */

  // PostgreSQL uses names such as first_name and roll_no,
  // while our existing frontend uses name and rollNo.
  //
  // So we convert the database format into the format
  // expected by our existing UI.
  const students: Student[] = useMemo(() => {
    return studentsFromAPI.map((student) => {
      // Convert the attendance value from PostgreSQL
      // into a JavaScript number.
      const attendance = Number(student.attendance);

      // Calculate the attendance-based status.
      //
      // 0%          → Inactive
      // 1% - 49%    → Less Active
      // 50% - 100%  → Active
      let attendanceStatus: "Active" | "Less Active" | "Inactive";

      if (attendance === 0) {
        attendanceStatus = "Inactive";
      } else if (attendance < 50) {
        attendanceStatus = "Less Active";
      } else {
        attendanceStatus = "Active";
      }

      return {
        id: student.id,

        // Combine first and last name.
        name: `${student.first_name} ${student.last_name}`,

        // Email comes from PostgreSQL.
        email: student.email,

        // Convert roll_no to the frontend rollNo name.
        rollNo: student.roll_no,

        // Use the class name returned by the backend.
        className: student.class_name ?? "Not assigned",

        // Store the real attendance percentage.
        attendance,

        // Use our newly calculated attendance status.
        status: attendanceStatus,
      };
    });
  }, [studentsFromAPI]);

  /* --------------------------------
     Class Filter Options
  --------------------------------- */

  // Create the class dropdown options
  //
  // Currently all students are "Not assigned"
  // because we haven't created class relationships yet.
  const classes = [
    "All",
    ...Array.from(new Set(students.map((s) => s.className))),
  ];

  /* --------------------------------
     Search + Class Filtering
  --------------------------------- */

  const filteredStudents = useMemo(() => {
    // Convert search text to lowercase
    const query = search.trim().toLowerCase();

    // Filter students based on search and class
    return students.filter((student) => {
      // Search by student name, email, or roll number
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.rollNo.toLowerCase().includes(query);

      // Check selected class
      const matchesClass =
        selectedClass === "All" || student.className === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, search, selectedClass]);

  /* --------------------------------
     Statistics
  --------------------------------- */

  // Total number of students
  const totalStudents = students.length;

  // Count only Active students
  const activeStudents = students.filter(
    (student) => student.status === "Active",
  ).length;

  // Calculate average attendance
  //
  // This will currently be 0 because attendance
  // has not been added to the database yet.
  const averageAttendance =
    students.length > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.attendance, 0) /
            students.length,
        )
      : 0;

  /* --------------------------------
     Pagination
  --------------------------------- */

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage),
  );

  // Prevent current page from exceeding total pages
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Get students for the current page
  const paginatedStudents = filteredStudents.slice(
    (safeCurrentPage - 1) * studentsPerPage,
    safeCurrentPage * studentsPerPage,
  );

  /* --------------------------------
     Search Handler
  --------------------------------- */

  const handleSearch = (value: string) => {
    // Update search value
    setSearch(value);

    // Go back to page 1
    setCurrentPage(1);
  };

  /* --------------------------------
     Class Filter Handler
  --------------------------------- */

  const handleClassChange = (value: string) => {
    // Update selected class
    setSelectedClass(value);

    // Go back to page 1
    setCurrentPage(1);
  };

  /* --------------------------------
     Loading State
  --------------------------------- */

  // Display this while students are being fetched
  if (loading) {
    return (
      <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-[1500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

            <p className="mt-4 text-sm font-semibold text-gray-600">
              Loading students...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------
     Error State
  --------------------------------- */

  // Display this if the backend API cannot be reached
  if (error) {
    return (
      <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-[1500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Users className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-base font-bold text-gray-900">
              Unable to load students
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">{error}</p>

            <p className="mt-2 text-xs font-medium text-gray-400">
              Make sure your backend server is running on port 5000.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------
     Main Page
  --------------------------------- */

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Users className="h-4 w-4" />
              Student Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Students
            </h1>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Manage student profiles, attendance and academic information.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Students"
            value={totalStudents}
            description="Students across classes"
            hoverColor="blue"
          />

          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Active Students"
            value={activeStudents}
            description="Currently enrolled"
            hoverColor="emerald"
          />

          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Classes"
            value={classes.length - 1}
            description="Active class sections"
            hoverColor="purple"
          />

          <StatCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Avg. Attendance"
            value={`${averageAttendance}%`}
            description="Across all students"
            hoverColor="amber"
          />
        </div>

        {/* Student Directory */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Directory Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 px-6 py-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Student Directory
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-500">
                View and manage enrolled student profiles.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search students..."
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm font-medium text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                />
              </div>

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className === "All" ? "All Classes" : className}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Table */}
          {paginatedStudents.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/70">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Student
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Roll No.
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Class
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Attendance
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100">
                    {paginatedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="transition hover:bg-gray-50/70"
                      >
                        {/* Student */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {/* Student initials */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                              {getInitials(student.name)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-gray-900">
                                {student.name}
                              </p>

                              <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                <Mail className="h-3.5 w-3.5" />
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Roll Number */}
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {student.rollNo}
                        </td>

                        {/* Class */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                            {student.className}
                          </span>
                        </td>

                        {/* Attendance */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-indigo-500"
                                style={{
                                  width: `${student.attendance}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-bold text-gray-700">
                              {student.attendance}%
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                              student.status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : student.status === "Less Active"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/teacher/students/${student.id}`}
                            className="group inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:border-indigo-100 hover:bg-indigo-50"
                          >
                            <span>View Profile</span>

                            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col justify-between gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center">
                <p className="text-xs font-medium text-gray-500">
                  Showing{" "}
                  <span className="font-bold text-gray-700">
                    {filteredStudents.length === 0
                      ? 0
                      : (safeCurrentPage - 1) * studentsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-gray-700">
                    {Math.min(
                      safeCurrentPage * studentsPerPage,
                      filteredStudents.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-700">
                    {filteredStudents.length}
                  </span>{" "}
                  students
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous button */}
                  <button
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous
                  </button>

                  {/* Current page */}
                  <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-bold text-white">
                    {safeCurrentPage}
                  </div>

                  {/* Next button */}
                  <button
                    type="button"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No students found */
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-gray-900">
                No students found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm font-medium text-gray-500">
                Try changing your search or class filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedClass("All");
                  setCurrentPage(1);
                }}
                className="mt-5 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Footer text inside the page */}
        <div className="pb-2 text-center">
          <p className="text-xs font-medium text-gray-400">
            Student Management · Teacher Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Reusable Stat Card
--------------------------------- */

function StatCard({
  icon,
  label,
  value,
  description,
  hoverColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  hoverColor: "blue" | "emerald" | "purple" | "amber";
}) {
  // Different hover border colors for each statistics card
  const hoverClasses = {
    blue: "hover:border-blue-300",
    emerald: "hover:border-emerald-300",
    purple: "hover:border-purple-300",
    amber: "hover:border-amber-300",
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md ${hoverClasses[hoverColor]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-gray-500">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-gray-400">{description}</p>
    </div>
  );
}

/* --------------------------------
   Get Student Initials
--------------------------------- */

function getInitials(name: string) {
  // Split the student's full name into words
  // and take the first letter of each word.
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
