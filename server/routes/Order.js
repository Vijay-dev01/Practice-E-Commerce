const express = require("express");
const orderRouter = express.Router();
const AsyncHandler = require("express-async-handler");
const protect = require("../middleware/Auth");
const Order = require("../models/order");

orderRouter.post(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      req.statusCode(404);
      throw new Error("No Order Items Found!");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id,
      });
      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  })
);

module.exports = orderRouter;
