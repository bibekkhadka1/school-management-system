"use client";

import {
  Bell,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  LogOut,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

type SearchItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
  read: boolean;
};

export default function Header() {
  const router = useRouter();

  // =========================================================
  // THEME
  // =========================================================

  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // =========================================================
  // DROPDOWNS
  // =========================================================

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // =========================================================
  // NOTIFICATIONS
  // =========================================================

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New assignment submission",
      message:
        "Aarav Sharma submitted Database Design Project.",
      time: "10 minutes ago",
      icon: <ClipboardList size={15} />,
      read: false,
    },
    {
      id: 2,
      title: "New message",
      message:
        "Academic Admin sent you a new message.",
      time: "32 minutes ago",
      icon: <MessageSquare size={15} />,
      read: false,
    },
    {
      id: 3,
      title: "Attendance reminder",
      message:
        "BCA 3A attendance has not been updated today.",
      time: "1 hour ago",
      icon: <Users size={15} />,
      read: false,
    },
    {
      id: 4,
      title: "Exam marks pending",
      message:
        "Web Development exam marks are still pending.",
      time: "2 hours ago",
      icon: <FileText size={15} />,
      read: true,
    },
  ]);

  // =========================================================
  // SEARCH ITEMS
  // =========================================================

  const searchItems: SearchItem[] = [
    {
      title: "Dashboard",
      description: "Teacher dashboard overview",
      icon: <ClipboardList size={16} />,
      href: "/teacher",
    },
    {
      title: "Classes",
      description: "View and manage your classes",
      icon: <Users size={16} />,
      href: "/teacher/classes",
    },
    {
      title: "Students",
      description: "View student records",
      icon: <Users size={16} />,
      href: "/teacher/students",
    },
    {
      title: "Assignments",
      description: "Manage assignments",
      icon: <ClipboardList size={16} />,
      href: "/teacher/assignments",
    },
    {
      title: "Attendance",
      description: "Manage student attendance",
      icon: <Check size={16} />,
      href: "/teacher/attendance",
    },
    {
      title: "Exams",
      description: "Manage examinations",
      icon: <FileText size={16} />,
      href: "/teacher/exams",
    },
    {
      title: "Materials",
      description: "Manage course materials",
      icon: <FileText size={16} />,
      href: "/teacher/materials",
    },
    {
      title: "Messages",
      description: "View your conversations",
      icon: <MessageSquare size={16} />,
      href: "/teacher/messages",
    },
  ];

  const filteredSearchItems = searchItems.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // =========================================================
  // SEARCH FUNCTIONS
  // =========================================================

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const firstResult = filteredSearchItems[0];

      if (firstResult) {
        router.push(firstResult.href);
        setSearch("");
        setShowSearchResults(false);
      }
    }

    if (event.key === "Escape") {
      setSearch("");
      setShowSearchResults(false);
    }
  };

  const handleSearchItemClick = (href: string) => {
    router.push(href);
    setSearch("");
    setShowSearchResults(false);
  };

  // =========================================================
  // NOTIFICATION FUNCTIONS
  // =========================================================

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // =========================================================
  // THEME FUNCTION
  // =========================================================

  const toggleTheme = () => {
    setTheme(
      resolvedTheme === "dark"
        ? "light"
        : "dark"
    );
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    console.log("Logout clicked");

    setShowProfile(false);

    router.push("/teacher");
  };

  return (
    <header
      className="
        relative z-40 flex h-20 shrink-0 items-center justify-between
        border-b border-slate-200
        bg-white
        px-4
        shadow-[0_1px_3px_rgba(15,23,42,0.03)]
        dark:border-slate-800
        dark:bg-slate-900
        sm:px-6
        lg:px-8
      "
    >
      {/* =========================================================
          LEFT — SEARCH
      ========================================================= */}

      <div className="relative w-full max-w-md">
        <div
          className={`
            flex h-11 items-center gap-3 rounded-xl border px-3.5
            transition-all
            ${
              showSearchResults || search
                ? "border-indigo-300 bg-white shadow-sm ring-4 ring-indigo-50 dark:border-indigo-500/50 dark:bg-slate-800 dark:ring-indigo-500/10"
                : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            }
          `}
        >
          <Search
            size={18}
            className="shrink-0 text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => {
              if (search) {
                setShowSearchResults(true);
              }
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search pages..."
            className="
              min-w-0 flex-1 bg-transparent
              text-sm font-medium text-slate-700
              outline-none
              placeholder:text-slate-400
              dark:text-slate-100
              dark:placeholder:text-slate-500
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setShowSearchResults(false);
              }}
              className="
                flex h-6 w-6 shrink-0 items-center justify-center
                rounded-md
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-600
                dark:hover:bg-slate-700
                dark:hover:text-slate-200
              "
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          <div
            className="
              hidden items-center rounded-md border
              border-slate-200 bg-white px-1.5 py-0.5
              text-[9px] font-bold text-slate-400 shadow-sm
              dark:border-slate-700
              dark:bg-slate-700
              dark:text-slate-400
              sm:flex
            "
          >
            ⌘ K
          </div>
        </div>

        {/* =======================================================
            SEARCH RESULTS
        ======================================================= */}

        {showSearchResults && search && (
          <div
            className="
              absolute left-0 right-0 top-[calc(100%+8px)]
              overflow-hidden rounded-2xl
              border border-slate-200
              bg-white
              shadow-xl shadow-slate-200/50
              dark:border-slate-700
              dark:bg-slate-900
              dark:shadow-black/30
            "
          >
            <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Search Results
              </p>
            </div>

            {filteredSearchItems.length > 0 ? (
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredSearchItems.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() =>
                      handleSearchItemClick(item.href)
                    }
                    className="
                      group flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-left transition
                      hover:bg-indigo-50
                      dark:hover:bg-indigo-500/10
                    "
                  >
                    <div
                      className="
                        flex h-9 w-9 shrink-0 items-center
                        justify-center rounded-lg
                        bg-slate-100 text-slate-500
                        transition
                        group-hover:bg-indigo-100
                        group-hover:text-indigo-600
                        dark:bg-slate-800
                        dark:text-slate-400
                        dark:group-hover:bg-indigo-500/20
                        dark:group-hover:text-indigo-400
                      "
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {item.title}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 dark:text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-5 py-8 text-center">
                <div
                  className="
                    mx-auto flex h-10 w-10 items-center
                    justify-center rounded-xl
                    bg-slate-100
                    dark:bg-slate-800
                  "
                >
                  <Search
                    size={17}
                    className="text-slate-400"
                  />
                </div>

                <p className="mt-3 text-xs font-bold text-slate-700 dark:text-slate-200">
                  No results found
                </p>

                <p className="mt-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  Try searching for classes, students or assignments.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================
          RIGHT SIDE
      ========================================================= */}

      <div className="ml-4 flex items-center gap-2 sm:gap-3">

        {/* =======================================================
            THEME TOGGLE
        ======================================================= */}

        <button
          type="button"
          onClick={toggleTheme}
          className="
            group relative flex h-10 w-10 items-center
            justify-center rounded-xl
            border border-slate-200
            bg-white
            text-slate-500
            transition-all duration-200
            hover:border-indigo-200
            hover:bg-indigo-50
            hover:text-indigo-600
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-400
            dark:hover:border-indigo-500/30
            dark:hover:bg-indigo-500/10
            dark:hover:text-indigo-400
          "
          aria-label={
            mounted && resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={
            mounted && resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {!mounted ? (
            <Moon
              size={18}
              className="transition-transform duration-200"
            />
          ) : resolvedTheme === "dark" ? (
            <Sun
              size={18}
              className="transition-transform duration-200 group-hover:rotate-12"
            />
          ) : (
            <Moon
              size={18}
              className="transition-transform duration-200 group-hover:-rotate-12"
            />
          )}
        </button>

        {/* =======================================================
            NOTIFICATIONS
        ======================================================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((current) => !current);
              setShowProfile(false);
            }}
            className={`
              relative flex h-10 w-10 items-center justify-center
              rounded-xl transition
              ${
                showNotifications
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              }
            `}
            aria-label="Notifications"
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute right-1.5 top-1.5 flex h-4 min-w-4
                  items-center justify-center rounded-full
                  border-2 border-white
                  bg-rose-500 px-0.5
                  text-[8px] font-bold text-white
                  dark:border-slate-900
                "
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}

          {showNotifications && (
            <div
              className="
                absolute right-0 top-[calc(100%+10px)] w-[350px]
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white
                shadow-xl shadow-slate-200/60
                dark:border-slate-700
                dark:bg-slate-900
                dark:shadow-black/30
              "
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="
                      text-[10px] font-bold
                      text-indigo-600 transition
                      hover:text-indigo-700
                      dark:text-indigo-400
                      dark:hover:text-indigo-300
                    "
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[380px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() =>
                        markNotificationAsRead(
                          notification.id
                        )
                      }
                      className={`
                        flex w-full gap-3
                        border-b border-slate-100
                        px-4 py-3.5
                        text-left transition
                        hover:bg-slate-50
                        dark:border-slate-800
                        dark:hover:bg-slate-800/70
                        ${
                          !notification.read
                            ? "bg-indigo-50/30 dark:bg-indigo-500/5"
                            : "bg-white dark:bg-slate-900"
                        }
                      `}
                    >
                      <div
                        className={`
                          relative flex h-9 w-9 shrink-0
                          items-center justify-center rounded-xl
                          ${
                            !notification.read
                              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
                              : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                          }
                        `}
                      >
                        {notification.icon}

                        {!notification.read && (
                          <span
                            className="
                              absolute -right-0.5 -top-0.5
                              h-2 w-2 rounded-full
                              bg-indigo-600
                              ring-2 ring-white
                              dark:ring-slate-900
                            "
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                            {notification.title}
                          </p>

                          {!notification.read && (
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                          )}
                        </div>

                        <p className="mt-1 text-[10px] font-medium leading-4 text-slate-400 dark:text-slate-500">
                          {notification.message}
                        </p>

                        <p className="mt-1.5 text-[9px] font-semibold text-slate-300 dark:text-slate-600">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-10 text-center">
                    <Bell
                      size={22}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <p className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                      No notifications
                    </p>
                  </div>
                )}
              </div>

              <div
                className="
                  border-t border-slate-100
                  bg-slate-50/50 px-4 py-2.5
                  dark:border-slate-800
                  dark:bg-slate-800/50
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="
                    w-full text-center
                    text-[10px] font-bold
                    text-indigo-600 transition
                    hover:text-indigo-700
                    dark:text-indigo-400
                    dark:hover:text-indigo-300
                  "
                >
                  Close notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}

        <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

        {/* =======================================================
            PROFILE
        ======================================================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfile((current) => !current);
              setShowNotifications(false);
            }}
            className="
              flex items-center gap-2.5 rounded-xl
              px-1.5 py-1.5 transition
              hover:bg-slate-50
              dark:hover:bg-slate-800
            "
          >
            {/* Avatar */}

            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl bg-indigo-600
                text-xs font-bold text-white
                shadow-sm shadow-indigo-200
                dark:shadow-none
              "
            >
              BK
            </div>

            {/* User info */}

            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Teacher
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                Mathematics
              </p>
            </div>

            <ChevronDown
              size={15}
              className={`
                hidden text-slate-400
                transition-transform
                sm:block
                ${showProfile ? "rotate-180" : ""}
              `}
            />
          </button>

          {/* Profile Dropdown */}

          {showProfile && (
            <div
              className="
                absolute right-0 top-[calc(100%+10px)] w-64
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white
                shadow-xl shadow-slate-200/60
                dark:border-slate-700
                dark:bg-slate-900
                dark:shadow-black/30
              "
            >
              {/* Profile Header */}

              <div
                className="
                  border-b border-slate-100
                  bg-slate-50/60 px-4 py-4
                  dark:border-slate-800
                  dark:bg-slate-800/50
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-xl bg-indigo-600
                      text-sm font-bold text-white shadow-sm
                    "
                  >
                    BK
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Teacher
                    </p>

                    <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                      Mathematics
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu */}

              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    console.log("Profile clicked");
                  }}
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-left transition
                    hover:bg-slate-50
                    dark:hover:bg-slate-800
                  "
                >
                  <div
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg bg-slate-100 text-slate-500
                      dark:bg-slate-800 dark:text-slate-400
                    "
                  >
                    <Users size={15} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      My Profile
                    </p>

                    <p className="text-[9px] font-medium text-slate-400">
                      View your account
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/teacher/settings");
                  }}
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-left transition
                    hover:bg-slate-50
                    dark:hover:bg-slate-800
                  "
                >
                  <div
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg bg-slate-100 text-slate-500
                      dark:bg-slate-800 dark:text-slate-400
                    "
                  >
                    <Settings size={15} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Settings
                    </p>

                    <p className="text-[9px] font-medium text-slate-400">
                      Manage preferences
                    </p>
                  </div>
                </button>
              </div>

              {/* Logout */}

              <div className="border-t border-slate-100 p-2 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-left transition
                    hover:bg-rose-50
                    dark:hover:bg-rose-500/10
                  "
                >
                  <div
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg bg-rose-50 text-rose-500
                      dark:bg-rose-500/10 dark:text-rose-400
                    "
                  >
                    <LogOut size={15} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      Log Out
                    </p>

                    <p className="text-[9px] font-medium text-slate-400">
                      Sign out of your account
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}