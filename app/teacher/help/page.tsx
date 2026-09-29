"use client";

import {
  Search,
  BookOpen,
  Users,
  ClipboardList,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Settings,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  LifeBuoy,
  ArrowUpRight,
  X,
  Send,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type HelpCategory = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  bgClass: string;
};

type HelpArticle = {
  id: number;
  title: string;
  category: string;
  description: string;
  readTime: string;
  content: string[];
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

const categories: HelpCategory[] = [
  {
    id: 1,
    title: "Getting Started",
    description: "Learn the basics of your teacher dashboard.",
    icon: GraduationCap,
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
  },
  {
    id: 2,
    title: "Classes & Students",
    description: "Manage classes, rosters and student information.",
    icon: Users,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50",
  },
  {
    id: 3,
    title: "Assignments",
    description: "Create, review and manage assignments.",
    icon: ClipboardList,
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
  },
  {
    id: 4,
    title: "Attendance",
    description: "Record and manage daily attendance.",
    icon: ClipboardCheck,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
  {
    id: 5,
    title: "Exams",
    description: "Create examinations and manage results.",
    icon: FileText,
    iconClass: "text-orange-600",
    bgClass: "bg-orange-50",
  },
  {
    id: 6,
    title: "Materials",
    description: "Upload and organize teaching resources.",
    icon: BookOpen,
    iconClass: "text-cyan-600",
    bgClass: "bg-cyan-50",
  },
  {
    id: 7,
    title: "Messages",
    description: "Communicate with students and departments.",
    icon: MessageSquare,
    iconClass: "text-pink-600",
    bgClass: "bg-pink-50",
  },
  {
    id: 8,
    title: "Account & Settings",
    description: "Manage your profile and preferences.",
    icon: Settings,
    iconClass: "text-slate-600",
    bgClass: "bg-slate-100",
  },
];

/* -------------------------------------------------------------------------- */
/* Articles                                                                   */
/* -------------------------------------------------------------------------- */

const articles: HelpArticle[] = [
  {
    id: 1,
    title: "Getting started with your teacher dashboard",
    category: "Getting Started",
    description:
      "Understand the main sections of the teacher dashboard and where to find important tools.",
    readTime: "3 min read",
    content: [
      "The teacher dashboard gives you a central place to manage classes, students, assignments, attendance, exams, materials and communication.",
      "Use the sidebar navigation to move between different sections of the platform. Each section is designed around a specific teaching workflow.",
      "The dashboard overview provides quick information about your current classes, student activity and important academic tasks.",
    ],
  },
  {
    id: 2,
    title: "How to manage your classes",
    category: "Classes & Students",
    description:
      "Learn how to view your active classes, schedules and enrolled students.",
    readTime: "4 min read",
    content: [
      "Open the Classes section from the teacher navigation to view your active class sections.",
      "Each class card provides an overview of the class, including the class code, student count, room, schedule and attendance information.",
      "Select a class to open its detailed management page and view additional information.",
    ],
  },
  {
    id: 3,
    title: "Creating and managing assignments",
    category: "Assignments",
    description:
      "Learn how to create assignments, track submissions and review student work.",
    readTime: "5 min read",
    content: [
      "Use the Assignments section to view existing assignments and their submission status.",
      "Select Create Assignment to enter the assignment title, class, subject, deadline and other relevant information.",
      "After students submit their work, you can open the assignment details to review submissions and update their status.",
    ],
  },
  {
    id: 4,
    title: "Recording student attendance",
    category: "Attendance",
    description:
      "Learn how to record daily attendance and update student attendance status.",
    readTime: "3 min read",
    content: [
      "Open Attendance from the teacher navigation and select the appropriate class, subject and date.",
      "Students can be marked as Present, Absent or Late.",
      "Use the bulk attendance controls when you need to mark multiple students with the same status.",
      "Save Attendance to store the current attendance session.",
    ],
  },
  {
    id: 5,
    title: "Managing exams and results",
    category: "Exams",
    description:
      "Create examinations and track whether marks have been entered.",
    readTime: "4 min read",
    content: [
      "The Exams section provides an overview of upcoming and completed examinations.",
      "Create a new exam by entering the examination name, subject, class, date and total marks.",
      "The exam status helps you identify examinations that are upcoming, pending marks or already completed.",
    ],
  },
  {
    id: 6,
    title: "Uploading teaching materials",
    category: "Materials",
    description:
      "Upload PDFs and presentations and keep your classroom resources organized.",
    readTime: "3 min read",
    content: [
      "Open Materials to view resources currently available to your classes.",
      "Use Upload Material to add a new PDF or presentation resource.",
      "You can search materials and filter resources by type.",
      "Resources can be viewed, downloaded or removed from the materials list.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* FAQs                                                                       */
/* -------------------------------------------------------------------------- */

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I create a new assignment?",
    answer:
      "Open Assignments from the sidebar and select Create Assignment. Enter the required assignment details, select the appropriate class and subject, then save the assignment.",
  },
  {
    id: 2,
    question: "How can I mark attendance for my class?",
    answer:
      "Open Attendance, select the class, subject and date, then mark each student as Present, Absent or Late. You can also use the bulk attendance controls before saving the session.",
  },
  {
    id: 3,
    question: "Can I upload PDF and presentation files?",
    answer:
      "Yes. The Materials section supports teaching resources such as PDF and presentation files. Use the Upload Material action to add a resource.",
  },
  {
    id: 4,
    question: "How do I communicate with a student?",
    answer:
      "Open Messages from the sidebar, select an existing conversation or use New Message to search for a recipient and start a new conversation.",
  },
  {
    id: 5,
    question: "Where can I view student information?",
    answer:
      "Open Students from the teacher navigation. You can search students, filter the list and open an individual student profile.",
  },
  {
    id: 6,
    question: "Can I search the Help Center?",
    answer:
      "Yes. Use the Help Center search bar to search across help articles, categories and frequently asked questions.",
  },
];

/* -------------------------------------------------------------------------- */
/* Main Page                                                                  */
/* -------------------------------------------------------------------------- */

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] =
    useState<HelpArticle | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSent, setSupportSent] = useState(false);

  const [toast, setToast] = useState("");

  /* ------------------------------------------------------------------------ */
  /* Search                                                                   */
  /* ------------------------------------------------------------------------ */

  const filteredArticles = useMemo(() => {
    const value = search.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        selectedCategory === "All" ||
        article.category === selectedCategory;

      if (!value) {
        return categoryMatch;
      }

      const searchMatch =
        article.title.toLowerCase().includes(value) ||
        article.category.toLowerCase().includes(value) ||
        article.description.toLowerCase().includes(value) ||
        article.content.some((item) =>
          item.toLowerCase().includes(value)
        );

      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory]);

  /* ------------------------------------------------------------------------ */
  /* FAQ Search                                                               */
  /* ------------------------------------------------------------------------ */

  const filteredFaqs = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(value) ||
        faq.answer.toLowerCase().includes(value)
    );
  }, [search]);

  /* ------------------------------------------------------------------------ */
  /* Toast                                                                    */
  /* ------------------------------------------------------------------------ */

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  /* ------------------------------------------------------------------------ */
  /* Reset Search                                                             */
  /* ------------------------------------------------------------------------ */

  const resetSearch = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  /* ------------------------------------------------------------------------ */
  /* Support                                                                  */
  /* ------------------------------------------------------------------------ */

  const handleSupportSubmit = () => {
    if (!supportSubject.trim() || !supportMessage.trim()) {
      return;
    }

    setSupportSent(true);

    window.setTimeout(() => {
      setSupportSent(false);
      setSupportSubject("");
      setSupportMessage("");
      setShowSupportModal(false);
      showToast("Support request submitted");
    }, 1000);
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* ================================================================ */}
        {/* HEADER                                                            */}
        {/* ================================================================ */}

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
              <LifeBuoy size={18} className="text-white" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Support Center
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Help Center
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Find answers, learn how VINEEV EDU works, or contact support.
          </p>
        </div>

        {/* ================================================================ */}
        {/* HERO SEARCH                                                       */}
        {/* ================================================================ */}

        <div className="relative mb-8 overflow-hidden rounded-2xl bg-indigo-600 px-6 py-10 shadow-lg shadow-indigo-100 sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Sparkles size={19} className="text-white" />
            </div>

            <h2 className="text-xl font-bold text-white sm:text-2xl">
              How can we help you?
            </h2>

            <p className="mt-2 text-xs font-medium text-indigo-100 sm:text-sm">
              Search our help articles and frequently asked questions.
            </p>

            <div className="relative mt-6">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for help, articles, assignments, attendance..."
                className="h-12 w-full rounded-xl border border-white/20 bg-white px-11 pr-11 text-sm font-medium text-slate-700 shadow-xl outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* CATEGORY FILTER                                                   */}
        {/* ================================================================ */}

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              selectedCategory === "All"
                ? "bg-indigo-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
            }`}
          >
            All Topics
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.title)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                selectedCategory === category.title
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
              }`}
            >
              {category.title}
            </button>
          ))}

          {(search || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={resetSearch}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}
        </div>

        {/* ================================================================ */}
        {/* CATEGORIES                                                        */}
        {/* ================================================================ */}

        {!search && selectedCategory === "All" && (
          <section className="mb-8">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Browse by topic
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Find help based on the area you are working with.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(category.title)
                    }
                    className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.bgClass} ${category.iconClass}`}
                      >
                        <Icon size={18} />
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="text-slate-300 transition group-hover:text-indigo-500"
                      />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-800">
                      {category.title}
                    </h3>

                    <p className="mt-1.5 text-[10px] font-medium leading-5 text-slate-400">
                      {category.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* ARTICLES + SUPPORT                                                */}
        {/* ================================================================ */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_330px]">

          {/* Articles */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {search || selectedCategory !== "All"
                    ? "Search Results"
                    : "Popular Articles"}
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {filteredArticles.length} article
                  {filteredArticles.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:border-indigo-200 hover:shadow-md sm:p-5"
                  >
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:flex">
                      <BookOpen size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xs font-bold text-slate-800 transition group-hover:text-indigo-600 sm:text-sm">
                          {article.title}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-semibold text-slate-500">
                          {article.category}
                        </span>
                      </div>

                      <p className="mt-1.5 text-[10px] font-medium leading-5 text-slate-400">
                        {article.description}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-[9px] font-semibold text-slate-400">
                        <Clock3 size={11} />
                        {article.readTime}
                      </div>
                    </div>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Search size={20} className="text-slate-400" />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-700">
                  No help articles found
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Try a different search term or browse another category.
                </p>

                <button
                  type="button"
                  onClick={resetSearch}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                >
                  <RotateCcw size={13} />
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* ============================================================ */}
          {/* SUPPORT CARD                                                   */}
          {/* ============================================================ */}

          <aside className="space-y-4">

            {/* Contact Support */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-900 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <LifeBuoy size={18} className="text-white" />
                </div>

                <h3 className="mt-4 text-sm font-bold text-white">
                  Still need help?
                </h3>

                <p className="mt-1 text-[10px] font-medium leading-5 text-slate-300">
                  Our support team can help you with platform-related
                  questions.
                </p>
              </div>

              <div className="space-y-2 p-4">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(true)}
                  className="flex w-full items-center justify-between rounded-lg bg-indigo-600 px-3.5 py-3 text-xs font-semibold text-white transition hover:bg-indigo-700"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle size={14} />
                    Contact Support
                  </span>

                  <ArrowUpRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    showToast("Support email copied")
                  }
                  className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-3 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Mail size={14} className="text-slate-400" />
                  support@vineev.edu
                </button>
              </div>
            </div>

            {/* Quick Help */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-emerald-500"
                />

                <h3 className="text-xs font-bold text-slate-800">
                  Quick Help
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearch("attendance");
                    setSelectedCategory("Attendance");
                  }}
                  className="flex w-full items-center justify-between text-left text-[10px] font-semibold text-slate-500 transition hover:text-indigo-600"
                >
                  Recording attendance
                  <ChevronRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("assignment");
                    setSelectedCategory("Assignments");
                  }}
                  className="flex w-full items-center justify-between text-left text-[10px] font-semibold text-slate-500 transition hover:text-indigo-600"
                >
                  Managing assignments
                  <ChevronRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("materials");
                    setSelectedCategory("Materials");
                  }}
                  className="flex w-full items-center justify-between text-left text-[10px] font-semibold text-slate-500 transition hover:text-indigo-600"
                >
                  Uploading materials
                  <ChevronRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("messages");
                    setSelectedCategory("Messages");
                  }}
                  className="flex w-full items-center justify-between text-left text-[10px] font-semibold text-slate-500 transition hover:text-indigo-600"
                >
                  Sending messages
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* ================================================================ */}
        {/* FAQ                                                               */}
        {/* ================================================================ */}

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Quick answers to common questions.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={
                      index !== filteredFaqs.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : faq.id)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <HelpCircle size={14} />
                        </div>

                        <span className="text-xs font-bold text-slate-700">
                          {faq.question}
                        </span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pl-[60px]">
                        <p className="text-[11px] font-medium leading-6 text-slate-500">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-10 text-center">
                <p className="text-xs font-semibold text-slate-500">
                  No matching FAQs found.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================ */}
        {/* BOTTOM SUPPORT BANNER                                             */}
        {/* ================================================================ */}

        <div className="mt-8 overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/70 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <MessageCircle size={18} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Can't find what you're looking for?
                </h3>

                <p className="mt-1 text-[10px] font-medium leading-5 text-slate-500">
                  Send a message to the support team and we'll help you
                  with your question.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSupportModal(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Contact Support
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ARTICLE MODAL                                                       */}
      {/* ================================================================== */}

      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedArticle(null);
            }
          }}
        >
          <div className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <BookOpen size={18} />
                </div>

                <div>
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-[8px] font-bold text-indigo-600">
                    {selectedArticle.category}
                  </span>

                  <h2 className="mt-2 text-base font-bold text-slate-900">
                    {selectedArticle.title}
                  </h2>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    {selectedArticle.readTime}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            {/* Article Content */}
            <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
              <p className="text-xs font-semibold leading-6 text-slate-600">
                {selectedArticle.description}
              </p>

              <div className="mt-6 space-y-5">
                {selectedArticle.content.map((paragraph, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[9px] font-bold text-indigo-600">
                      {index + 1}
                    </div>

                    <p className="text-xs font-medium leading-6 text-slate-500">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* SUPPORT MODAL                                                       */}
      {/* ================================================================== */}

      {showSupportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowSupportModal(false);
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <LifeBuoy size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Contact Support
                  </h2>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    Tell us how we can help.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            {supportSent ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={22} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  Request submitted
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Your support request has been submitted successfully.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-5 p-6">
                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Subject
                    </label>

                    <input
                      type="text"
                      value={supportSubject}
                      onChange={(e) =>
                        setSupportSubject(e.target.value)
                      }
                      placeholder="What do you need help with?"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Message
                    </label>

                    <textarea
                      value={supportMessage}
                      onChange={(e) =>
                        setSupportMessage(e.target.value)
                      }
                      rows={5}
                      placeholder="Describe your question or problem..."
                      className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-medium leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-3">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-indigo-600" />

                      <span className="text-[10px] font-semibold text-indigo-700">
                        support@vineev.edu
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setShowSupportModal(false)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSupportSubmit}
                    disabled={
                      !supportSubject.trim() ||
                      !supportMessage.trim()
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={13} />
                    Submit Request
                  </button>
                </div>
              </>
            )}
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