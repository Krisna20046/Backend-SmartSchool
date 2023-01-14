const AuthService = require("../services/AuthService");

// ==================================================================================

exports.login = async (req, res) => {
  const { code, message, render } = await AuthService.Login(
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

exports.reset = async (req, res) => {
  const { code, message, render } = await AuthService.Reset(
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
