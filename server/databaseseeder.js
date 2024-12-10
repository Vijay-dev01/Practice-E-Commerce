const router = require("express").Router();
const User = require("./models/user");
const users = require("./Data/Users");
const products = require("./Data/products");
const Product = require("./models/product");

router.post("/users", async (req, res) => {
  await User.deleteMany({});
  const UserSeeder = await User.insertMany(users);
  res.send({ UserSeeder });
});

router.post("/products", async (req, res) => {
  await Product.deleteMany({});
  const productData = await Product.insertMany(products);
  res.send({ productData });
});

module.exports = router;
