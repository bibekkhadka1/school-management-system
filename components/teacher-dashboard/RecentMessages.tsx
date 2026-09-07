"use client";

import { MessageSquare, User } from "lucide-react";

const messages = [
  {
    name: "Aarav Sharma",
    role: "Student • BCA 3A",
    message: "Sir, I have a question about the DBMS assignment.",
    time: "10 min ago",
    unread: true,
  },
  {
    name: "Academic Admin",
    role: "Administration",
    message: "The examination schedule has been updated.",
    time: "1 hour ago",
    unread: true,
  },
  {
    name: "Priya Thapa",
    role: "Student • BCA 4A",
    message: "Could you please explain the project requirements?",
    time: "3 hours ago",
    unread: false,
  },
];

export default function RecentMessages() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <MessageSquare size={18} className="text-blue-600" />

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Messages
            </h2>

            <p className="mt-1 text-[10px] text-gray-400">
              Latest conversations
            </p>
          </div>

        </div>

        <button className="text-xs font-medium text-blue-600 hover:underline">
          View All
        </button>

      </div>

      {/* Messages */}
      <div className="space-y-3">

        {messages.map((message) => (
          <div
            key={message.name}
            className={`flex gap-3 rounded-lg border p-3 ${
              message.unread ? "bg-blue-50/40" : ""
            }`}
          >

            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <User size={15} className="text-gray-500" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-2">

                <p className="text-xs font-semibold text-gray-800">
                  {message.name}
                </p>

                {message.unread && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                )}

              </div>

              <p className="mt-0.5 text-[9px] text-gray-400">
                {message.role}
              </p>

              <p className="mt-2 truncate text-[10px] text-gray-500">
                {message.message}
              </p>

              <p className="mt-2 text-[9px] text-gray-400">
                {message.time}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}