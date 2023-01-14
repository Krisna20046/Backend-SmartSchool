exports.isArray = (value) => {
  return value && typeof value === "object" && Array.isArray(value);
};

exports.isObject = (value) => {
  return value && typeof value === "object" && !Array.isArray(value);
};

exports.isNumber = (val) => {
  return !isNaN(val);
};

exports.isUndefined = (value) => {
  return typeof value === "undefined";
};

const validateBearer = (value) => {
  return value !== undefined && String(value).startsWith("Bearer ")
    ? String(value).split(" ")[1]
    : false;
};
exports.isBearer = (req) => {
  return (
    validateBearer(req.headers.authorization) ||
    validateBearer(req.headers.authentication) ||
    validateBearer(req.headers["x-access-token"]) ||
    validateBearer(req.body.token) ||
    validateBearer(req.query.token)
  );
};

exports.isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
