"use client";

import { useState } from "react";
import { ArrowRight, Check, ClipboardList, Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  href: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Review Database assignments",
    description: "38 submissions waiting",
    priority: "High",
    href: "/teacher/assignments",
  },
  {
    id: 2,
    title: "Complete BCA-3B attendance",
    description: "Today's attendance",
    priority: "High",
    href: "/teacher/attendance",
  },
  {
    id: 3,
    title: "Prepare Data Science exam",
    description: "Exam scheduled Sep 22",
    priority: "Medium",
    href: "/teacher/exams",
  },
  {
    id: 4,
    title: "Upload course material",
    description: "Web Development module",
    priority: "Low",
    href: "/teacher/materials",
  },
];

export default function PendingTasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);

  const completeTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Pending Tasks
            </h2>

            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">
              {tasks.length}
            </span>
          </div>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Things that need your attention
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="group flex gap-3 px-5 py-4 transition hover:bg-slate-50/70"
            >
              <button
                type="button"
                onClick={() => completeTask(task.id)}
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-transparent transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                aria-label={`Complete ${task.title}`}
                title="Mark complete"
              >
                <Check className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => router.push(task.href)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold text-slate-800 transition group-hover:text-indigo-600">
                    {task.title}
                  </p>

                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      task.priority === "High"
                        ? "bg-rose-50 text-rose-600"
                        : task.priority === "Medium"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="mt-1 text-[10px] font-medium text-slate-400">
                  {task.description}
                </p>
              </button>

              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
            </div>
          ))
        ) : (
          <div className="px-5 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ClipboardList className="h-5 w-5" />
            </div>

            <p className="mt-3 text-xs font-bold text-slate-800">
              All caught up
            </p>

            <p className="mt-1 text-[10px] font-medium text-slate-400">
              You have no pending tasks.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3">
        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          Click the check button to complete a task
        </div>
      </div>
    </section>
  );
}