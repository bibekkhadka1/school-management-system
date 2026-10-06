"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHeader() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Welcome");
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();

    setGreeting(getGreeting());

    setDate(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="relative overflow-hidden px-5 py-6 sm:px-7 sm:py-7">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-50/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-28 h-48 w-48 rounded-full bg-blue-50/60 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {date || "Today"}
                </span>

                <span className="hidden text-xs font-medium text-slate-300 sm:inline">
                  •
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  Teacher Dashboard
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {greeting}, Teacher
              </h1>

              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
                Here&apos;s your teaching overview for today. Manage classes,
                attendance, assignments and student activities from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => router.push("/teacher/attendance")}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-[0.98]"
              >
                <Users className="h-4 w-4" />
                Attendance
              </button>

              <button
                type="button"
                onClick={() => router.push("/teacher/assignments/new")}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-3.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                New Assignment
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <QuickAction
              icon={<BookOpen className="h-4 w-4" />}
              title="Classes"
              description="Manage your classes"
              onClick={() => router.push("/teacher/classes")}
            />

            <QuickAction
              icon={<ClipboardList className="h-4 w-4" />}
              title="Assignments"
              description="Create and review work"
              onClick={() => router.push("/teacher/assignments")}
            />

            <QuickAction
              icon={<MessageSquare className="h-4 w-4" />}
              title="Messages"
              description="Check student messages"
              onClick={() => router.push("/teacher/messages")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50/50"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 transition group-hover:ring-indigo-200">
          {icon}
        </span>

        <span className="min-w-0">
          <span className="block text-xs font-bold text-slate-800">
            {title}
          </span>
          <span className="mt-0.5 block truncate text-[10px] font-medium text-slate-400">
            {description}
          </span>
        </span>
      </span>

      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
    </button>
  );
}