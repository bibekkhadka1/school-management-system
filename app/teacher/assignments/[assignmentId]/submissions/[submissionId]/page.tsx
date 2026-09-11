"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Mail,
  MessageSquare,
  Save,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{
    assignmentId: string;
    submissionId: string;
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
  fileName: string;
  fileSize: string;
  feedback: string;
};

type Assignment = {
  title: string;
  subject: string;
  className: string;
  totalMarks: number;
  dueDate: string;
};

/* -------------------------------------------------------------------------- */
/* Assignment Data                                                            */
/* -------------------------------------------------------------------------- */

const assignmentData: Record<string, Assignment> = {
  "assignment-1": {
    title: "Database Design Project",
    subject: "DBMS",
    className: "BCA 3A",
    totalMarks: 20,
    dueDate: "September 08, 2026",
  },

  "assignment-2": {
    title: "React Portfolio Website",
    subject: "Web Development",
    className: "BCA 3B",
    totalMarks: 25,
    dueDate: "September 10, 2026",
  },

  "assignment-3": {
    title: "Machine Learning Basics",
    subject: "Data Science",
    className: "BCA 4A",
    totalMarks: 30,
    dueDate: "September 12, 2026",
  },
};

/* -------------------------------------------------------------------------- */
/* Student Submission Data                                                    */
/* -------------------------------------------------------------------------- */

const submissions: Submission[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    status: "Submitted",
    submittedAt: "September 05, 2026 · 10:32 AM",
    marks: "18",
    fileName: "Aarav_Sharma_Database_Project.pdf",
    fileSize: "2.4 MB",
    feedback:
      "Good database structure and clear relationships. Consider improving the normalization explanation.",
  },

  {
    id: 2,
    name: "Anisha Karki",
    email: "anisha.karki@example.com",
    status: "Submitted",
    submittedAt: "September 05, 2026 · 12:18 PM",
    marks: "17",
    fileName: "Anisha_Karki_Database_Project.pdf",
    fileSize: "1.8 MB",
    feedback:
      "Well organized submission. The ER diagram is clear and the table relationships are mostly correct.",
  },

  {
    id: 3,
    name: "Bibek Thapa",
    email: "bibek.thapa@example.com",
    status: "Pending",
    submittedAt: "—",
    marks: "",
    fileName: "",
    fileSize: "",
    feedback: "",
  },

  {
    id: 4,
    name: "Sujal Adhikari",
    email: "sujal.adhikari@example.com",
    status: "Late",
    submittedAt: "September 09, 2026 · 9:45 AM",
    marks: "15",
    fileName: "Sujal_Adhikari_Database_Project.pdf",
    fileSize: "3.1 MB",
    feedback:
      "The main requirements are covered, but the submission was received after the deadline.",
  },

  {
    id: 5,
    name: "Pratik Shrestha",
    email: "pratik.shrestha@example.com",
    status: "Submitted",
    submittedAt: "September 06, 2026 · 2:05 PM",
    marks: "19",
    fileName: "Pratik_Shrestha_Database_Project.pdf",
    fileSize: "2.1 MB",
    feedback:
      "Excellent work. The database design is detailed and the normalization is properly explained.",
  },

  {
    id: 6,
    name: "Nisha Gurung",
    email: "nisha.gurung@example.com",
    status: "Submitted",
    submittedAt: "September 06, 2026 · 4:27 PM",
    marks: "16",
    fileName: "Nisha_Gurung_Database_Project.pdf",
    fileSize: "2.7 MB",
    feedback:
      "Good effort. Some relationships and constraints need additional explanation.",
  },

  {
    id: 7,
    name: "Rojan Rai",
    email: "rojan.rai@example.com",
    status: "Pending",
    submittedAt: "—",
    marks: "",
    fileName: "",
    fileSize: "",
    feedback: "",
  },

  {
    id: 8,
    name: "Samir Bista",
    email: "samir.bista@example.com",
    status: "Submitted",
    submittedAt: "September 07, 2026 · 8:15 AM",
    marks: "18",
    fileName: "Samir_Bista_Database_Project.pdf",
    fileSize: "2.0 MB",
    feedback:
      "Strong submission with a well structured database schema and appropriate keys.",
  },
];

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: SubmissionStatus;
}) {
  const styles = {
    Submitted:
      "border-emerald-100 bg-emerald-50 text-emerald-700",
    Pending:
      "border-amber-100 bg-amber-50 text-amber-700",
    Late:
      "border-rose-100 bg-rose-50 text-rose-700",
  };

  const icons = {
    Submitted: CheckCircle2,
    Pending: ClipboardList,
    Late: XCircle,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SubmissionReviewPage({
  params,
}: PageProps) {
  const router = useRouter();

  const { assignmentId, submissionId } = use(params);

  const assignment =
    assignmentData[assignmentId] ?? {
      title: "Assignment",
      subject: "Subject",
      className: "Class",
      totalMarks: 20,
      dueDate: "Not specified",
    };

  const submission =
    submissions.find(
      (item) => item.id === Number(submissionId),
    ) ?? null;

  const [marks, setMarks] = useState(
    submission?.marks ?? "",
  );

  const [feedback, setFeedback] = useState(
    submission?.feedback ?? "",
  );

  const [saved, setSaved] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* Invalid Submission                                                       */
  /* ------------------------------------------------------------------------ */

  if (!submission) {
    return (
      <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
        <div className="mx-auto max-w-[1500px]">
          <button
            onClick={() =>
              router.push(
                `/teacher/assignments/${assignmentId}`,
              )
            }
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Assignment
          </button>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Users size={24} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Submission Not Found
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              The requested student submission could not be
              found.
            </p>
          </section>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Save Grade                                                               */
  /* ------------------------------------------------------------------------ */

  const handleSaveGrade = () => {
    const numericMarks = Number(marks);

    if (
      marks !== "" &&
      (Number.isNaN(numericMarks) ||
        numericMarks < 0 ||
        numericMarks > assignment.totalMarks)
    ) {
      return;
    }

    console.log("Saving submission review:", {
      assignmentId,
      submissionId,
      student: submission.name,
      marks,
      feedback,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

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
              onClick={() =>
                router.push(
                  `/teacher/assignments/${assignmentId}`,
                )
              }
              aria-label="Back to assignment"
              className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText size={17} />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Review Submission
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                {submission.name}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Review and grade this student's submission.
              </p>
            </div>
          </div>

          <StatusBadge status={submission.status} />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Assignment Context                                                */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <ClipboardList size={16} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Assignment
                </span>
              </div>

              <p className="text-sm font-bold text-slate-800">
                {assignment.title}
              </p>
            </div>

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
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Main Content                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">

          {/* ================================================================ */}
          {/* Left                                                              */}
          {/* ================================================================ */}

          <div className="space-y-6">

            {/* ------------------------------------------------------------ */}
            {/* Student Information                                            */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-lg font-bold text-indigo-600">
                  {submission.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {submission.name}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <Mail size={14} />
                      {submission.email}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <CalendarDays size={14} />
                      {submission.submittedAt}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Submitted File                                                 */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                  Submitted Work
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Files submitted by the student.
                </p>
              </div>

              {submission.fileName ? (
                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {submission.fileName}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {submission.fileSize} · PDF Document
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      console.log(
                        "Download:",
                        submission.fileName,
                      )
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Download size={15} />
                    Download
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50/50 p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <FileText size={19} />
                  </div>

                  <p className="mt-3 text-sm font-bold text-slate-700">
                    No submission file
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    This student has not submitted a file yet.
                  </p>
                </div>
              )}
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Existing Feedback                                               */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <MessageSquare size={16} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Previous Feedback
                  </h2>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Feedback currently saved for this submission.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-sm leading-6 font-medium text-slate-600">
                  {submission.feedback ||
                    "No feedback has been added yet."}
                </p>
              </div>
            </section>
          </div>

          {/* ================================================================ */}
          {/* Right Sidebar                                                     */}
          {/* ================================================================ */}

          <aside className="space-y-6">

            {/* ------------------------------------------------------------ */}
            {/* Grading                                                       */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-bold text-slate-900">
                  Grade Submission
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Enter marks and provide feedback.
                </p>
              </div>

              {/* Marks */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="marks"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Marks
                  </label>

                  <span className="text-xs font-semibold text-slate-400">
                    Maximum {assignment.totalMarks}
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="marks"
                    type="number"
                    min="0"
                    max={assignment.totalMarks}
                    value={marks}
                    onChange={(event) => {
                      setMarks(event.target.value);
                      setSaved(false);
                    }}
                    placeholder="Enter marks"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-16 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    / {assignment.totalMarks}
                  </span>
                </div>
              </div>

              {/* Feedback */}

              <div className="mt-5">
                <label
                  htmlFor="feedback"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Feedback
                </label>

                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(event) => {
                    setFeedback(event.target.value);
                    setSaved(false);
                  }}
                  rows={6}
                  placeholder="Write feedback for the student..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Save */}

              <button
                onClick={handleSaveGrade}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
              >
                <Save size={16} />
                Save Grade
              </button>

              {saved && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={15} />
                  Grade and feedback saved successfully.
                </div>
              )}
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Submission Summary                                            */}
            {/* ------------------------------------------------------------ */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900">
                Submission Summary
              </h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Status
                  </span>

                  <StatusBadge status={submission.status} />
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-400">
                    Submitted
                  </span>

                  <span className="text-xs font-bold text-slate-700">
                    {submission.submittedAt}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-400">
                    Current Marks
                  </span>

                  <span className="text-sm font-bold text-indigo-600">
                    {submission.marks
                      ? `${submission.marks} / ${assignment.totalMarks}`
                      : "Not graded"}
                  </span>
                </div>
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Navigation                                                     */}
            {/* ------------------------------------------------------------ */}

            <button
              onClick={() =>
                router.push(
                  `/teacher/assignments/${assignmentId}`,
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ArrowLeft size={16} />
              Back to Submissions
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}