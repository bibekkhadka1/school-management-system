"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Active Classes",
    value: "6",
    description: "Classes currently assigned",
    change: "+12%",
    icon: BookOpen,
    iconClass: "bg-indigo-50 text-indigo-600",
    hoverClass: "hover:border-indigo-200",
    href: "/teacher/classes",
  },
  {
    title: "Total Students",
    value: "244",
    description: "Students across your classes",
    change: "+8%",
    icon: Users,
    iconClass: "bg-blue-50 text-blue-600",
    hoverClass: "hover:border-blue-200",
    href: "/teacher/students",
  },
  {
    title: "Attendance Rate",
    value: "94.3%",
    description: "Overall class attendance",
    change: "+2.4%",
    icon: Users,
    iconClass: "bg-emerald-50 text-emerald-600",
    hoverClass: "hover:border-emerald-200",
    href: "/teacher/attendance",
  },
  {
    title: "Pending Assignments",
    value: "8",
    description: "Assignments requiring review",
    change: "4 urgent",
    icon: ClipboardList,
    iconClass: "bg-orange-50 text-orange-600",
    hoverClass: "hover:border-orange-200",
    href: "/teacher/assignments",
  },
  {
    title: "Unread Messages",
    value: "7",
    description: "Messages awaiting response",
    change: "View now",
    icon: MessageSquare,
    iconClass: "bg-violet-50 text-violet-600",
    hoverClass: "hover:border-violet-200",
    href: "/teacher/messages",
  },
];

export default function StatCards() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <button
            key={stat.title}
            type="button"
            onClick={() => router.push(stat.href)}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${stat.hoverClass}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-indigo-500" />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {stat.title}
            </p>

            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-2xl font-black tracking-tight text-slate-900">
                {stat.value}
              </p>

              <span className="rounded-full bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-500">
                {stat.change}
              </span>
            </div>

            <p className="mt-1 text-[10px] font-medium text-slate-400">
              {stat.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}