const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Resume = require("./models/product");

mongoose
  .connect("mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/customer")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("MongoDB connection error");
  });

const createResume = async (req, res, next) => {
  try {
    // Extract data from the request body
    const {
      name,
      email,
      number,
      DOB,
      gender,
      religion,
      nationality,
      maritalStatus,
      hobbies,
      language,
      address,
      experiences,
      education,
      skills,
    } = req.body;

    // Check for missing required fields
    if (
      !name ||
      !email ||
      !number ||
      !DOB ||
      !gender ||
      !nationality ||
      !maritalStatus ||
      !hobbies ||
      !language ||
      !address ||
      !experiences ||
      !education ||
      !skills
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Ensure experiences, education, and skills are arrays
    if (
      !Array.isArray(experiences) ||
      !Array.isArray(education) ||
      !Array.isArray(skills)
    ) {
      return res
        .status(400)
        .json({
          message: "Experiences, education, and skills must be arrays.",
        });
    }

    // Create a new resume instance
    const createdResume = new Resume({
      name,
      email,
      number,
      DOB,
      gender,
      religion, // This is optional, no need to check for its presence
      nationality,
      maritalStatus,
      hobbies,
      language,
      address,
      experiences, // Array of objects
      education, // Array of objects
      skills, // Array of objects
    });

    // Save the resume to the database
    const savedResume = await createdResume.save();

    // Log the saved data and send a response
    console.log(savedResume);
    res.json(savedResume);
  } catch (err) {
    // Improved error handling for validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: messages });
    }

    // Log the error and send a generic server error message
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    const userFound = await Product.findOne({ email });
    if (userFound) {
      if (userFound.password === password) {
        res.send("loging");
      } else {
        res.send("Incorrect Password!");
      }
    } else {
      res.send("Username not found!");
    }
  } else {
    res.send("Please enter Username and Password!");
  }
};

const getName = async (req, res, next) => {
  const name = req.params.name; // or req.query.name, depending on how you're sending the name

  try {
    const result = await Product.findOne({});
    if (result) {
      res.json(result);
      console.log(result);
    } else {
      res.status(404).json({ message: "Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createResume = createResume;
exports.getUser = getUser;
exports.getName = getName;
