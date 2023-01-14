const Model = require("../../utils/models.js");

const KoperasiKeuanganKeluar = require("../entities/KoperasiKeuanganKeluarEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(KoperasiKeuanganKeluar, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(KoperasiKeuanganKeluar);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(KoperasiKeuanganKeluar, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(KoperasiKeuanganKeluar, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(KoperasiKeuanganKeluar, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(KoperasiKeuanganKeluar, { id }, new_data);
};
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(KoperasiKeuanganKeluar, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(KoperasiKeuanganKeluar, { id });
};
