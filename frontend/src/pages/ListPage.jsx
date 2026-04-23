import { useEffect, useState } from "react";
import API from "../services/api";

function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = () => {
    setLoading(true);
    setError(false);

    let url = "";

    if (search) {
      url = `/search?q=${search}`;
    } else {
      url = `/all?page=${page}&size=${size}`;
    }

    API.get(url)
      .then((res) => {
        // handle both paginated and normal response
        if (res.data.content) {
          setData(res.data.content);
        } else {
          setData(res.data);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    API.delete(`/delete/${id}`)
      .then(() => fetchData())
      .catch(() => alert("Delete failed"));
  };

  // 🔄 Loading
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ❌ Error (backend not ready)
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
      <h2 className="text-xl font-bold mb-4">Compliance Records</h2>

      {/* 🔍 Search */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        className="border p-2 mb-4 w-full"
      />

      {/* 📋 Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border">{item.priority}</td>
              <td className="p-2 border space-x-2">
                
                {/* ✏️ Edit */}
                <button
                  onClick={() =>
                    (window.location.href = `/form?id=${item.id}`)
                  }
                  className="bg-yellow-400 px-2 py-1"
                >
                  Edit
                </button>

                {/* 🗑 Delete */}
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

      {/* 📄 Pagination */}
      {!search && (
        <div className="mt-4 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="px-3 py-1 bg-gray-300"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ListPage;