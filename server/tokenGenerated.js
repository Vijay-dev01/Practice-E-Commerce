const jwt = require("jsonwebtoken");

const genarateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = genarateToken;
