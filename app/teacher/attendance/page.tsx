"use client";

import { useMemo, useState } from "react";
import {
  ClipboardCheck,
  Search,
  Save,
  Users,
  UserCheck,
  UserX,
  Clock3,
  CalendarDays,
  ChevronDown,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

type AttendanceStatus = "present" | "absent" | "late";

type Student = {
  id: number;
  name: string;
  rollNo: string;
  status: AttendanceStatus;
  reason: string;
};

const students: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNo: "BCA-3A-001",
    status: "present",
    reason: "",
  },
  {
    id: 2,
    name: "Anish Gautam",
    rollNo: "BCA-3A-002",
    status: "present",
    reason: "",
  },
  {
    id: 3,
    name: "Aayush Karki",
    rollNo: "BCA-3A-003",
    status: "absent",
    reason: "",
  },
  {
    id: 4,
    name: "Bibek Thapa",
    rollNo: "BCA-3A-004",
    status: "present",
    reason: "",
  },
  {
    id: 5,
    name: "Dipesh Adhikari",
    rollNo: "BCA-3A-005",
    status: "late",
    reason: "Arrived late",
  },
  {
    id: 6,
    name: "Kiran Shrestha",
    rollNo: "BCA-3A-006",
    status: "present",
    reason: "",
  },
  {
    id: 7,
    name: "Nischal Rai",
    rollNo: "BCA-3A-007",
    status: "present",
    reason: "",
  },
  {
    id: 8,
    name: "Pratik Bhandari",
    rollNo: "BCA-3A-008",
    status: "absent",
    reason: "",
  },
  {
    id: 9,
    name: "Rohan Karki",
    rollNo: "BCA-3A-009",
    status: "present",
    reason: "",
  },
  {
    id: 10,
    name: "Suman Rai",
    rollNo: "BCA-3A-010",
    status: "present",
    reason: "",
  },
];

const classOptions = [
  {
    value: "BCA-3A",
    label: "BCA 3rd Semester A",
    subject: "DBMS",
  },
  {
    value: "BCA-3B",
    label: "BCA 3rd Semester B",
    subject: "Web Development",
  },
  {
    value: "BCA-4A",
    label: "BCA 4th Semester A",
    subject: "Data Science & AI",
  },
  {
    value: "CSIT-5A",
    label: "BSc CSIT 5th Semester",
    subject: "Operating Systems",
  },
  {
    value: "BIT-2A",
    label: "BIT 2nd Semester A",
    subject: "Object-Oriented Programming",
  },
  {
    value: "BCA-6A",
    label: "BCA 6th Semester A",
    subject: "Mobile Application Dev",
  },
];

const subjectOptions = [
  "DBMS",
  "Web Development",
  "Data Science & AI",
  "Operating Systems",
  "Object-Oriented Programming",
  "Mobile Application Dev",
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("BCA-3A");

  const [selectedSubject, setSelectedSubject] =
    useState("DBMS");

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [search, setSearch] = useState("");

  const [attendance, setAttendance] =
    useState<Student[]>(students);

  const [saved, setSaved] = useState(false);

  /* ===================================================== */
  /* CURRENT CLASS */
  /* ===================================================== */

  const currentClass = useMemo(() => {
    return (
      classOptions.find(
        (item) => item.value === selectedClass
      ) || classOptions[0]
    );
  }, [selectedClass]);

  /* ===================================================== */
  /* FILTER STUDENTS */
  /* ===================================================== */

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return attendance;
    }

    return attendance.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(searchValue) ||
        student.rollNo
          .toLowerCase()
          .includes(searchValue)
    );
  }, [search, attendance]);

  /* ===================================================== */
  /* STATISTICS */
  /* ===================================================== */

  const totalStudents = attendance.length;

  const presentCount = attendance.filter(
    (student) => student.status === "present"
  ).length;

  const absentCount = attendance.filter(
    (student) => student.status === "absent"
  ).length;

  const lateCount = attendance.filter(
    (student) => student.status === "late"
  ).length;

  const attendancePercentage =
    totalStudents > 0
      ? Math.round(
          ((presentCount + lateCount) / totalStudents) *
            100
        )
      : 0;

  /* ===================================================== */
  /* UPDATE STATUS */
  /* ===================================================== */

  const updateStatus = (
    id: number,
    status: AttendanceStatus
  ) => {
    setAttendance((current) =>
      current.map((student) =>
        student.id === id
          ? {
              ...student,
              status,
            }
          : student
      )
    );

    setSaved(false);
  };

  /* ===================================================== */
  /* UPDATE REASON */
  /* ===================================================== */

  const updateReason = (
    id: number,
    reason: string
  ) => {
    setAttendance((current) =>
      current.map((student) =>
        student.id === id
          ? {
              ...student,
              reason,
            }
          : student
      )
    );

    setSaved(false);
  };

  /* ===================================================== */
  /* MARK ALL PRESENT */
  /* ===================================================== */

  const markAllPresent = () => {
    setAttendance((current) =>
      current.map((student) => ({
        ...student,
        status: "present",
        reason: "",
      }))
    );

    setSaved(false);
  };

  /* ===================================================== */
  /* MARK ALL ABSENT */
  /* ===================================================== */

  const markAllAbsent = () => {
    setAttendance((current) =>
      current.map((student) => ({
        ...student,
        status: "absent",
      }))
    );

    setSaved(false);
  };

  /* ===================================================== */
  /* SAVE ATTENDANCE */
  /* ===================================================== */

  const handleSave = () => {
    const payload = {
      class: selectedClass,
      subject: selectedSubject,
      date: selectedDate,
      students: attendance,
    };

    console.log("Attendance:", payload);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1500px]">

        {/* ==================== HEADER ==================== */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <ClipboardCheck size={15} />
              Academic Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Attendance
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Record and manage student attendance for your
              classes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-600"
          >
            <Save size={17} />
            Save Attendance
          </button>
        </div>

        {/* ==================== SUCCESS ALERT ==================== */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <Check size={17} />

            Attendance has been saved successfully.
          </div>
        )}

        {/* ==================== KPI CARDS ==================== */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users size={18} />}
            label="Total Students"
            value={totalStudents}
            description="Students in this class"
          />

          <StatCard
            icon={<UserCheck size={18} />}
            label="Present"
            value={presentCount}
            description="Marked present"
          />

          <StatCard
            icon={<UserX size={18} />}
            label="Absent"
            value={absentCount}
            description="Marked absent"
          />

          <StatCard
            icon={<Clock3 size={18} />}
            label="Attendance"
            value={`${attendancePercentage}%`}
            description={`${lateCount} student(s) late`}
          />
        </div>

        {/* ==================== SESSION SETTINGS ==================== */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-900">
              Attendance Session
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Select the class, subject and date for this
              attendance session.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* Class */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Class
              </label>

              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    const value = e.target.value;

                    setSelectedClass(value);

                    const selected = classOptions.find(
                      (item) => item.value === value
                    );

                    if (selected) {
                      setSelectedSubject(selected.subject);
                    }

                    setSaved(false);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  {classOptions.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.value} — {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Subject
              </label>

              <div className="relative">
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setSaved(false);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  {subjectOptions.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSaved(false);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Current Session Info */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Selected Class
              </span>

              <p className="mt-0.5 text-xs font-bold text-slate-700">
                {currentClass.label}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Subject
              </span>

              <p className="mt-0.5 text-xs font-bold text-slate-700">
                {selectedSubject}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Date
              </span>

              <p className="mt-0.5 text-xs font-bold text-slate-700">
                {selectedDate}
              </p>
            </div>
          </div>
        </div>

        {/* ==================== ATTENDANCE TABLE ==================== */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Student Attendance
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Mark attendance for {currentClass.label}.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={markAllPresent}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-[11px] font-bold text-emerald-700 transition hover:bg-emerald-100"
                >
                  <Check size={14} />
                  Mark All Present
                </button>

                <button
                  type="button"
                  onClick={markAllAbsent}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  <X size={14} />
                  Mark All Absent
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mt-5">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student name or roll number..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Roll Number
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Attendance Status
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Reason
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    {/* Student */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                          {student.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {student.name}
                          </p>

                          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                            Student
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Roll Number */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold text-slate-600">
                        {student.rollNo}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              student.id,
                              "present"
                            )
                          }
                          className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                            student.status === "present"
                              ? "bg-emerald-600 text-white"
                              : "border border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                          }`}
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              student.id,
                              "absent"
                            )
                          }
                          className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                            student.status === "absent"
                              ? "bg-rose-600 text-white"
                              : "border border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                          }`}
                        >
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              student.id,
                              "late"
                            )
                          }
                          className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                            student.status === "late"
                              ? "bg-amber-500 text-white"
                              : "border border-slate-200 bg-white text-slate-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>

                    {/* Reason */}
                    <td className="px-5 py-4">
                      <input
                        type="text"
                        value={student.reason}
                        onChange={(e) =>
                          updateReason(
                            student.id,
                            e.target.value
                          )
                        }
                        placeholder={
                          student.status === "present"
                            ? "Optional note"
                            : "Enter reason..."
                        }
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty Search State */}
          {filteredStudents.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Search size={20} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900">
                No students found
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Try searching with another name or roll number.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <AlertCircle
                size={14}
                className="text-slate-400"
              />

              <span>
                {filteredStudents.length} of{" "}
                {totalStudents} students
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Present {presentCount}
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Absent {absentCount}
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Late {lateCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* STAT CARD */
/* ========================================================= */

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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}