const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoPractice = require("./mongoose");
const app = express();

// Database connection
// mongoose
//   .connect("mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/Main")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error", err);
//   });

// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http").Server(app);

app.use(bodyParser.json());

// // const DB =
// //   "mongodb+srv://vikram:vikram@123@cluster0.1ynh0iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // app.get("/", (req, res) => {
// //   res.send("Msg is render");
// // });

app.post("/product", mongoPractice.createProduct);

// app.get("/product", mongoPractice.getProduct);

app.listen(8080, (req, res) => {
  console.log("server is running at 8080");
});
