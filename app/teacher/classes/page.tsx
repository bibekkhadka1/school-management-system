"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Users,
  CalendarDays,
  Clock3,
  MapPin,
  BookOpen,
  ChevronDown,
  Grid3X3,
  List,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";

type ClassItem = {
  id: number;
  code: string;
  name: string;
  students: number;
  room: string;
  schedule: string;
  time: string;
  attendance: number;

  subjects: {
    id: number;
    name: string;
    code: string;
  }[];
  status: "Active" | "Upcoming";
};

type ClassFromAPI = {
  id: number;
  name: string;
  code: string;
  room: string;
  capacity: number;
  schedule: string;
  class_time: string;
  status: "Active" | "Upcoming";
  created_at: string;

  student_count: number;

  // Subjects assigned to this class
  subjects: {
    id: number;
    name: string;
    code: string;
  }[];

  // Attendance percentage calculated by the backend
  attendance: number | string;
};

// This describes the complete response returned by
// the /api/classes backend endpoint.
type ClassesAPIResponse = {
  // All class records returned from the database
  classes: ClassFromAPI[];

  // Overall attendance calculated from ALL attendance records
  overallAttendance: number;
};

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  hoverColor: "blue" | "emerald" | "purple" | "amber";
};

// export default function ClassesPage() {
//   const router = useRouter();

//   const [search, setSearch] = useState("");
//   const [subject, setSubject] = useState("All Subjects");
//   const [view, setView] = useState<"grid" | "list">("grid");

export default function ClassesPage() {
  const router = useRouter();

  // Stores classes received from the backend
  const [classes, setClasses] = useState<ClassItem[]>([]);
  // Stores the overall attendance percentage
  // calculated by the backend from all attendance records.
  const [overallAttendance, setOverallAttendance] = useState(0);

  // Keeps track of whether the database data is still loading
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Create the subject filter options from the subjects
  // returned by the database through the classes API.
  const subjectOptions = useMemo(() => {
    const subjectMap = new Map<string, string>();

    classes.forEach((classItem) => {
      classItem.subjects.forEach((itemSubject) => {
        // Use the subject code as the unique key.
        // The subject name is what we show in the dropdown.
        subjectMap.set(itemSubject.code, itemSubject.name);
      });
    });

    return ["All Subjects", ...Array.from(subjectMap.values()).sort()];
  }, [classes]);

  // Fetch classes from the Express backend when the page loads
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Send a request to our backend API
        const response = await fetch("http://localhost:5000/api/classes");

        // Check whether the backend returned a successful response
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        // The backend now returns both the classes
        // and the overall attendance percentage.
        const data: ClassesAPIResponse = await response.json();

        console.log(
          "CLASS ATTENDANCE DATA:",
          data.classes.map((item) => ({
            class: item.code,
            attendance: item.attendance,
            type: typeof item.attendance,
          })),
        );

        // Convert database data into the format
        // already expected by our existing Classes UI
        const formattedClasses: ClassItem[] = data.classes.map((item) => ({
          id: item.id,
          code: item.code,
          name: item.name,

          // Students will be connected later
          students: item.student_count,

          room: item.room,
          schedule: item.schedule,

          // Database uses "class_time"
          // but our UI uses "time"
          time: item.class_time,

          // Convert PostgreSQL numeric value into a JavaScript number
          attendance: Number(item.attendance),

          subjects: item.subjects,

          status: item.status,
        }));

        // Put the converted classes into React state
        setClasses(formattedClasses);

        // Store the overall attendance calculated by the backend.
        setOverallAttendance(Number(data.overallAttendance));
      } catch (error) {
        // Show any API/database error in the browser console
        console.error("Failed to fetch classes:", error);
      } finally {
        // Loading is finished whether the request succeeded or failed
        setLoading(false);
      }
    };

    // Run the function
    fetchClasses();
  }, []);

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return classes.filter((item) => {
      const matchesSearch =
        !query ||
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.room.toLowerCase().includes(query);

      // Subject filtering is left as a UI filter for now because
      // the current class data does not contain subject assignments.
      // Check whether the selected subject is actually assigned to this class
      const matchesSubject =
        subject === "All Subjects" ||
        item.subjects.some(
          (itemSubject) =>
            itemSubject.code.toLowerCase() === subject.toLowerCase() ||
            itemSubject.name.toLowerCase() === subject.toLowerCase(),
        );

      return matchesSearch && matchesSubject;
    });
  }, [classes, search, subject]);

  const totalStudents = classes.reduce(
    (total, item) => total + item.students,
    0,
  );

  const averageAttendance =
    classes.length > 0
      ? classes.reduce((total, item) => total + item.attendance, 0) /
        classes.length
      : 0;

  const activeClasses = classes.filter(
    (item) => item.status === "Active",
  ).length;

  const upcomingClasses = classes.filter(
    (item) => item.status === "Upcoming",
  ).length;

  const clearFilters = () => {
    setSearch("");
    setSubject("All Subjects");
  };
  // Show a loading message while classes are being fetched
  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50/60 p-6">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

          <p className="mt-3 text-sm font-semibold text-slate-600">
            Loading classes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <BookOpen className="h-4 w-4" />
              <span>Academic Management</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Classes
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Manage your classes, students, schedules and academic information.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Classes"
            value={classes.length}
            description={`${activeClasses} active classes`}
            icon={<BookOpen className="h-5 w-5" />}
            hoverColor="blue"
          />

          <StatCard
            title="Total Students"
            value={totalStudents}
            description="Across all classes"
            icon={<Users className="h-5 w-5" />}
            hoverColor="emerald"
          />

          <StatCard
            title="Average Attendance"
           value={`${overallAttendance.toFixed(1)}%`}
            description="Across all classes"
            icon={<TrendingUp className="h-5 w-5" />}
            hoverColor="purple"
          />

          <StatCard
            title="Upcoming Classes"
            value={upcomingClasses}
            description="Scheduled classes"
            icon={<CalendarDays className="h-5 w-5" />}
            hoverColor="amber"
          />
        </div>

        {/* Toolbar */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search classes..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Subject */}
              <div className="relative sm:w-56">
                <select
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {subjectOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              {search || subject !== "All Subjects" ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Clear filters
                </button>
              ) : (
                <span className="text-sm font-medium text-slate-400">
                  {filteredClasses.length} classes
                </span>
              )}

              {/* View toggle */}
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`rounded-md p-2 transition ${
                    view === "grid"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`rounded-md p-2 transition ${
                    view === "list"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Classes</h2>
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              Select a class to manage students and academic details.
            </p>
          </div>

          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:inline-flex">
            {filteredClasses.length} classes
          </span>
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : view === "grid" ? (
          /* Grid */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredClasses.map((item) => (
              <div
                key={item.code}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                {/* Card Header */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-slate-900">
                        {item.code}
                      </h3>

                      <p className="truncate text-xs font-medium text-slate-500">
                        {item.name}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      item.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <DetailRow
                    icon={<Users className="h-4 w-4" />}
                    label="Students"
                    value={`${item.students} students`}
                  />

                  <DetailRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="Classroom"
                    value={item.room}
                  />

                  <DetailRow
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Schedule"
                    value={item.schedule}
                  />

                  <DetailRow
                    icon={<Clock3 className="h-4 w-4" />}
                    label="Time"
                    value={item.time}
                  />

                  <DetailRow
                    icon={<BookOpen className="h-4 w-4" />}
                    label="Subjects"
                    value={`${item.subjects.length} subjects`}
                  />
                </div>

                {/* Attendance */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Attendance
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {item.attendance}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all"
                      style={{ width: `${item.attendance}%` }}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-400">
                    Manage class
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/teacher/classes/${encodeURIComponent(item.id)}`,
                      )
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    aria-label={`Manage ${item.id}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List */
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.3fr_0.8fr_1fr_0.8fr_0.8fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid">
              <span>Class</span>
              <span>Students</span>
              <span>Schedule</span>
              <span>Room</span>
              <span>Attendance</span>
              <span />
            </div>

            {filteredClasses.map((item) => (
              <div
                key={item.code}
                className="grid gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr_0.8fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">
                      {item.code}
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {item.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Users className="h-4 w-4 text-slate-400" />
                  {item.students}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {item.schedule}
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    {item.time}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {item.room}
                </div>

                <div>
                  <span className="text-sm font-bold text-slate-900">
                    {item.attendance}%
                  </span>

                  <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${item.attendance}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/teacher/classes/${encodeURIComponent(item.id)}`,
                    )
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  aria-label={`Manage ${item.id}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredClasses.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredClasses.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {classes.length}
              </span>{" "}
              classes
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-300"
              >
                Previous
              </button>

              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   KPI CARD
   ========================================================= */

function StatCard({
  title,
  value,
  description,
  icon,
  hoverColor,
}: StatCardProps) {
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
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      </div>

      <p className="text-sm font-semibold text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-400">{description}</p>
    </div>
  );
}

/* =========================================================
   DETAIL ROW
   ========================================================= */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-semibold">{label}</span>
      </div>

      <span className="truncate text-right text-xs font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
   ========================================================= */

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Search className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No classes found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm font-medium text-slate-500">
        Try changing your search or filter to find the class you are looking
        for.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Clear filters
      </button>
    </div>
  );
}
