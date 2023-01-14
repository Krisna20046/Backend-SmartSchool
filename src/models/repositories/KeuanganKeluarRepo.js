const Model = require("../../utils/models.js");

const KeuanganKeluar = require("../entities/KeuanganKeluarEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(KeuanganKeluar, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(KeuanganKeluar);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(KeuanganKeluar, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(KeuanganKeluar, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(KeuanganKeluar, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isNamaExist = async (ambil_dana) => {
  return await this.isExist({
    ambil_dana,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(KeuanganKeluar, { id }, new_data);
};
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(KeuanganKeluar, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(KeuanganKeluar, { id });
};
exports.deleteWhereNama = async (ambil_dana) => {
  return await Model.deleteFrom(KeuanganKeluar, { ambil_dana });
};
