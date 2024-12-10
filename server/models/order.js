const mongoose = require("mongoose");

const orderItemScheme = new mongoose.Schema({
  name: { type: String, require: true },
  qty: { type: Number, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
});

const orderScheme = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    orderItems: [orderItemScheme],
    shippingAddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String, require: true },
      country: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true, default: "Paypal" },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updated_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderScheme);
