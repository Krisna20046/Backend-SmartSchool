// 1st Module
const http = require("http");

// Third Party Module
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const {
  isProduction,
  isCompiled,
  skip_request,
  max_file_upload_size,
} = require("../consts");

const random = require("../helpers/random");

// ---------------------------------------------------------------------
// ## Setup App

// Define
const app = express();
const server = http.createServer(app);

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
const key_identity = "identity";
app.use(function (req, res, next) {
  // check if client sent cookie
  if (req.cookies[key_identity] === undefined) {
    // no: set a new cookie
    let randomNumber = random.Text(18); // Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie(key_identity, randomNumber, { maxAge: 900000, httpOnly: true });
  }
  next(); // <-- important!
});

// management file upload
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: {
      fileSize: max_file_upload_size * 1024 * 1024, // MB
    },
  })
);

// Endpoint Logger
app.use((req, _, next) => {
  const traceId = random.Text(8);
  req.traceId = traceId;
  if (
    !skip_request.some((v) => String(req.originalUrl).startsWith(v)) &&
    req.originalUrl !== "/"
  ) {
    console.log(`[${traceId}][START] : ${req.originalUrl}`);
  }
  return next();
});
app.use(require("../utils/logger")());

// Config
app.set("port", process.env.PORT || 8080);

// Middleware
app.use(cors());
if (isProduction) app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((_, res, next) => {
  res.set(
    "Content-Security-Policy",
    "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
  );
  return next();
});

// Middleware (check origin)
const SekolahRepo = require("../models/repositories/SekolahRepo");
app.use(async (req, res, next) => {
  try {
    if (String(req.originalUrl).startsWith("/log")) {
      return next();
    }
    const allSekolah = await SekolahRepo.getAllOrigin();
    let origin = req.header("Origin") || "https://" + req.header("host");
    const allowOrigin = [...allSekolah].map((v) => v.origin);
    const sekolah_select = allowOrigin.filter((v) =>
      String(v).includes(origin)
    );
    let GRANTED = false;
    if (sekolah_select.length > 0) {
      GRANTED = true;
    }
    if (!skip_request.some((v) => String(req.originalUrl).startsWith(v))) {
      console.log(
        `[${req.traceId}][Origin] : ${origin} ${
          GRANTED ? "GRANTED" : "BLOCKED"
        }`
      );
    }
    if (GRANTED) {
      req.sekolah = allSekolah.filter((v) =>
        String(v.origin).includes(sekolah_select[0])
      )[0];
      return next(); // OK
    }
  } catch (error) {
    console.log({ error });
  }
  return res.status(403).json({
    message: "Maaf anda tidak boleh akses secara langsung (Origin not Allowed)",
  });
});

// ---------------------------------------------------------------------
// Import Routers

require("../routers")(app);

// Very Not Found !!!
app.all("*", (_, res) =>
  res.status(404).json({
    message: "endpoint not found!",
  })
);

// ---------------------------------------------------------------------

// WebSocket (for log)
const { Server } = require("socket.io");
const io = new Server(server);

// ---------------------------------------------------------------------

module.exports = { app, server, io };
