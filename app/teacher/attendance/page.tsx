"use client";

import { useEffect, useMemo, useState } from "react";
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

type ClassItem = {
  id: number;
  name: string;
  code: string;
  room: string;
  capacity: number;
  schedule: string | null;
  class_time: string | null;
  status: "Active" | "Upcoming";
  created_at: string;
  student_count: number;
};

type Subject = {
  id: number;
  name: string;
  code: string;
};

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  hoverColor: "blue" | "emerald" | "rose" | "purple";
};

export default function AttendancePage() {
  // Classes loaded from PostgreSQL
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // Store the actual database class ID
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  // Subjects belonging to the selected class.
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Store the selected database subject ID.
  const [selectedSubject, setSelectedSubject] = useState("");

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [search, setSearch] = useState("");

  // Students loaded from PostgreSQL
  const [attendance, setAttendance] = useState<Student[]>([]);

  // Show loading while students are being fetched
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [saved, setSaved] = useState(false);
  // Stores a message that should be shown to the user on the page.
  const [errorMessage, setErrorMessage] = useState("");

  /* ===================================================== */
  /* CURRENT CLASS */
  /* ===================================================== */

  const currentClass = useMemo(() => {
    return classes.find((item) => item.id === selectedClassId);
  }, [classes, selectedClassId]);

  /* ===================================================== */
  /* LOAD STUDENTS FROM DATABASE */
  /* ===================================================== */
  // Load students and subjects whenever the selected class changes.
  useEffect(() => {
    const loadClassData = async () => {
      // Don't request anything until a class has been selected.
      if (!selectedClassId) {
        setAttendance([]);
        setSubjects([]);
        setSelectedSubject("");
        return;
      }

      try {
        setLoadingStudents(true);

        // Get the selected class, its students, and its subjects.
        const response = await fetch(
          `http://localhost:5000/api/classes/${selectedClassId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch class students");
        }

        const classData = await response.json();

        // Store subjects assigned to this class.
        setSubjects(classData.subjects ?? []);

        // Automatically select the first subject
        // only when the class changes.
        if (classData.subjects && classData.subjects.length > 0) {
          setSelectedSubject(String(classData.subjects[0].id));
        } else {
          setSelectedSubject("");
        }

        // Convert database students into the format
        // already used by the attendance UI.
        const databaseStudents: Student[] = classData.students.map(
          (student: {
            id: number;
            first_name: string;
            last_name: string;
            roll_no: string;
          }) => ({
            id: student.id,
            name: `${student.first_name} ${student.last_name}`,
            rollNo: student.roll_no,
            status: "present",
            reason: "",
          }),
        );

        setAttendance(databaseStudents);
      } catch (error) {
        console.error("Failed to load class data:", error);
        setAttendance([]);
      } finally {
        setLoadingStudents(false);
      }
    };

    loadClassData();
  }, [selectedClassId]);

  // Load saved attendance whenever
  // the selected class, subject, or date changes.
  useEffect(() => {
    const loadAttendance = async () => {
      // Don't request attendance until all required values exist.
      if (!selectedClassId || !selectedSubject || !selectedDate) {
        return;
      }

      try {
        // Get attendance for this exact class + subject + date.
        const response = await fetch(
          `http://localhost:5000/api/attendance?classId=${selectedClassId}&subjectId=${selectedSubject}&date=${selectedDate}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance");
        }

        const savedAttendance = await response.json();

        // Create a lookup using student ID.
        // Store both the attendance status and reason.
        // Create a lookup using student ID.
        // Each student maps to both their saved status and reason.
        const attendanceMap = new Map<
          number,
          {
            status: "Present" | "Absent" | "Late";
            reason: string;
          }
        >();

        savedAttendance.forEach(
          (record: {
            student_id: number;
            status: "Present" | "Absent" | "Late";
            reason: string | null;
          }) => {
            attendanceMap.set(record.student_id, {
              status: record.status,
              reason: record.reason ?? "",
            });
          },
        );

        // Apply both the saved status and saved reason
        // to the students already displayed on the page.
        // Apply the saved status and reason to the students.
        setAttendance((currentStudents) =>
          currentStudents.map((student) => {
            const savedAttendance = attendanceMap.get(student.id);

            return {
              ...student,

              // Restore the saved status.
              status: savedAttendance
                ? savedAttendance.status === "Present"
                  ? "present"
                  : savedAttendance.status === "Absent"
                    ? "absent"
                    : "late"
                : "present",

              // Restore the saved reason.
              reason: savedAttendance ? savedAttendance.reason : "",
            };
          }),
        );
      } catch (error) {
        console.error("Failed to load attendance:", error);
      }
    };

    loadAttendance();
  }, [selectedClassId, selectedSubject, selectedDate]);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/classes");

        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        // The backend returns an object:
        // {
        //   classes: [...],
        //   overallAttendance: number
        // }
        const data = await response.json();

        // Extract only the classes array.
        // This keeps the existing classes state as an array.
        setClasses(data.classes);

        // Automatically select the first class.
        if (data.classes.length > 0) {
          setSelectedClassId(data.classes[0].id);
        }
      } catch (error) {
        console.error("Failed to load classes:", error);
      }
    };

    loadClasses();
  }, []);

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
        student.name.toLowerCase().includes(searchValue) ||
        student.rollNo.toLowerCase().includes(searchValue),
    );
  }, [search, attendance]);

  /* ===================================================== */
  /* STATISTICS */
  /* ===================================================== */

  const totalStudents = attendance.length;

  const presentCount = attendance.filter(
    (student) => student.status === "present",
  ).length;

  const absentCount = attendance.filter(
    (student) => student.status === "absent",
  ).length;

  const lateCount = attendance.filter(
    (student) => student.status === "late",
  ).length;
  /* ===================================================== */
  /* ATTENDANCE PERCENTAGE */
  /* ===================================================== */

  // Calculate attendance percentage from students marked Present.
  // This matches the attendance calculation currently used by the backend.
  const attendancePercentage =
    totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  /* ===================================================== */
  /* UPDATE STATUS */
  /* ===================================================== */

  const updateStatus = (id: number, status: AttendanceStatus) => {
    setAttendance((current) =>
      current.map((student) =>
        student.id === id
          ? {
              ...student,
              status,
            }
          : student,
      ),
    );

    setSaved(false);
  };

  /* ===================================================== */
  /* UPDATE REASON */
  /* ===================================================== */

  const updateReason = (studentId: number, reason: string) => {
    setAttendance((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              reason,
            }
          : student,
      ),
    );

    // Remove the old success message when something is changed.
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
      })),
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
      })),
    );

    setSaved(false);
  };

  /* ===================================================== */
  /* SAVE ATTENDANCE */
  /* ===================================================== */

  const handleSave = async () => {
    // Make sure a database class has been selected.
    if (!selectedClassId) {
      // Show the error message on the page instead of the browser console.
      setErrorMessage("Please select a class before saving attendance.");
      return;
    }
    // Make sure a subject has been selected.
    if (!selectedSubject) {
      setErrorMessage("Please select a subject before saving attendance.");
      return;
    }

    try {
      // Clear any previous error message.
      setErrorMessage("");

      const payload = {
        // Use the selected database class ID.
        classId: selectedClassId,
        subjectId: Number(selectedSubject),
        date: selectedDate,

        students: attendance.map((student) => ({
          studentId: student.id,

          // Send the attendance status to the backend.
          status:
            student.status === "present"
              ? "Present"
              : student.status === "absent"
                ? "Absent"
                : "Late",

          // Send the reason/remark to the backend.
          reason: student.reason,
        })),
      };

      const response = await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save attendance");
      }

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to save attendance:", error);

      // Show the save error on the page.
      setErrorMessage("Failed to save attendance. Please try again.");
    }
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
              Record and manage student attendance for your classes.
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

          {saved && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              Attendance saved successfully.
            </div>
          )}
        </div>

        {/* ==================== SUCCESS ALERT ==================== */}

        {errorMessage && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {errorMessage}
          </div>
        )}
        {/* ==================== KPI CARDS ==================== */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users size={18} />}
            label="Total Students"
            value={totalStudents}
            description="Students in this class"
            hoverColor="blue"
          />

          <StatCard
            icon={<UserCheck size={18} />}
            label="Present"
            value={presentCount}
            description="Marked present"
            hoverColor="emerald"
          />

          <StatCard
            icon={<UserX size={18} />}
            label="Absent"
            value={absentCount}
            description="Marked absent"
            hoverColor="rose"
          />

          <StatCard
            icon={<Clock3 size={18} />}
            label="Attendance"
            value={`${attendancePercentage}%`}
            description={`${lateCount} student(s) late`}
            hoverColor="purple"
          />
        </div>

        {/* ==================== SESSION SETTINGS ==================== */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-900">
              Attendance Session
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Select the class, subject and date for this attendance session.
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
                  value={selectedClassId ?? ""}
                  onChange={(e) => {
                    const classId = Number(e.target.value);

                    // Store the selected database class ID.
                    setSelectedClassId(classId);

                    // Reset the saved message when the class changes.
                    setSaved(false);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  {classes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.code} — {item.name}
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
                    // Store the selected database subject ID.
                    setSelectedSubject(e.target.value);

                    // Reset the saved message when the subject changes.
                    setSaved(false);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={String(subject.id)}>
                      {subject.code} — {subject.name}
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
                {currentClass
                  ? `${currentClass.code} — ${currentClass.name}`
                  : "Select a class"}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Subject
              </span>
              <p className="mt-0.5 text-xs font-bold text-slate-700">
                {subjects.find(
                  (subject) => String(subject.id) === selectedSubject,
                )
                  ? `${
                      subjects.find(
                        (subject) => String(subject.id) === selectedSubject,
                      )?.code
                    } — ${
                      subjects.find(
                        (subject) => String(subject.id) === selectedSubject,
                      )?.name
                    }`
                  : "Select a subject"}
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
                  Mark attendance for{" "}
                  {currentClass
                    ? `${currentClass.code} — ${currentClass.name}`
                    : "the selected class"}
                  .
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
                {loadingStudents ? (
                  /* Show a simple loading message while students are coming from the backend. */
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        {/* Loading spinner */}
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                        <p className="mt-4 text-sm font-bold text-slate-700">
                          Loading students...
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Getting students from the database.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  /* Show students after the backend request finishes. */
                  filteredStudents.map((student) => (
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
                            onClick={() => updateStatus(student.id, "present")}
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
                            onClick={() => updateStatus(student.id, "absent")}
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
                            onClick={() => updateStatus(student.id, "late")}
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
                            updateReason(student.id, e.target.value)
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
                  ))
                )}
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
              <AlertCircle size={14} className="text-slate-400" />

              <span>
                {filteredStudents.length} of {totalStudents} students
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
  hoverColor,
}: StatCardProps) {
  const hoverClasses = {
    blue: "hover:border-blue-300",
    emerald: "hover:border-emerald-300",
    rose: "hover:border-rose-300",
    purple: "hover:border-purple-300",
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md ${hoverClasses[hoverColor]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">{label}</p>

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
