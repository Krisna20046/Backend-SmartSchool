const ExampleController = require("../utils/example");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await ExampleController(
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

// -> Read

exports.show = async (req, res) => {
  const { code, message, render } = await ExampleController(req.traceId);
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
  const { code, message, render } = await ExampleController(
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

exports.delete = async (req, res) => {
  const { code, message, render } = await ExampleController(
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
