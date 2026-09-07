"use client";

import { ClipboardCheck, FilePlus, Upload, MessageSquare } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-6">
      {/* Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good Morning, Teacher 👋
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Here&apos;s what&apos;s happening with your classes today.
          </p>
        </div>

        {/* Date */}
        <div className="rounded-lg border bg-white px-4 py-2 text-xs text-gray-600 shadow-sm">
          📅{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
          <ClipboardCheck size={15} />
          Mark Attendance
        </button>

        <button className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
          <FilePlus size={15} />
          Create Assignment
        </button>

        <button className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
          <Upload size={15} />
          Upload Material
        </button>

        <button className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
          <MessageSquare size={15} />
          Messages
        </button>
      </div>
    </div>
  );
}
