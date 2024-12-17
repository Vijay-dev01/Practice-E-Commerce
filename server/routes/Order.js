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

//order payment
orderRouter.put(
  "/:id/payment",
  protect,
  AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updated_time: req.body.updated_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(400);
      throw new Error("Order Not Found!");
    }
  })
);

//Get All Orders
orderRouter.get(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Order Not Found!");
    }
  })
);

//Get Single Order
orderRouter.get(
  "/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const orders = await Order.findById(req.params.id).populate(
      "user",
      "email"
    );
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Order Not Found!");
    }
  })
);

module.exports = orderRouter;
