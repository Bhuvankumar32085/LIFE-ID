import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { region: "North", male: 120, female: 110, children: 50 },
  { region: "South", male: 100, female: 105, children: 60 },
  { region: "East", male: 90, female: 95, children: 40 },
  { region: "West", male: 110, female: 100, children: 55 },
];

export default function StatsChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Population Stats</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="male" fill="#3b82f6" />
          <Bar dataKey="female" fill="#ef4444" />
          <Bar dataKey="children" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
