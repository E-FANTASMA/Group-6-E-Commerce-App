import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { salesChartData } from "../../data/dashboardData";

const formatNaira = (value: number) => {
  if (value >= 1000) return `₦${(value / 1000).toFixed(0)}k`;
  return `₦${value}`;
};

export default function SalesOverviewChart() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1a2e1a", margin: 0 }}>
          Sales Overview
        </h2>
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#6b7280" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "12px", height: "2px", background: "#4caf43", display: "inline-block", borderRadius: "2px" }} />
            This Week
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "12px", height: "2px", background: "#d1d5db", display: "inline-block", borderRadius: "2px" }} />
            Last Week
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={salesChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatNaira}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip
            formatter={(value: any) => [formatNaira(value)]}
            contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0", fontSize: "13px" }}
          />
          <Line
            type="monotone"
            dataKey="thisWeek"
            name="This Week"
            stroke="#4caf43"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#4caf43", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="lastWeek"
            name="Last Week"
            stroke="#d1d5db"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}