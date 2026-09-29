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
app.use(cors()); //Cross Origin Resouce Sharing
app.use(express.json());

// Test route
// app.get("/", (req, res) => {
//   res.json({
//     message: "VINEEV EDU Teacher Backend is running!",
//   });
// });

// Database test route
// This checks whether our backend can successfully communicate with PostgreSQL
// app.get("/db-test", async (req, res) => {
//   try {
//     // Send a simple query to PostgreSQL
//     const result = await pool.query("SELECT NOW()");

//     // If PostgreSQL responds, send the result back to the browser
//     res.json({
//       message: "Database connection successful!",
//       databaseTime: result.rows[0].now,
//     });
//   } catch (error) {
//     // If something goes wrong, show the error in the terminal
//     console.error("Database connection failed:", error);

//     // Send an error response to the browser
//     res.status(500).json({
//       message: "Database connection failed",
//     });
//   }
// });

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

// Get all classes
// This route reads class data from PostgreSQL
app.get("/api/classes", async (req, res) => {
    try {
        // Get all classes from the database
        const result = await pool.query(`
      SELECT
        c.id,
        c.name,
        c.code,
        c.room,
        c.capacity,
        c.schedule,
        c.class_time,
        c.status,
        c.created_at,

-- Count students assigned to each class
        COUNT(s.id)::INTEGER AS student_count

        FROM public.classes AS C

-- Connect each student to their class
      LEFT JOIN public.students AS s
        ON s.class_id = c.id

-- Group the students by their class
        
        GROUP BY
        c.id,
        c.name,
        c.code,
        c.room,
        c.capacity,
        c.schedule,
        c.class_time,
        c.status,
        c.created_at

      ORDER BY c.id;
    `);

        // Send the database rows to the frontend as JSON
        res.json(result.rows);
    } catch (error) {
        // Show the actual error in the backend terminal
        console.error("Failed to fetch classes:", error);

        // Send a safe error message to the frontend
        res.status(500).json({
            message: "Failed to fetch classes",
        });
    }
});

// Get one class by ID, including its students
app.get("/api/classes/:id", async (req, res) => {
    try {
        // Get the class ID from the URL
        // Example: /api/classes/1 → classId = "1"
        const classId = req.params.id;

        // First, get the class information
        const classResult = await pool.query(
            `
        SELECT
          id,
          name,
          code,
          room,
          capacity,
          schedule,
          class_time,
          status,
          created_at
        FROM public.classes
        WHERE id = $1
      `,
            [classId],
        );

        // If the class does not exist, return 404
        if (classResult.rows.length === 0) {
            return res.status(404).json({
                message: "Class not found",
            });
        }

        // Now get all students belonging to this class
        // students.class_id must match the class ID
        const studentsResult = await pool.query(
            `
        SELECT
          id,
          first_name,
          last_name,
          email,
          roll_no,
          status
        FROM public.students
        WHERE class_id = $1
        ORDER BY id ASC
      `,
            [classId],
        );

        // 3. Get subjects belonging to this class
        //
        // class_subjects connects classes and subjects.
        // --------------------------------------------------
        const subjectsResult = await pool.query(
            `
        SELECT
          s.id,
          s.name,
          s.code
        FROM public.class_subjects AS cs
        JOIN public.subjects AS s
          ON s.id = cs.subject_id
        WHERE cs.class_id = $1
        ORDER BY s.id ASC
      `,
            [classId],
        );

        // 4. Send class + students + subjects to frontend
        // --------------------------------------------------
        res.json({
            ...classResult.rows[0],
            students: studentsResult.rows,
            subjects: subjectsResult.rows,
        });
    } catch (error) {
        console.error("Failed to fetch class:", error);

        res.status(500).json({
            message: "Failed to fetch class",
        });
    }
});

// Save attendance for a class
app.post("/api/attendance", async (req, res) => {
    try {
        // Get attendance data sent by the frontend
        const { classId, subjectId, date, students } = req.body;

        // Basic validation
        if (!classId || !subjectId || !date || !Array.isArray(students)) {
            return res.status(400).json({
                message: "classId,, subjectId, date and students are required",
            });
        }

        // Save each student's attendance and reason.
        for (const student of students) {
            await pool.query(
                `
      INSERT INTO public.attendance (
        student_id,
        class_id,
        subject_id,
        attendance_date,
        status,
        reason
      )
      VALUES ($1, $2, $3, $4, $5, $6)

      ON CONFLICT (
        student_id,
        class_id,
        subject_id,
        attendance_date
      )
      DO UPDATE SET
        status = EXCLUDED.status,
        reason = EXCLUDED.reason
    `,
                [
                    student.studentId,
                    classId,
                    subjectId,
                    date,
                    student.status,
                    student.reason,
                ],
            );
        }

        res.json({
            message: "Attendance saved successfully",
        });
    } catch (error) {
        console.error("Failed to save attendance:", error);

        res.status(500).json({
            message: "Failed to save attendance",
        });
    }
});

// Get saved attendance for a specific class, subject and date
app.get("/api/attendance", async (req, res) => {
    try {
        // Get the selected class, subject and date from the frontend.
        const { classId, subjectId, date } = req.query;

        // Make sure all required values were provided.
        if (!classId || !subjectId || !date) {
            return res.status(400).json({
                message: "classId, subjectId and date are required",
            });
        }

        // Get attendance only for this class + subject + date.
        const result = await pool.query(
            `
        SELECT
          a.id,
          a.student_id,
          a.class_id,
          a.subject_id,
          a.attendance_date,
          a.status,
          a.reason
        FROM public.attendance AS a
        WHERE a.class_id = $1
          AND a.subject_id = $2
          AND a.attendance_date = $3
        ORDER BY a.student_id ASC
      `,
            [classId, subjectId, date],
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch attendance:", error);

        res.status(500).json({
            message: "Failed to fetch attendance",
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});