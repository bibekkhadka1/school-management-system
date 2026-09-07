"use client";

import {
  Plus,
  Search,
  ClipboardList,
  Eye,
} from "lucide-react";
import { useState } from "react";

const assignments = [
  {
    title: "Database Design Project",
    className: "BCA 3A",
    subject: "DBMS",
    due: "Sep 08, 2026",
    submissions: "38/45",
    status: "Review",
  },
  {
    title: "React Portfolio Website",
    className: "BCA 3B",
    subject: "Web Development",
    due: "Sep 10, 2026",
    submissions: "31/40",
    status: "Review",
  },
  {
    title: "Machine Learning Basics",
    className: "BCA 4A",
    subject: "Data Science",
    due: "Sep 12, 2026",
    submissions: "0/44",
    status: "Upcoming",
  },
];

export default function AssignmentsPage() {
  const [search, setSearch] = useState("");

  const filtered = assignments.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Assignments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, manage and grade assignments.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
          <Plus size={15} />
          Create Assignment
        </button>

      </div>

      <div className="mb-5 flex max-w-md items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <Search size={16} className="text-gray-400" />

        <input
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b bg-gray-50 text-xs text-gray-500">
                <th className="px-5 py-3">Assignment</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Submissions</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((item) => (
                <tr
                  key={item.title}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                        <ClipboardList
                          size={16}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.title}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          {item.subject}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {item.className}
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {item.due}
                  </td>

                  <td className="px-5 py-4 text-xs font-medium text-gray-700">
                    {item.submissions}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-orange-50 px-2 py-1 text-[9px] font-semibold text-orange-600">
                      {item.status}
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