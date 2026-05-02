import { useState } from "react";

function AIPanel({ record }) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const generateSuggestion = () => {
    setLoading(true);

    setTimeout(() => {
      let result = "";

      if (record.title.toLowerCase().includes("password")) {
        result =
          "Enforce strong password policy: minimum 8 characters, include uppercase, lowercase, numbers, and special symbols. Enable password rotation every 90 days.";
      } else if (record.title.toLowerCase().includes("data")) {
        result =
          "Implement data encryption at rest and in transit. Restrict access using role-based controls and maintain audit logs.";
      } else if (record.title.toLowerCase().includes("access")) {
        result =
          "Apply least privilege access model. Regularly review user permissions and enable multi-factor authentication.";
      } else {
        result =
          "Review compliance controls, apply security best practices, and ensure proper documentation and monitoring mechanisms are in place.";
      }

      setSuggestion(result);
      setLoading(false);
    }, 1000); // simulate API delay
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        AI Remediation Suggestion
      </h2>

      <button
        onClick={generateSuggestion}
        className="bg-indigo-500 text-white px-4 py-2 rounded"
      >
        Generate Suggestion
      </button>

      {loading && (
        <p className="mt-3 text-gray-500">Generating suggestion...</p>
      )}

      {suggestion && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          {suggestion}
        </div>
      )}
    </div>
  );
}

export default AIPanel;