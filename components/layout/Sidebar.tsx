"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  FolderOpen,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  School,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    name: "Classes",
    href: "/teacher/classes",
    icon: BookOpen,
  },
  {
    name: "Students",
    href: "/teacher/students",
    icon: Users,
  },
  {
    name: "Attendance",
    href: "/teacher/attendance",
    icon: ClipboardCheck,
  },
  {
    name: "Assignments",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    name: "Exams & Marks",
    href: "/teacher/exams",
    icon: GraduationCap,
  },
  {
    name: "Learning Materials",
    href: "/teacher/materials",
    icon: FolderOpen,
  },
  {
    name: "Messages",
    href: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    name: "Notices",
    href: "/teacher/notices",
    icon: Bell,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <School size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-gray-900">
            SchoolHub
          </h1>

          <p className="text-xs text-gray-500">
            Teacher Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/teacher" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t p-4">
        
        <Link
          href="/teacher/settings"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>

        <button
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
}