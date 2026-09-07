"use client";

import { Search, Send, User } from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Student • BCA 3A",
    message: "Sir, I have a question about the assignment.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    name: "Academic Admin",
    role: "Administration",
    message: "The examination schedule has been updated.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    name: "Priya Thapa",
    role: "Student • BCA 4A",
    message: "Could you explain the project requirements?",
    time: "3 hours ago",
    unread: false,
  },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Messages
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Communicate with students and school administration.
        </p>
      </div>

      <div className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-xl border bg-white shadow-sm lg:grid-cols-[320px_1fr]">

        {/* Conversation List */}
        <div className="border-b lg:border-b-0 lg:border-r">

          <div className="border-b p-4">

            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <Search size={15} className="text-gray-400" />

              <input
                placeholder="Search messages..."
                className="w-full text-xs outline-none"
              />
            </div>

          </div>

          <div>

            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelected(conversation)}
                className={`w-full border-b p-4 text-left hover:bg-gray-50 ${
                  selected.id === conversation.id
                    ? "bg-blue-50/50"
                    : ""
                }`}
              >

                <div className="flex gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <User size={15} className="text-gray-500" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex justify-between">

                      <p className="text-xs font-semibold text-gray-800">
                        {conversation.name}
                      </p>

                      {conversation.unread && (
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                      )}

                    </div>

                    <p className="mt-1 text-[9px] text-gray-400">
                      {conversation.role}
                    </p>

                    <p className="mt-2 truncate text-[10px] text-gray-500">
                      {conversation.message}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>

        </div>

        {/* Chat */}
        <div className="flex flex-col">

          <div className="border-b p-4">

            <p className="text-sm font-semibold text-gray-800">
              {selected.name}
            </p>

            <p className="text-[10px] text-gray-400">
              {selected.role}
            </p>

          </div>

          <div className="flex-1 space-y-4 p-5">

            <div className="max-w-md rounded-lg bg-gray-100 p-3">
              <p className="text-xs text-gray-600">
                Hello Sir, I have a question about the assignment.
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                10:20 AM
              </p>
            </div>

            <div className="ml-auto max-w-md rounded-lg bg-blue-600 p-3">
              <p className="text-xs text-white">
                Sure. Please tell me which part you need help with.
              </p>

              <p className="mt-1 text-[9px] text-blue-100">
                10:22 AM
              </p>
            </div>

          </div>

          <div className="border-t p-4">

            <div className="flex gap-2">

              <input
                placeholder="Type your message..."
                className="flex-1 rounded-lg border px-3 py-2 text-xs outline-none"
              />

              <button className="flex items-center justify-center rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700">
                <Send size={15} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}