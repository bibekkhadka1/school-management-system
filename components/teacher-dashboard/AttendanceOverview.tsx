"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", attendance: 82 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 76 },
  { day: "Thu", attendance: 84 },
  { day: "Fri", attendance: 91 },
  { day: "Sat", attendance: 79 },
  { day: "Sun", attendance: 89 },
];

export default function AttendanceOverview() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Attendance Overview
          </h2>

          <p className="mt-1 text-[10px] text-gray-400">
            Average attendance for the week
          </p>
        </div>

        <select className="rounded-md border px-2 py-1 text-[10px] text-gray-500 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Semester</option>
        </select>

      </div>

      <div className="h-64 w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[50, 100]}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="attendance"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}