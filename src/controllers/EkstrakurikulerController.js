const EkstrakurikulerService = require("../services/EkstrakurikulerService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } =
    await EkstrakurikulerService.tambahEkstrakurikuler(
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

exports.ShowPagination = async (req, res) => {
  const { code, message, render } = await EkstrakurikulerService.showPagination(
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

exports.editEktrakurikuler = async (req, res) => {
  const { code, message, render } =
    await EkstrakurikulerService.updateEkstrakurikuler(
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

// -> Delete

exports.deleteEkstrakurikuler = async (req, res) => {
  const { code, message, render } =
    await EkstrakurikulerService.hapusEkstrakurikuler(
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
