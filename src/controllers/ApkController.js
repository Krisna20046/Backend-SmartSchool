const fs = require("fs");
const ApkService = require("../services/ApkService");

// ==================================================================================

// -> Read

exports.nowVersion = async (req, res) => {
  const { code, message, render } = await ApkService.now(req.traceId);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.downloadLatest = async (req, res) => {
  return await ApkService.downloadLatest(req.traceId, res);
};

exports.checkVersion = async (req, res) => {
  const { code, message, render } = await ApkService.check(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.listApk = async (req, res) => {
  const { code, message, render } = await ApkService.listAllApk(req.traceId);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Delete

exports.delete = async (req, res) => {
  const { code, message, render } = await ApkService.deleteApk(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
