import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const stats = {
    total: 24,
    open: 10,
    closed: 9,
    high: 5,
  };

  const chartData = [
    { name: "Open", value: stats.open },
    { name: "Closed", value: stats.closed },
    { name: "High", value: stats.high },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded">Total<br />{stats.total}</div>
        <div className="bg-green-100 p-4 rounded">Open<br />{stats.open}</div>
        <div className="bg-yellow-100 p-4 rounded">Closed<br />{stats.closed}</div>
        <div className="bg-red-100 p-4 rounded">High<br />{stats.high}</div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;