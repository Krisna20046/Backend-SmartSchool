const Model = require("../../utils/models.js");

const BarangKoperasi = require("../entities/BarangKoperasiEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(BarangKoperasi, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(BarangKoperasi);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(BarangKoperasi, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(BarangKoperasi, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(BarangKoperasi, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isNamaExist = async (nama) => {
  return await this.isExist({
    nama,
  });
};

// Update
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(BarangKoperasi, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(BarangKoperasi, { id });
};
exports.deleteWhereNama = async (nama) => {
  return await Model.deleteFrom(BarangKoperasi, { nama });
};

