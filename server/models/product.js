const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  price: { type: Number, require: true },
});

module.express = mongoose.model("Product", userSchema);
