const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: false },
  position: { type: String, required: false },
  experience: { type: String, required: false },
  // fromDate: { type: Date, required: false },
  // toDate: { type: Date, required: false },
});

const educationSchema = new mongoose.Schema({
  institute: { type: String, required: false },
  qualification: { type: String, required: false },
  yearOfPassing: { type: Number, required: false },
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: false },
  proficiency: { type: String, required: false },
});

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  number: { type: String, required: false },
  DOB: { type: Date, required: false },
  gender: { type: String, required: false },
  religion: { type: String, required: false },
  nationality: { type: String, required: false },
  maritalStatus: { type: String, required: false },
  hobbies: { type: [String], required: false },
  language: { type: [String], required: false },
  address: { type: String, required: false },
  experiences: { type: [experienceSchema], required: false },
  education: { type: [educationSchema], required: false },
  skills: { type: [skillSchema], required: false },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
