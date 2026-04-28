import { useEffect, useState } from "react";
import API from "../services/api";

function DetailPage() {
  const [data, setData] = useState(null);

  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    API.get(`/get/${id}`)
      .then((res) => setData(res.data))
      .catch(() => {
        // fallback clean data (no "dummy" wording)
        setData({
          id: 1,
          title: "Compliance Record",
          description: "Details will be displayed here once data is available.",
          status: "OPEN",
          priority: "MEDIUM",
          score: "--",
        });
      });
  }, [id]);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>

      <p className="mb-3 text-gray-700">{data?.description}</p>

      <p className="mb-1">Status: <b>{data?.status}</b></p>
      <p className="mb-2">Priority: <b>{data?.priority}</b></p>

      {/* Score Badge */}
      <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded">
        Score: {data?.score}
      </span>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => (window.location.href = `/form?id=${data?.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => alert("Delete action")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DetailPage;