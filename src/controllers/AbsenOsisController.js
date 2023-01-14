const Service = require("../services/AbsenOsisService");

// ==================================================================================

// -> Create

exports.hadir = async (req, res) => {
  const { code, message, render } = await Service.signHadir(
    req.traceId,
    req.sekolah.id,
    req.user.id,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.tidakHadir = async (req, res) => {
  const { code, message, render } = await Service.signTidakHadir(
    req.traceId,
    req.sekolah.id,
    req.user.id,
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
  const { code, message, render } = await Service.pagination(
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

// exports.show = async (req, res) => {
//   const { code, message, render } = await Service(req.traceId);
//   if (render) {
//     return res.status(code).json(render);
//   }
//   return res.status(code).json({
//     message,
//   });
// };

// -> Validate

// -> Update

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

// -> Delete

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
