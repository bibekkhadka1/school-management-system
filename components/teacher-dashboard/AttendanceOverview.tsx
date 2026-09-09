"use client";

import {
  BarChart3,
  TrendingUp,
  ArrowRight,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

const attendanceData = [
  { day: "Mon", percentage: 91 },
  { day: "Tue", percentage: 87 },
  { day: "Wed", percentage: 94 },
  { day: "Thu", percentage: 82 },
  { day: "Fri", percentage: 89 },
  { day: "Sat", percentage: 96 },
];

export default function AttendanceOverview() {
  const average = Math.round(
    attendanceData.reduce((sum, item) => sum + item.percentage, 0) /
      attendanceData.length
  );

  return (
    <div
      className="
        group
        relative
        h-full
        min-h-[520px]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-lg
      "
    >
      {/* Decorative Background */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-blue-500/[0.04]
          blur-3xl
        "
      />

      <div className="relative flex h-full flex-col">

        {/* ================= HEADER ================= */}

        <div className="mb-5 flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            {/* Icon */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
              "
            >
              <BarChart3 size={18} strokeWidth={2} />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Attendance Overview
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Weekly attendance performance
              </p>
            </div>

          </div>

          {/* Period Selector */}
          <button
            type="button"
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-1.5
              text-[10px]
              font-semibold
              text-slate-600
              shadow-sm
              transition-all
              duration-200
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            This Week
            <ChevronDown size={12} />
          </button>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

          {/* Average */}
          <div
            className="
              rounded-xl
              border
              border-blue-100
              bg-blue-50/40
              p-3
              transition-all
              duration-200
              hover:border-blue-200
              hover:bg-blue-50/60
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.6px]
                text-slate-400
              "
            >
              Average
            </p>

            <div className="mt-1 flex items-baseline gap-1">

              <span
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                {average}%
              </span>

              <span className="text-[9px] font-semibold text-emerald-600">
                +2.4%
              </span>

            </div>
          </div>

          {/* Best */}
          <div
            className="
              rounded-xl
              border
              border-emerald-100
              bg-emerald-50/40
              p-3
              transition-all
              duration-200
              hover:border-emerald-200
              hover:bg-emerald-50/60
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.6px]
                text-slate-400
              "
            >
              Best Day
            </p>

            <div className="mt-1 flex items-baseline gap-2">

              <span
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                96%
              </span>

              <span className="text-[9px] font-semibold text-slate-400">
                Sat
              </span>

            </div>
          </div>

          {/* Trend */}
          <div
            className="
              col-span-2
              rounded-xl
              border
              border-violet-100
              bg-violet-50/40
              p-3
              transition-all
              duration-200
              hover:border-violet-200
              hover:bg-violet-50/60
              sm:col-span-1
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.6px]
                text-slate-400
              "
            >
              Monthly Trend
            </p>

            <div className="mt-1 flex items-center gap-2">

              <TrendingUp
                size={17}
                className="text-violet-600"
              />

              <span
                className="
                  text-xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                +4.8%
              </span>

            </div>
          </div>

        </div>

        {/* ================= CHART ================= */}

        <div
          className="
            flex
            flex-1
            flex-col
            rounded-xl
            border
            border-slate-100
            bg-slate-50/40
            p-4
          "
        >

          {/* Chart Header */}

          <div className="mb-4 flex items-center justify-between">

            <div>
              <p className="text-xs font-bold text-slate-700">
                Daily Attendance
              </p>

              <p className="mt-0.5 text-[9px] text-slate-400">
                Percentage of students present
              </p>
            </div>

            <span
              className="
                rounded-full
                bg-emerald-50
                px-2
                py-1
                text-[8px]
                font-bold
                text-emerald-600
              "
            >
              Healthy
            </span>

          </div>

          {/* Graph */}

          <div className="relative flex flex-1 items-end">

            {/* Horizontal Grid Lines */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                bottom-7
                flex
                flex-col
                justify-between
              "
            >
              {[100, 90, 80, 70].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-2"
                >
                  <span
                    className="
                      w-7
                      text-right
                      text-[8px]
                      font-medium
                      text-slate-300
                    "
                  >
                    {value}
                  </span>

                  <div className="h-px flex-1 bg-slate-100" />
                </div>
              ))}
            </div>

            {/* Bars */}

            <div
              className="
                relative
                z-10
                ml-9
                flex
                h-full
                flex-1
                items-end
                justify-between
                gap-3
                pb-7
              "
            >

              {attendanceData.map((item) => (

                <div
                  key={item.day}
                  className="
                    group/bar
                    flex
                    h-full
                    flex-1
                    flex-col
                    items-center
                    justify-end
                  "
                >

                  {/* Percentage */}

                  <span
                    className="
                      mb-2
                      text-[9px]
                      font-bold
                      text-slate-500
                      opacity-0
                      transition-all
                      duration-200
                      group-hover/bar:opacity-100
                    "
                  >
                    {item.percentage}%
                  </span>

                  {/* Bar */}

                  <div
                    className="
                      relative
                      w-full
                      max-w-[38px]
                      overflow-hidden
                      rounded-t-lg
                      bg-blue-500/10
                    "
                    style={{
                      height: `${item.percentage}%`,
                    }}
                  >
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-t-lg
                        bg-blue-500
                        opacity-80
                        transition-all
                        duration-300
                        hover:bg-blue-600
                      "
                    />
                  </div>

                  {/* Day */}

                  <span
                    className="
                      absolute
                      bottom-0
                      text-[9px]
                      font-semibold
                      text-slate-400
                    "
                  >
                    {item.day}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            border-t
            border-slate-100
            pt-3
          "
        >

          <div className="flex items-center gap-2">

            <CalendarDays
              size={12}
              className="text-slate-400"
            />

            <span className="text-[10px] font-medium text-slate-400">
              Last updated today
            </span>

          </div>

          <button
            type="button"
            className="
              flex
              cursor-pointer
              items-center
              gap-1
              text-[10px]
              font-semibold
              text-slate-500
              transition-colors
              duration-200
              hover:text-blue-600
            "
          >
            View Full Report
            <ArrowRight size={12} />
          </button>

        </div>

      </div>
    </div>
  );
}