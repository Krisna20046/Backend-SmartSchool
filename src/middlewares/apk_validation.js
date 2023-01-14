const jwt = require("jsonwebtoken");

const { print } = require("../utils/services");

module.exports = async (req, res, next) => {
  // with JWT
  const Authorization = req.headers.authorization;
  if (Authorization) {
    return jwt.verify(
      String(Authorization).split(" ")[1],
      process.env.JWT_SECRET_TOKEN,
      (err, token_decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Not Authorized",
          });
        }
        print(req.traceId, {
          message: "token_decoded-> " + JSON.stringify(token_decoded),
        });
        if (token_decoded.is_mobile) return next();
        return res.status(400).json({
          message: "ini hanya untuk mobile saja pren!",
        });
      }
    );
  }
  return res.status(403).json({
    message: "Authorization Bearer is required!",
  });
};
