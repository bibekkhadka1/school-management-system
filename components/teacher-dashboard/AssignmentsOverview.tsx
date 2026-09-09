"use client";

import {
  ClipboardList,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

const assignments = [
  {
    title: "Database Design Project",
    className: "BCA 3A",
    due: "Sep 08, 2026",
    submissions: 38,
    total: 45,
    status: "REVIEW",
  },
  {
    title: "React Portfolio Website",
    className: "BCA 3B",
    due: "Sep 10, 2026",
    submissions: 31,
    total: 40,
    status: "REVIEW",
  },
  {
    title: "Machine Learning Basics",
    className: "BCA 4A",
    due: "Sep 12, 2026",
    submissions: 40,
    total: 44,
    status: "UPCOMING",
  },
];

export default function AssignmentsOverview() {
  return (
    <div
      className="
        group
        relative
        h-full
        min-h-[420px]
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
                bg-blue-50
                text-blue-600
              "
            >
              <ClipboardList
                size={18}
                strokeWidth={2}
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Assignments Overview
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Recent assignments and submissions
              </p>
            </div>

          </div>

          {/* Count + View All */}
          <button
            type="button"
            className="
              flex
              shrink-0
              cursor-pointer
              items-center
              gap-1
              rounded-lg
              px-2
              py-1.5
              text-[10px]
              font-semibold
              text-blue-600
              transition-all
              duration-200
              hover:bg-blue-50
              hover:text-blue-700
            "
          >
            View All
            <ArrowRight size={12} />
          </button>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mb-4 grid grid-cols-2 gap-3">

          {/* Total Assignments */}
          <div
            className="
              rounded-xl
              border
              border-slate-100
              bg-slate-50/60
              p-3
              transition-all
              duration-200
              hover:border-blue-100
              hover:bg-blue-50/40
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
                  text-blue-600
                  shadow-sm
                "
              >
                <FileCheck2 size={14} />
              </div>

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Assignments
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
              12
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">
              Active this term
            </p>
          </div>

          {/* To Review */}
          <div
            className="
              rounded-xl
              border
              border-amber-100
              bg-amber-50/40
              p-3
              transition-all
              duration-200
              hover:border-amber-200
              hover:bg-amber-50/60
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
                <Clock size={14} />
              </div>

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                To Review
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
              4
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">
              Submissions pending
            </p>
          </div>

        </div>

        {/* ================= ASSIGNMENT LIST ================= */}

        <div className="flex-1 space-y-2.5">

          {assignments.map((assignment) => {

            const submissionPercentage = Math.round(
              (assignment.submissions / assignment.total) * 100
            );

            const isReview = assignment.status === "REVIEW";

            return (
              <div
                key={assignment.title}
                className="
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50/40
                  p-3
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-slate-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >

                {/* Top Row */}

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2.5">

                    {/* Assignment Icon */}

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-blue-600
                        shadow-sm
                      "
                    >
                      <ClipboardList size={14} />
                    </div>

                    {/* Title */}

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-xs
                          font-semibold
                          text-slate-800
                        "
                      >
                        {assignment.title}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[9px]
                          font-medium
                          text-slate-400
                        "
                      >
                        {assignment.className}
                      </p>

                    </div>

                  </div>

                  {/* Status */}

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2
                      py-1
                      text-[8px]
                      font-bold
                      tracking-wide

                      ${
                        isReview
                          ? "bg-amber-50 text-amber-600"
                          : "bg-blue-50 text-blue-600"
                      }
                    `}
                  >
                    {assignment.status}
                  </span>

                </div>

                {/* Bottom Row */}

                <div className="mt-3">

                  <div className="flex items-center justify-between">

                    {/* Due Date */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-medium
                        text-slate-400
                      "
                    >
                      <Clock size={11} />

                      <span>
                        Due {assignment.due}
                      </span>
                    </div>

                    {/* Submissions */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-semibold
                        text-slate-500
                      "
                    >
                      <CheckCircle2
                        size={11}
                        className="text-emerald-500"
                      />

                      <span>
                        {assignment.submissions}/{assignment.total}
                      </span>
                    </div>

                  </div>

                  {/* Progress */}

                  <div className="mt-2 flex items-center gap-2">

                    <div
                      className="
                        h-1
                        flex-1
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      "
                    >
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-blue-500
                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${submissionPercentage}%`,
                        }}
                      />
                    </div>

                    <span
                      className="
                        w-7
                        text-right
                        text-[8px]
                        font-bold
                        text-slate-400
                      "
                    >
                      {submissionPercentage}%
                    </span>

                  </div>

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

          <div className="flex items-center gap-1.5">

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-amber-500
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              4 submissions need review
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
            Manage
            <ArrowRight size={12} />
          </button>

        </div>

      </div>
    </div>
  );
}