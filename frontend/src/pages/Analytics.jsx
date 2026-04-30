import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [period, setPeriod] = useState("week");

  // 🔁 Mock data (replace later with API)
  const dataMap = {
    day: [
      { name: "Mon", value: 2 },
      { name: "Tue", value: 4 },
      { name: "Wed", value: 3 },
    ],
    week: [
      { name: "Week 1", value: 10 },
      { name: "Week 2", value: 15 },
      { name: "Week 3", value: 12 },
    ],
    month: [
      { name: "Jan", value: 40 },
      { name: "Feb", value: 30 },
      { name: "Mar", value: 50 },
    ],
  };

  const data = dataMap[period];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      {/* Period Selector */}
      <div className="mb-4">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border p-2"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;