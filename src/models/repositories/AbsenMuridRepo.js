const Model = require("../../utils/models.js");

const AbsenMurid = require("../entities/AbsenMuridEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(AbsenMurid, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(AbsenMurid);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(AbsenMurid, {
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
  return await Model.in(AbsenMurid, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(AbsenMurid, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(AbsenMurid, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(AbsenMurid, { id });
};
