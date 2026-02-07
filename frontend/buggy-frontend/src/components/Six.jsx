import React, { useEffect, useState } from "react";

export default function Six() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/profile")
      .then((res) => res.json())
      .then((data) => {
        // ❌ Tight coupling: frontend assumes exact backend shape
        setProfile({
          name: data.fullName,
          age: data.years,
        });
      });
  }, []);

  return (
    <div className="component">
      <h2>User Profile</h2>

      {profile ? (
        <>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
