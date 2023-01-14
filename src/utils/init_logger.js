// -----------------------------------------------------
// -> Logger

const path = require("path");
const fs = require("fs");
const util = require("util");

const { io } = require("../app/websocket");

const { project_root } = require("../consts");
const log_path = path.join(project_root, "debug.log");

// delete first before start
fs.rmSync(log_path, {
  force: true,
  recursive: true,
});
const log_file = fs.createWriteStream(log_path, { flags: "w" });

// --------------------------------------------------------------------------
// Modification of String

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

// --------------------------------------------------------------------------
// Modification of console

console.log = (...arg) => {
  const prepare = [];
  for (let i = 0; i < arg.length; i++) {
    prepare.push(util.format(arg[i]));
  }
  // render (break)
  const out = prepare.join(" ") + "\n";
  const out_clean = String(out)
    .replace(/\033/g, "")
    .replace(/\[90m/g, "")
    .replace(/\[4m/g, "")
    .replace(/\[24m/g, "")
    .replace(/\[39m/g, "")
    .replace(/\[94m/g, "")
    .replace(/\[37m/g, "")
    .replace(/\[95m/g, "")
    .replace(/\[32m/g, "");
  io.emit("SERVER:LOG", out_clean);
  log_file.write(out_clean);
  process.stdout.write(out);
};
