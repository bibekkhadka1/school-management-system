"use client";

import {
  FileCheck,
  ClipboardList,
  ClipboardCheck,
  FileText,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const tasks = [
  {
    title: "Grade Assignments",
    count: "4 submissions",
    priority: "URGENT",
    icon: FileCheck,
  },
  {
    title: "Enter Exam Marks",
    count: "2 pending",
    priority: "IMPORTANT",
    icon: ClipboardList,
  },
  {
    title: "Mark Attendance",
    count: "1 class",
    priority: "NORMAL",
    icon: ClipboardCheck,
  },
  {
    title: "Material Review",
    count: "3 items",
    priority: "NORMAL",
    icon: FileText,
  },
];

export default function PendingTasks() {
  return (
    <div
      className="
        group
        relative
        h-full
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
          bg-amber-500/[0.04]
          blur-3xl
        "
      />

      <div className="relative flex h-full flex-col">

        {/* ================= HEADER ================= */}

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Icon */}
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-amber-50
                text-amber-600
              "
            >
              <AlertCircle
                size={18}
                strokeWidth={2}
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Pending Tasks
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Tasks that need your attention
              </p>
            </div>

          </div>

          {/* Task Count */}
          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              bg-slate-100
              px-2.5
              py-1
            "
          >
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
                text-[9px]
                font-bold
                text-slate-500
              "
            >
              {tasks.length} Tasks
            </span>
          </div>

        </div>

        {/* ================= TASK LIST ================= */}

        <div className="flex-1 space-y-2.5">

          {tasks.map((task, index) => {
            const Icon = task.icon;

            const isUrgent = task.priority === "URGENT";
            const isImportant = task.priority === "IMPORTANT";

            return (
              <div
                key={index}
                className="
                  relative
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50/50
                  p-3
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-slate-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >

                {/* Priority Indicator */}
                <div
                  className={`
                    absolute
                    left-0
                    top-1/2
                    h-6
                    w-0.5
                    -translate-y-1/2
                    rounded-r-full

                    ${
                      isUrgent
                        ? "bg-red-500"
                        : isImportant
                        ? "bg-amber-500"
                        : "bg-slate-300"
                    }
                  `}
                />

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg

                    ${
                      isUrgent
                        ? "bg-red-50 text-red-500"
                        : isImportant
                        ? "bg-amber-50 text-amber-600"
                        : "bg-blue-50 text-blue-600"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={2}
                  />
                </div>

                {/* Task Details */}
                <div className="min-w-0 flex-1">

                  <p
                    className="
                      truncate
                      text-xs
                      font-semibold
                      text-slate-800
                    "
                  >
                    {task.title}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      font-medium
                      text-slate-400
                    "
                  >
                    {task.count}
                  </p>

                </div>

                {/* Priority */}
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
                      isUrgent
                        ? "bg-red-50 text-red-500"
                        : isImportant
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {task.priority}
                </span>

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

            <CheckCircle2
              size={12}
              className="text-emerald-500"
            />

            <span
              className="
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              Stay on top of your work
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
            View All

            <ArrowRight size={12} />
          </button>

        </div>

      </div>
    </div>
  );
}