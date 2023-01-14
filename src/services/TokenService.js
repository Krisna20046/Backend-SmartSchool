const { print } = require("../utils/services");

const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/jsonwebtoken");
const { expired_token } = require("../consts");

// ==================================================================================

exports.refresh = (traceId, { authorization }) => {
  let message = "";
  if (authorization) {
    return jwt.verify(
      String(authorization).split(" ")[1],
      process.env.JWT_SECRET_TOKEN,
      (err, token_decoded) => {
        if (err) {
          message = "Not Authorized";
          print(traceId, { message });
          return {
            code: 401,
            message,
          };
        } else {
          print(traceId, { json: { token_decoded } });
          delete token_decoded.iat;
          delete token_decoded.exp;

          // create new token
          const token = createToken({ ...token_decoded }, expired_token + "d");
          print(traceId, { json: { refresh_token: token } });

          // set expired
          const date = new Date();
          date.setDate(date.getDate() + 7);
          const expired = date.toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
          });
          print(traceId, { json: { expired } });

          return {
            code: 200,
            render: {
              token,
              expired,
            },
          };
        }
      }
    );
  } else {
    message = "Authorization Bearer is required!";
    print(traceId, { message });
    return {
      code: 403,
      message,
    };
  }
};

exports.validate = (traceId, { authorization }) => {
  let message = "";
  if (authorization) {
    return jwt.verify(
      String(authorization).split(" ")[1],
      process.env.JWT_SECRET_TOKEN,
      (err, token_decoded) => {
        if (err) {
          message = "Not Authorized";
          print(traceId, { message });
          return {
            code: 401,
            message,
          };
        } else {
          print(traceId, { json: { token_decoded } });
          return {
            code: 200,
            render: {
              ...token_decoded,
            },
          };
        }
      }
    );
  } else {
    message = "Authorization Bearer is required!";
    print(traceId, { message });
    return {
      code: 403,
      message,
    };
  }
};

exports.Unlimited = (traceId) => {
  // create new token
  const token = jwt.sign({ is_mobile: true }, process.env.JWT_SECRET_TOKEN);
  print(traceId, { json: { unlimited_token: token } });
  return {
    code: 200,
    render: {
      token,
    },
  };
};
