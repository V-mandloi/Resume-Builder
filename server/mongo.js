const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Product = require("./models/product");

const url = "mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/customer";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("product").insertOne(newProduct);
    console.log("connected"); // Added `await`
  } catch (error) {
    return res.json({ message: "Could not sure data." });
  }
  client.close();

  res.json(newProduct);
};

const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("product").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not connect" });
  }

  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;
