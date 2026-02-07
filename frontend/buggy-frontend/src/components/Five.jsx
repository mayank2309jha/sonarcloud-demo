import React, { useState } from "react";

export default function Five() {
  const [error, setError] = useState(null);

  const callApi = async (endpoint) => {
    try {
      const res = await fetch(`http://localhost:5001${endpoint}`);
      const data = await res.json();

      // ❌ BUG: assumes all errors come in `error` field
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setError(null);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="component">
      <h2>Inconsistent Error Formats</h2>

      <button onClick={() => callApi("/api/error-a")}>Trigger Error A</button>

      <button onClick={() => callApi("/api/error-b")}>Trigger Error B</button>

      <button onClick={() => callApi("/api/error-c")}>Trigger Error C</button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>Error: {error}</p>
      )}
    </div>
  );
}
