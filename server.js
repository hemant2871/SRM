const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB Connection (Compass)
mongoose.connect("mongodb://127.0.0.1:27017/nosql")
  .then(() => console.log("✅ MongoDB Connected to 'nosql' database"))
  .catch(err => console.log(err));

// Schema + Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String
});
const Student = mongoose.model("Student", studentSchema);

// Routes
app.post("/api/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Student added successfully!" });
});

app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.put("/api/students/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Student updated!" });
});

app.delete("/api/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted!" });
});

app.listen(5000, () => console.log(`🚀 Server running at http://localhost:5000`));
