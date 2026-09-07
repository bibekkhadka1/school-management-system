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
    <div className="p-6">

      {/* Header + Quick Actions */}
      <DashboardHeader />

      {/* KPI Cards */}
      <StatCards />

      {/* Today's Classes + Today's Attendance */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        <TodaysClasses />

        <TodaysAttendance />

      </div>

      {/* Pending Tasks + Attendance Graph */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        <PendingTasks />

        <div className="xl:col-span-2">
          <AttendanceOverview />
        </div>

      </div>

      {/* Assignments + Exams */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        <AssignmentsOverview />

        <ExamsResults />

      </div>

      {/* Messages + Notices */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        <RecentMessages />

        <ImportantNotices />

      </div>

    </div>
  );
}