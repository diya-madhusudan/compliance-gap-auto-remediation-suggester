import { useEffect, useState } from "react";

function ListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { id: 1, title: "Record 1", status: "OPEN" },
      { id: 2, title: "Record 2", status: "CLOSED" },
    ]);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center border-t">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;