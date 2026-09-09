"use client";

import {
  CalendarDays,
  Clock3,
  ArrowRight,
  MapPin,
} from "lucide-react";

const classes = [
  {
    time: "9:00 AM - 10:30 AM",
    subject: "Database Management Systems",
    className: "BCA 3rd",
    room: "Room 201",
    status: "COMPLETED",
  },
  {
    time: "11:00 AM - 12:30 PM",
    subject: "Web Development",
    className: "BCA 3rd",
    room: "Lab 2",
    status: "IN PROGRESS",
  },
  {
    time: "2:00 PM - 3:30 PM",
    subject: "Data Science Fundamentals",
    className: "BCA 4th",
    room: "Room 205",
    status: "UPCOMING",
  },
];

export default function TodaysClasses() {
  return (
    <div
      className="
        group
        relative
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
          bg-blue-500/[0.04]
          blur-3xl
        "
      />

      <div className="relative">

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
                bg-blue-50
                text-blue-600
              "
            >
              <CalendarDays
                size={18}
                strokeWidth={2}
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Today&apos;s Classes
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Your teaching schedule for today
              </p>
            </div>

          </div>

          {/* View Schedule */}
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
            View Schedule

            <ArrowRight
              size={13}
            />
          </button>

        </div>

        {/* ================= CLASSES ================= */}

        <div className="space-y-3">

          {classes.map((item, index) => {

            const isCurrent =
              item.status === "IN PROGRESS";

            const isCompleted =
              item.status === "COMPLETED";

            return (
              <div
                key={index}
                className={`
                  group/class
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5

                  ${
                    isCurrent
                      ? "border-blue-200 bg-blue-50/40 shadow-sm"
                      : "border-slate-100 bg-slate-50/40 hover:border-slate-200 hover:bg-white hover:shadow-sm"
                  }
                `}
              >

                {/* Current Class Indicator */}
                {isCurrent && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-1
                      bg-blue-600
                    "
                  />
                )}

                <div className="flex items-center justify-between gap-4">

                  {/* ================= LEFT CONTENT ================= */}

                  <div className="flex min-w-0 items-start gap-3">

                    {/* Time Icon */}
                    <div
                      className={`
                        mt-0.5
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${
                          isCurrent
                            ? "bg-blue-100 text-blue-600"
                            : "bg-white text-slate-400"
                        }
                      `}
                    >
                      <Clock3
                        size={16}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Class Details */}
                    <div className="min-w-0">

                      {/* Time + Live */}
                      <div className="flex flex-wrap items-center gap-2">

                        <p
                          className="
                            text-[10px]
                            font-semibold
                            text-slate-400
                          "
                        >
                          {item.time}
                        </p>

                        {isCurrent && (
                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              bg-blue-100
                              px-2
                              py-0.5
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-wide
                              text-blue-700
                            "
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                                bg-blue-600
                              "
                            />

                            Live
                          </span>
                        )}

                      </div>

                      {/* Subject */}
                      <p
                        className="
                          mt-1
                          truncate
                          text-sm
                          font-bold
                          text-slate-800
                          transition-colors
                          duration-200
                          group-hover:text-blue-700
                        "
                      >
                        {item.subject}
                      </p>

                      {/* Class + Room */}
                      <div
                        className="
                          mt-1.5
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >

                        <span
                          className="
                            text-[10px]
                            font-medium
                            text-slate-500
                          "
                        >
                          {item.className}
                        </span>

                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            text-[10px]
                            font-medium
                            text-slate-400
                          "
                        >
                          <MapPin size={10} />

                          {item.room}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ================= STATUS ================= */}

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2.5
                      py-1
                      text-[8px]
                      font-bold
                      tracking-wide

                      ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-600"
                          : isCurrent
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </div>

              </div>
            );
          })}

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
            3 classes scheduled today
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
            Full schedule →
          </button>

        </div>

      </div>
    </div>
  );
}