"use client";

import {
  FileCheck,
  ClipboardList,
  ClipboardCheck,
  FileText,
} from "lucide-react";

const tasks = [
  {
    title: "Grade Assignments",
    count: "4 submissions",
    priority: "URGENT",
    icon: FileCheck,
  },
  {
    title: "Enter Exam Marks",
    count: "2 pending",
    priority: "IMPORTANT",
    icon: ClipboardList,
  },
  {
    title: "Mark Attendance",
    count: "1 class",
    priority: "NORMAL",
    icon: ClipboardCheck,
  },
  {
    title: "Material Review",
    count: "3 items",
    priority: "NORMAL",
    icon: FileText,
  },
];

export default function PendingTasks() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Pending Tasks
        </h2>

        <span className="text-xs text-gray-400">
          4 tasks
        </span>
      </div>

      <div className="space-y-3">

        {tasks.map((task, index) => {
          const Icon = task.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border p-3"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Icon size={15} className="text-blue-600" />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-medium text-gray-800">
                  {task.title}
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {task.count}
                </p>

              </div>

              <span
                className={`rounded-full px-2 py-1 text-[8px] font-semibold ${
                  task.priority === "URGENT"
                    ? "bg-red-50 text-red-500"
                    : task.priority === "IMPORTANT"
                    ? "bg-orange-50 text-orange-500"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {task.priority}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
}