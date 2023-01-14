const Service = require("../services/SppService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await Service.insert(req.traceId, req.body);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Read

exports.show = async (req, res) => {
  const { code, message, render } = await Service.pagination(req.traceId);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// // -> Update

// exports.update = async (req, res) => {
//   const { code, message, render } = await Service(
//     req.traceId,
//     req.body
//   );
//   if (render) {
//     return res.status(code).json(render);
//   }
//   return res.status(code).json({
//     message,
//   });
// };

// // -> Delete

// exports.delete = async (req, res) => {
//   const { code, message, render } = await Service(
//     req.traceId,
//     req.params
//   );
//   if (render) {
//     return res.status(code).json(render);
//   }
//   return res.status(code).json({
//     message,
//   });
// };
