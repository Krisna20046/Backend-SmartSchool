const Service = require("../services/PerpustakaanBukuService");

// ==================================================================================

// -> Create

exports.insert = async (req, res) => {
  const { code, message, render } = await Service.tambahBuku(
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
  const { code, message, render } = await Service.pagination(req.traceId, req.body);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Update

exports.update = async (req, res) => {
  const { code, message, render } = await Service.editBukuPerpustakaan(req.traceId, req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

// -> Delete

exports.deleteBukuPerpustakaan = async (req, res) => {
  const { code, message, render } = await Service.hapusBukuPerpustakaan(req.traceId, req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
