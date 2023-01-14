const Service = require("../services/AbsenPegawaiService");

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

// -> Validate

// -> Update

// exports.updateAbsenPegawai = async (req, res) => {
//   const { code, message, render } = await updateAbsenPegawai(
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

// exports.deleteAbsenPegawai = async (req, res) => {
//   const { code, message, render } = await deleteAbsenPegawai(
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
