const BlogOsisService = require("../services/BlogOsisService");

// ==================================================================================

// -> Create

exports.postingBeritaSekolah = async (req, res) => {
  const { code, message, render } = await BlogOsisService.postingBeritaOsis(
    req.traceId,
    req.user.id,
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
  const { code, message, render } = await BlogOsisService.showPagination(
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

// -> Update

exports.updateBeritaSekolah = async (req, res) => {
  const { code, message, render } = await BlogOsisService.updateBeritaOsis(
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

exports.deleteBeritaSekolah = async (req, res) => {
  const { code, message, render } = await BlogOsisService.hapusBeritaOsis(req.traceId, req.params);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
