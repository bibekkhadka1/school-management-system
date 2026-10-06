"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";

const attendance = [
  {
    className: "BCA-3A",
    present: 40,
    total: 42,
    percentage: 95,
  },
  {
    className: "BCA-3B",
    present: 35,
    total: 38,
    percentage: 92,
  },
  {
    className: "BCA-4A",
    present: 44,
    total: 45,
    percentage: 98,
  },
];

export default function TodaysAttendance() {
  const router = useRouter();

  const totalPresent = attendance.reduce((sum, item) => sum + item.present, 0);
  const totalStudents = attendance.reduce((sum, item) => sum + item.total, 0);
  const overall = Math.round((totalPresent / totalStudents) * 100);

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Today&apos;s Attendance
          </h2>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Attendance recorded for today
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/teacher/attendance")}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50"
        >
          Open attendance
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Overall
              </p>
              <p className="mt-0.5 text-xl font-black text-slate-900">
                {overall}%
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold text-slate-700">
              {totalPresent}/{totalStudents}
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              Present
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {attendance.map((item) => (
            <div key={item.className}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100">
                    <Users className="h-3.5 w-3.5 text-slate-500" />
                  </div>

                  <span className="text-xs font-bold text-slate-800">
                    {item.className}
                  </span>
                </div>

                <span className="text-xs font-black text-slate-700">
                  {item.percentage}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <p className="mt-1.5 text-[10px] font-medium text-slate-400">
                {item.present} present · {item.total - item.present} absent
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}