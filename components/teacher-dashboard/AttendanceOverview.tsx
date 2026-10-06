"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const data = {
  Week: [
    { label: "Mon", value: 94 },
    { label: "Tue", value: 96 },
    { label: "Wed", value: 91 },
    { label: "Thu", value: 95 },
    { label: "Fri", value: 93 },
  ],
  Month: [
    { label: "Week 1", value: 91 },
    { label: "Week 2", value: 94 },
    { label: "Week 3", value: 96 },
    { label: "Week 4", value: 93 },
  ],
  Semester: [
    { label: "Jun", value: 91 },
    { label: "Jul", value: 93 },
    { label: "Aug", value: 95 },
    { label: "Sep", value: 94 },
  ],
};

type Period = keyof typeof data;

export default function AttendanceOverview() {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("Week");

  const chartData = data[period];

  const average = useMemo(() => {
    return Math.round(
      chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length,
    );
  }, [chartData]);

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Attendance Overview
            </h2>

            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              {average}%
            </span>
          </div>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Attendance performance over time
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-[10px] font-bold text-slate-600 outline-none transition hover:border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
              <option value="Semester">Semester</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            type="button"
            onClick={() => router.push("/teacher/attendance")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50"
          >
            Report
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Average attendance
            </p>

            <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
              {average}%
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Healthy range
          </div>
        </div>

        <div className="flex h-44 items-end gap-3 border-b border-slate-100 px-1">
          {chartData.map((item) => {
            const height = Math.max(20, ((item.value - 80) / 20) * 100);

            return (
              <div
                key={item.label}
                className="group flex h-full flex-1 flex-col justify-end"
              >
                <div className="relative flex flex-1 items-end justify-center">
                  <div className="absolute bottom-full mb-2 rounded-md bg-slate-900 px-2 py-1 text-[9px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                    {item.value}%
                  </div>

                  <div
                    className="w-full max-w-10 rounded-t-lg bg-indigo-500 transition-all duration-500 group-hover:bg-indigo-600"
                    style={{ height: `${height}%` }}
                  />
                </div>

                <span className="mt-2 text-center text-[9px] font-bold text-slate-400">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
            <BarChart3 className="h-3.5 w-3.5" />
            Attendance trend
          </div>

          <span className="text-[10px] font-bold text-slate-500">
            Target: 90%+
          </span>
        </div>
      </div>
    </section>
  );
}