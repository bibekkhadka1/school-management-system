"use client";

import { useState } from "react";
import { ClipboardCheck, Check, X, Clock } from "lucide-react";

const students = [
  { id: 1, roll: "01", name: "Aarav Sharma" },
  { id: 2, roll: "02", name: "Priya Thapa" },
  { id: 3, roll: "03", name: "Rohan Karki" },
  { id: 4, roll: "04", name: "Anisha Rai" },
  { id: 5, roll: "05", name: "Sujan KC" },
];

type Status = "present" | "absent" | "late";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Record<number, Status>>({
    1: "present",
    2: "present",
    3: "absent",
    4: "present",
    5: "late",
  });

  const updateStatus = (id: number, status: Status) => {
    setAttendance((previous) => ({
      ...previous,
      [id]: status,
    }));
  };

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Record and manage student attendance.
        </p>
      </div>

      {/* Selection */}
      <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl border bg-white p-5 md:grid-cols-3">

        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Class
          </label>

          <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none">
            <option>BCA 3A</option>
            <option>BCA 3B</option>
            <option>BCA 4A</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Subject
          </label>

          <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none">
            <option>Database Management Systems</option>
            <option>Web Development</option>
            <option>Data Science</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
          />
        </div>

      </div>

      {/* Attendance */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-2">
            <ClipboardCheck size={18} className="text-blue-600" />

            <h2 className="text-sm font-semibold">
              Mark Attendance
            </h2>
          </div>

          <div className="text-xs text-gray-500">
            5 Students
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b bg-gray-50 text-xs text-gray-500">
                <th className="px-5 py-3">Roll</th>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Attendance</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-0"
                >

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.roll}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {student.name}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          updateStatus(student.id, "present")
                        }
                        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium ${
                          attendance[student.id] === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Check size={13} />
                        Present
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(student.id, "absent")
                        }
                        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium ${
                          attendance[student.id] === "absent"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <X size={13} />
                        Absent
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(student.id, "late")
                        }
                        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium ${
                          attendance[student.id] === "late"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Clock size={13} />
                        Late
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="flex justify-end border-t p-5">

          <button className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-medium text-white hover:bg-blue-700">
            Save Attendance
          </button>

        </div>

      </div>

    </div>
  );
}