const NilaiSiswaEntity = require("../models/entities/NilaiSiswaKEntity");
const PenilaianPembelajaranService = require("../services/PenilaianPembelajaranKService");

// ==================================================================================

// -> Create

exports.formtambahNilai = async (req, res) => {
  const { code, message, render } = await PenilaianPembelajaranService.tambahNilai(
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

exports.Pagination = async (req, res) => {
  const { code, message, render } = await PenilaianPembelajaranService.showPagination(
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

exports.formupdateNilai = async (req, res) => {
  const { code, message, render } = await PenilaianPembelajaranService.updateNilai(
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

exports.hapusNilai = async (req, res) => {
  const { code, message, render } = await PenilaianPembelajaranService.hapusNilai(
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

//tambah raport
exports.insertNilaiSiswa = async (req, res) => {
  const { code, message, render } = await RaportService.insertNilaiSiswa(
    req.traceId,
    req.user.id,
    req.sekolah.id,
    req.user.id,
    req.mapel.id,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//read raport
exports.showPagination = async (req, res) => {
  const { code, message, render } = await RaportService.showPagination(
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

exports.updateNilaiSiswa = async (req, res) => {
  const { code, message, render } = await RaportService.updateNilaiSiswa(
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
