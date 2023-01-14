const Service = require("../services/JadwalPelajaranService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await Service.insert(
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

exports.show = async (req, res) => {
  const { code, message, render } = await Service.showPagination(
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

// // -> Update

exports.update = async (req, res) => {
  const { code, message, render } = await Service.edit(
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

 exports.deleteJadwalPelajaran = async (req, res) => {
   const { code, message, render } = await Service.hapusJadwalPelajaran(
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
