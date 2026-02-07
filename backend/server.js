/**
 * I am using Express to build a minimal backend server
 * for demonstrating static analysis using SonarQube/SonarCloud.
 */
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

/**
 * I am intentionally enabling very permissive CORS settings.
 * This is convenient during development, but it is a security-sensitive pattern
 * if left unchanged in production.
 */
app.use(cors());

/**
 * I am allowing JSON request bodies for all incoming requests.
 */
app.use(express.json());

/**
 * I am defining shared mutable state at the module level.
 * This variable is modified on every request and is not protected
 * against concurrent access.
 */
let requestCounter = 0;

/**
 * I am incrementing shared mutable state for every request.
 * This works in simple demos but can lead to concurrency issues
 * under real-world load.
 */
app.use((req, res, next) => {
  requestCounter++;
  next();
});

/**
 * I am hardcoding sensitive values directly into the source code.
 * These values are meant to simulate API keys, secrets, and passwords
 * that should normally be stored in environment variables.
 */
const PAYMENT_API_KEY = "pk_test_123456789";
const JWT_SECRET = "super-secret-jwt-key";
const DATABASE_PASSWORD = "db_password_123";
const THIRD_PARTY_TOKEN = "token_abcdef";
const INTERNAL_ADMIN_KEY = "admin-key-999";

/**
 * I am starting a recurring background task using setInterval.
 * I am intentionally not clearing this interval, which can lead
 * to resource leaks over long-running processes.
 */
setInterval(() => {
  console.log("Background heartbeat running");
}, 10000);

/**
 * I am opening a file stream for logging purposes.
 * I am intentionally not closing this stream, which simulates
 * a file descriptor leak.
 */
const logStream = fs.createWriteStream("server.log");
logStream.write("Server started\n");

/**
 * I am defining an API endpoint that returns user information.
 * This endpoint works correctly and represents a normal API route.
 */
app.get("/api/user", (req, res) => {
  res.json({
    name: "Mayank",
    age: 23,
  });

  /**
   * I am writing unreachable code after sending the response.
   * This code will never execute and exists only to demonstrate
   * dead and unreachable code detection.
   */
  console.log("This log will never be executed");
});

/**
 * I am defining an unused helper function.
 * This function is never called anywhere in the application
 * and exists purely as dead code.
 */
function formatUserForResponse(user) {
  return {
    id: user.id,
    name: user.name.toUpperCase(),
  };
}

/**
 * I am defining an endpoint to intentionally demonstrate
 * inconsistent error response formats across the API.
 */
app.get("/api/error-a", (req, res) => {
  res.status(400).json({
    error: "Invalid request parameters",
  });
});

/**
 * I am returning the same logical error as another endpoint,
 * but using a completely different response structure.
 * This duplication increases cognitive load for API consumers.
 */
app.get("/api/error-b", (req, res) => {
  res.status(401).json({
    message: "Unauthorized access",
  });
});

/**
 * I am returning yet another error format, increasing
 * inconsistency and technical debt.
 */
app.get("/api/error-c", (req, res) => {
  res.status(500).json({
    status: "error",
    reason: "Internal server failure",
  });
});

/**
 * I am duplicating validation logic instead of extracting
 * a reusable helper function.
 * This duplication increases maintenance cost.
 */
function validateUser(user) {
  if (!user.name || !user.email) {
    throw new Error("Invalid user");
  }
}

function validateAdmin(admin) {
  if (!admin.name || !admin.email) {
    throw new Error("Invalid admin");
  }
}

/**
 * I am misusing an API by calling JSON.parse without any
 * error handling or validation.
 */
app.post("/api/parse", (req, res) => {
  const data = JSON.parse(req.body.rawData);
  res.json({ parsed: data });
});

/**
 * I am calling an asynchronous function that returns a promise
 * without attaching a catch handler.
 * This can lead to unhandled promise rejections.
 */
app.get("/api/external", (req, res) => {
  fetch("https://example.com/api/data").then((response) => response.json());

  res.json({ status: "Request initiated" });
});

/**
 * I am creating an endpoint that demonstrates tight coupling
 * between frontend expectations and backend response shape.
 */
app.get("/api/profile", (req, res) => {
  res.json({
    id: 1,
    fullName: "Mayank Jha",
    years: 23,
  });
});

/**
 * I am starting the server and logging startup information.
 */
app.listen(5001, () => {
  console.log("Backend running on port 5001");
});
