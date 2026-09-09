"use client";

import {
  CalendarDays,
  ClipboardCheck,
  FilePlus,
  Upload,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function DashboardHeader() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const actions = [
    {
      label: "Mark Attendance",
      icon: ClipboardCheck,
      color: "blue",
    },
    {
      label: "Create Assignment",
      icon: FilePlus,
      color: "indigo",
    },
    {
      label: "Upload Material",
      icon: Upload,
      color: "emerald",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      color: "violet",
    },
  ];

  return (
    <div className="mb-6">

      {/* =========================
          HERO / GREETING
      ========================== */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border border-slate-200/80
          bg-white
          px-5 py-6
          shadow-sm
          sm:px-6
          lg:px-7
        "
      >

        {/* Decorative gradient */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            right-32
            h-48
            w-48
            rounded-full
            bg-indigo-500/5
            blur-3xl
          "
        />

        <div className="relative">

          {/* Top section */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Greeting */}
            <div>

              <div className="mb-2 flex items-center gap-2">

                <span
                  className="
                    inline-flex
                    h-7
                    items-center
                    rounded-full
                    bg-blue-50
                    px-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.8px]
                    text-blue-700
                  "
                >
                  Teacher Dashboard
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span className="text-[11px] font-medium text-slate-400">
                  Today
                </span>

              </div>

              <h1
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                "
              >
                Good Morning, Teacher
                <span className="ml-2">👋</span>
              </h1>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Here&apos;s what&apos;s happening with your classes today.
                Stay organized and keep your students on track.
              </p>

            </div>

            {/* Date Card */}
            <div
              className="
                flex
                w-fit
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                transition-all
                duration-300
                hover:border-blue-200
                hover:bg-blue-50/50
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-blue-600
                  shadow-sm
                "
              >
                <CalendarDays size={18} strokeWidth={2} />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.7px]
                    text-slate-400
                  "
                >
                  Today&apos;s Date
                </p>

                <p className="mt-0.5 text-xs font-semibold text-slate-700">
                  {formattedDate}
                </p>
              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-slate-100" />

          {/* =========================
              QUICK ACTIONS
          ========================== */}

          <div>

            <div className="mb-3 flex items-center justify-between">

              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  Quick Actions
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Frequently used teacher tools
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">

              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    type="button"
                    className="
                      group
                      flex
                      cursor-pointer
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-3
                      text-left
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-blue-200
                      hover:bg-blue-50/40
                      hover:shadow-md
                      active:translate-y-0
                    "
                  >

                    <div className="flex items-center gap-3">

                      {/* Icon */}
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-50
                          text-slate-600
                          transition-all
                          duration-300
                          group-hover:bg-blue-600
                          group-hover:text-white
                        "
                      >
                        <Icon size={16} strokeWidth={2} />
                      </div>

                      {/* Label */}
                      <span
                        className="
                          text-xs
                          font-semibold
                          text-slate-700
                          transition-colors
                          group-hover:text-blue-700
                        "
                      >
                        {action.label}
                      </span>

                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      size={14}
                      className="
                        text-slate-300
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:text-blue-500
                      "
                    />

                  </button>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}