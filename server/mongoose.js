const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect("mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/customer")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("MongoDB connection error");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();

  res.json(result);
};

const getUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    const userFound = await User.findOne({ username });
    if (userFound) {
      bcrypt.compare(password, userFound.password, (err, isMatch) => {
        if (isMatch) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/");
        } else {
          res.send("Incorrect Password!");
        }
      });
    } else {
      res.send("Username not found!");
    }
  } else {
    res.send("Please enter Username and Password!");
  }
};

exports.createProduct = createProduct;
exports.getUser = getUser;
