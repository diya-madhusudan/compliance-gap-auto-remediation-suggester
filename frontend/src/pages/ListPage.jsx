import { useEffect, useState } from "react";
import API from "../services/api";

function ListPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔁 Debounce search (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔄 Fetch data
  useEffect(() => {
    let url = "/all";

    const params = [];

    if (debouncedSearch) params.push(`q=${debouncedSearch}`);
    if (status) params.push(`status=${status}`);
    if (fromDate) params.push(`from=${fromDate}`);
    if (toDate) params.push(`to=${toDate}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    API.get(url)
      .then((res) => setData(res.data))
      .catch(() => {
        // fallback UI
        setData([
          { id: 1, title: "Compliance A", status: "OPEN", priority: "HIGH" },
          { id: 2, title: "Compliance B", status: "CLOSED", priority: "MEDIUM" },
        ]);
      });
  }, [debouncedSearch, status, fromDate, toDate]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Compliance Records</h2>

      {/* 🔍 FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status Dropdown */}
        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        {/* Date Range */}
        <input
          type="date"
          className="border p-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

      </div>

      {/* 📋 TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border">{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;