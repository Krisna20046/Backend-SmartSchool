const TokenService = require("../services/TokenService");

// ==================================================================================

exports.refresh = async (req, res) => {
  const { code, message, render } = await TokenService.refresh(
    req.traceId,
    req.headers
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.validate = async (req, res) => {
  const { code, message, render } = await TokenService.validate(
    req.traceId,
    req.headers
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.unlimited = async (req, res) => {
  const { code, message, render } = await TokenService.Unlimited(req.traceId);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
