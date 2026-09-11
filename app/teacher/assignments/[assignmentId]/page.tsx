"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Download,
  Edit3,
  FileText,
  Search,
  Send,
  Users,
  XCircle,
} from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{
    assignmentId: string;
  }>;
};

type SubmissionStatus = "Submitted" | "Pending" | "Late";

type Submission = {
  id: number;
  name: string;
  email: string;
  status: SubmissionStatus;
  submittedAt: string;
  marks: string;
};

type Assignment = {
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  createdDate: string;
  totalMarks: number;
  submissionType: string;
  status: string;
  description: string;
  instructions: string[];
};

/* -------------------------------------------------------------------------- */
/* Assignment Data                                                           */
/* -------------------------------------------------------------------------- */

const assignmentData: Record<string, Assignment> = {
  "assignment-1": {
    title: "Database Design Project",
    subject: "DBMS",
    className: "BCA 3A",
    dueDate: "September 08, 2026",
    createdDate: "September 01, 2026",
    totalMarks: 20,
    submissionType: "PDF / Document",
    status: "Active",
    description:
      "Design and develop a relational database for a real-world application. Apply database design principles, create an appropriate schema, and demonstrate your understanding of tables, relationships, keys, and normalization.",
    instructions: [
      "Design a database for the given application scenario.",
      "Create appropriate tables and define primary and foreign keys.",
      "Apply suitable normalization techniques.",
      "Include an ER diagram or database schema.",
      "Submit the completed work as a PDF or document.",
    ],
  },

  "assignment-2": {
    title: "React Portfolio Website",
    subject: "Web Development",
    className: "BCA 3B",
    dueDate: "September 10, 2026",
    createdDate: "September 03, 2026",
    totalMarks: 25,
    submissionType: "PDF / Document",
    status: "Active",
    description:
      "Build a responsive personal portfolio website using React. The project should demonstrate component-based development, responsive design, reusable components, and clean user interface implementation.",
    instructions: [
      "Create the portfolio using React.",
      "Use reusable components wherever appropriate.",
      "Include sections such as About, Skills, Projects, and Contact.",
      "Make the website responsive for different screen sizes.",
      "Submit screenshots and the project documentation.",
    ],
  },

  "assignment-3": {
    title: "Machine Learning Basics",
    subject: "Data Science",
    className: "BCA 4A",
    dueDate: "September 12, 2026",
    createdDate: "September 05, 2026",
    totalMarks: 30,
    submissionType: "PDF / Document",
    status: "Upcoming",
    description:
      "Prepare an assignment explaining the fundamental concepts of machine learning, including supervised learning, unsupervised learning, common algorithms, training data, and model evaluation.",
    instructions: [
      "Explain the basic concepts of machine learning.",
      "Differentiate between supervised and unsupervised learning.",
      "Describe at least three common machine learning algorithms.",
      "Include suitable real-world examples.",
      "Submit the completed assignment before the deadline.",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Fallback Assignment                                                        */
/* -------------------------------------------------------------------------- */

const defaultAssignment: Assignment = {
  title: "Assignment Details",
  subject: "Subject",
  className: "Class",
  dueDate: "Not specified",
  createdDate: "Not specified",
  totalMarks: 0,
  submissionType: "Document",
  status: "Active",
  description: "No assignment description is available.",
  instructions: ["No instructions have been added."],
};

/* -------------------------------------------------------------------------- */
/* Student Submissions                                                        */
/* -------------------------------------------------------------------------- */

const submissions: Submission[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    status: "Submitted",
    submittedAt: "Sep 05, 2026 · 10:32 AM",
    marks: "18 / 20",
  },
  {
    id: 2,
    name: "Anisha Karki",
    email: "anisha.karki@example.com",
    status: "Submitted",
    submittedAt: "Sep 05, 2026 · 12:18 PM",
    marks: "17 / 20",
  },
  {
    id: 3,
    name: "Bibek Thapa",
    email: "bibek.thapa@example.com",
    status: "Pending",
    submittedAt: "—",
    marks: "—",
  },
  {
    id: 4,
    name: "Sujal Adhikari",
    email: "sujal.adhikari@example.com",
    status: "Late",
    submittedAt: "Sep 09, 2026 · 9:45 AM",
    marks: "15 / 20",
  },
  {
    id: 5,
    name: "Pratik Shrestha",
    email: "pratik.shrestha@example.com",
    status: "Submitted",
    submittedAt: "Sep 06, 2026 · 2:05 PM",
    marks: "19 / 20",
  },
  {
    id: 6,
    name: "Nisha Gurung",
    email: "nisha.gurung@example.com",
    status: "Submitted",
    submittedAt: "Sep 06, 2026 · 4:27 PM",
    marks: "16 / 20",
  },
  {
    id: 7,
    name: "Rojan Rai",
    email: "rojan.rai@example.com",
    status: "Pending",
    submittedAt: "—",
    marks: "—",
  },
  {
    id: 8,
    name: "Samir Bista",
    email: "samir.bista@example.com",
    status: "Submitted",
    submittedAt: "Sep 07, 2026 · 8:15 AM",
    marks: "18 / 20",
  },
];

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  hoverClass,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: typeof Users;
  iconClass: string;
  hoverClass: string;
}) {
  return (
    <div
      className={`group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverClass}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const styles = {
    Submitted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Late: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const icons = {
    Submitted: CheckCircle2,
    Pending: Clock3,
    Late: XCircle,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AssignmentDetailsPage({ params }: PageProps) {
  const router = useRouter();

  /*
   * Next.js dynamic route params are a Promise.
   * React's use() unwraps the Promise inside this Client Component.
   */
  const { assignmentId } = use(params);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<"All" | SubmissionStatus>(
    "All",
  );

  const assignment = assignmentData[assignmentId] ?? defaultAssignment;

  /* ------------------------------------------------------------------------ */
  /* Statistics                                                               */
  /* ------------------------------------------------------------------------ */

  const submittedCount = submissions.filter(
    (item) => item.status === "Submitted",
  ).length;

  const pendingCount = submissions.filter(
    (item) => item.status === "Pending",
  ).length;

  const lateCount = submissions.filter((item) => item.status === "Late").length;

  const completionRate = Math.round(
    (submittedCount / submissions.length) * 100,
  );

  /* ------------------------------------------------------------------------ */
  /* Search + Filter                                                          */
  /* ------------------------------------------------------------------------ */

  const filteredSubmissions = submissions.filter((submission) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      submission.name.toLowerCase().includes(searchValue) ||
      submission.email.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push("/teacher/assignments")}
              aria-label="Back to assignments"
              className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <ClipboardList size={17} />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Assignment Details
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                {assignment.title}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Review assignment information and student submissions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                router.push(`/teacher/assignments/${assignmentId}/edit`)
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Edit3 size={16} />
              Edit Assignment
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Assignment Overview                                              */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Assignment Overview
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Basic information about this assignment.
              </p>
            </div>

            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
                assignment.status === "Active"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-indigo-100 bg-indigo-50 text-indigo-700"
              }`}
            >
              {assignment.status}
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Subject */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <FileText size={16} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Subject
                </span>
              </div>

              <p className="text-sm font-bold text-slate-800">
                {assignment.subject}
              </p>
            </div>

            {/* Class */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <Users size={16} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Class
                </span>
              </div>

              <p className="text-sm font-bold text-slate-800">
                {assignment.className}
              </p>
            </div>

            {/* Due Date */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <CalendarDays size={16} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Due Date
                </span>
              </div>

              <p className="text-sm font-bold text-slate-800">
                {assignment.dueDate}
              </p>
            </div>

            {/* Total Marks */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <ClipboardList size={16} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Total Marks
                </span>
              </div>

              <p className="text-sm font-bold text-slate-800">
                {assignment.totalMarks}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Submission Type
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {assignment.submissionType}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Created Date
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {assignment.createdDate}
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Statistics                                                        */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Students"
            value={submissions.length}
            description={`Students in ${assignment.className}`}
            icon={Users}
            iconClass="bg-indigo-50 text-indigo-600"
            hoverClass="hover:border-indigo-300"
          />

          <StatCard
            title="Submitted"
            value={submittedCount}
            description={`${completionRate}% completion rate`}
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
            hoverClass="hover:border-emerald-300"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            description="Awaiting submission"
            icon={Clock3}
            iconClass="bg-amber-50 text-amber-600"
            hoverClass="hover:border-amber-300"
          />

          <StatCard
            title="Late"
            value={lateCount}
            description="Submitted after deadline"
            icon={XCircle}
            iconClass="bg-rose-50 text-rose-600"
            hoverClass="hover:border-rose-300"
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main Content                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          {/* ================================================================ */}
          {/* Left Content                                                      */}
          {/* ================================================================ */}

          <div className="space-y-6">
            {/* ------------------------------------------------------------ */}
            {/* Description                                                    */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                  Assignment Description
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Instructions provided to students.
                </p>
              </div>

              <p className="text-sm leading-7 text-slate-600">
                {assignment.description}
              </p>

              <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
                <h3 className="text-sm font-bold text-slate-900">
                  Instructions
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {assignment.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-sm font-medium text-slate-600"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Submissions                                                    */}
            {/* ------------------------------------------------------------ */}

            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Student Submissions
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Track and review student submissions.
                    </p>
                  </div>
                </div>

                {/* Search / Filter */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search students..."
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as "All" | SubmissionStatus,
                      )
                    }
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="All">All Status</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Pending">Pending</option>
                    <option value="Late">Late</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                        Student
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                        Status
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                        Submitted
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                        Marks
                      </th>

                      <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60"
                      >
                        {/* Student */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                              {submission.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-800">
                                {submission.name}
                              </p>

                              <p className="mt-0.5 text-xs font-medium text-slate-400">
                                {submission.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <StatusBadge status={submission.status} />
                        </td>

                        {/* Submitted */}
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                          {submission.submittedAt}
                        </td>

                        {/* Marks */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-700">
                            {submission.marks}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                router.push(
                                  `/teacher/assignments/${assignmentId}/submissions/${submission.id}`,
                                )
                              }
                              className="group inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:border-indigo-100 hover:bg-indigo-50"
                            >
                              View
                              <ArrowUpRight
                                size={12}
                                className="transition-transform group-hover:translate-x-0.5"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredSubmissions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                            <Users size={20} />
                          </div>

                          <p className="mt-3 text-sm font-bold text-slate-700">
                            No submissions found
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-400">
                            Try changing your search or filter.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <p className="text-xs font-medium text-slate-400">
                  Showing{" "}
                  <span className="font-bold text-slate-600">
                    {filteredSubmissions.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-600">
                    {submissions.length}
                  </span>{" "}
                  students
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                  className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  Clear filters
                </button>
              </div>
            </section>
          </div>

          {/* ================================================================ */}
          {/* Right Sidebar                                                     */}
          {/* ================================================================ */}

          <aside className="space-y-6">
            {/* ------------------------------------------------------------ */}
            {/* Progress                                                        */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Submission Progress
                  </h2>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Overall completion
                  </p>
                </div>

                <span className="text-xl font-bold text-indigo-600">
                  {completionRate}%
                </span>
              </div>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-xs font-semibold text-emerald-600">
                    Submitted
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-700">
                    {submittedCount}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3">
                  <p className="text-xs font-semibold text-amber-600">
                    Pending
                  </p>

                  <p className="mt-1 text-lg font-bold text-amber-700">
                    {pendingCount}
                  </p>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Assignment Actions                                             */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900">
                Assignment Actions
              </h2>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() =>
                    router.push(`/teacher/assignments/${assignmentId}/edit`)
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Edit3 size={16} />
                  Edit Assignment
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                  <Download size={16} />
                  Download Assignment
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                  <Send size={16} />
                  Send Reminder
                </button>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Quick Information                                              */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <ClipboardList size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Quick Information
                  </h2>

                  <p className="mt-2 text-xs leading-5 font-medium text-slate-500">
                    Students can submit their work until the assignment
                    deadline. Late submissions are automatically marked for
                    review.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
