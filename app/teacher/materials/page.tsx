"use client";

import {
  Plus,
  FileText,
  Download,
  MoreVertical,
  BookOpen,
} from "lucide-react";

const materials = [
  {
    title: "DBMS Introduction",
    subject: "Database Management Systems",
    className: "BCA 3A",
    type: "PDF",
    size: "2.4 MB",
    date: "Sep 04, 2026",
  },
  {
    title: "React Fundamentals",
    subject: "Web Development",
    className: "BCA 3B",
    type: "PDF",
    size: "4.1 MB",
    date: "Sep 03, 2026",
  },
  {
    title: "Introduction to Machine Learning",
    subject: "Data Science",
    className: "BCA 4A",
    type: "PPT",
    size: "6.8 MB",
    date: "Sep 01, 2026",
  },
];

export default function MaterialsPage() {
  return (
    <div className="p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Learning Materials
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Upload and manage learning resources for your students.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
          <Plus size={15} />
          Upload Material
        </button>

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        {materials.map((material) => (
          <div
            key={material.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <FileText size={18} className="text-blue-600" />
              </div>

              <button className="text-gray-400 hover:text-gray-700">
                <MoreVertical size={17} />
              </button>

            </div>

            <h2 className="mt-4 text-sm font-semibold text-gray-900">
              {material.title}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {material.subject}
            </p>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400">
              <BookOpen size={12} />
              {material.className}
            </div>

            <div className="mt-2 text-[10px] text-gray-400">
              {material.type} • {material.size} • {material.date}
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
              <Download size={14} />
              View Material
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}