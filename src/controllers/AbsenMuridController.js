const Service = require("../services/AbsenMuridService");

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

exports.pulang = async (req, res) => {
  const { code, message, render } = await Service.signPulang(
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

// exports.fotoabsenMurid = async (req, res) => {
//   const { code, message, render } = await AbsenMuridService.absenMurid(
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

// -> Validate

// -> Update

// exports.update = async (req, res) => {
//   const { code, message, render } = await ExampleController(
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
//   const { code, message, render } = await ExampleController(
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
