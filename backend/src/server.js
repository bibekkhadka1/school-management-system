require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

const pool = new Pool({  // Pool is connection manager between backend and PostgreSQL
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "VINEEV EDU Teacher Backend is running!",
  });
});

// Database test route
// This checks whether our backend can successfully communicate with PostgreSQL
app.get("/db-test", async (req, res) => {
  try {
    // Send a simple query to PostgreSQL
    const result = await pool.query("SELECT NOW()");

    // If PostgreSQL responds, send the result back to the browser
    res.json({
      message: "Database connection successful!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    // If something goes wrong, show the error in the terminal
    console.error("Database connection failed:", error);

    // Send an error response to the browser
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Get all teachers from the database
// This route reads real teacher records from PostgreSQL
app.get("/api/teachers", async (req, res) => {
  try {
    // Ask PostgreSQL to return all teachers
    const result = await pool.query(`
      SELECT *
      FROM public.teachers
      ORDER BY id ASC
    `);

    // Send the database records back as JSON
    res.json(result.rows);
  } catch (error) {
    // Print the database error in the backend terminal
    console.error("Failed to fetch teachers:", error);

    // Send an error response to the client
    res.status(500).json({
      message: "Failed to fetch teachers",
    });
  }
});

// Get all students from the database
// This route reads the real student records from PostgreSQL
app.get("/api/students", async (req, res) => {
  try {
    // Ask PostgreSQL to return all students
    const result = await pool.query(`
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        roll_no,
        status,
        location,
        created_at
      FROM public.students
      ORDER BY id ASC
    `);

    // Send the database records back to the frontend as JSON
    res.json(result.rows);
  } catch (error) {
    // Show the actual error in the backend terminal
    console.error("Failed to fetch students:", error);

    // Send an error response to the frontend
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});
// Get one student by ID
// The :id part comes from the URL.
// Example: /api/students/2
app.get("/api/students/:id", async (req, res) => {
  try {
    // Get the student ID from the URL
    // For /api/students/2, req.params.id will be "2"
    const studentId = req.params.id;

    // Ask PostgreSQL for the student with this ID
    const result = await pool.query(
      `
        SELECT
          id,
          first_name,
          last_name,
          email,
          phone,
          roll_no,
          status,
          location,
          created_at
        FROM public.students
        WHERE id = $1
      `,
      [studentId],
    );

    // If no student was found with this ID,
    // send a 404 response.
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Send the student's database record
    // back to the frontend as JSON.
    res.json(result.rows[0]);
  } catch (error) {
    // Print the actual error in the backend terminal
    console.error("Failed to fetch student:", error);

    // Send an error response to the frontend
    res.status(500).json({
      message: "Failed to fetch student",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});