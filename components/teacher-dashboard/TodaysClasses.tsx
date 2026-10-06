"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

const classes = [
  {
    code: "BCA-3A",
    subject: "Database Management Systems",
    time: "10:00 AM – 11:30 AM",
    room: "Room 204",
    students: 42,
    status: "Upcoming",
  },
  {
    code: "BCA-3B",
    subject: "Web Development",
    time: "11:30 AM – 1:00 PM",
    room: "Room 205",
    students: 38,
    status: "Upcoming",
  },
  {
    code: "BCA-4A",
    subject: "Data Science & AI",
    time: "2:00 PM – 3:30 PM",
    room: "Room 301",
    students: 45,
    status: "Upcoming",
  },
];

export default function TodaysClasses() {
  const router = useRouter();

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Today&apos;s Classes
            </h2>

            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
              {classes.length}
            </span>
          </div>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Your scheduled classes for today
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/teacher/classes")}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {classes.map((item, index) => (
          <div
            key={item.code}
            className="group px-5 py-4 transition hover:bg-slate-50/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-600">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">
                      {item.code}
                    </h3>

                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs font-semibold text-slate-600">
                    {item.subject}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/teacher/classes/${encodeURIComponent(item.code)}`,
                  )
                }
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                aria-label={`Open ${item.code}`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Info
                icon={<Clock3 className="h-3.5 w-3.5" />}
                text={item.time}
              />

              <Info
                icon={<MapPin className="h-3.5 w-3.5" />}
                text={item.room}
              />

              <Info
                icon={<Users className="h-3.5 w-3.5" />}
                text={`${item.students} students`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3">
        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" />
          Schedule is based on your current timetable
        </div>
      </div>
    </section>
  );
}

function Info({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-[10px] font-semibold text-slate-500">
      <span className="text-slate-400">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}