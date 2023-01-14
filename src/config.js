const path = require("path");

// Setup Environment
const { project_root } = require("./consts");
require("dotenv").config();
require("dotenv").config({
  path: path.join(project_root, `.env.${process.env.ENV}`),
});

exports.endpoint = process.env.ENDPOINT;
exports.db_config = {
  type: process.env.DB_TYPE || "mysql",
  port: process.env?.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "sipapasi",
};
exports.synchronize = process.env.DB_SYNC === "true";
exports.logging = process.env.DB_LOG === "true";
// oke
