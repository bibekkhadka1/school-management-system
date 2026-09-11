"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Upload,
  X,
  Save,
  Send,
  BookOpen,
  Users,
  Award,
  Info,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAssignmentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [submissionType, setSubmissionType] = useState("Online Submission");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Assignment title is required.";
    }

    if (!subject) {
      newErrors.subject = "Please select a subject.";
    }

    if (!className) {
      newErrors.className = "Please select a class.";
    }

    if (!description.trim()) {
      newErrors.description = "Assignment description is required.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Please select a due date.";
    }

    if (!totalMarks) {
      newErrors.totalMarks = "Please enter total marks.";
    } else if (Number(totalMarks) <= 0) {
      newErrors.totalMarks = "Total marks must be greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setSuccessMessage("");
      return;
    }

    setIsSaving(true);
    setSuccessMessage("");

    const assignmentData = {
      title,
      subject,
      className,
      description,
      dueDate,
      totalMarks,
      submissionType,
      attachment: file?.name ?? null,
    };

    console.log("Assignment:", assignmentData);

    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Assignment created successfully.");

      setTimeout(() => {
        router.push("/teacher/assignments");
      }, 1200);
    }, 700);
  };

  const handleSaveDraft = () => {
    const draftData = {
      title,
      subject,
      className,
      description,
      dueDate,
      totalMarks,
      submissionType,
      attachment: file?.name ?? null,
      status: "Draft",
    };

    console.log("Assignment draft:", draftData);

    setSuccessMessage("Assignment saved as draft.");

    setTimeout(() => {
      router.push("/teacher/assignments");
    }, 1000);
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* =========================================================
            BACK BUTTON
        ========================================================= */}
        <button
          type="button"
          onClick={() => router.push("/teacher/assignments")}
          className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-600"
        >
          <ArrowLeft size={15} />
          Back to Assignments
        </button>

        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-200">
                <ClipboardList size={18} className="text-white" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Academic Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create Assignment
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Create and publish a new assignment for your students.
            </p>
          </div>
        </div>

        {/* =========================================================
            SUCCESS MESSAGE
        ========================================================= */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={18} />
            {successMessage}
          </div>
        )}

        {/* =========================================================
            FORM
        ========================================================= */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* =====================================================
                MAIN FORM
            ===================================================== */}
            <div className="space-y-6">
              {/* Basic Information */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <BookOpen size={17} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Basic Information
                      </h2>

                      <p className="mt-0.5 text-xs font-medium text-slate-400">
                        Enter the main details of your assignment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  {/* Assignment Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Assignment Title
                      <span className="ml-1 text-rose-500">*</span>
                    </label>

                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Database Design Project"
                      className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                        errors.title
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                      }`}
                    />

                    {errors.title && (
                      <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Subject + Class */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-xs font-semibold text-slate-700"
                      >
                        Subject
                        <span className="ml-1 text-rose-500">*</span>
                      </label>

                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:ring-2 ${
                          errors.subject
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                            : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                        }`}
                      >
                        <option value="">Select subject</option>
                        <option value="DBMS">DBMS</option>
                        <option value="Web Development">
                          Web Development
                        </option>
                        <option value="Data Science">Data Science</option>
                        <option value="Computer Networks">
                          Computer Networks
                        </option>
                        <option value="Operating Systems">
                          Operating Systems
                        </option>
                        <option value="Software Engineering">
                          Software Engineering
                        </option>
                      </select>

                      {errors.subject && (
                        <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="class"
                        className="mb-2 block text-xs font-semibold text-slate-700"
                      >
                        Class
                        <span className="ml-1 text-rose-500">*</span>
                      </label>

                      <select
                        id="class"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:ring-2 ${
                          errors.className
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                            : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                        }`}
                      >
                        <option value="">Select class</option>
                        <option value="BCA 3A">BCA 3A</option>
                        <option value="BCA 3B">BCA 3B</option>
                        <option value="BCA 4A">BCA 4A</option>
                        <option value="CSIT 5A">CSIT 5A</option>
                        <option value="BIT 2A">BIT 2A</option>
                        <option value="BCA 6A">BCA 6A</option>
                      </select>

                      {errors.className && (
                        <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                          {errors.className}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Description & Instructions
                      <span className="ml-1 text-rose-500">*</span>
                    </label>

                    <textarea
                      id="description"
                      rows={7}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write the assignment instructions, requirements, learning objectives, and any other information students need to know..."
                      className={`w-full resize-none rounded-lg border bg-white px-3.5 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                        errors.description
                          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                      }`}
                    />

                    <div className="mt-1.5 flex items-center justify-between">
                      {errors.description ? (
                        <p className="text-[11px] font-medium text-rose-500">
                          {errors.description}
                        </p>
                      ) : (
                        <p className="text-[11px] font-medium text-slate-400">
                          Provide clear instructions for your students.
                        </p>
                      )}

                      <span className="text-[10px] font-medium text-slate-400">
                        {description.length} characters
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Assignment Settings */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <CalendarDays size={17} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Assignment Settings
                      </h2>

                      <p className="mt-0.5 text-xs font-medium text-slate-400">
                        Configure deadline, marks and submission options.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                  {/* Due Date */}
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Due Date
                      <span className="ml-1 text-rose-500">*</span>
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3.5 text-sm font-medium text-slate-700 outline-none transition focus:ring-2 ${
                          errors.dueDate
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                            : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                        }`}
                      />
                    </div>

                    {errors.dueDate && (
                      <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                        {errors.dueDate}
                      </p>
                    )}
                  </div>

                  {/* Total Marks */}
                  <div>
                    <label
                      htmlFor="totalMarks"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Total Marks
                      <span className="ml-1 text-rose-500">*</span>
                    </label>

                    <div className="relative">
                      <Award
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="totalMarks"
                        type="number"
                        min="1"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        placeholder="e.g. 100"
                        className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                          errors.totalMarks
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                            : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                        }`}
                      />
                    </div>

                    {errors.totalMarks && (
                      <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                        {errors.totalMarks}
                      </p>
                    )}
                  </div>

                  {/* Submission Type */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="submissionType"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Submission Type
                    </label>

                    <select
                      id="submissionType"
                      value={submissionType}
                      onChange={(e) => setSubmissionType(e.target.value)}
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Online Submission">
                        Online Submission
                      </option>
                      <option value="File Upload">File Upload</option>
                      <option value="Text Submission">Text Submission</option>
                      <option value="Online + File Upload">
                        Online + File Upload
                      </option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Attachment */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <FileText size={17} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Assignment Material
                      </h2>

                      <p className="mt-0.5 text-xs font-medium text-slate-400">
                        Optionally attach instructions, references or resources.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {!file ? (
                    <label
                      htmlFor="attachment"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-10 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Upload size={19} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        Upload assignment material
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        PDF, DOC, DOCX, PPT, PPTX or ZIP up to 10MB
                      </p>

                      <span className="mt-4 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                        Choose File
                      </span>

                      <input
                        id="attachment"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <FileText size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-700">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={removeFile}
                        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* =====================================================
                SIDE PANEL
            ===================================================== */}
            <div className="space-y-6">
              {/* Publishing Card */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:sticky lg:top-6">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="text-sm font-bold text-slate-900">
                    Publish Assignment
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    Review before publishing.
                  </p>
                </div>

                <div className="p-5">
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                    <div className="flex gap-3">
                      <Info
                        size={17}
                        className="mt-0.5 shrink-0 text-indigo-600"
                      />

                      <div>
                        <p className="text-xs font-semibold text-indigo-700">
                          Before you publish
                        </p>

                        <p className="mt-1 text-[11px] font-medium leading-5 text-indigo-600/80">
                          Make sure the class, due date, marks and instructions
                          are correct. Students will be able to see the
                          assignment after publishing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send size={16} />
                      {isSaving ? "Publishing..." : "Publish Assignment"}
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <Save size={16} />
                      Save as Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/teacher/assignments")}
                      className="flex h-10 w-full items-center justify-center rounded-xl px-4 text-xs font-semibold text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </section>

              {/* Assignment Preview */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />

                    <h2 className="text-sm font-bold text-slate-900">
                      Assignment Summary
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  <SummaryRow
                    label="Class"
                    value={className || "Not selected"}
                  />

                  <SummaryRow
                    label="Subject"
                    value={subject || "Not selected"}
                  />

                  <SummaryRow
                    label="Due Date"
                    value={dueDate || "Not selected"}
                  />

                  <SummaryRow
                    label="Total Marks"
                    value={totalMarks || "Not set"}
                  />

                  <SummaryRow
                    label="Submission"
                    value={submissionType}
                  />
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================================================================
   SUMMARY ROW
================================================================ */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <span className="text-[11px] font-semibold text-slate-400">
        {label}
      </span>

      <span className="max-w-[180px] truncate text-right text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}