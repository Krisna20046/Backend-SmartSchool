const { isProduction } = require("./consts");

// ---------------------------------------------------------------------

if (!isProduction) require("./utils/init_logger");

const { app, server } = require("./app/server");

const RunServer = () => {
  server.listen(app.get("port"), () => {
    console.log(`Service running at ${app.get("port")}`);
  });
};

require("./app/database")(RunServer);
