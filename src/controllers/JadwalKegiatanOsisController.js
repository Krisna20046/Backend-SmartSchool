const Service = require("../services/JadwalKegiatanOsisService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await Service.postingJadwalKegiatanOsis(
    req.traceId,
    req.sekolah.id,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Read

exports.showPagination = async (req, res) => {
  const { code, message, render } = await Service.showPagination(
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

// // -> Update
exports.update = async (req, res) => {
  const { code, message, render } = await Service.updateJadwalKegiatanOsis(
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

// // -> Delete
exports.deleteJadwalKegiatanOsis = async (req, res) => {
  const { code, message, render } = await Service.hapusJadwalKegiatanOsis(req.traceId, req.params);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
