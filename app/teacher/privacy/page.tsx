"use client";

import {
  Shield,
  Lock,
  Database,
  UserCheck,
  Eye,
  Share2,
  Cookie,
  Bell,
  FileText,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const sections = [
  {
    id: "information",
    title: "Information We Collect",
    icon: Database,
  },
  {
    id: "usage",
    title: "How We Use Information",
    icon: Eye,
  },
  {
    id: "sharing",
    title: "Information Sharing",
    icon: Share2,
  },
  {
    id: "security",
    title: "Data Security",
    icon: Lock,
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: UserCheck,
  },
  {
    id: "cookies",
    title: "Cookies & Technologies",
    icon: Cookie,
  },
  {
    id: "communications",
    title: "Communications",
    icon: Bell,
  },
];

export default function PrivacyPolicyPage() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
              <span>Settings</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-700">Privacy Policy</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Shield className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Privacy Policy
                </h1>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Learn how VINEEV EDU handles, protects, and uses your
                  information.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm">
            Last updated: September 17, 2026
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
          <div className="flex flex-col gap-5 bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Shield className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Your privacy matters to us
                </h2>

                <p className="mt-1 max-w-3xl text-sm font-medium leading-6 text-indigo-100">
                  This Privacy Policy explains what information may be
                  collected through VINEEV EDU, how that information is used,
                  and the measures taken to help protect it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Table of Contents */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />

                <h2 className="text-sm font-bold text-gray-900">
                  On this page
                </h2>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Icon className="h-4 w-4 shrink-0" />

                      <span className="flex-1">{section.title}</span>

                      <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-5 border-t border-gray-100 pt-5">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Need help?
                  </p>

                  <p className="mt-1 text-sm font-medium leading-5 text-gray-600">
                    Contact our support team if you have questions about
                    privacy or your information.
                  </p>

                  <button
                    onClick={() => scrollToSection("contact")}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Contact support
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <main className="min-w-0">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-6 lg:p-10">
                {/* Introduction */}
                <section className="border-b border-gray-100 pb-8">
                  <p className="text-sm font-medium leading-7 text-gray-600">
                    Welcome to VINEEV EDU. We respect your privacy and are
                    committed to handling information responsibly. This policy
                    provides a general overview of the information associated
                    with your use of the VINEEV EDU teacher platform and the
                    choices available to you.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    By using the platform, you acknowledge that information may
                    be processed as described in this Privacy Policy. This
                    policy should be read together with any applicable terms,
                    notices, and institutional policies.
                  </p>
                </section>

                {/* Information We Collect */}
                <section
                  id="information"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="01"
                    icon={Database}
                    title="Information We Collect"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Depending on how you use VINEEV EDU, the platform may
                    process information necessary to provide educational and
                    administrative functionality.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <InfoCard
                      title="Account Information"
                      description="Information associated with your teacher account, such as your name, email address, role, and account preferences."
                    />

                    <InfoCard
                      title="Academic Information"
                      description="Information entered into the platform for classroom management, including classes, students, assignments, attendance, examinations, and teaching materials."
                    />

                    <InfoCard
                      title="Usage Information"
                      description="Technical and usage information may be processed to maintain functionality, troubleshoot problems, and improve the platform."
                    />

                    <InfoCard
                      title="Communication Information"
                      description="Messages, support requests, and other information you choose to provide when communicating through the platform."
                    />
                  </div>
                </section>

                {/* Usage */}
                <section
                  id="usage"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="02"
                    icon={Eye}
                    title="How We Use Information"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Information may be used for purposes such as:
                  </p>

                  <BulletList
                    items={[
                      "Providing and maintaining VINEEV EDU functionality.",
                      "Managing teacher accounts and access permissions.",
                      "Supporting classroom, student, assignment, attendance, and examination workflows.",
                      "Responding to support requests and technical issues.",
                      "Improving platform usability, reliability, and security.",
                      "Detecting, preventing, and investigating unauthorized activity.",
                    ]}
                  />
                </section>

                {/* Sharing */}
                <section
                  id="sharing"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="03"
                    icon={Share2}
                    title="Information Sharing"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Information should only be shared or made accessible where
                    necessary to operate the platform, provide requested
                    services, comply with applicable requirements, or support
                    the educational institution using VINEEV EDU.
                  </p>

                  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm font-bold text-gray-800">
                      Access is intended to follow user roles
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                      Teachers and other authorized users should only have
                      access to information required for their assigned
                      responsibilities.
                    </p>
                  </div>
                </section>

                {/* Security */}
                <section
                  id="security"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="04"
                    icon={Lock}
                    title="Data Security"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    We take reasonable measures designed to protect information
                    against unauthorized access, alteration, disclosure, or
                    destruction. Security practices may include access
                    controls, authentication mechanisms, secure application
                    design, and monitoring.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    No online service can guarantee absolute security.
                    Users should protect their account credentials and notify
                    the appropriate administrator if they suspect unauthorized
                    access.
                  </p>
                </section>

                {/* Rights */}
                <section
                  id="rights"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="05"
                    icon={UserCheck}
                    title="Your Rights"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Depending on your location, role, and applicable law, you
                    may have rights relating to information associated with
                    your account.
                  </p>

                  <BulletList
                    items={[
                      "Request access to certain personal information.",
                      "Request correction of inaccurate information.",
                      "Ask questions about how information is processed.",
                      "Request deletion where applicable and legally permitted.",
                      "Raise privacy concerns with the appropriate administrator or support team.",
                    ]}
                  />
                </section>

                {/* Cookies */}
                <section
                  id="cookies"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="06"
                    icon={Cookie}
                    title="Cookies & Technologies"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    VINEEV EDU may use cookies or similar technologies where
                    needed to support authentication, session management,
                    preferences, security, and platform functionality.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Browser settings may allow you to control certain cookies.
                    Disabling required cookies may affect some platform
                    functionality.
                  </p>
                </section>

                {/* Communications */}
                <section
                  id="communications"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="07"
                    icon={Bell}
                    title="Communications"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    We may use contact information associated with your account
                    to provide service-related communications, security
                    notifications, administrative messages, or responses to
                    support requests.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Service-related communications may be necessary for the
                    operation and security of your account.
                  </p>
                </section>

                {/* Changes */}
                <section className="border-b border-gray-100 py-8">
                  <SectionHeading
                    number="08"
                    icon={FileText}
                    title="Changes to This Policy"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    This Privacy Policy may be updated when platform
                    functionality, operational practices, or applicable
                    requirements change. When updates are made, the revised
                    version will be published through the appropriate VINEEV
                    EDU interface.
                  </p>
                </section>

                {/* Contact */}
                <section id="contact" className="scroll-mt-6 pt-8">
                  <SectionHeading
                    number="09"
                    icon={Mail}
                    title="Contact Us"
                  />

                  <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
                    <p className="text-sm font-medium leading-6 text-gray-600">
                      If you have questions about this Privacy Policy or how
                      information is handled within VINEEV EDU, please contact
                      your institution's administrator or the VINEEV EDU
                      support team.
                    </p>

                    <button
                      onClick={() => {
                        window.location.href = "mailto:support@vineev.edu";
                      }}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                    >
                      <Mail className="h-4 w-4" />
                      Contact Support
                    </button>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-4 text-center">
              <p className="text-xs font-medium text-gray-500">
                This Privacy Policy is provided for the VINEEV EDU platform.
                Please ensure the final policy is reviewed and approved for
                your institution and applicable jurisdiction before production
                use.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Back to top */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function SectionHeading({
  number,
  icon: Icon,
  title,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
        {number}
      </div>

      <div className="flex items-center gap-2.5">
        <Icon className="h-5 w-5 text-indigo-600" />

        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5 transition hover:border-indigo-200 hover:bg-indigo-50/30">
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />

          <span className="text-sm font-medium leading-6 text-gray-600">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}