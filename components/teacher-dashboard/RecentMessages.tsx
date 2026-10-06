"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";

const messages = [
  {
    name: "Aarav Sharma",
    role: "BCA 3A",
    message: "Sir, could you please clarify the database assignment?",
    time: "10 min ago",
    unread: true,
    initials: "AS",
  },
  {
    name: "Academic Admin",
    role: "Administration",
    message: "Please review the updated examination schedule.",
    time: "42 min ago",
    unread: true,
    initials: "AA",
  },
  {
    name: "Priya Thapa",
    role: "BCA 4A",
    message: "Thank you for the feedback on my project.",
    time: "2 hrs ago",
    unread: false,
    initials: "PT",
  },
  {
    name: "Rohan Karki",
    role: "BCA 3B",
    message: "I have submitted the React portfolio project.",
    time: "3 hrs ago",
    unread: false,
    initials: "RK",
  },
];

export default function RecentMessages() {
  const router = useRouter();

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Recent Messages
            </h2>

            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-600">
              {messages.filter((item) => item.unread).length} unread
            </span>
          </div>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Latest conversations
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/teacher/messages")}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {messages.map((message) => (
          <button
            key={`${message.name}-${message.time}`}
            type="button"
            onClick={() => router.push("/teacher/messages")}
            className="group flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50/70"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[10px] font-black text-indigo-600">
              {message.initials}

              {message.unread && (
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-500" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-bold text-slate-800 group-hover:text-indigo-600">
                  {message.name}
                </p>

                <span className="shrink-0 text-[9px] font-medium text-slate-400">
                  {message.time}
                </span>
              </div>

              <p className="mt-0.5 text-[10px] font-semibold text-slate-400">
                {message.role}
              </p>

              <p className="mt-1 truncate text-[10px] font-medium text-slate-500">
                {message.message}
              </p>
            </div>

            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-indigo-500" />
          </button>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3">
        <button
          type="button"
          onClick={() => router.push("/teacher/messages")}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 text-[10px] font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          Open Messages
        </button>
      </div>
    </section>
  );
}