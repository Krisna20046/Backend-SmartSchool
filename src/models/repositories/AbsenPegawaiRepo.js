const Model = require("../../utils/models.js");

const AbsenPegawai = require("../entities/AbsenPegawaiEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(AbsenPegawai, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(AbsenPegawai);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(AbsenPegawai, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    //   tanggal: keyword,
    //   bulan: keyword,
    //   tahun: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(AbsenPegawai, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(AbsenPegawai, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(AbsenPegawai, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(AbsenPegawai, { id });
};
