const Model = require("../../utils/models.js");

const KeuanganMasuk = require("../entities/KeuanganMasukEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(KeuanganMasuk, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(KeuanganMasuk);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(KeuanganMasuk, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(KeuanganMasuk, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(KeuanganMasuk, selector);
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
  return await Model.updateFrom(KeuanganMasuk, { id }, new_data);
};
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(KeuanganMasuk, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(KeuanganMasuk, { id });
};
exports.deleteWhereNama = async (ambil_dana) => {
  return await Model.deleteFrom(KeuanganMasuk, { ambil_dana });
};
