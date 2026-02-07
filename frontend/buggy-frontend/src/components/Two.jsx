import React, { useState, useEffect } from "react";

const Two = () => {
  const [meowFacts, setMeowFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeowFacts = async () => {
      setLoading(true);

      // ❌ BUG 1: No try/catch → promise rejection not handled
      // ❌ BUG 2: No response.ok check
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const data = await response.json();

      // ❌ BUG 3: Assumes data.data always exists and is non-empty
      setMeowFacts(data.data);

      setLoading(false);
    };

    fetchMeowFacts();
  }, []);

  if (loading) return <div className="component">Loading meow facts...</div>;

  return (
    <div className="component">
      <h2>Random Meow Facts</h2>

      <ul>
        {meowFacts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>

      <button onClick={() => window.location.reload()}>Get New Facts</button>
    </div>
  );
};

export default Two;
