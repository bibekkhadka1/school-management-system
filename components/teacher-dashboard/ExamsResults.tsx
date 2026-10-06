"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
} from "lucide-react";

const exams = [
  {
    id: 1,
    title: "First Terminal Examination",
    subject: "Database Management Systems",
    className: "BCA 3A",
    date: "Sep 15, 2026",
    marks: 100,
    status: "Marks Entered",
  },
  {
    id: 2,
    title: "First Terminal Examination",
    subject: "Web Development",
    className: "BCA 3B",
    date: "Sep 17, 2026",
    marks: 100,
    status: "Marks Pending",
  },
  {
    id: 3,
    title: "Mid-Term Examination",
    subject: "Data Science",
    className: "BCA 4A",
    date: "Sep 22, 2026",
    marks: 100,
    status: "Upcoming",
  },
];

export default function ExamsResults() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState<(typeof exams)[number] | null>(
    null,
  );

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Exams & Results
              </h2>

              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-600">
                {exams.length}
              </span>
            </div>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              Examination schedule and result status
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/teacher/exams")}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="group px-5 py-4 transition hover:bg-slate-50/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      exam.status === "Marks Entered"
                        ? "bg-emerald-50 text-emerald-600"
                        : exam.status === "Marks Pending"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {exam.status === "Marks Entered" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Award className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-800">
                      {exam.title}
                    </p>

                    <p className="mt-1 truncate text-[10px] font-medium text-slate-400">
                      {exam.subject} · {exam.className}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExam(exam)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  title="View details"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[9px] font-bold text-slate-500">
                  <CalendarDays className="h-3 w-3" />
                  {exam.date}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[9px] font-bold text-slate-500">
                  <Award className="h-3 w-3" />
                  {exam.marks} marks
                </span>

                <StatusBadge status={exam.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    Examination Details
                  </p>

                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {selectedExam.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExam(null)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <Detail label="Subject" value={selectedExam.subject} />
              <Detail label="Class" value={selectedExam.className} />
              <Detail label="Date" value={selectedExam.date} />
              <Detail label="Full Marks" value={`${selectedExam.marks}`} />
              <Detail label="Status" value={selectedExam.status} />
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 p-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedExam(null);
                  router.push("/teacher/exams");
                }}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
              >
                Open Exams Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Marks Entered"
      ? "bg-emerald-50 text-emerald-600"
      : status === "Marks Pending"
        ? "bg-orange-50 text-orange-600"
        : "bg-violet-50 text-violet-600";

  return (
    <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${styles}`}>
      {status}
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">
      <span className="text-[10px] font-semibold text-slate-400">
        {label}
      </span>

      <span className="text-xs font-bold text-slate-700">{value}</span>
    </div>
  );
}