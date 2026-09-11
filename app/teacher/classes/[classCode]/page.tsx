import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Mail,
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react";

type PageProps = {
  params: Promise<{
    classCode: string;
  }>;
};

type Student = {
  id: number;
  name: string;
  email: string;
  rollNo: string;
  attendance: number;
  status: "Active" | "Inactive";
};

type ClassInfo = {
  name: string;
  code: string;
  room: string;
  schedule: string;
  time: string;
  attendance: number;
  subjects: string[];
  students: Student[];
};

const classData: Record<string, ClassInfo> = {
  "BCA-3A": {
    name: "BCA 3A",
    code: "BCA-3A",
    room: "Room 204",
    schedule: "Sunday, Tuesday, Thursday",
    time: "10:00 AM",
    attendance: 94,
    subjects: [
      "DBMS",
      "Web Development",
      "Data Structures",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    students: [
      {
        id: 1,
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        rollNo: "BCA3A-001",
        attendance: 96,
        status: "Active",
      },
      {
        id: 2,
        name: "Priya Thapa",
        email: "priya.thapa@example.com",
        rollNo: "BCA3A-002",
        attendance: 92,
        status: "Active",
      },
      {
        id: 3,
        name: "Rohan Karki",
        email: "rohan.karki@example.com",
        rollNo: "BCA3A-003",
        attendance: 89,
        status: "Active",
      },
      {
        id: 4,
        name: "Sneha Adhikari",
        email: "sneha.adhikari@example.com",
        rollNo: "BCA3A-004",
        attendance: 97,
        status: "Active",
      },
      {
        id: 5,
        name: "Suman Rai",
        email: "suman.rai@example.com",
        rollNo: "BCA3A-005",
        attendance: 91,
        status: "Active",
      },
    ],
  },

  "BCA-3B": {
    name: "BCA 3B",
    code: "BCA-3B",
    room: "Room 205",
    schedule: "Sunday, Tuesday, Thursday",
    time: "11:30 AM",
    attendance: 91,
    subjects: [
      "DBMS",
      "Web Development",
      "Data Structures",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    students: [],
  },

  "BCA-4A": {
    name: "BCA 4A",
    code: "BCA-4A",
    room: "Room 301",
    schedule: "Monday, Wednesday, Friday",
    time: "9:00 AM",
    attendance: 96,
    subjects: [
      "Data Science",
      "Artificial Intelligence",
      "Cloud Computing",
      "Software Engineering",
      "Web Technology",
      "Project Management",
      "Cyber Security",
    ],
    students: [],
  },

  "CSIT-5A": {
    name: "CSIT 5A",
    code: "CSIT-5A",
    room: "Lab 02",
    schedule: "Monday, Wednesday, Friday",
    time: "1:00 PM",
    attendance: 92,
    subjects: [
      "Data Science",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence",
      "Database Systems",
      "Web Technology",
      "Project",
    ],
    students: [],
  },

  "BIT-2A": {
    name: "BIT 2A",
    code: "BIT-2A",
    room: "Room 102",
    schedule: "Sunday, Tuesday, Thursday",
    time: "2:00 PM",
    attendance: 89,
    subjects: [
      "Programming",
      "Database Systems",
      "Web Development",
      "Computer Architecture",
      "Mathematics",
    ],
    students: [],
  },

  "BCA-6A": {
    name: "BCA 6A",
    code: "BCA-6A",
    room: "Room 401",
    schedule: "Monday, Wednesday, Friday",
    time: "3:30 PM",
    attendance: 98,
    subjects: [
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Project",
      "Cloud Computing",
      "Cyber Security",
    ],
    students: [],
  },
};

export default async function ManageClassPage({ params }: PageProps) {
  const { classCode } = await params;

  const normalizedCode = decodeURIComponent(classCode)
    .trim()
    .toUpperCase();

  const currentClass = classData[normalizedCode];

  if (!currentClass) {
    return (
      <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Class Not Found
            </h1>

            <p className="mt-2 text-sm font-medium text-gray-500">
              The class &quot;{classCode}&quot; does not exist.
            </p>

            <Link
              href="/teacher/classes"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Classes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Back */}
        <Link
          href="/teacher/classes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Classes
        </Link>

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <GraduationCap className="h-4 w-4" />
              Class Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {currentClass.name}
            </h1>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Manage students, attendance, subjects and class activities.
            </p>
          </div>

          {/* <Link
            href={`/teacher/attendance?class=${encodeURIComponent(
              currentClass.code,
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <ClipboardCheck className="h-4 w-4" />
            Take Attendance
          </Link> */}
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Students"
            value={currentClass.students.length || "—"}
            description={
              currentClass.students.length
                ? "Students enrolled"
                : "Student data pending"
            }
          />

          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Attendance"
            value={`${currentClass.attendance}%`}
            description="Class average"
          />

          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Subjects"
            value={currentClass.subjects.length}
            description="Assigned subjects"
          />

          <StatCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Classroom"
            value={currentClass.room}
            description={currentClass.time}
          />
        </div>

        {/* Class Information */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-base font-bold text-gray-900">
              Class Information
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Overview of this class schedule and details.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <InfoBox label="Class Code" value={currentClass.code} />

            <InfoBox label="Classroom" value={currentClass.room} />

            <InfoBox label="Schedule" value={currentClass.schedule} />

            <InfoBox label="Time" value={currentClass.time} />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Quickly access common class management tasks.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              href={`/teacher/attendance?class=${encodeURIComponent(
                currentClass.code,
              )}`}
              icon={<ClipboardCheck className="h-5 w-5" />}
              title="Take Attendance"
              description="Record today's attendance"
            />

            <QuickAction
              href="/teacher/assignments/new"
              icon={<Plus className="h-5 w-5" />}
              title="Create Assignment"
              description="Create a new assignment"
            />

            <QuickAction
              href="/teacher/materials"
              icon={<BookOpen className="h-5 w-5" />}
              title="Class Materials"
              description="Manage learning resources"
            />

            <QuickAction
              href="#students"
              icon={<Users className="h-5 w-5" />}
              title="View Students"
              description="Manage enrolled students"
            />
          </div>
        </section>

        {/* Subjects */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Subjects
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Subjects currently assigned to this class.
              </p>
            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
              {currentClass.subjects.length} Subjects
            </span>
          </div>

          <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentClass.subjects.map((subject, index) => (
              <div
                key={subject}
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-indigo-600 shadow-sm ring-1 ring-gray-200">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="truncate text-sm font-semibold text-gray-800">
                    {subject}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-indigo-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Students */}
        <section
          id="students"
          className="rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Students
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Students enrolled in {currentClass.name}.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </button>
          </div>

          {currentClass.students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Student
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Roll No.
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

                <tbody className="divide-y divide-gray-100">
                  {currentClass.students.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
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

                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        {student.rollNo}
                      </td>

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

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                          {student.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          aria-label={`More options for ${student.name}`}
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-gray-900">
                No students added yet
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm font-medium text-gray-500">
                Students enrolled in this class will appear here.
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Student
              </button>
            </div>
          )}
        </section>

        {/* Footer note */}
        <div className="pb-2 text-center">
          <p className="text-xs font-medium text-gray-400">
            Managing {currentClass.name} · {currentClass.code}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Reusable Components
--------------------------------- */

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-gray-500">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-gray-400">
        {description}
      </p>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
          {icon}
        </div>

        <ArrowRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-xs font-medium text-gray-500">
        {description}
      </p>
    </Link>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}