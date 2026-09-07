"use client";

import {
  Plus,
  FileText,
  CalendarDays,
  Eye,
  Award,
} from "lucide-react";

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
  return (
    <div className="p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Exams &amp; Marks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage examinations, marks and results.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
          <Plus size={15} />
          Create Exam
        </button>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="border-b p-5">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-blue-600" />

            <h2 className="text-sm font-semibold">
              Examination List
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b bg-gray-50 text-xs text-gray-500">
                <th className="px-5 py-3">Exam</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Full Marks</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {exams.map((exam, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-gray-800">
                      {exam.name}
                    </p>

                    <p className="text-[10px] text-gray-400">
                      {exam.subject}
                    </p>

                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {exam.className}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <CalendarDays size={13} />
                      {exam.date}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {exam.marks}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600">
                      {exam.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">

                    <button className="flex items-center gap-1 text-xs font-medium text-blue-600">
                      <Eye size={14} />
                      Details
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}