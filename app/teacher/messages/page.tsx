"use client";

import {
  Search,
  Send,
  MessageSquare,
  Users,
  Mail,
  MailOpen,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  CheckCheck,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

type ChatMessage = {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  role: string;
  message: string;
  time: string;
  unread: boolean;
  color: string;
  messages: ChatMessage[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Student • BCA 3A",
    message: "Sir, I have a question about the assignment.",
    time: "10 min ago",
    unread: true,
    color: "bg-indigo-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello Sir, I have a question about the assignment.",
        time: "10:20 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Sure. Please tell me which part you need help with.",
        time: "10:22 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "I'm confused about the database normalization section. Could you explain what we need to submit?",
        time: "10:24 AM",
      },
    ],
  },

  {
    id: 2,
    name: "Academic Admin",
    role: "Administration",
    message: "The examination schedule has been updated.",
    time: "1 hour ago",
    unread: true,
    color: "bg-violet-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello Sir. The examination schedule has been updated.",
        time: "9:15 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Thank you for letting me know. I will review the updated schedule.",
        time: "9:20 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "Please make sure all students are informed before the end of the day.",
        time: "9:25 AM",
      },
    ],
  },

  {
    id: 3,
    name: "Priya Thapa",
    role: "Student • BCA 4A",
    message: "Could you explain the project requirements?",
    time: "3 hours ago",
    unread: false,
    color: "bg-emerald-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Sir, could you explain the project requirements?",
        time: "8:10 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "You need to submit the project report along with the source code.",
        time: "8:15 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "Okay Sir. Should we also include screenshots?",
        time: "8:18 AM",
      },
    ],
  },

  {
    id: 4,
    name: "Rohan Karki",
    role: "Student • BCA 3B",
    message: "When is the assignment deadline?",
    time: "Yesterday",
    unread: false,
    color: "bg-sky-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Sir, when is the assignment deadline?",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "The assignment is due this Friday.",
        time: "Yesterday",
      },
      {
        id: 3,
        sender: "them",
        text: "Thank you Sir.",
        time: "Yesterday",
      },
    ],
  },

  {
    id: 5,
    name: "Sneha Adhikari",
    role: "Student • BCA 4B",
    message: "I have submitted my project.",
    time: "Yesterday",
    unread: false,
    color: "bg-pink-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Sir, I have submitted my project.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Great. I will review it and update your marks.",
        time: "Yesterday",
      },
    ],
  },

  {
    id: 6,
    name: "Suman Rai",
    role: "Student • BCA 3A",
    message: "Can you share today's notes?",
    time: "2 days ago",
    unread: false,
    color: "bg-orange-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Sir, can you share today's notes?",
        time: "2 days ago",
      },
      {
        id: 2,
        sender: "me",
        text: "Yes. I will upload them to the Materials section.",
        time: "2 days ago",
      },
    ],
  },

  {
    id: 7,
    name: "BCA Department",
    role: "Department",
    message: "Please submit the attendance report.",
    time: "2 days ago",
    unread: true,
    color: "bg-cyan-500",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Please submit the attendance report for this month.",
        time: "2 days ago",
      },
      {
        id: 2,
        sender: "me",
        text: "Sure. I will submit it today.",
        time: "2 days ago",
      },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(
    initialConversations
  );

  const [selectedId, setSelectedId] = useState(
    initialConversations[0].id
  );

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const selected = conversations.find(
    (conversation) => conversation.id === selectedId
  ) ?? conversations[0];

  /*
   * Search conversations
   */
  const filteredConversations = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      const matchesConversation =
        conversation.name.toLowerCase().includes(searchValue) ||
        conversation.role.toLowerCase().includes(searchValue) ||
        conversation.message.toLowerCase().includes(searchValue);

      const matchesMessage = conversation.messages.some((msg) =>
        msg.text.toLowerCase().includes(searchValue)
      );

      return matchesConversation || matchesMessage;
    });
  }, [search, conversations]);

  /*
   * Statistics
   */
  const unreadCount = conversations.filter(
    (conversation) => conversation.unread
  ).length;

  const studentCount = conversations.filter((conversation) =>
    conversation.role.startsWith("Student")
  ).length;

  const readCount = conversations.length - unreadCount;

  /*
   * Select conversation
   */
  const handleSelectConversation = (id: number) => {
    setSelectedId(id);

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unread: false,
            }
          : conversation
      )
    );
  };

  /*
   * Send message
   */
  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || !selected) return;

    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: trimmedMessage,
      time: formattedTime,
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selected.id
          ? {
              ...conversation,
              message: trimmedMessage,
              time: "Just now",
              messages: [...conversation.messages, newMessage],
            }
          : conversation
      )
    );

    setMessage("");
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <MessageSquare size={18} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Communication
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Messages
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Communicate with students and school administration.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]">
            <Plus size={17} />
            New Message
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            title="Conversations"
            value={conversations.length}
            description="Active conversations"
            icon={MessageSquare}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <KpiCard
            title="Unread Messages"
            value={unreadCount}
            description="Need your attention"
            icon={Mail}
            iconClass="bg-orange-50 text-orange-600"
            highlight
          />

          <KpiCard
            title="Students"
            value={studentCount}
            description="Student conversations"
            icon={Users}
            iconClass="bg-violet-50 text-violet-600"
          />

          <KpiCard
            title="Read Messages"
            value={readCount}
            description="Messages already viewed"
            icon={MailOpen}
            iconClass="bg-emerald-50 text-emerald-600"
          />

        </div>

        {/* Messaging Workspace */}
        <div className="grid min-h-[650px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[340px_1fr]">

          {/* Conversation Sidebar */}
          <div className="flex min-h-[600px] flex-col border-b border-slate-100 lg:border-b-0 lg:border-r">

            {/* Sidebar Header */}
            <div className="border-b border-slate-100 p-4">

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Conversations
                  </h2>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    {conversations.length} active conversations
                  </p>
                </div>

                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Working Search */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {search && (
                <p className="mt-2 text-[10px] font-medium text-slate-400">
                  {filteredConversations.length} result
                  {filteredConversations.length !== 1 ? "s" : ""} found
                </p>
              )}

            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">

              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => {
                  const isSelected =
                    selected?.id === conversation.id;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() =>
                        handleSelectConversation(conversation.id)
                      }
                      className={`group w-full border-b border-slate-100 p-4 text-left transition ${
                        isSelected
                          ? "bg-indigo-50/70"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex gap-3">

                        {/* Avatar */}
                        <div
                          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${conversation.color}`}
                        >
                          {conversation.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}

                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">

                          <div className="flex items-center justify-between gap-2">

                            <p
                              className={`truncate text-xs font-bold ${
                                isSelected
                                  ? "text-indigo-700"
                                  : "text-slate-800"
                              }`}
                            >
                              {conversation.name}
                            </p>

                            <span className="shrink-0 text-[9px] font-medium text-slate-400">
                              {conversation.time}
                            </span>

                          </div>

                          <p className="mt-1 text-[9px] font-medium text-slate-400">
                            {conversation.role}
                          </p>

                          <div className="mt-2 flex items-center justify-between gap-2">

                            <p className="truncate text-[10px] font-medium text-slate-500">
                              {conversation.message}
                            </p>

                            {conversation.unread && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                            )}

                          </div>

                        </div>

                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-5 py-12 text-center">

                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <Search size={17} className="text-slate-400" />
                  </div>

                  <p className="mt-3 text-xs font-semibold text-slate-700">
                    No conversations found
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Try another name, class or message.
                  </p>

                </div>
              )}

            </div>
          </div>

          {/* Chat Area */}
          {selected && (
            <div className="flex min-h-[600px] flex-col">

              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${selected.color}`}
                  >
                    {selected.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}

                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {selected.name}
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                      <p className="text-[10px] font-medium text-slate-400">
                        {selected.role} • Online
                      </p>
                    </div>
                  </div>

                </div>

                <div className="flex items-center gap-1">

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600">
                    <Phone size={15} />
                  </button>

                  <button className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 sm:flex">
                    <Video size={16} />
                  </button>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700">
                    <MoreVertical size={16} />
                  </button>

                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/50 p-5">

                {/* Date */}
                <div className="flex items-center justify-center">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[9px] font-semibold text-slate-400">
                    Today
                  </span>
                </div>

                {selected.messages.map((chatMessage) => {
                  const isMine = chatMessage.sender === "me";

                  return (
                    <div
                      key={chatMessage.id}
                      className={
                        isMine
                          ? "ml-auto flex max-w-md items-end justify-end gap-2"
                          : "flex max-w-md items-end gap-2"
                      }
                    >

                      {!isMine && (
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${selected.color}`}
                        >
                          {selected.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      )}

                      <div className={isMine ? "text-right" : ""}>

                        <div
                          className={
                            isMine
                              ? "rounded-2xl rounded-br-md bg-indigo-600 px-4 py-3 shadow-sm shadow-indigo-100"
                              : "rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100"
                          }
                        >
                          <p
                            className={`text-xs font-medium leading-5 ${
                              isMine
                                ? "text-white"
                                : "text-slate-600"
                            }`}
                          >
                            {chatMessage.text}
                          </p>
                        </div>

                        <div
                          className={`mt-1 flex items-center gap-1 px-1 ${
                            isMine ? "justify-end" : ""
                          }`}
                        >
                          <span className="text-[9px] font-medium text-slate-400">
                            {chatMessage.time}
                          </span>

                          {isMine && (
                            <CheckCheck
                              size={12}
                              className="text-indigo-500"
                            />
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Composer */}
              <div className="border-t border-slate-100 bg-white p-4">

                <div className="flex items-end gap-2">

                  <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 sm:flex">
                    <Paperclip size={16} />
                  </button>

                  <div className="relative flex-1">

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      rows={1}
                      placeholder={`Message ${selected.name}...`}
                      className="min-h-[42px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />

                    <button className="absolute bottom-2.5 right-3 text-slate-400 transition hover:text-indigo-600">
                      <Smile size={16} />
                    </button>

                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={16} />
                  </button>

                </div>

                <p className="mt-2 hidden text-[9px] font-medium text-slate-400 sm:block">
                  Press Enter to send • Shift + Enter for a new line
                </p>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* KPI Card */
/* ---------------------------------- */

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  highlight,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  highlight?: boolean;
}) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={18} />
        </div>

      </div>

      <p
        className={`mt-4 text-[11px] font-medium ${
          highlight
            ? "text-orange-600"
            : "text-slate-400"
        }`}
      >
        {description}
      </p>

    </div>
  );
}
