"use client";

import { Search, Users, Eye } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: "STU-001",
    name: "Aarav Sharma",
    className: "BCA 3A",
    roll: "01",
    attendance: "94%",
    email: "aarav@example.com",
  },
  {
    id: "STU-002",
    name: "Priya Thapa",
    className: "BCA 3A",
    roll: "02",
    attendance: "91%",
    email: "priya@example.com",
  },
  {
    id: "STU-003",
    name: "Sujan KC",
    className: "BCA 3B",
    roll: "15",
    attendance: "87%",
    email: "sujan@example.com",
  },
  {
    id: "STU-004",
    name: "Anisha Rai",
    className: "BCA 4A",
    roll: "08",
    attendance: "96%",
    email: "anisha@example.com",
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      classFilter === "All" || student.className === classFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Students
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and monitor students from your assigned classes.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row">

        <div className="flex max-w-md flex-1 items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search size={17} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="rounded-lg border bg-white px-4 py-2 text-sm outline-none"
        >
          <option>All</option>
          <option>BCA 3A</option>
          <option>BCA 3B</option>
          <option>BCA 4A</option>
        </select>

      </div>

      {/* Student Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="border-b p-5">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-600" />

            <h2 className="text-sm font-semibold">
              Student List
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b bg-gray-50 text-xs text-gray-500">
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Roll No.</th>
                <th className="px-5 py-3">Attendance</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {student.name}
                    </p>

                    <p className="text-[10px] text-gray-400">
                      {student.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {student.className}
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {student.roll}
                  </td>

                  <td className="px-5 py-4">

                    <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-600">
                      {student.attendance}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
                      <Eye size={14} />
                      View
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