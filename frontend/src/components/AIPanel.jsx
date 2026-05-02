import { useState } from "react";

function AIPanel({ record }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateSuggestion = () => {
    setLoading(true);

    setTimeout(() => {
      let recommendation = "";
      let severity = "";
      let actions = [];
      let risk = "";
      let confidence = 0;

      // 🔥 Severity from priority
      if (record.priority === "HIGH") severity = "Critical";
      else if (record.priority === "MEDIUM") severity = "Moderate";
      else severity = "Low";

      // 🔥 Risk from score
      if (record.score >= 70) risk = "High Risk";
      else if (record.score >= 40) risk = "Medium Risk";
      else risk = "Low Risk";

      // 🔥 Smart logic (title + status)
      const title = record.title.toLowerCase();

      if (title.includes("password")) {
        recommendation =
          "Weak password policy detected. Enforce strong authentication mechanisms.";
        actions = [
          "Use minimum 8–12 characters",
          "Add uppercase, lowercase, numbers, symbols",
          "Enable password expiry",
          "Implement MFA",
        ];
        confidence = 92;
      } else if (title.includes("access")) {
        recommendation =
          "Access control gap detected. Apply least privilege and role-based access.";
        actions = [
          "Implement RBAC",
          "Audit user permissions",
          "Restrict admin access",
          "Enable MFA",
        ];
        confidence = 90;
      } else if (title.includes("data")) {
        recommendation =
          "Sensitive data exposure risk detected. Strengthen encryption and storage policies.";
        actions = [
          "Encrypt data at rest",
          "Encrypt data in transit",
          "Restrict data access",
          "Enable logging",
        ];
        confidence = 88;
      } else if (
        record.priority === "HIGH" &&
        record.status !== "CLOSED"
      ) {
        recommendation =
          "High priority compliance gap is unresolved. Immediate remediation required.";
        actions = [
          "Assign issue immediately",
          "Apply corrective controls",
          "Conduct risk assessment",
          "Track remediation timeline",
        ];
        confidence = 85;
      } else {
        recommendation =
          "General compliance gap detected. Apply standard governance and security practices.";
        actions = [
          "Review compliance framework",
          "Implement best practices",
          "Document policies",
          "Monitor regularly",
        ];
        confidence = 75;
      }

      setResult({
        recommendation,
        severity,
        actions,
        risk,
        confidence,
      });

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        🤖 AI Gap Remediation Suggester
      </h2>

      <button
        onClick={generateSuggestion}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Generate AI Suggestion
      </button>

      {loading && (
        <p className="mt-3 text-gray-500">Analyzing gap data...</p>
      )}

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          {/* 🔥 Risk + Severity */}
          <div className="flex justify-between mb-2">
            <p>
              <strong>Severity:</strong> {result.severity}
            </p>
            <p>
              <strong>Risk:</strong>{" "}
              <span
                className={
                  result.risk === "High Risk"
                    ? "text-red-600"
                    : result.risk === "Medium Risk"
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {result.risk}
              </span>
            </p>
          </div>

          {/* 🔥 Recommendation */}
          <p className="mt-2">
            <strong>Recommendation:</strong>{" "}
            {result.recommendation}
          </p>

          {/* 🔥 Actions */}
          <ul className="mt-2 list-disc pl-5">
            {result.actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

          {/* 🔥 Confidence */}
          <div className="mt-3">
            <p>
              <strong>AI Confidence:</strong> {result.confidence}%
            </p>

            <div className="w-full bg-gray-300 h-2 rounded mt-1">
              <div
                className="bg-indigo-600 h-2 rounded"
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIPanel;