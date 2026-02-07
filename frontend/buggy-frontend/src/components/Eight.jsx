import React, { useState } from "react";

export default function Eight() {
  const [message, setMessage] = useState("No data yet");

  const fetchFast = async () => {
    const res = await fetch("http://localhost:5001/api/user");
    const data = await res.json();

    // Simulate fast response
    setTimeout(() => {
      setMessage(`FAST: ${data.name}`);
    }, 200);
  };

  const fetchSlow = async () => {
    const res = await fetch("http://localhost:5001/api/user");
    const data = await res.json();

    // Simulate slow response
    setTimeout(() => {
      setMessage(`SLOW: ${data.name}`);
    }, 1000);
  };

  const triggerRace = () => {
    fetchSlow();
    fetchFast();
  };

  return (
    <div className="component">
      <h2>Race Condition Demo</h2>

      <button onClick={triggerRace}>Trigger Two Requests</button>

      <p style={{ marginTop: "10px" }}>
        Result: <strong>{message}</strong>
      </p>
    </div>
  );
}
