const { io } = require("../app/server");

// const path = require("path");
// const fs = require("fs");
// const { project_root } = require("../consts");
// const debug_file = path.join(project_root, "debug.log");

io.on("connection", (socket) => {
  // console.log(`user ${socket.id} connected`);
  // socket.on("disconnect", () => {
  //   // console.log(`user ${socket.id} connected`);
  // });
  // socket.emit(
  //   "SERVER:LAST",
  //   fs.readFileSync(debug_file, { encoding: "utf-8" })
  // );
});

module.exports = { io };
