"use client";

import {
  Plus,
  FileText,
  Download,
  MoreVertical,
  BookOpen,
  Search,
  Files,
  FileCheck2,
  HardDrive,
  Presentation,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useMemo, useState } from "react";

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
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        material.title.toLowerCase().includes(searchValue) ||
        material.subject.toLowerCase().includes(searchValue) ||
        material.className.toLowerCase().includes(searchValue);

      const matchesType =
        typeFilter === "All" || material.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const totalMaterials = materials.length;

  const pdfCount = materials.filter(
    (material) => material.type === "PDF"
  ).length;

  const pptCount = materials.filter(
    (material) => material.type === "PPT"
  ).length;

  const totalSize = materials.reduce(
    (total, material) =>
      total + parseFloat(material.size.replace(" MB", "")),
    0
  );

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <BookOpen size={18} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Academic Resources
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Learning Materials
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Upload and manage learning resources for your students.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]">
            <Plus size={17} />
            Upload Material
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            title="Total Materials"
            value={totalMaterials}
            description="Learning resources"
            icon={Files}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <KpiCard
            title="PDF Documents"
            value={pdfCount}
            description="PDF learning resources"
            icon={FileCheck2}
            iconClass="bg-rose-50 text-rose-600"
          />

          <KpiCard
            title="Presentations"
            value={pptCount}
            description="Presentation materials"
            icon={Presentation}
            iconClass="bg-violet-50 text-violet-600"
          />

          <KpiCard
            title="Storage Used"
            value={`${totalSize.toFixed(1)} MB`}
            description="Total uploaded size"
            icon={HardDrive}
            iconClass="bg-emerald-50 text-emerald-600"
          />

        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-slate-100 p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search materials, classes or subjects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">

                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-10 text-xs font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="All">All Types</option>
                    <option value="PDF">PDF</option>
                    <option value="PPT">PPT</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <button className="hidden h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:flex">
                  <MoreVertical size={16} />
                  More
                </button>

              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Resource Library
                </h2>

                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                  {filteredMaterials.length}
                </span>
              </div>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {filteredMaterials.length === 0
                  ? "No materials found"
                  : `${filteredMaterials.length} resource${
                      filteredMaterials.length !== 1 ? "s" : ""
                    } available`}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
              <Files size={14} />
              Course resources
            </div>
          </div>

          {/* Materials Grid */}
          <div className="p-5">

            {filteredMaterials.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                {filteredMaterials.map((material) => (
                  <MaterialCard
                    key={material.title}
                    material={material}
                  />
                ))}

              </div>
            ) : (
              <div className="py-16 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Search size={20} className="text-slate-400" />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-slate-800">
                  No materials found
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Try adjusting your search or file type filter.
                </p>

              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] font-medium text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filteredMaterials.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-600">
                {materials.length}
              </span>{" "}
              materials
            </p>

            <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 transition hover:text-indigo-700">
              View all resources
              <ArrowUpRight size={13} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Material Card */
/* ---------------------------------- */

function MaterialCard({
  material,
}: {
  material: {
    title: string;
    subject: string;
    className: string;
    type: string;
    size: string;
    date: string;
  };
}) {
  const isPdf = material.type === "PDF";

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${
            isPdf
              ? "bg-rose-50 text-rose-600"
              : "bg-violet-50 text-violet-600"
          }`}
        >
          {isPdf ? (
            <FileText size={19} />
          ) : (
            <Presentation size={19} />
          )}
        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
          <MoreVertical size={17} />
        </button>

      </div>

      {/* Title */}
      <div className="mt-5">

        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-sm font-bold leading-5 text-slate-800">
            {material.title}
          </h2>

          <span
            className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-bold ${
              isPdf
                ? "bg-rose-50 text-rose-600"
                : "bg-violet-50 text-violet-600"
            }`}
          >
            {material.type}
          </span>
        </div>

        <p className="mt-1.5 line-clamp-1 text-xs font-medium text-slate-400">
          {material.subject}
        </p>

      </div>

      {/* Class */}
      <div className="mt-5 flex items-center gap-2">

        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
          <BookOpen size={14} className="text-slate-500" />
        </div>

        <div>
          <p className="text-[10px] font-medium text-slate-400">
            Class
          </p>

          <p className="text-xs font-semibold text-slate-600">
            {material.className}
          </p>
        </div>

      </div>

      {/* Metadata */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

        <div>
          <p className="text-[10px] font-medium text-slate-400">
            File size
          </p>

          <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
            {material.size}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-medium text-slate-400">
            Uploaded
          </p>

          <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
            {material.date}
          </p>
        </div>

      </div>

      {/* Action */}
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
        <Download size={14} />
        View Material
      </button>

    </div>
  );
}

/* ---------------------------------- */
/* KPI Card */
/* ---------------------------------- */

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={18} />
        </div>

      </div>

      <p className="mt-4 text-[11px] font-medium text-slate-400">
        {description}
      </p>

    </div>
  );
}