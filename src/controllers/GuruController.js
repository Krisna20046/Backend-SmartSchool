const GuruService = require("../services/GuruService");

// ==================================================================================

// -> Guru

exports.guruInsert = async (req, res) => {
  const { code, message, render } = await GuruService(
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

exports.guruShow = async (req, res) => {
  const { code, message, render } = await GuruService(req.traceId);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.guruUpdate = async (req, res) => {
  const { code, message, render } = await GuruService(
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

exports.guruDelete = async (req, res) => {
  const { code, message, render } = await GuruService(
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
