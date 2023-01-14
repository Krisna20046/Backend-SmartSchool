"use strict";

/**
 * Module exports.
 * @public
 */

module.exports = morgan;
module.exports.compile = compile;
module.exports.format = format;
module.exports.token = token;

const { skip_request } = require("../consts");

/**
 * Module dependencies.
 * @private
 */

var auth = require("basic-auth");
var debug = require("debug")("morgan");
var deprecate = require("depd")("morgan");
var onFinished = require("on-finished");
var onHeaders = require("on-headers");

/**
 * Array of CLF month names.
 * @private
 */

var CLF_MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Create a logger middleware.
 *
 * @public
 * @param {String|Function} format
 * @param {Object} [options]
 * @return {Function} middleware
 */

function morgan() {
  var fmt = "combined";

  // format function
  var formatLine = typeof fmt !== "function" ? getFormatFunction(fmt) : fmt;

  return function logger(req, res, next) {
    // skip
    if (skip_request.some((v) => String(req.originalUrl).startsWith(v)))
      return next();
    if (req.originalUrl === "/") return next();

    // request data
    req._startAt = undefined;
    req._startTime = undefined;
    req._remoteAddress = getip(req);

    // response data
    res._startAt = undefined;
    res._startTime = undefined;

    // record request start
    recordStartTime.call(req);

    function logRequest() {
      var line = formatLine(morgan, req, res);

      if (line == null) {
        debug("skip line");
        return;
      }

      debug("log request");
      console.log(line);
    }

    // record response start
    onHeaders(res, recordStartTime);

    // log when response finished
    onFinished(res, logRequest);

    next();
  };
}

/**
 * Apache combined log format.
 */

morgan.format(
  "combined",
  '[:trace-id][END]   :remote-addr - :remote-user [:date[clf]] (:response-time ms) ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

deprecate.property(morgan, "combined", "default format: use combined format");

/**
 * request url
 */

morgan.token("url", function getUrlToken(req) {
  return req.originalUrl || req.url;
});

/**
 * request method
 */

morgan.token("method", function getMethodToken(req) {
  return req.method;
});

/**
 * request traceId
 */

morgan.token("trace-id", function getTraceId(req) {
  return req.traceId;
});

/**
 * response time in milliseconds
 */

morgan.token("response-time", function getResponseTimeToken(req, res) {
  if (!req._startAt || !res._startAt) {
    // missing request and/or response start time
    return;
  }

  // calculate diff
  var ms =
    (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;

  // return truncated value
  return ms.toFixed(3);
});

/**
 * total time in milliseconds
 */

morgan.token("total-time", function getTotalTimeToken(req, res, digits) {
  if (!req._startAt || !res._startAt) {
    // missing request and/or response start time
    return;
  }

  // time elapsed from request start
  var elapsed = process.hrtime(req._startAt);

  // cover to milliseconds
  var ms = elapsed[0] * 1e3 + elapsed[1] * 1e-6;

  // return truncated value
  return ms.toFixed(digits === undefined ? 3 : digits);
});

/**
 * current date
 */

morgan.token("date", function getDateToken(req, res, format) {
  var date = new Date();

  switch (format || "web") {
    case "clf":
      return clfdate(date);
    case "iso":
      return date.toISOString();
    case "web":
      return date.toUTCString();
  }
});

/**
 * response status code
 */

morgan.token("status", function getStatusToken(req, res) {
  return headersSent(res) ? String(res.statusCode) : undefined;
});

/**
 * normalized referrer
 */

morgan.token("referrer", function getReferrerToken(req) {
  return req.headers.referer || req.headers.referrer;
});

/**
 * remote address
 */

morgan.token("remote-addr", getip);

/**
 * remote user
 */

morgan.token("remote-user", function getRemoteUserToken(req) {
  // parse basic credentials
  var credentials = auth(req);

  // return username
  return credentials ? credentials.name : undefined;
});

/**
 * HTTP version
 */

morgan.token("http-version", function getHttpVersionToken(req) {
  return req.httpVersionMajor + "." + req.httpVersionMinor;
});

/**
 * UA string
 */

morgan.token("user-agent", function getUserAgentToken(req) {
  return req.headers["user-agent"];
});

/**
 * request header
 */

morgan.token("req", function getRequestToken(req, res, field) {
  // get header
  var header = req.headers[field.toLowerCase()];

  return Array.isArray(header) ? header.join(", ") : header;
});

/**
 * response header
 */

morgan.token("res", function getResponseHeader(req, res, field) {
  if (!headersSent(res)) {
    return undefined;
  }

  // get header
  var header = res.getHeader(field);

  return Array.isArray(header) ? header.join(", ") : header;
});

/**
 * Format a Date in the common log format.
 *
 * @private
 * @param {Date} dateTime
 * @return {string}
 */

function clfdate(dateTime) {
  var date = dateTime.getUTCDate();
  var hour = dateTime.getUTCHours();
  var mins = dateTime.getUTCMinutes();
  var secs = dateTime.getUTCSeconds();
  var year = dateTime.getUTCFullYear();

  var month = CLF_MONTH[dateTime.getUTCMonth()];

  return (
    pad2(date) +
    "/" +
    month +
    "/" +
    year +
    ":" +
    pad2(hour) +
    ":" +
    pad2(mins) +
    ":" +
    pad2(secs) +
    " +0000"
  );
}

/**
 * Compile a format string into a function.
 *
 * @param {string} format
 * @return {function}
 * @public
 */

function compile(format) {
  if (typeof format !== "string") {
    throw new TypeError("argument format must be a string");
  }

  var fmt = String(JSON.stringify(format));
  var js =
    '  "use strict"\n  return ' +
    fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
      var tokenArguments = "req, res";
      var tokenFunction = "tokens[" + String(JSON.stringify(name)) + "]";

      if (arg !== undefined) {
        tokenArguments += ", " + String(JSON.stringify(arg));
      }

      return (
        '" +\n    (' + tokenFunction + "(" + tokenArguments + ') || "-") + "'
      );
    });

  // eslint-disable-next-line no-new-func
  return new Function("tokens, req, res", js);
}

/**
 * Define a format with the given name.
 *
 * @param {string} name
 * @param {string|function} fmt
 * @public
 */

function format(name, fmt) {
  morgan[name] = fmt;
  return this;
}

/**
 * Lookup and compile a named format function.
 *
 * @param {string} name
 * @return {function}
 * @public
 */

function getFormatFunction(name) {
  // lookup format
  var fmt = morgan[name] || name || morgan.default;

  // return compiled format
  return typeof fmt !== "function" ? compile(fmt) : fmt;
}

/**
 * Get request IP address.
 *
 * @private
 * @param {IncomingMessage} req
 * @return {string}
 */

function getip(req) {
  return (
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress) ||
    undefined
  );
}

/**
 * Determine if the response headers have been sent.
 *
 * @param {object} res
 * @returns {boolean}
 * @private
 */

function headersSent(res) {
  // istanbul ignore next: node.js 0.8 support
  return typeof res.headersSent !== "boolean"
    ? Boolean(res._header)
    : res.headersSent;
}

/**
 * Pad number to two digits.
 *
 * @private
 * @param {number} num
 * @return {string}
 */

function pad2(num) {
  var str = String(num);

  // istanbul ignore next: num is current datetime
  return (str.length === 1 ? "0" : "") + str;
}

/**
 * Record the start time.
 * @private
 */

function recordStartTime() {
  this._startAt = process.hrtime();
  this._startTime = new Date();
}

/**
 * Define a token function with the given name,
 * and callback fn(req, res).
 *
 * @param {string} name
 * @param {function} fn
 * @public
 */

function token(name, fn) {
  morgan[name] = fn;
  return this;
}
