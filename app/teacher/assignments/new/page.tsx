"use client";

import {
  ArrowLeft,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  FileText,
  Info,
  Paperclip,
  Save,
  Send,
  Upload,
  Users,
  X,
} from "lucide-react";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

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

  // Stores the classes that come from our PostgreSQL database.
  const [classes, setClasses] = useState<any[]>([]);

  // Keeps track of whether the classes are still loading.
  const [classesLoading, setClassesLoading] = useState(true);
  // Fetch classes from the backend when this page opens.
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Ask our Express backend for the classes.
        const response = await fetch("http://localhost:5000/api/classes");

        // Stop if the backend returns an error.
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        // Convert the backend response into JavaScript data.
        const data = await response.json();

        // Our /api/classes response contains a "classes" array.
        setClasses(data.classes);

        // This lets us verify the data in the browser console.
        console.log("Classes from database:", data.classes);
      } catch (error) {
        // Show the error in the browser console if something goes wrong.
        console.error("Error fetching classes:", error);
      } finally {
        // Loading is finished after the request completes.
        setClassesLoading(false);
      }
    };

    // Run the function when the page loads.
    fetchClasses();
  }, []);

  // Find the currently selected class from the database classes.
  const selectedClass = classes.find(
    (item) => item.code === className,
  );

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setSuccessMessage("");
      return;
    }

    setIsSaving(true);
    setSuccessMessage("");

    // Find the complete class object that the teacher selected.
    const selectedClass = classes.find(
      (item) => item.code === className,
    );

    // Get the real PostgreSQL class ID.
    const classId = selectedClass?.id;

    // Find the selected subject inside the selected class.
    const selectedSubject = selectedClass?.subjects?.find(
      (item: any) => item.code === subject,
    );

    // Get the real PostgreSQL subject ID.
    const subjectId = selectedSubject?.id;

    // Make sure we found valid database IDs before sending
    // the assignment to the backend.
    if (!classId || !subjectId) {
      setSuccessMessage("");

      // Show the problem in the browser console.
      console.error("Invalid class or subject selection.");

      // Stop the submission.
      setIsSaving(false);

      return;
    }

    // Create FormData because we are sending both
    // normal assignment information and a file.
    const formData = new FormData();

    // Add the normal assignment information.
    formData.append("title", title.trim());
    formData.append("classId", String(classId));
    formData.append("subjectId", String(subjectId));
    formData.append("description", description.trim());
    formData.append("dueDate", dueDate);

    // Add the selected file only if the teacher attached one.
    if (file) {
      formData.append("file", file);
    }

    try {
      // Send the assignment to our Express backend.
      const response = await fetch("http://localhost:5000/api/assignments", {
        method: "POST",

        // Do NOT manually set Content-Type here.
        // The browser automatically sets the correct multipart/form-data
        // boundary when we send FormData.

        // Send the assignment information and optional file.
        body: formData,
      });

      // If the backend returned an error, stop here.
      if (!response.ok) {
        throw new Error("Failed to create assignment");
      }

      // Get the newly created assignment from the backend.
      const createdAssignment = await response.json();

      // Show the result in the browser console
      // so we can verify the database response.
      console.log("Assignment created:", createdAssignment);

      // Tell the user that the assignment was saved.
      setSuccessMessage("Assignment created successfully.");

      // Wait briefly so the user can see the success message.
      setTimeout(() => {
        router.push("/teacher/assignments");
      }, 1200);
    } catch (error) {
      // Show the actual error in the browser console.
      console.error("Error creating assignment:", error);

      // Show a user-friendly error message.
      setSuccessMessage("Failed to create assignment.");
    } finally {
      // Publishing is finished, whether successful or not.
      setIsSaving(false);
    }
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

  const inputBase =
    "w-full rounded-xl border bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4";

  const normalInput = `${inputBase} border-slate-200 focus:border-indigo-400 focus:ring-indigo-50`;

  const errorInput = `${inputBase} border-rose-300 focus:border-rose-400 focus:ring-rose-50`;

  return (
    <div className="min-h-full bg-slate-50/70 px-4 py-5 font-sans antialiased sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1450px]">
        {/* =========================================================
            TOP NAVIGATION
        ========================================================= */}
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/teacher/assignments")}
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-600"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Assignments
          </button>

          <div className="hidden items-center gap-2 text-[11px] font-semibold text-slate-400 sm:flex">
            <span>Assignments</span>
            <span>/</span>
            <span className="text-slate-600">Create Assignment</span>
          </div>
        </div>

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
                <ClipboardList size={19} className="text-white" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Academic Management
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                  Assignment workspace
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Create Assignment
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Create, configure and publish a new assignment for your students.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
              <FileText size={14} className="text-indigo-600" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Status
              </p>
              <p className="text-xs font-bold text-slate-700">
                Draft in progress
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            SUCCESS MESSAGE
        ========================================================= */}
        {successMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-800">
                {successMessage}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-emerald-600">
                Your assignment information has been saved.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================
            FORM
        ========================================================= */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <div className="space-y-6">
              {/* ===================================================
                  BASIC INFORMATION
              =================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<BookOpen size={17} />}
                  iconClass="bg-indigo-50 text-indigo-600"
                  title="Basic Information"
                  description="Enter the main details of your assignment."
                />

                <div className="space-y-5 p-5 sm:p-6">
                  {/* Assignment Title */}
                  <div>
                    <FieldLabel
                      htmlFor="title"
                      label="Assignment Title"
                      required
                    />

                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) {
                          setErrors((prev) => ({
                            ...prev,
                            title: "",
                          }));
                        }
                      }}
                      placeholder="e.g. Database Design Project"
                      className={`h-11.5 ${errors.title ? errorInput : normalInput
                        }`}
                    />

                    {errors.title && (
                      <ErrorMessage>{errors.title}</ErrorMessage>
                    )}
                  </div>

                  {/* Subject + Class */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="subject" label="Subject" required />

                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (errors.subject) {
                            setErrors((prev) => ({
                              ...prev,
                              subject: "",
                            }));
                          }
                        }}
                        className={`h-11.5 ${errors.subject ? errorInput : normalInput
                          }`}
                      >
                        <option value="">Select subject</option>

                        {selectedClass?.subjects?.map((item: any) => (
                          <option key={item.id} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>

                      {errors.subject && (
                        <ErrorMessage>{errors.subject}</ErrorMessage>
                      )}
                    </div>

                    <div>
                      <FieldLabel htmlFor="class" label="Class" required />

                      <select
                        id="class"
                        value={className}
                        onChange={(e) => {
                          setClassName(e.target.value);

                          // Clear the old subject because subjects depend on the selected class.
                          setSubject("");

                          if (errors.className) {
                            setErrors((prev) => ({
                              ...prev,
                              className: "",
                            }));
                          }
                        }}
                        className={`h-11.5 ${errors.className ? errorInput : normalInput
                          }`}
                      >
                        <option value=""> Select class</option>

                        {classes.map((item) => (
                          <option key={item.id} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>

                      {errors.className && (
                        <ErrorMessage>{errors.className}</ErrorMessage>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <FieldLabel
                      htmlFor="description"
                      label="Description & Instructions"
                      required
                    />

                    <div
                      className={`overflow-hidden rounded-xl border bg-white transition focus-within:ring-4 ${errors.description
                        ? "border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-50"
                        : "border-slate-200 focus-within:border-indigo-400 focus-within:ring-indigo-50"
                        }`}
                    >
                      <textarea
                        id="description"
                        rows={7}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);

                          if (errors.description) {
                            setErrors((prev) => ({
                              ...prev,
                              description: "",
                            }));
                          }
                        }}
                        placeholder="Write the assignment instructions, requirements, learning objectives, and any other information students need to know..."
                        className="block w-full resize-none border-0 bg-transparent px-3.5 py-3 text-sm font-medium leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
                      />

                      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-3.5 py-2">
                        <span className="text-[10px] font-medium text-slate-400">
                          {errors.description
                            ? errors.description
                            : "Provide clear instructions for your students."}
                        </span>

                        <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                          {description.length} characters
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===================================================
                  ASSIGNMENT SETTINGS
              =================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<CalendarDays size={17} />}
                  iconClass="bg-emerald-50 text-emerald-600"
                  title="Assignment Settings"
                  description="Configure deadline, marks and submission options."
                />

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                  {/* Due Date */}
                  <div>
                    <FieldLabel htmlFor="dueDate" label="Due Date" required />

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => {
                          setDueDate(e.target.value);
                          if (errors.dueDate) {
                            setErrors((prev) => ({
                              ...prev,
                              dueDate: "",
                            }));
                          }
                        }}
                        className={`h-11.5 pl-10 ${errors.dueDate ? errorInput : normalInput
                          }`}
                      />
                    </div>

                    {errors.dueDate && (
                      <ErrorMessage>{errors.dueDate}</ErrorMessage>
                    )}
                  </div>

                  {/* Total Marks */}
                  <div>
                    <FieldLabel
                      htmlFor="totalMarks"
                      label="Total Marks"
                      required
                    />

                    <div className="relative">
                      <Award
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="totalMarks"
                        type="number"
                        min="1"
                        value={totalMarks}
                        onChange={(e) => {
                          setTotalMarks(e.target.value);

                          if (errors.totalMarks) {
                            setErrors((prev) => ({
                              ...prev,
                              totalMarks: "",
                            }));
                          }
                        }}
                        placeholder="e.g. 100"
                        className={`h-11.5 pl-10 ${errors.totalMarks ? errorInput : normalInput
                          }`}
                      />
                    </div>

                    {errors.totalMarks && (
                      <ErrorMessage>{errors.totalMarks}</ErrorMessage>
                    )}
                  </div>

                  {/* Submission Type */}
                  <div className="sm:col-span-2">
                    <FieldLabel
                      htmlFor="submissionType"
                      label="Submission Type"
                    />

                    <select
                      id="submissionType"
                      value={submissionType}
                      onChange={(e) => setSubmissionType(e.target.value)}
                      className={`${normalInput} h-11.5`}
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

                    <p className="mt-2 text-[10px] font-medium text-slate-400">
                      Select how students should submit their work.
                    </p>
                  </div>
                </div>
              </section>

              {/* ===================================================
                  ATTACHMENT
              =================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<FileText size={17} />}
                  iconClass="bg-violet-50 text-violet-600"
                  title="Assignment Material"
                  description="Optionally attach instructions, references or resources."
                />

                <div className="p-5 sm:p-6">
                  {!file ? (
                    <label
                      htmlFor="attachment"
                      className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-11 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 transition group-hover:scale-105 group-hover:ring-indigo-200">
                        <Upload size={20} />
                      </div>

                      <p className="mt-4 text-sm font-bold text-slate-700">
                        Upload assignment material
                      </p>

                      <p className="mt-1 max-w-md text-xs font-medium leading-5 text-slate-400">
                        Drag and drop your file here or choose a file from your
                        computer.
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        {["PDF", "DOC", "DOCX", "PPT", "PPTX", "ZIP"].map(
                          (type) => (
                            <span
                              key={type}
                              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[9px] font-bold text-slate-500"
                            >
                              {type}
                            </span>
                          ),
                        )}
                      </div>

                      <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-200 transition group-hover:bg-indigo-700">
                        <Paperclip size={14} />
                        Choose File
                      </span>

                      <p className="mt-3 text-[10px] font-medium text-slate-400">
                        Maximum file size: 10MB
                      </p>

                      <input
                        id="attachment"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      />
                    </label>
                  ) : (
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                            <FileText size={19} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-700">
                              {file.name}
                            </p>

                            <p className="mt-1 text-[10px] font-semibold text-slate-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={removeFile}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-500 hover:ring-rose-200"
                          aria-label="Remove attachment"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-indigo-600">
                        <Check size={13} />
                        Attachment ready to publish
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* =====================================================
                RIGHT SIDEBAR
            ===================================================== */}
            <aside className="space-y-6">
              {/* ===================================================
                  PUBLISH CARD
              =================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-6">
                <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-sm">
                      <Send size={16} className="text-white" />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Publish Assignment
                      </h2>
                      <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                        Review and publish when ready.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* Information */}
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Info size={15} className="text-indigo-600" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-indigo-800">
                          Before you publish
                        </p>

                        <p className="mt-1 text-[10px] font-medium leading-5 text-indigo-600/80">
                          Make sure the class, due date, marks and instructions
                          are correct. Students will be able to see the
                          assignment after publishing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex h-11.5 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send size={15} />
                      {isSaving ? "Publishing..." : "Publish Assignment"}
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="flex h-11.5 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <Save size={15} />
                      Save as Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/teacher/assignments")}
                      className="flex h-10 w-full items-center justify-center rounded-xl px-4 text-xs font-bold text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </section>

              {/* ===================================================
                  ASSIGNMENT SUMMARY
              =================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                      <Users size={15} className="text-slate-500" />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Assignment Summary
                      </h2>
                      <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                        Live overview of your assignment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  <SummaryRow
                    label="Class"
                    value={className || "Not selected"}
                    icon={<Users size={13} />}
                  />

                  <SummaryRow
                    label="Subject"
                    value={subject || "Not selected"}
                    icon={<BookOpen size={13} />}
                  />

                  <SummaryRow
                    label="Due Date"
                    value={dueDate || "Not selected"}
                    icon={<CalendarDays size={13} />}
                  />

                  <SummaryRow
                    label="Total Marks"
                    value={totalMarks || "Not set"}
                    icon={<Award size={13} />}
                  />

                  <SummaryRow
                    label="Submission"
                    value={submissionType}
                    icon={<FileText size={13} />}
                  />
                </div>
              </section>

              {/* ===================================================
                  COMPLETION CARD
              =================================================== */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Form Progress
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {getCompletionPercentage({
                        title,
                        subject,
                        className,
                        description,
                        dueDate,
                        totalMarks,
                      })}
                      % complete
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                    {getCompletionPercentage({
                      title,
                      subject,
                      className,
                      description,
                      dueDate,
                      totalMarks,
                    })}
                    %
                  </div>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{
                      width: `${getCompletionPercentage({
                        title,
                        subject,
                        className,
                        description,
                        dueDate,
                        totalMarks,
                      })}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-[10px] font-medium leading-5 text-slate-400">
                  Complete all required fields before publishing your
                  assignment.
                </p>
              </section>
            </aside>
          </div>
        </form >
      </div >
    </div >
  );
}

/* ================================================================
   SECTION HEADER
================================================================ */

function SectionHeader({
  icon,
  iconClass,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-slate-100 px-5 py-4.5 sm:px-6">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>

          <p className="mt-0.5 text-[10px] font-medium leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FIELD LABEL
================================================================ */

function FieldLabel({
  htmlFor,
  label,
  required = false,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-bold text-slate-700"
    >
      {label}

      {required && <span className="ml-1 text-rose-500">*</span>}
    </label>
  );
}

/* ================================================================
   ERROR MESSAGE
================================================================ */

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-[10px] font-semibold text-rose-500">{children}</p>
  );
}

/* ================================================================
   SUMMARY ROW
================================================================ */

function SummaryRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold text-slate-400">{label}</p>

        <p className="mt-0.5 truncate text-xs font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   COMPLETION CALCULATION
================================================================ */

function getCompletionPercentage({
  title,
  subject,
  className,
  description,
  dueDate,
  totalMarks,
}: {
  title: string;
  subject: string;
  className: string;
  description: string;
  dueDate: string;
  totalMarks: string;
}) {
  const fields = [
    title.trim(),
    subject,
    className,
    description.trim(),
    dueDate,
    totalMarks,
  ];

  const completed = fields.filter(Boolean).length;

  return Math.round((completed / fields.length) * 100);
}
