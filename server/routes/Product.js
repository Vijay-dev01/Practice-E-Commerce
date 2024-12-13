const express = require("express");
const productRouter = express.Router();
const AsyncHandler = require("express-async-handler");
const Product = require("../models/product");

productRouter.get(
  "/",
  AsyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

productRouter.get(
  "/:id",
  AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

module.exports = productRouter;
