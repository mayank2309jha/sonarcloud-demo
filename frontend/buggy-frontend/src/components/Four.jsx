import React, { useEffect, useState } from "react";

export default function Four() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ❌ BUG: assuming backend always succeeds
    fetch("http://localhost:5001/api/user")
      .then((res) => {
        // ❌ BUG: no response.ok check
        return res.json();
      })
      .then((data) => {
        // ❌ BUG: blindly trusting backend response shape
        setUser(data);
      })
      // ❌ BUG: no error handling
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="component">Loading user…</div>;
  }

  return (
    <div className="component">
      <h2>User Information</h2>

      {/* Defensive rendering to avoid total crash */}
      {user ? (
        <>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
