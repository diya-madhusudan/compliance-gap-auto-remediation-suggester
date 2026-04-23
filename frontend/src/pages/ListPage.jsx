import { useEffect, useState } from "react";
import API from "../services/api";

function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/compliance") 
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load compliance records");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔄 Loading
  if (loading) {
    return <p className="text-center mt-10">Loading compliance records...</p>;
  }

  // ❌ Error
  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  // 📭 Empty
  if (data.length === 0) {
    return <p className="text-center mt-10">No compliance gaps found</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Compliance Gap Records
      </h2>

      <table className="w-full border border-gray-300 shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Remediation</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={
                item.status === "OPEN"
                  ? "bg-red-100"
                  : item.status === "RESOLVED"
                  ? "bg-green-100"
                  : ""
              }
            >
              <td className="p-2 border">{item.id}</td>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">{item.description}</td>
              <td className="p-2 border font-medium">{item.status}</td>
              <td className="p-2 border">{item.priority}</td>
              <td className="p-2 border">{item.remediation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;