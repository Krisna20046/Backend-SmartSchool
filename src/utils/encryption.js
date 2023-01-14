exports.encode = (text) => {
  return Buffer.from(text).toString("base64");
};

exports.decode = (decrypt) => {
  return Buffer.from(decrypt, "base64").toString("ascii");
};
