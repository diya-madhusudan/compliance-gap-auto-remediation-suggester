import { useEffect, useState } from "react";
import API from "../services/api";

function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 🔁 Fetch all records
  const fetchData = () => {
    setLoading(true);
    API.get("/all")
      .then((res) => {
        setData(res.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 Search
  const handleSearch = (value) => {
    if (!value) {
      fetchData();
      return;
    }

    API.get(`/search?q=${value}`)
      .then((res) => setData(res.data))
      .catch(() => setError(true));
  };

  // ❌ Delete
  const handleDelete = (id) => {
    API.delete(`/delete/${id}`)
      .then(() => fetchData())
      .catch(() => console.error("Delete failed"));
  };

  // ✏️ Edit → go to form page
  const handleEdit = (item) => {
    localStorage.setItem("editData", JSON.stringify(item));
    window.location.href = "/form";
  };

  // 🔄 Loading
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ❌ Error
  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load compliance records
      </p>
    );
  }

  // 📭 Empty
  if (data.length === 0) {
    return <p className="text-center mt-10">No records found</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">
        Compliance Gap Records
      </h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* ➕ Go to Create Form */}
      <button
        onClick={() => (window.location.href = "/form")}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        + Add Record
      </button>

      {/* 📊 Table */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">{item.description}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border">{item.priority}</td>

              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;