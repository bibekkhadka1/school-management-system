"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  GraduationCap,
  Users,
  CalendarCheck,
  ClipboardList,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Megaphone,
  HelpCircle as HelpIcon,
  LogOut,
  School,
} from "lucide-react";

const menuItems = [
  {
    name: "DASHBOARD",
    href: "/teacher",
    icon: LayoutGrid,
  },
  {
    name: "CLASSES",
    href: "/teacher/classes",
    icon: GraduationCap,
  },
  {
    name: "STUDENTS",
    href: "/teacher/students",
    icon: Users,
  },
  {
    name: "ATTENDANCE",
    href: "/teacher/attendance",
    icon: CalendarCheck,
  },
  {
    name: "ASSIGNMENTS",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    name: "EXAMS",
    href: "/teacher/exams",
    icon: HelpCircle,
  },
  {
    name: "MATERIALS",
    href: "/teacher/materials",
    icon: BookOpen,
  },
  {
    name: "MESSAGES",
    href: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    name: "NOTICES",
    href: "/teacher/notices",
    icon: Megaphone,
  },
];

const bottomItems = [
  {
    name: "HELP CENTER",
    href: "/teacher/help",
    icon: HelpIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Typography Spec: Inter, semibold (600), 12px font-size, 16px line-height, 0.6px letter-spacing
  const typographyClass =
    "font-inter font-semibold text-[12px] leading-[16px] tracking-[0.6px]";

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-gray-200/80 bg-[#F1F3F9] px-4 py-6">
      <div>
        {/* Header / Logo */}
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 shadow-sm border border-gray-200/60 text-[#2563EB]">
            <School size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold leading-none text-[#1D4ED8]">
              Vineev Edu
            </h1>
            <p className="mt-1 text-xs font-normal text-gray-500">
              Teacher Portal
            </p>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/teacher" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition ${typographyClass} ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-gray-600 hover:bg-[#2563EB] hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="mb-4 border-t border-gray-200" />
        <nav className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition ${typographyClass} ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-gray-600 hover:bg-[#2563EB] hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-gray-600 transition hover:bg-[#2563EB] hover:text-white ${typographyClass}`}
          >
            <LogOut size={18} />
            <span>SIGN OUT</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}