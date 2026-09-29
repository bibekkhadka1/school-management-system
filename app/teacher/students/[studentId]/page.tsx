"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  User,
  Users,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

/* --------------------------------
   API Student Type
--------------------------------- */

// This type represents the student data
// coming from our Express backend.
//
// These field names match the PostgreSQL
// columns returned by /api/students/:id.
type StudentFromAPI = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  roll_no: string;
  status: "Active" | "Inactive";
  location: string | null;
  created_at: string;
};

/* --------------------------------
   Frontend Student Type
--------------------------------- */

// This is the structure used by our
// existing Student Profile UI.
//
// Some fields such as className and attendance
// are temporary until we create the Classes
// and Attendance database tables.
type Student = {
  id: number;
  name: string;
  email: string;
  rollNo: string;
  className: string;
  attendance: number;
  status: "Active" | "Inactive";
  location: string;
  subjects: {
    name: string;
    attendance: number;
  }[];
};

/* --------------------------------
   Stat Card
--------------------------------- */

function StatCard({
  icon,
  label,
  value,
  description,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  color: "blue" | "emerald" | "purple" | "amber";
}) {
  const styles = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      hover: "hover:border-blue-300",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      hover: "hover:border-emerald-300",
    },
    purple: {
      icon: "bg-purple-50 text-purple-600",
      hover: "hover:border-purple-300",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      hover: "hover:border-amber-300",
    },
  };

  return (
    <div
      className={`flex min-h-[155px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${styles[color].hover}`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles[color].icon}`}
        >
          {icon}
        </div>

        <div className="h-2 w-2 rounded-full bg-slate-200" />
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1.5 truncate text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-1 text-xs font-medium text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------
   Student Profile Page
--------------------------------- */

export default function StudentProfilePage() {
  const params = useParams();

  // Read the student ID from the URL.
  //
  // Example:
  // /teacher/students/2
  //
  // params.studentId will contain "2".
  const studentId = Number(params.studentId);

  // Store the student received from our backend.
  const [studentFromAPI, setStudentFromAPI] =
    useState<StudentFromAPI | null>(null);

  // Keep track of whether the API request is still running.
  const [loading, setLoading] = useState(true);

  // Store an error message if the API request fails.
  const [error, setError] = useState("");

  /* --------------------------------
     Fetch One Student
  --------------------------------- */

  useEffect(() => {
    // This function gets one student from
    // our Express API using the ID from the URL.
    const fetchStudent = async () => {
      try {
        // Make sure we have a valid student ID
        // before sending the API request.
        if (!studentId || Number.isNaN(studentId)) {
          throw new Error("Invalid student ID");
        }

        // Call our backend endpoint.
        //
        // Example:
        // http://localhost:5000/api/students/2
        const response = await fetch(
          `http://localhost:5000/api/students/${studentId}`,
        );

        // If the backend returns an error such as
        // 404 Student not found, stop here.
        if (!response.ok) {
          throw new Error("Student not found");
        }

        // Convert the JSON response into JavaScript data.
        const data: StudentFromAPI = await response.json();

        // Store the real database student.
        setStudentFromAPI(data);
      } catch (error) {
        // Show the technical error in the browser console.
        console.error("Failed to load student:", error);

        // Show a simple message to the user.
        setError("Failed to load student profile.");
      } finally {
        // The API request has finished.
        setLoading(false);
      }
    };

    // Run the function when the page loads
    // or when the student ID changes.
    fetchStudent();
  }, [studentId]);

  /* --------------------------------
     Convert API Data To UI Data
  --------------------------------- */

  // Convert PostgreSQL field names into
  // the structure expected by our existing UI.
  const student: Student | null = useMemo(() => {
    // If the API hasn't returned a student yet,
    // there is nothing to convert.
    if (!studentFromAPI) {
      return null;
    }

    return {
      id: studentFromAPI.id,

      // Combine first_name and last_name
      // into the full name used by the UI.
      name: `${studentFromAPI.first_name} ${studentFromAPI.last_name}`,

      // Email comes directly from PostgreSQL.
      email: studentFromAPI.email,

      // Convert roll_no → rollNo.
      rollNo: studentFromAPI.roll_no,

      // Temporary value.
      //
      // We will replace this with the real class
      // after creating the Classes relationship.
      className: "Not assigned",

      // Temporary value.
      //
      // We will replace this with real attendance
      // after creating the Attendance table.
      attendance: 0,

      // Status comes directly from PostgreSQL.
      status: studentFromAPI.status,

      // PostgreSQL location can be NULL,
      // so provide a fallback for the UI.
      location: studentFromAPI.location ?? "Not provided",

      // Subjects will be connected later when
      // we create the Subjects/Class relationships.
      subjects: [],
    };
  }, [studentFromAPI]);

  /* --------------------------------
     Average Subject Attendance
  --------------------------------- */

  // Calculate the average attendance across
  // all subjects.
  //
  // At the moment subjects is empty, so the
  // result will be 0 until we build that part.
  const averageSubjectAttendance =
    student && student.subjects.length > 0
      ? Math.round(
          student.subjects.reduce(
            (sum, subject) => sum + subject.attendance,
            0,
          ) / student.subjects.length,
        )
      : 0;

  /* --------------------------------
     Loading State
  --------------------------------- */

  // Show this while the API request is running.
  if (loading) {
    return (
      <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-[1500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

            <p className="mt-4 text-sm font-semibold text-gray-600">
              Loading student profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------
     Error State
  --------------------------------- */

  // Show this if the API request failed.
  if (error || !student) {
    return (
      <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-[1500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Users className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-base font-bold text-gray-900">
              Unable to load student
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              {error || "Student profile could not be found."}
            </p>

            <Link
              href="/teacher/students"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Students
            </Link>
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/teacher/students"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Student Profile
              </p>

              <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                {student.name}
              </h1>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-bold ${
              student.status === "Active"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {student.status}
          </span>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {/* Student initials */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl font-bold text-indigo-600">
                {student.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {student.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {student.rollNo} · {student.className}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {student.email}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {student.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Class is not connected yet, so this remains
                visually the same but points to the current
                temporary class value. */}
            <Link
              href={`/teacher/classes/${student.className.replace(" ", "-")}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              View Class
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Attendance"
            value={`${student.attendance}%`}
            description="Overall attendance"
            color="emerald"
          />

          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Subjects"
            value={student.subjects.length}
            description="Currently enrolled"
            color="blue"
          />

          <StatCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Subject Attendance"
            value={`${averageSubjectAttendance}%`}
            description="Average across subjects"
            color="purple"
          />

          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Class"
            value={student.className}
            description={`Roll No. ${student.rollNo}`}
            color="amber"
          />
        </div>

        {/* Subject Attendance */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <BookOpen className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Subject Attendance
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Attendance performance by subject
                </p>
              </div>
            </div>
          </div>

          {/* Subjects will be empty for now because
              we have not created the subject/attendance
              database relationships yet. */}
          {student.subjects.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {student.subjects.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">
                      {subject.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 sm:block">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${subject.attendance}%`,
                        }}
                      />
                    </div>

                    <span className="w-10 text-right text-sm font-bold text-slate-700">
                      {subject.attendance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <BookOpen className="mx-auto h-6 w-6 text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No subject attendance data yet
              </p>

              <p className="mt-1 text-xs font-medium text-slate-400">
                Subject and attendance data will appear here once those
                database tables are connected.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/teacher/attendance?student=${student.id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <CheckCircle2 className="h-4 w-4" />
            Attendance
          </Link>

          <Link
            href="/teacher/assignments"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <BookOpen className="h-4 w-4" />
            Assignments
          </Link>

          <Link
            href={`/teacher/classes/${student.className.replace(" ", "-")}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <User className="h-4 w-4" />
            Class Profile
          </Link>
        </div>
      </div>
    </div>
  );
}