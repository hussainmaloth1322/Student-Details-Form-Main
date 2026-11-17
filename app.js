
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// JSON file to store registered students
const DATA_FILE = path.join(__dirname, "students.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Read registered students
function readStudents() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }

    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Save students
function saveStudents(students) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(students, null, 2)
    );
}

// Register student
app.post("/submit", (req, res) => {
    const { name, email, rollNumber, department } = req.body;

    if (!name || !email || !rollNumber || !department) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    const students = readStudents();

    // Prevent duplicate email and roll number
    const duplicate = students.some(student =>
        student.email.toLowerCase() === email.trim().toLowerCase() ||
        student.rollNumber.toLowerCase() === rollNumber.trim().toLowerCase()
    );

    if (duplicate) {
        return res.status(409).json({
            success: false,
            message: "Email or Roll Number already registered!"
        });
    }

    const newStudent = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        rollNumber: rollNumber.trim(),
        department: department
    };

    students.push(newStudent);
    saveStudents(students);

    res.status(201).json({
        success: true,
        message: "Student registered successfully!"
    });
});

// Display all registered students
app.get("/students", (req, res) => {
    const students = readStudents();
    res.json(students);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
