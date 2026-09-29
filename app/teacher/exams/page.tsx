"use client";

import {
  Plus,
  FileText,
  CalendarDays,
  Eye,
  Award,
  Search,
  Clock3,
  CheckCircle2,
  Users,
  ChevronDown,
  MoreHorizontal,
  ArrowUpRight,
  Layers3,
  X,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Exam = {
  id: number;
  name: string;
  subject: string;
  className: string;
  date: string;
  marks: string;
  status: "Marks Entered" | "Marks Pending" | "Upcoming";
};

const initialExams: Exam[] = [
  {
    id: 1,
    name: "First Terminal Examination",
    subject: "Database Management Systems",
    className: "BCA 3A",
    date: "Sep 15, 2026",
    marks: "100",
    status: "Marks Entered",
  },
  {
    id: 2,
    name: "First Terminal Examination",
    subject: "Web Development",
    className: "BCA 3B",
    date: "Sep 17, 2026",
    marks: "100",
    status: "Marks Pending",
  },
  {
    id: 3,
    name: "Mid-Term Examination",
    subject: "Data Science",
    className: "BCA 4A",
    date: "Sep 22, 2026",
    marks: "100",
    status: "Upcoming",
  },
];

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showMore, setShowMore] = useState(false);

  const [newExam, setNewExam] = useState({
    name: "",
    subject: "",
    className: "",
    date: "",
    marks: "100",
  });

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        exam.name.toLowerCase().includes(searchValue) ||
        exam.subject.toLowerCase().includes(searchValue) ||
        exam.className.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [exams, search, statusFilter]);

  const totalExams = exams.length;

  const marksEntered = exams.filter(
    (exam) => exam.status === "Marks Entered"
  ).length;

  const marksPending = exams.filter(
    (exam) => exam.status === "Marks Pending"
  ).length;

  const upcomingExams = exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const handleCreateExam = () => {
    if (
      !newExam.name.trim() ||
      !newExam.subject.trim() ||
      !newExam.className.trim() ||
      !newExam.date
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const createdExam: Exam = {
      id: Date.now(),
      name: newExam.name,
      subject: newExam.subject,
      className: newExam.className,
      date: new Date(newExam.date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      marks: newExam.marks,
      status: "Upcoming",
    };

    setExams((current) => [...current, createdExam]);

    setNewExam({
      name: "",
      subject: "",
      className: "",
      date: "",
      marks: "100",
    });

    setShowCreateModal(false);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setShowMore(false);
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
                <Award size={18} className="text-white" />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                Academic Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Exams & Marks
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm font-medium text-slate-500">
              Manage examinations, marks and student results from one place.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0"
          >
            <Plus
              size={17}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            Create Exam
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Exams"
            value={totalExams}
            description="Examinations scheduled"
            icon={FileText}
            iconClass="bg-indigo-50 text-indigo-600"
            hoverClass="hover:border-indigo-300"
          />

          <KpiCard
            title="Marks Entered"
            value={marksEntered}
            description="Results completed"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
            hoverClass="hover:border-emerald-300"
          />

          <KpiCard
            title="Marks Pending"
            value={marksPending}
            description="Need your attention"
            icon={Clock3}
            iconClass="bg-orange-50 text-orange-600"
            hoverClass="hover:border-orange-300"
            highlight
          />

          <KpiCard
            title="Upcoming Exams"
            value={upcomingExams}
            description="Scheduled examinations"
            icon={CalendarDays}
            iconClass="bg-violet-50 text-violet-600"
            hoverClass="hover:border-violet-300"
          />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

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
                  placeholder="Search exams, classes or subjects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-3.5 pr-10 text-xs font-bold text-slate-600 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="All">All Status</option>
                    <option value="Marks Entered">Marks Entered</option>
                    <option value="Marks Pending">Marks Pending</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowMore((value) => !value)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <MoreHorizontal size={16} />
                    More
                  </button>

                  {showMore && (
                    <div className="absolute right-0 top-12 z-30 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50">
                      <button
                        onClick={clearFilters}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                      >
                        Clear filters
                      </button>

                      <button
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("Upcoming");
                          setShowMore(false);
                        }}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                      >
                        Show upcoming
                      </button>

                      <button
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("Marks Pending");
                          setShowMore(false);
                        }}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-orange-600"
                      >
                        Show pending
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Examination Overview
                </h2>

                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                  {filteredExams.length}
                </span>
              </div>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {filteredExams.length === 0
                  ? "No examinations found"
                  : `${filteredExams.length} examination${
                      filteredExams.length !== 1 ? "s" : ""
                    } available`}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
              <Users size={14} />
              Examination results
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <TableHeader>Examination</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Full Marks</TableHeader>
                  <TableHeader>Status</TableHeader>

                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr
                      key={exam.id}
                      className="group border-b border-slate-100 transition hover:bg-indigo-50/[0.25] last:border-0"
                    >

                      {/* Examination */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 transition group-hover:bg-indigo-100">
                            <FileText
                              size={17}
                              className="text-indigo-600"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {exam.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">
                              <Layers3
                                size={11}
                                className="text-slate-400"
                              />

                              <p className="text-[11px] font-medium text-slate-400">
                                {exam.subject}
                              </p>
                            </div>
                          </div>

                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                          {exam.className}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                            <CalendarDays
                              size={14}
                              className="text-slate-500"
                            />
                          </div>

                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              {exam.date}
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                              Examination date
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Marks */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                            <Award
                              size={14}
                              className="text-slate-500"
                            />
                          </div>

                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              {exam.marks}
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                              Maximum marks
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={exam.status} />
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setSelectedExam(exam)}
                            className="group/action inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-bold text-indigo-600 transition hover:border-indigo-100 hover:bg-indigo-50"
                          >
                            <Eye size={14} />

                            <span>Details</span>

                            <ArrowUpRight
                              size={12}
                              className="opacity-0 transition group-hover/action:translate-x-0.5 group-hover/action:opacity-100"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                        <Search
                          size={21}
                          className="text-slate-400"
                        />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-slate-800">
                        No examinations found
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Try adjusting your search or status filter.
                      </p>

                      <button
                        onClick={clearFilters}
                        className="mt-4 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-600">
                {filteredExams.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-600">
                {exams.length}
              </span>{" "}
              examinations
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled
                className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-300"
              >
                <ChevronDown
                  size={13}
                  className="rotate-90"
                />
                Previous
              </button>

              <button className="h-7 min-w-7 rounded-lg bg-indigo-600 px-2 text-[11px] font-bold text-white shadow-sm">
                1
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className="h-7 min-w-7 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-bold text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                +
              </button>

              <button
                disabled
                className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-300"
              >
                Next
                <ChevronDown
                  size={13}
                  className="-rotate-90"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Exam Modal */}
      {showCreateModal && (
        <Modal
          title="Create New Exam"
          subtitle="Add a new examination to your academic schedule."
          onClose={() => setShowCreateModal(false)}
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <FormField
              label="Exam Name"
              placeholder="e.g. Final Examination"
              value={newExam.name}
              onChange={(value) =>
                setNewExam((current) => ({
                  ...current,
                  name: value,
                }))
              }
            />

            <FormField
              label="Subject"
              placeholder="e.g. Database Management"
              value={newExam.subject}
              onChange={(value) =>
                setNewExam((current) => ({
                  ...current,
                  subject: value,
                }))
              }
            />

            <FormField
              label="Class"
              placeholder="e.g. BCA 3A"
              value={newExam.className}
              onChange={(value) =>
                setNewExam((current) => ({
                  ...current,
                  className: value,
                }))
              }
            />

            <FormField
              label="Exam Date"
              type="date"
              value={newExam.date}
              onChange={(value) =>
                setNewExam((current) => ({
                  ...current,
                  date: value,
                }))
              }
            />

            <FormField
              label="Full Marks"
              type="number"
              placeholder="100"
              value={newExam.marks}
              onChange={(value) =>
                setNewExam((current) => ({
                  ...current,
                  marks: value,
                }))
              }
            />
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={handleCreateExam}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Plus size={16} />
              Create Exam
            </button>
          </div>
        </Modal>
      )}

      {/* Details Modal */}
      {selectedExam && (
        <Modal
          title="Exam Details"
          subtitle="Examination information and current status."
          onClose={() => setSelectedExam(null)}
        >
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <GraduationCap size={21} />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedExam.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {selectedExam.subject}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailItem
              label="Class"
              value={selectedExam.className}
              icon={<Users size={15} />}
            />

            <DetailItem
              label="Full Marks"
              value={selectedExam.marks}
              icon={<Award size={15} />}
            />

            <DetailItem
              label="Exam Date"
              value={selectedExam.date}
              icon={<CalendarDays size={15} />}
            />

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </p>

              <div className="mt-2">
                <StatusBadge status={selectedExam.status} />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
            <button
              onClick={() => setSelectedExam(null)}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Table Header */
/* ---------------------------------- */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
      {children}
    </th>
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
  hoverClass,
  highlight,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  hoverClass: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group min-h-[150px] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverClass}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <p
        className={`mt-5 text-[11px] font-semibold ${
          highlight ? "text-orange-600" : "text-slate-400"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Status Badge */
/* ---------------------------------- */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const isEntered = status === "Marks Entered";
  const isPending = status === "Marks Pending";

  const styles = isEntered
    ? "bg-emerald-50 text-emerald-700"
    : isPending
      ? "bg-orange-50 text-orange-700"
      : "bg-indigo-50 text-indigo-700";

  const dot = isEntered
    ? "bg-emerald-500"
    : isPending
      ? "bg-orange-500"
      : "bg-indigo-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

/* ---------------------------------- */
/* Modal */
/* ---------------------------------- */

function Modal({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Form Field */
/* ---------------------------------- */

function FormField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-slate-600">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />
    </label>
  );
}

/* ---------------------------------- */
/* Detail Item */
/* ---------------------------------- */

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <p className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}