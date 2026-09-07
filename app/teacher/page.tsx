import {
  BookOpen,
  Users,
  ClipboardCheck,
  ClipboardList,
} from "lucide-react";

import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatCard from "@/components/dashboard/StatCard";

export default function TeacherDashboard() {
  return (
    <div>

      {/* Welcome */}
      <WelcomeSection />

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="My Classes"
          value="06"
          description="Currently assigned"
          icon={BookOpen}
        />

        <StatCard
          title="Total Students"
          value="142"
          description="Across all classes"
          icon={Users}
        />

        <StatCard
          title="Attendance"
          value="92%"
          description="Average attendance"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Pending Tasks"
          value="08"
          description="Assignments to review"
          icon={ClipboardList}
        />

      </div>

    </div>
  );
}