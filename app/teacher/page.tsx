import DashboardHeader from "@/components/teacher-dashboard/DashboardHeader";
import StatCards from "@/components/teacher-dashboard/StatCards";
import TodaysClasses from "@/components/teacher-dashboard/TodaysClasses";
import TodaysAttendance from "@/components/teacher-dashboard/TodaysAttendance";
import PendingTasks from "@/components/teacher-dashboard/PendingTasks";
import AttendanceOverview from "@/components/teacher-dashboard/AttendanceOverview";
// import AssignmentsOverview from "@/components/teacher-dashboard/AssignmentsOverview";
// import ExamsResults from "@/components/teacher-dashboard/ExamsResults";
// import RecentMessages from "@/components/teacher-dashboard/RecentMessages";
// import ImportantNotices from "@/components/teacher-dashboard/ImportantNotices";

export default function TeacherDashboard() {
  return (
    <main className="min-h-screen bg-slate-50/70">
      {/* Dashboard Content */}
      <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-6">
          <DashboardHeader />
        </section>

        {/* KPI Statistics */}
        <section className="mb-6">
          <StatCards />
        </section>

        {/* Today's Classes + Attendance */}
        {/* Today's Classes + Today's Attendance */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:items-stretch">
          <TodaysClasses />
          <TodaysAttendance />
        </div>

        {/* Pending Tasks + Attendance Overview */}
        {/* Pending Tasks + Attendance Graph */}
        <div className="mt-5 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-3">
          <div className="h-full">
            <PendingTasks />
          </div>

          <div className="h-full xl:col-span-2">
            <AttendanceOverview />
          </div>
        </div>
        {/* Assignments + Exams */}
        {/* <div className="mt-5 grid grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
          <div className="h-full">
            <AssignmentsOverview />
          </div>

          <div className="h-full">
            <ExamsResults />
          </div>
        </div> */}

        {/* Messages + Notices */}
        {/* <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="min-w-0">
            <RecentMessages />
          </div>

          <div className="min-w-0">
            <ImportantNotices />
          </div>
        </section> */}
      </div>
    </main>
  );
}
