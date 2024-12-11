const express = require("express");
const userRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/user");
const genarateToken = require("../tokenGenerated");
const protect = require("../middleware/Auth");

//Login Route
userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (email && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genarateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.send(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

//Register Route
userRoute.post(
  "/register",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.send(400);
      throw new Error("User already exits");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("User not exist");
      }
    }
  })
);

userRoute.get(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
module.exports = userRoute;
