import { useEffect, useState } from "react";

function DetailPage() {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    // Simulated data (replace with API later)
    setRecord({
      id: 1,
      title: "Sample Record",
      description: "This is a sample compliance record",
      status: "OPEN",
      priority: "MEDIUM",
      score: 75,
    });
  }, []);

  const handleEdit = () => {
    // Navigate to form page with id
    window.location.href = `/form?id=${record.id}`;
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmDelete) {
      // Simulate delete
      alert("Record deleted successfully");

      // Redirect to list page
      window.location.href = "/";
    }
  };

  if (!record) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Detail</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">{record.title}</h2>

        <p className="mb-2 text-gray-600">{record.description}</p>

        <p className="mb-1">Status: {record.status}</p>
        <p className="mb-1">Priority: {record.priority}</p>

        <div className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded">
          Score: {record.score}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;