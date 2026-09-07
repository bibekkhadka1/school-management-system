"use client";

import { ClipboardCheck } from "lucide-react";

const attendance = [
  {
    className: "BCA 3A",
    subject: "DBMS",
    present: "42/45",
    status: "DONE",
  },
  {
    className: "BCA 3B",
    subject: "Web Dev",
    present: "38/40",
    status: "DONE",
  },
  {
    className: "BCA 4A",
    subject: "Data Science",
    present: "40/44",
    status: "PENDING",
  },
];

export default function TodaysAttendance() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <ClipboardCheck size={18} className="text-blue-600" />

          <h2 className="text-sm font-semibold text-gray-900">
            Today&apos;s Attendance Summary
          </h2>
        </div>

        <button className="text-xs font-medium text-blue-600 hover:underline">
          Full Report
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b text-[10px] uppercase text-gray-400">
              <th className="pb-3">Class</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Present</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-0"
              >

                <td className="py-3 text-xs font-medium text-gray-700">
                  {item.className}
                </td>

                <td className="py-3 text-xs text-gray-500">
                  {item.subject}
                </td>

                <td className="py-3 text-xs font-medium text-gray-700">
                  {item.present}
                </td>

                <td className="py-3">

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                      item.status === "DONE"
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}