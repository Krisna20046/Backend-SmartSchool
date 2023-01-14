const KartuPelajarDigitalService = require("../services/KartuPelajarDigitalService");

// ==================================================================================

// -> Read

exports.show = async (req, res) => {
  const { code, message, render } = await KartuPelajarDigitalService.showPagination(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.canvas = async (req, res) => {
  const { code, message, buffer } = await KartuPelajarDigitalService.Canvas(
    req.traceId,
    req.sekolah,
    req.params
  );
  if (buffer) {
    return res.set({ "Content-Type": "image/png" }).send(buffer);
  }
  return res.status(code).json({
    message,
  });
};

exports.json = async (req, res) => {
  const { code, message, render } = await KartuPelajarDigitalService.Json(
    req.traceId,
    req.sekolah,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
