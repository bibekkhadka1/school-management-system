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
  X,
  CheckCircle2,
  Trash2,
  BellOff,
  Bell,
  RotateCcw,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
  attachment?: string;
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

type Recipient = {
  id: number;
  name: string;
  role: string;
  color: string;
};

/* -------------------------------------------------------------------------- */
/* Conversation Data                                                          */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* New Message Recipients                                                     */
/* -------------------------------------------------------------------------- */

const newMessageRecipients: Recipient[] = [
  {
    id: 101,
    name: "Nisha Shrestha",
    role: "Student • BCA 3B",
    color: "bg-rose-500",
  },
  {
    id: 102,
    name: "Anish Gurung",
    role: "Student • BCA 3B",
    color: "bg-blue-500",
  },
  {
    id: 103,
    name: "BCA Coordinator",
    role: "Department",
    color: "bg-cyan-600",
  },
  {
    id: 104,
    name: "Academic Admin",
    role: "Administration",
    color: "bg-violet-500",
  },
];

/* -------------------------------------------------------------------------- */
/* Main Page                                                                  */
/* -------------------------------------------------------------------------- */

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialConversations
  );

  const [selectedId, setSelectedId] = useState(
    initialConversations[0].id
  );

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);

  const [showContactAction, setShowContactAction] = useState<
    "phone" | "video" | null
  >(null);

  const [toast, setToast] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ------------------------------------------------------------------------ */
  /* Selected Conversation                                                    */
  /* ------------------------------------------------------------------------ */

  const selected = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  /* ------------------------------------------------------------------------ */
  /* Filter Conversations                                                     */
  /* ------------------------------------------------------------------------ */

  const filteredConversations = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      const conversationMatch =
        conversation.name.toLowerCase().includes(searchValue) ||
        conversation.role.toLowerCase().includes(searchValue) ||
        conversation.message.toLowerCase().includes(searchValue);

      const messageMatch = conversation.messages.some((msg) =>
        msg.text.toLowerCase().includes(searchValue)
      );

      return conversationMatch || messageMatch;
    });
  }, [search, conversations]);

  /* ------------------------------------------------------------------------ */
  /* Statistics                                                               */
  /* ------------------------------------------------------------------------ */

  const unreadCount = conversations.filter(
    (conversation) => conversation.unread
  ).length;

  const studentCount = conversations.filter((conversation) =>
    conversation.role.startsWith("Student")
  ).length;

  const readCount = conversations.length - unreadCount;

  /* ------------------------------------------------------------------------ */
  /* Toast                                                                     */
  /* ------------------------------------------------------------------------ */

  const showToast = (text: string) => {
    setToast(text);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  /* ------------------------------------------------------------------------ */
  /* Select Conversation                                                      */
  /* ------------------------------------------------------------------------ */

  const handleSelectConversation = (id: number) => {
    setSelectedId(id);
    setShowChatMenu(false);

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

  /* ------------------------------------------------------------------------ */
  /* Send Message                                                             */
  /* ------------------------------------------------------------------------ */

  const handleSend = () => {
    if (!selected) return;

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const newChatMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: trimmedMessage,
      time: formattedTime,
      attachment: attachment || undefined,
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selected.id
          ? {
              ...conversation,
              message: trimmedMessage,
              time: "Just now",
              unread: false,
              messages: [
                ...conversation.messages,
                newChatMessage,
              ],
            }
          : conversation
      )
    );

    setMessage("");
    setAttachment("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Mark All Read                                                             */
  /* ------------------------------------------------------------------------ */

  const handleMarkAllRead = () => {
    setConversations((current) =>
      current.map((conversation) => ({
        ...conversation,
        unread: false,
      }))
    );

    setShowSidebarMenu(false);
    showToast("All conversations marked as read");
  };

  /* ------------------------------------------------------------------------ */
  /* Mark Current Conversation Unread                                          */
  /* ------------------------------------------------------------------------ */

  const handleMarkUnread = () => {
    if (!selected) return;

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selected.id
          ? {
              ...conversation,
              unread: true,
            }
          : conversation
      )
    );

    setShowChatMenu(false);
    showToast("Conversation marked as unread");
  };

  /* ------------------------------------------------------------------------ */
  /* Clear Current Conversation                                                */
  /* ------------------------------------------------------------------------ */

  const handleClearConversation = () => {
    if (!selected) return;

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selected.id
          ? {
              ...conversation,
              message: "",
              messages: [],
            }
          : conversation
      )
    );

    setShowChatMenu(false);
    showToast("Conversation cleared");
  };

  /* ------------------------------------------------------------------------ */
  /* Attachment                                                                */
  /* ------------------------------------------------------------------------ */

  const handleAttachment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAttachment(file.name);
    showToast(`${file.name} attached`);
  };

  /* ------------------------------------------------------------------------ */
  /* Emoji                                                                     */
  /* ------------------------------------------------------------------------ */

  const handleEmoji = (emoji: string) => {
    setMessage((current) => `${current}${emoji}`);
  };

  /* ------------------------------------------------------------------------ */
  /* New Message                                                               */
  /* ------------------------------------------------------------------------ */

  const handleNewMessage = (
    recipientId: number,
    newMessageText: string
  ) => {
    const recipient = newMessageRecipients.find(
      (item) => item.id === recipientId
    );

    if (!recipient || !newMessageText.trim()) return;

    const existingConversation = conversations.find(
      (conversation) => conversation.name === recipient.name
    );

    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const newChatMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: newMessageText.trim(),
      time: formattedTime,
    };

    if (existingConversation) {
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === existingConversation.id
            ? {
                ...conversation,
                message: newMessageText.trim(),
                time: "Just now",
                unread: false,
                messages: [
                  ...conversation.messages,
                  newChatMessage,
                ],
              }
            : conversation
        )
      );

      setSelectedId(existingConversation.id);
    } else {
      const newConversation: Conversation = {
        id: Date.now(),
        name: recipient.name,
        role: recipient.role,
        message: newMessageText.trim(),
        time: "Just now",
        unread: false,
        color: recipient.color,
        messages: [newChatMessage],
      };

      setConversations((current) => [
        newConversation,
        ...current,
      ]);

      setSelectedId(newConversation.id);
    }

    setShowNewMessage(false);

    showToast("Message sent successfully");
  };

  /* ------------------------------------------------------------------------ */
  /* Phone / Video                                                             */
  /* ------------------------------------------------------------------------ */

  const handleContactAction = (
    type: "phone" | "video"
  ) => {
    setShowContactAction(type);
  };

  /* ------------------------------------------------------------------------ */
  /* Render                                                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* ================================================================ */}
        {/* PAGE HEADER                                                       */}
        {/* ================================================================ */}

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <MessageSquare
                  size={18}
                  className="text-white"
                />
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

          <button
            type="button"
            onClick={() => setShowNewMessage(true)}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
          >
            <Plus
              size={17}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            New Message
          </button>
        </div>

        {/* ================================================================ */}
        {/* KPI CARDS                                                         */}
        {/* ================================================================ */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Conversations"
            value={conversations.length}
            description="Active conversations"
            icon={MessageSquare}
            iconClass="bg-indigo-50 text-indigo-600"
            hoverClass="hover:border-indigo-200"
          />

          <KpiCard
            title="Unread Messages"
            value={unreadCount}
            description="Need your attention"
            icon={Mail}
            iconClass="bg-orange-50 text-orange-600"
            hoverClass="hover:border-orange-200"
            highlight
          />

          <KpiCard
            title="Students"
            value={studentCount}
            description="Student conversations"
            icon={Users}
            iconClass="bg-violet-50 text-violet-600"
            hoverClass="hover:border-violet-200"
          />

          <KpiCard
            title="Read Messages"
            value={readCount}
            description="Messages already viewed"
            icon={MailOpen}
            iconClass="bg-emerald-50 text-emerald-600"
            hoverClass="hover:border-emerald-200"
          />
        </div>

        {/* ================================================================ */}
        {/* MESSAGING WORKSPACE                                               */}
        {/* ================================================================ */}

        <div className="grid min-h-[650px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[340px_1fr]">

          {/* ============================================================ */}
          {/* CONVERSATION SIDEBAR                                          */}
          {/* ============================================================ */}

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

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowSidebarMenu((current) => !current)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                    aria-label="Conversation options"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {showSidebarMenu && (
                    <div className="absolute right-0 top-10 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/60">
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <CheckCircle2 size={14} />
                        Mark all as read
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setShowSidebarMenu(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                      >
                        <RotateCcw size={14} />
                        Reset search
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {search && (
                <p className="mt-2 text-[10px] font-medium text-slate-400">
                  {filteredConversations.length} result
                  {filteredConversations.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
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
                      type="button"
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
                              {conversation.message ||
                                "No messages yet"}
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
                    <Search
                      size={17}
                      className="text-slate-400"
                    />
                  </div>

                  <p className="mt-3 text-xs font-semibold text-slate-700">
                    No conversations found
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    Try another name, class or message.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-[10px] font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <RotateCcw size={12} />
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CHAT AREA                                                     */}
          {/* ============================================================ */}

          {selected ? (
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

                {/* Header Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleContactAction("phone")
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600"
                    aria-label="Call"
                  >
                    <Phone size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleContactAction("video")
                    }
                    className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 sm:flex"
                    aria-label="Video call"
                  >
                    <Video size={16} />
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowChatMenu((current) => !current)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                      aria-label="Chat options"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {showChatMenu && (
                      <div className="absolute right-0 top-10 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/60">
                        <button
                          type="button"
                          onClick={handleMarkUnread}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Bell size={14} />
                          Mark as unread
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowChatMenu(false);
                            showToast(
                              "Notifications muted"
                            );
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-700"
                        >
                          <BellOff size={14} />
                          Mute notifications
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        <button
                          type="button"
                          onClick={handleClearConversation}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                          <Trash2 size={14} />
                          Clear conversation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/50 p-5">
                {selected.messages.length > 0 ? (
                  <>
                    <div className="flex items-center justify-center">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[9px] font-semibold text-slate-400">
                        Today
                      </span>
                    </div>

                    {selected.messages.map((chatMessage) => {
                      const isMine =
                        chatMessage.sender === "me";

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

                          <div
                            className={
                              isMine ? "text-right" : ""
                            }
                          >
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

                              {chatMessage.attachment && (
                                <div
                                  className={`mt-2 rounded-lg px-3 py-2 text-[10px] font-semibold ${
                                    isMine
                                      ? "bg-indigo-500 text-indigo-50"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  📎{" "}
                                  {chatMessage.attachment}
                                </div>
                              )}
                            </div>

                            <div
                              className={`mt-1 flex items-center gap-1 px-1 ${
                                isMine
                                  ? "justify-end"
                                  : ""
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
                  </>
                ) : (
                  <div className="flex h-full min-h-[420px] items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
                        <MessageCircle
                          size={20}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-700">
                        No messages yet
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Start the conversation below.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-slate-100 bg-white p-4">
                {/* Attachment Preview */}
                {attachment && (
                  <div className="mb-2 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <Paperclip
                        size={13}
                        className="shrink-0 text-indigo-600"
                      />

                      <span className="truncate text-[10px] font-semibold text-indigo-700">
                        {attachment}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setAttachment("");

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-indigo-400 transition hover:bg-indigo-100 hover:text-indigo-700"
                      aria-label="Remove attachment"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                <div className="flex items-end gap-2">
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleAttachment}
                  />

                  {/* Attachment */}
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-indigo-600 sm:flex"
                    aria-label="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>

                  {/* Text Input */}
                  <div className="relative flex-1">
                    <textarea
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey
                        ) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      rows={1}
                      placeholder={`Message ${selected.name}...`}
                      className="min-h-[42px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />

                    {/* Emoji */}
                    <div className="group absolute bottom-2.5 right-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEmoji("😊")
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                        aria-label="Add emoji"
                      >
                        <Smile size={16} />
                      </button>

                      <div className="pointer-events-none absolute bottom-9 right-0 flex gap-1 rounded-lg border border-slate-200 bg-white p-1.5 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:opacity-100">
                        {[
                          "😊",
                          "👍",
                          "🎉",
                          "❤️",
                          "👏",
                        ].map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() =>
                              handleEmoji(emoji)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-sm transition hover:bg-slate-100"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Send */}
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>

                <p className="mt-2 hidden text-[9px] font-medium text-slate-400 sm:block">
                  Press Enter to send • Shift + Enter for a new line
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[600px] items-center justify-center">
              <div className="text-center">
                <MessageSquare
                  size={28}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-bold text-slate-700">
                  Select a conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* NEW MESSAGE MODAL                                                   */}
      {/* ================================================================== */}

      {showNewMessage && (
        <NewMessageModal
          recipients={newMessageRecipients}
          conversations={conversations}
          onClose={() => setShowNewMessage(false)}
          onSend={handleNewMessage}
        />
      )}

      {/* ================================================================== */}
      {/* CALL / VIDEO MODAL                                                  */}
      {/* ================================================================== */}

      {showContactAction && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowContactAction(null);
            }
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${selected.color} text-white`}
            >
              {showContactAction === "phone" ? (
                <Phone size={22} />
              ) : (
                <Video size={22} />
              )}
            </div>

            <h2 className="mt-4 text-sm font-bold text-slate-900">
              {showContactAction === "phone"
                ? "Start a voice call?"
                : "Start a video call?"}
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {selected.name}
            </p>

            <p className="mt-3 text-[11px] leading-5 text-slate-500">
              Calling is currently a frontend demo.
              Backend communication will be connected
              later.
            </p>

            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowContactAction(null)
                }
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  const action =
                    showContactAction === "phone"
                      ? "Voice call started"
                      : "Video call started";

                  setShowContactAction(null);
                  showToast(action);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                {showContactAction === "phone" ? (
                  <Phone size={13} />
                ) : (
                  <Video size={13} />
                )}

                Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* TOAST                                                               */}
      {/* ================================================================== */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-xl shadow-slate-300/40">
          <CheckCircle2
            size={16}
            className="text-emerald-500"
          />

          {toast}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* New Message Modal                                                          */
/* -------------------------------------------------------------------------- */

function NewMessageModal({
  recipients,
  conversations,
  onClose,
  onSend,
}: {
  recipients: Recipient[];
  conversations: Conversation[];
  onClose: () => void;
  onSend: (recipientId: number, text: string) => void;
}) {
  const [recipientSearch, setRecipientSearch] = useState("");

  const [selectedRecipient, setSelectedRecipient] =
    useState(recipients[0]?.id ?? 0);

  const [text, setText] = useState("");

  /* ------------------------------------------------------------------------ */
  /* Search Recipients                                                         */
  /* ------------------------------------------------------------------------ */

  const filteredRecipients = useMemo(() => {
    const value = recipientSearch.trim().toLowerCase();

    if (!value) {
      return recipients;
    }

    return recipients.filter(
      (recipient) =>
        recipient.name.toLowerCase().includes(value) ||
        recipient.role.toLowerCase().includes(value)
    );
  }, [recipientSearch, recipients]);

  /* ------------------------------------------------------------------------ */
  /* Selected Recipient                                                       */
  /* ------------------------------------------------------------------------ */

  const selected = recipients.find(
    (recipient) => recipient.id === selectedRecipient
  );

  /* ------------------------------------------------------------------------ */
  /* Send                                                                     */
  /* ------------------------------------------------------------------------ */

  const handleSend = () => {
    if (!selectedRecipient || !text.trim()) {
      return;
    }

    onSend(selectedRecipient, text);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* ================================================================ */}
        {/* Modal Header                                                      */}
        {/* ================================================================ */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <UserPlus size={17} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                New Message
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                Search and select a recipient
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close new message"
          >
            <X size={17} />
          </button>
        </div>

        {/* ================================================================ */}
        {/* Modal Body                                                        */}
        {/* ================================================================ */}

        <div className="space-y-5 p-6">

          {/* Recipient Search */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Search Recipient
            </label>

            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={recipientSearch}
                onChange={(e) =>
                  setRecipientSearch(e.target.value)
                }
                placeholder="Search students, teachers or departments..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              {recipientSearch && (
                <button
                  type="button"
                  onClick={() =>
                    setRecipientSearch("")
                  }
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Clear recipient search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Recipient List */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-600">
                Select Recipient
              </label>

              <span className="text-[9px] font-medium text-slate-400">
                {filteredRecipients.length} available
              </span>
            </div>

            <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-slate-200 p-1.5">
              {filteredRecipients.length > 0 ? (
                filteredRecipients.map((recipient) => {
                  const isSelected =
                    selectedRecipient === recipient.id;

                  const existingConversation =
                    conversations.find(
                      (conversation) =>
                        conversation.name === recipient.name
                    );

                  return (
                    <button
                      key={recipient.id}
                      type="button"
                      onClick={() =>
                        setSelectedRecipient(
                          recipient.id
                        )
                      }
                      className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition ${
                        isSelected
                          ? "bg-indigo-50 ring-1 ring-indigo-100"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${recipient.color}`}
                      >
                        {recipient.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`truncate text-xs font-bold ${
                              isSelected
                                ? "text-indigo-700"
                                : "text-slate-700"
                            }`}
                          >
                            {recipient.name}
                          </p>

                          {isSelected && (
                            <CheckCircle2
                              size={15}
                              className="shrink-0 text-indigo-600"
                            />
                          )}
                        </div>

                        <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                          {recipient.role}
                        </p>

                        {existingConversation && (
                          <p className="mt-0.5 text-[8px] font-semibold text-emerald-500">
                            Existing conversation
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center">
                  <Search
                    size={18}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-600">
                    No recipients found
                  </p>

                  <p className="mt-1 text-[9px] font-medium text-slate-400">
                    Try searching by name or role.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setRecipientSearch("")
                    }
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-[10px] font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <RotateCcw size={12} />
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Selected Recipient */}
          {selected && (
            <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white ${selected.color}`}
              >
                {selected.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-700">
                  {selected.name}
                </p>

                <p className="text-[9px] font-medium text-indigo-500">
                  {selected.role}
                </p>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Message
            </label>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Write your message..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* Modal Footer                                                      */}
        {/* ================================================================ */}

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || !selectedRecipient}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={13} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* KPI Card                                                                   */
/* -------------------------------------------------------------------------- */

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  hoverClass,
  highlight,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  hoverClass: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <p
        className={`mt-4 truncate text-[11px] font-medium ${
          highlight
            ? "text-orange-600"
            : "text-slate-400"
        }`}
      >
        {description}
      </p>

      <div className="pointer-events-none absolute -bottom-7 -right-7 h-20 w-20 rounded-full bg-slate-50 opacity-0 transition duration-300 group-hover:opacity-100" />
    </div>
  );
}