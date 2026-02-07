import React, { useState, useEffect } from "react";

export default function Ten() {
  const [firstWord, setFirstWord] = useState(null);
  const [secondWord, setSecondWord] = useState(null);
  const [sentence, setSentence] = useState("___ is the capital of ___.");

  // Function that generates "Delhi" after random delay
  const generateDelhi = () => {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        resolve("Delhi");
      }, delay);
    });
  };

  // Function that generates "India" after random delay
  const generateIndia = () => {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        resolve("India");
      }, delay);
    });
  };

  useEffect(() => {
    const buildSentence = async () => {
      setFirstWord(null);
      setSecondWord(null);
      setSentence("___ is the capital of ___.");

      // Run both functions simultaneously
      const promises = [generateDelhi(), generateIndia()];

      // Use Promise.race to get the first one
      const firstValue = await Promise.race(promises);
      setFirstWord(firstValue);
      setSentence(`${firstValue} is the capital of ___.`);

      // Wait for the remaining one
      const allValues = await Promise.all(promises);
      const secondValue =
        allValues.find((val) => val !== firstValue) || allValues[1];
      setSecondWord(secondValue);

      // Complete the sentence
      setSentence(`${firstValue} is the capital of ${secondValue}.`);
    };

    buildSentence();
  }, []);

  const handleRestart = () => {
    setFirstWord(null);
    setSecondWord(null);
    setSentence("___ is the capital of ___.");

    const buildSentence = async () => {
      const promises = [generateDelhi(), generateIndia()];

      const firstValue = await Promise.race(promises);
      setFirstWord(firstValue);
      setSentence(`${firstValue} is the capital of ___.`);

      const allValues = await Promise.all(promises);
      const secondValue =
        allValues.find((val) => val !== firstValue) || allValues[1];
      setSecondWord(secondValue);

      setSentence(`${firstValue} is the capital of ${secondValue}.`);
    };

    buildSentence();
  };

  return (
    <div className="component">
      <h2>Async Sentence Builder</h2>

      <div style={{ marginBottom: "20px" }}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {sentence}
        </p>

        {firstWord !== null && (
          <p>
            <strong>First word received:</strong> {firstWord}
          </p>
        )}
        {secondWord !== null && (
          <p>
            <strong>Second word received:</strong> {secondWord}
          </p>
        )}
      </div>

      <button
        onClick={handleRestart}
        style={{
          padding: "10px 20px",
          borderRadius: "4px",
          border: "2px solid #000",
          backgroundColor: "#fff",
          cursor: "pointer",
          color: "#000000",
        }}
      >
        Run Again
      </button>
    </div>
  );
}
