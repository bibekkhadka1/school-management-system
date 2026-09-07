"use client";

import { Award, CalendarDays, FileText } from "lucide-react";

const exams = [
  {
    exam: "First Terminal Examination",
    subject: "Database Management Systems",
    date: "Sep 15, 2026",
    result: "Published",
    average: "84%",
  },
  {
    exam: "First Terminal Examination",
    subject: "Web Development",
    date: "Sep 17, 2026",
    result: "Published",
    average: "81%",
  },
  {
    exam: "Mid-Term Examination",
    subject: "Data Science",
    date: "Sep 22, 2026",
    result: "Marks Pending",
    average: "-",
  },
];

export default function ExamsResults() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Award size={18} className="text-blue-600" />

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Exams &amp; Results
            </h2>

            <p className="mt-1 text-[10px] text-gray-400">
              Examination and result overview
            </p>
          </div>

        </div>

        <button className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </button>

      </div>

      {/* Exams */}
      <div className="space-y-3">

        {exams.map((exam, index) => (
          <div
            key={index}
            className="rounded-lg border p-3"
          >

            <div className="flex items-start justify-between gap-3">

              <div>

                <p className="text-xs font-semibold text-gray-800">
                  {exam.subject}
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {exam.exam}
                </p>

              </div>

              <span
                className={`rounded-full px-2 py-1 text-[8px] font-semibold ${
                  exam.result === "Published"
                    ? "bg-green-50 text-green-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {exam.result}
              </span>

            </div>

            <div className="mt-3 flex items-center justify-between">

              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <CalendarDays size={12} />
                {exam.date}
              </div>

              <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600">
                <FileText size={12} />
                Avg. {exam.average}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}