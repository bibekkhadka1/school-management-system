"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Save,
  Upload,
  X,
} from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{
    assignmentId: string;
  }>;
};

type Assignment = {
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  totalMarks: number;
  submissionType: string;
  status: string;
  description: string;
  instructions: string[];
};

const assignmentData: Record<string, Assignment> = {
  "assignment-1": {
    title: "Database Design Project",
    subject: "DBMS",
    className: "BCA 3A",
    dueDate: "2026-09-08",
    totalMarks: 20,
    submissionType: "PDF / Document",
    status: "Active",
    description:
      "Design and develop a relational database for a real-world application. Apply database design principles, create an appropriate schema, and demonstrate your understanding of tables, relationships, keys, and normalization.",
    instructions: [
      "Design a database for the given application scenario.",
      "Create appropriate tables and define primary and foreign keys.",
      "Apply suitable normalization techniques.",
      "Include an ER diagram or database schema.",
      "Submit the completed work as a PDF or document.",
    ],
  },

  "assignment-2": {
    title: "React Portfolio Website",
    subject: "Web Development",
    className: "BCA 3B",
    dueDate: "2026-09-10",
    totalMarks: 25,
    submissionType: "PDF / Document",
    status: "Active",
    description:
      "Build a responsive personal portfolio website using React. The project should demonstrate component-based development, responsive design, reusable components, and clean user interface implementation.",
    instructions: [
      "Create the portfolio using React.",
      "Use reusable components wherever appropriate.",
      "Include sections such as About, Skills, Projects, and Contact.",
      "Make the website responsive for different screen sizes.",
      "Submit screenshots and the project documentation.",
    ],
  },

  "assignment-3": {
    title: "Machine Learning Basics",
    subject: "Data Science",
    className: "BCA 4A",
    dueDate: "2026-09-12",
    totalMarks: 30,
    submissionType: "PDF / Document",
    status: "Upcoming",
    description:
      "Prepare an assignment explaining the fundamental concepts of machine learning, including supervised learning, unsupervised learning, common algorithms, training data, and model evaluation.",
    instructions: [
      "Explain the basic concepts of machine learning.",
      "Differentiate between supervised and unsupervised learning.",
      "Describe at least three common machine learning algorithms.",
      "Include suitable real-world examples.",
      "Submit the completed assignment before the deadline.",
    ],
  },
};

const defaultAssignment: Assignment = {
  title: "",
  subject: "",
  className: "",
  dueDate: "",
  totalMarks: 0,
  submissionType: "PDF / Document",
  status: "Active",
  description: "",
  instructions: [""],
};

export default function EditAssignmentPage({
  params,
}: PageProps) {
  const router = useRouter();
  const { assignmentId } = use(params);

  const assignment =
    assignmentData[assignmentId] ?? defaultAssignment;

  const [title, setTitle] = useState(assignment.title);
  const [subject, setSubject] = useState(assignment.subject);
  const [className, setClassName] = useState(
    assignment.className,
  );
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [totalMarks, setTotalMarks] = useState(
    String(assignment.totalMarks),
  );
  const [submissionType, setSubmissionType] = useState(
    assignment.submissionType,
  );
  const [status, setStatus] = useState(assignment.status);
  const [description, setDescription] = useState(
    assignment.description,
  );
  const [instructions, setInstructions] = useState(
    assignment.instructions,
  );
  const [attachment, setAttachment] = useState<File | null>(
    null,
  );
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const updateInstruction = (
    index: number,
    value: string,
  ) => {
    setInstructions((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    );
  };

  const addInstruction = () => {
    setInstructions((current) => [...current, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructions((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !subject.trim() ||
      !className.trim() ||
      !dueDate ||
      !totalMarks ||
      !description.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const numericMarks = Number(totalMarks);

    if (
      Number.isNaN(numericMarks) ||
      numericMarks <= 0
    ) {
      setError("Total marks must be greater than zero.");
      return;
    }

    const cleanedInstructions = instructions
      .map((instruction) => instruction.trim())
      .filter(Boolean);

    if (cleanedInstructions.length === 0) {
      setError("Please add at least one instruction.");
      return;
    }

    const updatedAssignment = {
      id: assignmentId,
      title: title.trim(),
      subject: subject.trim(),
      className: className.trim(),
      dueDate,
      totalMarks: numericMarks,
      submissionType,
      status,
      description: description.trim(),
      instructions: cleanedInstructions,
      attachment: attachment?.name ?? null,
    };

    console.log("Updated assignment:", updatedAssignment);

    setError("");
    setSaved(true);

    setTimeout(() => {
      router.push(`/teacher/assignments/${assignmentId}`);
    }, 1200);
  };

  return (
    <div className="min-h-full bg-gray-50/60 p-6 font-sans antialiased lg:p-8">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/teacher/assignments/${assignmentId}`,
                )
              }
              aria-label="Back to assignment"
              className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <ClipboardList size={17} />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Edit Assignment
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                Edit Assignment
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Update the assignment information and instructions.
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-bold ${
              status === "Active"
                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                : "border-indigo-100 bg-indigo-50 text-indigo-700"
            }`}
          >
            {status}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

            {/* Main Form */}

            <div className="space-y-6">

              {/* Basic Information */}

              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-base font-bold text-slate-900">
                    Basic Information
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Update the main details of your assignment.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Assignment Title
                    </label>

                    <input
                      id="title"
                      value={title}
                      onChange={(event) =>
                        setTitle(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Enter assignment title"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      value={subject}
                      onChange={(event) =>
                        setSubject(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="className"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Class
                    </label>

                    <input
                      id="className"
                      value={className}
                      onChange={(event) =>
                        setClassName(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Enter class"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dueDate"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Due Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(event) =>
                          setDueDate(event.target.value)
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="totalMarks"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Total Marks
                    </label>

                    <input
                      id="totalMarks"
                      type="number"
                      min="1"
                      value={totalMarks}
                      onChange={(event) =>
                        setTotalMarks(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Enter total marks"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="submissionType"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Submission Type
                    </label>

                    <select
                      id="submissionType"
                      value={submissionType}
                      onChange={(event) =>
                        setSubmissionType(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option>PDF / Document</option>
                      <option>Text Submission</option>
                      <option>Project File</option>
                      <option>Presentation</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Status
                    </label>

                    <select
                      id="status"
                      value={status}
                      onChange={(event) =>
                        setStatus(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option>Active</option>
                      <option>Upcoming</option>
                      <option>Closed</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Description */}

              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-base font-bold text-slate-900">
                    Assignment Description
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Explain what students need to complete.
                  </p>
                </div>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Write the assignment description..."
                />
              </section>

              {/* Instructions */}

              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Instructions
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Add clear instructions for students.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addInstruction}
                    className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    Add Instruction
                  </button>
                </div>

                <div className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        {index + 1}
                      </span>

                      <input
                        value={instruction}
                        onChange={(event) =>
                          updateInstruction(
                            index,
                            event.target.value,
                          )
                        }
                        className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                        placeholder="Enter instruction"
                      />

                      {instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeInstruction(index)
                          }
                          aria-label="Remove instruction"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}

            <aside className="space-y-6">

              {/* Attachment */}

              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-base font-bold text-slate-900">
                    Attachment
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Replace the assignment reference file.
                  </p>
                </div>

                <label
                  htmlFor="attachment"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Upload size={19} />
                  </div>

                  <p className="mt-3 text-sm font-bold text-slate-700">
                    Upload a new file
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    PDF, DOC, PPT up to 10 MB
                  </p>

                  <input
                    id="attachment"
                    type="file"
                    className="hidden"
                    onChange={(event) =>
                      setAttachment(
                        event.target.files?.[0] ?? null,
                      )
                    }
                  />
                </label>

                {attachment && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <FileText
                      size={18}
                      className="shrink-0 text-indigo-600"
                    />

                    <p className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700">
                      {attachment.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      className="text-slate-400 transition hover:text-rose-600"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </section>

              {/* Summary */}

              <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <ClipboardList size={17} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Assignment Summary
                    </h2>

                    <div className="mt-3 space-y-2 text-xs font-medium text-slate-500">
                      <p>
                        <span className="font-bold text-slate-700">
                          Subject:
                        </span>{" "}
                        {subject || "Not specified"}
                      </p>

                      <p>
                        <span className="font-bold text-slate-700">
                          Class:
                        </span>{" "}
                        {className || "Not specified"}
                      </p>

                      <p>
                        <span className="font-bold text-slate-700">
                          Total Marks:
                        </span>{" "}
                        {totalMarks || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Actions */}

              <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                {error && (
                  <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                    {error}
                  </div>
                )}

                {saved && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={15} />
                    Assignment updated successfully.
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:translate-y-0"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/teacher/assignments/${assignmentId}`,
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Cancel
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
}