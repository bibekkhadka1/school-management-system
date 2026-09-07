"use client";

import {
  BookOpen,
  Users,
  ClipboardCheck,
  ClipboardList,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "MY CLASSES",
    value: "06",
    description: "Currently assigned",
    icon: BookOpen,
    accent: "blue",
    trend: "+1 this term",
  },
  {
    title: "TOTAL STUDENTS",
    value: "184",
    description: "Assigned to you",
    icon: Users,
    accent: "indigo",
    trend: "+12 active",
  },
  {
    title: "ATTENDANCE",
    value: "87.4%",
    description: "Avg. this month",
    icon: ClipboardCheck,
    accent: "emerald",
    trend: "2.4%",
  },
  {
    title: "ASSIGNMENTS",
    value: "12",
    description: "To review",
    icon: ClipboardList,
    accent: "amber",
    trend: "4 urgent",
  },
  {
    title: "MESSAGES",
    value: "03",
    description: "Unread inbox",
    icon: MessageSquare,
    accent: "violet",
    trend: "New today",
  },
];

// Custom theme styles for each card when hovered
const cardThemes = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600 group-hover:bg-white/80 group-hover:text-blue-700",
    hoverBg: "hover:bg-gradient-to-br hover:from-blue-500/10 hover:via-blue-500/5 hover:to-transparent hover:border-blue-400/50",
    badge: "group-hover:bg-blue-500/10 group-hover:text-blue-700",
    shadow: "hover:shadow-blue-500/10",
  },
  indigo: {
    iconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-white/80 group-hover:text-indigo-700",
    hoverBg: "hover:bg-gradient-to-br hover:from-indigo-500/10 hover:via-indigo-500/5 hover:to-transparent hover:border-indigo-400/50",
    badge: "group-hover:bg-indigo-500/10 group-hover:text-indigo-700",
    shadow: "hover:shadow-indigo-500/10",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-white/80 group-hover:text-emerald-700",
    hoverBg: "hover:bg-gradient-to-br hover:from-emerald-500/10 hover:via-emerald-500/5 hover:to-transparent hover:border-emerald-400/50",
    badge: "group-hover:bg-emerald-500/10 group-hover:text-emerald-700",
    shadow: "hover:shadow-emerald-500/10",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 group-hover:bg-white/80 group-hover:text-amber-700",
    hoverBg: "hover:bg-gradient-to-br hover:from-amber-500/10 hover:via-amber-500/5 hover:to-transparent hover:border-amber-400/50",
    badge: "group-hover:bg-amber-500/10 group-hover:text-amber-700",
    shadow: "hover:shadow-amber-500/10",
  },
  violet: {
    iconBg: "bg-violet-50 text-violet-600 group-hover:bg-white/80 group-hover:text-violet-700",
    hoverBg: "hover:bg-gradient-to-br hover:from-violet-500/10 hover:via-violet-500/5 hover:to-transparent hover:border-violet-400/50",
    badge: "group-hover:bg-violet-500/10 group-hover:text-violet-700",
    shadow: "hover:shadow-violet-500/10",
  },
};

export default function StatCards() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const theme = cardThemes[stat.accent];

        return (
          <div
            key={stat.title}
            className={`group relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.hoverBg} ${theme.shadow}`}
          >
            <div>
              {/* Top Row: Title + Icon Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-inter font-semibold text-[11px] leading-[14px] tracking-[0.6px] text-slate-500 group-hover:text-slate-700">
                  {stat.title}
                </span>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${theme.iconBg}`}
                >
                  <Icon size={18} />
                </div>
              </div>

              {/* Metric Value */}
              <div className="mt-3 flex items-baseline gap-2">
                <p className="text-3xl font-extrabold tracking-tight text-slate-900 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {stat.value}
                </p>
              </div>
            </div>

            {/* Bottom Row: Description & Trend Pill */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 group-hover:border-slate-200/60 pt-3 transition-colors">
              <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-600">
                {stat.description}
              </span>

              <div
                className={`flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-full transition-colors ${theme.badge}`}
              >
                <TrendingUp size={11} />
                <span>{stat.trend}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}