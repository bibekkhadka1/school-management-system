import DashboardHeader from "@/components/teacher-dashboard/DashboardHeader";
import StatCards from "@/components/teacher-dashboard/StatCards";
import TodaysClasses from "@/components/teacher-dashboard/TodaysClasses";
import TodaysAttendance from "@/components/teacher-dashboard/TodaysAttendance";
import PendingTasks from "@/components/teacher-dashboard/PendingTasks";
import AttendanceOverview from "@/components/teacher-dashboard/AttendanceOverview";
import AssignmentsOverview from "@/components/teacher-dashboard/AssignmentsOverview";
import ExamsResults from "@/components/teacher-dashboard/ExamsResults";
import RecentMessages from "@/components/teacher-dashboard/RecentMessages";
import ImportantNotices from "@/components/teacher-dashboard/ImportantNotices";

export default function TeacherDashboard() {
  return (
    <main className="min-h-full bg-gray-50/60 font-sans antialiased">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <section className="mb-7">
          <DashboardHeader />
        </section>

        {/* KPI Cards */}
        <section className="mb-7">
          <StatCards />
        </section>

        {/* Today's Classes + Today's Attendance */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <TodaysClasses />
          <TodaysAttendance />
        </section>

        {/* Pending Tasks + Attendance Overview */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="min-w-0">
            <PendingTasks />
          </div>

          <div className="min-w-0 xl:col-span-2">
            <AttendanceOverview />
          </div>
        </section>

        {/* Assignments + Exams */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <AssignmentsOverview />
          <ExamsResults />
        </section>

        {/* Messages + Notices */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <RecentMessages />
          <ImportantNotices />
        </section>

      </div>
    </main>
  );
}