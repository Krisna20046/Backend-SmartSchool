const Service = require("../services/KoperasiKeuanganKeluarService");

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

// // -> Update

 exports.update = async (req, res) => {
   const { code, message, render } = await Service.update(req.traceId, req.body);
   if (render) {
     return res.status(code).json(render);
   }
   return res.status(code).json({
     message,
   });
 };

 // -> Delete

 exports.deleteKoperasiKeuanganKeluar = async (req, res) => {
   const { code, message, render } = await Service.hapusKoperasiKeuanganKeluar(req.traceId, req.params);
   if (render) {
     return res.status(code).json(render);
   }
   return res.status(code).json({
     message,
   });
 };
