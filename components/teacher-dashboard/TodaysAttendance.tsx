"use client";

import {
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

const attendance = [
  {
    className: "BCA 3A",
    subject: "DBMS",
    present: 42,
    total: 45,
    status: "DONE",
  },
  {
    className: "BCA 3B",
    subject: "Web Dev",
    present: 38,
    total: 40,
    status: "DONE",
  },
  {
    className: "BCA 4A",
    subject: "Data Science",
    present: 40,
    total: 44,
    status: "PENDING",
  },
];

export default function TodaysAttendance() {
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
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-emerald-500/[0.04]
          blur-3xl
        "
      />

      <div className="relative flex h-full flex-col">
        {/* ================= HEADER ================= */}

        <div className="mb-5 flex items-center justify-between gap-3">
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
                bg-emerald-50
                text-emerald-600
              "
            >
              <ClipboardCheck size={18} strokeWidth={2} />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Today&apos;s Attendance
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Attendance recorded across your classes
              </p>
            </div>
          </div>

          {/* Full Report */}
          <button
            type="button"
            className="
              flex
              shrink-0
              cursor-pointer
              items-center
              gap-1
              rounded-lg
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              text-blue-600
              transition-all
              duration-200
              hover:bg-blue-50
              hover:text-blue-700
            "
          >
            Full Report
            <ArrowRight size={13} />
          </button>
        </div>

        {/* ================= SUMMARY ================= */}

        <div
          className="
            mb-5
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
          "
        >
          {/* Classes */}
          <div
            className="
              rounded-xl
              border
              border-slate-100
              bg-slate-50/60
              p-3
              transition-all
              duration-200
              hover:border-slate-200
              hover:bg-white
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-slate-500
                  shadow-sm
                "
              >
                <Users size={14} />
              </div>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Classes
              </span>
            </div>

            <p
              className="
                mt-2
                text-xl
                font-extrabold
                tracking-tight
                text-slate-800
              "
            >
              {attendance.length}
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">Scheduled today</p>
          </div>

          {/* Present */}
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
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-emerald-600
                  shadow-sm
                "
              >
                <CheckCircle2 size={14} />
              </div>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Present
              </span>
            </div>

            <p
              className="
                mt-2
                text-xl
                font-extrabold
                tracking-tight
                text-slate-800
              "
            >
              120
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">Students present</p>
          </div>

          {/* Pending */}
          <div
            className="
              col-span-2
              rounded-xl
              border
              border-amber-100
              bg-amber-50/40
              p-3
              transition-all
              duration-200
              hover:border-amber-200
              hover:bg-amber-50/60
              sm:col-span-1
            "
          >
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-amber-600
                  shadow-sm
                "
              >
                <Clock3 size={14} />
              </div>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Pending
              </span>
            </div>

            <p
              className="
                mt-2
                text-xl
                font-extrabold
                tracking-tight
                text-slate-800
              "
            >
              1
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">Needs attention</p>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th
                  className="
                    pb-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.7px]
                    text-slate-400
                  "
                >
                  Class
                </th>

                <th
                  className="
                    pb-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.7px]
                    text-slate-400
                  "
                >
                  Subject
                </th>

                <th
                  className="
                    pb-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.7px]
                    text-slate-400
                  "
                >
                  Attendance
                </th>

                <th
                  className="
                    pb-3
                    text-right
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.7px]
                    text-slate-400
                  "
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item, index) => {
                const percentage = Math.round(
                  (item.present / item.total) * 100,
                );

                const isDone = item.status === "DONE";

                return (
                  <tr
                    key={index}
                    className="
                      border-b
                      border-slate-50
                      transition-colors
                      duration-200
                      last:border-0
                      hover:bg-slate-50/70
                    "
                  >
                    {/* Class */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-slate-100
                            text-[9px]
                            font-bold
                            text-slate-600
                            transition-all
                            duration-200
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          {item.className.replace("BCA ", "")}
                        </div>

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-slate-700
                          "
                        >
                          {item.className}
                        </span>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="py-3.5">
                      <span
                        className="
                          text-xs
                          font-medium
                          text-slate-500
                        "
                      >
                        {item.subject}
                      </span>
                    </td>

                    {/* Attendance */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="min-w-[65px]">
                          <div className="flex items-center gap-1">
                            <span
                              className="
                                text-xs
                                font-bold
                                text-slate-700
                              "
                            >
                              {item.present}
                            </span>

                            <span
                              className="
                                text-[9px]
                                text-slate-400
                              "
                            >
                              / {item.total}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div
                            className="
                              mt-1.5
                              h-1
                              w-16
                              overflow-hidden
                              rounded-full
                              bg-slate-100
                            "
                          >
                            <div
                              className={`
                                h-full
                                rounded-full
                                transition-all
                                duration-500

                                ${
                                  percentage >= 90
                                    ? "bg-emerald-500"
                                    : percentage >= 80
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }
                              `}
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </div>

                        <span
                          className={`
                            text-[9px]
                            font-bold

                            ${
                              percentage >= 90
                                ? "text-emerald-600"
                                : percentage >= 80
                                  ? "text-blue-600"
                                  : "text-amber-600"
                            }
                          `}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 text-right">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          px-2.5
                          py-1
                          text-[8px]
                          font-bold
                          tracking-wide

                          ${
                            isDone
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }
                        `}
                      >
                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full

                            ${isDone ? "bg-emerald-500" : "bg-amber-500"}
                          `}
                        />

                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
          <span
            className="
              text-[10px]
              font-medium
              text-slate-400
            "
          >
            Attendance updated today
          </span>

          <button
            type="button"
            className="
              cursor-pointer
              text-[10px]
              font-semibold
              text-slate-500
              transition-colors
              duration-200
              hover:text-blue-600
            "
          >
            Manage Attendance →
          </button>
        </div>
      </div>
    </div>
  );
}
