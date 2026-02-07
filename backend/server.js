const express = require("express");
const cors = require("cors");

const app = express();

// ✅ SIMPLE DEV CORS
app.use(cors());

app.use(express.json());

app.get("/api/user", (req, res) => {
  res.json({
    name: "Mayank",
    age: 23,
  });
});

//Code to simulate failure for testing error handling in frontend in Component Four.
// app.get("/api/user", (req, res) => {
//   res.status(500).json({ error: "Database down" });
// });

app.listen(5001, () => {
  console.log("Backend running on port 5001");
});

// ❌ Inconsistent error formats (INTENTIONAL BUG)

// Error format A
app.get("/api/error-a", (req, res) => {
  res.status(400).json({
    error: "Invalid request parameters",
  });
});

// Error format B
app.get("/api/error-b", (req, res) => {
  res.status(401).json({
    message: "Unauthorized access",
  });
});

// Error format C
app.get("/api/error-c", (req, res) => {
  res.status(500).json({
    status: "error",
    reason: "Internal server failure",
  });
});

// ❌ Tight coupling demo endpoint
app.get("/api/profile", (req, res) => {
  res.json({
    id: 1,
    fullName: "Mayank Jha",
    years: 23,
  });
});
