function FormPage() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Form</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2" placeholder="Title" />
        <input className="border p-2" placeholder="Status" />
        <input className="border p-2" placeholder="Priority" />
        <input className="border p-2" placeholder="Score" />
      </div>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}

export default FormPage;