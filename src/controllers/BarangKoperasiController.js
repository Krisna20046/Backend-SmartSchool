const Service = require("../services/BarangKoperasiService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await Service.tambahBarang(
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

//-> Update

exports.update = async (req, res) => {
  const { code, message, render } = await Service.update(
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

exports.deleteBarangKoperasi = async (req, res) => {
  const { code, message, render } = await Service.hapusBarangKoperasi(req.traceId, req.params);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

