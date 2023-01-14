const jwt = require("jsonwebtoken");

exports.createToken = (object, expiresIn) => {
  return jwt.sign(object, process.env.JWT_SECRET_TOKEN, {
    expiresIn,
  });
};
