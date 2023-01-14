const Service = require("../services/JabatanSekolahService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await Service.insert(
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

exports.show = async (req, res) => {
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

// -> Validate

// -> Update

exports.update = async (req, res) => {
  const { code, message, render } = await Service(req.traceId, req.body);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Delete

exports.deleteJabatanSekolah = async (req, res) => {
  const { code, message, render } = await Service.hapusJabatanSekolah(req.traceId, req.params);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
