"use client";

import {
  BookOpen,
  Users,
  ClipboardCheck,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
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
    trend: "+2.4%",
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

const cardThemes = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    glow: "group-hover:bg-blue-500",
    gradient:
      "from-blue-500/[0.08] via-blue-500/[0.02] to-transparent",
    trend:
      "bg-blue-50 text-blue-700 group-hover:bg-blue-100",
  },

  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    glow: "group-hover:bg-indigo-500",
    gradient:
      "from-indigo-500/[0.08] via-indigo-500/[0.02] to-transparent",
    trend:
      "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100",
  },

  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    glow: "group-hover:bg-emerald-500",
    gradient:
      "from-emerald-500/[0.08] via-emerald-500/[0.02] to-transparent",
    trend:
      "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100",
  },

  amber: {
    icon: "bg-amber-50 text-amber-600",
    glow: "group-hover:bg-amber-500",
    gradient:
      "from-amber-500/[0.08] via-amber-500/[0.02] to-transparent",
    trend:
      "bg-amber-50 text-amber-700 group-hover:bg-amber-100",
  },

  violet: {
    icon: "bg-violet-50 text-violet-600",
    glow: "group-hover:bg-violet-500",
    gradient:
      "from-violet-500/[0.08] via-violet-500/[0.02] to-transparent",
    trend:
      "bg-violet-50 text-violet-700 group-hover:bg-violet-100",
  },
};

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

      {stats.map((stat) => {
        const Icon = stat.icon;
        const theme =
          cardThemes[stat.accent as keyof typeof cardThemes];

        return (
          <div
            key={stat.title}
            className={`
              group relative overflow-hidden
              rounded-2xl border border-slate-200/80
              bg-white
              p-5
              shadow-sm
              transition-all duration-300 ease-out

              hover:-translate-y-1
              hover:border-slate-300
              hover:shadow-xl
            `}
          >

            {/* Soft background gradient */}
            <div
              className={`
                pointer-events-none
                absolute inset-0
                bg-gradient-to-br ${theme.gradient}
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              `}
            />

            {/* Decorative glow */}
            <div
              className={`
                absolute -right-8 -top-8
                h-24 w-24
                rounded-full
                opacity-0
                blur-2xl
                transition-opacity duration-300
                ${theme.glow}
                group-hover:opacity-10
              `}
            />

            <div className="relative">

              {/* Header */}
              <div className="flex items-center justify-between">

                <span className="
                  text-[10px]
                  font-bold
                  tracking-[0.8px]
                  text-slate-500
                  transition-colors
                  group-hover:text-slate-700
                ">
                  {stat.title}
                </span>

                <div
                  className={`
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    ${theme.icon}
                    transition-all duration-300
                    group-hover:scale-105
                  `}
                >
                  <Icon size={19} strokeWidth={2} />
                </div>

              </div>

              {/* Value */}
              <div className="mt-5">

                <p className="
                  text-[30px]
                  font-extrabold
                  leading-none
                  tracking-tight
                  text-slate-900
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                ">
                  {stat.value}
                </p>

              </div>

              {/* Bottom */}
              <div className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-slate-100
                pt-3
              ">

                <span className="
                  text-[11px]
                  font-medium
                  text-slate-500
                ">
                  {stat.description}
                </span>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    px-2 py-1
                    text-[9px]
                    font-bold
                    ${theme.trend}
                    transition-colors
                  `}
                >
                  <TrendingUp size={10} />
                  {stat.trend}
                </span>

              </div>

            </div>

            {/* Hover arrow */}
            <div className="
              absolute
              bottom-4
              right-4
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-500
              opacity-0
              transition-all
              duration-300
              group-hover:translate-x-0.5
              group-hover:opacity-100
            ">
              <ArrowUpRight size={13} />
            </div>

          </div>
        );
      })}

    </div>
  );
}