const SiswaBaruService = require("../services/SiswaBaruService");

// ==================================================================================

// -> Create

exports.formPendaftaran = async (req, res) => {
  const { code, message, render } = await SiswaBaruService.pendaftaran(
    req.traceId,
    req.sekolah.id,
    req.body,
    false
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.formPendaftaranMutasi = async (req, res) => {
  const { code, message, render } = await SiswaBaruService.pendaftaran(
    req.traceId,
    req.sekolah.id,
    req.body,
    true
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Read

exports.pagination = async (req, res) => {
  const { code, message, render } = await SiswaBaruService.showPagination(
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

exports.statusPendaftaran = async (req, res) => {
  const { code, message, render } = await SiswaBaruService.statusPendaftaran(
    req.traceId,
    req.sekolah.id,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Update

exports.diterima = async (req, res) => {
  const { code, message, render } = await SiswaBaruService.terima(
    req.traceId,
    req.sekolah.id,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Delete

exports.ditolak = async (req, res) => {
  const { code, message, render } = await SiswaBaruService.tolak(
    req.traceId,
    req.sekolah.id,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
