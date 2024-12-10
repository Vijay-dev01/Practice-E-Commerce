const mongoose = require("mongoose");

// const reviewScheme = mongoose.Schema({
//   name: { type: "string", required: true },
//   rating: { type: "number", required: true },
//   comment: { type: "string", required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
// });

const productScheme = mongoose.Schema({
  name: { type: "string", required: true },
  image: { type: "string", required: true },
  description: { type: "string", required: true },
  price: { type: "number", required: true, default: 0 },
  countInStock: { type: "number", required: true, default: 0 },
  rating: { type: "number", required: true, default: 0 },
  numReview: { type: "number", required: true, default: 0 },

  // review: [reviewScheme],
});

module.exports = mongoose.model("product", productScheme);
