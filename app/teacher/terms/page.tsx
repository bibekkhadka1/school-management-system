"use client";

import {
  FileText,
  ShieldCheck,
  UserCheck,
  BookOpen,
  AlertTriangle,
  Copyright,
  Ban,
  RefreshCw,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState, type ElementType } from "react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileText,
  },
  {
    id: "account",
    title: "Account Responsibilities",
    icon: UserCheck,
  },
  {
    id: "platform",
    title: "Platform Usage",
    icon: BookOpen,
  },
  {
    id: "content",
    title: "User Content",
    icon: Copyright,
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    icon: Ban,
  },
  {
    id: "availability",
    title: "Service Availability",
    icon: RefreshCw,
  },
  {
    id: "security",
    title: "Security",
    icon: ShieldCheck,
  },
];

export default function TermsOfServicePage() {
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
              <span className="text-gray-700">Terms of Service</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Terms of Service
                </h1>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Rules and conditions for using the VINEEV EDU platform.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm">
            Last updated: September 17, 2026
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white lg:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Welcome to VINEEV EDU
                </h2>

                <p className="mt-1 max-w-3xl text-sm font-medium leading-6 text-indigo-100">
                  These Terms of Service describe the general rules and
                  responsibilities that apply when using VINEEV EDU and its
                  teacher-facing features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
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
                    Contact the VINEEV EDU support team if you have questions
                    about these terms.
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

          {/* Content */}
          <main className="min-w-0">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-6 lg:p-10">
                {/* Introduction */}
                <section className="border-b border-gray-100 pb-8">
                  <p className="text-sm font-medium leading-7 text-gray-600">
                    These Terms of Service govern access to and use of the
                    VINEEV EDU platform. The platform provides tools intended
                    to support educational administration and teacher
                    workflows.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    By accessing or using VINEEV EDU, users agree to follow
                    these terms and any applicable policies or instructions
                    provided by their educational institution.
                  </p>
                </section>

                {/* 01 */}
                <section
                  id="acceptance"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="01"
                    icon={FileText}
                    title="Acceptance of Terms"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Use of VINEEV EDU is subject to these Terms of Service.
                    Users are expected to use the platform responsibly and in
                    accordance with applicable institutional policies and
                    applicable laws.
                  </p>

                  <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
                    <p className="text-sm font-bold text-gray-900">
                      Important
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                      If you do not agree with these terms, you should not use
                      the platform except where access is required or managed
                      by your educational institution.
                    </p>
                  </div>
                </section>

                {/* 02 */}
                <section
                  id="account"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="02"
                    icon={UserCheck}
                    title="Account Responsibilities"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Users are responsible for maintaining the security of their
                    accounts and for activity performed through their account.
                  </p>

                  <BulletList
                    items={[
                      "Keep login credentials confidential.",
                      "Use accurate information when maintaining your account.",
                      "Do not share account credentials with unauthorized users.",
                      "Notify the appropriate administrator if unauthorized account activity is suspected.",
                      "Use the permissions provided for your assigned role only.",
                    ]}
                  />
                </section>

                {/* 03 */}
                <section
                  id="platform"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="03"
                    icon={BookOpen}
                    title="Platform Usage"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    VINEEV EDU may provide features for managing classes,
                    students, assignments, attendance, examinations,
                    materials, messages, and other educational activities.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Users should use these features only for legitimate
                    educational, administrative, or institutional purposes
                    consistent with their role.
                  </p>
                </section>

                {/* 04 */}
                <section
                  id="content"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="04"
                    icon={Copyright}
                    title="User Content"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Users may enter or upload information such as educational
                    materials, assignment information, class information,
                    messages, and other content required for their work.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Users are responsible for ensuring that content they
                    provide is appropriate for the intended educational
                    purpose and that they have the necessary rights or
                    permissions to use it.
                  </p>

                  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm font-bold text-gray-800">
                      Respect intellectual property
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                      Do not upload or distribute content that you do not have
                      permission to use.
                    </p>
                  </div>
                </section>

                {/* 05 */}
                <section
                  id="prohibited"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="05"
                    icon={Ban}
                    title="Prohibited Activities"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Users must not use VINEEV EDU to perform activities that
                    could compromise the platform, its users, or institutional
                    data.
                  </p>

                  <BulletList
                    items={[
                      "Attempting to gain unauthorized access to accounts or systems.",
                      "Circumventing access controls or platform security measures.",
                      "Introducing malicious code or harmful software.",
                      "Using the platform for unlawful or fraudulent activities.",
                      "Accessing information that is outside the user's authorized role.",
                      "Interfering with the normal operation of the platform.",
                      "Using platform data for purposes that are not authorized by the institution.",
                    ]}
                  />
                </section>

                {/* 06 */}
                <section
                  id="availability"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="06"
                    icon={RefreshCw}
                    title="Service Availability"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    We aim to keep VINEEV EDU available and reliable, but
                    temporary interruptions may occur because of maintenance,
                    updates, technical issues, network problems, or other
                    circumstances.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Certain features may also be changed, updated, temporarily
                    unavailable, or discontinued as the platform evolves.
                  </p>
                </section>

                {/* 07 */}
                <section
                  id="security"
                  className="scroll-mt-6 border-b border-gray-100 py-8"
                >
                  <SectionHeading
                    number="07"
                    icon={ShieldCheck}
                    title="Security"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Security is a shared responsibility. VINEEV EDU may
                    implement technical and organizational measures designed
                    to protect the platform and information handled through
                    it.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Users should also take reasonable precautions, including
                    protecting credentials, signing out of shared devices, and
                    reporting suspicious activity.
                  </p>
                </section>

                {/* 08 */}
                <section className="scroll-mt-6 border-b border-gray-100 py-8">
                  <SectionHeading
                    number="08"
                    icon={AlertTriangle}
                    title="Account Suspension or Restriction"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    Access may be restricted or suspended when necessary to
                    protect users, institutional information, platform
                    security, or comply with applicable requirements.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Educational institutions may also manage user access based
                    on employment, enrollment, assigned responsibilities, or
                    institutional policies.
                  </p>
                </section>

                {/* 09 */}
                <section className="scroll-mt-6 border-b border-gray-100 py-8">
                  <SectionHeading
                    number="09"
                    icon={RefreshCw}
                    title="Changes to These Terms"
                  />

                  <p className="mt-5 text-sm font-medium leading-7 text-gray-600">
                    These Terms of Service may be updated as VINEEV EDU
                    develops or as operational, legal, or institutional
                    requirements change.
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-gray-600">
                    Updated terms will be made available through the
                    appropriate VINEEV EDU interface.
                  </p>
                </section>

                {/* Contact */}
                <section id="contact" className="scroll-mt-6 pt-8">
                  <SectionHeading
                    number="10"
                    icon={Mail}
                    title="Contact Us"
                  />

                  <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
                    <p className="text-sm font-medium leading-6 text-gray-600">
                      If you have questions regarding these Terms of Service,
                      please contact your institution's administrator or the
                      VINEEV EDU support team.
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

            {/* Legal Notice */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-4 text-center">
              <p className="text-xs font-medium leading-5 text-gray-500">
                This Terms of Service page is a product interface draft for
                VINEEV EDU. Before production use, the terms should be
                reviewed and approved by the appropriate legal or institutional
                authority.
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
  icon: ElementType;
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