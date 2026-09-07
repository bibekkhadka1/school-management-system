"use client";

import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";

const assignments = [
  {
    title: "Database Design Project",
    className: "BCA 3A",
    due: "Sep 08, 2026",
    submissions: "38/45",
    status: "REVIEW",
  },
  {
    title: "React Portfolio Website",
    className: "BCA 3B",
    due: "Sep 10, 2026",
    submissions: "31/40",
    status: "REVIEW",
  },
  {
    title: "Machine Learning Basics",
    className: "BCA 4A",
    due: "Sep 12, 2026",
    submissions: "40/44",
    status: "UPCOMING",
  },
];

export default function AssignmentsOverview() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <ClipboardList size={18} className="text-blue-600" />

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Assignments Overview
            </h2>

            <p className="mt-1 text-[10px] text-gray-400">
              Recent assignments and submissions
            </p>
          </div>
        </div>

        <button className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </button>

      </div>

      {/* Assignments */}
      <div className="space-y-3">

        {assignments.map((assignment) => (
          <div
            key={assignment.title}
            className="rounded-lg border p-3 transition hover:shadow-sm"
          >

            <div className="flex items-start justify-between gap-3">

              <div className="min-w-0">

                <p className="truncate text-xs font-semibold text-gray-800">
                  {assignment.title}
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {assignment.className}
                </p>

              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-semibold ${
                  assignment.status === "REVIEW"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {assignment.status}
              </span>

            </div>

            <div className="mt-3 flex items-center justify-between">

              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Clock size={12} />
                Due {assignment.due}
              </div>

              <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600">
                <CheckCircle2 size={12} />
                {assignment.submissions}
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}